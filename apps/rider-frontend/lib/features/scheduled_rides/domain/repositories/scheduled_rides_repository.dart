import 'package:api_response/api_response.dart';
import 'package:rider_flutter/core/graphql/documents/scheduled_rides.graphql.dart';

abstract class ScheduledRidesRepository {
  Future<ApiResponse<Query$ScheduledRides>> getUpcomingRides();
  Future<ApiResponse<Mutation$CancelBooking>> cancelRide({required String orderId});
}
