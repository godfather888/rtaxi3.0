import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter_common/core/extensions/extensions.dart';
import 'package:ionicons/ionicons.dart';

import '../enums/payment_mode.dart';
import 'payment_gateway.dart';
import 'saved_payment_method.dart';

sealed class PaymentMethodUnion {
  const PaymentMethodUnion();

  factory PaymentMethodUnion.fromJson(Map<String, dynamic> json) {
    final type = json['type'];
    switch (type) {
      case 'paymentGateway':
        return PaymentGateway(paymentGateway: PaymentGatewayEntity.fromJson(json['paymentGateway']));
      case 'savedPaymentMethod':
        return SavedPaymentMethod(savedPaymentMethod: SavedPaymentMethodEntity.fromJson(json['savedPaymentMethod']));
      case 'cash':
        return PaymentMethod$Cash();
      case 'wallet':
        return PaymentMethod$Wallet();
      default:
        throw UnsupportedError('Unknown PaymentMethodUnion type: $type');
    }
  }

  Map<String, dynamic> toJson();
}

class PaymentGateway extends PaymentMethodUnion {
  final PaymentGatewayEntity paymentGateway;
  const PaymentGateway({required this.paymentGateway});

  @override
  Map<String, dynamic> toJson() => {'type': 'paymentGateway', 'paymentGateway': paymentGateway.toJson()};
}

class SavedPaymentMethod extends PaymentMethodUnion {
  final SavedPaymentMethodEntity savedPaymentMethod;
  const SavedPaymentMethod({required this.savedPaymentMethod});

  @override
  Map<String, dynamic> toJson() => {'type': 'savedPaymentMethod', 'savedPaymentMethod': savedPaymentMethod.toJson()};
}

class PaymentMethod$Cash extends PaymentMethodUnion {
  const PaymentMethod$Cash();

  @override
  Map<String, dynamic> toJson() => {'type': 'cash'};
}

class PaymentMethod$Wallet extends PaymentMethodUnion {
  const PaymentMethod$Wallet();

  @override
  Map<String, dynamic> toJson() => {'type': 'wallet'};
}

extension PaymentMethodUnionX on PaymentMethodUnion {
  Widget icon({Color? color}) {
    return switch (this) {
      PaymentGateway(paymentGateway: final gateway) =>
        gateway.logoUrl != null
            ? CachedNetworkImage(imageUrl: gateway.logoUrl!, width: 24, height: 24)
            : const SizedBox(),
      SavedPaymentMethod() => Icon(Ionicons.card, size: 24, color: color),
      PaymentMethod$Cash() => Icon(Ionicons.cash, size: 24, color: color),
      PaymentMethod$Wallet() => Icon(Ionicons.wallet, size: 24, color: color),
    };
  }

  String name(BuildContext context) {
    return switch (this) {
      PaymentGateway(paymentGateway: final gateway) => gateway.name,
      SavedPaymentMethod(savedPaymentMethod: final saved) => '**** **** **** ${saved.last4Digits}',
      PaymentMethod$Cash() => context.t.cash,
      PaymentMethod$Wallet() => context.t.wallet,
    };
  }

  PaymentMode get paymentMode => switch (this) {
    PaymentGateway() => PaymentMode.paymentGateway,
    SavedPaymentMethod() => PaymentMode.savedPaymentMethod,
    PaymentMethod$Cash() => PaymentMode.cash,
    PaymentMethod$Wallet() => PaymentMode.wallet,
  };

  String? get id {
    return switch (this) {
      PaymentGateway(paymentGateway: final gateway) => gateway.id,
      SavedPaymentMethod(savedPaymentMethod: final saved) => saved.id,
      PaymentMethod$Cash() => null,
      PaymentMethod$Wallet() => null,
    };
  }
}

extension PaymentMethodRecordX on (List<PaymentGatewayEntity>, List<SavedPaymentMethodEntity>) {
  List<PaymentMethodUnion> get toPaymentMethodUnion {
    final list = [...this.$1.toPaymentMethodUnion, ...this.$2.toPaymentMethodUnion];
    return list;
  }
}

extension PaymentMethodBuilderX on (PaymentMode?, PaymentGatewayEntity?, SavedPaymentMethodEntity?) {
  PaymentMethodUnion get toUnion {
    switch ($1) {
      case PaymentMode.paymentGateway:
        return PaymentGateway(paymentGateway: $2!);
      case PaymentMode.savedPaymentMethod:
        return SavedPaymentMethod(savedPaymentMethod: $3!);
      case PaymentMode.cash:
        return const PaymentMethod$Cash();
      case PaymentMode.wallet:
        return const PaymentMethod$Wallet();
      case null:
        if ($2 != null) {
          return PaymentGateway(paymentGateway: $2!);
        }
        if ($3 != null) {
          return SavedPaymentMethod(savedPaymentMethod: $3!);
        }
        return const PaymentMethod$Cash();
    }
  }
}
