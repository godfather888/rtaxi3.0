import 'package:rider_flutter/core/graphql/fragments/payment_gateway.fragment.graphql.dart';
import 'package:rider_flutter/core/graphql/schema.gql.dart';

final mockPaymentGateway1 = Fragment$PaymentGateway(
  id: '1',
  title: 'Binance Pay',
  type: Enum$PaymentGatewayType.BinancePay,
  linkMethod: Enum$GatewayLinkMethod.manual,
);

final mockPaymentGateway2 = Fragment$PaymentGateway(
  id: '2',
  title: 'PayPal',
  type: Enum$PaymentGatewayType.PayPal,
  linkMethod: Enum$GatewayLinkMethod.redirect,
);

final mockPaymentGateway3 = Fragment$PaymentGateway(
  id: '3',
  title: 'Stripe',
  type: Enum$PaymentGatewayType.Stripe,
  linkMethod: Enum$GatewayLinkMethod.none,
);

final mockPaymentGateway4 = Fragment$PaymentGateway(
  id: '4',
  title: 'Mips',
  type: Enum$PaymentGatewayType.MIPS,
  linkMethod: Enum$GatewayLinkMethod.manual,
);

final mockPaymentGateways = [
  mockPaymentGateway1,
  mockPaymentGateway2,
  mockPaymentGateway3,
  mockPaymentGateway4,
];
