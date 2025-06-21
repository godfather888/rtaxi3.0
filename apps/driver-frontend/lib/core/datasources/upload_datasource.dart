import 'package:driver_flutter/core/graphql/fragments/media.fragment.graphql.dart';

abstract class UploadDatasource {
  Future<Fragment$Media> uploadProfilePicture(String filePath);
  Future<Fragment$Media> uploadDocument(String filePath);
}
