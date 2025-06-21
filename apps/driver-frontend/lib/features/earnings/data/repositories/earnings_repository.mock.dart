import 'package:api_response/api_response.dart';
import 'package:driver_flutter/core/graphql/documents/earnings.graphql.dart';
import 'package:driver_flutter/core/graphql/schema.gql.dart';
import '../../domain/repositories/earnings_repository.dart';
import 'package:injectable/injectable.dart';

@dev
@LazySingleton(as: EarningsRepository)
class EarningsRepositoryMock implements EarningsRepository {
  @override
  Future<ApiResponse<Query$Earnings>> getEarningsDataset({
    required Enum$TimeQuery timeFrame,
    required DateTime startDate,
    required DateTime endDate,
  }) async {
    await Future.delayed(Duration(seconds: 1));
    return ApiResponse.loaded(
      Query$Earnings(
        getStatsNew: Query$Earnings$getStatsNew(
          currency: 'USD',
          dataset: [
            Query$Earnings$getStatsNew$dataset(
              earning: 23,
              count: 2,
              time: 2,
              distance: 14,
              name: 'name',
            ),
          ],
        ),
      ),
    );
  }
}
