import 'package:api_response/api_response.dart';
import 'package:driver_flutter/core/graphql/documents/wallet.graphql.dart';
import 'package:driver_flutter/features/payment_methods/domain/repositories/payment_methods_repository.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:injectable/injectable.dart';
part 'payment_methods.state.dart';
part 'payment_methods.bloc.freezed.dart';

@lazySingleton
class PaymentMethodsBloc extends Cubit<PaymentMethodsState> {
  final PaymentMethodsRepository _repository;

  PaymentMethodsBloc(this._repository) : super(const PaymentMethodsState());

  void fetchSavedPaymentMethods() async {
    emit(state.copyWith(savedPaymentMethodsState: ApiResponse.loading()));

    final savedPaymentMethodsResponse = await _repository.getSavedPaymentMethods();

    emit(state.copyWith(savedPaymentMethodsState: savedPaymentMethodsResponse));
  }
}
