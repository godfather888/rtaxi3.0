part of 'ride_history.bloc.dart';

@freezed
sealed class RideHistoryState with _$RideHistoryState {
  const factory RideHistoryState({
    @Default(ApiResponseInitial()) ApiResponse<Query$RideHistory> rideHistoryState,
  }) = _RideHistoryState;
}
