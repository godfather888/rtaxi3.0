part of 'wallet.bloc.dart';

@freezed
sealed class WalletState with _$WalletState {
  const factory WalletState({
    @Default(ApiResponseInitial()) ApiResponse<Query$Wallet> walletState,
  }) = _WalletState;
}
