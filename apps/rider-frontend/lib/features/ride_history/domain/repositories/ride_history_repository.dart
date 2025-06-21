import 'package:api_response/api_response.dart';
import 'package:rider_flutter/core/graphql/documents/ride_history.graphql.dart';

abstract class RideHistoryRepository {
  Future<ApiResponse<Query$RideHistory>> getRideHistory();

  Future<ApiResponse<Mutation$SubmitIssue>> reportIssue({
    required String orderId,
    required String subject,
    required String issue,
  });
}
