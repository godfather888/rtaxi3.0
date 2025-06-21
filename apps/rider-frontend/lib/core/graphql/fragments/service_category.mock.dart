import 'package:rider_flutter/core/graphql/fragments/service.mock.dart';
import 'package:rider_flutter/core/graphql/fragments/service_category.fragment.graphql.dart';

final mockServiceCategory1 = Fragment$ServiceCategory(
  id: '1',
  name: 'City Rides',
  services: [
    mockService1,
    mockService2,
  ],
);

final mockServiceCategory2 = Fragment$ServiceCategory(
  id: '2',
  name: 'Premium Rides',
  services: [
    mockService3,
  ],
);

final mockServiceCategories = [
  mockServiceCategory1,
  mockServiceCategory2,
];
