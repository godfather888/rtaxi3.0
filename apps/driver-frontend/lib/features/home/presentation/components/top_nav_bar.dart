// ignore_for_file: use_build_context_synchronously

import 'package:driver_flutter/config/locator/locator.dart';
import 'package:driver_flutter/core/datasources/location_datasource.dart';
import 'package:driver_flutter/core/enums/location_permission.dart';
import 'package:driver_flutter/core/extensions/extensions.dart';
import 'package:driver_flutter/core/graphql/schema.gql.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_common/core/color_palette/color_palette.dart';
import 'package:flutter_common/core/presentation/snackbar/snackbar.dart';
import 'package:geolocator/geolocator.dart' as geolocator;
import 'package:ionicons/ionicons.dart';

import '../blocs/home.bloc.dart';
import '../dialogs/location_permission_denied_forever_dialog.dart';
import '../dialogs/location_permission_request_dialog.dart';

class TopNavBar extends StatelessWidget {
  final Function()? onMenuButtonPressed;
  final BorderRadiusGeometry borderRadius;

  const TopNavBar({
    super.key,
    this.onMenuButtonPressed,
    this.borderRadius = const BorderRadius.all(
      Radius.circular(12),
    ),
  });

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      bottom: false,
      child: Container(
        padding: const EdgeInsets.all(8),
        decoration: BoxDecoration(
          color: ColorPalette.neutralVariant99,
          borderRadius: borderRadius,
          boxShadow: [
            BoxShadow(
              color: const Color(0xff64748B).withValues(alpha: 0.08),
              blurRadius: 8,
              offset: const Offset(2, 4),
            ),
          ],
        ),
        child: BlocBuilder<HomeBloc, HomeState>(
          builder: (context, state) {
            return Stack(
              children: [
                if (onMenuButtonPressed != null)
                  Align(
                    alignment: Alignment.centerLeft,
                    child: CupertinoButton(
                      onPressed: onMenuButtonPressed,
                      padding: const EdgeInsets.all(8),
                      minimumSize: Size(0, 0),
                      child: const Icon(
                        Ionicons.menu,
                        color: ColorPalette.neutral50,
                      ),
                    ),
                  ),
                Positioned.fill(
                  child: Center(
                    child: Builder(
                      builder: (context) {
                        switch (state.driverStatus) {
                          case HomeStateDriverStatus.initial:
                            return const SizedBox();
                          case HomeStateDriverStatus.loading:
                            return const CupertinoActivityIndicator();
                          case HomeStateDriverStatus.online:
                            return Text(
                              context.translate.online,
                              style: context.titleSmall,
                              textAlign: TextAlign.center,
                            );
                          case HomeStateDriverStatus.offline:
                            return Text(
                              context.translate.offline,
                              style: context.titleSmall,
                              textAlign: TextAlign.center,
                            );
                          case HomeStateDriverStatus.onTrip:
                            return Text(
                              context.translate.onTrip,
                              style: context.titleSmall,
                              textAlign: TextAlign.center,
                            );
                          case HomeStateDriverStatus.accessDenied:
                            return Text(
                              context.translate.accessDenied,
                              style: context.titleSmall,
                              textAlign: TextAlign.center,
                            );
                        }
                      },
                    ),
                  ),
                ),
                Align(
                  alignment: Alignment.centerRight,
                  child: switch (state.driverStatus) {
                    HomeStateDriverStatus.initial => const SizedBox(),
                    HomeStateDriverStatus.loading => const SizedBox(),
                    HomeStateDriverStatus.accessDenied => const SizedBox(),
                    HomeStateDriverStatus.onTrip => const SizedBox(),
                    HomeStateDriverStatus.online => CupertinoSwitch(
                        value: true,
                        onChanged: (_) async {
                          locator<HomeBloc>().onStatusChanged(
                            Enum$DriverStatus.Offline,
                          );
                        },
                        activeTrackColor: ColorPalette.semanticgreen60,
                      ),
                    HomeStateDriverStatus.offline => CupertinoSwitch(
                        value: false,
                        onChanged: (_) async {
                          final homeBloc = locator<HomeBloc>();

                          final locationDatasource = locator<LocationDatasource>();
                          final locationPermissionGranted = await locationDatasource.getLocationPermissionStatus();

                          switch (locationPermissionGranted) {
                            case LocationPermission.denied:
                              final permissionResult = await showDialog<bool>(
                                context: context,
                                useSafeArea: false,
                                builder: (context) => const LocationPermissionRequestDialog(),
                              );
                              if (permissionResult == true) {
                                final permissionStatus = await locationDatasource.requestLocationPermission();
                                if (permissionStatus == LocationPermission.deniedForever) {
                                  return;
                                }
                              }
                              break;

                            case LocationPermission.deniedForever:
                              final permissionResult = await showDialog<bool>(
                                context: context,
                                useSafeArea: false,
                                builder: (context) => const LocationPermissionDeniedForeverDialog(),
                              );
                              if (permissionResult == true) {
                                final couldBeOpened = await geolocator.Geolocator.openLocationSettings();
                                if (!couldBeOpened) {
                                  context.showSnackBar(
                                    message:
                                        "Could not open location settings, please enable location permissions manually.",
                                  );
                                }
                              }
                              return;

                            case LocationPermission.whileInUse:
                              context.showSnackBar(
                                message:
                                    "Background location updates are not allowed, Please allow this permission in your phone settings for optimal experience.",
                              );
                              break;

                            case LocationPermission.always:
                              break;
                          }

                          final locationServiceEnabled = await locationDatasource.isLocationServiceEnabled();
                          if (!locationServiceEnabled) {
                            final serviceEnabled = await locationDatasource.requestLocationService();
                            if (!serviceEnabled) {
                              return;
                            }
                          }
                          homeBloc.onStatusChanged(Enum$DriverStatus.Online);
                        },
                        activeTrackColor: ColorPalette.semanticgreen60,
                      ),
                  },
                ),
              ],
            );
          },
        ),
      ),
    );
  }
}
