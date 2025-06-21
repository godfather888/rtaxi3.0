import 'package:api_response/api_response.dart';
import 'package:graphql/client.dart';
import 'package:injectable/injectable.dart';
import 'package:rider_flutter/core/graphql/documents/profile.graphql.dart';
import 'package:rider_flutter/core/datasources/graphql_datasource.dart';
import 'package:rider_flutter/core/graphql/fragments/profile.fragment.graphql.dart';
import 'package:rider_flutter/core/graphql/schema.gql.dart';
import 'package:rider_flutter/core/repositories/profile_repository.dart';
import 'package:rxdart/rxdart.dart';

@prod
@LazySingleton(as: ProfileRepository)
class ProfileRepositoryProd implements ProfileRepository {
  final GraphqlDatasource graphqlDatasource;
  @override
  Stream<ApiResponse<Fragment$Profile>> get profileStream => _profileStream.stream;

  final BehaviorSubject<ApiResponse<Fragment$Profile>> _profileStream = BehaviorSubject<ApiResponse<Fragment$Profile>>();

  ProfileRepositoryProd(this.graphqlDatasource);

  @override
  Future<ApiResponse<Fragment$Profile>> getProfile() async {
    final profile = await graphqlDatasource.query(Options$Query$Profile(fetchPolicy: FetchPolicy.noCache));
    _profileStream.add(profile.mapData((r) => r.rider));
    return profile.mapData((r) => r.rider);
  }

  @override
  Future<ApiResponse<Fragment$Profile>> updateProfile({required Input$UpdateRiderInput input}) async {
    final profile = await graphqlDatasource.mutate(
      Options$Mutation$UpdateProfile(
        variables: Variables$Mutation$UpdateProfile(input: input),
        fetchPolicy: FetchPolicy.noCache,
      ),
    );
    _profileStream.add(profile.mapData((r) => r.updateOneRider));
    return profile.mapData((r) => r.updateOneRider);
  }
}
