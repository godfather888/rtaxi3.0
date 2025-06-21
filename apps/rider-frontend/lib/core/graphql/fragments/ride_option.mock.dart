import 'package:rider_flutter/core/graphql/fragments/ride_option.fragment.graphql.dart';
import 'package:rider_flutter/core/graphql/schema.gql.dart';

final moclRiderOption1 = Fragment$RideOption(
  id: '1',
  name: 'Pet',
  type: Enum$ServiceOptionType.Paid,
  icon: Enum$ServiceOptionIcon.Pet,
);

final moclRiderOption2 = Fragment$RideOption(
  id: '2',
  name: 'Delivery',
  type: Enum$ServiceOptionType.Free,
  icon: Enum$ServiceOptionIcon.PackageDelivery,
);

final moclRiderOption3 = Fragment$RideOption(
  id: '3',
  name: 'Shopping',
  type: Enum$ServiceOptionType.TwoWay,
  icon: Enum$ServiceOptionIcon.Shopping,
);

final moclRiderOption4 = Fragment$RideOption(
  id: '4',
  name: 'Luggage',
  type: Enum$ServiceOptionType.Paid,
  icon: Enum$ServiceOptionIcon.Luggage,
);

final moclRiderOptions = [
  moclRiderOption1,
  moclRiderOption2,
  moclRiderOption3,
  moclRiderOption4,
];
