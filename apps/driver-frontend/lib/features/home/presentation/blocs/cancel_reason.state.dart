part of 'cancel_reason.bloc.dart';

@freezed
sealed class CancelReasonState with _$CancelReasonState {
  const factory CancelReasonState({
    @Default(ApiResponseInitial()) ApiResponse<Query$CancelReasons> cancelReasonsState,
  }) = _CancelReasonState;
}
