import 'package:api_response/api_response.dart';
import 'package:graphql/client.dart';
import 'package:injectable/injectable.dart';
import 'package:rider_flutter/core/graphql/documents/wallet.graphql.dart';
import 'package:rider_flutter/core/graphql/fragments/payment_gateway.mock.dart';
import 'package:rider_flutter/core/graphql/fragments/rider_transaction.mock.dart';
import 'package:rider_flutter/core/graphql/fragments/saved_payment_method.mock.dart';
import '../../domain/repositories/wallet_repository.dart';

@dev
@LazySingleton(as: WalletRepository)
class WalletRepositoryMock implements WalletRepository {
  @override
  Future<ApiResponse<Query$Wallet>> getWalletData({
    FetchPolicy? fetchPolicy,
  }) async {
    return ApiResponse.loaded(
      Query$Wallet(
        rider: Query$Wallet$rider(
          id: '1',
          transactions: Query$Wallet$rider$transactions(nodes: [
            mockRiderTransaction1,
            mockRiderTransaction2,
          ]),
          wallets: [
            Query$Wallet$rider$wallets(
              id: 'id',
              currency: 'USD',
              balance: 300,
            ),
          ],
        ),
        savedPaymentMethods: [
          mockSavedPaymentMethod1,
          mockSavedPaymentMethod2,
        ],
        paymentGateways: [
          mockPaymentGateway1,
          mockPaymentGateway2,
        ],
      ),
    );
  }
}
