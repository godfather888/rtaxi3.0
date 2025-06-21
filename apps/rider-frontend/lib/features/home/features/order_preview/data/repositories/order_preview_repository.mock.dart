import 'package:api_response/api_response.dart';
import 'package:injectable/injectable.dart';

import 'package:rider_flutter/core/graphql/documents/create_order.graphql.dart';
import 'package:rider_flutter/core/graphql/fragments/active_order.mock.dart';
import 'package:rider_flutter/core/graphql/schema.gql.dart';

import '../../domain/repositories/order_preview_repository.dart';

@dev
@LazySingleton(as: OrderPreviewRepository)
class OrderPreviewRepositoryMock implements OrderPreviewRepository {
  @override
  Future<ApiResponse<Mutation$CreateOrder>> submitOrder({
    required Input$CreateOrderInput args,
  }) async {
    await Future.delayed(const Duration(seconds: 1));
    return ApiResponse.loaded(
      Mutation$CreateOrder(
        createOrder: mockCurrentOrder1,
      ),
    );
  }
}
