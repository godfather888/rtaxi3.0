import 'package:api_response/api_response.dart';
import 'package:driver_flutter/core/graphql/documents/profile.graphql.dart';
import 'package:driver_flutter/core/graphql/fragments/media.fragment.graphql.dart';
import 'package:driver_flutter/core/graphql/fragments/profile.mock.dart';
import 'package:injectable/injectable.dart';
import 'package:driver_flutter/features/profile/domain/repositories/profile_repository.dart';

@dev
@LazySingleton(as: ProfileRepository)
class ProfileRepositoryMock implements ProfileRepository {
  @override
  Future<ApiResponse<Query$ProfileAggregations>> getProfileAggregationsInfo() async {
    await Future.delayed(const Duration(seconds: 1));
    return ApiResponse.loaded(
      Query$ProfileAggregations(
        driver: Query$ProfileAggregations$driver(
          historyOrdersAggregate: [
            Query$ProfileAggregations$driver$historyOrdersAggregate(
              count: Query$ProfileAggregations$driver$historyOrdersAggregate$count(
                id: 23,
              ),
              sum: Query$ProfileAggregations$driver$historyOrdersAggregate$sum(
                distanceBest: 54,
              ),
            ),
            Query$ProfileAggregations$driver$historyOrdersAggregate(
              count: Query$ProfileAggregations$driver$historyOrdersAggregate$count(
                id: 12,
              ),
              sum: Query$ProfileAggregations$driver$historyOrdersAggregate$sum(
                distanceBest: 34,
              ),
            ),
          ],
        ),
      ),
    );
  }

  @override
  Future<ApiResponse<Mutation$UpdateProfileImage>> uploadProfileImage({required Fragment$Media image}) async {
    await Future.delayed(const Duration(seconds: 1));
    return ApiResponse.loaded(
      Mutation$UpdateProfileImage(
        updateOneDriver: mockProfileFull1,
      ),
    );
  }

  @override
  Future<ApiResponse<Query$FeedbacksSummary>> getFeedbacksSummary() async {
    await Future.delayed(const Duration(seconds: 1));
    return ApiResponse.loaded(
      Query$FeedbacksSummary(
        feedbacksSummary: Query$FeedbacksSummary$feedbacksSummary(
          averageRating: 23,
          goodPoints: [
            "Great vehicle condition",
            "Good routing",
            "Polite",
          ],
          badPoints: ['Unsafe driving'],
          goodReviews: [
            Query$FeedbacksSummary$feedbacksSummary$goodReviews(
              serviceName: 'Economy',
              rating: 4.5,
              review: 'Excellence driving and a very good car condition one of the best rides I have ever had',
              goodPoints: [
                "Good routing",
                "Polite",
              ],
            ),
          ],
        ),
      ),
    );
  }
}
