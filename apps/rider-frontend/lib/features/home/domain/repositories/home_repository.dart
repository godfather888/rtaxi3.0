import 'package:api_response/api_response.dart';
import 'package:latlong2/latlong.dart';
import 'package:rider_flutter/core/graphql/documents/home.graphql.dart';
import 'package:rider_flutter/core/graphql/fragments/point.fragment.graphql.dart';

abstract class HomeRepository {
  Future<ApiResponse<Query$CurrentOrder>> getCurrentOrder();

  Future<ApiResponse<List<Fragment$Point>>> getDriversAround(LatLng origin);
}
