import 'package:api_response/api_response.dart';
import 'package:driver_flutter/core/graphql/documents/payout.graphql.dart';
import 'package:driver_flutter/core/graphql/fragments/payout_method.fragment.graphql.dart';
import 'package:driver_flutter/core/graphql/schema.gql.dart';

abstract class PayoutMethodsRepository {
  Future<ApiResponse<Query$PayoutAccounts>> getPayoutAccounts();

  Future<ApiResponse<Query$SupportedPayoutMethods>> getAvailablePayoutMethods();

  Future<ApiResponse<Mutation$UpdatePayoutMethodDefaultStatus>> updateDefaultPayoutMethodStatus({
    required String payoutMethodId,
    required bool isDefault,
  });

  Future<ApiResponse<Mutation$DeletePayoutAccount>> deletePayoutMethod(String id);

  Future<ApiResponse<Mutation$CreatePayoutAccount>> addPayoutMethod(Input$PayoutAccountInput input);

  Future<ApiResponse<Query$PayoutAccountLinkUrl>> getLinkUrlForPayoutMethod(
    Fragment$PayoutMethod method,
  );
}
