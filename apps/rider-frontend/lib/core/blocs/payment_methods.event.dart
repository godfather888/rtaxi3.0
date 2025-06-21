part of 'payment_methods.bloc.dart';

@freezed
sealed class PaymentMethodsEvent with _$PaymentMethodsEvent {
  const factory PaymentMethodsEvent.load() = PaymentMethodsEvent$Load;
  const factory PaymentMethodsEvent.markAsDefault({required String paymentMethodId}) = PaymentMethodsEvent$MarkAsDefault;
  const factory PaymentMethodsEvent.deletePaymentMethod({required String paymentMethodId}) =
      PaymentMethodsEvent$DeletePaymentMethod;
}
