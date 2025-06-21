import 'package:driver_flutter/config/locator/locator.dart';
import 'package:driver_flutter/core/enums/order_status.prod.dart';
import 'package:driver_flutter/core/extensions/extensions.dart';
import 'package:driver_flutter/core/graphql/fragments/current_order.extentions.dart';
import 'package:driver_flutter/core/graphql/fragments/current_order.fragment.graphql.dart';
import 'package:driver_flutter/features/home/presentation/blocs/home.bloc.dart';
import 'package:driver_flutter/features/home/presentation/dialogs/confirm_cash_payment.dart';
import 'package:driver_flutter/gen/assets.gen.dart';
import 'package:flutter/material.dart';
import 'package:flutter_common/core/color_palette/color_palette.dart';
import 'package:flutter_common/core/enums/order_status.dart';
import 'package:flutter_common/core/presentation/avatars/app_avatar.dart';
import 'package:flutter_common/core/presentation/buttons/app_bordered_button.dart';
import 'package:flutter_common/core/presentation/buttons/app_close_button.dart';
import 'package:flutter_common/core/presentation/buttons/app_primary_button.dart';
import 'package:flutter_common/core/presentation/invoice/invoice.dart';
import 'package:ionicons/ionicons.dart';
import 'package:url_launcher/url_launcher_string.dart';

class OrderSummary extends StatelessWidget {
  final Fragment$CurrentOrder order;

  const OrderSummary({
    super.key,
    required this.order,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      color: ColorPalette.neutralVariant99,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          AnimatedContainer(
            duration: const Duration(milliseconds: 300),
            height: 150,
            decoration: BoxDecoration(
              image: DecorationImage(
                image: Assets.images.drawerTopBackground.provider(),
                fit: BoxFit.cover,
              ),
            ),
            child: SafeArea(
              child: Align(
                alignment: Alignment.topLeft,
                child: order.status.toEntity == OrderStatus.finished
                    ? Padding(
                        padding: const EdgeInsets.all(16),
                        child: AppCloseButton(
                          onPressed: () {
                            locator<HomeBloc>().add(
                              HomeEvent.onSummaryConfirmed(orderId: order.id),
                            );
                          },
                        ),
                      )
                    : const SizedBox(),
              ),
            ),
          ),
          Transform.translate(
            offset: const Offset(0, -33),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                AppAvatar(
                  url: order.rider?.media?.address,
                  defaultAvatarPath: Assets.avatars.a1.path,
                ),
                const SizedBox(height: 8),
                Text(order.riderFullName, style: context.titleMedium),
                const SizedBox(height: 4),
                Text(
                  order.service?.name ?? '',
                  style: context.bodyMedium?.copyWith(
                    color: ColorPalette.neutralVariant50,
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),
          Center(
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Invoice(
                currency: order.currency,
                total: order.costAfterCoupon - order.providerShare,
                items: [
                  ("Service fee", order.serviceCost),
                  ("Wait fee", order.waitCost),
                  ("Ride Options fee", order.rideOptionsCost),
                  ("Discount", -(order.costBest - order.costAfterCoupon)),
                  ("Provider share", -order.providerShare),
                ],
              ),
            ),
          ),
          const Spacer(),
          if (order.cashPaymentAllowed)
            SafeArea(
              top: false,
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: AppPrimaryButton(
                  isDisabled: order.status.toEntity == OrderStatus.finished,
                  onPressed: () {
                    showDialog(
                      context: context,
                      useSafeArea: false,
                      builder: (context) => ConfirmCashPayment(
                        orderId: order.id,
                        amount: order.costAfterCoupon,
                        currency: order.currency,
                      ),
                    );
                  },
                  child: Text(
                    context.translate.cashPaymentReceived,
                  ),
                ),
              ),
            ),
          if (order.cashPaymentAllowed == false)
            SafeArea(
              top: false,
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    Text(
                      "The payment hasn't been settled yet",
                      textAlign: TextAlign.center,
                      style: context.bodyLarge,
                    ),
                    const SizedBox(height: 16),
                    AppBorderedButton(
                      onPressed: () {
                        launchUrlString("tel://+${order.rider?.mobileNumber}");
                      },
                      icon: Ionicons.call_outline,
                      title: "Call the rider",
                    ),
                  ],
                ),
              ),
            ),
        ],
      ),
    );
  }
}
