import 'package:driver_flutter/core/graphql/fragments/order_request.fragment.graphql.dart';
import 'package:driver_flutter/core/graphql/fragments/payment_gateway.mock.dart';
import 'package:driver_flutter/core/graphql/fragments/point.mock.dart';
import 'package:driver_flutter/core/graphql/fragments/ride_option.mock.dart';
import 'package:driver_flutter/core/graphql/fragments/saved_payment_method.mock.dart';
import 'package:driver_flutter/core/graphql/fragments/service.mock.dart';
import 'package:driver_flutter/core/graphql/schema.gql.dart';

final mockOrderRequest1 = Fragment$OrderRequest(
  id: '1',
  status: Enum$OrderStatus.Booked,
  currency: 'USD',
  costBest: 23,
  addresses: [
    '123 Main St, Springfield',
    '456 Elm St, Springfield',
  ],
  providerShare: 23,
  distanceBest: 13,
  durationBest: 30,
  waitMinutes: 3,
  options: [
    mockRiderOption3,
    mockRiderOption1,
  ],
  points: [
    mockPoint1,
    mockPoint3,
  ],
  paymentGateway: mockPaymentGateway2,
  savedPaymentMethod: mockSavedPaymentMethod2,
  paymentMode: Enum$PaymentMode.PaymentGateway,
  directions: [
    mockPoint4,
    mockPoint2,
  ],
  service: mockService2,
);

final mockOrderRequest2 = Fragment$OrderRequest(
  id: '2',
  status: Enum$OrderStatus.Found,
  currency: 'USD',
  costBest: 45,
  addresses: [
    '789 Oak Ave, Metropolis',
    '101 Pine Rd, Metropolis',
  ],
  providerShare: 15,
  distanceBest: 25,
  durationBest: 50,
  waitMinutes: 5,
  options: [
    mockRiderOption2,
  ],
  points: [
    mockPoint2,
    mockPoint4,
  ],
  paymentGateway: mockPaymentGateway1,
  savedPaymentMethod: mockSavedPaymentMethod1,
  paymentMode: Enum$PaymentMode.Cash,
  directions: [
    mockPoint3,
    mockPoint1,
  ],
  service: mockService1,
);

final mockOrderRequest3 = Fragment$OrderRequest(
  id: '3',
  status: Enum$OrderStatus.Finished,
  currency: 'USD',
  costBest: 60,
  addresses: [
    '222 Maple St, Gotham',
    '333 Birch St, Gotham',
  ],
  providerShare: 18,
  distanceBest: 30,
  durationBest: 60,
  waitMinutes: 0,
  options: [
    mockRiderOption2,
  ],
  points: [
    mockPoint3,
    mockPoint1,
  ],
  paymentGateway: mockPaymentGateway2,
  savedPaymentMethod: mockSavedPaymentMethod3,
  paymentMode: Enum$PaymentMode.SavedPaymentMethod,
  directions: [
    mockPoint1,
    mockPoint4,
  ],
  service: mockService2,
);

final mockOrderRequests = [
  mockOrderRequest1,
  mockOrderRequest2,
  mockOrderRequest3,
];
