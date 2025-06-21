import 'package:driver_flutter/config/locator/locator.dart';
import 'package:driver_flutter/core/enums/order_status.prod.dart';
import 'package:driver_flutter/core/extensions/extensions.dart';
import 'package:driver_flutter/core/graphql/fragments/current_order.extentions.dart';
import 'package:driver_flutter/core/presentation/slider_button.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_common/core/color_palette/color_palette.dart';
import 'package:flutter_common/core/enums/order_status.dart';
import 'package:flutter_common/core/extensions/extensions.dart';
import 'package:flutter_common/core/presentation/buttons/app_text_button.dart';
import 'package:flutter_common/core/presentation/waypoints_view/waypoints_view.dart';
import 'package:flutter_common/core/theme/animation_duration.dart';
import 'package:flutter_common/core/presentation/card_handle.dart';
import 'package:flutter_common/core/presentation/buttons/app_icon_button.dart';

import 'package:ionicons/ionicons.dart';
import 'package:url_launcher/url_launcher_string.dart';

import '../../blocs/home.bloc.dart';
import '../../components/notice_bar_content.dart';
import '../../components/payment_method_select_field.dart';
import '../../dialogs/ride_options_dialog.dart';
import '../../dialogs/ride_safety_dialog.dart';

class ActiveOrderSheet extends StatelessWidget {
  const ActiveOrderSheet({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: context.responsive(
        BoxDecoration(
          color: ColorPalette.primary20,
          borderRadius: BorderRadius.circular(30),
        ),
        xl: const BoxDecoration(),
      ),
      child: BlocBuilder<HomeBloc, HomeState>(
        builder: (context, state) {
          final order = state.currentOrder;
          if (order == null) {
            return const SizedBox.shrink();
          }
          return Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              context.responsive(
                AnimatedSwitcher(
                  duration: AnimationDuration.pageStateTransitionMobile,
                  child: (order.status.toEntity == OrderStatus.driverAccepted && order.etaPickup != null)
                      ? NoticeBarContent(
                          icon: Ionicons.time,
                          text: context.translate.noticePickingUpRiderIn,
                          trailingText: order.etaPickup?.minutesFromNow(context),
                        )
                      : order.status.toEntity == OrderStatus.arrived
                          ? NoticeBarContent(
                              icon: Ionicons.information_circle,
                              text: context.translate.headingToDestination,
                            )
                          : order.status.toEntity == OrderStatus.started
                              ? NoticeBarContent(
                                  icon: Ionicons.time,
                                  text: context.translate.headingToDestination,
                                  trailingText: order.expectedArrival(context),
                                )
                              : const SizedBox.shrink(),
                ),
                xl: const SizedBox(),
              ),
              Container(
                decoration: const BoxDecoration(
                  borderRadius: BorderRadius.vertical(top: Radius.circular(30)),
                  color: ColorPalette.neutralVariant99,
                ),
                padding: const EdgeInsets.symmetric(vertical: 10),
                child: SafeArea(
                  top: false,
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      const CardHandle(),
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 16),
                        child: Row(
                          children: [
                            Container(
                              padding: const EdgeInsets.all(8),
                              decoration: BoxDecoration(
                                border: Border.all(color: ColorPalette.neutral90),
                                borderRadius: BorderRadius.circular(12),
                              ),
                              child: const Icon(
                                Ionicons.person_circle,
                                color: ColorPalette.primary30,
                              ),
                            ),
                            const SizedBox(
                              width: 12,
                            ),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    "${order.rider?.firstName} ${order.rider?.lastName}",
                                    style: context.labelMedium,
                                  ),
                                  Text(
                                    order.service?.name ?? '',
                                    style: context.bodyMedium?.copyWith(
                                      color: ColorPalette.neutralVariant50,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                            const SizedBox(
                              width: 12,
                            ),
                            Badge(
                              isLabelVisible:
                                  order.conversation.lastOrNull?.sentAt.isAfter(order.driverLastSeenMessagesAt) ?? false,
                              child: AppIconButton(
                                icon: Ionicons.chatbubble,
                                onPressed: () {
                                  locator<HomeBloc>().add(const HomeEvent.onShowChat());
                                },
                              ),
                            ),
                            const SizedBox(width: 8),
                            AppIconButton(
                              icon: Ionicons.call,
                              onPressed: () {
                                launchUrlString("tel://+${order.rider?.mobileNumber}");
                              },
                            ),
                          ],
                        ),
                      ),
                      const Divider(
                        height: 16,
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 16),
                        height: 120,
                        child: SingleChildScrollView(
                          child: WayPointsView(
                            waypoints: order.wayPoints,
                          ),
                        ),
                      ),
                      const SizedBox(
                        height: 16,
                      ),
                      Container(
                        height: 16,
                        decoration: BoxDecoration(
                          boxShadow: [
                            BoxShadow(
                              color: Colors.black.withValues(alpha: 0.02),
                              blurRadius: 10,
                              offset: const Offset(0, -5),
                            )
                          ],
                          color: ColorPalette.neutralVariant99,
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 16),
                        child: Column(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            PaymentMethodSelectField(
                              order: order,
                              onPressed: null,
                            ),
                            const SizedBox(
                              height: 9,
                            ),
                            const Divider(
                              height: 16,
                            ),
                            Row(
                              children: [
                                AppTextButton(
                                  iconData: Ionicons.cog,
                                  isDense: true,
                                  text: context.translate.rideOptions,
                                  onPressed: () {
                                    showDialog(
                                      context: context,
                                      useSafeArea: false,
                                      builder: (context) => RideOptionsSheet(
                                        orderId: order.id,
                                      ),
                                    );
                                  },
                                ),
                                const Spacer(),
                                AppTextButton(
                                  iconData: Ionicons.shield,
                                  isDense: true,
                                  text: context.translate.rideSafety,
                                  onPressed: () {
                                    showDialog(
                                      context: context,
                                      useSafeArea: false,
                                      builder: (context) => RideSafetyDialog(
                                        order: order,
                                      ),
                                    );
                                  },
                                ),
                              ],
                            ),
                          ],
                        ),
                      ),
                      AnimatedSwitcher(
                        duration: AnimationDuration.pageStateTransitionMobile,
                        child: Padding(
                          padding: const EdgeInsets.all(16).copyWith(bottom: 8),
                          child: order.status.toEntity == OrderStatus.driverAccepted
                              ? SliderButton(
                                  text: context.translate.slideToConfirmArrival,
                                  onSlided: () {
                                    locator<HomeBloc>().add(
                                      HomeEvent.onArrivedToPickupPoint(
                                        orderId: order.id,
                                      ),
                                    );
                                  },
                                )
                              : order.status.toEntity == OrderStatus.arrived
                                  ? SliderButton(
                                      text: context.translate.slideToConfirmPickup,
                                      onSlided: () {
                                        locator<HomeBloc>().add(
                                          HomeEvent.onStripStarted(
                                            orderId: order.id,
                                          ),
                                        );
                                      },
                                    )
                                  : order.status.toEntity == OrderStatus.started
                                      ? SliderButton(
                                          text: context.translate.slideToConfirmDropoff,
                                          onSlided: () {
                                            locator<HomeBloc>().add(
                                              HomeEvent.onArrivedToDestination(
                                                order: order,
                                                destinationArrivedTo: (order.destinationArrivedTo ?? -1) + 1,
                                              ),
                                            );
                                          },
                                        )
                                      : const SizedBox.shrink(),
                        ),
                      )
                    ],
                  ),
                ),
              )
            ],
          );
        },
      ),
    );
  }
}
