import 'package:api_response/api_response.dart';
import 'package:generic_map/generic_map.dart';
import 'package:latlong2/latlong.dart';

abstract class GeoDatasource {
  Stream<ApiResponse<Place>> get currentAddress;

  Future<ApiResponse<List<Place>>> getNearbyPlaces({
    required String query,
    required LatLng? latLng,
    required int radius,
    required String language,
    required MapProviderEnum mapProvider,
  });
  Future<ApiResponse<Place>> getAddressForLocation({
    required LatLng latLng,
    required String language,
    required MapProviderEnum mapProvider,
  });
  Future<ApiResponse<Place>> getCurrentLocation({required String language, required MapProviderEnum mapProvider});
}
