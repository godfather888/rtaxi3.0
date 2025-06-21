import 'package:auto_route/auto_route.dart';
import 'package:flutter/material.dart';
import 'package:rider_flutter/core/extensions/extensions.dart';
import 'package:rider_flutter/core/graphql/fragments/past_order.fragment.graphql.dart';
import 'package:rider_flutter/features/ride_history/presentation/screens/ride_history_details_screen.desktop.dart';
import 'package:rider_flutter/features/ride_history/presentation/screens/ride_history_details_screen.mobile.dart';

@RoutePage()
class RideHistoryDetailsScreen extends StatelessWidget {
  final Fragment$PastOrder entity;

  const RideHistoryDetailsScreen({
    super.key,
    required this.entity,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: context.theme.scaffoldBackgroundColor,
      body: context.responsive(
        RideHistoryDetailsScreenMobile(entity: entity),
        xl: RideHistoryDetailsScreenDesktop(entity: entity),
      ),
    );
  }
}
