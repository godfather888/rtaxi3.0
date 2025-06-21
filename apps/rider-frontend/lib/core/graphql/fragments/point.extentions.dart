import 'package:flutter/material.dart';
import 'package:flutter_common/core/color_palette/color_palette.dart';
import 'package:flutter_common/core/entities/driver_location.dart';
import 'package:flutter_common/gen/assets.gen.dart';
import 'package:generic_map/interfaces/marker.dart';
import 'package:generic_map/interfaces/polyline_layer.dart';
import 'package:latlong2/latlong.dart';
import 'package:rider_flutter/core/graphql/fragments/point.fragment.graphql.dart';
import 'package:rider_flutter/core/graphql/schema.gql.dart';

extension LatLngX on LatLng {
  Fragment$Point get toCoordinate => Fragment$Point(lat: latitude, lng: longitude);

  Input$PointInput get toPointInput => Input$PointInput(lat: latitude, lng: longitude);
}

extension CoordinateX on Fragment$Point {
  LatLng get toLatLng => LatLng(lat, lng);
}

// list of LatLng
extension LatLngListX on List<LatLng> {
  List<Fragment$Point> get toCoordinates => map((e) => e.toCoordinate).toList();
}

// list of Fragment$coordinate
extension CoordinateListX on List<Fragment$Point> {
  List<LatLng> get toLatLngs => map((e) => e.toLatLng).toList();

  PolyLineLayer toPolyLineLayer(BuildContext context) => PolyLineLayer(
        points: map((e) => e.toLatLng).toList(),
        width: 3,
        gradientColors: [ColorPalette.primary40, ColorPalette.tertiary60],
      );
}

extension PointX on Fragment$Point {
  DriverLocation? get toMediaEntity {
    return DriverLocation(
      lat: lat,
      lng: lng,
      rotation: heading,
    );
  }
}

extension DriverLocationX on Fragment$Point {
  CustomMarker get driverMarker => CustomMarker(
        position: LatLng(lat, lng),
        widget: Assets.images.carTopView.image(),
        fallbackAssetPath: Assets.images.carTopView.path,
        fallbackAssetPackage: Assets.package,
        alignment: Alignment.center,
        rotation: heading ?? 0,
        width: 48,
        height: 48,
      );
}

extension DriverLocationListX on List<Fragment$Point> {
  List<CustomMarker> get driverMarkers => map((e) => e.driverMarker).toList();
}
