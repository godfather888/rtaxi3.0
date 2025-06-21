import 'package:rider_flutter/core/graphql/fragments/media.extentions.dart';
import 'package:rider_flutter/core/graphql/fragments/profile.fragment.graphql.dart';
import 'package:rider_flutter/core/graphql/schema.gql.dart';
import 'package:image_faker/image_faker.dart';

final mockProfile1 = Fragment$Profile(
  id: '1',
  mobileNumber: '+12065550123',
  countryIso: 'US',
  email: 'john.doe@example.com',
  firstName: 'John',
  lastName: 'Doe',
  gender: Enum$Gender.Male,
  media: ImageFaker().person.one.toMedia,
  presetAvatarNumber: 1,
);

final mockProfile2 = Fragment$Profile(
  id: '2',
  mobileNumber: '+12065550456',
  countryIso: 'US',
  email: 'jane.smith@example.com',
  firstName: 'Jane',
  lastName: 'Smith',
  gender: Enum$Gender.Female,
  media: ImageFaker().person.one.toMedia,
  presetAvatarNumber: 2,
);
