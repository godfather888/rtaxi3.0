import 'package:api_response/api_response.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:injectable/injectable.dart';
import 'package:rider_flutter/core/graphql/documents/profile.graphql.dart';
import 'package:rider_flutter/features/profile/domain/repositories/profile_repository.dart';

part 'favorite_drivers.state.dart';
part 'favorite_drivers.bloc.freezed.dart';

@lazySingleton
class FavoriteDriversCubit extends Cubit<FavoriteDriversState> {
  final ProfileRepository _repository;

  FavoriteDriversCubit(this._repository) : super(const FavoriteDriversState());

  void fetchFavoriteDrivers() async {
    emit(
      state.copyWith(
        favoriteDriversState: ApiResponse.loading(),
      ),
    );

    final favoriteDriversResponse = await _repository.getFavoriteDrivers();

    emit(
      state.copyWith(
        favoriteDriversState: favoriteDriversResponse,
      ),
    );
  }

  void deleteFavoriteDriver(String driverId) async {
    emit(
      state.copyWith(
        deleteFavoriteDriverState: ApiResponse.loading(),
      ),
    );

    final deleteFavoriteDriverResponse = await _repository.deleteFavoriteDriver(
      driverId: driverId,
    );

    emit(
      state.copyWith(
        deleteFavoriteDriverState: deleteFavoriteDriverResponse,
      ),
    );
  }
}
