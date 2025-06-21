import 'package:injectable/injectable.dart';
import 'package:rider_flutter/core/graphql/fragments/profile.fragment.graphql.dart';
import 'package:api_response/api_response.dart';
import 'package:rider_flutter/core/graphql/fragments/profile.mock.dart';
import 'package:rider_flutter/core/graphql/schema.gql.dart';
import 'package:rxdart/rxdart.dart';

import 'profile_repository.dart';

@dev
@LazySingleton(as: ProfileRepository)
class ProfileRepositoryMock implements ProfileRepository {
  @override
  Stream<ApiResponse<Fragment$Profile>> get profileStream => _profileStream.stream;

  final BehaviorSubject<ApiResponse<Fragment$Profile>> _profileStream = BehaviorSubject<ApiResponse<Fragment$Profile>>();

  @override
  Future<ApiResponse<Fragment$Profile>> getProfile() async {
    _profileStream.add(ApiResponse.loaded(mockProfile1));
    return ApiResponse.loaded(mockProfile1);
  }

  @override
  Future<ApiResponse<Fragment$Profile>> updateProfile({required Input$UpdateRiderInput input}) async {
    final updatedProfile = mockProfile1.copyWith(
      firstName: input.firstName ?? mockProfile1.firstName,
      lastName: input.lastName ?? mockProfile1.lastName,
      email: input.email ?? mockProfile1.email,
    );
    _profileStream.add(ApiResponse.loaded(updatedProfile));
    return ApiResponse.loaded(updatedProfile);
  }
}
