// ignore_for_file: use_build_context_synchronously

import 'package:driver_flutter/core/graphql/schema.gql.dart';
import 'package:driver_flutter/core/presentation/app_drawer.dart';
import 'package:driver_flutter/features/home/presentation/blocs/home.bloc.dart';
import 'package:driver_flutter/features/home/presentation/components/driver_search_radius_button_new.dart';
import 'package:driver_flutter/features/home/presentation/components/home_my_location_button.dart';
import 'package:driver_flutter/features/home/presentation/components/map_view.dart';
import 'package:driver_flutter/features/home/presentation/components/navigate_button.dart';
import 'package:driver_flutter/features/home/presentation/components/top_nav_bar.dart';
import 'package:driver_flutter/features/home/presentation/screens/mobile_layout_delegate.dart';
import 'package:driver_flutter/features/home/presentation/screens/sheets/active_order_sheet.dart';
import 'package:driver_flutter/features/home/presentation/screens/sheets/chat_sheet.dart';
import 'package:driver_flutter/features/home/presentation/screens/sheets/online_offline_sheet.dart';
import 'package:driver_flutter/features/home/presentation/screens/sheets/order_summary.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_common/core/theme/animation_duration.dart';
import 'package:generic_map/generic_map.dart';

import 'sheets/order_requests_pageview.dart';

class HomeScreenMobile extends StatefulWidget {
  const HomeScreenMobile({super.key});

  @override
  State<HomeScreenMobile> createState() => _HomeScreenMobileState();
}

class _HomeScreenMobileState extends State<HomeScreenMobile> {
  final GlobalKey<ScaffoldState> scaffoldKey = GlobalKey<ScaffoldState>();
  MapViewController? controller;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      key: scaffoldKey,
      drawer: const AppDrawer(),
      extendBody: true,
      body: BlocBuilder<HomeBloc, HomeState>(
        buildWhen: (previous, current) {
          return current.orderRequests.isEmpty != previous.orderRequests.isEmpty;
        },
        builder: (context, state) {
          return CustomMultiChildLayout(
            delegate: MobileLayoutDelegate(
              isMapFull: state.orderRequests.isNotEmpty,
            ),
            children: [
              LayoutId(
                id: MobileLayoutDelegate.mapLayoutId,
                child: const HomeMapView(),
              ),
              LayoutId(
                id: MobileLayoutDelegate.navbarId,
                child: TopNavBar(
                  onMenuButtonPressed: () => scaffoldKey.currentState?.openDrawer(),
                ),
              ),
              LayoutId(
                id: MobileLayoutDelegate.cardLayoutId,
                child: BlocBuilder<HomeBloc, HomeState>(
                  builder: (context, state) {
                    final order = state.currentOrder;
                    return AnimatedSwitcher(
                        duration: AnimationDuration.pageStateTransitionMobile,
                        child: switch (state.driverStatus) {
                          HomeStateDriverStatus.accessDenied => const Text('access denied'),
                          HomeStateDriverStatus.initial => const SizedBox(),
                          HomeStateDriverStatus.loading => const SizedBox(),
                          HomeStateDriverStatus.online => state.orderRequests.isEmpty
                              ? OnlineOfflineSheet(state: state)
                              : OrderRequestsPageView(requests: state.orderRequests),
                          HomeStateDriverStatus.offline => OnlineOfflineSheet(state: state),
                          HomeStateDriverStatus.onTrip => switch (order?.status) {
                              Enum$OrderStatus.WaitingForPostPay => OrderSummary(order: order!),
                              _ => switch (state.page) {
                                  OnTripPage.overview => ActiveOrderSheet(),
                                  OnTripPage.chat => ChatSheet(),
                                },
                            },
                        });
                  },
                ),
              ),
              LayoutId(
                id: MobileLayoutDelegate.navigateButtonId,
                child: const NavigateButton(),
              ),
              LayoutId(
                id: MobileLayoutDelegate.searchRadiusButtonId,
                child: const DriverSearchRadiusButtonNew(),
              ),
              LayoutId(
                id: MobileLayoutDelegate.myLocationButtonId,
                child: const HomeMyLocationButton(),
              )
            ],
          );
        },
      ),
    );
  }
}
