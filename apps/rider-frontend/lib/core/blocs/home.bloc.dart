import 'package:api_response/api_response.dart';
import 'package:collection/collection.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter_common/core/entities/payment_method_union.dart';
import 'package:flutter_common/core/enums/order_status.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:generic_map/generic_map.dart';
import 'package:hydrated_bloc/hydrated_bloc.dart';
import 'package:injectable/injectable.dart';
import 'package:rider_flutter/core/entities/place.prod.dart';

import 'package:rider_flutter/core/datasources/geo_datasource.dart';
import 'package:rider_flutter/core/enums/order_status.prod.dart';
import 'package:rider_flutter/core/enums/payment_mode.prod.dart';
import 'package:rider_flutter/core/graphql/documents/calculate_fare.graphql.dart';
import 'package:rider_flutter/core/graphql/fragments/active_order.extentions.dart';
import 'package:rider_flutter/core/graphql/fragments/active_order.fragment.graphql.dart';
import 'package:rider_flutter/core/graphql/fragments/point.fragment.graphql.dart';
import 'package:rider_flutter/core/graphql/fragments/review_parameter.fragment.graphql.dart';
import 'package:rider_flutter/core/graphql/fragments/ride_option.fragment.graphql.dart';
import 'package:rider_flutter/core/graphql/fragments/service.fragment.graphql.dart';
import 'package:rider_flutter/core/graphql/fragments/service_category.fragment.graphql.dart';
import 'package:rider_flutter/core/graphql/schema.gql.dart';
import 'package:rider_flutter/core/repositories/order_repository.dart';

import '../../features/home/domain/repositories/home_repository.dart';

part 'home.state.dart';
part 'home.event.dart';
part 'home.bloc.freezed.dart';

@lazySingleton
class HomeBloc extends Bloc<HomeEvent, HomeState> {
  final HomeRepository homeRepository;
  final OrderRepository orderRepository;
  final GeoDatasource geoDatasource;

  HomeBloc(this.homeRepository, this.geoDatasource, this.orderRepository)
      : super(HomeState(waypoints: [null, null], driversAround: [])) {
    on<HomeEvent>((event, emit) async {
      switch (event) {
        case HomeEvent$OnStarted(:final authenticated):
          if (authenticated) {
            orderRepository.startListeningToActiveOrders();
            orderRepository.refreshActiveOrders();

            await emit.forEach(
              orderRepository.activeOrdersStream,
              onData: (data) => state.copyWith(currentOrdersResponse: data),
            );
          } else {
            //initializeWelcome(pickupPoint: currentLocationPlace);
          }
          break;

        case HomeEvent$OnMapReady(:final controller):
          emit(state.copyWith(mapViewController: controller));
          break;

        case HomeEvent$InitializeWelcome(:final pickupPoint):
          emit(
            HomeState(
              currentOrdersResponse: state.currentOrdersResponse,
              selectedPaymentMethod: state.selectedPaymentMethod,
              mapViewController: state.mapViewController,
              waypoints: [pickupPoint, null],
              driversAround: [],
              orderSubmissionPage: OrderSubmissionPage.welcome,
            ),
          );
          if (state.mapViewController != null && pickupPoint != null) {
            state.mapViewController!.moveCamera(pickupPoint.latLng, 15);
            await _showDriversAround(waypoints: [pickupPoint, null], emitter: emit);
          }
          break;

        case HomeEvent$ChangeOrderSubmissionPage(:final orderSubmissionPage):
          emit(state.copyWith(orderSubmissionPage: orderSubmissionPage));
          break;

        case HomeEvent$OnRideOptionSelected():
          emit(
            state.copyWith(
              orderSubmissionPage: OrderSubmissionPage.rideWaypointsInput,
              selectedWaypointIndex: null,
              orderType: Enum$TaxiOrderType.Ride,
            ),
          );
          break;

        case HomeEvent$OnDeliveryOptionSelected():
          emit(
            state.copyWith(
              orderSubmissionPage: OrderSubmissionPage.deliverySearchPlaceInput,
              selectedWaypointIndex: 0,
              orderType: Enum$TaxiOrderType.ParcelDelivery,
            ),
          );
          break;

        case HomeEvent$OnMapMoved(:final selectedLocation):
          switch (state.orderSubmissionPage) {
            case OrderSubmissionPage.welcome:
              if (selectedLocation.data == null) return;
              await _showDriversAround(
                waypoints:
                    state.currentWaypoints.mapIndexed((index, e) => index == 0 ? selectedLocation.data : e).toList(),
                emitter: emit,
              );
              break;

            case OrderSubmissionPage.confirmLocation:
              emit(state.copyWith(selectedLocationResponse: selectedLocation));
              break;

            default:
              break;
          }
          break;

        case HomeEvent$OnAddStop():
          emit(state.copyWith(waypoints: state.waypoints.followedBy([null]).toList()));
          break;

        case HomeEvent$ConfirmContactInfo():
          if (state.selectedWaypointIndex == 0) {
            emit(
              state.copyWith(
                orderSubmissionPage: OrderSubmissionPage.deliverySearchPlaceInput,
                selectedWaypointIndex: 1,
              ),
            );
          } else {
            emit(state.copyWith(ridePreviewFareResponse: ApiResponse.loading()));
            final result = await orderRepository.calculateFare(
              args: Input$CalculateFareInput(
                points: state.waypoints.nonNulls.toList().toGql,
                orderType: state.orderType,
              ),
            );
            emit(state.copyWith(ridePreviewFareResponse: result));
            if (result.isError) {
              emit(state.copyWith(ridePreviewFareResponse: ApiResponse.initial()));
            }
          }
          break;

        case HomeEvent$FocusOnWaypoint(:final index):
          emit(state.copyWith(selectedWaypointIndex: index));
          break;

        case HomeEvent$OnRemoveStop(:final index):
          final locations = [...state.waypoints];
          locations.removeAt(index);
          emit(state.copyWith(waypoints: locations));
          break;

        case HomeEvent$OnWaypointConfirmed():
          final locations = [...state.waypoints];
          locations[state.selectedWaypointIndex!] = state.selectedLocationResponse.data!;
          emit(
            state.copyWith(
              waypoints: locations,
              orderSubmissionPage: state.orderType == Enum$TaxiOrderType.Ride
                  ? OrderSubmissionPage.rideWaypointsInput
                  : OrderSubmissionPage.deliveryContactInfoInput,
            ),
          );
          break;

        case HomeEvent$ShowConfirmWaypoint(:final selectedLocation):
          emit(
            state.copyWith(
              selectedLocationResponse: ApiResponse.loaded(selectedLocation),
              orderSubmissionPage: OrderSubmissionPage.confirmLocation,
            ),
          );
          break;

        case HomeEvent$OnCouponCodeUpdated(:final couponCode):
          emit(state.copyWith(couponCode: couponCode));
          break;

        case HomeEvent$ShowPreview(:final destination):
          if (destination != null) {
            if (state.waypoints.firstOrNull == null) {
              emit(
                state.copyWith(
                  ridePreviewFareResponse: ApiResponse.error(
                    'Pickup location was not determined (Probably due to location services or permissions). Please select a pickup location',
                  ),
                ),
              );
              emit(state.copyWith(ridePreviewFareResponse: ApiResponse.initial()));
            }
            emit(state.copyWith(waypoints: [state.waypoints.first, destination]));
          }
          if (state.waypoints.nonNulls.length < 2) {
            emit(state.copyWith(ridePreviewFareResponse: ApiResponse.error('Please select a destination')));
            emit(state.copyWith(ridePreviewFareResponse: ApiResponse.initial()));
            return;
          }

          emit(state.copyWith(ridePreviewFareResponse: ApiResponse.loading()));
          final result = await orderRepository.calculateFare(
            args: Input$CalculateFareInput(points: state.waypoints.nonNulls.toList().toGql, orderType: state.orderType),
          );
          final fares = result.mapData((data) => data.getFares);
          emit(
            state.copyWith(
              ridePreviewFareResponse: result,
              selectedServiceCategory: fares.data?.services.firstOrNull,
              selectedService: fares.data?.services.firstOrNull?.services.firstOrNull,
              selectedDateTime: null,
            ),
          );
          if (result.isError) {
            emit(state.copyWith(ridePreviewFareResponse: ApiResponse.initial()));
          }

          break;

        case HomeEvent$SubmitOrder(:final selectedDateTime):
          emit(state.copyWith(createOrderResponse: ApiResponse.loading(), selectedDateTime: selectedDateTime));
          final result = await orderRepository.createOrder(
            args: Input$CreateOrderInput(
              addresses: state.waypoints.nonNulls.map((e) => e.address).toList(),
              points: state.waypoints.nonNulls.toList().toGql,
              orderType: state.orderType,
              paymentMode: state.selectedPaymentMethod?.toEntity,
              paymentMethodId: state.selectedPaymentMethod?.id,
              serviceId: int.parse(state.selectedService!.id),
              couponCode: state.couponCode,
              twoWay: state.isTwoWayRide,
              waitTime: state.waitTime,
              intervalMinutes: selectedDateTime != null ? selectedDateTime.difference(DateTime.now()).inMinutes : 0,
              optionIds: state.rideOptions.map((e) => e.id).toList(),
            ),
          );
          emit(state.copyWith(createOrderResponse: result.mapData((data) => Fragment$ActiveOrder(order: data))));
          break;

        case HomeEvent$ChangeTrackOrderPage():
          emit(state.copyWith(page: event.page));
          if (event.page == TrackOrderPage.overview) {
            await orderRepository.updateLastSeenMessages(
              orderId: state.activeOrder!.order.id,
              lastSeenMessageId: state.activeOrder!.order.conversation.lastOrNull?.id,
            );
          }
          break;

        case HomeEvent$OnChatMessageSent(:final message):
          if (message.isNotEmpty) {
            emit(state.copyWith(sendMessageState: ApiResponse.loading()));
            final result = await orderRepository.sendMessage(orderId: state.activeOrder!.order.id, message: message);
            emit(state.copyWith(sendMessageState: result));
            if (result.isLoaded) {
              emit(state.copyWith(sendMessageState: ApiResponse.initial()));
            }
          }
          break;

        case HomeEvent$CancelRide():
          emit(state.copyWith(cancelOrderResponse: ApiResponse.loading()));
          final result = await orderRepository.cancelOrder(
            orderId: event.orderId,
            reasonId: event.cancelReasonId,
            reasonText: event.cancelReasonNote,
          );
          emit(state.copyWith(cancelOrderResponse: result));
          if (result.isLoaded) {
            emit(state.copyWith(cancelOrderResponse: ApiResponse.initial()));
          }
          break;
        case HomeEvent$UpdateContactName(:final name):
          if (state.deliveryParty == DeliveryParty.receiver) {
            emit(state.copyWith(receiverContact: state.receiverContact?.copyWith(name: name)));
          } else {
            emit(state.copyWith(senderContact: state.senderContact?.copyWith(name: name)));
          }
          break;
        case HomeEvent$UpdateContactPhone(:final phoneNumber):
          if (state.deliveryParty == DeliveryParty.receiver) {
            emit(state.copyWith(receiverContact: state.receiverContact?.copyWith(phoneNumber: phoneNumber)));
          } else {
            emit(state.copyWith(senderContact: state.senderContact?.copyWith(phoneNumber: phoneNumber)));
          }
          break;
        case HomeEvent$UpdateContactAddress(:final address):
          if (state.deliveryParty == DeliveryParty.receiver) {
            emit(state.copyWith(receiverContact: state.receiverContact?.copyWith(addressLine1: address)));
          } else {
            emit(state.copyWith(senderContact: state.senderContact?.copyWith(addressLine1: address)));
          }
        case HomeEvent$UpdateContactBuilding(:final building):
          if (state.deliveryParty == DeliveryParty.receiver) {
            emit(state.copyWith(receiverContact: state.receiverContact?.copyWith(buildingNumber: building)));
          } else {
            emit(state.copyWith(senderContact: state.senderContact?.copyWith(buildingNumber: building)));
          }
          break;
        case HomeEvent$UpdateContactApartment(:final apartment):
          if (state.deliveryParty == DeliveryParty.receiver) {
            emit(state.copyWith(receiverContact: state.receiverContact?.copyWith(apartmentNumber: apartment)));
          } else {
            emit(state.copyWith(senderContact: state.senderContact?.copyWith(apartmentNumber: apartment)));
          }
          break;
        case HomeEvent$UpdateContactInstructions(:final instructions):
          if (state.deliveryParty == DeliveryParty.receiver) {
            emit(state.copyWith(receiverContact: state.receiverContact?.copyWith(instructions: instructions)));
          } else {
            emit(state.copyWith(senderContact: state.senderContact?.copyWith(instructions: instructions)));
          }
          break;

        case HomeEvent$OnServiceCategorySelected(:final serviceCategory):
          emit(state.copyWith(selectedServiceCategory: serviceCategory, selectedService: null));
          break;

        case HomeEvent$OnServiceSelected(:final service, :final value):
          if (value) {
            emit(state.copyWith(selectedService: service));
          } else {
            emit(state.copyWith(selectedService: null));
          }
          break;

        case HomeEvent$OnPaymentMethodSelected(:final paymentMethod):
          emit(state.copyWith(selectedPaymentMethod: paymentMethod));
          break;

        case HomeEvent$OnRidePreferencesUpdated(:final isTwoWayTrip, :final waitTime, :final rideOptions):
          emit(state.copyWith(isTwoWayRide: isTwoWayTrip, waitTime: waitTime, rideOptions: rideOptions));
          break;

        case HomeEvent$OnReviewSubmitted(
            :final orderId,
            :final rating,
            :final comment,
            :final parameters,
            :final isFavorite,
          ):
          emit(state.copyWith(reviewSubmissionState: ApiResponse.loading()));
          final result = await orderRepository.submitReview(
            orderId: orderId,
            rating: rating,
            comment: comment,
            reviewParameters: parameters.map((e) => int.parse(e.id)).toList(),
            isFavorite: isFavorite,
          );
          emit(state.copyWith(reviewSubmissionState: result));
          add(HomeEvent.initializeWelcome(pickupPoint: state.waypoints.firstOrNull));
          break;

        case HomeEvent$SkipReview(:final orderId):
          emit(state.copyWith(reviewSubmissionState: ApiResponse.initial()));
          final result = await orderRepository.skipReview(orderId: orderId);
          emit(state.copyWith(reviewSubmissionState: result));
          add(HomeEvent.initializeWelcome(pickupPoint: state.waypoints.firstOrNull));
          break;
      }
    });
  }

  Future<void> _showDriversAround({required List<Place?> waypoints, required Emitter<HomeState> emitter}) async {
    if (waypoints.first == null) {
      emitter(state.copyWith(driversAround: []));
      return;
    }
    final driversAround = await homeRepository.getDriversAround(waypoints.first!.latLng);
    emitter(state.copyWith(driversAround: driversAround.data ?? [], waypoints: waypoints));
  }

  void cancelRide({required String orderId, required String? cancelReasonId, required String? cancelReasonNote}) =>
      add(HomeEvent.cancelRide(orderId: orderId, cancelReasonId: cancelReasonId, cancelReasonNote: cancelReasonNote));

  void onPaymentMethodSelected(PaymentMethodUnion paymentMethod) =>
      add(HomeEvent.onPaymentMethodSelected(paymentMethod: paymentMethod));

  void onServiceCategorySelected(Fragment$ServiceCategory fragment$serviceCategory) =>
      add(HomeEvent.onServiceCategorySelected(serviceCategory: fragment$serviceCategory));

  // @override
  // HomeState? fromJson(Map<String, dynamic> json) => HomeState.fromJson(json);

  // @override
  // Map<String, dynamic>? toJson(HomeState state) => state.toJson();

  @override
  void onChange(Change<HomeState> change) {
    // if (kDebugMode) {
    //   Logger().d('HomeBloc state changed: ${change.currentState} -> ${change.nextState}');
    // }
    super.onChange(change);
  }
}
