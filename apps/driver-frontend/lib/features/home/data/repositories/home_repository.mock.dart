import 'package:api_response/api_response.dart';
import 'package:driver_flutter/core/graphql/documents/chat.graphql.dart';
import 'package:driver_flutter/core/graphql/documents/home.graphql.dart';
import 'package:driver_flutter/core/graphql/documents/profile.graphql.dart';
import 'package:driver_flutter/core/graphql/documents/track_order.graphql.dart';
import 'package:driver_flutter/core/graphql/fragments/chat_message.mock.dart';
import 'package:driver_flutter/core/graphql/fragments/current_order.fragment.graphql.dart';
import 'package:driver_flutter/core/graphql/fragments/current_order.mock.dart';
import 'package:driver_flutter/core/graphql/fragments/order_request.fragment.graphql.dart';
import 'package:driver_flutter/core/graphql/fragments/order_request.mock.dart';
import 'package:driver_flutter/core/graphql/fragments/point.fragment.graphql.dart';
import 'package:driver_flutter/core/graphql/fragments/profile.fragment.graphql.dart';
import 'package:driver_flutter/core/graphql/fragments/profile.mock.dart';
import 'package:driver_flutter/core/graphql/schema.gql.dart';
import 'package:rxdart/rxdart.dart';
import '../../domain/repositories/home_repository.dart';
import 'package:injectable/injectable.dart';

@dev
@LazySingleton(as: HomeRepository)
class HomeRepositoryMock implements HomeRepository {
  @override
  Stream<List<Fragment$OrderRequest>> get orderRequests => _orderRequests.stream;
  final BehaviorSubject<List<Fragment$OrderRequest>> _orderRequests = BehaviorSubject.seeded([]);

  @override
  Stream<ApiResponse<Fragment$ProfileFull>> get profile => _profile.stream;
  final BehaviorSubject<ApiResponse<Fragment$ProfileFull>> _profile = BehaviorSubject.seeded(
    ApiResponse.loaded(mockProfileFull1),
  );

  @override
  Future<ApiResponse<Query$Profile>> getProfile() async {
    await Future.delayed(Duration(seconds: 1));
    return ApiResponse.loaded(
      Query$Profile(
        driver: mockProfileFull1,
      ),
    );
  }

  @override
  Future<ApiResponse<Mutation$UpdateDriverStatus>> updateStatus({
    required Enum$DriverStatus status,
  }) async {
    await Future.delayed(Duration(seconds: 1));
    return ApiResponse.loaded(
      Mutation$UpdateDriverStatus(
        updateOneDriver: mockProfileFull1,
      ),
    );
  }

  @override
  Future<ApiResponse<Fragment$CurrentOrder>> acceptOrderRequest({
    required String requestId,
  }) async {
    await Future.delayed(Duration(seconds: 1));
    return ApiResponse.loaded(
      mockCurrentOrder1.copyWith(
        status: Enum$OrderStatus.DriverAccepted,
      ),
    );
  }

  @override
  Future<void> rejectOrderRequest({required String requestId}) async {
    await Future.delayed(Duration(seconds: 1));
    return;
  }

  @override
  Future<ApiResponse<Mutation$UpdateDriverLocation>> updateDriverLocation({
    required Fragment$Point location,
  }) async {
    await Future.delayed(Duration(seconds: 1));
    return ApiResponse.loaded(
      Mutation$UpdateDriverLocation(
        updateDriversLocationNew: mockOrderRequests,
      ),
    );
  }

  @override
  Future<ApiResponse<Mutation$UpdateOrderStatus>> arrivedToDestination({
    required Fragment$CurrentOrder order,
    required int destinationArrivedTo,
  }) async {
    await Future.delayed(Duration(seconds: 1));
    return ApiResponse.loaded(
      Mutation$UpdateOrderStatus(
        updateOneOrder: mockCurrentOrder1,
      ),
    );
  }

  @override
  Future<ApiResponse<Mutation$UpdateOrderStatus>> arrivedToPickup({
    required String orderId,
  }) async {
    await Future.delayed(Duration(seconds: 1));
    return ApiResponse.loaded(
      Mutation$UpdateOrderStatus(
        updateOneOrder: mockCurrentOrder1,
      ),
    );
  }

  @override
  Future<ApiResponse<Mutation$UpdateOrderStatus>> cancelOrder({
    required String orderId,
  }) async {
    await Future.delayed(Duration(seconds: 1));
    return ApiResponse.loaded(
      Mutation$UpdateOrderStatus(
        updateOneOrder: mockCurrentOrder1,
      ),
    );
  }

  @override
  Future<ApiResponse<Mutation$UpdateOrderStatus>> startTrip({
    required String orderId,
  }) async {
    await Future.delayed(Duration(seconds: 1));
    return ApiResponse.loaded(
      Mutation$UpdateOrderStatus(
        updateOneOrder: mockCurrentOrder1,
      ),
    );
  }

  @override
  Future<ApiResponse<Query$CancelReasons>> getCancelReasons() async {
    await Future.delayed(const Duration(seconds: 1));
    return ApiResponse.loaded(
      Query$CancelReasons(
        orderCancelReasons: [
          Query$CancelReasons$orderCancelReasons(
            id: '1',
            title: 'Driver was late',
          ),
          Query$CancelReasons$orderCancelReasons(
            id: '2',
            title: 'I no longer needed the ride',
          ),
          Query$CancelReasons$orderCancelReasons(
            id: '3',
            title: 'Driver couldn’t find the location',
          ),
          Query$CancelReasons$orderCancelReasons(
            id: '4',
            title: 'Driver asked for extra payment',
          ),
        ],
      ),
    );
  }

  @override
  Future<ApiResponse<Mutation$SubmitReview>> submitReview({
    required String orderId,
    required int rating,
    required String? review,
  }) async {
    await Future.delayed(Duration(seconds: 1));
    return ApiResponse.loaded(
      Mutation$SubmitReview(
        submitReview: mockCurrentOrder1,
      ),
    );
  }

  @override
  Future<ApiResponse<Mutation$UpdateOrderStatus>> paidInCash({
    required String orderId,
    required double amount,
  }) async {
    await Future.delayed(Duration(seconds: 1));
    return ApiResponse.loaded(
      Mutation$UpdateOrderStatus(
        updateOneOrder: mockCurrentOrder1,
      ),
    );
  }

  @override
  Future<ApiResponse<Mutation$SendMessage>> sendMessage({
    required String orderId,
    required String message,
  }) async {
    await Future.delayed(Duration(seconds: 1));
    return ApiResponse.loaded(
      Mutation$SendMessage(
        createOneOrderMessage: mockChatMessage1,
      ),
    );
  }

  @override
  void startOrderUpdatedSubscription() {}

  @override
  void stopOrderUpdatedSubscription() {}

  @override
  Future<ApiResponse<Mutation$SendSOS>> sendSosSignal({
    required String orderId,
  }) async {
    await Future.delayed(Duration(seconds: 1));
    return ApiResponse.loaded(
      Mutation$SendSOS(
        sosSignal: Mutation$SendSOS$sosSignal(
          id: '1',
        ),
      ),
    );
  }

  @override
  Stream<List<Fragment$OrderRequest>> startGettingOrderRequestUpdates() async* {
    await Future.delayed(const Duration(seconds: 1));
    yield [
      mockOrderRequest1,
      mockOrderRequest2,
    ];
  }

  @override
  void stopGettingOrderRequestUpdates() {}

  @override
  Future<ApiResponse<Mutation$UpdateLastSeenMessagesAt>> updateLastSeenMessagesAt({
    required String orderId,
  }) async {
    await Future.delayed(Duration(seconds: 1));
    return ApiResponse.loaded(
      Mutation$UpdateLastSeenMessagesAt(
        updateLastSeenMessagesAt: true,
      ),
    );
  }
}
