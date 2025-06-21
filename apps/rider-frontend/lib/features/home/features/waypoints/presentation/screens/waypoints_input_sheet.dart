import 'package:api_response/api_response.dart';
import 'package:auto_route/auto_route.dart';
import 'package:collection/collection.dart';
import 'package:dotted_line/dotted_line.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_common/config/constants.dart';
import 'package:flutter_common/core/color_palette/color_palette.dart';
import 'package:generic_map/interfaces/place.dart';
import 'package:rider_flutter/config/env.dart';
import 'package:rider_flutter/config/locator/locator.dart';
import 'package:rider_flutter/config/router/app_router.dart';
import 'package:rider_flutter/core/blocs/auth_bloc.dart';
import 'package:rider_flutter/core/blocs/home.bloc.dart';
import 'package:rider_flutter/core/blocs/location.bloc.dart';
import 'package:rider_flutter/core/blocs/place_lookup.bloc.dart';
import 'package:rider_flutter/core/blocs/settings.bloc.dart';
import 'package:rider_flutter/core/extensions/extensions.dart';
import 'package:flutter_common/core/presentation/buttons/app_close_button.dart';
import 'package:flutter_common/core/presentation/buttons/app_primary_button.dart';
import 'package:rider_flutter/core/presentation/place_lookup_state_view.dart';
import 'package:rider_flutter/core/presentation/place_result_item.dart';
import 'package:flutter_common/core/presentation/waypoints_view/icon_destination.dart';
import 'package:flutter_common/core/presentation/waypoints_view/line_connect_destinations.dart';
import 'package:rider_flutter/features/home/presentation/blocs/destination_suggestions.bloc.dart';
import 'package:rider_flutter/features/home/presentation/blocs/place_confirm.bloc.dart';

import '../components/add_stop_button.dart';
import '../components/location_textfield.dart';

class WaypointsInputSheet extends StatefulWidget {
  final List<Place?> waypoints;

  const WaypointsInputSheet({
    super.key,
    required this.waypoints,
  });

  @override
  State<WaypointsInputSheet> createState() => _WaypointsInputSheetState();
}

class _WaypointsInputSheetState extends State<WaypointsInputSheet> {
  final placeLookupBloc = locator<PlaceLookupBloc>();
  final homeBloc = locator<HomeBloc>();

  @override
  void initState() {
    super.initState();
    if (homeBloc.state.selectedWaypointIndex == null) {
      homeBloc.add(HomeEvent.focusOnWaypoint(index: 1));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      color: ColorPalette.neutralVariant99,
      child: MultiBlocProvider(
        providers: [
          BlocProvider.value(
            value: placeLookupBloc,
          ),
          BlocProvider.value(
            value: locator<DestinationSuggestionsCubit>(),
          )
        ],
        child: SafeArea(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Padding(
                padding: const EdgeInsets.only(left: 16, right: 16, top: 16),
                child: Stack(
                  children: [
                    AppCloseButton(
                      onPressed: () {
                        homeBloc
                            .add(HomeEvent.changeOrderSubmissionPage(orderSubmissionPage: OrderSubmissionPage.welcome));
                      },
                    ),
                    Center(
                      child: Text(
                        context.translate.selectDestinations,
                        style: context.titleMedium,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 20),
              BlocBuilder<HomeBloc, HomeState>(
                builder: (context, state) {
                  return Expanded(
                    child: SingleChildScrollView(
                      padding: const EdgeInsets.symmetric(horizontal: 16),
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Row(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Expanded(
                                child: Column(
                                  mainAxisSize: MainAxisSize.min,
                                  children: widget.waypoints
                                      .mapIndexed(
                                        (index, waypoint) => Padding(
                                          padding: const EdgeInsets.only(bottom: 16),
                                          child: LocationTextfield(
                                            // key: UniqueKey(),
                                            isFocused: state.selectedWaypointIndex == index,
                                            onRemoveStop: () => homeBloc.add(HomeEvent.onRemoveStop(index: index)),
                                            index: index,
                                            totalCount: widget.waypoints.length,
                                            initialValue: waypoint,
                                            onFocused: () {
                                              placeLookupBloc.onStarted();
                                              locator<HomeBloc>().add(HomeEvent.focusOnWaypoint(index: index));
                                            },
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
                                            onMapPressed: (value) {
                                              showConfirmLocation(
                                                widget.waypoints[index] ??
                                                    locator<LocationCubit>().state.place ??
                                                    Constants.defaultLocation,
                                              );
                                            },
                                          ),
                                        ),
                                      )
                                      .toList(),
                                ),
                              ),
                              const SizedBox(width: 8),
                              Column(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  const SizedBox(
                                    height: 10,
                                  ),
                                  ...widget.waypoints.mapIndexed((index, e) {
                                    return Column(
                                      children: [
                                        const SizedBox(
                                          height: 6,
                                        ),
                                        IconDestination(
                                          isPickupPoint: index == 0,
                                        ),
                                        const SizedBox(
                                          height: 6,
                                        ),
                                        if (index != widget.waypoints.length - 1) const LineConnectDestinations(),
                                      ],
                                    );
                                  }),
                                  if (widget.waypoints.length < 3) ...[
                                    const DottedLine(
                                      direction: Axis.vertical,
                                      dashColor: ColorPalette.neutral90,
                                      lineThickness: 3,
                                      lineLength: 24,
                                    ),
                                    const SizedBox(
                                      height: 6,
                                    ),
                                    AddSpotButton(onPressed: () => homeBloc.add(HomeEvent.onAddStop()))
                                  ]
                                ],
                              )
                            ],
                          ),
                          const SizedBox(height: 16),
                          BlocBuilder<PlaceLookupBloc, PlaceLookupState>(
                            builder: (context, state) => PlaceLookupStateView(
                              state: state,
                              initialStateView: BlocBuilder<DestinationSuggestionsCubit, DestinationSuggestionsState>(
                                builder: (context, state) => switch (state.destinationSuggesionsState) {
                                  ApiResponseLoaded() => Column(
                                      mainAxisSize: MainAxisSize.min,
                                      children: [
                                        for (var place in state.destinationSuggestions!.$2)
                                          PlaceResultItem(
                                            onPressed: () => showConfirmLocation(place),
                                            title: place.title,
                                            trailing: locator<LocationCubit>().state.distanceTo(
                                                  place.latLng,
                                                  context,
                                                ),
                                            subtitle: place.address,
                                            isRecent: true,
                                          ),
                                      ].separated(
                                        const Divider(
                                          thickness: 0.3,
                                          indent: 48,
                                          height: 16,
                                        ),
                                      ),
                                    ),
                                  _ => const SizedBox(),
                                },
                              ),
                              onItemSelected: showConfirmLocation,
                            ),
                          ),
                          const SizedBox(height: 16),
                        ],
                      ),
                    ),
                  );
                },
              ),
              Padding(
                padding: const EdgeInsets.only(left: 16, right: 16, bottom: 16),
                child: AppPrimaryButton(
                  isDisabled: widget.waypoints.nonNulls.length != widget.waypoints.length,
                  onPressed: () {
                    final isAuthenticated = locator<AuthBloc>().state.isAuthenticated;
                    if (isAuthenticated) {
                      homeBloc.add(HomeEvent.showPreview());
                    } else {
                      context.router.push(const AuthRoute());
                    }
                  },
                  child: Text(context.translate.confirm),
                ),
              )
            ],
          ),
        ),
      ),
    );
  }

  void showConfirmLocation(Place place) {
    locator<HomeBloc>().add(HomeEvent.showConfirmWaypoint(selectedLocation: place));
    locator<PlaceConfirmCubit>().onLoaded(place: place);
  }
}
