part of 'payout_methods.bloc.dart';

@freezed
sealed class PayoutMethodsState with _$PayoutMethodsState {
  const factory PayoutMethodsState({
    @Default(ApiResponseInitial()) ApiResponse<Query$SupportedPayoutMethods> supportedPayoutMethodsState,
  }) = _PayoutMethodsState;
}
