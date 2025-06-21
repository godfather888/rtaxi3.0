part of 'pay_for_ride.bloc.dart';

@Freezed(copyWith: true)
sealed class PayForRideState with _$PayForRideState {
  const factory PayForRideState({
    PaymentMethodUnion? selectedPaymentMethod,
    @Default(ApiResponse.initial()) ApiResponse<Fragment$IntentResult> paymentStatus,
    @Default(ApiResponseInitial()) ApiResponse<Query$PaymentMethods> savedPaymentMethodsState,
  }) = _PayForRideState;

  const PayForRideState._();

  List<PaymentMethodUnion> paymentMethods({required bool cashPaymentEnabled, required bool isWalletCreditSufficient}) =>
      savedPaymentMethodsState
          .mapData(
            (data) => data.savedPaymentMethods.toEntity.toPaymentMethodUnion
                .followedBy(
                  data.paymentGateways.toEntity.toList().toPaymentMethodUnion.toList(),
                )
                .followedBy(
                  [
                    if (cashPaymentEnabled) const PaymentMethod$Cash(),
                    if (isWalletCreditSufficient) const PaymentMethod$Wallet(),
                  ],
                )
                .toSet()
                .toList(),
          )
          .data ??
      [];
}
