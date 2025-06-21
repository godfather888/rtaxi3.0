import 'package:driver_flutter/core/graphql/fragments/media.extentions.dart';
import 'package:driver_flutter/core/graphql/fragments/payout_method.fragment.graphql.dart';
import 'package:driver_flutter/core/graphql/schema.gql.dart';
import 'package:image_faker/image_faker.dart';

final mockPayoutMethod1 = Fragment$PayoutMethod(
  id: '1',
  linkMethod: Enum$GatewayLinkMethod.manual,
  enabled: true,
  name: 'Chase Bank',
  type: Enum$PayoutMethodType.BankTransfer,
  media: ImageFaker().paymentGateway.stripe.toMedia,
);

final mockPayoutMethod2 = Fragment$PayoutMethod(
  id: '2',
  linkMethod: Enum$GatewayLinkMethod.redirect,
  enabled: false,
  name: 'PayPal',
  type: Enum$PayoutMethodType.Stripe,
  media: ImageFaker().paymentGateway.paypal.toMedia,
);

final mockPayoutMethod3 = Fragment$PayoutMethod(
  id: '3',
  linkMethod: Enum$GatewayLinkMethod.none,
  enabled: true,
  name: 'Stripe',
  type: Enum$PayoutMethodType.Stripe,
  media: ImageFaker().paymentGateway.stripe.toMedia,
);

final mockPayoutMethod4 = Fragment$PayoutMethod(
  id: '4',
  linkMethod: Enum$GatewayLinkMethod.redirect,
  enabled: true,
  name: 'Bank of America',
  type: Enum$PayoutMethodType.BankTransfer,
  media: ImageFaker().paymentGateway.stripe.toMedia,
);

final mockPayoutMethod5 = Fragment$PayoutMethod(
  id: '5',
  linkMethod: Enum$GatewayLinkMethod.manual,
  enabled: true,
  name: 'Wise',
  type: Enum$PayoutMethodType.BankTransfer,
  media: ImageFaker().paymentGateway.stripe.toMedia,
);
