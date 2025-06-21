import 'package:api_response/api_response.dart';
import 'package:dartz/dartz.dart';
import 'package:injectable/injectable.dart';
import 'package:rider_flutter/core/graphql/documents/profile.graphql.dart';
import 'package:rider_flutter/core/graphql/fragments/favorite_driver.mock.dart';
import 'package:rider_flutter/core/graphql/fragments/media.fragment.graphql.dart';
import 'package:rider_flutter/core/graphql/fragments/profile.mock.dart';
import 'package:rider_flutter/features/profile/domain/repositories/profile_repository.dart';

@dev
@LazySingleton(as: ProfileRepository)
class ProfileRepositoryMock implements ProfileRepository {
  @override
  Future<ApiResponse<Query$ProfileAggregations>> getProfileAggregationsInfo() async {
    return ApiResponse.loaded(
      Query$ProfileAggregations(
        rider: Query$ProfileAggregations$rider(
          ordersAggregate: [
            Query$ProfileAggregations$rider$ordersAggregate(
              count: Query$ProfileAggregations$rider$ordersAggregate$count(id: 32),
              sum: Query$ProfileAggregations$rider$ordersAggregate$sum(distanceBest: 80),
            ),
            Query$ProfileAggregations$rider$ordersAggregate(
              count: Query$ProfileAggregations$rider$ordersAggregate$count(id: 12),
              sum: Query$ProfileAggregations$rider$ordersAggregate$sum(distanceBest: 45),
            ),
            Query$ProfileAggregations$rider$ordersAggregate(
              count: Query$ProfileAggregations$rider$ordersAggregate$count(id: 64),
              sum: Query$ProfileAggregations$rider$ordersAggregate$sum(distanceBest: 34),
            ),
          ],
          favoriteDriversAggregate: [
            Query$ProfileAggregations$rider$favoriteDriversAggregate(
              count: Query$ProfileAggregations$rider$favoriteDriversAggregate$count(
                id: 23,
              ),
            ),
            Query$ProfileAggregations$rider$favoriteDriversAggregate(
              count: Query$ProfileAggregations$rider$favoriteDriversAggregate$count(
                id: 17,
              ),
            ),
            Query$ProfileAggregations$rider$favoriteDriversAggregate(
              count: Query$ProfileAggregations$rider$favoriteDriversAggregate$count(
                id: 12,
              ),
            ),
          ],
        ),
      ),
    );
  }

  @override
  Future<ApiResponse<Mutation$UpdateProfileImage>> uploadProfileImage(
      {required Either<int, Fragment$Media> image}) async {
    await Future.delayed(const Duration(seconds: 1));
    return ApiResponse.loaded(
      Mutation$UpdateProfileImage(
        updateOneRider: mockProfile1,
      ),
    );
  }

  @override
  Future<ApiResponse<Query$FavoriteDrivers>> getFavoriteDrivers() async {
    await Future.delayed(const Duration(seconds: 1));
    return ApiResponse.loaded(
      Query$FavoriteDrivers(
        rider: Query$FavoriteDrivers$rider(
          favoriteDrivers: [
            mockFavoriteDriver1,
            mockFavoriteDriver2,
            mockFavoriteDriver3,
          ],
        ),
      ),
    );
  }

  @override
  Future<ApiResponse<Mutation$DeleteFavoriteDriver>> deleteFavoriteDriver({
    required String driverId,
  }) async {
    await Future.delayed(
      const Duration(
        seconds: 1,
      ),
    );
    return ApiResponse.loaded(
      Mutation$DeleteFavoriteDriver(
        deleteFavoriteDriver: true,
      ),
    );
  }

  @override
  Future<ApiResponse<Mutation$DeleteAccount>> deleteAccount() async {
    await Future.delayed(
      const Duration(
        seconds: 1,
      ),
    );
    return ApiResponse.loaded(
      Mutation$DeleteAccount(
        deleteUser: Mutation$DeleteAccount$deleteUser(
          id: '1',
        ),
      ),
    );
  }
}
