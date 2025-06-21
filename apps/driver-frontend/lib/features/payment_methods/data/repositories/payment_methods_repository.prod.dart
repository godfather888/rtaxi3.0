import 'package:api_response/api_response.dart';
import 'package:driver_flutter/core/graphql/documents/wallet.graphql.dart';
import 'package:graphql/client.dart';
import 'package:injectable/injectable.dart';

import '../../../../core/datasources/graphql_datasource.dart';
import '../../domain/repositories/payment_methods_repository.dart';

@prod
@LazySingleton(as: PaymentMethodsRepository)
class PaymentMethodsRepositoryImpl implements PaymentMethodsRepository {
  final GraphqlDatasource graphQLDatasource;

  PaymentMethodsRepositoryImpl(
    this.graphQLDatasource,
  );

  @override
  Future<ApiResponse<Query$SavedPaymentMethods>> getSavedPaymentMethods() async {
    final savedPaymentMethodsResponse = await graphQLDatasource.query(
      Options$Query$SavedPaymentMethods(fetchPolicy: FetchPolicy.noCache),
    );
    return savedPaymentMethodsResponse;
  }

  @override
  Future<ApiResponse<Mutation$SetupPaymentMethodLink>> getExternalUrl({required String paymentGatewayId}) async {
    final externalUrlResponse = await graphQLDatasource.mutate(
      Options$Mutation$SetupPaymentMethodLink(
        variables: Variables$Mutation$SetupPaymentMethodLink(
          gatewayId: paymentGatewayId,
        ),
      ),
    );
    return externalUrlResponse;
  }
}
