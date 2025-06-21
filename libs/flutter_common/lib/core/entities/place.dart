import 'package:flutter/material.dart';
import 'package:generic_map/generic_map.dart';
import 'package:latlong2/latlong.dart';
import 'package:collection/collection.dart';

import '../presentation/markers/app_marker_drop_off.dart';
import '../presentation/markers/app_marker_pickup.dart';
import '../presentation/markers/app_marker_stop.dart';

extension LatLngEntityX on LatLng {
  int distanceTo(LatLng other) {
    final distance = Distance();
    return distance(this, other).toInt();
  }
}

extension LatLngEntityListX on List<LatLng> {
  PolyLineLayer get toPolyLineLayer => PolyLineLayer(
    points: map((e) => e).toList(),
    width: 3,
    color: const Color(0xff2892FF),
    gradientColors: const [Color(0xff2892FF), Color(0xff45FCDE)],
  );

  List<CustomMarker> get directionsCapMarkers => [
    if (length > 1)
      CustomMarker(
        position: first,
        width: 10,
        height: 10,
        widget: Container(decoration: const BoxDecoration(color: Color(0xff2892FF), shape: BoxShape.circle)),
      ),
    if (length > 1)
      CustomMarker(
        position: last,
        width: 10,
        height: 10,
        widget: Container(decoration: const BoxDecoration(color: Color(0xff45FCDE), shape: BoxShape.circle)),
      ),
  ];
}

extension PlaceEntityListX on List<Place> {
  List<LatLng> get latLngs => map((e) => e.latLng).toList();

  List<CustomMarker> get markers {
    final list = toList();
    final result =
        list.mapIndexed((index, element) {
          if (index == 0 || (first.latLng == last.latLng && index == list.length - 1)) {
            return AppMarkerPickup(address: element.address).genericMarker(element.latLng);
          } else if (index == list.length - 1) {
            return AppMarkerDropoff(address: element.address).genericMarker(element.latLng);
          } else {
            return AppMarkerStop(address: element.address, stopIndex: index).genericMarker(element.latLng);
          }
        }).toList();

    return result;
  }
}
