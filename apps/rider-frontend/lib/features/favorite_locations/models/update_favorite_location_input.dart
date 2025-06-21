import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:generic_map/interfaces/place.dart';
import 'package:rider_flutter/core/graphql/schema.gql.dart';
import 'package:better_localization/country_code/country_code.dart';

part 'update_favorite_location_input.freezed.dart';

@freezed
sealed class UpdateFavoriteLocationInput with _$UpdateFavoriteLocationInput {
  const factory UpdateFavoriteLocationInput({
    required String name,
    required Enum$RiderAddressType type,
    required Place place,
    required (CountryCode countryCode, String? number) phone,
  }) = _UpdateFavoriteLocationInput;

  const UpdateFavoriteLocationInput._();
}
