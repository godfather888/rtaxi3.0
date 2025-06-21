import 'package:api_response/api_response.dart';
import 'package:driver_flutter/core/graphql/documents/earnings.graphql.dart';
import 'package:driver_flutter/core/graphql/schema.gql.dart';

abstract class EarningsRepository {
  Future<ApiResponse<Query$Earnings>> getEarningsDataset({
    required Enum$TimeQuery timeFrame,
    required DateTime startDate,
    required DateTime endDate,
  });
}
