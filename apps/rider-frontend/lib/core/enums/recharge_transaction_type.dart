import 'package:flutter/material.dart';
import 'package:ionicons/ionicons.dart';
import 'package:rider_flutter/core/extensions/extensions.dart';
import 'package:rider_flutter/core/graphql/schema.gql.dart';
// import 'package:phosphor_flutter/phosphor_flutter.dart';

extension WalletRechargeTransactionTypeX on Enum$RiderRechargeTransactionType {
  IconData? get icon {
    switch (this) {
      case Enum$RiderRechargeTransactionType.BankTransfer:
        return Ionicons.business;
      case Enum$RiderRechargeTransactionType.Gift:
        return Ionicons.gift;
      case Enum$RiderRechargeTransactionType.Correction:
        return Ionicons.information;
      case Enum$RiderRechargeTransactionType.InAppPayment:
        return Ionicons.card;
      case Enum$RiderRechargeTransactionType.$unknown:
        return null;
    }
  }

  String getTitle(BuildContext context) {
    switch (this) {
      case Enum$RiderRechargeTransactionType.BankTransfer:
        return context.translate.bankTransfer;
      case Enum$RiderRechargeTransactionType.Gift:
        return context.translate.gift;
      case Enum$RiderRechargeTransactionType.Correction:
        return context.translate.correction;
      case Enum$RiderRechargeTransactionType.InAppPayment:
        return context.translate.inappPayment;
      case Enum$RiderRechargeTransactionType.$unknown:
        return context.translate.unknown;
    }
  }
}
