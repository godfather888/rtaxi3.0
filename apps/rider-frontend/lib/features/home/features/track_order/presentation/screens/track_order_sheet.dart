import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_common/core/enums/order_status.dart';
import 'package:rider_flutter/config/locator/locator.dart';
import 'package:flutter_common/core/theme/animation_duration.dart';
import 'package:rider_flutter/core/blocs/auth_bloc.dart';
import 'package:rider_flutter/core/blocs/home.bloc.dart';
import 'package:rider_flutter/core/blocs/location.bloc.dart';
import 'package:rider_flutter/core/enums/order_status.prod.dart';
import 'package:rider_flutter/core/graphql/fragments/active_order.fragment.graphql.dart';
import 'package:rider_flutter/features/home/features/rate_order/presentation/screens/rate_your_ride_sheet.dart';
import 'package:rider_flutter/features/home/features/track_order/presentation/screens/chat_sheet.dart';
import 'package:rider_flutter/features/home/features/track_order/presentation/screens/looking_for_driver_sheet.dart';
import 'package:rider_flutter/features/home/features/track_order/presentation/screens/pay_for_ride_sheet.dart';
import 'order_in_progress_sheet.dart';

class TrackOrderSheet extends StatefulWidget {
  final Fragment$ActiveOrder order;

  const TrackOrderSheet({
    super.key,
    required this.order,
  });

  @override
  State<TrackOrderSheet> createState() => _TrackOrderSheetState();
}

class _TrackOrderSheetState extends State<TrackOrderSheet> {
  @override
  void initState() {
    super.initState();
    locator<HomeBloc>().add(
      HomeEvent.onStarted(
        authenticated: locator<AuthBloc>().state.isAuthenticated,
        currentLocationPlace: locator<LocationCubit>().state.place,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return MultiBlocProvider(
      providers: [
        BlocProvider.value(
          value: locator<HomeBloc>(),
        ),
      ],
      child: BlocBuilder<HomeBloc, HomeState>(
        builder: (context, state) {
          return AnimatedSwitcher(
            duration: AnimationDuration.pageStateTransitionMobile,
            child: switch (state.activeOrder!.order.status.toEntity.viewMode) {
              OrderStatusViewMode.looking => LookingForDriverSheet(),
              OrderStatusViewMode.inProgress => switch (state.page) {
                  TrackOrderPage.overview => OrderInProgressSheet(
                      order: state.activeOrder!.order,
                    ),
                  TrackOrderPage.chat => ChatSheet(),
                  TrackOrderPage.payment => PayForRideSheet(),
                },
              OrderStatusViewMode.review => RateYourRideSheet(order: state.activeOrder!.order),
              OrderStatusViewMode.waitingForPayment => PayForRideSheet(),
              OrderStatusViewMode.finished => Text("Finished"),
            },
          );
        },
      ),
    );
  }
}
