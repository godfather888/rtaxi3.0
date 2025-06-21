import 'package:driver_flutter/core/graphql/fragments/wallet.fragment.graphql.dart';

final mockWallet1 = Fragment$Wallet(
  balance: 45,
  currency: 'USD',
);

final mockWallet2 = Fragment$Wallet(
  balance: 78,
  currency: 'EUR',
);

final mockWallet3 = Fragment$Wallet(
  balance: 120,
  currency: 'GBP',
);

final mockWallet4 = Fragment$Wallet(
  balance: 5,
  currency: 'USD',
);

final mockWallet5 = Fragment$Wallet(
  balance: 99,
  currency: 'CAD',
);

final mockWallets = [
  mockWallet1,
  mockWallet2,
  mockWallet3,
  mockWallet4,
  mockWallet5,
];
