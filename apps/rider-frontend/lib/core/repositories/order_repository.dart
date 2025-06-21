import 'package:api_response/api_response.dart';
import 'package:rider_flutter/core/graphql/documents/calculate_fare.graphql.dart';
import 'package:rider_flutter/core/graphql/fragments/active_order.fragment.graphql.dart';
import 'package:rider_flutter/core/graphql/schema.gql.dart';

abstract class OrderRepository {
  Stream<ApiResponse<List<Fragment$ActiveOrder>>> get activeOrdersStream;

  void refreshActiveOrders();

  void startListeningToActiveOrders();
  void stopListeningToActiveOrders();

  Future<ApiResponse<Query$CalculateFare>> calculateFare({required Input$CalculateFareInput args});

  Future<ApiResponse<Fragment$CurrentOrder>> createOrder({required Input$CreateOrderInput args});

  Future<ApiResponse<void>> cancelOrder({
    required String orderId,
    required String? reasonId,
    required String? reasonText,
  });

  Future<void> updateLastSeenMessages({required String orderId, required String? lastSeenMessageId});

  Future<ApiResponse<void>> sendMessage({required String orderId, required String message});

  Future<ApiResponse<void>> submitReview({
    required String orderId,
    required int rating,
    required bool isFavorite,
    required String? comment,
    required List<int> reviewParameters,
  });

  Future<ApiResponse<void>> skipReview({required String orderId});
}
