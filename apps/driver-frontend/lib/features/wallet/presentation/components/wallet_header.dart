import 'package:api_response/api_response.dart';
import 'package:auto_route/auto_route.dart';
import 'package:collection/collection.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_common/core/color_palette/color_palette.dart';
import 'package:driver_flutter/core/extensions/extensions.dart';
import 'package:flutter_common/core/presentation/buttons/app_back_button.dart';
import 'package:driver_flutter/features/wallet/presentation/blocs/wallet.bloc.dart';
import 'package:driver_flutter/gen/assets.gen.dart';

import 'action_buttons.dart';

class WalletHeader extends StatelessWidget {
  const WalletHeader({super.key});

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        Container(
          padding: const EdgeInsets.all(16),
          width: double.infinity,
          margin: const EdgeInsets.only(bottom: 32),
          decoration: BoxDecoration(
            borderRadius: context.responsive(
              BorderRadius.zero,
              xl: BorderRadius.circular(20),
            ),
            image: DecorationImage(
              image: Assets.images.walletHeaderBackground.provider(),
              fit: BoxFit.cover,
            ),
          ),
          child: SafeArea(
            top: context.responsive(true, xl: false),
            bottom: false,
            child: Column(
              children: [
                context.responsive(
                  Align(
                    alignment: Alignment.centerLeft,
                    child: AppBackButton(
                      onPressed: () => context.router.maybePop(),
                    ),
                  ),
                  xl: const SizedBox(
                    height: 84,
                  ),
                ),
                Text(
                  context.translate.walletBalance,
                  style: context.bodyMedium?.copyWith(
                    color: context.theme.colorScheme.onSurfaceVariant,
                  ),
                ),
                const SizedBox(height: 16),
                BlocBuilder<WalletBloc, WalletState>(
                  builder: (context, state) {
                    return Text(
                      switch (state.walletState) {
                        ApiResponseLoaded(:final data) =>
                          (data.driver.wallet.sorted((a, b) => a.balance.compareTo(b.balance)).firstOrNull?.balance ?? 0)
                              .formatCurrency(
                            data.driver.wallet.sorted((a, b) => a.balance.compareTo(b.balance)).firstOrNull?.currency ??
                                'USD',
                          ),
                        _ => '',
                      },
                      style: context.headlineLarge?.copyWith(
                        color: ColorPalette.primary30,
                      ),
                    );
                  },
                ),
                SizedBox(
                  height: context.responsive(16, xl: 64),
                ),
              ],
            ),
          ),
        ),
        const Positioned(
          bottom: 0,
          left: 0,
          right: 0,
          child: Center(child: ActionButtons()),
        ),
      ],
    );
  }
}
