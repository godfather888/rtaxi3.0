import 'package:api_response/api_response.dart';
import 'package:rider_flutter/core/graphql/documents/announcements.graphql.dart';
import '../../domain/repositories/announcements_repository.dart';
import 'package:injectable/injectable.dart';

@dev
@LazySingleton(as: AnnouncementsRepository)
class AnnouncementsRepositoryMock implements AnnouncementsRepository {
  @override
  Future<ApiResponse<Query$Announcements>> getAnnouncements() async {
    await Future.delayed(const Duration(seconds: 1));

    return ApiResponse.loaded(
      Query$Announcements(
        announcements: [
          Query$Announcements$announcements(
            id: "1",
            title: "Get discounts with gifts!",
            description: "Lorem ipsum dolor sit amet, consetetur sadipscing voluptua. At vero eos et",
            url: null,
            startAt: DateTime.now().subtract(
              Duration(days: 4),
            ),
            expireAt: DateTime.now().add(
              Duration(days: 4),
            ),
          ),
          Query$Announcements$announcements(
            id: "2",
            title: "Get rides with your favorite driver anytime they are around!",
            description:
                "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et",
            url: null,
            startAt: DateTime.now().subtract(
              Duration(days: 3),
            ),
            expireAt: DateTime.now().add(
              Duration(days: 3),
            ),
          ),
          Query$Announcements$announcements(
            id: "3",
            title: "You got 5 stars from 15 drivers!",
            description:
                "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquy",
            url: "https://ridy.io",
            startAt: DateTime.now().subtract(
              Duration(days: 2),
            ),
            expireAt: DateTime.now().add(
              Duration(days: 2),
            ),
          )
        ],
      ),
    );
  }
}
