import 'package:api_response/api_response.dart';
import 'package:collection/collection.dart';
import 'package:driver_flutter/core/graphql/documents/payout.graphql.dart';
import 'package:driver_flutter/core/graphql/fragments/payout_account.fragment.graphql.dart';
import 'package:driver_flutter/features/payout_methods/domain/repositories/payout_methods_repository.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:injectable/injectable.dart';

part 'payout_accounts.state.dart';
part 'payout_accounts.bloc.freezed.dart';

@lazySingleton
class PayoutAccountsBloc extends Cubit<PayoutAccountsState> {
  final PayoutMethodsRepository _repository;

  PayoutAccountsBloc(this._repository) : super(const PayoutAccountsState());

  void fetchPayoutAccounts() async {
    emit(state.copyWith(payoutAccountsState: ApiResponse.loading()));

    final payoutAccountsResponse = await _repository.getPayoutAccounts();

    emit(state.copyWith(payoutAccountsState: payoutAccountsResponse));
  }

  void updatePayoutMethodDefaultStatus({
    required String payoutMethodId,
    required bool isDefault,
  }) async {
    emit(state.copyWith(updatePayoutMethodDefaultStatusState: ApiResponse.loading()));
    final updateDefaultPayoutMethodStatusResponse = await _repository.updateDefaultPayoutMethodStatus(
      payoutMethodId: payoutMethodId,
      isDefault: isDefault,
    );
    emit(state.copyWith(updatePayoutMethodDefaultStatusState: updateDefaultPayoutMethodStatusResponse));
    fetchPayoutAccounts();
  }
}
