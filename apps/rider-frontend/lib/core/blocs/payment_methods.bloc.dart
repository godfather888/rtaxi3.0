import 'package:api_response/api_response.dart';
import 'package:collection/collection.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_common/core/entities/payment_method_union.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:injectable/injectable.dart';
import 'package:rider_flutter/config/locator/locator.dart';
import 'package:rider_flutter/core/graphql/fragments/payment_gateway.extentions.dart';
import 'package:rider_flutter/core/graphql/fragments/payment_gateway.fragment.graphql.dart';
import 'package:rider_flutter/core/graphql/fragments/saved_payment_method.extentions.dart';
import 'package:rider_flutter/core/graphql/fragments/saved_payment_method.fragment.graphql.dart';

import 'package:rider_flutter/core/repositories/payment_methods_repository.dart';

part 'payment_methods.state.dart';
part 'payment_methods.bloc.freezed.dart';
part 'payment_methods.event.dart';

@lazySingleton
class PaymentMethodsBloc extends Bloc<PaymentMethodsEvent, PaymentMethodsState> {
  final PaymentMethodsRepository _repository = locator<PaymentMethodsRepository>();

  PaymentMethodsBloc() : super(PaymentMethodsState()) {
    on<PaymentMethodsEvent>((event, emit) async {
      switch (event) {
        case PaymentMethodsEvent$Load():
          emit(state.copyWith(savedPaymentMethods: ApiResponse.loading(), paymentGateways: ApiResponse.loading()));
          _repository.refreshPaymentGateways();
          _repository.refreshSavedPaymentMethods();
          emit.forEach(
            _repository.savedPaymentMethods,
            onData: (savedPaymentMethods) => state.copyWith(savedPaymentMethods: savedPaymentMethods),
          );
          await emit.forEach(
            _repository.paymentGateways,
            onData: (paymentGateways) => state.copyWith(paymentGateways: paymentGateways),
          );
          break;
        case PaymentMethodsEvent$MarkAsDefault(:final paymentMethodId):
          _repository.markAsDefault(paymentMethodId: paymentMethodId);
          break;
        case PaymentMethodsEvent$DeletePaymentMethod():
          _repository.deletePaymentMethod(paymentMethodId: event.paymentMethodId);
          break;
      }
    });
  }

  void load() async => add(PaymentMethodsEvent.load());

  void markAsDefault({required String paymentMethodId}) =>
      add(PaymentMethodsEvent.markAsDefault(paymentMethodId: paymentMethodId));

  void deletePaymentMethod({required String paymentMethodId}) =>
      add(PaymentMethodsEvent.deletePaymentMethod(paymentMethodId: paymentMethodId));
}
