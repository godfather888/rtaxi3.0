import 'package:driver_flutter/core/datasources/upload_datasource.dart';
import 'package:driver_flutter/core/graphql/fragments/media.fragment.graphql.dart';
import 'package:injectable/injectable.dart';
import 'package:cross_file/cross_file.dart';

@dev
@LazySingleton(as: UploadDatasource)
class UploadDatasourceMock implements UploadDatasource {
  @override
  Future<Fragment$Media> uploadProfilePicture(XFile file) async {
    return Fragment$Media(id: "1", address: "https://i.ibb.co/vXkk90M/person.png");
  }

  @override
  Future<Fragment$Media> uploadDocument(XFile file) async {
    return Fragment$Media(id: "1", address: "https://i.ibb.co/vXkk90M/person.png");
  }
}
