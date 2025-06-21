import 'package:image_faker/image_faker.dart';
import 'package:rider_flutter/core/graphql/fragments/favorite_driver.mock.dart';
import 'package:rider_flutter/core/graphql/fragments/media.extentions.dart';
import 'package:rider_flutter/core/graphql/fragments/past_order.fragment.graphql.dart';
import 'package:rider_flutter/core/graphql/fragments/payment_gateway.mock.dart';
import 'package:rider_flutter/core/graphql/fragments/point.mock.dart';
import 'package:rider_flutter/core/graphql/fragments/ride_option.mock.dart';
import 'package:rider_flutter/core/graphql/fragments/saved_payment_method.mock.dart';
import 'package:rider_flutter/core/graphql/schema.gql.dart';
import 'package:time/time.dart';

final mockPastOrder1 = Fragment$PastOrder(
  id: '1',
  createdOn: 5.days.ago,
  expectedTimestamp: 2.days.fromNow,
  distanceBest: 12,
  durationBest: 25,
  costAfterCoupon: 48000,
  currency: 'USD',
  waitMinutes: 5,
  addresses: [
    mockAddress1,
    mockAddress2,
  ],
  points: [
    mockPoint1,
    mockPoint2,
  ],
  options: [
    moclRiderOption1,
    moclRiderOption2,
  ],
  driver: mockFavoriteDriver1,
  finishTimestamp: 30.days.fromNow,
  paymentGateway: mockPaymentGateway1,
  savedPaymentMethod: mockSavedPaymentMethod1,
  paymentMode: Enum$PaymentMode.Cash,
  service: Fragment$PastOrder$service(
    name: 'Airport',
    media: ImageFaker().taxiService.carWhite.toMedia,
  ),
  startTimestamp: 6.days.ago,
);

final mockPastOrder2 = Fragment$PastOrder(
  id: '2',
  createdOn: 2.days.ago,
  expectedTimestamp: 1.days.fromNow,
  distanceBest: 21,
  durationBest: 52,
  costAfterCoupon: 49,
  currency: 'USD',
  addresses: [
    mockAddress3,
    mockAddress4,
  ],
  points: [
    mockPoint3,
    mockPoint4,
  ],
  waitMinutes: 3,
  options: [
    moclRiderOption3,
    moclRiderOption4,
  ],
  driver: mockFavoriteDriver2,
  finishTimestamp: 30.days.fromNow,
  paymentGateway: mockPaymentGateway2,
  savedPaymentMethod: mockSavedPaymentMethod2,
  paymentMode: Enum$PaymentMode.SavedPaymentMethod,
  startTimestamp: 3.days.ago,
);

final mockPastOrders = [
  mockPastOrder1,
  mockPastOrder2,
];
