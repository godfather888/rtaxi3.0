import 'package:api_response/api_response.dart';
import 'package:auto_route/auto_route.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:ionicons/ionicons.dart';
import 'package:rider_flutter/config/locator/locator.dart';
import 'package:rider_flutter/core/extensions/extensions.dart';
import 'package:flutter_common/core/presentation/buttons/app_primary_button.dart';
import 'package:flutter_common/core/presentation/responsive_dialog/app_responsive_dialog.dart';
import 'package:rider_flutter/core/graphql/documents/calculate_fare.graphql.dart';
import 'package:rider_flutter/core/graphql/schema.gql.dart';
import 'package:rider_flutter/core/repositories/order_repository.dart';

import 'coupon_applied_dialog.dart';

class EnterCouponDialog extends StatefulWidget {
  final Input$CalculateFareInput calculateFareArgs;

  const EnterCouponDialog({
    super.key,
    required this.calculateFareArgs,
  });

  @override
  State<EnterCouponDialog> createState() => _EnterCouponDialogState();
}

class _EnterCouponDialogState extends State<EnterCouponDialog> {
  String? couponCode;
  String? errorText;
  bool isLoading = false;

  @override
  Widget build(BuildContext context) {
    return AppResponsiveDialog(
      header: (
        Ionicons.ticket,
        context.translate.enterCoupon,
        context.translate.enterCouponDescription,
      ),
      primaryButton: AppPrimaryButton(
        isDisabled: couponCode == null || couponCode!.isEmpty || isLoading,
        child: Text(
          context.translate.apply,
        ),
        onPressed: () async {
          setState(() => isLoading = true);
          final calculateFareResponse = await locator<OrderRepository>().calculateFare(
            args: widget.calculateFareArgs.copyWith(
              couponCode: couponCode,
            ),
          );

          switch (calculateFareResponse) {
            case ApiResponseLoaded<Query$CalculateFare>():
              Navigator.of(context).pop(couponCode);
              showDialog(
                context: context,
                useSafeArea: false,
                builder: (context) {
                  return const CouponAppliedDialog();
                },
              );
            case ApiResponseError(:final message):
              setState(
                () {
                  errorText = message;
                  isLoading = false;
                },
              );
            case _:
          }
        },
      ),
      secondaryButton: CupertinoButton(
        child: Text(context.translate.cancel),
        onPressed: () {
          context.router.maybePop();
        },
      ),
      type: context.responsive(
        DialogType.bottomSheet,
        xl: DialogType.dialog,
      ),
      child: Column(
        children: [
          TextField(
            onChanged: (value) => setState(() => couponCode = value),
            decoration: InputDecoration(
              prefixIcon: const Icon(Ionicons.ticket),
              hintText: context.translate.enterCouponCode,
            ),
          )
        ],
      ),
    );
  }
}
