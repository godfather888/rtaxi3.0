part of 'destination_suggestions.bloc.dart';

@freezed
sealed class DestinationSuggestionsState with _$DestinationSuggestionsState {
  const factory DestinationSuggestionsState({
    @Default(ApiResponseInitial()) ApiResponse<Query$DestinationSuggesions> destinationSuggesionsState,
  }) = _DestinationSuggestionsState;

  const DestinationSuggestionsState._();

  (List<Fragment$FavoriteLocation>, List<Place>)? get destinationSuggestions {
    switch (destinationSuggesionsState) {
      case ApiResponseLoaded<Query$DestinationSuggesions>(data: final data):
        final favorites = data.riderAddresses.map((e) => e).toList();
        final places = data.orders.edges.map((e) {
          final point = e.node.points.isNotEmpty
              ? LatLng(
                  e.node.points.last.lat,
                  e.node.points.last.lng,
                )
              : const LatLng(0, 0);

          final address = e.node.addresses.isNotEmpty ? e.node.addresses.last : '';

          return Place(point, address, null);
        }).toList();
        return (favorites, places);
      default:
        return null;
    }
  }
}
