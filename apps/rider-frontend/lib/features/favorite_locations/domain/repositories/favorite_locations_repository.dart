import 'package:api_response/api_response.dart';
import 'package:rider_flutter/core/graphql/documents/favorite_locations.graphql.dart';

import '../../models/update_favorite_location_input.dart';

abstract class FavoriteLocationsRepository {
  Future<ApiResponse<Query$FavoriteLocations>> getFavoriteLocations();

  Future<ApiResponse<Mutation$CreateFavoriteLocation>> addFavoriteLocation({
    required UpdateFavoriteLocationInput input,
  });

  Future<ApiResponse<Mutation$DeleteFavoriteLocation>> deleteFavoriteLocation({
    required String id,
  });

  Future<ApiResponse<Mutation$UpdateFavoriteLocation>> updateFavoriteLocation({
    required String id,
    required UpdateFavoriteLocationInput input,
  });
}
