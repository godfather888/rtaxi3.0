part of 'payment_methods.bloc.dart';

@freezed
sealed class PaymentMethodsState with _$PaymentMethodsState {
  const factory PaymentMethodsState({
    @Default(ApiResponseInitial()) ApiResponse<Query$SavedPaymentMethods> savedPaymentMethodsState,
  }) = _PaymentMethodsState;
}
