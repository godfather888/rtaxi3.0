import 'package:api_response/api_response.dart';
import 'package:auto_route/auto_route.dart';
import 'package:driver_flutter/config/locator/locator.dart';
import 'package:driver_flutter/core/extensions/extensions.dart';
import 'package:driver_flutter/core/graphql/fragments/payout_account.extentions.dart';
import 'package:driver_flutter/gen/assets.gen.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_common/core/color_palette/color_palette.dart';
import 'package:flutter_common/core/presentation/buttons/app_bordered_button.dart';
import 'package:flutter_common/core/presentation/responsive_dialog/app_top_bar.dart';
import 'package:ionicons/ionicons.dart';

import '../blocs/payout_accounts.bloc.dart';
import '../dialogs/select_payout_method_dialog.dart';

@RoutePage()
class PayoutAccountListScreen extends StatelessWidget {
  const PayoutAccountListScreen({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return BlocProvider.value(
      value: locator<PayoutAccountsBloc>(),
      child: Container(
        color: ColorPalette.neutralVariant99,
        padding: context.responsive(
          const EdgeInsets.all(16).copyWith(bottom: 0),
          xl: const EdgeInsets.all(16).copyWith(top: 96, bottom: 0),
        ),
        child: SafeArea(
          bottom: false,
          child: Column(
            children: [
              AppTopBar(title: context.translate.payoutMethods),
              const SizedBox(
                height: 16,
              ),
              SizedBox(
                width: double.infinity,
                child: AppBorderedButton(
                  onPressed: () async {
                    await showDialog(
                      context: context,
                      useSafeArea: false,
                      builder: (context) => const SelectPayoutMethodDialog(),
                    );
                    locator<PayoutAccountsBloc>().fetchPayoutAccounts();
                  },
                  title: context.translate.addPayoutMethod,
                  icon: Ionicons.add_circle,
                ),
              ),
              const SizedBox(
                height: 16,
              ),
              BlocBuilder<PayoutAccountsBloc, PayoutAccountsState>(
                builder: (context, state) {
                  return switch (state.payoutAccountsState) {
                    ApiResponseInitial() => const SizedBox(),
                    ApiResponseLoading() => Assets.lottie.loading.lottie(
                        width: double.infinity,
                        height: 150,
                      ),
                    ApiResponseLoaded(:final data) => data.payoutAccounts.isEmpty
                        ? const Center(
                            child: Text("No payout account"),
                          )
                        : Expanded(
                            child: ListView.separated(
                              padding: EdgeInsets.zero,
                              itemBuilder: (context, index) {
                                return data.payoutAccounts[index].toSavedCard(
                                  onDefaultChanged: (value) {
                                    locator<PayoutAccountsBloc>().updatePayoutMethodDefaultStatus(
                                      payoutMethodId: data.payoutAccounts[index].id,
                                      isDefault: value,
                                    );
                                  },
                                  onDeletePressed: null,
                                );
                              },
                              separatorBuilder: (context, index) => const SizedBox(
                                height: 16,
                              ),
                              itemCount: data.payoutAccounts.length,
                            ),
                          ),
                    ApiResponseError(:final message) => Center(
                        child: Text(message),
                      ),
                  };
                },
              )
            ],
          ),
        ),
      ),
    );
  }
}
