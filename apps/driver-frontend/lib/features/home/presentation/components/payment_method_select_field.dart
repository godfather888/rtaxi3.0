import 'package:driver_flutter/core/enums/payment_mode.prod.dart';
import 'package:driver_flutter/core/graphql/fragments/current_order.extentions.dart';
import 'package:driver_flutter/core/graphql/fragments/current_order.fragment.graphql.dart';
import 'package:driver_flutter/core/graphql/schema.gql.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_common/core/color_palette/color_palette.dart';
import 'package:driver_flutter/core/extensions/extensions.dart';
import 'package:flutter_common/core/enums/payment_mode.dart';
import 'package:ionicons/ionicons.dart';

class PaymentMethodSelectField extends StatelessWidget {
  final Fragment$CurrentOrder order;
  final Function()? onPressed;

  const PaymentMethodSelectField({
    super.key,
    required this.order,
    required this.onPressed,
  });

  @override
  Widget build(BuildContext context) {
    return CupertinoButton(
      padding: EdgeInsets.zero,
      onPressed: onPressed,
      minimumSize: Size(0, 0),
      child: Container(
        padding: const EdgeInsets.all(8),
        decoration: BoxDecoration(
          color: backgroundColor,
          border: Border.all(
            color: borderColor,
          ),
          borderRadius: BorderRadius.circular(8),
        ),
        child: Row(
          children: [
            icon(context),
            const SizedBox(width: 8),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    order.paymentMode?.toEntity == PaymentMode.cash ? context.translate.cash : context.translate.online,
                    style: context.labelMedium,
                  ),
                  Text(
                    order.isPaid ? context.translate.rideFeePaid : context.translate.rideFeeUnpaid,
                    style: context.bodySmall?.copyWith(
                      color: order.isPaid ? ColorPalette.tertiary40 : ColorPalette.error40,
                    ),
                  ),
                ],
              ),
            ),
            Text(
              order.total.formatCurrency(order.currency),
              style: context.labelMedium?.copyWith(color: ColorPalette.primary50),
            )
          ],
        ),
      ),
    );
  }

  Color get borderColor => ColorPalette.primary95;
  Color get backgroundColor => Colors.transparent;

  Color get textColor => ColorPalette.neutral10;

  Color get chevronColor => ColorPalette.neutral70;

  Color get iconColor => ColorPalette.primary30;

  Widget icon(BuildContext context) => order.paymentMode == Enum$PaymentMode.Cash
      ? Icon(
          Ionicons.cash,
          color: iconColor,
        )
      : Icon(
          Ionicons.card,
          color: iconColor,
        );
}
