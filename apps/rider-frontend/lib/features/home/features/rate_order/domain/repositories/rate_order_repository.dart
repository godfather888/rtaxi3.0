import 'package:api_response/api_response.dart';
import 'package:rider_flutter/core/graphql/documents/rate_ride.graphql.dart';

abstract class RateOrderRepository {
  Future<ApiResponse<Query$ReviewParameters>> getReviewParameters();
}
