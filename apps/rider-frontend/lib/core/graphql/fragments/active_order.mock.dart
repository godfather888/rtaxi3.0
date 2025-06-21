import 'package:rider_flutter/core/graphql/fragments/active_order.fragment.graphql.dart';
import 'package:rider_flutter/core/graphql/fragments/chat_message.mock.dart';
import 'package:rider_flutter/core/graphql/fragments/favorite_driver.mock.dart';
import 'package:rider_flutter/core/graphql/fragments/point.mock.dart';
import 'package:rider_flutter/core/graphql/fragments/ride_option.mock.dart';
import 'package:rider_flutter/core/graphql/schema.gql.dart';
import 'package:time/time.dart';

final mockCurrentOrder1 = Fragment$CurrentOrder(
  type: Enum$TaxiOrderType.Ride,
  shopCarts: [],
  id: '1',
  createdOn: 4.days.ago,
  expectedTimestamp: 2.hours.fromNow,
  riderLastSeenMessagesAt: 1.hours.ago,
  distanceBest: 12,
  durationBest: 25,
  status: Enum$OrderStatus.Started,
  destinationArrivedTo: 30,
  paidAmount: 50000,
  costAfterCoupon: 48000,
  costBest: 49000,
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
  conversation: [
    mockChatMessage1,
    mockChatMessage2,
  ],
  driver: mockFavoriteDriver1,
);

final mockActiveOrder1 = Fragment$ActiveOrder(
  order: mockCurrentOrder1,
  driverLocation: mockPoint2,
);
