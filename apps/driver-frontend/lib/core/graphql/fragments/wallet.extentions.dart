import 'package:driver_flutter/core/graphql/documents/wallet.graphql.dart';
import 'package:driver_flutter/core/graphql/fragments/wallet.fragment.graphql.dart';
import 'package:driver_flutter/core/enums/deduct_transaction_type.dart';
import 'package:driver_flutter/core/enums/recharge_transaction_type.dart';
import 'package:flutter/material.dart';
import 'package:flutter_common/core/entities/wallet.dart';
import 'package:flutter_common/core/extensions/extensions.dart';
import 'package:intl/intl.dart';

extension WalletX on Fragment$Wallet {
  WalletEntity get toEntity => WalletEntity(
        balance: balance,
        currency: currency,
      );
}

extension WalletTransActionX on Query$Wallet$driverTransacions$edges$node {
  String get formattedPrice => NumberFormat.simpleCurrency(name: currency).format(amount);
  String get formattedDatetime => createdAt.formatDateTime;
  String get formattedTime => createdAt.formatTime;
  IconData get icon => deductType?.icon ?? rechargeType!.icon;
  String title(BuildContext context) => deductType?.getTitle(context) ?? rechargeType!.getTitle(context);
}
