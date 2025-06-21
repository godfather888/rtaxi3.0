import 'package:driver_flutter/core/graphql/fragments/media.extentions.dart';
import 'package:driver_flutter/core/graphql/fragments/rider.fragment.graphql.dart';
import 'package:image_faker/image_faker.dart';

final mockRider1 = Fragment$Rider(
  id: '1',
  mobileNumber: '+1-303-555-0129',
  firstName: 'Liam',
  lastName: 'Smith',
  presetAvatarNumber: 7,
  wallets: [],
  media: ImageFaker().person.random().toMedia,
);

final mockRider2 = Fragment$Rider(
  id: '2',
  mobileNumber: '+1-202-555-0173',
  firstName: 'Emma',
  lastName: 'Johnson',
  presetAvatarNumber: 4,
  wallets: [],
  media: ImageFaker().person.random().toMedia,
);
