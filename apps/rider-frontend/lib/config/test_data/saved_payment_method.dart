import 'package:flutter_common/core/entities/saved_payment_method.dart';
import 'package:flutter_common/core/enums/card_type.dart';

extension SavePaymentMethodTestData on SavedPaymentMethodEntity {
  static List<SavedPaymentMethodEntity> paymentMethods = [
    SavedPaymentMethodEntity(
      id: "1",
      cardType: CardType.visa,
      last4Digits: "4242",
      cardHolderName: "John Doe",
      expiryDate: '08/29',
      isEnabled: true,
      isDefault: true,
    ),
    SavedPaymentMethodEntity(
      id: "2",
      cardType: CardType.mastercard,
      last4Digits: "1234",
      cardHolderName: "Jane Smith",
      expiryDate: '08/29',
      isEnabled: true,
      isDefault: false,
    ),
    SavedPaymentMethodEntity(
      id: "3",
      cardType: CardType.mastercard,
      last4Digits: "5678",
      cardHolderName: "Alex Johnson",
      expiryDate: '08/29',
      isEnabled: true,
      isDefault: false,
    ),
    SavedPaymentMethodEntity(
      id: "4",
      cardType: CardType.visa,
      last4Digits: "9876",
      cardHolderName: "Emily Davis",
      expiryDate: '08/29',
      isEnabled: true,
      isDefault: true,
    )
  ];
}
