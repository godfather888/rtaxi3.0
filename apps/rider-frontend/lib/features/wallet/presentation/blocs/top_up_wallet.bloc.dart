import 'package:api_response/api_response.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_common/core/enums/payment_mode.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:injectable/injectable.dart';
import 'package:rider_flutter/core/graphql/documents/wallet.graphql.dart';
import 'package:rider_flutter/core/repositories/wallet_repository.dart' as core_wallet;

part 'top_up_wallet.bloc.freezed.dart';
part 'top_up_wallet.state.dart';

@lazySingleton
class TopUpWalletBloc extends Cubit<TopUpWalletState> {
  final core_wallet.WalletRepository _coreWalletRepository;

  TopUpWalletBloc(
    this._coreWalletRepository,
  ) : super(const TopUpWalletState());

  void fetchTopUpWallet({
    required PaymentMode paymentMode,
    required String paymentMethodId,
    required String currency,
    required double amount,
  }) async {
    emit(
      state.copyWith(
        topUpWalletState: ApiResponse.loading(),
      ),
    );

    final topUpWalletResponse = await _coreWalletRepository.getTopUpWallet(
      paymentGatewayId: paymentMethodId,
      currency: currency,
      amount: amount,
      paymentMode: paymentMode,
    );

    emit(
      state.copyWith(
        topUpWalletState: topUpWalletResponse,
      ),
    );
  }
}
