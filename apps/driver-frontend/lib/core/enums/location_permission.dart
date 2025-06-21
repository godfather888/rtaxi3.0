import 'package:location/location.dart' as location;
import 'package:permission_handler/permission_handler.dart';

enum LocationPermission { denied, deniedForever, whileInUse, always }

extension PermissionStatusX on location.PermissionStatus {
  LocationPermission toLocationPermission() => switch (this) {
        location.PermissionStatus.denied => LocationPermission.denied,
        location.PermissionStatus.deniedForever => LocationPermission.deniedForever,
        location.PermissionStatus.granted => LocationPermission.always,
        location.PermissionStatus.grantedLimited => LocationPermission.whileInUse
      };
}

extension PermissionPermissionLibraryX on PermissionStatus {
  LocationPermission toLocationPermission() => switch (this) {
        PermissionStatus.denied => LocationPermission.denied,
        PermissionStatus.permanentlyDenied => LocationPermission.deniedForever,
        PermissionStatus.granted => LocationPermission.always,
        PermissionStatus.limited => LocationPermission.whileInUse,
        _ => throw Exception('Unknown permission status: $this'),
      };
}
