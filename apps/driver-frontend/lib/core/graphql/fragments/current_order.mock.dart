import 'package:driver_flutter/core/graphql/fragments/chat_message.mock.dart';
import 'package:driver_flutter/core/graphql/fragments/current_order.fragment.graphql.dart';
import 'package:driver_flutter/core/graphql/fragments/point.mock.dart';
import 'package:driver_flutter/core/graphql/fragments/ride_option.mock.dart';
import 'package:driver_flutter/core/graphql/fragments/rider.mock.dart';
import 'package:driver_flutter/core/graphql/fragments/service.mock.dart';
import 'package:driver_flutter/core/graphql/schema.gql.dart';
import 'package:time/time.dart';

final mockCurrentOrder1 = Fragment$CurrentOrder(
  id: '1',
  createdOn: 7.days.ago,
  expectedTimestamp: 90.minutes.fromNow,
  driverLastSeenMessagesAt: 15.minutes.ago,
  distanceBest: 12,
  durationBest: 23,
  status: Enum$OrderStatus.WaitingForPostPay,
  destinationArrivedTo: 45,
  paidAmount: 85,
  costAfterCoupon: 78,
  costBest: 92,
  currency: 'USD',
  waitMinutes: 8,
  addresses: [
    mockAddress1,
    mockAddress2,
  ],
  points: [
    mockPoint1,
    mockPoint2,
  ],
  options: [
    mockRiderOption1,
    mockRiderOption2,
  ],
  conversation: [
    mockChatMessage1,
    mockChatMessage2,
  ],
  providerShare: 25,
  rideOptionsCost: 15,
  serviceCost: 60,
  taxCost: 7,
  waitCost: 9,
  startTimestamp: 1.hours.ago,
  etaPickup: 30.minutes.ago,
  paymentMode: Enum$PaymentMode.Cash,
  service: mockService1,
  finishTimestamp: 10.minutes.fromNow,
  rider: mockRider1,
  directions: [
    mockPoint3,
    mockPoint4,
  ],
  driverDirections: [
    mockPoint1,
    mockPoint2,
  ],
);

final mockCurrentOrder2 = Fragment$CurrentOrder(
  id: '2',
  createdOn: 2.days.ago,
  expectedTimestamp: 1.hours.fromNow,
  driverLastSeenMessagesAt: 3.hours.ago,
  distanceBest: 34,
  durationBest: 48,
  status: Enum$OrderStatus.Finished,
  destinationArrivedTo: 61,
  paidAmount: 64,
  costAfterCoupon: 72,
  costBest: 58,
  currency: 'USD',
  waitMinutes: 7,
  addresses: [
    mockAddress3,
    mockAddress4,
  ],
  points: [
    mockPoint3,
    mockPoint4,
  ],
  options: [
    mockRiderOption3,
    mockRiderOption4,
  ],
  conversation: [
    mockChatMessage3,
    mockChatMessage4,
  ],
  providerShare: 22,
  rideOptionsCost: 18,
  serviceCost: 45,
  taxCost: 6,
  waitCost: 14,
  startTimestamp: 2.hours.ago,
  etaPickup: 1.5.hours.ago,
  paymentMode: Enum$PaymentMode.PaymentGateway,
  service: mockService2,
  finishTimestamp: DateTime.now(),
  rider: mockRider2,
  directions: [
    mockPoint1,
    mockPoint2,
  ],
  driverDirections: [
    mockPoint3,
    mockPoint4,
  ],
);

final mockCurrentOrders = [
  mockCurrentOrder1,
  mockCurrentOrder2,
];
