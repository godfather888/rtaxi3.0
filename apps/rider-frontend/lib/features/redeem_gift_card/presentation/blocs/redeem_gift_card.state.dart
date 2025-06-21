part of 'redeem_gift_card.bloc.dart';

@freezed
sealed class RedeemGiftCardState with _$RedeemGiftCardState {
  const factory RedeemGiftCardState({
    String? code,
    @Default(ApiResponseInitial()) ApiResponse<Mutation$RedeemGiftCard> redeemGiftCardState,
  }) = _RedeemGiftCardState;
}
