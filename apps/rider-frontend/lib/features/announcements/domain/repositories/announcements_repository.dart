import 'package:api_response/api_response.dart';

import 'package:rider_flutter/core/graphql/documents/announcements.graphql.dart';

abstract class AnnouncementsRepository {
  Future<ApiResponse<Query$Announcements>> getAnnouncements();
}
