import 'package:auto_route/auto_route.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_common/core/presentation/snackbar/snackbar.dart';
import 'package:rider_flutter/config/locator/locator.dart';
import 'package:rider_flutter/core/blocs/auth_bloc.dart';
import 'package:rider_flutter/core/blocs/home.bloc.dart';
import 'package:rider_flutter/core/blocs/location.bloc.dart';
import 'package:rider_flutter/core/blocs/settings.bloc.dart';
import 'package:rider_flutter/core/extensions/extensions.dart';
import 'package:rider_flutter/features/home/presentation/blocs/place_confirm.bloc.dart';

import '../blocs/destination_suggestions.bloc.dart';
import 'home_screen.desktop.dart';
import 'home_screen.mobile.dart';

@RoutePage()
class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  late final AppLifecycleListener _listener;

  final locationCubit = locator<LocationCubit>();
  final homeCubit = locator<HomeBloc>();
  final authBloc = locator<AuthBloc>();
  final settingsCubit = locator<SettingsCubit>();

  @override
  void initState() {
    super.initState();
    _listener = AppLifecycleListener(
      onStateChange: _onStateChanged,
    );
    locationCubit.fetchCurrentLocation(
      language: settingsCubit.state.locale,
      mapProvider: settingsCubit.state.mapProvider,
    );

    switch (locationCubit.state) {
      case LocationState$Determined(:final place):
        homeCubit.add(
          HomeEvent.initializeWelcome(
            pickupPoint: place,
          ),
        );
      case _:
    }
    homeCubit.add(
      HomeEvent.onStarted(
        authenticated: authBloc.state.isAuthenticated,
        currentLocationPlace: locationCubit.state.place,
      ),
    );

    switch (authBloc.state) {
      case AuthState$Authenticated():
        authBloc.requestUserInfo();
        locator<DestinationSuggestionsCubit>().onStarted();
      case _:
    }
  }

  @override
  void dispose() {
    _listener.dispose();
    super.dispose();
  }

  void _onStateChanged(AppLifecycleState state) {
    switch (state) {
      case AppLifecycleState.resumed:
        homeCubit.add(
          HomeEvent.onStarted(
            authenticated: authBloc.state.isAuthenticated,
            currentLocationPlace: locationCubit.state.place,
          ),
        );
        break;

      default:
        break;
    }
  }

  @override
  Widget build(BuildContext context) {
    return MultiBlocProvider(
      providers: [
        BlocProvider.value(
          value: locator<LocationCubit>(),
        ),
        BlocProvider.value(
          value: locator<HomeBloc>(),
        ),
        BlocProvider.value(
          value: locator<PlaceConfirmCubit>(),
        )
      ],
      child: MultiBlocListener(
        listeners: [
          BlocListener<AuthBloc, AuthState>(
            listener: (context, state) {
              homeCubit.add(
                HomeEvent.onStarted(
                  authenticated: state.isAuthenticated,
                  currentLocationPlace: locationCubit.state.place,
                ),
              );
              locator<DestinationSuggestionsCubit>().onStarted();
            },
          ),
          BlocListener<LocationCubit, LocationState>(
            listenWhen: (previous, current) => previous.place == null && current.place != null,
            listener: (context, state) {
              if (homeCubit.state.mode == HomeMode.preSubmission || homeCubit.state.mode == HomeMode.loading) {
                homeCubit.add(HomeEvent.initializeWelcome(pickupPoint: state.place));
                return;
              }
            },
          ),
          BlocListener<HomeBloc, HomeState>(
            listener: (context, state) {
              if (state.ridePreviewFareResponse.isError) {
                context.showSnackBar(
                  message: state.ridePreviewFareResponse.errorMessage ?? context.translate.somethingWentWrong,
                );
              }
              if (state.cancelOrderResponse.isError) {
                context.showSnackBar(
                  message: state.cancelOrderResponse.errorMessage ?? context.translate.somethingWentWrong,
                );
              }
            },
          ),
        ],
        child: context.responsive(
          const HomeScreenMobile(),
          xl: const HomeScreenDesktop(),
        ),
      ),
    );
  }
}
