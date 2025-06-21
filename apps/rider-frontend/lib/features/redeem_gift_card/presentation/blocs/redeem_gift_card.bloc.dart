import 'package:api_response/api_response.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:injectable/injectable.dart';
import 'package:rider_flutter/core/graphql/documents/wallet.graphql.dart';
import 'package:rider_flutter/features/redeem_gift_card/domain/repositories/redeem_gift_card_repository.dart';

part 'redeem_gift_card.state.dart';
part 'redeem_gift_card.bloc.freezed.dart';

@lazySingleton
class RedeemGiftCardBloc extends Cubit<RedeemGiftCardState> {
  final RedeemGiftCardRepository _repository;

  RedeemGiftCardBloc(this._repository) : super(const RedeemGiftCardState());

  void onStarted() {}

  void onCodeChanged(String code) {
    emit(
      state.copyWith(
        code: code,
      ),
    );
  }

  void onSubmitted() async {
    if (state.code == null) throw Exception('Code is null');

    emit(
      state.copyWith(
        redeemGiftCardState: ApiResponse.loading(),
      ),
    );

    final redeemGiftCardResponse = await _repository.redeemGiftCard(
      code: state.code!,
    );

    emit(
      state.copyWith(
        redeemGiftCardState: redeemGiftCardResponse,
      ),
    );
  }
}
