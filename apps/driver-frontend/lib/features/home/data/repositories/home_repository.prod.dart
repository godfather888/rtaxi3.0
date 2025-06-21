import 'dart:async';

import 'package:api_response/api_response.dart';
import 'package:collection/collection.dart';
import 'package:driver_flutter/core/graphql/documents/chat.graphql.dart';
import 'package:driver_flutter/core/graphql/documents/home.graphql.dart';
import 'package:driver_flutter/core/graphql/documents/profile.graphql.dart';
import 'package:driver_flutter/core/graphql/documents/track_order.graphql.dart';
import 'package:driver_flutter/core/graphql/fragments/current_order.extentions.dart';
import 'package:driver_flutter/core/graphql/fragments/current_order.fragment.graphql.dart';
import 'package:driver_flutter/core/graphql/fragments/order_request.fragment.graphql.dart';
import 'package:driver_flutter/core/graphql/fragments/point.fragment.graphql.dart';
import 'package:driver_flutter/core/graphql/fragments/profile.fragment.graphql.dart';
import 'package:driver_flutter/core/graphql/schema.gql.dart';
import 'package:flutter/foundation.dart';
import 'package:graphql/client.dart';
import 'package:injectable/injectable.dart';
import 'package:rxdart/rxdart.dart';

import '../../../../core/datasources/graphql_datasource.dart';
import '../../domain/repositories/home_repository.dart';

@prod
@LazySingleton(as: HomeRepository)
class HomeRepositoryImpl implements HomeRepository {
  // Streams
  @override
  Stream<List<Fragment$OrderRequest>> get orderRequests => _orderRequests.stream;
  final BehaviorSubject<List<Fragment$OrderRequest>> _orderRequests = BehaviorSubject.seeded([]);

  @override
  Stream<ApiResponse<Fragment$ProfileFull>> get profile => _profile.stream;
  final BehaviorSubject<ApiResponse<Fragment$ProfileFull>> _profile = BehaviorSubject.seeded(ApiResponse.initial());

  final GraphqlDatasource graphQLDatasource;

  // Subscriptions
  StreamSubscription? orderCreatedSubscription;
  StreamSubscription? orderRemovedSubscription;
  StreamSubscription? orderUpdatedSubscription;
  StreamSubscription? chatMessageSubscription;

  HomeRepositoryImpl(
    this.graphQLDatasource,
  );

  @override
  Future<ApiResponse<Query$Profile>> getProfile() async {
    _profile.add(ApiResponse.loading());
    final getProfileResponse = await graphQLDatasource.query(
      Options$Query$Profile(),
    );

    _profile.add(getProfileResponse.mapData((r) => r.driver));
    return getProfileResponse;
  }

  @override
  Future<ApiResponse<Mutation$UpdateDriverStatus>> updateStatus({
    required Enum$DriverStatus status,
  }) async {
    final updateStatusResponse = await graphQLDatasource.mutate(
      Options$Mutation$UpdateDriverStatus(
        variables: Variables$Mutation$UpdateDriverStatus(
          status: status,
        ),
      ),
    );
    _profile.add(updateStatusResponse.mapData((r) => r.updateOneDriver));
    return updateStatusResponse;
  }

  @override
  Future<ApiResponse<Fragment$CurrentOrder>> acceptOrderRequest({
    required String requestId,
  }) async {
    final order = await graphQLDatasource.mutate(
      Options$Mutation$UpdateOrderStatus(
        fetchPolicy: FetchPolicy.noCache,
        variables: Variables$Mutation$UpdateOrderStatus(orderId: requestId, status: Enum$OrderStatus.DriverAccepted),
      ),
    );
    final currentOrders = _profile.value.data?.currentOrders;
    if (currentOrders == null) {
      return ApiResponse.error('No current orders');
    }
    if (order.data == null) {
      return order.mapData((r) => r.updateOneOrder);
    }
    if (currentOrders.any((element) => element.id == order.data?.updateOneOrder.id)) {
      return ApiResponse.error('Order already exists');
    }
    final updatedOrders = [...currentOrders, order.data!.updateOneOrder];
    _profile.add(
      ApiResponse.loaded(
        _profile.value.data!.copyWith(currentOrders: updatedOrders, status: Enum$DriverStatus.InService),
      ),
    );
    return order.mapData((r) => r.updateOneOrder);
  }

  @override
  Future<void> rejectOrderRequest({
    required String requestId,
  }) {
    throw Exception('Our backend\'s design does not allow order rejection');
  }

  @override
  Future<ApiResponse<Mutation$UpdateDriverLocation>> updateDriverLocation({
    required Fragment$Point location,
  }) async {
    if (kDebugMode) {
      print('Updating driver location: ${location.lat}, ${location.lng}, ${location.heading}');
    }
    final updateDriverLocationResponse = await graphQLDatasource.mutate(
      Options$Mutation$UpdateDriverLocation(
        fetchPolicy: FetchPolicy.noCache,
        variables: Variables$Mutation$UpdateDriverLocation(
          point: Input$PointInput(
            lat: location.lat,
            lng: location.lng,
            heading: location.heading,
          ),
        ),
      ),
    );
    final requests = updateDriverLocationResponse.mapData((r) => r.updateDriversLocationNew);
    _orderRequests.add(requests.data ?? []);
    return updateDriverLocationResponse;
  }

  @override
  Future<ApiResponse<Mutation$UpdateOrderStatus>> arrivedToDestination({
    required Fragment$CurrentOrder order,
    required int destinationArrivedTo,
  }) {
    return _updateOrderStatus(
      Variables$Mutation$UpdateOrderStatus(
        orderId: order.id,
        status:
            order.wayPoints.length >= destinationArrivedTo + 1 ? Enum$OrderStatus.Finished : Enum$OrderStatus.Started,
        destinationArrivedTo: destinationArrivedTo,
      ),
    );
  }

  @override
  Future<ApiResponse<Mutation$UpdateOrderStatus>> arrivedToPickup({
    required String orderId,
  }) {
    return _updateOrderStatus(
      Variables$Mutation$UpdateOrderStatus(
        orderId: orderId,
        status: Enum$OrderStatus.Arrived,
      ),
    );
  }

  @override
  Future<ApiResponse<Mutation$UpdateOrderStatus>> cancelOrder({
    required String orderId,
  }) {
    return _updateOrderStatus(
      Variables$Mutation$UpdateOrderStatus(
        orderId: orderId,
        status: Enum$OrderStatus.DriverCanceled,
      ),
    );
  }

  @override
  Future<ApiResponse<Mutation$UpdateOrderStatus>> startTrip({
    required String orderId,
  }) {
    return _updateOrderStatus(
      Variables$Mutation$UpdateOrderStatus(
        orderId: orderId,
        status: Enum$OrderStatus.Started,
        destinationArrivedTo: 0,
      ),
    );
  }

  Future<ApiResponse<Mutation$UpdateOrderStatus>> _updateOrderStatus(
    Variables$Mutation$UpdateOrderStatus varialbes,
  ) async {
    final updateOrderStatusResponse = await graphQLDatasource.mutate(
      Options$Mutation$UpdateOrderStatus(
        fetchPolicy: FetchPolicy.noCache,
        variables: varialbes,
      ),
    );
    return updateOrderStatusResponse;
  }

  @override
  Future<ApiResponse<Query$CancelReasons>> getCancelReasons() async {
    final cancelReasonsResponse = await graphQLDatasource.query(
      Options$Query$CancelReasons(),
    );
    return cancelReasonsResponse;
  }

  @override
  Future<ApiResponse<Mutation$SubmitReview>> submitReview({
    required String orderId,
    required int rating,
    required String? review,
  }) async {
    final submitReviewResponse = await graphQLDatasource.mutate(
      Options$Mutation$SubmitReview(
        variables: Variables$Mutation$SubmitReview(
          input: Input$RiderReviewInput(
            orderId: orderId,
            score: rating,
            description: review,
          ),
        ),
      ),
    );
    return submitReviewResponse;
  }

  @override
  Future<ApiResponse<Mutation$UpdateOrderStatus>> paidInCash({
    required String orderId,
    required double amount,
  }) {
    return _updateOrderStatus(
      Variables$Mutation$UpdateOrderStatus(
        orderId: orderId,
        status: Enum$OrderStatus.Finished,
        cashPayment: amount,
      ),
    );
  }

  @override
  Future<ApiResponse<Mutation$SendMessage>> sendMessage({
    required String orderId,
    required String message,
  }) async {
    final sendMessageResponse = await graphQLDatasource.mutate(
      Options$Mutation$SendMessage(
        fetchPolicy: FetchPolicy.noCache,
        variables: Variables$Mutation$SendMessage(
          orderId: orderId,
          message: message,
        ),
      ),
    );
    if (sendMessageResponse.data == null) {
      return ApiResponse.error('Failed to send message');
    }
    final currentOrders = _profile.value.data?.currentOrders;
    if (currentOrders == null) {
      return ApiResponse.error('No current orders');
    }
    final order = currentOrders.firstWhereOrNull((element) => element.id == orderId);
    if (order == null) {
      return ApiResponse.error('Order not found');
    }
    final updatedOrders = currentOrders.map((e) {
      if (e.id == orderId) {
        return e.copyWith(
          conversation: [...e.conversation, sendMessageResponse.data!.createOneOrderMessage],
        );
      }
      return e;
    }).toList();
    _profile.add(ApiResponse.loaded(_profile.value.data!.copyWith(currentOrders: updatedOrders)));

    return sendMessageResponse;
  }

  @override
  void startOrderUpdatedSubscription() {
    final chatMessageStream = graphQLDatasource.subscribe(
      Options$Subscription$ChatMessage(fetchPolicy: FetchPolicy.noCache),
    );
    final orderUpdateStream = graphQLDatasource.subscribe(
      Options$Subscription$OrderUpdated(fetchPolicy: FetchPolicy.noCache),
    );
    orderUpdatedSubscription = orderUpdateStream.listen((event) {
      final currentOrders = _profile.value.data?.currentOrders;
      if (currentOrders == null) return;
      final order = event.orderUpdated;
      final updatedOrders = currentOrders
          .map((e) {
            if (e.id == order.id) {
              return order;
            }
            return e;
          })
          .where((e) =>
              e.status != Enum$OrderStatus.DriverCanceled &&
              e.status != Enum$OrderStatus.Finished &&
              e.status != Enum$OrderStatus.RiderCanceled &&
              e.status != Enum$OrderStatus.WaitingForReview)
          .toList();
      _profile.add(ApiResponse.loaded(_profile.value.data!.copyWith(
          currentOrders: updatedOrders,
          status: updatedOrders.isNotEmpty ? Enum$DriverStatus.InService : Enum$DriverStatus.Online)));
    });
    chatMessageSubscription = chatMessageStream.listen((event) {
      final currentOrders = _profile.value.data?.currentOrders;
      if (currentOrders == null) return;
      final message = event.newMessageReceived;
      final order = currentOrders.firstWhereOrNull((element) => element.id == message.requestId);
      if (order == null) return;
      final updatedOrders = currentOrders.map((e) {
        if (e.id == order.id) {
          return e.copyWith(
            conversation: [...e.conversation, message],
          );
        }
        return e;
      }).toList();
      _profile.add(ApiResponse.loaded(_profile.value.data!.copyWith(currentOrders: updatedOrders)));
    });
  }

  @override
  void stopOrderUpdatedSubscription() {
    orderUpdatedSubscription?.cancel();
    orderUpdatedSubscription = null;
  }

  @override
  Future<ApiResponse<Mutation$SendSOS>> sendSosSignal({
    required String orderId,
  }) async {
    final sendSosSignalResponse = await graphQLDatasource.mutate(
      Options$Mutation$SendSOS(
        fetchPolicy: FetchPolicy.noCache,
        variables: Variables$Mutation$SendSOS(id: orderId),
      ),
    );
    return sendSosSignalResponse;
  }

  @override
  void startGettingOrderRequestUpdates() {
    final Stream<Fragment$OrderRequest> orderCreatedStream = graphQLDatasource
        .subscribe(Options$Subscription$OrderCreated(fetchPolicy: FetchPolicy.noCache))
        .map((event) => event.orderCreated);
    final Stream<Fragment$OrderRequest> orderRemovedStream = graphQLDatasource
        .subscribe(Options$Subscription$OrderRemoved(fetchPolicy: FetchPolicy.noCache))
        .map((event) => event.orderRemoved);
    orderCreatedSubscription = orderCreatedStream.listen((event) {
      if (kDebugMode) {
        print('Order created: ${event.id}');
      }
      if (_orderRequests.value.any((element) => element.id == event.id)) {
        return;
      }
      _orderRequests.add([..._orderRequests.value, event]);
    });
    orderRemovedSubscription = orderRemovedStream.listen((event) {
      if (_orderRequests.value.any((element) => element.id == event.id)) {
        _orderRequests.add(_orderRequests.value.where((element) => element.id != event.id).toList());
      }
    });
  }

  @override
  void stopGettingOrderRequestUpdates() {
    orderCreatedSubscription?.cancel();
    orderRemovedSubscription?.cancel();
    orderCreatedSubscription = null;
    orderRemovedSubscription = null;
  }

  @override
  Future<ApiResponse<Mutation$UpdateLastSeenMessagesAt>> updateLastSeenMessagesAt({
    required String orderId,
  }) {
    return graphQLDatasource.mutate(
      Options$Mutation$UpdateLastSeenMessagesAt(
        fetchPolicy: FetchPolicy.noCache,
        variables: Variables$Mutation$UpdateLastSeenMessagesAt(
          orderId: orderId,
        ),
      ),
    );
  }
}
