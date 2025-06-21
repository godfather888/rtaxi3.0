import 'package:latlong2/latlong.dart';
import 'package:flutter_common/core/entities/driver_location.dart';

import '../graphql/fragments/point.fragment.graphql.dart';

extension PointFragmentExtension on Fragment$Point {
  LatLng get toLatLng {
    return LatLng(lat, lng);
  }

  DriverLocation get toDriverLocation {
    return DriverLocation(
      lat: lat,
      lng: lng,
      rotation: heading ?? 0,
    );
  }
}

extension PointFragmentListExtension on List<Fragment$Point> {
  List<LatLng> get toLatLngs {
    return map((e) => e.toLatLng).toList();
  }

  List<LatLng> get toLatLngEntities {
    return map((e) => e.toLatLng).toList();
  }

  List<DriverLocation> get toDriverLocations {
    return map((e) => e.toDriverLocation).toList();
  }
}
