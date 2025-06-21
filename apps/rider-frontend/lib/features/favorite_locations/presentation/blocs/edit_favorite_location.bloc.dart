import 'package:api_response/api_response.dart';
import 'package:better_localization/country_code/country_code.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_common/config/constants.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:generic_map/interfaces/place.dart';
import 'package:injectable/injectable.dart';
import 'package:rider_flutter/core/graphql/documents/favorite_locations.graphql.dart';
import 'package:rider_flutter/core/graphql/schema.gql.dart';
import 'package:rider_flutter/features/favorite_locations/domain/repositories/favorite_locations_repository.dart';
import 'package:rider_flutter/features/favorite_locations/models/update_favorite_location_input.dart';

part 'edit_favorite_location.state.dart';
part 'edit_favorite_location.bloc.freezed.dart';

@lazySingleton
class EditFavoriteLocationCubit extends Cubit<EditFavoriteLocationState> {
  final FavoriteLocationsRepository repository;

  EditFavoriteLocationCubit(this.repository) : super(EditFavoriteLocationState.initial());

  void init({
    required Enum$RiderAddressType addressType,
    required String addressName,
    required Place selectedLocation,
    required (CountryCode, String?) addressPhone,
  }) =>
      emit(
        EditFavoriteLocationState.initial().copyWith(
          addressType: addressType,
          addressName: addressName,
          selectedLocation: selectedLocation,
          addressPhone: addressPhone,
        ),
      );

  void updateAddressType(Enum$RiderAddressType? addressType) => emit(
        state.copyWith(
          addressType: addressType,
        ),
      );

  void updateAddressName(String? addressName) => emit(
        state.copyWith(
          addressName: addressName,
        ),
      );

  void updateSelectedLocation(Place? selectedLocation) => emit(
        state.copyWith(
          selectedLocation: selectedLocation,
        ),
      );

  void save({
    required String id,
    required UpdateFavoriteLocationInput input,
  }) async {
    emit(
      state.copyWith(
        updateFavoriteLocationState: ApiResponse.loading(),
      ),
    );
    final updateFavoriteLocationResponse = await repository.updateFavoriteLocation(
      id: id,
      input: input,
    );

    emit(
      state.copyWith(
        updateFavoriteLocationState: updateFavoriteLocationResponse,
      ),
    );
  }

  void delete(String id) async {
    emit(
      state.copyWith(
        deleteFavoriteLocationState: ApiResponse.loading(),
      ),
    );
    final deleteFavoriteLocationResponse = await repository.deleteFavoriteLocation(id: id);

    emit(
      state.copyWith(
        deleteFavoriteLocationState: deleteFavoriteLocationResponse,
      ),
    );
  }

  void updateAddressPhone((CountryCode, String?)? p1) => emit(
        state.copyWith(
          addressPhone: p1!,
        ),
      );
}
