import 'package:rider_flutter/core/graphql/fragments/point.extentions.dart';
import 'package:rider_flutter/core/graphql/schema.gql.dart';

import 'update_favorite_location_input.dart';

extension UpdateFavoriteLocationInputX on UpdateFavoriteLocationInput {
  Input$CreateRiderAddressInput get toGql {
    return Input$CreateRiderAddressInput(
      title: name,
      details: place.address,
      type: type,
      location: place.latLng.toPointInput,
      phoneNumber: Input$PhoneNumberInput(
        countryCode: phone.$1.e164CountryCode,
        number: phone.$2!,
      ),
    );
  }
}
