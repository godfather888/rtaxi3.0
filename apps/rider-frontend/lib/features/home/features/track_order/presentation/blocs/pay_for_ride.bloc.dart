import 'package:api_response/api_response.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_common/core/entities/payment_gateway.dart';
import 'package:flutter_common/core/entities/payment_method_union.dart';
import 'package:flutter_common/core/entities/saved_payment_method.dart';
import 'package:flutter_common/core/enums/payment_mode.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:injectable/injectable.dart';
import 'package:rider_flutter/core/graphql/documents/wallet.graphql.dart';
import 'package:rider_flutter/core/graphql/fragments/intent_result.fragment.graphql.dart';
import 'package:rider_flutter/core/graphql/fragments/payment_gateway.extentions.dart';
import 'package:rider_flutter/core/graphql/fragments/saved_payment_method.extentions.dart';
import 'package:rider_flutter/core/graphql/schema.gql.dart';
import 'package:rider_flutter/core/repositories/wallet_repository.dart';
import 'package:rider_flutter/features/home/features/track_order/domain/repositories/track_order_repository.dart';

part 'pay_for_ride.state.dart';
part 'pay_for_ride.bloc.freezed.dart';

@lazySingleton
class PayForRideCubit extends Cubit<PayForRideState> {
  final TrackOrderRepository _repository;
  final WalletRepository _walletRepository;

  PayForRideCubit(this._repository, this._walletRepository) : super(PayForRideState());

  void load({
    required PaymentMethodUnion? selectedPaymentMethod,
    required bool cashEnabled,
    required bool walletCreditSufficient,
  }) async {
    emit(state.copyWith(savedPaymentMethodsState: ApiResponse.loading()));

    final paymentMethodsResponse = await _repository.getPaymentMethods();

    emit(state.copyWith(savedPaymentMethodsState: paymentMethodsResponse));
  }

  void changePaymentMethod({
    required PaymentMethodUnion selectedPaymentMethod,
  }) {
    emit(
      state.copyWith(
        selectedPaymentMethod: selectedPaymentMethod,
      ),
    );
  }

  void pay({
    required String currency,
    required double amount,
  }) async {
    final paymentMode = state.selectedPaymentMethod?.paymentMode;
    if (paymentMode == PaymentMode.cash || paymentMode == PaymentMode.wallet) {
      emit(
        state.copyWith(
          paymentStatus: ApiResponse.loaded(Fragment$IntentResult(status: Enum$TopUpWalletStatus.OK)),
        ),
      );
      return;
    }

    final topUpWalletResponse = await _walletRepository.getTopUpWallet(
      paymentMode: paymentMode!,
      paymentGatewayId: state.selectedPaymentMethod?.id ?? "0",
      currency: currency,
      amount: amount,
    );

    emit(
      state.copyWith(
        paymentStatus: topUpWalletResponse.mapData((data) => data.topUpWallet),
      ),
    );
  }
}
