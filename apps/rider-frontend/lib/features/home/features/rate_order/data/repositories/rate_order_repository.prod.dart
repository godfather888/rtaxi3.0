import 'package:api_response/api_response.dart';
import 'package:injectable/injectable.dart';
import 'package:rider_flutter/core/graphql/documents/rate_ride.graphql.dart';
import 'package:rider_flutter/core/datasources/graphql_datasource.dart';
import '../../domain/repositories/rate_order_repository.dart';

@prod
@LazySingleton(as: RateOrderRepository)
class RateOrderRepositoryImpl implements RateOrderRepository {
  final GraphqlDatasource graphQLDatasource;

  RateOrderRepositoryImpl(
    this.graphQLDatasource,
  );

  @override
  Future<ApiResponse<Query$ReviewParameters>> getReviewParameters() async {
    final reviewParametersResponse = await graphQLDatasource.query(
      Options$Query$ReviewParameters(),
    );
    return reviewParametersResponse;
  }
}
