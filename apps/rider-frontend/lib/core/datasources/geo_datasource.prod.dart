import 'package:api_response/api_response.dart';
import 'package:flutter_common/config/constants.dart';
import 'package:generic_map/generic_map.dart';
import 'package:graphql/client.dart';
import 'package:injectable/injectable.dart';
import 'package:latlong2/latlong.dart';
import 'package:rider_flutter/core/graphql/documents/geo.graphql.dart';
import 'package:rider_flutter/core/enums/map_provider.prod.dart';
import 'package:rider_flutter/core/graphql/fragments/point.extentions.dart';
import 'package:rxdart/rxdart.dart';

import 'geo_datasource.dart';
import 'graphql_datasource.dart';
import 'location_datasource.dart';

@prod
@LazySingleton(as: GeoDatasource)
class GeoDatasourceImpl implements GeoDatasource {
  final LocationDatasource locationDatasource;
  final GraphqlDatasource graphqlDatasource;

  GeoDatasourceImpl(this.graphqlDatasource, this.locationDatasource);

  @override
  Stream<ApiResponse<Place>> get currentAddress => _currentAddress.stream;

  final BehaviorSubject<ApiResponse<Place>> _currentAddress = BehaviorSubject.seeded(ApiResponse.initial());

  @override
  Future<ApiResponse<Place>> getAddressForLocation({
    required LatLng latLng,
    required String language,
    required MapProviderEnum mapProvider,
  }) async {
    final result = await graphqlDatasource.query(
      Options$Query$ReverseGeocode(
        fetchPolicy: FetchPolicy.cacheFirst,
        variables: Variables$Query$ReverseGeocode(
          lat: latLng.latitude,
          lng: latLng.longitude,
          language: language,
          provider: mapProvider.toGql(),
        ),
      ),
    );
    return result.mapData((r) {
      final address = r.reverseGeocode;
      return Place(LatLng(address.point.lat, address.point.lng), address.address, "");
    });
  }

  @override
  Future<ApiResponse<Place>> getCurrentLocation({required String language, required MapProviderEnum mapProvider}) async {
    try {
      final currentPosition = await locationDatasource.getCurrentLocation();
      final currentPlace = await getAddressForLocation(
        latLng: currentPosition,
        language: language,
        mapProvider: mapProvider,
      );
      _currentAddress.add(currentPlace);
      return currentPlace;
    } catch (e) {
      return ApiResponse.loaded(Constants.defaultLocation);
    }
  }

  @override
  Future<ApiResponse<List<Place>>> getNearbyPlaces({
    required String query,
    required LatLng? latLng,
    required int radius,
    required String language,
    required MapProviderEnum mapProvider,
  }) async {
    final queryResult = await graphqlDatasource.query(
      Options$Query$GetPlaces(
        fetchPolicy: FetchPolicy.cacheFirst,
        variables: Variables$Query$GetPlaces(
          query: query,
          location: latLng?.toPointInput,
          radius: radius,
          language: language,
          provider: mapProvider.toGql(),
        ),
      ),
    );
    return queryResult.mapData((r) {
      final places = r.getPlaces;
      return places.map((e) => Place(LatLng(e.point.lat, e.point.lng), e.address, e.title)).toList();
    });
  }
}
