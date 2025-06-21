import 'package:flutter/material.dart';
import 'package:generic_map/interfaces/place.dart';
import 'package:rider_flutter/config/locator/locator.dart';
import 'package:rider_flutter/core/blocs/location.bloc.dart';
import 'package:rider_flutter/core/blocs/place_lookup.bloc.dart';
import 'package:rider_flutter/core/extensions/extensions.dart';
import 'package:rider_flutter/gen/assets.gen.dart';

import 'place_result_item.dart';

class PlaceLookupStateView extends StatelessWidget {
  final PlaceLookupState state;
  final Function(Place) onItemSelected;
  final Widget? initialStateView;

  const PlaceLookupStateView({
    super.key,
    required this.state,
    required this.onItemSelected,
    this.initialStateView,
  });

  @override
  Widget build(BuildContext context) {
    return AnimatedSwitcher(
      duration: const Duration(milliseconds: 300),
      child: switch (state) {
        PlaceLookupState$MoreCharacters() => Text(context.translate.enterAtLeast3Characters),
        PlaceLookupState$NoResults() => Text(context.translate.noResults),
        PlaceLookupState$Initial() => initialStateView ?? const SizedBox(),
        PlaceLookupState$Loading() => Assets.lottie.loading.lottie(),
        PlaceLookupState$Loaded(:final places) => Column(
            mainAxisSize: MainAxisSize.min,
            children: places
                .map(
                  (place) => PlaceResultItem(
                    onPressed: () => onItemSelected(place),
                    title: place.title,
                    subtitle: place.address,
                    trailing: locator<LocationCubit>().state.distanceTo(
                          place.latLng,
                          context,
                        ),
                  ),
                )
                .separated(
                  const Divider(
                    thickness: 0.3,
                    indent: 48,
                    height: 16,
                  ),
                ),
          ),
        PlaceLookupState$Error(:final message) => Text(message),
      },
    );
  }
}
