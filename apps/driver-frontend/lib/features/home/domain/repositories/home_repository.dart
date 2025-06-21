import 'package:api_response/api_response.dart';
import 'package:driver_flutter/core/graphql/documents/chat.graphql.dart';
import 'package:driver_flutter/core/graphql/documents/home.graphql.dart';
import 'package:driver_flutter/core/graphql/documents/profile.graphql.dart';
import 'package:driver_flutter/core/graphql/documents/track_order.graphql.dart';
import 'package:driver_flutter/core/graphql/fragments/current_order.fragment.graphql.dart';
import 'package:driver_flutter/core/graphql/fragments/order_request.fragment.graphql.dart';
import 'package:driver_flutter/core/graphql/fragments/point.fragment.graphql.dart';
import 'package:driver_flutter/core/graphql/fragments/profile.fragment.graphql.dart';
import 'package:driver_flutter/core/graphql/schema.gql.dart';

abstract class HomeRepository {
  Stream<List<Fragment$OrderRequest>> get orderRequests;
  Stream<ApiResponse<Fragment$ProfileFull>> get profile;

  Future<ApiResponse<Query$Profile>> getProfile();

  Future<ApiResponse<Mutation$UpdateDriverStatus>> updateStatus({
    required Enum$DriverStatus status,
  });

  Future<ApiResponse<Mutation$UpdateDriverLocation>> updateDriverLocation({
    required Fragment$Point location,
  });

  void startGettingOrderRequestUpdates();

  void stopGettingOrderRequestUpdates();

  Future<ApiResponse<Fragment$CurrentOrder>> acceptOrderRequest({
    required String requestId,
  });

  Future<void> rejectOrderRequest({
    required String requestId,
  });

  Future<ApiResponse<Query$CancelReasons>> getCancelReasons();

  Future<ApiResponse<Mutation$UpdateOrderStatus>> cancelOrder({
    required String orderId,
  });

  Future<ApiResponse<Mutation$UpdateOrderStatus>> arrivedToPickup({
    required String orderId,
  });

  Future<ApiResponse<Mutation$UpdateOrderStatus>> startTrip({
    required String orderId,
  });

  Future<ApiResponse<Mutation$SubmitReview>> submitReview({
    required String orderId,
    required int rating,
    required String? review,
  });

  Future<ApiResponse<Mutation$UpdateOrderStatus>> paidInCash({
    required String orderId,
    required double amount,
  });

  Future<ApiResponse<Mutation$UpdateOrderStatus>> arrivedToDestination({
    required Fragment$CurrentOrder order,
    required int destinationArrivedTo,
  });

  Future<ApiResponse<Mutation$SendMessage>> sendMessage({
    required String orderId,
    required String message,
  });

  Future<ApiResponse<Mutation$SendSOS>> sendSosSignal({
    required String orderId,
  });

  Future<ApiResponse<Mutation$UpdateLastSeenMessagesAt>> updateLastSeenMessagesAt({
    required String orderId,
  });

  void startOrderUpdatedSubscription();

  void stopOrderUpdatedSubscription();
}
