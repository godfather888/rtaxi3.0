import 'package:api_response/api_response.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_common/core/theme/animation_duration.dart';
import 'package:rider_flutter/core/extensions/extensions.dart';
import 'package:rider_flutter/features/wallet/presentation/components/wallet_transaction_item.dart';
import 'package:rider_flutter/gen/assets.gen.dart';

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
            child: AnimatedSwitcher(
              duration: AnimationDuration.pageStateTransitionMobile,
              child: switch (state.walletState) {
                ApiResponseInitial() => const SizedBox(),
                ApiResponseLoading() => Assets.lottie.loading.lottie(
                    height: 300,
                    width: double.infinity,
                  ),
                ApiResponseLoaded(data: final data) => Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      if (data.rider.transactions.nodes.isEmpty)
                        Expanded(
                          child: Center(
                            child: Text(
                              context.translate.noActivitiesYet,
                              style: context.titleSmall,
                            ),
                          ),
                        )
                      else ...[
                        Text(
                          context.translate.activities,
                          style: context.titleMedium,
                        ),
                        const SizedBox(height: 16),
                        Expanded(
                          child: SingleChildScrollView(
                            child: Column(
                              children: data.rider.transactions.nodes
                                  .map(
                                    (e) => Padding(
                                      padding: const EdgeInsets.only(bottom: 16),
                                      child: WalletTransactionItem(transaction: e),
                                    ),
                                  )
                                  .toList(),
                            ),
                          ),
                        ),
                      ],
                    ],
                  ),
                ApiResponseError(:final message) => Text(message),
              },
            ),
          );
        },
      ),
    );
  }
}
