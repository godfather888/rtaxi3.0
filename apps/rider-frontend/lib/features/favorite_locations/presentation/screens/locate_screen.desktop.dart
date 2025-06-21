import 'package:auto_route/auto_route.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:generic_map/interfaces/place.dart';
import 'package:ionicons/ionicons.dart';
import 'package:rider_flutter/config/env.dart';
import 'package:rider_flutter/config/locator/locator.dart';
import 'package:rider_flutter/core/blocs/location.bloc.dart';
import 'package:rider_flutter/core/blocs/place_lookup.bloc.dart';
import 'package:rider_flutter/core/blocs/settings.bloc.dart';
import 'package:rider_flutter/core/extensions/extensions.dart';
import 'package:flutter_common/core/presentation/buttons/app_primary_button.dart';
import 'package:flutter_common/core/presentation/responsive_dialog/app_top_bar.dart';
import 'package:rider_flutter/core/presentation/place_lookup_state_view.dart';
import 'package:rider_flutter/features/favorite_locations/presentation/blocs/favorite_location_desktop_map.bloc.dart';

class LocateFavoriteLocationScreenDesktop extends StatefulWidget {
  final Place? centerLocation;

  const LocateFavoriteLocationScreenDesktop({
    super.key,
    this.centerLocation,
  });

  @override
  State<LocateFavoriteLocationScreenDesktop> createState() => _LocateFavoriteLocationScreenDesktopState();
}

class _LocateFavoriteLocationScreenDesktopState extends State<LocateFavoriteLocationScreenDesktop> {
  @override
  void initState() {
    locator<FavoriteLocationsDesktopMapCubit>().locate(
      centerLocation: widget.centerLocation,
    );
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 16),
      color: context.theme.scaffoldBackgroundColor,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          AppTopBar(
            title: context.translate.whereIsYourNewFavoriteLocation,
            subtitle: context.translate.locateFavoriteLocationDescription,
          ),
          const SizedBox(
            height: 16,
          ),
          TextField(
            onChanged: (value) {
              final settingsState = locator<SettingsCubit>().state;
              final locationState = locator<LocationCubit>().state;
              locator<PlaceLookupBloc>().add(
                PlaceLookupEvent.onQueryChanged(
                  query: value,
                  latLng: locationState.place?.latLng,
                  radius: Env.placeSearchSearchRadius,
                  language: settingsState.locale,
                  mapProvider: settingsState.mapProvider,
                ),
              );
            },
            decoration: InputDecoration(
              prefixIcon: const Icon(Ionicons.search),
              hintText: context.translate.searchLocation,
            ),
          ),
          const SizedBox(
            height: 16,
          ),
          Expanded(
            child: BlocBuilder<PlaceLookupBloc, PlaceLookupState>(
              builder: (context, state) {
                return PlaceLookupStateView(
                  state: state,
                  onItemSelected: (place) {
                    locator<FavoriteLocationsDesktopMapCubit>().locate(
                      centerLocation: place,
                    );
                  },
                );
              },
            ),
          ),
          BlocBuilder<FavoriteLocationsDesktopMapCubit, FavoriteLocationsDesktopMapState>(
            builder: (context, state) {
              final isDisabled = switch (state) {
                FavoriteLocationsDesktopMapState$Locate(:final centerLocation) => centerLocation == null,
                _ => true,
              };

              return AppPrimaryButton(
                isDisabled: isDisabled,
                onPressed: () {
                  final centerLocation = switch (state) {
                    FavoriteLocationsDesktopMapState$Locate(:final centerLocation) when centerLocation != null =>
                      centerLocation,
                    _ => throw Exception('Invalid map state'),
                  };
                  context.router.maybePop(centerLocation);
                },
                child: Text(
                  context.translate.confirm,
                ),
              );
            },
          ),
        ],
      ),
    );
  }
}
