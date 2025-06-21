import 'package:api_response/api_response.dart';
import 'package:rider_flutter/core/graphql/fragments/payment_gateway.fragment.graphql.dart';
import 'package:rider_flutter/core/graphql/fragments/saved_payment_method.fragment.graphql.dart';

abstract class PaymentMethodsRepository {
  Stream<ApiResponse<List<Fragment$SavedPaymentMethod>>> get savedPaymentMethods;

  Stream<ApiResponse<List<Fragment$PaymentGateway>>> get paymentGateways;

  Future<void> refreshSavedPaymentMethods();
  Future<void> refreshPaymentGateways();

  Future<ApiResponse<List<Fragment$SavedPaymentMethod>>> markAsDefault({required String paymentMethodId});

  Future<ApiResponse<void>> deletePaymentMethod({required String paymentMethodId});

  Future<ApiResponse<String>> getExternalUrl({required String paymentGatewayId});
}
