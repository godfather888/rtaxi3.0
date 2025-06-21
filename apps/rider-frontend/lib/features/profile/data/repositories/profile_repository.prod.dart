import 'package:api_response/api_response.dart';
import 'package:dartz/dartz.dart';
import 'package:graphql/client.dart';
import 'package:injectable/injectable.dart';
import 'package:rider_flutter/core/graphql/documents/profile.graphql.dart';
import 'package:rider_flutter/core/datasources/graphql_datasource.dart';
import 'package:rider_flutter/core/graphql/fragments/media.fragment.graphql.dart';
import 'package:rider_flutter/features/profile/domain/repositories/profile_repository.dart';

@prod
@LazySingleton(as: ProfileRepository)
class ProfileRepositoryProd implements ProfileRepository {
  final GraphqlDatasource graphqlDatasource;

  ProfileRepositoryProd(this.graphqlDatasource);

  @override
  Future<ApiResponse<Query$ProfileAggregations>> getProfileAggregationsInfo() async {
    final profileAggregationsInfoResponse = await graphqlDatasource.query(
      Options$Query$ProfileAggregations(),
    );

    return profileAggregationsInfoResponse;
  }

  @override
  Future<ApiResponse<Mutation$UpdateProfileImage>> uploadProfileImage({
    required Either<int, Fragment$Media> image,
  }) async {
    final uploadProfileImageResponse = await graphqlDatasource.mutate(Options$Mutation$UpdateProfileImage(
      fetchPolicy: FetchPolicy.noCache,
      variables: Variables$Mutation$UpdateProfileImage(
        mediaId: image.fold(
          (l) => null,
          (r) => r.id,
        ),
        presetImageId: image.fold(
          (l) => l,
          (r) => null,
        ),
      ),
    ));
    return uploadProfileImageResponse;
  }

  @override
  Future<ApiResponse<Query$FavoriteDrivers>> getFavoriteDrivers() async {
    final favoriteDriversResponse = await graphqlDatasource.query(
      Options$Query$FavoriteDrivers(),
    );

    return favoriteDriversResponse;
  }

  @override
  Future<ApiResponse<Mutation$DeleteFavoriteDriver>> deleteFavoriteDriver({
    required String driverId,
  }) async {
    final deleteFavoriteDriverResponse = await graphqlDatasource.mutate(
      Options$Mutation$DeleteFavoriteDriver(
        variables: Variables$Mutation$DeleteFavoriteDriver(
          driverId: driverId,
        ),
      ),
    );

    return deleteFavoriteDriverResponse;
  }

  @override
  Future<ApiResponse<Mutation$DeleteAccount>> deleteAccount() async {
    final deleteAccountResponse = await graphqlDatasource.mutate(
      Options$Mutation$DeleteAccount(),
    );

    return deleteAccountResponse;
  }
}
