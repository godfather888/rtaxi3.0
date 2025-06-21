import 'dart:math';

import 'package:api_response/api_response.dart';
import 'package:generic_map/generic_map.dart';
import 'package:injectable/injectable.dart';
import 'package:latlong2/latlong.dart';
import 'package:rxdart/rxdart.dart';
import 'geo_datasource.dart';
import 'location_datasource.dart';

final List<String> randomAdresses = [
  "456 Elm St, Anytown USA",
  "64-120 oakdale street number 123 NW",
  "123 Main St, Anytown USA",
  "789 Maple St, Anytown USA",
];

@dev
@LazySingleton(as: GeoDatasource)
class GeoDatasourceImpl implements GeoDatasource {
  LocationDatasource locationDatasource;

  GeoDatasourceImpl(this.locationDatasource);

  @override
  Stream<ApiResponse<Place>> get currentAddress => _currentAddress.stream;

  final BehaviorSubject<ApiResponse<Place>> _currentAddress = BehaviorSubject.seeded(ApiResponse.initial());

  @override
  Future<ApiResponse<Place>> getAddressForLocation({
    required LatLng latLng,
    required String language,
    required MapProviderEnum mapProvider,
  }) async {
    await Future.delayed(const Duration(seconds: 1));
    return ApiResponse.loaded(
      Place(
        LatLng(latLng.latitude, latLng.longitude),
        randomAdresses[Random().nextInt(randomAdresses.length)],
        "Anytown USA",
      ),
    );
  }

  @override
  Future<ApiResponse<Place>> getCurrentLocation({required String language, required MapProviderEnum mapProvider}) async {
    final currentLocation = await locationDatasource.getCurrentLocation();

    final location = await getAddressForLocation(latLng: currentLocation, language: language, mapProvider: mapProvider);
    _currentAddress.add(location);
    return location;
  }

  @override
  Future<ApiResponse<List<Place>>> getNearbyPlaces({
    required String query,
    required LatLng? latLng,
    required int radius,
    required String language,
    required MapProviderEnum mapProvider,
  }) async {
    await Future.delayed(const Duration(seconds: 1));
    return ApiResponse.loaded([
      Place(LatLng(37.3875, -122.0575), "Silicon Valley", ""),
      Place(LatLng(37.4220, -122.0841), "Palo Alto", ""),
      Place(LatLng(37.4419, -122.1430), "Mountain View", ""),
      Place(LatLng(37.3541, -121.9552), "San Jose", ""),
    ]);
  }
}
