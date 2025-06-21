part of 'location.bloc.dart';

@Freezed(fromJson: true)
sealed class LocationState with _$LocationState {
  const factory LocationState.loading() = LocationState$Loading;

  const factory LocationState.error({
    required LocationError error,
  }) = LocationState$Error;

  const factory LocationState.determined({
    required Place place,
  }) = LocationState$Determined;

  factory LocationState.fromJson(Map<String, dynamic> json) => _$LocationStateFromJson(json);

  const LocationState._();

  Place? get place => switch (this) {
        LocationState$Determined(:final place) => place,
        _ => null,
      };

  String? distanceTo(LatLng other, BuildContext context) {
    final distance = place?.latLng.distanceToFormatted(other, context);
    return distance;
  }
}

enum LocationError { permissionDenied, serviceDisabled, unknown }
