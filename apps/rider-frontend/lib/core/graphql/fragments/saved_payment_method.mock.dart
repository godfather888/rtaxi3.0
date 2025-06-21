import 'package:rider_flutter/core/graphql/fragments/saved_payment_method.fragment.graphql.dart';
import 'package:rider_flutter/core/graphql/schema.gql.dart';
import 'package:time/time.dart';

final mockSavedPaymentMethod1 = Fragment$SavedPaymentMethod(
  id: '1',
  isEnabled: true,
  isDefault: true,
  title: 'Visa **** 1234',
  expiryDate: 18.days.fromNow,
  holderName: 'John Doe',
  lastFour: '1234',
  providerBrand: Enum$ProviderBrand.Visa,
);

final mockSavedPaymentMethod2 = Fragment$SavedPaymentMethod(
  id: '2',
  isEnabled: true,
  isDefault: false,
  title: 'MasterCard **** 5678',
  expiryDate: 365.days.fromNow,
  holderName: 'Alice Smith',
  lastFour: '5678',
  providerBrand: Enum$ProviderBrand.Mastercard,
);

final mockSavedPaymentMethod3 = Fragment$SavedPaymentMethod(
  id: '3',
  isEnabled: false,
  isDefault: false,
  title: 'PayPal john.doe@example.com',
  expiryDate: null,
  holderName: 'John Doe',
  lastFour: '',
  providerBrand: Enum$ProviderBrand.EftPosAu,
);

final mockSavedPaymentMethods = [
  mockSavedPaymentMethod1,
  mockSavedPaymentMethod2,
  mockSavedPaymentMethod3,
];
