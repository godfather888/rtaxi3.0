import 'package:api_response/api_response.dart';
import 'package:driver_flutter/core/datasources/location_update_datasource.dart';
import 'package:driver_flutter/core/graphql/documents/home.graphql.dart';
import 'package:driver_flutter/core/graphql/fragments/order_request.mock.dart';
import 'package:flutter_common/core/entities/driver_location.dart';
import 'package:injectable/injectable.dart';

@dev
@LazySingleton(as: LocationUpdateDatasource)
class LocationUpdateDatasourceMock implements LocationUpdateDatasource {
  @override
  Future<ApiResponse<Mutation$UpdateDriverLocation>> updateDriverLocation({
    required DriverLocation location,
  }) async {
    Future.delayed(
      Duration(seconds: 1),
    );
    return ApiResponse.loaded(
      Mutation$UpdateDriverLocation(
        updateDriversLocationNew: [
          mockOrderRequest1,
          mockOrderRequest2,
        ],
      ),
    );
  }
}
