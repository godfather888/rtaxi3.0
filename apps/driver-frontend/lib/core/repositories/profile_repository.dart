import 'package:api_response/api_response.dart';
import 'package:driver_flutter/core/graphql/documents/home.graphql.dart';
import 'package:driver_flutter/core/graphql/documents/profile.graphql.dart';

abstract class ProfileRepository {
  Future<ApiResponse<Query$Profile>> getProfile();
  Future<ApiResponse<Mutation$UpdateDriverSearchDistance>> updateRadius({
    required int? radius,
  });
  Future<ApiResponse<bool>> deleteAccount();
}
