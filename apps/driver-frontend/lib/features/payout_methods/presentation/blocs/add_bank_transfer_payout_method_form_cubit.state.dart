part of 'add_bank_transfer_payout_method_form_cubit.dart';

@freezed
sealed class AddBankTransferPayoutMethodFormState with _$AddBankTransferPayoutMethodFormState {
  const factory AddBankTransferPayoutMethodFormState({
    String? name,
    String? payoutMethodId,
    String? accountNumber,
    String? routingNumber,
    String? bankName,
    String? accountHolderName,
    String? branchName,
    @Default(false) bool isDefault,
    String? accountHolderAddress,
    String? accountHolderCity,
    String? accountHolderState,
    String? accountHolderZip,
    String? accountHolderCountry,
    String? accountHolderPhone,
    DateTime? accountHolderDateOfBirth,
    @Default(ApiResponseInitial()) ApiResponse<Mutation$CreatePayoutAccount> createPayoutAccountState,
  }) = _AddBankTransferPayoutMethodFormState;

  const AddBankTransferPayoutMethodFormState._();

  Input$PayoutAccountInput get toInput => Input$PayoutAccountInput(
        payoutMethodId: payoutMethodId!,
        name: name!,
        accountNumber: accountNumber!,
        bankName: bankName!,
        isDefault: isDefault,
        accountHolderAddress: accountHolderAddress,
        accountHolderCity: accountHolderCity,
        accountHolderCountry: accountHolderCountry,
        accountHolderDateOfBirth: accountHolderDateOfBirth,
        accountHolderName: accountHolderName,
        accountHolderPhone: accountHolderPhone,
        branchName: branchName,
        routingNumber: routingNumber,
        accountHolderZip: accountHolderZip,
        accountHolderState: accountHolderState,
      );
}
