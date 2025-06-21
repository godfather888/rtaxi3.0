import 'package:api_response/api_response.dart';
import 'package:rider_flutter/core/graphql/documents/scheduled_rides.graphql.dart';
import 'package:rider_flutter/core/graphql/fragments/active_order.mock.dart';
import '../../domain/repositories/scheduled_rides_repository.dart';
import 'package:injectable/injectable.dart';

@dev
@LazySingleton(as: ScheduledRidesRepository)
class ScheduledRidesRepositoryMock implements ScheduledRidesRepository {
  @override
  Future<ApiResponse<Query$ScheduledRides>> getUpcomingRides() async {
    await Future.delayed(const Duration(seconds: 1));
    return ApiResponseLoaded(
      Query$ScheduledRides(
        orders: Query$ScheduledRides$orders(
          edges: [
            Query$ScheduledRides$orders$edges(
              node: mockCurrentOrder1,
            ),
          ],
        ),
      ),
    );
  }

  @override
  Future<ApiResponse<Mutation$CancelBooking>> cancelRide({required String orderId}) async {
    return ApiResponseLoaded(
      Mutation$CancelBooking(
        cancelBooking: Mutation$CancelBooking$cancelBooking(
          id: orderId,
        ),
      ),
    );
  }
}
