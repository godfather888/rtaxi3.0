import 'package:api_response/api_response.dart';
import 'package:driver_flutter/core/graphql/documents/ride_history.graphql.dart';
import 'package:driver_flutter/core/graphql/fragments/current_order.mock.dart';
import '../../domain/repositories/ride_history_repository.dart';
import 'package:injectable/injectable.dart';

@dev
@LazySingleton(as: RideHistoryRepository)
class RideHistoryRepositoryMock implements RideHistoryRepository {
  @override
  Future<ApiResponse<Query$RideHistory>> getRideHistory() async {
    await Future.delayed(const Duration(seconds: 1));
    return ApiResponse.loaded(
      Query$RideHistory(
        orders: Query$RideHistory$orders(
          edges: [
            Query$RideHistory$orders$edges(
              node: mockCurrentOrder1,
            ),
          ],
        ),
      ),
    );
  }

  @override
  Future<ApiResponse<Mutation$SubmitIssue>> reportIssue({
    required String orderId,
    required String subject,
    required String issue,
  }) async {
    await Future.delayed(const Duration(seconds: 1));
    return ApiResponse.loaded(
      Mutation$SubmitIssue(
        createOneComplaint: Mutation$SubmitIssue$createOneComplaint(
          id: '1',
        ),
      ),
    );
  }
}
