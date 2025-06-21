import 'dart:async';

import 'package:api_response/api_response.dart';
import 'package:collection/collection.dart';
import 'package:graphql/client.dart';
import 'package:injectable/injectable.dart';
import 'package:rider_flutter/core/graphql/documents/create_order.graphql.dart';
import 'package:rider_flutter/core/graphql/documents/home.graphql.dart';
import 'package:rider_flutter/core/graphql/documents/rate_ride.graphql.dart';
import 'package:rider_flutter/core/graphql/documents/track_order.graphql.dart';
import 'package:rider_flutter/core/graphql/fragments/active_order.fragment.graphql.dart';
import 'package:rxdart/rxdart.dart';

import 'package:rider_flutter/core/datasources/graphql_datasource.dart';
import 'package:rider_flutter/core/graphql/documents/calculate_fare.graphql.dart';
import 'package:rider_flutter/core/graphql/schema.gql.dart';
import 'package:rider_flutter/core/repositories/order_repository.dart';

@prod
@LazySingleton(as: OrderRepository)
class OrderRepositoryImpl implements OrderRepository {
  final GraphqlDatasource graphqlDatasource;

  OrderRepositoryImpl(this.graphqlDatasource);

  @override
  Stream<ApiResponse<List<Fragment$ActiveOrder>>> get activeOrdersStream => _activeOrdersStream.stream;

  final BehaviorSubject<ApiResponse<List<Fragment$ActiveOrder>>> _activeOrdersStream =
      BehaviorSubject<ApiResponse<List<Fragment$ActiveOrder>>>();

  StreamSubscription? orderUpdatedSubscription;
  StreamSubscription? newMessageReceivedSubscription;
  StreamSubscription? driverLocationUpdatedSubscription;

  @override
  void refreshActiveOrders() async {
    final activeOrders = await graphqlDatasource.query(Options$Query$CurrentOrder());
    _activeOrdersStream.add(activeOrders.mapData((data) => data.activeOrders));
  }

  @override
  Future<ApiResponse<Query$CalculateFare>> calculateFare({required Input$CalculateFareInput args}) async {
    final result = await graphqlDatasource.query(
      Options$Query$CalculateFare(variables: Variables$Query$CalculateFare(input: args)),
    );
    return result.mapData((r) => r);
  }

  @override
  Future<ApiResponse<Fragment$CurrentOrder>> createOrder({required Input$CreateOrderInput args}) async {
    final orderResponse = await graphqlDatasource.mutate(
      Options$Mutation$CreateOrder(variables: Variables$Mutation$CreateOrder(input: args)),
    );
    if (orderResponse.data == null) {
      return orderResponse.mapData((data) => data.createOrder);
    }
    _activeOrdersStream.add(
      ApiResponse.loaded(
        _activeOrdersStream.value.data?.followedBy([
              Fragment$ActiveOrder(order: orderResponse.data!.createOrder),
            ]).toList() ??
            [],
      ),
    );
    return orderResponse.mapData((data) => data.createOrder);
  }

  @override
  Future<ApiResponse<void>> cancelOrder({
    required String orderId,
    required String? reasonId,
    required String? reasonText,
  }) async {
    final cancelOrderResponse = await graphqlDatasource.mutate(
      Options$Mutation$CancelOrder(
        variables: Variables$Mutation$CancelOrder(
          orderId: orderId,
          cancelReasonId: reasonId,
          cancelReasonNote: reasonText,
        ),
      ),
    );
    if (cancelOrderResponse.data != null) {
      final order = _activeOrdersStream.value.data?.firstWhereOrNull((order) => order.order.id == orderId);
      if (order != null) {
        _activeOrdersStream.add(
          ApiResponse.loaded(_activeOrdersStream.value.data?.where((o) => o.order.id != orderId).toList() ?? []),
        );
      }
    }
    return cancelOrderResponse.mapData((data) => data.cancelOrder);
  }

  @override
  Future<void> updateLastSeenMessages({required String orderId, required String? lastSeenMessageId}) async {
    final updateResponse = await graphqlDatasource.mutate(
      Options$Mutation$UpdateLastSeenMessages(variables: Variables$Mutation$UpdateLastSeenMessages(orderId: orderId)),
    );
    if (updateResponse.data != null) {
      final order = _activeOrdersStream.value.data?.firstWhereOrNull((order) => order.order.id == orderId);
      if (order != null) {
        final updatedOrder = order.copyWith(order: order.order.copyWith(riderLastSeenMessagesAt: DateTime.now()));
        _activeOrdersStream.add(
          ApiResponse.loaded(
            _activeOrdersStream.value.data!.map((e) => e.order.id == orderId ? updatedOrder : e).toList(),
          ),
        );
      }
    }
  }

  @override
  Future<ApiResponse<void>> sendMessage({required String orderId, required String message}) async {
    final sendMessageResponse = await graphqlDatasource.mutate(
      Options$Mutation$SendMessage(variables: Variables$Mutation$SendMessage(orderId: orderId, message: message)),
    );
    if (sendMessageResponse.data != null) {
      final order = _activeOrdersStream.value.data?.firstWhereOrNull((order) => order.order.id == orderId);
      if (order != null) {
        _activeOrdersStream.add(
          ApiResponse.loaded(
            _activeOrdersStream.value.data!
                .map((e) => e.order.id == orderId
                    ? e.copyWith(
                        order: e.order.copyWith(
                            conversation: e.order.conversation
                                .followedBy([sendMessageResponse.data!.createOneOrderMessage]).toList()))
                    : e)
                .toList(),
          ),
        );
      }
    }
    return sendMessageResponse;
  }

  @override
  void startListeningToActiveOrders() {
    if (orderUpdatedSubscription != null ||
        newMessageReceivedSubscription != null ||
        driverLocationUpdatedSubscription != null) {
      stopListeningToActiveOrders();
    }
    orderUpdatedSubscription = graphqlDatasource.subscribe(Options$Subscription$OrderUpdateSubscription()).listen((
      event,
    ) {
      final order = event.orderUpdated;
      _activeOrdersStream.add(
        ApiResponse.loaded(
          _activeOrdersStream.value.data?.map((e) => e.order.id == order.id ? e.copyWith(order: order) : e).toList() ??
              [],
        ),
      );
    });

    newMessageReceivedSubscription =
        graphqlDatasource.subscribe(Options$Subscription$NewMessageReceived(fetchPolicy: FetchPolicy.noCache)).listen((
      event,
    ) {
      final message = event.newMessageReceived;
      _activeOrdersStream.add(
        ApiResponse.loaded(
          _activeOrdersStream.value.data
                  ?.map(
                    (e) => e.order.id == message.requestId
                        ? e.copyWith(
                            order: e.order.copyWith(conversation: [...e.order.conversation, message]),
                          )
                        : e,
                  )
                  .toList() ??
              [],
        ),
      );
    });

    driverLocationUpdatedSubscription = graphqlDatasource.subscribe(Options$Subscription$DriverLocationUpdated()).listen(
      (event) {
        final location = event.driverLocationUpdated;
        _activeOrdersStream.add(
          ApiResponse.loaded(
            _activeOrdersStream.value.data
                    ?.map((e) => e.order.id == location.orderId ? e.copyWith(driverLocation: location.point) : e)
                    .toList() ??
                [],
          ),
        );
      },
    );
  }

  @override
  void stopListeningToActiveOrders() {
    orderUpdatedSubscription?.cancel();
    orderUpdatedSubscription = null;
    newMessageReceivedSubscription?.cancel();
    newMessageReceivedSubscription = null;
    driverLocationUpdatedSubscription?.cancel();
    driverLocationUpdatedSubscription = null;
  }

  @override
  Future<ApiResponse<void>> submitReview({
    required String orderId,
    required int rating,
    required bool isFavorite,
    required String? comment,
    required List<int> reviewParameters,
  }) async {
    final result = await graphqlDatasource.mutate(
      Options$Mutation$SubmitReview(
        variables: Variables$Mutation$SubmitReview(
          requestId: orderId,
          score: rating,
          feedback: comment,
          parameterIds: reviewParameters.map((e) => e.toString()).toList(),
          addToFavorite: isFavorite,
        ),
      ),
    );
    if (result.data != null) {
      final order = _activeOrdersStream.value.data?.firstWhereOrNull((order) => order.order.id == orderId);
      if (order != null) {
        _activeOrdersStream.add(
          ApiResponse.loaded(_activeOrdersStream.value.data!.where((e) => e.order.id != orderId).toList()),
        );
      }
    }

    return result;
  }

  @override
  Future<ApiResponse<void>> skipReview({required String orderId}) async {
    final result = await graphqlDatasource.mutate(Options$Mutation$SkipReview());
    if (result.data != null) {
      final order = _activeOrdersStream.value.data?.firstWhereOrNull((order) => order.order.id == orderId);
      if (order != null) {
        _activeOrdersStream.add(
          ApiResponse.loaded(_activeOrdersStream.value.data!.where((e) => e.order.id != orderId).toList()),
        );
      }
    }
    return result;
  }
}
