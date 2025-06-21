import 'package:api_response/api_response.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_common/config/constants.dart';
import 'package:flutter_common/core/presentation/markers/app_marker_pickup.dart';
import 'package:generic_map/generic_map.dart';
import 'package:rider_flutter/config/locator/locator.dart';
import 'package:rider_flutter/core/blocs/home.bloc.dart';
import 'package:rider_flutter/core/blocs/settings.bloc.dart';
import 'package:rider_flutter/core/datasources/geo_datasource.dart';
import 'package:flutter_common/core/entities/place.dart';
import 'package:flutter_common/core/presentation/markers/app_marker_drop_off.dart';
import 'package:rider_flutter/core/graphql/fragments/point.extentions.dart';
import 'package:rider_flutter/core/presentation/app_generic_map.dart';
import 'package:rider_flutter/features/home/presentation/blocs/home.extensions.dart';
import 'package:rider_flutter/features/home/presentation/blocs/place_confirm.bloc.dart';

import 'current_location_marker.dart';

class HomeMap extends StatefulWidget {
  const HomeMap({super.key});

  @override
  State<HomeMap> createState() => _HomeMapState();
}

class _HomeMapState extends State<HomeMap> {
  @override
  Widget build(BuildContext context) {
    return BlocConsumer<HomeBloc, HomeState>(
      listener: (context, state) async {
        switch (state.mode) {
          case HomeMode.preSubmission:
            switch (state.orderSubmissionPage) {
              case OrderSubmissionPage.welcome:
                if (state.waypoints.first == null) return;
                final mapCenter = await state.mapViewController?.getCenter();
                final distance = mapCenter?.distanceTo(state.waypoints.first!.latLng);
                if (distance != null && distance < 100) return;
                state.mapViewController?.moveCamera(state.waypoints.first!.latLng, 16);
                return;

              case OrderSubmissionPage.confirmLocation:
                if (state.selectedLocationResponse.data == null) return;
                final mapCenter = await state.mapViewController?.getCenter();
                final distance = mapCenter?.distanceTo(state.selectedLocationResponse.data!.latLng);
                if (distance != null && distance < 50) return;
                state.mapViewController?.moveCamera(state.selectedLocationResponse.data!.latLng, null);
                break;
              default:
                break;
            }

            break;
          case HomeMode.ridePreview:
            if (state.waypoints.nonNulls.toList().latLngs.length < 2) return;
            Future.delayed(const Duration(milliseconds: 200), () {
              state.mapViewController?.fitBounds(
                state.waypoints.nonNulls.toList().latLngs.followedBy(state.directions.toLatLngs).toList(),
              );
            });
            break;

          case HomeMode.rideInProgress:
            if (state.markers.nonNulls.toList().length < 2) return;
            state.mapViewController?.fitBounds(
              state.markers.nonNulls.toList().map((e) => e.position).followedBy(state.directions.toLatLngs).toList(),
            );
            break;

          default:
            break;
        }
      },
      builder: (context, state) {
        return BlocBuilder<SettingsCubit, SettingsState>(
          buildWhen: (previous, current) => previous.mapProvider != current.mapProvider,
          builder: (context, settingsState) {
            return AppGenericMap(
              padding: const EdgeInsets.only(left: 148, right: 148, top: 148, bottom: 100),
              buttonPadding: const EdgeInsets.symmetric(vertical: 32, horizontal: 16),
              mode: state.mapViewMode,
              interactive: state.isInteractive,
              polylines: state.polylines(context),
              onControllerReady: (controller) => locator<HomeBloc>().add(HomeEvent.onMapReady(controller: controller)),
              centerMarkerBuilder: switch (state.orderSubmissionPage) {
                OrderSubmissionPage.confirmLocation => (context, key, address) {
                    if (state.selectedWaypointIndex == 0) {
                      return AppMarkerPickup(
                        address: "Drag to adjust",
                        key: key,
                      ).centerMarker;
                    } else {
                      return AppMarkerDropoff(
                        address: "Drag to adjust",
                        key: key,
                      ).centerMarker;
                    }
                  },
                OrderSubmissionPage.welcome => (context, key, address) => CurrentLocationMarker(
                      key: key,
                    ).marker,
                _ => null,
              },
              addressResolver: state.mapViewMode == MapViewMode.static
                  ? null
                  : (provider, location) async {
                      final settingsState = locator<SettingsCubit>().state;
                      final result = await locator<GeoDatasource>().getAddressForLocation(
                        latLng: location,
                        language: settingsState.locale,
                        mapProvider: settingsState.mapProvider,
                      );
                      return result.fold(
                        (l) => Place(location, "", ""),
                        (r) => Place(
                          location,
                          r.address,
                          r.title,
                        ),
                      );
                    },
              onMapMoved: (place, zoom) {
                switch (state.orderSubmissionPage) {
                  case OrderSubmissionPage.confirmLocation:
                    if (place == null) {
                      locator<PlaceConfirmCubit>().onLoading();
                    } else {
                      locator<PlaceConfirmCubit>().onLoaded(
                        place: place,
                      );
                    }
                    break;
                  case OrderSubmissionPage.welcome:
                    if (place != null && state.mapViewMode == MapViewMode.picker) {
                      locator<HomeBloc>().add(
                        HomeEvent.onMapMoved(selectedLocation: ApiResponseLoaded(place)),
                      );
                    }
                    break;
                  default:
                    break;
                }
              },
              markers: state.markers,
              initialLocation: state.waypoints.firstOrNull ?? Constants.defaultLocation,
            );
          },
        );
      },
    );
  }
}
