import 'dart:async';

import 'package:api_response/api_response.dart';
import 'package:driver_flutter/core/enums/location_permission.dart';
import 'package:driver_flutter/core/graphql/fragments/point.fragment.graphql.dart';
import 'package:injectable/injectable.dart';
import 'package:rxdart/rxdart.dart';

import 'location_datasource.dart';

@dev
@LazySingleton(as: LocationDatasource)
class LocationDatasourceImpl implements LocationDatasource {
  final StreamController<ApiResponse<Fragment$Point>> _locationStream = BehaviorSubject();
  final StreamController<LocationPermission> _permissionStatusStream = BehaviorSubject();

  @override
  Stream<ApiResponse<Fragment$Point>> get driverLocation => _locationStream.stream;

  @override
  Stream<LocationPermission> get permissionStatus => _permissionStatusStream.stream;

  @override
  void getCurrentLocation() async {
    _locationStream.add(
      ApiResponse.loaded(
        Fragment$Point(
          lat: 37.384135,
          lng: -122.067976,
        ),
      ),
    );
  }

  @override
  Future<bool> isLocationServiceEnabled() async {
    return true;
  }

  @override
  Future<void> startGettingLocationUpdates() async {
    return _locationStream.add(
      ApiResponse.loaded(
        Fragment$Point(
          lat: 37.384135,
          lng: -122.067976,
        ),
      ),
    );
  }

  @override
  void stopGettingLocationUpdates() {
    _locationStream.close();
  }

  @override
  Future<LocationPermission> getLocationPermissionStatus() async {
    return LocationPermission.always;
  }

  @override
  Future<LocationPermission> requestLocationPermission() async {
    return LocationPermission.always;
  }

  @override
  Future<bool> requestLocationService() async {
    return true;
  }
}
