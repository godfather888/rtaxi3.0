import 'package:api_response/api_response.dart';
import 'package:driver_flutter/core/graphql/documents/wallet.graphql.dart';

abstract class PaymentMethodsRepository {
  Future<ApiResponse<Query$SavedPaymentMethods>> getSavedPaymentMethods();

  Future<ApiResponse<Mutation$SetupPaymentMethodLink>> getExternalUrl({
    required String paymentGatewayId,
  });
}
