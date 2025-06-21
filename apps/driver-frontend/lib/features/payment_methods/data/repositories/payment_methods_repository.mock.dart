import 'package:api_response/api_response.dart';
import 'package:driver_flutter/core/graphql/documents/wallet.graphql.dart';
import 'package:driver_flutter/core/graphql/fragments/payment_gateway.mock.dart';
import 'package:driver_flutter/core/graphql/fragments/saved_payment_method.mock.dart';
import '../../domain/repositories/payment_methods_repository.dart';
import 'package:injectable/injectable.dart';

@dev
@LazySingleton(as: PaymentMethodsRepository)
class PaymentMethodsRepositoryMock implements PaymentMethodsRepository {
  @override
  Future<ApiResponse<Query$SavedPaymentMethods>> getSavedPaymentMethods() async {
    await Future.delayed(Duration(seconds: 1));
    return ApiResponse.loaded(
      Query$SavedPaymentMethods(
        savedPaymentMethods: mockSavedPaymentMethods,
        paymentGateways: mockPaymentGateways,
      ),
    );
  }

  @override
  Future<ApiResponse<Mutation$SetupPaymentMethodLink>> getExternalUrl({
    required String paymentGatewayId,
  }) async {
    await Future.delayed(Duration(seconds: 1));

    return ApiResponse.loaded(
      Mutation$SetupPaymentMethodLink(
        setupPaymentMethod: Mutation$SetupPaymentMethodLink$setupPaymentMethod(
          url: 'https://www.paypal.com',
        ),
      ),
    );
  }
}
