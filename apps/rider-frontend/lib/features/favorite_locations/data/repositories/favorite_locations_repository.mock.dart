import 'package:api_response/api_response.dart';
import 'package:rider_flutter/core/graphql/documents/favorite_locations.graphql.dart';
import 'package:rider_flutter/core/graphql/fragments/favorite_location.mock.dart';
import 'package:rider_flutter/features/favorite_locations/models/update_favorite_location_input.dart';
import 'package:injectable/injectable.dart';

import '../../domain/repositories/favorite_locations_repository.dart';

@dev
@LazySingleton(as: FavoriteLocationsRepository)
class FavoriteLocationsRepositoryMock implements FavoriteLocationsRepository {
  @override
  Future<ApiResponse<Query$FavoriteLocations>> getFavoriteLocations() async {
    await Future.delayed(const Duration(seconds: 1));
    return ApiResponse.loaded(
      Query$FavoriteLocations(
        riderAddresses: [
          mockFavoriteLocation1,
          mockFavoriteLocation2,
        ],
      ),
    );
  }

  @override
  Future<ApiResponse<Mutation$CreateFavoriteLocation>> addFavoriteLocation({
    required UpdateFavoriteLocationInput input,
  }) async {
    await Future.delayed(const Duration(seconds: 1));
    return ApiResponse.loaded(
      Mutation$CreateFavoriteLocation(
        createOneRiderAddress: mockFavoriteLocation1,
      ),
    );
  }

  @override
  Future<ApiResponse<Mutation$DeleteFavoriteLocation>> deleteFavoriteLocation({
    required String id,
  }) async {
    await Future.delayed(const Duration(seconds: 1));
    return ApiResponse.loaded(
      Mutation$DeleteFavoriteLocation(
        deleteOneRiderAddress: Mutation$DeleteFavoriteLocation$deleteOneRiderAddress(
          id: '1',
        ),
      ),
    );
  }

  @override
  Future<ApiResponse<Mutation$UpdateFavoriteLocation>> updateFavoriteLocation({
    required String id,
    required UpdateFavoriteLocationInput input,
  }) async {
    await Future.delayed(const Duration(seconds: 1));
    return ApiResponse.loaded(
      Mutation$UpdateFavoriteLocation(
        updateOneRiderAddress: mockFavoriteLocation1,
      ),
    );
  }
}
