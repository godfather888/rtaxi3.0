import 'package:api_response/api_response.dart';
import 'package:driver_flutter/core/graphql/documents/home.graphql.dart';
import 'package:driver_flutter/core/graphql/documents/profile.graphql.dart';
import 'package:driver_flutter/core/graphql/fragments/profile.mock.dart';
import 'package:injectable/injectable.dart';
import 'profile_repository.dart';

@dev
@LazySingleton(as: ProfileRepository)
class ProfileRepositoryMock implements ProfileRepository {
  @override
  Future<ApiResponse<Query$Profile>> getProfile() async {
    await Future.delayed(const Duration(seconds: 1));
    return ApiResponse.loaded(
      Query$Profile(
        driver: mockProfileFull1,
      ),
    );
  }

  @override
  Future<ApiResponse<Mutation$UpdateDriverSearchDistance>> updateRadius({
    required int? radius,
  }) async {
    await Future.delayed(const Duration(seconds: 1));
    return ApiResponse.loaded(
      Mutation$UpdateDriverSearchDistance(
        updateOneDriver: mockProfileFull1,
      ),
    );
  }

  @override
  Future<ApiResponse<bool>> deleteAccount() async {
    await Future.delayed(const Duration(seconds: 1));
    return ApiResponse.loaded(true);
  }
}
