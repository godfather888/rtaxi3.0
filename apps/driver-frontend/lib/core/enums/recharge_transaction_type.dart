import 'package:driver_flutter/core/graphql/schema.gql.dart';
import 'package:flutter/material.dart';
import 'package:ionicons/ionicons.dart';
import 'package:driver_flutter/core/extensions/extensions.dart';

extension WalletRechargeTransactionTypeX on Enum$DriverRechargeTransactionType {
  IconData get icon {
    switch (this) {
      case Enum$DriverRechargeTransactionType.OrderFee:
        return Ionicons.cash;
      case Enum$DriverRechargeTransactionType.BankTransfer:
        return Ionicons.card;
      case Enum$DriverRechargeTransactionType.InAppPayment:
        return Ionicons.card;
      case Enum$DriverRechargeTransactionType.Gift:
        return Ionicons.gift;
      case Enum$DriverRechargeTransactionType.$unknown:
        return Ionicons.information;
    }
  }

  String getTitle(BuildContext context) {
    switch (this) {
      case Enum$DriverRechargeTransactionType.BankTransfer:
        return context.translate.bankTransfer;
      case Enum$DriverRechargeTransactionType.Gift:
        return context.translate.gift;
      case Enum$DriverRechargeTransactionType.InAppPayment:
        return context.translate.inappPayment;
      case Enum$DriverRechargeTransactionType.OrderFee:
        return context.translate.orderFee;
      case Enum$DriverRechargeTransactionType.$unknown:
        return context.translate.unknown;
    }
  }
}
