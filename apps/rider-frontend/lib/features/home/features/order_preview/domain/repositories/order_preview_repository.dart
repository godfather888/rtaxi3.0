import 'package:api_response/api_response.dart';
import 'package:rider_flutter/core/graphql/documents/create_order.graphql.dart';
import 'package:rider_flutter/core/graphql/schema.gql.dart';

abstract class OrderPreviewRepository {
  Future<ApiResponse<Mutation$CreateOrder>> submitOrder({
    required Input$CreateOrderInput args,
  });
}
