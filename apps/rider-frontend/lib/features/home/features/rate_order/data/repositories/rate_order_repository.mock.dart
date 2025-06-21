import 'package:api_response/api_response.dart';
import 'package:rider_flutter/core/graphql/documents/rate_ride.graphql.dart';
import 'package:rider_flutter/core/graphql/fragments/review_parameter.mock.dart';

import '../../domain/repositories/rate_order_repository.dart';
import 'package:injectable/injectable.dart';

@dev
@LazySingleton(as: RateOrderRepository)
class RateOrderRepositoryMock implements RateOrderRepository {
  @override
  Future<ApiResponse<Query$ReviewParameters>> getReviewParameters() async {
    await Future.delayed(Duration(seconds: 1));
    return ApiResponse.loaded(
      Query$ReviewParameters(
        feedbackParameters: [
          mockReviewParameter1,
          mockReviewParameter2,
          mockReviewParameter3,
          mockReviewParameter4,
        ],
      ),
    );
  }
}
