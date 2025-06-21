import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:ionicons/ionicons.dart';
import 'package:rider_flutter/config/locator/locator.dart';
import 'package:rider_flutter/core/blocs/home.bloc.dart';
import 'package:rider_flutter/core/blocs/location.bloc.dart';
import 'package:rider_flutter/core/presentation/app_drawer.dart';
import 'package:rider_flutter/features/home/presentation/components/home_info_panel.dart';
import 'package:rider_flutter/features/home/presentation/components/home_map.dart';
import 'package:rider_flutter/features/home/presentation/components/my_location_button.dart';
import 'package:rider_flutter/features/home/presentation/screens/mobile_layout_delegate.dart';

class HomeScreenMobile extends StatefulWidget {
  const HomeScreenMobile({super.key});

  @override
  State<HomeScreenMobile> createState() => _HomeScreenMobileState();
}

class _HomeScreenMobileState extends State<HomeScreenMobile> {
  final _scaffoldKey = GlobalKey<ScaffoldState>();
  final _homeBloc = locator<HomeBloc>();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      key: _scaffoldKey,
      drawer: const AppDrawer(),
      body: CustomMultiChildLayout(
        delegate: MobileLayoutDelegate(),
        children: [
          LayoutId(
            id: MobileLayoutDelegate.mapLayoutId,
            child: const HomeMap(),
          ),
          LayoutId(
            id: MobileLayoutDelegate.actionButtonId,
            child: SafeArea(
              child: BlocBuilder<HomeBloc, HomeState>(
                builder: (context, state) {
                  return switch (state.mode) {
                    HomeMode.ridePreview => backButton,
                    HomeMode.preSubmission => switch (state.orderSubmissionPage) {
                        OrderSubmissionPage.welcome => menuButton,
                        OrderSubmissionPage.confirmLocation => backButton,
                        _ => const SizedBox.shrink(),
                      },
                    _ => const SizedBox.shrink(),
                  };
                },
              ),
            ),
          ),
          LayoutId(
            id: MobileLayoutDelegate.cardLayoutId,
            child: const HomeInfoPanel(),
          ),
          LayoutId(
            id: MobileLayoutDelegate.myLocationButtonId,
            child: const AppMyLocationButton(),
          ),
        ],
      ),
    );
  }

  Widget get menuButton => FloatingActionButton.small(
        onPressed: () {
          _scaffoldKey.currentState?.openDrawer();
        },
        child: const Icon(Ionicons.menu),
      );

  Widget get backButton => FloatingActionButton.small(
        onPressed: () {
          final state = locator<HomeBloc>().state;
          switch (state.mode) {
            case HomeMode.ridePreview:
              _homeBloc.add(
                HomeEvent.initializeWelcome(
                  pickupPoint: locator<LocationCubit>().state.place,
                ),
              );
            case HomeMode.preSubmission:
              _homeBloc.add(
                HomeEvent.changeOrderSubmissionPage(orderSubmissionPage: OrderSubmissionPage.rideWaypointsInput),
              );
            default:
              throw Exception('This action can only be called from ride preview or confirm location state');
          }
        },
        child: const Icon(Ionicons.arrow_back),
      );
}
