import 'package:flutter/material.dart';
import 'package:flutter_common/core/entities/place.dart';
import 'package:generic_map/generic_map.dart';

import 'package:rider_flutter/core/extensions/extensions.dart';
import 'package:rider_flutter/core/graphql/fragments/active_order.extentions.dart';
import 'package:rider_flutter/core/graphql/fragments/active_order.fragment.graphql.dart';
import 'package:rider_flutter/core/presentation/app_generic_map.dart';

import '../components/details_sheet.dart';

class ScheduledRideDetailsScreenDesktop extends StatelessWidget {
  final Fragment$CurrentOrder entity;

  const ScheduledRideDetailsScreenDesktop({
    super.key,
    required this.entity,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Expanded(
          child: AppGenericMap(
            mode: MapViewMode.static,
            initialLocation: entity.wayPoints.first,
            padding: const EdgeInsets.symmetric(
              vertical: 80,
              horizontal: 150,
            ),
            markers: entity.wayPoints.markers,
            onControllerReady: (controller) {
              controller.fitBounds(
                entity.wayPoints.latLngs,
              );
            },
          ),
        ),
        Container(
          width: 400,
          padding: const EdgeInsets.only(left: 24, right: 24, top: 100),
          color: context.theme.scaffoldBackgroundColor,
          child: ScheduledRidesDetailsSheet(entity: entity),
        )
      ],
    );
  }
}
