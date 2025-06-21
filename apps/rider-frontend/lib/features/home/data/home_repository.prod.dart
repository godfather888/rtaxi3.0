import 'package:api_response/api_response.dart';
import 'package:graphql/client.dart';
import 'package:injectable/injectable.dart';
import 'package:latlong2/latlong.dart';
import 'package:rider_flutter/core/graphql/documents/home.graphql.dart';
import 'package:rider_flutter/core/datasources/graphql_datasource.dart';
import 'package:rider_flutter/core/graphql/fragments/point.extentions.dart';
import 'package:rider_flutter/core/graphql/fragments/point.fragment.graphql.dart';
import '../domain/repositories/home_repository.dart';

@prod
@LazySingleton(as: HomeRepository)
class HomeRepositoryImpl implements HomeRepository {
  final GraphqlDatasource graphQLDatasource;

  HomeRepositoryImpl(
    this.graphQLDatasource,
  );

  @override
  Future<ApiResponse<Query$CurrentOrder>> getCurrentOrder() async {
    final currentOrderResponse = await graphQLDatasource.query(
      Options$Query$CurrentOrder(
        fetchPolicy: FetchPolicy.noCache,
      ),
    );
    return currentOrderResponse;
  }

  @override
  Future<ApiResponse<List<Fragment$Point>>> getDriversAround(LatLng origin) async {
    final driversAroundResponse = await graphQLDatasource.query(
      Options$Query$DriversAround(
        fetchPolicy: FetchPolicy.noCache,
        variables: Variables$Query$DriversAround(
          center: origin.toPointInput,
        ),
      ),
    );
    return driversAroundResponse.mapData((data) => data.getDriversLocation);
  }
}
