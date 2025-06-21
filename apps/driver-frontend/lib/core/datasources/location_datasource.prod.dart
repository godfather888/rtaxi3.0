import 'dart:async';
import 'dart:io';

import 'package:api_response/api_response.dart';
import 'package:driver_flutter/core/enums/location_permission.dart';
import 'package:driver_flutter/core/graphql/fragments/point.fragment.graphql.dart';
import 'package:flutter/foundation.dart';
import 'package:injectable/injectable.dart';
import 'package:location/location.dart';
import 'package:geolocator/geolocator.dart' as geolocator;
import 'package:permission_handler/permission_handler.dart';
import 'package:rxdart/rxdart.dart';

import 'location_datasource.dart';

@prod
@LazySingleton(as: LocationDatasource)
class LocationDatasourceImpl implements LocationDatasource {
  final BehaviorSubject<ApiResponse<Fragment$Point>> _locationStream = BehaviorSubject();

  @override
  Stream<ApiResponse<Fragment$Point>> get driverLocation => _locationStream.stream;

  final BehaviorSubject<LocationPermission> _permissionStatusStream = BehaviorSubject();

  @override
  Stream<LocationPermission> get permissionStatus => _permissionStatusStream.stream;

  StreamSubscription<LocationData>? _locationSubscription;

  @override
  void getCurrentLocation() async {
    if (!(await geolocator.Geolocator.isLocationServiceEnabled())) {
      return;
    }
    final permission = await geolocator.Geolocator.checkPermission();
    if (permission == geolocator.LocationPermission.denied) {
      await geolocator.Geolocator.requestPermission();
      return;
    }
    // final currentPosition = await Location.instance.getLocation();
    final currentPosition = await geolocator.Geolocator.getCurrentPosition(
      locationSettings: geolocator.LocationSettings(accuracy: geolocator.LocationAccuracy.high),
    );
    _locationStream.add(
      ApiResponse.loaded(
        Fragment$Point(
          lat: currentPosition.latitude,
          lng: currentPosition.longitude,
        ),
      ),
    );
  }

  @override
  Future<bool> isLocationServiceEnabled() async {
    return Location.instance.serviceEnabled();
  }

  @override
  Future<void> startGettingLocationUpdates() async {
    if (Platform.isMacOS) {
      // MacOS does not support background location updates
      return;
    }
    if (await Location.instance.isBackgroundModeEnabled() == true) {
      return;
    }
    final permission = await requestLocationPermission();
    if (permission == LocationPermission.denied || permission == LocationPermission.deniedForever) {
      return;
    }
    Location.instance.enableBackgroundMode(enable: true);
    await Location.instance.changeSettings(interval: 5000, distanceFilter: 50);

    _locationSubscription = Location.instance.onLocationChanged.listen((event) {
      if (kDebugMode) {
        print('Location changed: ${event.latitude}, ${event.longitude}, heading: ${event.heading}');
      }
      _locationStream.add(
        ApiResponse.loaded(
          Fragment$Point(lat: event.latitude!, lng: event.longitude!, heading: event.heading?.toInt()),
        ),
      );
    });
  }

  @override
  void stopGettingLocationUpdates() {
    if (!Platform.isMacOS) {
      Location.instance.enableBackgroundMode(enable: false);
    }
    _locationSubscription?.cancel();
  }

  @override
  Future<bool> requestLocationService() async {
    return Location.instance.requestService();
  }

  @override
  Future<LocationPermission> getLocationPermissionStatus() async {
    // Check foreground first
    var locationAlwaysAndWhenInUse = await Permission.location.status;
    if (!locationAlwaysAndWhenInUse.isGranted || Platform.isIOS) {
      _permissionStatusStream.add(locationAlwaysAndWhenInUse.toLocationPermission());
      await Permission.sensors.request();
      return locationAlwaysAndWhenInUse.toLocationPermission();
    }

    // Check background (only relevant on Android)
    var background = await Permission.locationAlways.status;
    _permissionStatusStream.add(background.toLocationPermission());
    return background.toLocationPermission();
  }

  @override
  Future<LocationPermission> requestLocationPermission() async {
    // Request foreground permission
    var foreground = await Permission.location.request();
    if (!foreground.isGranted || Platform.isIOS) {
      _permissionStatusStream.add(foreground.toLocationPermission());
      return foreground.toLocationPermission();
    }

    var background = await Permission.locationAlways.request();
    _permissionStatusStream.add(background.toLocationPermission());
    return background.toLocationPermission();
  }
}
