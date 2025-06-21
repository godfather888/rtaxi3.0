import 'package:api_response/api_response.dart';
import 'package:driver_flutter/core/datasources/graphql_datasource.dart';
import 'package:driver_flutter/core/graphql/documents/payout.graphql.dart';
import 'package:driver_flutter/core/graphql/fragments/payout_method.fragment.graphql.dart';
import 'package:driver_flutter/core/graphql/schema.gql.dart';
import 'package:graphql/client.dart';
import 'package:injectable/injectable.dart';
import '../../domain/repositories/payout_methods_repository.dart';

@prod
@LazySingleton(as: PayoutMethodsRepository)
class PayoutMethodsRepositoryImpl implements PayoutMethodsRepository {
  final GraphqlDatasource graphQLDatasource;

  PayoutMethodsRepositoryImpl(
    this.graphQLDatasource,
  );

  @override
  Future<ApiResponse<Query$PayoutAccounts>> getPayoutAccounts() async {
    final payoutAccountsResponse = await graphQLDatasource.query(
      Options$Query$PayoutAccounts(
        fetchPolicy: FetchPolicy.noCache,
      ),
    );
    return payoutAccountsResponse;
  }

  @override
  Future<ApiResponse<Mutation$DeletePayoutAccount>> deletePayoutMethod(String id) async {
    final deletePayoutMethodResponse = await graphQLDatasource.mutate(
      Options$Mutation$DeletePayoutAccount(
        variables: Variables$Mutation$DeletePayoutAccount(
          id: id,
        ),
      ),
    );
    return deletePayoutMethodResponse;
  }

  @override
  Future<ApiResponse<Mutation$UpdatePayoutMethodDefaultStatus>> updateDefaultPayoutMethodStatus({
    required String payoutMethodId,
    required bool isDefault,
  }) async {
    final updateDefaultPayoutMethodStatusResponse = await graphQLDatasource.mutate(
      Options$Mutation$UpdatePayoutMethodDefaultStatus(
        variables: Variables$Mutation$UpdatePayoutMethodDefaultStatus(
          id: payoutMethodId,
          isDefault: isDefault,
        ),
      ),
    );
    return updateDefaultPayoutMethodStatusResponse;
  }

  @override
  Future<ApiResponse<Query$SupportedPayoutMethods>> getAvailablePayoutMethods() async {
    final availablePayoutMethodsResponse = await graphQLDatasource.query(
      Options$Query$SupportedPayoutMethods(),
    );

    return availablePayoutMethodsResponse;
  }

  @override
  Future<ApiResponse<Mutation$CreatePayoutAccount>> addPayoutMethod(Input$PayoutAccountInput input) async {
    final addPayoutMethodResponse = await graphQLDatasource.mutate(
      Options$Mutation$CreatePayoutAccount(
        variables: Variables$Mutation$CreatePayoutAccount(
          input: input,
        ),
      ),
    );
    return addPayoutMethodResponse;
  }

  @override
  Future<ApiResponse<Query$PayoutAccountLinkUrl>> getLinkUrlForPayoutMethod(Fragment$PayoutMethod method) async {
    final linkUrlForPayoutMethod = await graphQLDatasource.query(
      Options$Query$PayoutAccountLinkUrl(
        fetchPolicy: FetchPolicy.noCache,
        variables: Variables$Query$PayoutAccountLinkUrl(
          gatewayId: method.id,
        ),
      ),
    );
    return linkUrlForPayoutMethod;
  }
}
