import 'package:image_faker/image_faker.dart';
import 'package:rider_flutter/core/graphql/fragments/favorite_driver.fragment.graphql.dart';

final mockFavoriteDriver1 = Fragment$FavoriteDriver(
  id: '1',
  reviewCount: 15,
  enabledServices: [
    Fragment$FavoriteDriver$enabledServices(
      service: Fragment$FavoriteDriver$enabledServices$service(
        name: 'Economy',
      ),
    ),
    Fragment$FavoriteDriver$enabledServices(
      service: Fragment$FavoriteDriver$enabledServices$service(
        name: 'Airport Pickup',
      ),
    ),
  ],
  car: Fragment$FavoriteDriver$car(
    name: 'Benz',
  ),
  carColor: Fragment$FavoriteDriver$carColor(
    name: 'Black',
  ),
  carPlate: 'ABC1234',
  firstName: 'John',
  lastName: 'Doe',
  media: Fragment$FavoriteDriver$media(
    address: ImageFaker().person.one,
  ),
  rating: 85,
  mobileNumber: '3123123',
);

final mockFavoriteDriver2 = Fragment$FavoriteDriver(
  id: '2',
  reviewCount: 30,
  enabledServices: [
    Fragment$FavoriteDriver$enabledServices(
      service: Fragment$FavoriteDriver$enabledServices$service(
        name: 'Luxury',
      ),
    ),
    Fragment$FavoriteDriver$enabledServices(
      service: Fragment$FavoriteDriver$enabledServices$service(
        name: 'City Ride',
      ),
    ),
  ],
  car: Fragment$FavoriteDriver$car(
    name: 'Tesla',
  ),
  carColor: Fragment$FavoriteDriver$carColor(
    name: 'White',
  ),
  carPlate: 'XYZ-7890',
  firstName: 'Alice',
  lastName: 'Smith',
  media: Fragment$FavoriteDriver$media(
    address: ImageFaker().person.two,
  ),
  rating: 92,
  mobileNumber: '3123123',
);

final mockFavoriteDriver3 = Fragment$FavoriteDriver(
  id: '3',
  reviewCount: 45,
  enabledServices: [
    Fragment$FavoriteDriver$enabledServices(
      service: Fragment$FavoriteDriver$enabledServices$service(
        name: 'Standard',
      ),
    ),
    Fragment$FavoriteDriver$enabledServices(
      service: Fragment$FavoriteDriver$enabledServices$service(
        name: 'Shared Ride',
      ),
    ),
  ],
  car: Fragment$FavoriteDriver$car(
    name: 'Toyota',
  ),
  carColor: Fragment$FavoriteDriver$carColor(
    name: 'Blue',
  ),
  carPlate: 'JH56YTR',
  firstName: 'Bob',
  lastName: 'Johnson',
  media: Fragment$FavoriteDriver$media(
    address: ImageFaker().person.three,
  ),
  rating: 78,
  mobileNumber: '3123123',
);

final mockFavoriteDrivers = [
  mockFavoriteDriver1,
  mockFavoriteDriver2,
  mockFavoriteDriver3,
];
