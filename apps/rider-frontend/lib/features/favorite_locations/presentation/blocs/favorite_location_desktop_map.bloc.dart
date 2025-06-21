import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:generic_map/generic_map.dart';
import 'package:injectable/injectable.dart';
import 'package:flutter_common/core/presentation/markers/app_marker_address.dart';
import 'package:latlong2/latlong.dart';
import 'package:rider_flutter/core/graphql/fragments/favorite_location.graphql.dart';

part 'favorite_location_desktop_map.state.dart';
part 'favorite_location_desktop_map.bloc.freezed.dart';

@lazySingleton
class FavoriteLocationsDesktopMapCubit extends Cubit<FavoriteLocationsDesktopMapState> {
  FavoriteLocationsDesktopMapCubit()
      : super(
          const FavoriteLocationsDesktopMapState.initial(),
        );

  void onStarted() {
    final oldState = state;
    emit(
      const FavoriteLocationsDesktopMapState.initial(),
    );
    emit(oldState);
  }

  void onStopped() {
    emit(
      const FavoriteLocationsDesktopMapState.initial(),
    );
  }

  void showList({
    required List<Fragment$FavoriteLocation> list,
  }) {
    //throw UnimplementedError();
    emit(
      FavoriteLocationsDesktopMapState.list(
        locations: list,
      ),
    );
  }

  void viewOne({
    required String name,
    required Place location,
  }) {
    emit(
      FavoriteLocationsDesktopMapState.viewOne(
        name: name,
        location: location,
      ),
    );
  }

  void locate({
    required Place? centerLocation,
  }) {
    emit(
      FavoriteLocationsDesktopMapState.locate(
        centerLocation: centerLocation,
      ),
    );
  }
}
