import 'package:driver_flutter/core/graphql/fragments/media.extentions.dart';
import 'package:driver_flutter/core/graphql/fragments/ride_option.mock.dart';
import 'package:driver_flutter/core/graphql/fragments/service.fragment.graphql.dart';
import 'package:driver_flutter/core/graphql/schema.gql.dart';
import 'package:image_faker/image_faker.dart';

final mockService1 = Fragment$Service(
  id: '1',
  name: 'Premium Ride',
  paymentMethod: Enum$ServicePaymentMethod.OnlyCredit,
  cancellationTotalFee: 45,
  media: ImageFaker().taxiService.carPremiumBlack.toMedia,
  options: [
    mockRiderOption1,
    mockRiderOption2,
  ],
);

final mockService2 = Fragment$Service(
  id: '2',
  name: 'Standard Ride',
  paymentMethod: Enum$ServicePaymentMethod.OnlyCash,
  cancellationTotalFee: 23,
  media: ImageFaker().taxiService.carYellow.toMedia,
  options: [
    mockRiderOption3,
    mockRiderOption4,
  ],
);
