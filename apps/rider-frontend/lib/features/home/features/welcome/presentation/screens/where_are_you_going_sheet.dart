import 'package:api_response/api_response.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_common/core/presentation/snackbar/snackbar.dart';
import 'package:flutter_common/core/theme/animation_duration.dart';
import 'package:generic_map/interfaces/place.dart';
import 'package:rider_flutter/config/locator/locator.dart';
import 'package:rider_flutter/core/blocs/auth_bloc.dart';
import 'package:rider_flutter/core/blocs/home.bloc.dart';
import 'package:rider_flutter/core/blocs/location.bloc.dart';
import 'package:rider_flutter/core/extensions/extensions.dart';
import 'package:flutter_common/core/presentation/app_card_sheet.dart';
import 'package:rider_flutter/core/graphql/fragments/point.extentions.dart';
import 'package:rider_flutter/core/presentation/app_favorite_location_item.dart';
import 'package:flutter_common/core/presentation/card_handle.dart';
import 'package:rider_flutter/core/presentation/place_result_item.dart';
import 'package:rider_flutter/gen/assets.gen.dart';

import '../../../../presentation/blocs/destination_suggestions.bloc.dart';
import '../components/where_are_you_going_button.dart';

class WhereAreYouGoingSheet extends StatefulWidget {
  final List<Place?> waypoints;

  const WhereAreYouGoingSheet({
    super.key,
    required this.waypoints,
  });

  @override
  State<WhereAreYouGoingSheet> createState() => _WhereAreYouGoingSheetState();
}

class _WhereAreYouGoingSheetState extends State<WhereAreYouGoingSheet> {
  bool isExpanded = true;

  @override
  Widget build(BuildContext context) {
    return AppCardSheet(
      child: BlocProvider.value(
        value: locator<DestinationSuggestionsCubit>(),
        child: BlocListener<AuthBloc, AuthState>(
          listener: (context, state) {
            switch (state) {
              case AuthState$Authenticated():
                locator<DestinationSuggestionsCubit>().onStarted();
                break;
              default:
                break;
            }
          },
          child: Padding(
            padding: EdgeInsets.only(
              left: 16,
              right: 16,
              bottom: MediaQuery.of(context).padding.bottom,
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              mainAxisSize: MainAxisSize.min,
              children: [
                CardHandle(
                  onPressed: () {
                    setState(() {
                      isExpanded = !isExpanded;
                    });
                  },
                ),
                Text(
                  context.translate.whereAreYouGoing,
                  style: context.headlineSmall,
                ),
                const SizedBox(height: 16),
                WhereAreYouGoingButton(
                  onPressed: () {
                    locator<HomeBloc>().add(HomeEvent.changeOrderSubmissionPage(
                      orderSubmissionPage: OrderSubmissionPage.rideWaypointsInput,
                    ));
                  },
                ),
                const SizedBox(height: 16),
                AnimatedCrossFade(
                  duration: AnimationDuration.pageStateTransitionMobile,
                  crossFadeState: isExpanded ? CrossFadeState.showFirst : CrossFadeState.showSecond,
                  secondChild: const SizedBox.shrink(),
                  firstChild: BlocBuilder<DestinationSuggestionsCubit, DestinationSuggestionsState>(
                    builder: (context, state) => AnimatedSwitcher(
                        duration: AnimationDuration.pageStateTransitionMobile,
                        child: switch (state.destinationSuggesionsState) {
                          ApiResponseInitial() => const SizedBox.shrink(),
                          ApiResponseLoading() => Center(child: Assets.lottie.loading.lottie(width: 100, height: 100)),
                          ApiResponseLoaded() => Column(
                              mainAxisSize: MainAxisSize.min,
                              crossAxisAlignment: CrossAxisAlignment.stretch,
                              children: [
                                Container(
                                  constraints: const BoxConstraints(maxHeight: 100),
                                  child: ListView.separated(
                                    shrinkWrap: true,
                                    padding: EdgeInsets.zero,
                                    itemBuilder: (context, index) {
                                      final item = state.destinationSuggestions!.$2[index];

                                      return PlaceResultItem(
                                          subtitle: item.address,
                                          title: item.title,
                                          isRecent: true,
                                          onPressed: () {
                                            final pickupLocation =
                                                widget.waypoints.firstOrNull ?? locator<LocationCubit>().state.place;
                                            if (pickupLocation == null) {
                                              context.showSnackBar(
                                                message: context.translate.pickupLocationNotFound,
                                              );
                                              return;
                                            }
                                            locator<HomeBloc>().add(HomeEvent.showPreview(
                                              destination: Place(
                                                item.latLng,
                                                item.address,
                                                item.title,
                                              ),
                                            ));
                                          });
                                    },
                                    separatorBuilder: (context, index) => const Divider(indent: 42),
                                    itemCount: state.destinationSuggestions!.$2.length,
                                  ),
                                ),
                                if (state.destinationSuggestions!.$1.isNotEmpty) ...[
                                  const SizedBox(height: 12),
                                  Text(
                                    context.translate.favoriteLocations,
                                    style: context.titleMedium,
                                  ),
                                  const SizedBox(height: 12),
                                  SizedBox(
                                    height: 130,
                                    child: ListView.separated(
                                      shrinkWrap: true,
                                      padding: EdgeInsets.zero,
                                      dragStartBehavior: DragStartBehavior.down,
                                      itemBuilder: (context, index) {
                                        final item = state.destinationSuggestions!.$1[index];
                                        return AppFavoriteLocationItem(
                                          type: item.type,
                                          address: item,
                                          onPressed: () {
                                            final pickupLocation =
                                                widget.waypoints.firstOrNull ?? locator<LocationCubit>().state.place;
                                            if (pickupLocation == null) {
                                              context.showSnackBar(
                                                message: context.translate.pickupLocationNotFound,
                                              );
                                              return;
                                            }
                                            locator<HomeBloc>().add(HomeEvent.showPreview(
                                              destination: Place(item.location.toLatLng, item.details, item.title),
                                            ));
                                          },
                                        );
                                      },
                                      separatorBuilder: (context, index) => const Divider(indent: 42),
                                      itemCount: state.destinationSuggestions!.$1.length,
                                    ),
                                  ),
                                ],
                              ],
                            ),
                          ApiResponseError(:final message) => Text(message),
                        }),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
