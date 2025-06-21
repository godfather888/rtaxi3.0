import 'package:api_response/api_response.dart';
import 'package:flutter_common/core/enums/payment_mode.dart';
import 'package:rider_flutter/core/graphql/documents/wallet.graphql.dart';

abstract class WalletRepository {
  Future<ApiResponse<Mutation$TopUpWallet>> getTopUpWallet({
    required PaymentMode paymentMode,
    required String paymentGatewayId,
    required String currency,
    required double amount,
  });
}
