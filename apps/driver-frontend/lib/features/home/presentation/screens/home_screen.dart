import 'package:auto_route/auto_route.dart';
import 'package:driver_flutter/core/blocs/auth_bloc.dart';
import 'package:driver_flutter/core/blocs/location.bloc.dart';
import 'package:driver_flutter/core/router/app_router.dart';
import 'package:driver_flutter/features/home/presentation/blocs/home.bloc.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:driver_flutter/config/locator/locator.dart';
import 'package:driver_flutter/core/extensions/extensions.dart';
import 'package:flutter_ringtone_player/flutter_ringtone_player.dart';

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

  @override
  void initState() {
    _listener = AppLifecycleListener(
      onStateChange: _onStateChanged,
    );
    locator<AuthBloc>().requestUserInfo();
    locator<HomeBloc>().onStarted();
    super.initState();
  }

  @override
  void dispose() {
    _listener.dispose();
    super.dispose();
  }

  void _onStateChanged(AppLifecycleState state) {
    switch (state) {
      case AppLifecycleState.resumed:
        locator<HomeBloc>().onStarted();

        locator<AuthBloc>().requestUserInfo();

        break;

      default:
        break;
    }
  }

  @override
  Widget build(BuildContext context) {
    final locationBloc = locator<LocationBloc>();
    final homeBloc = locator<HomeBloc>();
    return Scaffold(
      body: MultiBlocProvider(
        providers: [
          BlocProvider.value(
            value: locator<HomeBloc>(),
          ),
          BlocProvider.value(
            value: locator<LocationBloc>(),
          ),
        ],
        child: MultiBlocListener(
          listeners: [
            BlocListener<LocationBloc, LocationState>(
              listener: (context, state) {
                switch (state) {
                  case LocationState$Error():
                    switch (locator<HomeBloc>().state.driverStatus) {
                      case HomeStateDriverStatus.online:
                      default:
                        break;
                    }
                    break;

                  default:
                    break;
                }
              },
            ),
            BlocListener<HomeBloc, HomeState>(
              listenWhen: (previous, current) {
                return previous.driverStatus != current.driverStatus;
              },
              listener: (context, state) {
                switch (state.driverStatus) {
                  case HomeStateDriverStatus.initial:
                    homeBloc.onStarted();
                    locator<AuthBloc>().requestUserInfo();
                    break;

                  case HomeStateDriverStatus.online:
                  case HomeStateDriverStatus.onTrip:
                    locationBloc.startGettingLocationUpdates();
                    break;

                  case HomeStateDriverStatus.offline:
                    locationBloc.stopGettingLocationUpdates();
                    break;

                  case HomeStateDriverStatus.accessDenied:
                    locator<AuthBloc>().onLoggedOut();
                    context.router.replace(const AuthRoute());
                    break;

                  default:
                    break;
                }
              },
            ),
            // if new request added play sound
            BlocListener<HomeBloc, HomeState>(
              listenWhen: (previous, current) {
                switch (current.driverStatus) {
                  case HomeStateDriverStatus.online:
                    switch (previous.driverStatus) {
                      case HomeStateDriverStatus.online:
                        return current.orderRequests.length > previous.orderRequests.length;
                      default:
                        return current.orderRequests.isNotEmpty;
                    }
                  default:
                    return false;
                }
              },
              listener: (context, state) {
                FlutterRingtonePlayer().play(
                  fromAsset: "assets/notification.mp3",
                  looping: false,
                  volume: 1.0,
                  asAlarm: true,
                );
              },
            )
          ],
          child: context.responsive(
            const HomeScreenMobile(),
            xl: const HomeScreenDesktop(),
          ),
        ),
      ),
    );
  }
}
