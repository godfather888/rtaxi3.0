part of 'top_up_wallet.bloc.dart';

@freezed
sealed class TopUpWalletState with _$TopUpWalletState {
  const factory TopUpWalletState({
    @Default(ApiResponseInitial()) ApiResponse<Mutation$TopUpWallet> topUpWalletState,
  }) = _TopUpWalletState;
}
