import 'package:rider_flutter/core/graphql/fragments/media.fragment.graphql.dart';

abstract class UploadDatasource {
  Future<Fragment$Media> uploadProfilePicture(String filePath);
}
