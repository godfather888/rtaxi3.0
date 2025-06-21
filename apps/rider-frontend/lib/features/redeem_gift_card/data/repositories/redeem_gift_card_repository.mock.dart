import 'package:api_response/api_response.dart';

import 'package:rider_flutter/core/graphql/documents/wallet.graphql.dart';

import '../../domain/repositories/redeem_gift_card_repository.dart';
import 'package:injectable/injectable.dart';

@dev
@LazySingleton(as: RedeemGiftCardRepository)
class RedeemGiftCardRepositoryMock implements RedeemGiftCardRepository {
  @override
  Future<ApiResponse<Mutation$RedeemGiftCard>> redeemGiftCard({required String code}) async {
    Future.delayed(
      Duration(seconds: 1),
    );
    return ApiResponse.loaded(
      Mutation$RedeemGiftCard(
        redeemGiftCard: Mutation$RedeemGiftCard$redeemGiftCard(
          id: '1',
          amount: 23,
          currency: 'USD',
        ),
      ),
    );
  }
}
