import 'package:api_response/api_response.dart';
import 'package:injectable/injectable.dart';
import 'package:driver_flutter/core/graphql/documents/announcements.graphql.dart';
import 'package:driver_flutter/core/datasources/graphql_datasource.dart';
import '../../domain/repositories/announcements_repository.dart';

@prod
@LazySingleton(as: AnnouncementsRepository)
class AnnouncementsRepositoryImpl implements AnnouncementsRepository {
  final GraphqlDatasource graphQLDatasource;

  AnnouncementsRepositoryImpl(
    this.graphQLDatasource,
  );

  @override
  Future<ApiResponse<Query$Announcements>> getAnnouncements() async {
    final announcementsResponse = await graphQLDatasource.query(
      Options$Query$Announcements(),
    );
    return announcementsResponse;
  }
}
