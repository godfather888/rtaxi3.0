// ignore_for_file: use_build_context_synchronously
import 'package:api_response/api_response.dart';
import 'package:auto_route/auto_route.dart';
import 'package:driver_flutter/core/enums/card_type.prod.dart';
import 'package:driver_flutter/core/graphql/fragments/payment_gateway.extentions.dart';
import 'package:driver_flutter/core/graphql/fragments/saved_payment_method.extentions.dart';
import 'package:driver_flutter/features/payment_methods/domain/repositories/payment_methods_repository.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_common/core/enums/gateway_link_method.dart';
import 'package:flutter_common/features/wallet/wallet.dart';
import 'package:ionicons/ionicons.dart';
import 'package:driver_flutter/config/locator/locator.dart';
import 'package:flutter_common/core/theme/animation_duration.dart';
import 'package:flutter_common/core/entities/payment_gateway.dart';
import 'package:driver_flutter/core/extensions/extensions.dart';
import 'package:flutter_common/core/presentation/buttons/app_bordered_button.dart';
import 'package:flutter_common/core/presentation/responsive_dialog/app_top_bar.dart';
import 'package:flutter_common/core/presentation/snackbar/snackbar.dart';
import 'package:driver_flutter/gen/assets.gen.dart';
import 'package:url_launcher/url_launcher_string.dart';

import '../blocs/payment_methods.bloc.dart';
import '../dialogs/add_payment_method_dialog.dart';
import '../dialogs/add_card_details_dialog.dart';

@RoutePage()
class PaymentMethodsScreen extends StatefulWidget {
  const PaymentMethodsScreen({super.key});

  @override
  State<PaymentMethodsScreen> createState() => _PaymentMethodsScreenState();
}

class _PaymentMethodsScreenState extends State<PaymentMethodsScreen> {
  late final AppLifecycleListener lifecycleListener;
  @override
  void initState() {
    lifecycleListener = AppLifecycleListener(
      onResume: () {
        locator<PaymentMethodsBloc>().fetchSavedPaymentMethods();
      },
    );
    locator<PaymentMethodsBloc>().fetchSavedPaymentMethods();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return BlocProvider.value(
      value: locator<PaymentMethodsBloc>(),
      child: Container(
        color: context.theme.scaffoldBackgroundColor,
        padding: context.responsive(
          const EdgeInsets.all(16).copyWith(bottom: 0),
          xl: const EdgeInsets.all(16).copyWith(top: 96),
        ),
        child: SafeArea(
          bottom: false,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              context.responsive(
                const SizedBox(),
                xl: const SizedBox(
                  height: 80,
                ),
              ),
              AppTopBar(title: context.translate.paymentMethods),
              const SizedBox(
                height: 24,
              ),
              Text(
                context.translate.selectCards,
                style: context.titleMedium,
              ),
              const SizedBox(
                height: 7,
              ),
              Text(
                context.translate.selectCardsDescription,
                style: context.bodyMedium,
              ),
              const SizedBox(
                height: 40,
              ),
              Expanded(
                child: BlocBuilder<PaymentMethodsBloc, PaymentMethodsState>(
                  builder: (context, state) {
                    return AnimatedSwitcher(
                        duration: AnimationDuration.pageStateTransitionMobile,
                        child: switch (state.savedPaymentMethodsState) {
                          ApiResponseInitial() => const SizedBox(),
                          ApiResponseLoading() => Assets.lottie.loading.lottie(
                              width: double.infinity,
                              height: double.infinity,
                            ),
                          ApiResponseError(:final message) => Center(child: Text(message)),
                          ApiResponseLoaded(:final data) => Container(
                              constraints: context.responsive(
                                null,
                                xl: const BoxConstraints(maxWidth: 400),
                              ),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.stretch,
                                children: [
                                  Padding(
                                    padding: const EdgeInsets.all(8.0),
                                    child: AppBorderedButton(
                                      onPressed: () async {
                                        final result = await showDialog(
                                          context: context,
                                          useSafeArea: false,
                                          builder: (context) => AddPaymentMethodDialog(
                                            paymentGateways: data.paymentGateways.toEntity,
                                          ),
                                        ) as PaymentGatewayEntity?;

                                        if (result != null) {
                                          if (result.linkMethod == GatewayLinkMethod.redirect) {
                                            final url = await locator<PaymentMethodsRepository>().getExternalUrl(
                                              paymentGatewayId: result.id,
                                            );
                                            url.fold(
                                              (l) {
                                                context.showSnackBar(message: l);
                                              },
                                              (r) {
                                                launchUrlString(
                                                  r.setupPaymentMethod.url!,
                                                  mode: LaunchMode.externalApplication,
                                                );
                                              },
                                            );
                                          } else {
                                            showDialog(
                                              context: context,
                                              useSafeArea: false,
                                              builder: (context) => const AddCardDetailsDialog(),
                                            );
                                          }
                                        }
                                      },
                                      icon: Ionicons.add_circle,
                                      title: context.translate.addCard,
                                    ),
                                  ),
                                  const SizedBox(height: 8),
                                  Expanded(
                                    child: SingleChildScrollView(
                                      child: Column(
                                        children: data.savedPaymentMethods.toEntity
                                            .map(
                                              (e) => Padding(
                                                padding: const EdgeInsets.only(bottom: 16, left: 8, right: 8),
                                                child: SavedCard(
                                                  accountHolderName: e.cardHolderName,
                                                  accountNumber: "*** **** **** ${e.last4Digits}",
                                                  bankName: e.cardType.title(context),
                                                  cardImage: e.cardImage.provider(),
                                                  isDefault: e.isDefault,
                                                  icon: e.cardType.icon.image(width: 24, height: 24),
                                                ),
                                              ),
                                            )
                                            .toList(),
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                            ),
                        });
                  },
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
