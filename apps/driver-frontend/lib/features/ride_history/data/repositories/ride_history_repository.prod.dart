import 'package:api_response/api_response.dart';
import 'package:injectable/injectable.dart';
import 'package:driver_flutter/core/graphql/documents/ride_history.graphql.dart';
import 'package:driver_flutter/core/graphql/schema.gql.dart';

import '../../../../core/datasources/graphql_datasource.dart';
import '../../domain/repositories/ride_history_repository.dart';

@prod
@LazySingleton(as: RideHistoryRepository)
class RideHistoryRepositoryImpl implements RideHistoryRepository {
  final GraphqlDatasource graphQLDatasource;

  RideHistoryRepositoryImpl(
    this.graphQLDatasource,
  );

  @override
  Future<ApiResponse<Query$RideHistory>> getRideHistory() async {
    final rideHistoryResponse = await graphQLDatasource.query(Options$Query$RideHistory());
    return rideHistoryResponse;
  }

  @override
  Future<ApiResponse<Mutation$SubmitIssue>> reportIssue({
    required String orderId,
    required String subject,
    required String issue,
  }) async {
    final reportIssueResponse = await graphQLDatasource.mutate(
      Options$Mutation$SubmitIssue(
        variables: Variables$Mutation$SubmitIssue(
          input: Input$CreateOneComplaintInput(
            complaint: Input$ComplaintInput(requestId: orderId, subject: subject, content: issue),
          ),
        ),
      ),
    );
    return reportIssueResponse;
  }
}
