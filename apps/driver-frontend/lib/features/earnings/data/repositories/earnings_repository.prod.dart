import 'package:api_response/api_response.dart';
import 'package:driver_flutter/core/graphql/documents/earnings.graphql.dart';
import 'package:driver_flutter/core/graphql/schema.gql.dart';
import 'package:injectable/injectable.dart';

import '../../../../core/datasources/graphql_datasource.dart';
import '../../domain/repositories/earnings_repository.dart';

@prod
@LazySingleton(as: EarningsRepository)
class EarningsRepositoryImpl implements EarningsRepository {
  final GraphqlDatasource graphQLDatasource;

  EarningsRepositoryImpl(
    this.graphQLDatasource,
  );

  @override
  Future<ApiResponse<Query$Earnings>> getEarningsDataset({
    required Enum$TimeQuery timeFrame,
    required DateTime startDate,
    required DateTime endDate,
  }) async {
    final earningsDatasetResponse = await graphQLDatasource.query(
      Options$Query$Earnings(
        variables: Variables$Query$Earnings(
          timeFrame: timeFrame,
          startDate: startDate,
          endDate: endDate,
        ),
      ),
    );
    return earningsDatasetResponse;
  }
}
