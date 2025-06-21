import 'package:api_response/api_response.dart';
import 'package:driver_flutter/core/graphql/fragments/media.fragment.graphql.dart';
import 'package:injectable/injectable.dart';
import 'package:driver_flutter/core/graphql/documents/profile.graphql.dart';
import 'package:driver_flutter/core/datasources/graphql_datasource.dart';
import 'package:driver_flutter/features/profile/domain/repositories/profile_repository.dart';

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
    required Fragment$Media image,
  }) async {
    final uploadProfileImageResponse = await graphqlDatasource.mutate(
      Options$Mutation$UpdateProfileImage(
        variables: Variables$Mutation$UpdateProfileImage(
          mediaId: image.id,
        ),
      ),
    );
    return uploadProfileImageResponse;
  }

  @override
  Future<ApiResponse<Query$FeedbacksSummary>> getFeedbacksSummary() async {
    final feedbacksSummaryResponse = await graphqlDatasource.query(Options$Query$FeedbacksSummary());
    return feedbacksSummaryResponse;
  }
}
