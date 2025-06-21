import 'package:driver_flutter/core/graphql/fragments/media.extentions.dart';
import 'package:driver_flutter/core/graphql/fragments/payment_gateway.fragment.graphql.dart';
import 'package:driver_flutter/core/graphql/schema.gql.dart';
import 'package:image_faker/image_faker.dart';

final mockPaymentGateway1 = Fragment$PaymentGateway(
  id: '1',
  title: 'PayPal',
  type: Enum$PaymentGatewayType.PayPal,
  linkMethod: Enum$GatewayLinkMethod.manual,
  media: ImageFaker().paymentGateway.paypal.toMedia,
);

final mockPaymentGateway2 = Fragment$PaymentGateway(
  id: '2',
  title: 'Stripe',
  type: Enum$PaymentGatewayType.PayPal,
  linkMethod: Enum$GatewayLinkMethod.redirect,
  media: ImageFaker().paymentGateway.stripe.toMedia,
);

final mockPaymentGateways = [
  mockPaymentGateway1,
  mockPaymentGateway2,
];
