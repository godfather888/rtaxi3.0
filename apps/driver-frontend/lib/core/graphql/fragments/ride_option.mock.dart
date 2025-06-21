import 'package:driver_flutter/core/graphql/fragments/ride_option.fragment.graphql.dart';
import 'package:driver_flutter/core/graphql/schema.gql.dart';

final mockRiderOption1 = Fragment$RideOption(
  id: '1',
  name: 'Pet',
  type: Enum$ServiceOptionType.Paid,
  icon: Enum$ServiceOptionIcon.Pet,
  additionalFee: 15,
  description: 'Travel comfortably with your pet on board.',
);

final mockRiderOption2 = Fragment$RideOption(
  id: '2',
  name: 'Delivery',
  type: Enum$ServiceOptionType.Free,
  icon: Enum$ServiceOptionIcon.PackageDelivery,
  additionalFee: 0,
  description: 'Send packages quickly and safely during your ride.',
);

final mockRiderOption3 = Fragment$RideOption(
  id: '3',
  name: 'Shopping',
  type: Enum$ServiceOptionType.TwoWay,
  icon: Enum$ServiceOptionIcon.Shopping,
  additionalFee: 10,
  description: 'Get help with your shopping trips and carry your bags.',
);

final mockRiderOption4 = Fragment$RideOption(
  id: '4',
  name: 'Luggage',
  type: Enum$ServiceOptionType.Paid,
  icon: Enum$ServiceOptionIcon.Luggage,
  additionalFee: 20,
  description: 'Extra space and care for your luggage during the ride.',
);

final moclRiderOptions = [
  mockRiderOption1,
  mockRiderOption2,
  mockRiderOption3,
  mockRiderOption4,
];
