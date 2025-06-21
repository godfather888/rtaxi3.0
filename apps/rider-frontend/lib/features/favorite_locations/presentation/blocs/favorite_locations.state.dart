part of 'favorite_locations.bloc.dart';

@freezed
sealed class FavoriteLocationsState with _$FavoriteLocationsState {
  const factory FavoriteLocationsState({
    @Default(ApiResponseInitial()) ApiResponse<Query$FavoriteLocations> favoriteLocationsState,
  }) = _FavoriteLocationsState;
}
