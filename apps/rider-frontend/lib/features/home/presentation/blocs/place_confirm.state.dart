part of 'place_confirm.bloc.dart';

@freezed
sealed class PlaceConfirmState with _$PlaceConfirmState {
  const factory PlaceConfirmState({@Default(ApiResponseInitial()) ApiResponse<Place> place}) = _PlaceConfirmState;
}
