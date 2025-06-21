import 'package:flutter/material.dart';
import 'package:flutter_common/core/entities/place.dart';
import 'package:flutter_common/core/enums/order_status.dart';
import 'package:generic_map/interfaces/map_view_mode.dart';
import 'package:generic_map/interfaces/marker.dart';
import 'package:generic_map/interfaces/polyline_layer.dart';
import 'package:rider_flutter/core/blocs/home.bloc.dart';
import 'package:rider_flutter/core/entities/place.prod.dart';
import 'package:rider_flutter/core/enums/order_status.prod.dart';
import 'package:rider_flutter/core/graphql/fragments/active_order.extentions.dart';
import 'package:rider_flutter/core/graphql/fragments/point.extentions.dart';
import 'package:rider_flutter/core/graphql/fragments/point.fragment.graphql.dart';

extension HomeStateX on HomeState {
  List<CustomMarker> get markers {
    switch (mode) {
      case HomeMode.loading:
        return [];
      case HomeMode.preSubmission:
        return switch (orderSubmissionPage) {
          OrderSubmissionPage.welcome => driversAround.driverMarkers,
          OrderSubmissionPage.rideWaypointsInput ||
          OrderSubmissionPage.deliverySearchPlaceInput ||
          OrderSubmissionPage.deliveryContactInfoInput =>
            waypoints.nonNulls.toList().markers,
          OrderSubmissionPage.confirmLocation => [],
        };
      case HomeMode.ridePreview:
        final markers = waypoints.nonNulls.toList().markers;
        return markers;

      case HomeMode.rideInProgress:
        final markers = <CustomMarker>[];
        if (activeOrder!.order.status.toEntity.viewMode == OrderStatusViewMode.looking) {
          markers.addAll(activeOrder!.order.wayPoints.markers);
          return markers;
        }
        if (activeOrder!.driverLocation != null) {
          markers.add(activeOrder!.driverLocation!.driverMarker);
        }
        final arrivedToWaypointIndex = activeOrder!.order.destinationArrivedTo;
        if (arrivedToWaypointIndex >= 0) {
          markers.add(activeOrder!.order.wayPoints[arrivedToWaypointIndex].markerDropoff());
        } else {
          markers.add(activeOrder!.order.wayPoints.first.markerPickup());
        }

        return markers;
    }
  }

  bool get isInteractive => switch (mode) {
        HomeMode.loading => false,
        HomeMode.preSubmission => switch (orderSubmissionPage) {
            OrderSubmissionPage.welcome => true,
            OrderSubmissionPage.rideWaypointsInput ||
            OrderSubmissionPage.deliverySearchPlaceInput ||
            OrderSubmissionPage.deliveryContactInfoInput =>
              false,
            OrderSubmissionPage.confirmLocation => true,
          },
        HomeMode.ridePreview => true,
        HomeMode.rideInProgress => true,
      };

  MapViewMode get mapViewMode => mode == HomeMode.preSubmission &&
          (orderSubmissionPage == OrderSubmissionPage.welcome ||
              orderSubmissionPage == OrderSubmissionPage.confirmLocation)
      ? MapViewMode.picker
      : MapViewMode.static;

  List<Fragment$Point> get directions => switch (mode) {
        HomeMode.ridePreview => ridePreviewFareResponse.data?.getFares.directions ?? [],
        HomeMode.rideInProgress => activeOrder!.order.directions ?? [],
        _ => [],
      };

  List<PolyLineLayer> polylines(BuildContext context) => directions.isEmpty ? [] : [directions.toPolyLineLayer(context)];
}
