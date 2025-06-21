import 'package:api_response/api_response.dart';
import 'package:dartz/dartz.dart';

import 'package:rider_flutter/core/graphql/documents/profile.graphql.dart';
import 'package:rider_flutter/core/graphql/fragments/media.fragment.graphql.dart';

abstract class ProfileRepository {
  Future<ApiResponse<Query$ProfileAggregations>> getProfileAggregationsInfo();

  Future<ApiResponse<Mutation$UpdateProfileImage>> uploadProfileImage({
    required Either<int, Fragment$Media> image,
  });

  Future<ApiResponse<Query$FavoriteDrivers>> getFavoriteDrivers();

  Future<ApiResponse<Mutation$DeleteFavoriteDriver>> deleteFavoriteDriver({
    required String driverId,
  });

  Future<ApiResponse<Mutation$DeleteAccount>> deleteAccount();
}
