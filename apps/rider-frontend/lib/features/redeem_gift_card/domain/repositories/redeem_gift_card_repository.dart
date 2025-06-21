import 'package:api_response/api_response.dart';

import 'package:rider_flutter/core/graphql/documents/wallet.graphql.dart';

abstract class RedeemGiftCardRepository {
  Future<ApiResponse<Mutation$RedeemGiftCard>> redeemGiftCard({
    required String code,
  });
}
