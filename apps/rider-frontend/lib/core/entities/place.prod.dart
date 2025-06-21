import 'package:generic_map/generic_map.dart';
import 'package:latlong2/latlong.dart';
import 'package:rider_flutter/core/graphql/fragments/point.extentions.dart';
import 'package:rider_flutter/core/graphql/schema.gql.dart';
import 'package:flutter_common/core/presentation/markers/app_marker_drop_off.dart';
import 'package:flutter_common/core/presentation/markers/app_marker_pickup.dart';

extension PlaceExtensionX on Place {
  CustomMarker markerPickup() => AppMarkerPickup(address: address).genericMarker(latLng);
  CustomMarker markerDropoff() => AppMarkerDropoff(address: address).genericMarker(latLng);

  Input$PointInput get toGql {
    return latLng.toPointInput;
  }
}

extension PlaceListX on List<Place> {
  // List<CustomMarker> get markers => mapIndexed((index, e) {
  //       if (index == 0) {
  //         return e.markerPickup();
  //       }
  //       return e.markerDropoff();
  //     }).toList();
  List<LatLng> get latLngs => map((e) => e.latLng).toList();

  List<Input$PointInput> get toGql {
    return map((e) => e.latLng.toPointInput).toList();
  }
}
