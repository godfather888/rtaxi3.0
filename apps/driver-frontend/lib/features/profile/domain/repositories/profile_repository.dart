import 'package:api_response/api_response.dart';
import 'package:driver_flutter/core/graphql/documents/profile.graphql.dart';
import 'package:driver_flutter/core/graphql/fragments/media.fragment.graphql.dart';

abstract class ProfileRepository {
  Future<ApiResponse<Query$ProfileAggregations>> getProfileAggregationsInfo();

  Future<ApiResponse<Mutation$UpdateProfileImage>> uploadProfileImage({
    required Fragment$Media image,
  });

  Future<ApiResponse<Query$FeedbacksSummary>> getFeedbacksSummary();
}
