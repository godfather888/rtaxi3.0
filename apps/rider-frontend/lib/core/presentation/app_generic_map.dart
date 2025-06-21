import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_common/config/constants.dart';
import 'package:generic_map/generic_map.dart';
import 'package:rider_flutter/config/env.dart';
import 'package:rider_flutter/core/blocs/settings.bloc.dart';
import 'package:rider_flutter/core/extensions/extensions.dart';

class AppGenericMap extends StatelessWidget {
  final MapViewMode mode;
  final CenterMarker Function(
    BuildContext context,
    GlobalKey key,
    String? address,
  )? centerMarkerBuilder;
  final AddressResolver? addressResolver;
  final bool interactive;
  final Function(MapViewController)? onControllerReady;
  final Function(Place?, double?)? onMapMoved;
  final Place initialLocation;
  final List<PolyLineLayer> polylines;
  final List<CustomMarker> markers;
  final List<CircleMarker> circleMarkers;
  final EdgeInsets padding;
  final EdgeInsets buttonPadding;

  const AppGenericMap({
    super.key,
    required this.initialLocation,
    this.mode = MapViewMode.static,
    this.onControllerReady,
    this.polylines = const [],
    this.onMapMoved,
    this.interactive = false,
    this.padding = EdgeInsets.zero,
    this.buttonPadding = const EdgeInsets.all(16),
    this.markers = const <CustomMarker>[],
    this.centerMarkerBuilder,
    this.addressResolver,
    this.circleMarkers = const [],
  });

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<SettingsCubit, SettingsState>(
      buildWhen: (previous, current) => previous.mapProvider != current.mapProvider,
      builder: (context, state) {
        return GenericMap(
          actionsPadding: buttonPadding,
          platformMapProviderSettings: Env.isDemoMode
              ? PlatformMapProviderSettings(defaultProvider: state.mapProvider)
              : Constants.mapProviderPlatformSettings,
          mapLibreOptions: Constants.mapLibreOptions(context.isDark),
          mapboxOptions: Constants.mapboxOptions(context.isDark),
          mapboxSdkOptions: Constants.mapboxSdkOptions(context.isDark),
          mode: mode,
          centerMarkerBuilder: centerMarkerBuilder,
          addressResolver: addressResolver,
          interactive: interactive,
          onControllerReady: onControllerReady,
          onMapMoved: onMapMoved,
          initialLocation: initialLocation,
          polylines: polylines,
          markers: markers,
          circleMarkers: circleMarkers,
          padding: padding,
        );
      },
    );
  }
}
