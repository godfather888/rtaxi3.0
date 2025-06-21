import 'package:api_response/api_response.dart';
import 'package:driver_flutter/core/graphql/documents/payout.graphql.dart';
import 'package:driver_flutter/core/graphql/fragments/intent_result.mock.dart';
import 'package:driver_flutter/core/graphql/fragments/payout_account.mock.dart';
import 'package:driver_flutter/core/graphql/fragments/payout_method.fragment.graphql.dart';
import 'package:driver_flutter/core/graphql/fragments/payout_method.mock.dart';
import 'package:driver_flutter/core/graphql/schema.gql.dart';
import '../../domain/repositories/payout_methods_repository.dart';
import 'package:injectable/injectable.dart';

@dev
@LazySingleton(as: PayoutMethodsRepository)
class PayoutMethodsRepositoryMock implements PayoutMethodsRepository {
  @override
  Future<ApiResponse<Query$PayoutAccounts>> getPayoutAccounts() async {
    await Future.delayed(const Duration(seconds: 1));
    return ApiResponse.loaded(
      Query$PayoutAccounts(
        payoutAccounts: [
          mockPayoutAccount1,
          mockPayoutAccount2,
        ],
      ),
    );
  }

  @override
  Future<ApiResponse<Mutation$DeletePayoutAccount>> deletePayoutMethod(String id) async {
    await Future.delayed(const Duration(seconds: 1));
    return ApiResponse.loaded(
      Mutation$DeletePayoutAccount(
        deleteOnePayoutAccount: Mutation$DeletePayoutAccount$deleteOnePayoutAccount(
          id: '1',
        ),
      ),
    );
  }

  @override
  Future<ApiResponse<Mutation$UpdatePayoutMethodDefaultStatus>> updateDefaultPayoutMethodStatus({
    required String payoutMethodId,
    required bool isDefault,
  }) async {
    await Future.delayed(const Duration(seconds: 1));
    return ApiResponse.loaded(
      Mutation$UpdatePayoutMethodDefaultStatus(
        updatePayoutMethod: mockPayoutAccount1,
      ),
    );
  }

  @override
  Future<ApiResponse<Query$SupportedPayoutMethods>> getAvailablePayoutMethods() async {
    await Future.delayed(const Duration(seconds: 1));
    return ApiResponse.loaded(Query$SupportedPayoutMethods(payoutMethods: [
      mockPayoutMethod1,
      mockPayoutMethod2,
      mockPayoutMethod3,
    ]));
  }

  @override
  Future<ApiResponse<Mutation$CreatePayoutAccount>> addPayoutMethod(Input$PayoutAccountInput input) async {
    await Future.delayed(const Duration(seconds: 1));
    return ApiResponse.loaded(
      Mutation$CreatePayoutAccount(
        createPayoutAccount: mockPayoutAccount1,
      ),
    );
  }

  @override
  Future<ApiResponse<Query$PayoutAccountLinkUrl>> getLinkUrlForPayoutMethod(
    Fragment$PayoutMethod method,
  ) async {
    await Future.delayed(const Duration(seconds: 1));
    return ApiResponse.loaded(
      Query$PayoutAccountLinkUrl(
        getPayoutLinkUrl: mockIntentResult1,
      ),
    );
  }
}
