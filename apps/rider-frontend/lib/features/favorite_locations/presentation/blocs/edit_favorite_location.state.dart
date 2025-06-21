part of 'edit_favorite_location.bloc.dart';

@freezed
sealed class EditFavoriteLocationState with _$EditFavoriteLocationState {
  const factory EditFavoriteLocationState({
    required Enum$RiderAddressType? addressType,
    required String? addressName,
    required (CountryCode, String?) addressPhone,
    required Place? selectedLocation,
    @Default(ApiResponseInitial()) ApiResponse<Mutation$UpdateFavoriteLocation> updateFavoriteLocationState,
    @Default(ApiResponseInitial()) ApiResponse<Mutation$DeleteFavoriteLocation> deleteFavoriteLocationState,
  }) = _EditFavoriteLocationState;

  factory EditFavoriteLocationState.initial() => EditFavoriteLocationState(
        addressType: null,
        addressName: null,
        selectedLocation: null,
        addressPhone: (Constants.defaultCountry, null),
        updateFavoriteLocationState: ApiResponseInitial(),
      );
}
