part of 'add_favorite_location.bloc.dart';

@freezed
sealed class AddFavoriteLocationState with _$AddFavoriteLocationState {
  const factory AddFavoriteLocationState({
    Enum$RiderAddressType? addressType,
    String? addressName,
    required (CountryCode, String?) addressPhone,
    Place? selectedLocation,
    @Default(ApiResponseInitial()) ApiResponse<Mutation$CreateFavoriteLocation> createFavoriteLocationState,
  }) = _AddFavoriteLocationState;

  factory AddFavoriteLocationState.initial() => AddFavoriteLocationState(
        addressType: null,
        addressName: null,
        selectedLocation: null,
        addressPhone: (Constants.defaultCountry, null),
        createFavoriteLocationState: ApiResponseInitial(),
      );
}
