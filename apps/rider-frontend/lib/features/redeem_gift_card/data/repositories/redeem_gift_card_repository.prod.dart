import 'package:api_response/api_response.dart';
import 'package:injectable/injectable.dart';
import 'package:rider_flutter/core/graphql/documents/wallet.graphql.dart';

import '../../../../core/datasources/graphql_datasource.dart';
import '../../domain/repositories/redeem_gift_card_repository.dart';

@prod
@LazySingleton(as: RedeemGiftCardRepository)
class RedeemGiftCardRepositoryImpl implements RedeemGiftCardRepository {
  final GraphqlDatasource graphQLDatasource;

  RedeemGiftCardRepositoryImpl(
    this.graphQLDatasource,
  );

  @override
  Future<ApiResponse<Mutation$RedeemGiftCard>> redeemGiftCard({required String code}) async {
    final redeemGiftCardResponse = await graphQLDatasource.mutate(
      Options$Mutation$RedeemGiftCard(
        variables: Variables$Mutation$RedeemGiftCard(
          code: code,
        ),
      ),
    );
    return redeemGiftCardResponse;
  }
}
