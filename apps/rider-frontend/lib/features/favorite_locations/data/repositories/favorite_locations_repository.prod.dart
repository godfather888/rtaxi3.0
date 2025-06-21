import 'package:api_response/api_response.dart';
import 'package:graphql/client.dart';
import 'package:injectable/injectable.dart';
import 'package:rider_flutter/core/graphql/documents/favorite_locations.graphql.dart';
import 'package:rider_flutter/core/graphql/schema.gql.dart';
import 'package:rider_flutter/core/datasources/graphql_datasource.dart';
import 'package:rider_flutter/features/favorite_locations/models/update_favorite_location_input.prod.dart';

import '../../domain/repositories/favorite_locations_repository.dart';
import '../../models/update_favorite_location_input.dart';

@prod
@LazySingleton(as: FavoriteLocationsRepository)
class FavoriteLocationsRepositoryImpl implements FavoriteLocationsRepository {
  final GraphqlDatasource graphQLDatasource;

  FavoriteLocationsRepositoryImpl(
    this.graphQLDatasource,
  );

  @override
  Future<ApiResponse<Query$FavoriteLocations>> getFavoriteLocations() async {
    final favoriteLocationsResponse = await graphQLDatasource.query(
      Options$Query$FavoriteLocations(
        fetchPolicy: FetchPolicy.noCache,
      ),
    );

    return favoriteLocationsResponse;
  }

  @override
  Future<ApiResponse<Mutation$DeleteFavoriteLocation>> deleteFavoriteLocation({
    required String id,
  }) async {
    final deleteFavoriteLocationResponse = await graphQLDatasource.mutate(
      Options$Mutation$DeleteFavoriteLocation(
        variables: Variables$Mutation$DeleteFavoriteLocation(
          input: Input$DeleteOneRiderAddressInput(
            id: id,
          ),
        ),
      ),
    );
    return deleteFavoriteLocationResponse;
  }

  @override
  Future<ApiResponse<Mutation$CreateFavoriteLocation>> addFavoriteLocation({
    required UpdateFavoriteLocationInput input,
  }) async {
    final addFavoriteLocationResponse = await graphQLDatasource.mutate(
      Options$Mutation$CreateFavoriteLocation(
        variables: Variables$Mutation$CreateFavoriteLocation(
          input: Input$CreateOneRiderAddressInput(
            riderAddress: input.toGql,
          ),
        ),
      ),
    );
    return addFavoriteLocationResponse;
  }

  @override
  Future<ApiResponse<Mutation$UpdateFavoriteLocation>> updateFavoriteLocation({
    required String id,
    required UpdateFavoriteLocationInput input,
  }) async {
    final updateFavoriteLocationResponse = await graphQLDatasource.mutate(
      Options$Mutation$UpdateFavoriteLocation(
        variables: Variables$Mutation$UpdateFavoriteLocation(
          input: Input$UpdateOneRiderAddressInput(
            id: id,
            update: input.toGql,
          ),
        ),
      ),
    );
    return updateFavoriteLocationResponse;
  }
}
