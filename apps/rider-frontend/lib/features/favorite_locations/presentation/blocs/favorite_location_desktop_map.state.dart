part of 'favorite_location_desktop_map.bloc.dart';

@freezed
sealed class FavoriteLocationsDesktopMapState with _$FavoriteLocationsDesktopMapState {
  const factory FavoriteLocationsDesktopMapState.initial() = FavoriteLocationsDesktopMapState$Initial;

  const factory FavoriteLocationsDesktopMapState.list({
    required List<Fragment$FavoriteLocation> locations,
  }) = FavoriteLocationsDesktopMapState$ShowList;

  const factory FavoriteLocationsDesktopMapState.viewOne({
    required String name,
    required Place location,
  }) = FavoriteLocationsDesktopMapState$ViewOne;

  const factory FavoriteLocationsDesktopMapState.locate({
    required Place? centerLocation,
  }) = FavoriteLocationsDesktopMapState$Locate;

  const FavoriteLocationsDesktopMapState._();

  List<CustomMarker> get markers {
    return switch (this) {
      FavoriteLocationsDesktopMapState$ShowList(:final locations) => locations.map((e) {
          final place = Place(LatLng(e.location.lat, e.location.lng), e.details, null);
          return AppMarkerAddresss(
            title: e.title,
            address: place.address,
          ).genericMarker(place.latLng);
        }).toList(),
      FavoriteLocationsDesktopMapState$ViewOne(:final name, :final location) => [
          AppMarkerAddresss(
            title: name,
            address: location.address,
          ).genericMarker(location.latLng),
        ],
      FavoriteLocationsDesktopMapState$Initial() || FavoriteLocationsDesktopMapState$Locate() => const [],
    };
  }
}
