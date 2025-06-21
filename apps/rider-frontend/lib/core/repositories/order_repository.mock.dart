import 'dart:async';

import 'package:api_response/api_response.dart';
import 'package:injectable/injectable.dart';
import 'package:rider_flutter/core/graphql/fragments/active_order.mock.dart';
import 'package:rider_flutter/core/graphql/fragments/payment_gateway.mock.dart';
import 'package:rider_flutter/core/graphql/fragments/saved_payment_method.mock.dart';
import 'package:rider_flutter/core/graphql/fragments/service_category.mock.dart';
import 'package:rider_flutter/core/graphql/fragments/wallet.mock.dart';
import 'package:rxdart/rxdart.dart';

import 'package:rider_flutter/core/graphql/documents/calculate_fare.graphql.dart';
import 'package:rider_flutter/core/graphql/fragments/active_order.fragment.graphql.dart';
import 'package:rider_flutter/core/graphql/schema.gql.dart';
import 'package:rider_flutter/core/repositories/order_repository.dart';

@dev
@LazySingleton(as: OrderRepository)
class OrderRepositoryMock implements OrderRepository {
  @override
  Stream<ApiResponse<List<Fragment$ActiveOrder>>> get activeOrdersStream => _activeOrdersStream.stream;

  final BehaviorSubject<ApiResponse<List<Fragment$ActiveOrder>>> _activeOrdersStream =
      BehaviorSubject<ApiResponse<List<Fragment$ActiveOrder>>>();

  StreamSubscription? orderUpdatedSubscription;
  StreamSubscription? newMessageReceivedSubscription;
  StreamSubscription? driverLocationUpdatedSubscription;

  @override
  Future<ApiResponse<Query$CalculateFare>> calculateFare({required Input$CalculateFareInput args}) async {
    await Future.delayed(const Duration(seconds: 1));
    return ApiResponse.loaded(Query$CalculateFare(
        getFares: Query$CalculateFare$getFares(
            services: mockServiceCategories, directions: [], currency: 'USD', distance: 430, duration: 311),
        savedPaymentMethods: mockSavedPaymentMethods,
        paymentGateways: mockPaymentGateways,
        riderWallets: [mockWallet1]));
  }

  @override
  void refreshActiveOrders() {
    bool hasOrders = false;
    // ignore: dead_code
    if (hasOrders) {
      _activeOrdersStream.add(
        ApiResponse.loaded([mockActiveOrder1]),
      );
      // ignore: dead_code
    } else {
      _activeOrdersStream.add(ApiResponse.loaded([]));
    }
  }

  @override
  Future<ApiResponse<Fragment$CurrentOrder>> createOrder({required Input$CreateOrderInput args}) async {
    await Future.delayed(const Duration(seconds: 1));
    _activeOrdersStream.add(
      ApiResponse.loaded([mockActiveOrder1]),
    );
    return ApiResponse.loaded(mockActiveOrder1.order);
  }

  @override
  Future<ApiResponse<void>> cancelOrder({
    required String orderId,
    required String? reasonId,
    required String? reasonText,
  }) async {
    await Future.delayed(const Duration(seconds: 1));
    _activeOrdersStream.add(ApiResponse.loaded([]));
    return ApiResponse.loaded(null);
  }

  @override
  Future<void> updateLastSeenMessages({required String orderId, required String? lastSeenMessageId}) async {
    await Future.delayed(const Duration(seconds: 1));
  }

  @override
  Future<ApiResponse<void>> sendMessage({required String orderId, required String message}) async {
    await Future.delayed(const Duration(seconds: 1));

    return ApiResponse.loaded(null);
  }

  @override
  void startListeningToActiveOrders() {
    orderUpdatedSubscription = Stream.periodic(const Duration(seconds: 5), (count) {
      if (count % 2 == 0) {
        _activeOrdersStream.add(
          ApiResponse.loaded([
            mockActiveOrder1,
          ]),
        );
      } else {
        _activeOrdersStream.add(ApiResponse.loaded([]));
      }
    }).listen((_) {});
  }

  @override
  void stopListeningToActiveOrders() {
    orderUpdatedSubscription?.cancel();
    orderUpdatedSubscription = null;
  }

  @override
  Future<ApiResponse<void>> submitReview({
    required String orderId,
    required int rating,
    required bool isFavorite,
    required String? comment,
    required List<int> reviewParameters,
  }) async {
    return ApiResponse.loaded(null);
  }

  @override
  Future<ApiResponse<void>> skipReview({required String orderId}) async {
    return ApiResponse.loaded(null);
  }
}
