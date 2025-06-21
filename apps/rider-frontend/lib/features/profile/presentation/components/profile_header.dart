import 'package:auto_route/auto_route.dart';
import 'package:flutter/cupertino.dart';
import 'package:rider_flutter/core/extensions/extensions.dart';
import 'package:flutter_common/core/presentation/buttons/app_back_button.dart';
import 'package:rider_flutter/core/graphql/documents/profile.graphql.dart';
import 'package:rider_flutter/core/graphql/fragments/profile.extentions.dart';
import 'package:rider_flutter/core/graphql/fragments/profile.fragment.graphql.dart';
import 'package:flutter_common/gen/assets.gen.dart';

import 'action_buttons.dart';
import 'user_info_hero.dart';

class ProfileHeader extends StatelessWidget {
  final Fragment$Profile profile;
  final Query$ProfileAggregations aggregationsInfo;

  const ProfileHeader({
    super.key,
    required this.profile,
    required this.aggregationsInfo,
  });

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        Container(
          padding: const EdgeInsets.all(16),
          width: double.infinity,
          margin: const EdgeInsets.only(bottom: 54),
          decoration: BoxDecoration(
            borderRadius: context.responsive(BorderRadius.zero, xl: BorderRadius.circular(20)),
            image: DecorationImage(
              image: Assets.images.walletHeaderBackground.provider(),
              fit: BoxFit.cover,
            ),
          ),
          child: SafeArea(
            top: context.responsive(true, xl: false),
            bottom: false,
            child: Column(
              children: [
                context.responsive(
                  Align(
                    alignment: Alignment.centerLeft,
                    child: AppBackButton(
                      onPressed: () => context.router.maybePop(),
                    ),
                  ),
                  xl: const SizedBox(
                    height: 36,
                  ),
                ),
                UserInfoHero(
                  name: profile.fullName,
                  avatar: profile.avatar,
                  phoneNumber: profile.mobileNumberFormatted,
                ),
                SizedBox(
                  height: context.responsive(16, xl: 48),
                ),
              ],
            ),
          ),
        ),
        Positioned(
          bottom: 0,
          left: 0,
          right: 0,
          child: Center(
            child: ActionButtons(
              totalRides: aggregationsInfo.rider.ordersAggregate.firstOrNull?.count?.id ?? 0,
              totalDistanceTraveled: aggregationsInfo.rider.ordersAggregate.firstOrNull?.sum?.distanceBest?.toInt() ?? 0,
              favoriteDrivers: aggregationsInfo.rider.favoriteDriversAggregate.firstOrNull?.count?.id ?? 0,
            ),
          ),
        ),
      ],
    );
  }
}
