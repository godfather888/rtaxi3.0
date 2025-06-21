import 'package:driver_flutter/core/graphql/fragments/payout_account.fragment.graphql.dart';

final mockPayoutAccount1 = Fragment$PayoutAccount(
  id: '1',
  isDefault: true,
  accountHolderAddress: '123 Main St',
  accountHolderCity: 'New York',
  accountHolderCountry: 'US',
  accountHolderDateOfBirth: DateTime(1990, 5, 12),
  accountHolderName: 'John Doe',
  accountHolderPhone: '+12065550123',
  accountHolderState: 'NY',
  accountHolderZip: '10001',
  accountNumber: '1234567890',
  bankName: 'Bank of America',
  name: 'Primary Payout',
  routingNumber: '021000322',
);

final mockPayoutAccount2 = Fragment$PayoutAccount(
  id: '2',
  isDefault: false,
  accountHolderAddress: '456 Elm Street',
  accountHolderCity: 'Los Angeles',
  accountHolderCountry: 'US',
  accountHolderDateOfBirth: DateTime(1985, 8, 24),
  accountHolderName: 'Jane Smith',
  accountHolderPhone: '+12065550456',
  accountHolderState: 'CA',
  accountHolderZip: '90001',
  accountNumber: '9876543210',
  bankName: 'Chase Bank',
  name: 'Secondary Payout',
  routingNumber: '122100024',
);

final mockPayoutAccount3 = Fragment$PayoutAccount(
  id: '3',
  isDefault: false,
  accountHolderAddress: '789 Oak Ave',
  accountHolderCity: 'Chicago',
  accountHolderCountry: 'US',
  accountHolderDateOfBirth: DateTime(1992, 3, 17),
  accountHolderName: 'Mike Johnson',
  accountHolderPhone: '+12065550789',
  accountHolderState: 'IL',
  accountHolderZip: '60601',
  accountNumber: '1122334455',
  bankName: 'Wells Fargo',
  name: 'Tertiary Payout',
  routingNumber: '071101307',
);

final mockPayoutAccounts = [
  mockPayoutAccount1,
  mockPayoutAccount2,
  mockPayoutAccount3,
];
