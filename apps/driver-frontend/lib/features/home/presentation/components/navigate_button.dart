import 'package:driver_flutter/core/extensions/extensions.dart';
import 'package:driver_flutter/core/graphql/fragments/current_order.extentions.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_common/core/presentation/buttons/app_primary_button.dart';
import 'package:ionicons/ionicons.dart';

import '../blocs/home.bloc.dart';
import '../dialogs/launch_map_dialog.dart';

class NavigateButton extends StatelessWidget {
  const NavigateButton({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<HomeBloc, HomeState>(
      builder: (context, state) {
        switch (state.driverStatus) {
          case HomeStateDriverStatus.onTrip:
            return AppPrimaryButton(
              onPressed: () {
                final place = state.currentOrder?.wayPoints[(state.currentOrder?.destinationArrivedTo ?? -1) + 1];
                showDialog(
                  context: context,
                  useSafeArea: false,
                  builder: (context) => LaunchMapDialog(
                    place: place!,
                  ),
                );
              },
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  const Icon(Ionicons.navigate_circle),
                  const SizedBox(width: 4),
                  Text(context.translate.navigate),
                ],
              ),
            );
          default:
            return const SizedBox();
        }
      },
    );
  }
}
