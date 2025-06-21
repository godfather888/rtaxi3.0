import 'package:flutter_common/core/enums/gateway_link_method.dart';
import 'package:rider_flutter/core/graphql/fragments/payment_gateway.fragment.graphql.dart';
import 'package:flutter_common/core/entities/payment_gateway.dart';
import 'package:rider_flutter/core/graphql/schema.gql.dart';

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

extension GatewayLinkMethodGqlX on Enum$GatewayLinkMethod {
  GatewayLinkMethod get toEntity => switch (this) {
        Enum$GatewayLinkMethod.none => GatewayLinkMethod.none,
        Enum$GatewayLinkMethod.redirect => GatewayLinkMethod.redirect,
        Enum$GatewayLinkMethod.manual => GatewayLinkMethod.manual,
        Enum$GatewayLinkMethod.$unknown => throw Exception('unsupported'),
      };
}
