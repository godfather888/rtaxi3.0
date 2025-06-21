import 'package:api_response/api_response.dart';
import 'package:rider_flutter/core/graphql/documents/home.graphql.dart';

abstract class NewOrderRepository {
  Future<ApiResponse<Query$DestinationSuggesions>> getDestinationSuggestions();
}
