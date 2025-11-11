import 'package:api_response/api_response.dart';
import 'package:driver_flutter/core/graphql/documents/payout.graphql.dart';
import 'package:driver_flutter/features/payout_methods/domain/repositories/payout_methods_repository.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:injectable/injectable.dart';

part 'payout_methods.state.dart';
part 'payout_methods.bloc.freezed.dart';

@LazySingleton()
class PayoutMethodsBloc extends Cubit<PayoutMethodsState> {
  final PayoutMethodsRepository _repository;

  PayoutMethodsBloc(this._repository) : super(const PayoutMethodsState()) {
    fetchAvailablePayoutMethods();
  }

  Future<void> fetchAvailablePayoutMethods() async {
    emit(state.copyWith(supportedPayoutMethodsState: ApiResponse.loading()));

    final availablePayoutMethodsResponse = await _repository.getAvailablePayoutMethods();

    emit(state.copyWith(supportedPayoutMethodsState: availablePayoutMethodsResponse));
  }
}
