// ignore_for_file: depend_on_referenced_packages

import 'package:driver_flutter/core/graphql/fragments/media.fragment.graphql.dart';
import 'package:cross_file/cross_file.dart';

abstract class UploadDatasource {
  Future<Fragment$Media> uploadProfilePicture(XFile file);
  Future<Fragment$Media> uploadDocument(
    XFile file, {
    required String documentId,
  });
}
