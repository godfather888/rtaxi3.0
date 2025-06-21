import 'package:driver_flutter/core/enums/gateway_link_method.prod.dart';
import 'package:driver_flutter/core/graphql/fragments/payment_gateway.fragment.graphql.dart';
import 'package:flutter_common/core/entities/payment_gateway.dart';

extension PaymentGatewayProdX on Fragment$PaymentGateway {
  PaymentGatewayEntity get toEntity => PaymentGatewayEntity(
        id: id,
        name: title,
        logoUrl: media?.address,
        linkMethod: linkMethod.toEntity,
      );
}

extension PaymentGatewaysProdX on List<Fragment$PaymentGateway> {
  List<PaymentGatewayEntity> get toEntity => map((e) => e.toEntity).toList();
}
