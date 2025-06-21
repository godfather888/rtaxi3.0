part of 'place_lookup.bloc.dart';

@freezed
sealed class PlaceLookupState with _$PlaceLookupState {
  const factory PlaceLookupState.initial() = PlaceLookupState$Initial;
  const factory PlaceLookupState.loading() = PlaceLookupState$Loading;
  const factory PlaceLookupState.noResults() = PlaceLookupState$NoResults;
  const factory PlaceLookupState.moreCharacters() = PlaceLookupState$MoreCharacters;
  const factory PlaceLookupState.loaded({
    required List<Place> places,
  }) = PlaceLookupState$Loaded;
  const factory PlaceLookupState.error(String message) = PlaceLookupState$Error;
}
