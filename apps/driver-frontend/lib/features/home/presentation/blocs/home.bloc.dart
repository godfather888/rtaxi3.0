import 'package:api_response/api_response.dart';
import 'package:driver_flutter/core/datasources/location_datasource.dart';
import 'package:driver_flutter/core/graphql/fragments/current_order.extentions.dart';
import 'package:driver_flutter/core/graphql/fragments/current_order.fragment.graphql.dart';
import 'package:driver_flutter/core/graphql/fragments/order_request.extentions.dart';
import 'package:driver_flutter/core/graphql/fragments/order_request.fragment.graphql.dart';
import 'package:driver_flutter/core/graphql/fragments/point.extentions.dart';
import 'package:driver_flutter/core/graphql/fragments/point.fragment.graphql.dart';
import 'package:driver_flutter/core/graphql/fragments/profile.fragment.graphql.dart';
import 'package:driver_flutter/core/graphql/schema.gql.dart';
import 'package:driver_flutter/core/repositories/firebase_repository.dart';
import 'package:driver_flutter/features/home/domain/repositories/home_repository.dart';
import 'package:driver_flutter/gen/assets.gen.dart';
import 'package:flutter/material.dart';
import 'package:flutter_common/core/color_palette/color_palette.dart';
import 'package:flutter_common/core/entities/place.dart';
import 'package:generic_map/generic_map.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:hydrated_bloc/hydrated_bloc.dart';
import 'package:injectable/injectable.dart';
import 'package:latlong2/latlong.dart';

part 'home.event.dart';
part 'home.state.dart';
part 'home.bloc.freezed.dart';
// part 'home.bloc.g.dart';

@lazySingleton
class HomeBloc extends Bloc<HomeEvent, HomeState> {
  final HomeRepository _repository;
  final FirebaseRepository _firebaseRepository;
  final LocationDatasource _locationDatasource;

  HomeBloc(
    this._repository,
    this._firebaseRepository,
    this._locationDatasource,
  ) : super(HomeState()) {
    on<HomeEvent>((event, emit) async {
      switch (event) {
        case HomeEvent$OnStarted():
          _firebaseRepository.retrieveAndUpdateFcmToken();
          _repository.getProfile();
          add(HomeEvent.requestUpdatedOrderRequests());
          await Future.wait([
            emit.forEach(
              _repository.orderRequests,
              onData: (data) {
                return state.copyWith(orderRequests: data);
              },
            ),
            emit.forEach(
              _repository.profile,
              onData: (data) {
                final previousStatus = state.profileFragment.data?.status;
                final newStatus = data.data?.status;

                if (newStatus != previousStatus) {
                  if (newStatus == Enum$DriverStatus.Online) {
                    _repository.startGettingOrderRequestUpdates();
                    _repository.startOrderUpdatedSubscription();
                  }
                  if (newStatus == Enum$DriverStatus.Offline) {
                    _repository.stopGettingOrderRequestUpdates();
                    _repository.startOrderUpdatedSubscription();
                  }
                  if (newStatus == Enum$DriverStatus.InService) {
                    // Assuming InService implies online, so we might want to ensure order updates are active.
                    // If it was previously Offline, then start listening.
                    // If it was Online, it might already be listening, but this ensures it.
                    _repository.startOrderUpdatedSubscription();
                  }
                }
                return state.copyWith(profileFragment: data);
              },
            ),
            emit.forEach(
              _locationDatasource.driverLocation,
              onData: (data) {
                return state.copyWith(
                  driverLocation: data.data ?? state.driverLocation,
                  lastLocationUpdate: DateTime.now(),
                );
              },
            ),
          ]);
          break;

        case HomeEvent$OnStatusChanged(:final status):
          _repository.updateStatus(status: status);
          if (status == Enum$DriverStatus.Online) {
            if (state.driverLocation != null) {
              _repository.updateDriverLocation(location: state.driverLocation!);
            }
          }
          break;

        // case HomeEvent$OnLocationUpdated(:final location, :final lastLocationUpdate):
        //   final orders = await _repository.updateDriverLocation(location: location);
        //   orders.fold(
        //     (failure) => null,
        //     (orderRequests) {
        //       if (state.driverStatus is HomeStateDriverStatus$OnlineDriver) {
        //         final onlineStatus = state.driverStatus as HomeStateDriverStatus$OnlineDriver;
        //         emit(
        //           state.copyWith(
        //             driverLocation: location,
        //             lastLocationUpdate: lastLocationUpdate,
        //             driverStatus: HomeStateDriverStatus.online(
        //               orderRequests: orderRequests.updateDriversLocationNew,
        //               currentOrderRequest: onlineStatus.currentOrderRequest,
        //             ),
        //           ),
        //         );
        //       } else {
        //         emit(state.copyWith(driverLocation: location, lastLocationUpdate: lastLocationUpdate));
        //       }
        //     },
        //   );
        //   break;

        case HomeEvent$OnAcceptOrder(:final request):
          emit(state.copyWith(acceptOrderReponse: ApiResponse.loading()));
          final order = await _repository.acceptOrderRequest(requestId: request.id);
          if (order.isLoaded) {
            emit(state.copyWith(acceptOrderReponse: order));
            emit(
              state.copyWith(
                acceptOrderReponse: ApiResponse.initial(),
                currentOrderId: order.data?.id,
                page: OnTripPage.overview,
              ),
            );
          } else {
            emit(state.copyWith(acceptOrderReponse: order));
            emit(state.copyWith(acceptOrderReponse: ApiResponse.initial()));
          }
          break;

        case HomeEvent$OnCancelOrder(:final orderId):
          await _repository.cancelOrder(orderId: orderId);

          break;

        case HomeEvent$OnArrivedToPickupPoint(:final orderId):
          await _repository.arrivedToPickup(orderId: orderId);

          break;

        case HomeEvent$OnTripStarted(:final orderId):
          await _repository.startTrip(orderId: orderId);

          break;

        case HomeEvent$OnArrivedToDestination(:final order, :final destinationArrivedTo):
          await _repository.arrivedToDestination(order: order, destinationArrivedTo: destinationArrivedTo);
          break;

        case HomeEvent$OnShowChat():
          emit(state.copyWith(page: OnTripPage.chat));
          break;

        case HomeEvent$ReviewSubmitted(:final rating, :final review, :final orderId):
          if (rating == null) {
            add(HomeEvent.onStarted());
          } else {
            await _repository.submitReview(orderId: orderId, rating: rating, review: review);
            add(HomeEvent.onStarted());
          }
          break;

        case HomeEvent$PaidInCash(:final orderId, :final amount):
          await _repository.paidInCash(orderId: orderId, amount: amount);
          break;

        case HomeEvent$OnSummaryConfirmed():
          // TODO: implement summary confirmation
          break;

        case HomeEvent$OnOrderRequestPageChanged(:final request):
          emit(state.copyWith(currentOrderRequest: request));
          break;

        case HomeEvent$OnHideChat():
          emit(state.copyWith(page: OnTripPage.overview));
          break;

        case HomeEvent$OnRefreshOrderRequests():
          if (state.driverLocation != null) {
            _repository.updateDriverLocation(location: state.driverLocation!);
            return;
          }
          // try every 5 seconds 2 times to get the location
          _locationDatasource.getCurrentLocation();
          for (var i = 0; i < 2; i++) {
            await Future.delayed(const Duration(seconds: 5));
            if (state.driverLocation != null) {
              _repository.updateDriverLocation(location: state.driverLocation!);
              break;
            }
          }

          break;
      }
    });
  }

  void onStarted() => add(HomeEvent.onStarted());

  void onStatusChanged(Enum$DriverStatus status) => add(HomeEvent.onStatusChanged(status: status));

  void onAcceptOrder(Fragment$OrderRequest request) => add(HomeEvent.onAcceptOrder(request: request));

  // @override
  // HomeState? fromJson(Map<String, dynamic> json) => HomeState.fromJson(json);

  // @override
  // Map<String, dynamic>? toJson(HomeState state) => state.toJson();
}
