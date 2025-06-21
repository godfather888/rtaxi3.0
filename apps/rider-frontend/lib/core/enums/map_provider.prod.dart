import 'package:generic_map/generic_map.dart';
import 'package:rider_flutter/core/graphql/schema.gql.dart';

extension MapProviderX on MapProviderEnum {
  Enum$GeoProvider toGql() => switch (this) {
        MapProviderEnum.googleMaps => Enum$GeoProvider.GOOGLE,
        MapProviderEnum.mapBox => Enum$GeoProvider.MAPBOX,
        MapProviderEnum.openStreetMaps ||
        MapProviderEnum.mapBoxSDK ||
        MapProviderEnum.mapLibre =>
          Enum$GeoProvider.NOMINATIM
      };
}
