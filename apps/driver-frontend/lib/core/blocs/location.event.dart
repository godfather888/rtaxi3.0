part of 'location.bloc.dart';

@freezed
sealed class LocationEvent with _$LocationEvent {
  const factory LocationEvent.fetchCurrentLocation() = LocationEvent$FetchCurrentLocation;
  const factory LocationEvent.startGettingLocationUpdates() = LocationEvent$StartGettingLocationUpdates;
  const factory LocationEvent.stopGettingLocationUpdates() = LocationEvent$StopGettingLocationUpdates;
  const factory LocationEvent.uploadDriverLocation({required DriverLocation location}) =
      LocationEvent$UpdateDriverLocation;
}
