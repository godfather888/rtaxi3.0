import 'package:api_response/api_response.dart';
import 'package:graphql/client.dart';

abstract class GraphqlDatasource {
  Future<ApiResponse<TParsed>> query<TParsed>(
    QueryOptions<TParsed> options,
  );

  Stream<ApiResponse<TParsed>> queryStream<TParsed>(
    QueryOptions<TParsed> options,
  );

  Future<ApiResponse<TParsed>> mutate<TParsed>(
    MutationOptions<TParsed> options,
  );

  Stream<ApiResponse<TParsed>> watchQuery<TParsed>(
    WatchQueryOptions<TParsed> options,
  );

  Stream<TParsed> subscribe<TParsed>(
    SubscriptionOptions<TParsed> options,
  );
}
