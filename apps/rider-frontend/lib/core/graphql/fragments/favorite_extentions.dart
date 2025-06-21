import 'package:generic_map/interfaces/place.dart';
import 'package:latlong2/latlong.dart';
import 'package:rider_flutter/core/graphql/fragments/favorite_location.graphql.dart';

extension FavoriteExtentionsX on Fragment$FavoriteLocation {
  Place get wayPoint {
    return Place(LatLng(location.lat, location.lng), details, null);
  }
}
