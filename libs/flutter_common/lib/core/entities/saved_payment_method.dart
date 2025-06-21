import '../../gen/assets.gen.dart';
import '../enums/card_type.dart';
import 'payment_method_union.dart';

class SavedPaymentMethodEntity {
  final String id;
  final CardType cardType;
  final String last4Digits;
  final String cardHolderName;
  final String expiryDate;
  final bool isDefault;
  final bool isEnabled;
  const SavedPaymentMethodEntity({
    required this.id,
    required this.cardType,
    required this.last4Digits,
    required this.cardHolderName,
    required this.expiryDate,
    required this.isDefault,
    required this.isEnabled,
  });

  factory SavedPaymentMethodEntity.fromJson(Map<String, dynamic> json) => SavedPaymentMethodEntity(
    id: json['id'] as String,
    cardType: CardType.values.firstWhere((e) => e.name == json['cardType'] as String, orElse: () => CardType.unknown),
    last4Digits: json['last4Digits'] as String,
    cardHolderName: json['cardHolderName'] as String,
    expiryDate: json['expiryDate'] as String,
    isDefault: json['isDefault'] as bool? ?? false,
    isEnabled: json['isEnabled'] as bool? ?? true,
  );
  Map<String, dynamic> toJson() => {
    'id': id,
    'cardType': cardType.name,
    'last4Digits': last4Digits,
    'cardHolderName': cardHolderName,
    'expiryDate': expiryDate,
    'isDefault': isDefault,
    'isEnabled': isEnabled,
  };
  @override
  String toString() {
    return 'SavedPaymentMethodEntity(id: $id, cardType: $cardType, last4Digits: $last4Digits, cardHolderName: $cardHolderName, expiryDate: $expiryDate, isDefault: $isDefault, isEnabled: $isEnabled)';
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    if (other.runtimeType != runtimeType) return false;
    final SavedPaymentMethodEntity otherEntity = other as SavedPaymentMethodEntity;
    return id == otherEntity.id &&
        cardType == otherEntity.cardType &&
        last4Digits == otherEntity.last4Digits &&
        cardHolderName == otherEntity.cardHolderName &&
        expiryDate == otherEntity.expiryDate &&
        isDefault == otherEntity.isDefault &&
        isEnabled == otherEntity.isEnabled;
  }

  AssetGenImage get cardImage {
    switch (cardType) {
      case CardType.visa:
        return Assets.images.cardBackground2;
      case CardType.mastercard:
        return Assets.images.cardBackground3;
      case CardType.amex:
        return Assets.images.cardBackground4;
      default:
        return Assets.images.cardBackground1;
    }
  }

  PaymentMethodUnion get toPaymentMethodUnion => SavedPaymentMethod(savedPaymentMethod: this);
}

extension SavedPaymentMethodRecordX on List<SavedPaymentMethodEntity> {
  List<PaymentMethodUnion> get toPaymentMethodUnion => map((e) => e.toPaymentMethodUnion).toList();
}
