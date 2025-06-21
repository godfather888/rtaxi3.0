import 'package:flutter_common/gen/assets.gen.dart';
import 'package:generic_map/generic_map.dart';
import 'package:latlong2/latlong.dart';

class DriverLocation {
  final double lat;
  final double lng;
  final int? rotation;

  const DriverLocation({required this.lat, required this.lng, this.rotation});
  factory DriverLocation.fromJson(Map<String, dynamic> json) =>
      DriverLocation(lat: json['lat'] as double, lng: json['lng'] as double, rotation: json['rotation'] as int?);

  Map<String, dynamic> toJson() => {'lat': lat, 'lng': lng, 'rotation': rotation};

  @override
  String toString() {
    return 'DriverLocation(lat: $lat, lng: $lng, rotation: $rotation)';
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    if (other.runtimeType != runtimeType) return false;
    final DriverLocation otherLocation = other as DriverLocation;
    return lat == otherLocation.lat && lng == otherLocation.lng && rotation == otherLocation.rotation;
  }

  @override
  int get hashCode => lat.hashCode ^ lng.hashCode ^ rotation.hashCode;

  CustomMarker genericMarker() => CustomMarker(
    position: LatLng(lat, lng),
    rotation: rotation ?? 0,
    widget: Assets.images.carTopView.image(width: 48, height: 48),
  );
}
