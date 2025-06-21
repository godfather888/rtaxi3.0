part of 'favorite_drivers.bloc.dart';

@freezed
sealed class FavoriteDriversState with _$FavoriteDriversState {
  const factory FavoriteDriversState({
    @Default(ApiResponseInitial()) ApiResponse<Query$FavoriteDrivers> favoriteDriversState,
    @Default(ApiResponseInitial()) ApiResponse<Mutation$DeleteFavoriteDriver> deleteFavoriteDriverState,
  }) = _FavoriteDriversState;

  // const factory FavoriteDriversState.empty() = _Empty;
}
