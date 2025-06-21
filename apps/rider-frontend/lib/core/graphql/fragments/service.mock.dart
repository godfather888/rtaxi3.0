import 'package:image_faker/image_faker.dart';
import 'package:rider_flutter/core/graphql/fragments/media.extentions.dart';
import 'package:rider_flutter/core/graphql/fragments/ride_option.mock.dart';
import 'package:rider_flutter/core/graphql/fragments/service.fragment.graphql.dart';
import 'package:rider_flutter/core/graphql/schema.gql.dart';

final mockService1 = Fragment$Service(
  id: '1',
  name: 'Airport',
  media: ImageFaker().taxiService.carWhite.toMedia,
  options: [
    moclRiderOption3,
    moclRiderOption4,
  ],
  prepayPercent: 32,
  paymentMethod: Enum$ServicePaymentMethod.CashCredit,
  cost: 67,
  cancellationTotalFee: 20,
  twoWayAvailable: true,
  costAfterCoupon: 0,
  description: 'Ride to or from the airport with luggage assistance',
  personCapacity: 4,
);

final mockService2 = Fragment$Service(
  id: '2',
  name: 'Economy',
  media: ImageFaker().taxiService.carWhite.toMedia,
  options: [
    moclRiderOption1,
    moclRiderOption2,
  ],
  prepayPercent: 0,
  paymentMethod: Enum$ServicePaymentMethod.OnlyCash,
  cost: 45,
  cancellationTotalFee: 10,
  twoWayAvailable: false,
  costAfterCoupon: 0,
  description: 'Affordable rides for daily commutes',
  personCapacity: 4,
);

final mockService3 = Fragment$Service(
  id: '3',
  name: 'Luxury',
  media: ImageFaker().taxiService.carPremiumBlack.toMedia,
  options: [
    moclRiderOption4,
  ],
  prepayPercent: 100,
  paymentMethod: Enum$ServicePaymentMethod.OnlyCredit,
  cost: 120,
  cancellationTotalFee: 35,
  twoWayAvailable: true,
  costAfterCoupon: 0,
  description: 'Premium rides with luxury vehicles',
  personCapacity: 3,
);

final mockmockServices = [
  mockService1,
  mockService2,
  mockService3,
];
