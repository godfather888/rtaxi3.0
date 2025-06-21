import 'package:driver_flutter/core/graphql/fragments/point.fragment.graphql.dart';

import 'package:latlong2/latlong.dart';

extension PointFragmentX on Fragment$Point {
  LatLng get toLatLngEntity => LatLng(
        lat,
        lng,
      );
}

extension PointFragmentListX on List<Fragment$Point> {
  List<LatLng> get toLatLngList => map((e) => e.toLatLngEntity).toList();
}
