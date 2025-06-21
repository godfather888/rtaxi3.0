import 'package:api_response/api_response.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:injectable/injectable.dart';

import 'package:rider_flutter/core/graphql/documents/favorite_locations.graphql.dart';
import 'package:rider_flutter/features/favorite_locations/domain/repositories/favorite_locations_repository.dart';

part 'favorite_locations.state.dart';
part 'favorite_locations.bloc.freezed.dart';

@lazySingleton
class FavoriteLocationsCubit extends Cubit<FavoriteLocationsState> {
  final FavoriteLocationsRepository repository;

  FavoriteLocationsCubit(this.repository) : super(const FavoriteLocationsState());

  void onStarted() async {
    emit(
      state.copyWith(
        favoriteLocationsState: ApiResponse.loading(),
      ),
    );
    final favoriteLocationsResponse = await repository.getFavoriteLocations();
    // result.fold((failure) => emit(FavoriteLocationsState.error(failure.errorMessage)), (locations) {
    //   final hasHome = locations.any((element) => element.type == AddressType.home);
    //   final hasWork = locations.any((element) => element.type == AddressType.work);
    //   final result = <(AddressType, FavoriteLocationEntity?)>[];
    //   if (!hasHome) {
    //     result.add((AddressType.home, null));
    //   }
    //   if (!hasWork) {
    //     result.add((AddressType.work, null));
    //   }
    //   result.addAll(locations.map((e) => (e.type, e)));
    //   emit(FavoriteLocationsState.loaded(result));
    // });

    emit(
      state.copyWith(
        favoriteLocationsState: favoriteLocationsResponse,
      ),
    );
  }

  void onStopped() {
    emit(
      state.copyWith(
        favoriteLocationsState: ApiResponse.initial(),
      ),
    );
  }
}
