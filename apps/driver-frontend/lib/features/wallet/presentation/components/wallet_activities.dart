import 'package:api_response/api_response.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:driver_flutter/core/extensions/extensions.dart';
import 'package:driver_flutter/features/wallet/presentation/components/wallet_transaction_item.dart';
import 'package:driver_flutter/gen/assets.gen.dart';

import '../blocs/wallet.bloc.dart';

class WalletActivities extends StatelessWidget {
  const WalletActivities({super.key});

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: BlocBuilder<WalletBloc, WalletState>(
        builder: (context, state) {
          return Padding(
            padding: const EdgeInsets.all(16),
            child: switch (state.walletState) {
              ApiResponseInitial() => const SizedBox(),
              ApiResponseLoading() => Assets.lottie.loading.lottie(height: 300, width: double.infinity),
              ApiResponseError(:final message) => Text(message),
              ApiResponseLoaded(:final data) => data.driverTransacions.edges.isEmpty
                  ? Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(
                          "No activities yet",
                          style: context.bodyMedium,
                        ),
                      ],
                    )
                  : Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        Text(
                          context.translate.activities,
                          style: context.titleMedium,
                        ),
                        const SizedBox(height: 16),
                        Expanded(
                          child: SingleChildScrollView(
                            child: Column(
                              children: data.driverTransacions.edges
                                  .map(
                                    (e) => Padding(
                                      padding: const EdgeInsets.only(bottom: 16),
                                      child: WalletTransactionItem(
                                        transaction: e.node,
                                      ),
                                    ),
                                  )
                                  .toList(),
                            ),
                          ),
                        ),
                      ],
                    ),
            },
          );
        },
      ),
    );
  }
}
