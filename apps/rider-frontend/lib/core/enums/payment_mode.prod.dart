import 'package:flutter_common/core/entities/payment_method_union.dart';
import 'package:rider_flutter/core/graphql/schema.gql.dart';
import 'package:flutter_common/core/enums/payment_mode.dart';

extension PaymentModeGqlX on Enum$PaymentMode {
  PaymentMode get toEntity {
    switch (this) {
      case Enum$PaymentMode.Cash:
        return PaymentMode.cash;
      case Enum$PaymentMode.PaymentGateway:
        return PaymentMode.paymentGateway;
      case Enum$PaymentMode.SavedPaymentMethod:
        return PaymentMode.savedPaymentMethod;
      case Enum$PaymentMode.Wallet:
        return PaymentMode.wallet;
      case Enum$PaymentMode.$unknown:
        throw Exception('Unknown PaymentMode state');
    }
  }
}

extension PaymentMethodX on PaymentMethodUnion {
  Enum$PaymentMode get toEntity {
    switch (this) {
      case PaymentGateway():
        return Enum$PaymentMode.PaymentGateway;
      case SavedPaymentMethod():
        return Enum$PaymentMode.SavedPaymentMethod;
      case PaymentMethod$Cash():
        return Enum$PaymentMode.Cash;
      case PaymentMethod$Wallet():
        return Enum$PaymentMode.Wallet;
    }
  }
}

extension PaymentModeProdX on PaymentMode {
  Enum$PaymentMode get toGql {
    switch (this) {
      case PaymentMode.paymentGateway:
        return Enum$PaymentMode.PaymentGateway;
      case PaymentMode.savedPaymentMethod:
        return Enum$PaymentMode.SavedPaymentMethod;
      case PaymentMode.cash:
        return Enum$PaymentMode.Cash;
      case PaymentMode.wallet:
        return Enum$PaymentMode.Wallet;
    }
  }
}
