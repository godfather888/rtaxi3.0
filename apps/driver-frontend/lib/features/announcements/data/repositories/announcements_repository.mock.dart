import 'package:api_response/api_response.dart';
import 'package:driver_flutter/core/graphql/documents/announcements.graphql.dart';
import 'package:driver_flutter/core/graphql/fragments/announcement.mock.dart';
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
        announcements: mockAnnouncements,
      ),
    );
  }
}
