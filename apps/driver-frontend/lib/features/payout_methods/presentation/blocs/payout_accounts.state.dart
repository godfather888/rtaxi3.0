part of 'payout_accounts.bloc.dart';

@freezed
sealed class PayoutAccountsState with _$PayoutAccountsState {
  const factory PayoutAccountsState({
    @Default(ApiResponseInitial()) ApiResponse<Query$PayoutAccounts> payoutAccountsState,
    @Default(ApiResponseInitial())
    ApiResponse<Mutation$UpdatePayoutMethodDefaultStatus> updatePayoutMethodDefaultStatusState,
  }) = _PayoutAccountsState;
}

extension PayoutAccountListX on List<Fragment$PayoutAccount> {
  Fragment$PayoutAccount? get defaultPayoutAccount {
    return firstWhereOrNull((element) => element.isDefault);
  }

  List<Fragment$PayoutAccount> get nonDefaultPayoutAccounts {
    return where((element) => !element.isDefault).toList();
  }
}
