import 'package:api_response/api_response.dart';
import 'package:driver_flutter/core/datasources/graphql_datasource.dart';
import 'package:driver_flutter/core/enums/payment_mode.prod.dart';
import 'package:driver_flutter/core/graphql/documents/wallet.graphql.dart';
import 'package:driver_flutter/core/graphql/schema.gql.dart';
import 'package:flutter_common/core/enums/payment_mode.dart';
import 'package:injectable/injectable.dart';

import '../../domain/repositories/wallet_repository.dart';

@prod
@LazySingleton(as: WalletRepository)
class WalletRepositoryImpl implements WalletRepository {
  final GraphqlDatasource graphQLDatasource;

  WalletRepositoryImpl(
    this.graphQLDatasource,
  );

  @override
  Future<ApiResponse<Query$Wallet>> getWalletData() async {
    final walletDataResponse = await graphQLDatasource.query(
      Options$Query$Wallet(),
    );
    return walletDataResponse;
  }

  @override
  Future<ApiResponse<Mutation$TopUpWallet>> topUpWallet({
    required PaymentMode paymentMode,
    required String paymentGatewayId,
    required String currency,
    required double amount,
  }) async {
    final topUpWalletResponse = await graphQLDatasource.mutate(
      Options$Mutation$TopUpWallet(
        variables: Variables$Mutation$TopUpWallet(
          input: Input$TopUpWalletInput(
            gatewayId: paymentGatewayId,
            amount: amount,
            currency: currency,
            paymentMode: paymentMode.toGql,
          ),
        ),
      ),
    );
    return topUpWalletResponse;
  }
}
