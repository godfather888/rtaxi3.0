part of 'payment_methods.bloc.dart';

@freezed
sealed class PaymentMethodsState with _$PaymentMethodsState {
  const factory PaymentMethodsState({
    @Default(ApiResponseInitial()) ApiResponse<List<Fragment$SavedPaymentMethod>> savedPaymentMethods,
    @Default(ApiResponseInitial()) ApiResponse<List<Fragment$PaymentGateway>> paymentGateways,
    Fragment$SavedPaymentMethod? selectedSavedPaymentMethod,
  }) = _PaymentMethodsState;

  const PaymentMethodsState._();

  ApiResponse<List<PaymentMethodUnion>> get savedPaymentMethodsResponse =>
      savedPaymentMethods.mapData((data) => data.map((e) => e.toEntity.toPaymentMethodUnion).toList());

  List<PaymentMethodUnion> get savedPaymentMethodEntities => savedPaymentMethodsResponse.data ?? [];

  ApiResponse<List<PaymentMethodUnion>> get paymentGatewayResponse =>
      paymentGateways.mapData((data) => data.map((e) => e.toEntity.toPaymentMethodUnion).toList());

  List<PaymentMethodUnion> get paymentGatewayEntities => paymentGatewayResponse.data ?? [];

  List<PaymentMethodUnion> get allPaymentMethods => [...savedPaymentMethodEntities, ...paymentGatewayEntities];

  ApiResponse<List<PaymentMethodUnion>> get allPaymentMethodsResponse => savedPaymentMethodsResponse.mapData(
        (savedMethods) => [...savedMethods, ...paymentGatewayResponse.data ?? []],
      );

  // List<PaymentProcessorEntity> get paymentProcessors =>
  //     paymentGateways.data
  //         ?.where((e) => e.linkMethod != Enum$GatewayLinkMethod.none)
  //         .map((e) => e.toProcessor)
  //         .toList() ??
  //     [];

  Fragment$SavedPaymentMethod? get currentSavedPaymentMethod =>
      selectedSavedPaymentMethod ?? savedPaymentMethods.data?.firstWhereOrNull((e) => e.isDefault);
}
