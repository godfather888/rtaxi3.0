import 'package:api_response/api_response.dart';
import 'package:graphql/client.dart';
import 'package:injectable/injectable.dart';
import 'package:rider_flutter/core/datasources/graphql_datasource.dart';
import 'package:rider_flutter/core/graphql/documents/home.graphql.dart';

import '../../../welcome/domain/repositories/new_order_repository.dart';

@prod
@LazySingleton(as: NewOrderRepository)
class NewOrderRepositoryImpl implements NewOrderRepository {
  final GraphqlDatasource graphQLDatasource;

  NewOrderRepositoryImpl(
    this.graphQLDatasource,
  );

  @override
  Future<ApiResponse<Query$DestinationSuggesions>> getDestinationSuggestions() async {
    final destinationSuggestionsResponse = await graphQLDatasource.query(
      Options$Query$DestinationSuggesions(
        fetchPolicy: FetchPolicy.noCache,
      ),
    );
    return destinationSuggestionsResponse;
  }
}
