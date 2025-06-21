import 'package:driver_flutter/core/graphql/fragments/intent_result.fragment.graphql.dart';
import 'package:driver_flutter/core/graphql/schema.gql.dart';

final mockIntentResult1 = Fragment$IntentResult(
  status: Enum$TopUpWalletStatus.Failed,
  error: 'Insufficient funds',
  url: 'https://paymentgateway.com/redirect/12345',
);

final mockIntentResult2 = Fragment$IntentResult(
  status: Enum$TopUpWalletStatus.OK,
  error: 'Insufficient funds',
  url: 'https://paymentgateway.com/redirect/12345',
);

final mockIntentResult3 = Fragment$IntentResult(
  status: Enum$TopUpWalletStatus.Redirect,
  error: 'Insufficient funds',
  url: 'https://paymentgateway.com/redirect/67890',
);

final mockIntentResults = [
  mockIntentResult1,
  mockIntentResult2,
  mockIntentResult3,
];
