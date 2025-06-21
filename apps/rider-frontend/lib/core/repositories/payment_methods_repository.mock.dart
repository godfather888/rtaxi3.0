import 'package:api_response/api_response.dart';
import 'package:rider_flutter/core/graphql/fragments/payment_gateway.fragment.graphql.dart';
import 'package:rider_flutter/core/graphql/fragments/payment_gateway.mock.dart';
import 'package:rider_flutter/core/graphql/fragments/saved_payment_method.fragment.graphql.dart';
import 'package:rider_flutter/core/graphql/fragments/saved_payment_method.mock.dart';
import 'package:rxdart/rxdart.dart';

import 'payment_methods_repository.dart';
import 'package:injectable/injectable.dart';

@dev
@LazySingleton(as: PaymentMethodsRepository)
class PaymentMethodsRepositoryMock implements PaymentMethodsRepository {
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

  @override
  Future<ApiResponse<String>> getExternalUrl({required String paymentGatewayId}) async {
    return ApiResponse.loaded("https://www.paypal.com");
  }

  @override
  Future<ApiResponse<List<Fragment$SavedPaymentMethod>>> markAsDefault({required String paymentMethodId}) async {
    return ApiResponse.loaded([]);
  }

  @override
  Future<void> refreshPaymentGateways() {
    _paymentGateways.add(ApiResponse.loaded(mockPaymentGateways));
    return Future.value();
  }

  @override
  Future<void> refreshSavedPaymentMethods() {
    _savedPaymentMethods.add(ApiResponse.loaded(mockSavedPaymentMethods));
    return Future.value();
  }

  @override
  Future<ApiResponse<void>> deletePaymentMethod({required String paymentMethodId}) async {
    final savedPaymentMethods = _savedPaymentMethods.value.data;
    if (savedPaymentMethods != null) {
      final updatedSavedPaymentMethods = savedPaymentMethods.where((method) => method.id != paymentMethodId).toList();
      _savedPaymentMethods.add(ApiResponse.loaded(updatedSavedPaymentMethods));
    }
    return ApiResponse.loaded(null);
  }
}
