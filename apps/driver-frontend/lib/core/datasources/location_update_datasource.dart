import 'package:api_response/api_response.dart';
import 'package:driver_flutter/core/graphql/documents/home.graphql.dart';
import 'package:flutter_common/core/entities/driver_location.dart';

abstract class LocationUpdateDatasource {
  Future<ApiResponse<Mutation$UpdateDriverLocation>> updateDriverLocation({required DriverLocation location});
}
