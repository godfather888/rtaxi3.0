import 'package:driver_flutter/core/graphql/schema.gql.dart';
import 'package:flutter/material.dart';
import 'package:ionicons/ionicons.dart';
import 'package:driver_flutter/core/extensions/extensions.dart';

extension WalletDeductTransactionTypeX on Enum$DriverDeductTransactionType {
  IconData get icon {
    switch (this) {
      case Enum$DriverDeductTransactionType.Withdraw:
        return Ionicons.car;
      case Enum$DriverDeductTransactionType.Commission:
        return Ionicons.car;
      case Enum$DriverDeductTransactionType.Correction:
        return Ionicons.information;
      case Enum$DriverDeductTransactionType.$unknown:
        return Ionicons.information;
    }
  }

  String getTitle(BuildContext context) {
    switch (this) {
      case Enum$DriverDeductTransactionType.Withdraw:
        return context.translate.withdraw;
      case Enum$DriverDeductTransactionType.Commission:
        return context.translate.commission;
      case Enum$DriverDeductTransactionType.Correction:
        return context.translate.correction;
      case Enum$DriverDeductTransactionType.$unknown:
        return context.translate.unknown;
    }
  }
}
