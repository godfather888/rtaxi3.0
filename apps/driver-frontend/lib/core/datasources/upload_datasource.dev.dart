import 'package:driver_flutter/core/datasources/upload_datasource.dart';
import 'package:driver_flutter/core/graphql/fragments/media.fragment.graphql.dart';
import 'package:injectable/injectable.dart';

@dev
@LazySingleton(as: UploadDatasource)
class UploadDatasourceMock implements UploadDatasource {
  @override
  Future<Fragment$Media> uploadProfilePicture(String filePath) async {
    return Fragment$Media(id: "1", address: "https://i.ibb.co/vXkk90M/person.png");
  }

  @override
  Future<Fragment$Media> uploadDocument(String filePath) async {
    return Fragment$Media(id: "1", address: "https://i.ibb.co/vXkk90M/person.png");
  }
}
