import 'package:flutter/material.dart';
import 'package:ionicons/ionicons.dart';
import 'package:rider_flutter/core/extensions/extensions.dart';
import 'package:rider_flutter/core/graphql/schema.gql.dart';

extension WalletDeductTransactionTypeX on Enum$RiderDeductTransactionType {
  IconData? get icon {
    switch (this) {
      case Enum$RiderDeductTransactionType.OrderFee:
        return Ionicons.car;
      case Enum$RiderDeductTransactionType.ParkingFee:
        return Ionicons.car;
      case Enum$RiderDeductTransactionType.CancellationFee:
        return Ionicons.close;
      case Enum$RiderDeductTransactionType.Withdraw:
        return Ionicons.cash;
      case Enum$RiderDeductTransactionType.Correction:
        return Ionicons.information;
      case _:
        return null;
    }
  }

  String getTitle(BuildContext context) {
    switch (this) {
      case Enum$RiderDeductTransactionType.OrderFee:
        return context.translate.orderFee;
      case Enum$RiderDeductTransactionType.ParkingFee:
        return context.translate.parkingFee;
      case Enum$RiderDeductTransactionType.CancellationFee:
        return context.translate.cancellationFee;
      case Enum$RiderDeductTransactionType.Withdraw:
        return context.translate.withdraw;
      case Enum$RiderDeductTransactionType.Correction:
        return context.translate.correction;
      case Enum$RiderDeductTransactionType.$unknown:
        return context.translate.unknown;
    }
  }
}
