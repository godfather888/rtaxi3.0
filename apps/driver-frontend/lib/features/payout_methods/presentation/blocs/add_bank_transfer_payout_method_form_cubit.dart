import 'package:api_response/api_response.dart';
import 'package:driver_flutter/core/graphql/documents/payout.graphql.dart';
import 'package:driver_flutter/core/graphql/schema.gql.dart';
import 'package:driver_flutter/features/payout_methods/domain/repositories/payout_methods_repository.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:injectable/injectable.dart';

part 'add_bank_transfer_payout_method_form_cubit.state.dart';
part 'add_bank_transfer_payout_method_form_cubit.freezed.dart';

@LazySingleton()
class AddBankTransferPayoutMethodFormCubit extends Cubit<AddBankTransferPayoutMethodFormState> {
  final PayoutMethodsRepository _repository;

  AddBankTransferPayoutMethodFormCubit(this._repository)
      : super(
          // ignore: prefer_const_constructors
          AddBankTransferPayoutMethodFormState(),
        );

  void init({
    required String payoutMethodId,
  }) {
    emit(state.copyWith(payoutMethodId: payoutMethodId));
  }

  void submit({
    required Input$PayoutAccountInput input,
  }) async {
    emit(state.copyWith(createPayoutAccountState: ApiResponse.loading()));

    final addPayoutMethodResponse = await _repository.addPayoutMethod(input);

    emit(state.copyWith(createPayoutAccountState: addPayoutMethodResponse));
  }

  void reset() {
    emit(
      state.copyWith(
        createPayoutAccountState: ApiResponse.initial(),
      ),
    );
  }

  void onNameChanged(String? name) => emit(state.copyWith(name: name));

  void onAccountNumberChanged(String? accountNumber) => emit(state.copyWith(accountNumber: accountNumber));

  void onRoutingNumberChanged(String? routingNumber) => emit(state.copyWith(routingNumber: routingNumber));

  void onBankNameChanged(String? bankName) => emit(state.copyWith(bankName: bankName));

  void onBranchNameChanged(String? branchName) => emit(state.copyWith(branchName: branchName));

  void onAccountHolderCountryChanged(String? country) => emit(state.copyWith(accountHolderCountry: country));

  void onAccountHolderNameChanged(String? name) => emit(state.copyWith(accountHolderName: name));

  void onAccountHolderAddressChanged(String? address) => emit(state.copyWith(accountHolderAddress: address));

  void onAccountHolderCityChanged(String? city) => emit(state.copyWith(accountHolderCity: city));

  void onAccountHolderZipCodeChanged(String? zipCode) => emit(state.copyWith(accountHolderZip: zipCode));

  void onAccountHolderStateChanged(String? accountHolderState) =>
      emit(state.copyWith(accountHolderState: accountHolderState));

  void onAccountHolderPhoneChanged(String? phone) => emit(state.copyWith(accountHolderPhone: phone));

  void onAccountHolderDateOfBirthChanged(DateTime dateOfBirth) => emit(
        state.copyWith(
          accountHolderDateOfBirth: dateOfBirth,
        ),
      );
}
