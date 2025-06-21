import 'package:api_response/api_response.dart';
import 'package:graphql/client.dart';
import 'package:rider_flutter/core/graphql/documents/wallet.graphql.dart';

abstract class WalletRepository {
  Future<ApiResponse<Query$Wallet>> getWalletData({
    FetchPolicy? fetchPolicy,
  });
}
