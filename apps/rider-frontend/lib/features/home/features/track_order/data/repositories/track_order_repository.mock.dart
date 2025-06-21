import 'dart:async';
import 'package:api_response/api_response.dart';
import 'package:flutter_common/core/entities/driver_location.dart';
import 'package:rider_flutter/core/graphql/documents/track_order.graphql.dart';
import 'package:rider_flutter/core/graphql/documents/wallet.graphql.dart';
import 'package:rider_flutter/core/graphql/fragments/active_order.fragment.graphql.dart';
import 'package:rider_flutter/core/graphql/fragments/active_order.mock.dart';
import 'package:rider_flutter/core/graphql/fragments/payment_gateway.mock.dart';
import 'package:rider_flutter/core/graphql/fragments/saved_payment_method.mock.dart';
import 'package:rider_flutter/core/graphql/schema.gql.dart';
import '../../domain/repositories/track_order_repository.dart';
import 'package:injectable/injectable.dart';

@dev
@LazySingleton(as: TrackOrderRepository)
class TrackOrderRepositoryMock implements TrackOrderRepository {
  Stream<Fragment$ActiveOrder> orderMocker() async* {
    const statusOrder = [
      Enum$OrderStatus.Requested,
      Enum$OrderStatus.DriverAccepted,
      Enum$OrderStatus.Arrived,
      Enum$OrderStatus.Started,
      Enum$OrderStatus.WaitingForReview,
    ];

    yield mockActiveOrder1.copyWith.order(
      status: statusOrder[0],
    );
    await Future.delayed(const Duration(seconds: 5));
    yield mockActiveOrder1.copyWith.order(
      status: statusOrder[1],
    );
    await Future.delayed(const Duration(seconds: 10));
    yield mockActiveOrder1.copyWith.order(
      status: statusOrder[2],
      destinationArrivedTo: null,
    );
    await Future.delayed(const Duration(seconds: 5));
    yield mockActiveOrder1.copyWith.order(
      status: statusOrder[3],
      createdOn: DateTime.now(),
      destinationArrivedTo: 0,
    );
    await Future.delayed(const Duration(seconds: 60));
    yield mockActiveOrder1.copyWith.order(
      status: statusOrder[4],
      destinationArrivedTo: 1,
    );
  }

  Stream<DriverLocation> driverLocationMocker() async* {
    await Future.delayed(const Duration(seconds: 5));
    // Driver heading to pickup point
    yield const DriverLocation(lat: 37.384135, lng: -122.067976, rotation: 40);
    await Future.delayed(const Duration(seconds: 2));
    yield const DriverLocation(lat: 37.385207, lng: -122.066095, rotation: 45);
    await Future.delayed(const Duration(seconds: 2));
    yield const DriverLocation(lat: 37.385207, lng: -122.066095, rotation: 65);
    await Future.delayed(const Duration(seconds: 2));
    yield const DriverLocation(lat: 37.385808, lng: -122.063315, rotation: 85);
    await Future.delayed(const Duration(seconds: 2));
    yield const DriverLocation(lat: 37.386246, lng: -122.059677, rotation: 45);
    await Future.delayed(const Duration(seconds: 2));
    // Driver at pickup point
    await Future.delayed(const Duration(seconds: 5));
    // Driver heading to dropoff point
    yield const DriverLocation(lat: 37.390835, lng: -122.052340, rotation: 220);
    await Future.delayed(const Duration(seconds: 5));
    yield const DriverLocation(lat: 37.385770, lng: -122.064627, rotation: 240);
    await Future.delayed(const Duration(seconds: 5));
    yield const DriverLocation(lat: 37.386627, lng: -122.068655, rotation: 350);
    await Future.delayed(const Duration(seconds: 5));
    yield const DriverLocation(lat: 37.394856, lng: -122.068583, rotation: 0);
    await Future.delayed(const Duration(seconds: 5));
    yield const DriverLocation(lat: 37.400799, lng: -122.069950, rotation: 345);
    await Future.delayed(const Duration(seconds: 5));
    yield const DriverLocation(lat: 37.409426, lng: -122.070957, rotation: 290);
    await Future.delayed(const Duration(seconds: 5));
    yield const DriverLocation(lat: 37.416224, lng: -122.085845, rotation: 300);
    await Future.delayed(const Duration(seconds: 5));
    yield const DriverLocation(lat: 37.422394, lng: -122.091887, rotation: 30);
    await Future.delayed(const Duration(seconds: 5));
    yield const DriverLocation(lat: 37.42203, lng: -122.08417, rotation: 180);
  }

  @override
  Future<ApiResponse<Query$CancelReasons>> getCancelReasons() async {
    return ApiResponse.loaded(
      Query$CancelReasons(
        orderCancelReasons: [
          Query$CancelReasons$orderCancelReasons(
            id: '1',
            title: 'Driver didn’t show up ontime',
          ),
          Query$CancelReasons$orderCancelReasons(
            id: "2",
            title: 'I don’t feel safe',
          ),
          Query$CancelReasons$orderCancelReasons(
            id: "3",
            title: 'Need to edit my ride details',
          ),
          Query$CancelReasons$orderCancelReasons(
            id: "4",
            title: 'Don’t need a ride anymore',
          ),
        ],
      ),
    );
  }

  @override
  Future<ApiResponse<Mutation$SendSOS>> sendSOSSignal({
    required String orderId,
  }) async {
    return ApiResponse.loaded(
      Mutation$SendSOS(
        sosSignal: Mutation$SendSOS$sosSignal(
          id: '1',
        ),
      ),
    );
  }

  @override
  Future<ApiResponse<Query$PaymentMethods>> getPaymentMethods() async {
    return ApiResponse.loaded(
      Query$PaymentMethods(
        savedPaymentMethods: mockSavedPaymentMethods,
        paymentGateways: mockPaymentGateways,
      ),
    );
  }
}
