import 'package:api_response/api_response.dart';
import 'package:injectable/injectable.dart';
import 'package:rxdart/rxdart.dart';

import 'package:rider_flutter/core/graphql/documents/wallet.graphql.dart';
import 'package:rider_flutter/core/graphql/fragments/payment_gateway.fragment.graphql.dart';
import 'package:rider_flutter/core/graphql/fragments/saved_payment_method.fragment.graphql.dart';

import '../datasources/graphql_datasource.dart';

import 'payment_methods_repository.dart';

@prod
@LazySingleton(as: PaymentMethodsRepository)
class PaymentMethodsRepositoryImpl implements PaymentMethodsRepository {
  @override
  Stream<ApiResponse<List<Fragment$SavedPaymentMethod>>> get savedPaymentMethods => _savedPaymentMethods.stream;

  @override
  Stream<ApiResponse<List<Fragment$PaymentGateway>>> get paymentGateways => _paymentGateways.stream;

  final BehaviorSubject<ApiResponse<List<Fragment$SavedPaymentMethod>>> _savedPaymentMethods = BehaviorSubject.seeded(
    ApiResponse.initial(),
  );

  final BehaviorSubject<ApiResponse<List<Fragment$PaymentGateway>>> _paymentGateways = BehaviorSubject.seeded(
    ApiResponse.initial(),
  );

  final GraphqlDatasource graphQLDatasource;

  PaymentMethodsRepositoryImpl(this.graphQLDatasource);

  @override
  Future<ApiResponse<String>> getExternalUrl({required String paymentGatewayId}) async {
    final result = await graphQLDatasource.mutate(
      Options$Mutation$GetSetupPaymentMethodLink(
        variables: Variables$Mutation$GetSetupPaymentMethodLink(gatewayId: paymentGatewayId),
      ),
    );

    return result.mapData((r) => r.setupPaymentMethod.url!);
  }

  @override
  Future<ApiResponse<List<Fragment$SavedPaymentMethod>>> markAsDefault({required String paymentMethodId}) async {
    final paymentmethods = await graphQLDatasource.mutate(
      Options$Mutation$MarkAsDefault(variables: Variables$Mutation$MarkAsDefault(id: paymentMethodId)),
    );
    if (paymentmethods.data != null) {
      _savedPaymentMethods.add(ApiResponse.loaded(paymentmethods.data!.markPaymentMethodAsDefault));
    }
    return paymentmethods.mapData((r) => r.markPaymentMethodAsDefault);
  }

  @override
  Future<void> refreshPaymentGateways() async {
    final paymentGateways = await graphQLDatasource.query(Options$Query$PaymentGateways());
    _paymentGateways.add(ApiResponse.loaded(paymentGateways.data!.paymentGateways));
  }

  @override
  Future<void> refreshSavedPaymentMethods() async {
    final savedPaymentMethods = await graphQLDatasource.query(Options$Query$SavedPaymentMethods());
    _savedPaymentMethods.add(savedPaymentMethods.mapData((r) => r.savedPaymentMethods));
  }

  @override
  Future<ApiResponse<void>> deletePaymentMethod({required String paymentMethodId}) async {
    final deleteResponse = await graphQLDatasource.mutate(
      Options$Mutation$DeleteSavedPaymentMethod(
        variables: Variables$Mutation$DeleteSavedPaymentMethod(id: paymentMethodId),
      ),
    );
    if (deleteResponse.data != null) {
      _savedPaymentMethods.add(ApiResponse.loaded(
        _savedPaymentMethods.value.data?.where((method) => method.id != paymentMethodId).toList() ?? [],
      ));
    }
    return deleteResponse.mapData((r) => r.deleteSavedPaymentMethod);
  }
}
