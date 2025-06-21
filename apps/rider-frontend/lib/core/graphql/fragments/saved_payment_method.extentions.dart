import 'package:flutter_common/core/entities/saved_payment_method.dart';
import 'package:flutter_common/core/enums/card_type.dart';
import 'package:rider_flutter/core/enums/card_type.prod.dart';
import 'package:rider_flutter/core/graphql/fragments/saved_payment_method.fragment.graphql.dart';

extension SavedPaymentMethodX on Fragment$SavedPaymentMethod {
  SavedPaymentMethodEntity get toEntity => SavedPaymentMethodEntity(
        id: id,
        cardHolderName: holderName ?? '-',
        last4Digits: lastFour ?? title,
        cardType: providerBrand?.toEntity ?? CardType.unknown,
        expiryDate: "${expiryDate?.month.toString().padLeft(2, '0')}/${expiryDate?.year.toString().substring(2)}",
        isEnabled: isEnabled,
        isDefault: isDefault,
      );
}

extension SavedPaymentMethodsProdX on List<Fragment$SavedPaymentMethod> {
  List<SavedPaymentMethodEntity> get toEntity => map((e) => e.toEntity).toList();
}
