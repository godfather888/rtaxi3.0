import 'package:api_response/api_response.dart';
import 'package:driver_flutter/core/datasources/graphql_datasource.dart';
import 'package:driver_flutter/core/graphql/documents/profile.graphql.dart';
import 'package:graphql/client.dart';
import 'package:injectable/injectable.dart';
import '../graphql/documents/home.graphql.dart';
import 'profile_repository.dart';

@prod
@LazySingleton(as: ProfileRepository)
class ProfileRepositoryProd implements ProfileRepository {
  final GraphqlDatasource graphqlDatasource;

  ProfileRepositoryProd(this.graphqlDatasource);

  @override
  Future<ApiResponse<Query$Profile>> getProfile() async {
    final profileResponse = await graphqlDatasource.query(
      Options$Query$Profile(
        fetchPolicy: FetchPolicy.noCache,
      ),
    );
    return profileResponse;
  }

  @override
  Future<ApiResponse<Mutation$UpdateDriverSearchDistance>> updateRadius({
    required int? radius,
  }) async {
    final updateRadiusResponse = await graphqlDatasource.mutate(
      Options$Mutation$UpdateDriverSearchDistance(
        fetchPolicy: FetchPolicy.noCache,
        variables: Variables$Mutation$UpdateDriverSearchDistance(
          distance: radius,
        ),
      ),
    );
    return updateRadiusResponse;
  }

  @override
  Future<ApiResponse<bool>> deleteAccount() async {
    await graphqlDatasource.mutate(Options$Mutation$DeleteAccount());
    return ApiResponse.loaded(true);
  }
}
