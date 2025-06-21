// import 'package:flutter/material.dart';
// import 'package:flutter_common/core/enums/order_status.dart';
// import 'package:generic_map/generic_map.dart';

// import 'package:rider_flutter/core/entities/place.prod.dart';
// import 'package:rider_flutter/core/enums/order_status.prod.dart';
// import 'package:rider_flutter/core/graphql/fragments/point.fragment.graphql.dart';

// import 'home.bloc.dart';

// extension HomeStateX on HomeState {
//   List<CustomMarker> markers(BuildContext context) {
//     switch (mode) {
//       case HomeMode.loading:
//         return [];
//       case HomeMode.preSubmission:
//         return switch (orderSubmissionPage) {
//           OrderSubmissionPage.welcome => driversAround.markers,
//           OrderSubmissionPage.rideWaypointsInput ||
//           OrderSubmissionPage.deliverySearchPlaceInput ||
//           OrderSubmissionPage.deliveryContactInfoInput =>
//             waypoints.nonNulls.toList().markers,
//           OrderSubmissionPage.confirmLocation => [],
//         };
//       case HomeMode.ridePreview:
//         final markers = waypoints.nonNulls.toList().markers;
//         return markers;

//       case HomeMode.rideInProgress:
//         final markers = <CustomMarker>[];
//         if (activeOrder!.order.status.viewMode == OrderStatusViewMode.looking) {
//           markers.addAll(activeOrder!.order.places.markers);
//           return markers;
//         }
//         if (activeOrder!.driverLocation != null) {
//           markers.add(activeOrder!.driverLocation!.marker);
//         }
//         final arrivedToWaypointIndex = activeOrder!.order.destinationArrivedTo;
//         if (arrivedToWaypointIndex >= 0) {
//           markers.add(activeOrder!.order.places[arrivedToWaypointIndex].markerDropoff());
//         } else {
//           markers.add(activeOrder!.order.places.first.markerPickup());
//         }

//         return markers;
//     }
//   }

//   bool get isInteractive => switch (mode) {
//         HomeMode.loading => false,
//         HomeMode.preSubmission => switch (orderSubmissionPage) {
//             OrderSubmissionPage.welcome => true,
//             OrderSubmissionPage.rideWaypointsInput ||
//             OrderSubmissionPage.deliverySearchPlaceInput ||
//             OrderSubmissionPage.deliveryContactInfoInput =>
//               false,
//             OrderSubmissionPage.confirmLocation => true,
//           },
//         HomeMode.ridePreview => true,
//         HomeMode.rideInProgress => true,
//       };

//   MapViewMode get mapViewMode => mode == HomeMode.preSubmission &&
//           (orderSubmissionPage == OrderSubmissionPage.welcome ||
//               orderSubmissionPage == OrderSubmissionPage.confirmLocation)
//       ? MapViewMode.picker
//       : MapViewMode.static;

//   List<Fragment$Point> get directions => switch (mode) {
//         HomeMode.ridePreview => ridePreviewFareResponse.data?.directions ?? [],
//         HomeMode.rideInProgress => activeOrder!.order.currentStatusDirections,
//         _ => [],
//       };

//   List<PolyLineLayer> polylines(BuildContext context) => directions.isEmpty ? [] : [directions.toPolyLineLayer(context)];
// }
