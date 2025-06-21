import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_common/core/entities/payment_method_union.dart';
import 'package:flutter_common/core/presentation/waypoints_view/waypoints_view.dart';
import 'package:ionicons/ionicons.dart';
import 'package:flutter_common/core/color_palette/color_palette.dart';
import 'package:rider_flutter/core/extensions/extensions.dart';
import 'package:flutter_common/core/presentation/avatars/driver_avatar_secondary.dart';
import 'package:rider_flutter/core/graphql/fragments/favorite_driver.extentions.dart';
import 'package:rider_flutter/core/graphql/fragments/past_order.extentions.dart';
import 'package:rider_flutter/core/graphql/fragments/past_order.fragment.graphql.dart';
import 'package:rider_flutter/core/presentation/driver_rating.dart';
import 'package:rider_flutter/core/presentation/vehicle_info/vehicle_plate_view.dart';
import 'package:flutter_common/gen/assets.gen.dart';

class RideHistoryItem extends StatelessWidget {
  final Fragment$PastOrder entity;
  final VoidCallback onPressed;

  const RideHistoryItem({
    super.key,
    required this.entity,
    required this.onPressed,
  });

  @override
  Widget build(BuildContext context) {
    return CupertinoButton(
      padding: EdgeInsets.zero,
      onPressed: onPressed,
      minimumSize: Size(0, 0),
      child: Container(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(12),
          image: DecorationImage(
            image: Assets.images.historyRidesHeaderBackground.provider(),
            fit: BoxFit.cover,
          ),
        ),
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.all(12),
              child: Row(
                children: [
                  Container(
                    decoration: BoxDecoration(
                      color: ColorPalette.neutralVariant99,
                      border: Border.all(
                        width: 2,
                        color: ColorPalette.neutral90,
                      ),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    padding: const EdgeInsets.all(8),
                    child: const Icon(
                      Ionicons.car,
                      color: ColorPalette.primary30,
                      size: 28,
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      children: [
                        Row(
                          children: [
                            Expanded(
                              child: Text(
                                entity.service?.name ?? '',
                                style: context.labelLarge?.copyWith(
                                  color: ColorPalette.neutral99,
                                ),
                              ),
                            ),
                            Text(
                              entity.costAfterCoupon.formatCurrency(entity.currency),
                              style: context.labelLarge?.copyWith(
                                color: ColorPalette.neutral99,
                              ),
                            )
                          ],
                        ),
                        const SizedBox(height: 2),
                        Row(
                          children: [
                            Expanded(
                              child: Text(
                                entity.createdOn.formatDateTime,
                                style: context.bodyMedium?.copyWith(
                                  color: ColorPalette.neutralVariant90,
                                ),
                              ),
                            ),
                            Text(
                              entity.paymentMethodUnion.name(context),
                              style: context.bodyMedium?.copyWith(
                                color: ColorPalette.neutralVariant90,
                              ),
                            ),
                          ],
                        )
                      ],
                    ),
                  )
                ],
              ),
            ),
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(12),
                color: ColorPalette.neutral99,
                border: Border.all(
                  color: ColorPalette.primary95,
                ),
                boxShadow: const [
                  BoxShadow(
                    color: Color(0x1464748B),
                    blurRadius: 8,
                    offset: Offset(2, 4),
                  )
                ],
              ),
              child: Column(
                children: [
                  WayPointsView(
                    waypoints: entity.wayPoints,
                    startedAt: entity.startTimestamp,
                    finishedAt: entity.finishTimestamp,
                  ),
                  const Divider(
                    height: 20,
                  ),
                  Row(
                    children: [
                      DriverAvatarSecondary(
                        imageUrl: entity.driver?.media?.address,
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              entity.driver?.fullName ?? 'Unknown',
                              style: context.labelMedium,
                            ),
                            const SizedBox(height: 4),
                            DriverRating(rating: entity.driver?.rating)
                          ],
                        ),
                      ),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.end,
                        children: [
                          Text(
                            [entity.driver?.car?.name, entity.driver?.carColor].nonNulls.join(' - '),
                            style: context.labelSmall,
                          ),
                          const SizedBox(height: 4),
                          if (entity.driver?.carPlate != null) VehiclePlateView(carPlate: entity.driver!.carPlate!)
                        ],
                      )
                    ],
                  )
                ],
              ),
            )
          ],
        ),
      ),
    );
  }
}
