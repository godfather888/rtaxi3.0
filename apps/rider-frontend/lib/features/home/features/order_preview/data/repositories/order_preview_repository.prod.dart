import 'package:api_response/api_response.dart';
import 'package:injectable/injectable.dart';
import 'package:rider_flutter/core/graphql/documents/create_order.graphql.dart';
import 'package:rider_flutter/core/datasources/graphql_datasource.dart';
import 'package:rider_flutter/core/graphql/schema.gql.dart';

import '../../domain/repositories/order_preview_repository.dart';

@prod
@LazySingleton(as: OrderPreviewRepository)
class OrderPreviewRepositoryImpl implements OrderPreviewRepository {
  final GraphqlDatasource graphQLDatasource;

  OrderPreviewRepositoryImpl(
    this.graphQLDatasource,
  );

  @override
  Future<ApiResponse<Mutation$CreateOrder>> submitOrder({
    required Input$CreateOrderInput args,
  }) async {
    final submitOrderResponse = await graphQLDatasource.mutate(
      Options$Mutation$CreateOrder(
        variables: Variables$Mutation$CreateOrder(
          input: args,
        ),
      ),
    );
    return submitOrderResponse;
  }
}
