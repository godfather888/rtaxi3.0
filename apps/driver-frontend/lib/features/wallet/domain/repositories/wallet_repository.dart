import 'package:api_response/api_response.dart';
import 'package:driver_flutter/core/graphql/documents/wallet.graphql.dart';
import 'package:flutter_common/core/enums/payment_mode.dart';

abstract class WalletRepository {
  Future<ApiResponse<Query$Wallet>> getWalletData();

  Future<ApiResponse<Mutation$TopUpWallet>> topUpWallet({
    required PaymentMode paymentMode,
    required String paymentGatewayId,
    required String currency,
    required double amount,
  });
}
