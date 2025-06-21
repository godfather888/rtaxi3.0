part of 'redeem_gift_card.bloc.dart';

@freezed
sealed class RedeemGiftCardState with _$RedeemGiftCardState {
  const factory RedeemGiftCardState({
    required String? code,
    @Default(ApiResponseInitial()) ApiResponse<Mutation$RedeemGiftCard> redeemGiftCardState,
  }) = _RedeemGiftCardState;

  // ignore: prefer_const_constructors
  factory RedeemGiftCardState.initial() => RedeemGiftCardState(
        code: null,
        redeemGiftCardState: ApiResponse.initial(),
      );
}
