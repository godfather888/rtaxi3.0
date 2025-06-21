import 'package:api_response/api_response.dart';
import 'package:graphql/client.dart';
import 'package:injectable/injectable.dart';
import 'package:rider_flutter/core/graphql/documents/wallet.graphql.dart';
import 'package:rider_flutter/core/datasources/graphql_datasource.dart';

import '../../domain/repositories/wallet_repository.dart';

@prod
@LazySingleton(as: WalletRepository)
class WalletRepositoryImpl implements WalletRepository {
  final GraphqlDatasource graphqlDatasource;

  WalletRepositoryImpl(this.graphqlDatasource);

  @override
  Future<ApiResponse<Query$Wallet>> getWalletData({
    FetchPolicy? fetchPolicy,
  }) async {
    final walletDataResponse = await graphqlDatasource.query(Options$Query$Wallet(
      fetchPolicy: fetchPolicy,
    ));
    return walletDataResponse;
  }
}
