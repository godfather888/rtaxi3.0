import '../enums/gateway_link_method.dart';
import 'payment_method_union.dart';

class PaymentGatewayEntity {
  final String id;
  final String name;
  final String? logoUrl;
  final GatewayLinkMethod linkMethod;

  const PaymentGatewayEntity({required this.id, required this.name, this.logoUrl, required this.linkMethod});
  Map<String, dynamic> toJson() => {'id': id, 'name': name, 'logoUrl': logoUrl, 'linkMethod': linkMethod.name};
  @override
  String toString() {
    return 'PaymentGatewayEntity(id: $id, name: $name, logoUrl: $logoUrl, linkMethod: $linkMethod)';
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    if (other.runtimeType != runtimeType) return false;
    final PaymentGatewayEntity otherEntity = other as PaymentGatewayEntity;
    return id == otherEntity.id &&
        name == otherEntity.name &&
        logoUrl == otherEntity.logoUrl &&
        linkMethod == otherEntity.linkMethod;
  }

  @override
  int get hashCode => Object.hash(id, name, logoUrl, linkMethod);
  factory PaymentGatewayEntity.fromJson(Map<String, dynamic> json) => PaymentGatewayEntity(
    id: json['id'] as String,
    name: json['name'] as String,
    logoUrl: json['logoUrl'] as String?,
    linkMethod: GatewayLinkMethod.values.firstWhere((e) => e.name == json['linkMethod'] as String),
  );

  PaymentMethodUnion get toPaymentMethodUnion => PaymentGateway(paymentGateway: this);
}

extension PaymentGatewayRecordX on List<PaymentGatewayEntity> {
  List<PaymentMethodUnion> get toPaymentMethodUnion => map((e) => e.toPaymentMethodUnion).toList();
}
