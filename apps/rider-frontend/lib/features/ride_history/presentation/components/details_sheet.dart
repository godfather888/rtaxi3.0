import 'package:flutter/material.dart';
import 'package:flutter_common/core/entities/payment_method_union.dart';
import 'package:flutter_common/core/enums/ride_option_icon.dart';
import 'package:flutter_common/core/presentation/chips/square_icon_chip.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:ionicons/ionicons.dart';
import 'package:flutter_common/core/color_palette/color_palette.dart';
import 'package:flutter_common/core/presentation/waypoints_view/waypoints_view.dart';
import 'package:flutter_common/core/presentation/small_chip.dart';
import 'package:flutter_common/core/presentation/avatars/driver_avatar_secondary.dart';
import 'package:rider_flutter/core/entities/ride_option.prod.dart';
import 'package:rider_flutter/core/extensions/extensions.dart';
import 'package:rider_flutter/core/graphql/fragments/favorite_driver.extentions.dart';
import 'package:rider_flutter/core/graphql/fragments/past_order.extentions.dart';
import 'package:rider_flutter/core/graphql/fragments/past_order.fragment.graphql.dart';
import 'package:rider_flutter/core/presentation/driver_rating.dart';
import 'package:rider_flutter/core/presentation/vehicle_info/vehicle_info_compact.dart';

class RideHistoryDetailsSheet extends StatelessWidget {
  final Fragment$PastOrder entity;

  const RideHistoryDetailsSheet({
    super.key,
    required this.entity,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          padding: const EdgeInsets.all(12),
          decoration: BoxDecoration(
            color: ColorPalette.neutral99,
            border: Border.all(
              color: ColorPalette.primary95,
            ),
            borderRadius: BorderRadius.circular(12),
          ),
          child: Row(
            children: [
              DriverAvatarSecondary(
                imageUrl: entity.driver?.media?.address,
              ),
              const SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      entity.driver?.lastName ?? "",
                      style: context.labelLarge,
                    ),
                    const SizedBox(height: 4),
                    if (entity.driver?.rating != null)
                      DriverRating(
                        rating: entity.driver?.rating,
                        textSuffix: context.translate.reviewsCount(
                          entity.driver!.reviewCount.toInt(),
                        ),
                      )
                  ],
                ),
              ),
              Column(
                children: [
                  Text(
                    entity.costAfterCoupon.formatCurrency(entity.currency),
                    style: context.labelLarge,
                  ),
                  const SizedBox(height: 4),
                  Text(
                    entity.service?.name ?? '',
                    style: context.bodySmall?.copyWith(
                      color: ColorPalette.neutralVariant50,
                    ),
                  )
                ],
              )
            ],
          ),
        ),
        const SizedBox(height: 16),
        VehicleInfoCompact(
          vehicleModel: entity.driver?.car?.name,
          vehicleColor: entity.driver?.carColor?.name,
          vehiclePlateNumber: entity.driver?.carPlate,
          imageUrl: entity.service?.media.address,
        ),
        const Divider(
          height: 24,
        ),
        Center(
          child: Text(
            entity.driver?.ratingTitle(context, entity.driver!.rating) ?? '-',
            textAlign: TextAlign.center,
            style: context.titleLarge,
          ),
        ),
        const SizedBox(
          height: 8,
        ),
        Center(
          child: RatingBar.builder(
            ignoreGestures: true,
            itemSize: 32,
            unratedColor: ColorPalette.neutral90,
            glow: false,
            allowHalfRating: true,
            itemBuilder: (context, index) {
              return AnimatedContainer(
                duration: const Duration(milliseconds: 300),
                width: 32,
                height: 32,
                decoration: const ShapeDecoration(
                  shape: StarBorder(
                    innerRadiusRatio: 0.45,
                    pointRounding: 0.2,
                  ),
                  color: ColorPalette.secondary70,
                ),
              );
            },
            itemCount: 5,
            initialRating: entity.driver?.rating?.toDouble() ?? 0,
            onRatingUpdate: (value) {},
          ),
        ),
        const Divider(
          height: 24,
        ),
        Text(
          context.translate.tripDetails,
          style: context.labelLarge,
        ),
        const SizedBox(height: 12),
        Wrap(
          spacing: 8,
          runSpacing: 8,
          alignment: WrapAlignment.start,
          children: [
            SmallChip(
              text: entity.distanceBest.toFormattedDistance(context),
              icon: const Icon(Ionicons.map, color: ColorPalette.neutral70),
            ),
            SmallChip(
              text: context.translate.durationInMinutes(entity.durationBest ~/ 60),
              icon: const Icon(Ionicons.time, color: ColorPalette.neutral70),
            ),
            SmallChip(
              text: entity.paymentMethodUnion.name(context),
              icon: entity.paymentMethodUnion.icon(color: ColorPalette.neutral70),
            ),
          ],
        ),
        const Divider(
          height: 24,
        ),
        WayPointsView(
          waypoints: entity.wayPoints,
          startedAt: entity.createdOn,
          finishedAt: entity.expectedTimestamp,
        ),
        if (entity.options.isNotEmpty || entity.waitMinutes > 0 || entity.isTwoWayTrip) ...[
          const Divider(
            height: 24,
          ),
          Row(
            children: [
              Text(
                context.translate.preferences,
                style: context.bodyMedium,
              ),
              Expanded(
                child: Wrap(
                  alignment: WrapAlignment.end,
                  spacing: 8,
                  children: entity.options
                      .map(
                    (e) => SquareIconChip(icon: e.toEntity.icon.icon),
                  )
                      .followedBy([
                    if (entity.waitMinutes > 0) const SquareIconChip(icon: Ionicons.time),
                    if (entity.isTwoWayTrip) const SquareIconChip(icon: Ionicons.repeat),
                  ]).toList(),
                ),
              )
            ],
          )
        ],
        const SizedBox(height: 24),
      ],
    );
  }
}
