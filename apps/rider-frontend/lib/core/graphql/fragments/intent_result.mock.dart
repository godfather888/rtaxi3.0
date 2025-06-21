import 'package:rider_flutter/core/graphql/fragments/intent_result.fragment.graphql.dart';
import 'package:rider_flutter/core/graphql/schema.gql.dart';

final mockIntentResult1 = Fragment$IntentResult(
  status: Enum$TopUpWalletStatus.Failed,
  error: 'Payment declined due to insufficient funds',
  url: '',
);

final mockIntentResult2 = Fragment$IntentResult(
  status: Enum$TopUpWalletStatus.OK,
);

final mockIntentResult3 = Fragment$IntentResult(
  status: Enum$TopUpWalletStatus.Redirect,
  url: 'https://google.com',
);

final mockmockIntentResults = [
  mockIntentResult1,
  mockIntentResult2,
  mockIntentResult3,
];
