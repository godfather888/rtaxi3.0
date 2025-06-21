import 'package:driver_flutter/core/datasources/location_update_datasource.dart';
import 'package:driver_flutter/core/enums/location_permission.dart';
import 'package:driver_flutter/core/graphql/fragments/point.fragment.graphql.dart';
import 'package:driver_flutter/features/home/domain/repositories/home_repository.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter_common/core/entities/driver_location.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:hydrated_bloc/hydrated_bloc.dart';
import 'package:injectable/injectable.dart';
import 'package:driver_flutter/core/datasources/location_datasource.dart';

part 'location.event.dart';
part 'location.state.dart';
part 'location.bloc.freezed.dart';
part 'location.bloc.g.dart';

@LazySingleton()
class LocationBloc extends HydratedBloc<LocationEvent, LocationState> {
  final LocationDatasource locationDatasource;
  final HomeRepository homeRepository;
  final LocationUpdateDatasource locationUpdateDatasource;

  LocationBloc(
    this.locationDatasource,
    this.locationUpdateDatasource,
    this.homeRepository,
  ) : super(const LocationState.loading()) {
    on<LocationEvent>(
      (event, emit) async {
        switch (event) {
          case LocationEvent$FetchCurrentLocation():
            locationDatasource.getCurrentLocation();
            break;

          case LocationEvent$StartGettingLocationUpdates():
            final permissionStatus = await locationDatasource.getLocationPermissionStatus();
            switch (permissionStatus) {
              case LocationPermission.whileInUse:
                emit(const LocationState.error(error: LocationError.onlyAllowedWhileInUse));
                break;
              case LocationPermission.denied:
                final permission = await locationDatasource.requestLocationPermission();
                if (permission == LocationPermission.denied || permission == LocationPermission.deniedForever) {
                  emit(const LocationState.error(error: LocationError.permissionDenied));
                }
                break;
              case LocationPermission.deniedForever:
                emit(const LocationState.error(error: LocationError.permissionDeniedForever));
                break;
              case LocationPermission.always:
                break;
            }

            final serviceEnabled = await locationDatasource.isLocationServiceEnabled();
            if (!serviceEnabled) {
              final serviceEnabledResult = await locationDatasource.requestLocationService();
              if (!serviceEnabledResult) {
                emit(const LocationState.error(error: LocationError.serviceDisabled));
                return;
              }
            }

            locationDatasource.getCurrentLocation();
            locationDatasource.startGettingLocationUpdates();
            await emit.forEach(locationDatasource.driverLocation, onData: (onData) {
              if (kDebugMode) {
                print("LocationBloc: onData: $onData");
              }
              if (onData.data != null) {
                homeRepository.updateDriverLocation(location: onData.data!);
              }
              return LocationState.determined(location: onData.data!);
            });
            break;

          case LocationEvent$StopGettingLocationUpdates():
            locationDatasource.stopGettingLocationUpdates();
            break;

          case LocationEvent$UpdateDriverLocation(:final location):
            locationUpdateDatasource.updateDriverLocation(location: location);
            break;
        }
      },
    );
  }

  @override
  LocationState? fromJson(Map<String, dynamic> json) => LocationState.fromJson(json);

  @override
  Map<String, dynamic>? toJson(LocationState state) => state.toJson();

  void fetchCurrentLocation() => add(const LocationEvent.fetchCurrentLocation());

  void startGettingLocationUpdates() => add(const LocationEvent.startGettingLocationUpdates());

  void stopGettingLocationUpdates() => add(const LocationEvent.stopGettingLocationUpdates());
}
