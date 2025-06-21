import 'package:rider_flutter/core/graphql/fragments/rider_transaction.fragment.graphql.dart';
import 'package:rider_flutter/core/graphql/schema.gql.dart';
import 'package:time/time.dart';

final mockRiderTransaction1 = Fragment$RiderTransaction(
  id: '1',
  amount: 23,
  currency: 'USD',
  createdAt: 12.days.ago,
  deductType: Enum$RiderDeductTransactionType.CancellationFee,
  rechargeType: Enum$RiderRechargeTransactionType.BankTransfer,
);

final mockRiderTransaction2 = Fragment$RiderTransaction(
  id: '2',
  amount: 50,
  currency: 'USD',
  createdAt: 8.days.ago,
  deductType: Enum$RiderDeductTransactionType.Correction,
  rechargeType: Enum$RiderRechargeTransactionType.Correction,
);

final mockRiderTransaction3 = Fragment$RiderTransaction(
  id: '3',
  amount: 15,
  currency: 'USD',
  createdAt: 5.days.ago,
  deductType: Enum$RiderDeductTransactionType.OrderFee,
  rechargeType: Enum$RiderRechargeTransactionType.Gift,
);

final mockRiderTransaction4 = Fragment$RiderTransaction(
  id: '4',
  amount: 100,
  currency: 'USD',
  createdAt: 2.days.ago,
  deductType: Enum$RiderDeductTransactionType.ParkingFee,
  rechargeType: Enum$RiderRechargeTransactionType.InAppPayment,
);

final mockRiderTransaction5 = Fragment$RiderTransaction(
  id: '5',
  amount: 30,
  currency: 'USD',
  createdAt: 1.days.ago,
  deductType: Enum$RiderDeductTransactionType.Withdraw,
  rechargeType: Enum$RiderRechargeTransactionType.BankTransfer,
);

final mockRiderTransactions = [
  mockRiderTransaction1,
  mockRiderTransaction2,
  mockRiderTransaction3,
  mockRiderTransaction4,
  mockRiderTransaction5,
];
