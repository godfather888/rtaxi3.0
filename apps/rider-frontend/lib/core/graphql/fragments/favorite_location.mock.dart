import 'package:rider_flutter/core/graphql/fragments/favorite_location.graphql.dart';
import 'package:rider_flutter/core/graphql/fragments/point.mock.dart';
import 'package:rider_flutter/core/graphql/schema.gql.dart';

final mockFavoriteLocation1 = Fragment$FavoriteLocation(
  id: '1',
  title: 'Cafe Central',
  type: Enum$RiderAddressType.Cafe,
  details: 'Cozy place with great coffee',
  phoneNumber: Fragment$FavoriteLocation$phoneNumber(
    countryCode: '+1',
    number: '2065550101',
  ),
  location: mockPoint1,
);

final mockFavoriteLocation2 = Fragment$FavoriteLocation(
  id: '2',
  title: 'Home Sweet Home',
  type: Enum$RiderAddressType.Home,
  details: 'My primary residence',
  phoneNumber: Fragment$FavoriteLocation$phoneNumber(
    countryCode: '+1',
    number: '2065550202',
  ),
  location: mockPoint2,
);

final mockFavoriteLocation3 = Fragment$FavoriteLocation(
  id: '3',
  title: 'Office Tower',
  type: Enum$RiderAddressType.Work,
  details: 'Downtown office building',
  phoneNumber: Fragment$FavoriteLocation$phoneNumber(
    countryCode: '+1',
    number: '2065550303',
  ),
  location: mockPoint3,
);

final mockFavoriteLocation4 = Fragment$FavoriteLocation(
  id: '4',
  title: 'City Park',
  type: Enum$RiderAddressType.Park,
  details: 'Relaxing green space with playground',
  phoneNumber: Fragment$FavoriteLocation$phoneNumber(
    countryCode: '+1',
    number: '2065550404',
  ),
  location: mockPoint4,
);

final mockFavoriteLocation5 = Fragment$FavoriteLocation(
  id: '5',
  title: 'Downtown Gym',
  type: Enum$RiderAddressType.Gym,
  details: '24/7 Fitness Center',
  phoneNumber: Fragment$FavoriteLocation$phoneNumber(
    countryCode: '+1',
    number: '2065550606',
  ),
  location: mockPoint1,
);

final mockFavoriteLocation6 = Fragment$FavoriteLocation(
  id: '6',
  title: 'Parent House',
  type: Enum$RiderAddressType.Parent,
  details: 'Mom and Dad\'s home',
  phoneNumber: Fragment$FavoriteLocation$phoneNumber(
    countryCode: '+1',
    number: '2065550707',
  ),
  location: mockPoint2,
);

final mockFavoriteLocation7 = Fragment$FavoriteLocation(
  id: '7',
  title: 'Partner Office',
  type: Enum$RiderAddressType.Partner,
  details: 'Business partner\'s office',
  phoneNumber: Fragment$FavoriteLocation$phoneNumber(
    countryCode: '+1',
    number: '2065550808',
  ),
  location: mockPoint3,
);

final mockFavoriteLocations = [
  mockFavoriteLocation1,
  mockFavoriteLocation2,
  mockFavoriteLocation3,
  mockFavoriteLocation4,
  mockFavoriteLocation5,
  mockFavoriteLocation6,
  mockFavoriteLocation7,
];
