import 'dart:async';

import 'package:api_response/api_response.dart';
import 'package:driver_flutter/core/enums/location_permission.dart';
import 'package:driver_flutter/core/graphql/fragments/point.fragment.graphql.dart';

abstract class LocationDatasource {
  Stream<ApiResponse<Fragment$Point>> get driverLocation;

  Stream<LocationPermission> get permissionStatus;

  Future<LocationPermission> getLocationPermissionStatus();
  Future<bool> isLocationServiceEnabled();
  Future<LocationPermission> requestLocationPermission();
  Future<bool> requestLocationService();
  void getCurrentLocation();
  Future<void> startGettingLocationUpdates();
  void stopGettingLocationUpdates();
}
