import 'package:api_response/api_response.dart';
import 'package:injectable/injectable.dart';
import 'package:latlong2/latlong.dart';
import 'package:rider_flutter/core/graphql/documents/home.graphql.dart';
import 'package:rider_flutter/core/graphql/fragments/active_order.mock.dart';
import 'package:rider_flutter/core/graphql/fragments/point.fragment.graphql.dart';
import 'package:rider_flutter/core/graphql/fragments/point.mock.dart';

import '../domain/repositories/home_repository.dart';

@dev
@LazySingleton(as: HomeRepository)
class HomeRepositoryMock implements HomeRepository {
  @override
  Future<ApiResponse<Query$CurrentOrder>> getCurrentOrder() async {
    await Future.delayed(const Duration(seconds: 1));
    return ApiResponse.loaded(
      Query$CurrentOrder(activeOrders: [
        mockActiveOrder1,
      ]),
    );
  }

  @override
  Future<ApiResponse<List<Fragment$Point>>> getDriversAround(LatLng origin) async {
    await Future.delayed(const Duration(seconds: 1));
    return ApiResponse.loaded(
      mockPoints,
    );
  }
}
