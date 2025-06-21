import 'package:driver_flutter/core/graphql/fragments/driver_transactions.fragment.graphql.dart';
import 'package:driver_flutter/core/graphql/schema.gql.dart';
import 'package:time/time.dart';

final mockDriverTransaction1 = Fragment$DriverTransacion(
  id: '1',
  createdAt: 1.days.ago,
  action: Enum$TransactionAction.Deduct,
  amount: 45.75,
  currency: 'USD',
  driverId: "101",
  deductType: Enum$DriverDeductTransactionType.Commission,
  rechargeType: Enum$DriverRechargeTransactionType.BankTransfer,
  refrenceNumber: 'TXN123456',
);

final mockDriverTransaction2 = Fragment$DriverTransacion(
  id: '2',
  createdAt: 2.days.ago,
  action: Enum$TransactionAction.Recharge,
  amount: 150.00,
  currency: 'USD',
  driverId: "101",
  deductType: Enum$DriverDeductTransactionType.Correction,
  rechargeType: Enum$DriverRechargeTransactionType.Gift,
  refrenceNumber: 'TXN654321',
);

final mockDriverTransaction3 = Fragment$DriverTransacion(
  id: '3',
  createdAt: 5.hours.ago,
  action: Enum$TransactionAction.Deduct,
  amount: 10.25,
  currency: 'USD',
  driverId: "101",
  deductType: Enum$DriverDeductTransactionType.Withdraw,
  rechargeType: Enum$DriverRechargeTransactionType.InAppPayment,
  refrenceNumber: 'TXN998877',
);

final mockDriverTransaction4 = Fragment$DriverTransacion(
  id: '4',
  createdAt: DateTime.now(),
  action: Enum$TransactionAction.Recharge,
  amount: 75.00,
  currency: 'USD',
  driverId: "101",
  deductType: Enum$DriverDeductTransactionType.Commission,
  rechargeType: Enum$DriverRechargeTransactionType.OrderFee,
  refrenceNumber: 'TXN445566',
);

final mockDriverTransactions = [
  mockDriverTransaction1,
  mockDriverTransaction2,
  mockDriverTransaction3,
  mockDriverTransaction4,
];
