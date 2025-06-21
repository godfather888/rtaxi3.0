import 'package:api_response/api_response.dart';
import 'package:driver_flutter/core/graphql/documents/wallet.graphql.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:injectable/injectable.dart';
import '../../domain/repositories/wallet_repository.dart';

part 'wallet.state.dart';
part 'wallet.bloc.freezed.dart';

@lazySingleton
class WalletBloc extends Cubit<WalletState> {
  final WalletRepository walletRepository;

  WalletBloc(this.walletRepository) : super(const WalletState());

  void fetchWalletData() async {
    emit(
      state.copyWith(
        walletState: ApiResponse.loading(),
      ),
    );
    final walletDataResponse = await walletRepository.getWalletData();

    emit(
      state.copyWith(
        walletState: walletDataResponse,
      ),
    );
  }
}
