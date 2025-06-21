import 'package:api_response/api_response.dart';
import 'package:driver_flutter/core/graphql/documents/wallet.graphql.dart';
import 'package:driver_flutter/core/graphql/fragments/intent_result.mock.dart';
import 'package:driver_flutter/core/graphql/fragments/payment_gateway.mock.dart';
import 'package:driver_flutter/core/graphql/fragments/profile.mock.dart';
import 'package:driver_flutter/core/graphql/fragments/saved_payment_method.mock.dart';
import 'package:driver_flutter/core/graphql/schema.gql.dart';
import 'package:flutter_common/core/enums/payment_mode.dart';
import 'package:injectable/injectable.dart';

import '../../domain/repositories/wallet_repository.dart';

@dev
@LazySingleton(as: WalletRepository)
class WalletRepositoryMock implements WalletRepository {
  @override
  Future<ApiResponse<Query$Wallet>> getWalletData() async {
    await Future.delayed(const Duration(seconds: 1));
    return ApiResponse.loaded(
      Query$Wallet(
        driver: mockProfile1,
        savedPaymentMethods: mockSavedPaymentMethods,
        paymentGateways: mockPaymentGateways,
        driverTransacions: Query$Wallet$driverTransacions(
          edges: [
            Query$Wallet$driverTransacions$edges(
              node: Query$Wallet$driverTransacions$edges$node(
                id: '1',
                createdAt: DateTime.now().subtract(Duration(days: 1)),
                action: Enum$TransactionAction.Deduct,
                amount: 45.75,
                currency: 'USD',
                driverId: "101",
                deductType: Enum$DriverDeductTransactionType.Commission,
                rechargeType: Enum$DriverRechargeTransactionType.BankTransfer,
                refrenceNumber: 'TXN123456',
              ),
            ),
            Query$Wallet$driverTransacions$edges(
              node: Query$Wallet$driverTransacions$edges$node(
                id: '2',
                createdAt: DateTime.now().subtract(Duration(days: 2)),
                action: Enum$TransactionAction.Recharge,
                amount: 150.00,
                currency: 'USD',
                driverId: "101",
                deductType: Enum$DriverDeductTransactionType.Correction,
                rechargeType: Enum$DriverRechargeTransactionType.Gift,
                refrenceNumber: 'TXN654321',
              ),
            ),
          ],
        ),
      ),
    );
  }

  @override
  Future<ApiResponse<Mutation$TopUpWallet>> topUpWallet({
    required PaymentMode paymentMode,
    required String paymentGatewayId,
    required String currency,
    required double amount,
  }) async {
    await Future.delayed(const Duration(seconds: 1));
    return ApiResponse.loaded(
      Mutation$TopUpWallet(
        topUpWallet: mockIntentResult1,
      ),
    );
  }
}
