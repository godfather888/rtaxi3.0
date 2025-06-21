import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:generic_map/interfaces/place.dart';
import 'package:rider_flutter/config/locator/locator.dart';
import 'package:rider_flutter/core/blocs/home.bloc.dart';
import 'package:rider_flutter/core/extensions/extensions.dart';
import 'package:flutter_common/core/presentation/app_card_sheet.dart';
import 'package:flutter_common/core/presentation/buttons/app_primary_button.dart';
import 'package:rider_flutter/core/presentation/place_result_item.dart';
import 'package:rider_flutter/features/home/presentation/blocs/place_confirm.bloc.dart';

class PlaceConfirmSheet extends StatelessWidget {
  final List<Place?> waypoints;
  final Place selectedLocation;
  final int index;

  const PlaceConfirmSheet({
    super.key,
    required this.waypoints,
    required this.index,
    required this.selectedLocation,
  });

  @override
  Widget build(BuildContext context) {
    return AppCardSheet(
      child: SafeArea(
        top: false,
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Text(
                "Drag the map to adjust the location",
                style: context.titleMedium,
                textAlign: TextAlign.start,
              ),
              const SizedBox(
                height: 8,
              ),
              BlocBuilder<PlaceConfirmCubit, PlaceConfirmState>(
                builder: (context, state) {
                  return SizedBox(
                    height: 75,
                    child: PlaceResultItem(
                      subtitle: state.place.data?.address ?? "-",
                      title: state.place.data?.title,
                      onPressed: null,
                    ),
                  );
                },
              ),
              // TODO: Add search
              // const SizedBox(height: 16),
              // TextField(
              //   decoration: InputDecoration(
              //     hintText: index == 0
              //         ? context.translate.searchForPickupLocation
              //         : context.translate.searchForDropoffLocation,
              //     fillColor: Colors.transparent,
              //     prefixIcon: const Icon(
              //       Ionicons.search,
              //     ),
              //   ),
              // ),
              const SizedBox(height: 28),
              BlocBuilder<PlaceConfirmCubit, PlaceConfirmState>(
                builder: (context, state) {
                  return SizedBox(
                    width: double.infinity,
                    child: AppPrimaryButton(
                      isDisabled: state.place.data == null,
                      onPressed: () => locator<HomeBloc>().add(HomeEvent.onWaypointConfirmed()),
                      child: Text(title(context)),
                    ),
                  );
                },
              )
            ],
          ),
        ),
      ),
    );
  }

  String title(BuildContext context) => index == 0 ? context.translate.confirmPickup : context.translate.confirmDropoff;
}
