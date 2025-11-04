// ignore_for_file: depend_on_referenced_packages

import 'dart:convert';

import 'package:cross_file/cross_file.dart';
import 'package:injectable/injectable.dart';
import 'package:http/http.dart';
import 'package:http_parser/http_parser.dart';
import 'package:path/path.dart' as path;
import 'package:rider_flutter/config/env.dart';
import 'package:rider_flutter/config/locator/locator.dart';
import 'package:rider_flutter/core/blocs/auth_bloc.dart';
import 'package:rider_flutter/core/graphql/fragments/media.fragment.graphql.dart';

import 'upload_datasource.dart';

@LazySingleton(as: UploadDatasource)
class UploadDatasourceImpl implements UploadDatasource {
  UploadDatasourceImpl();

  @override
  Future<Fragment$Media> uploadProfilePicture(XFile file) async {
    String? token = locator<AuthBloc>().state.jwtToken;
    if (token == null) {
      throw Exception('Token is null');
    }
    final serverUrl = path.join(Env.serverUrl, 'upload_profile');
    return _uploadFile(serverUrl, token, file);
  }

  Future<Fragment$Media> _uploadFile(String serverUrl, String authorizationToken, XFile file) async {
    var postUri = Uri.parse(serverUrl);
    var request = MultipartRequest("POST", postUri);
    request.headers['Authorization'] = 'Bearer $authorizationToken';
    
    final bytes = await file.readAsBytes();
    final fileName = file.name.isNotEmpty ? file.name : 'upload.jpg';
    final mimeType = file.mimeType ?? 'image/jpeg';
    
    request.files.add(MultipartFile.fromBytes(
      'file',
      bytes,
      filename: fileName,
      contentType: MediaType.parse(mimeType),
    ));
    
    final stramedResponse = await request.send();
    var response = await Response.fromStream(stramedResponse);
    var json = jsonDecode(response.body);
    
    if (json['id'] is int) {
      json['id'] = json['id'].toString();
    }
    if (!json.containsKey('__typename')) {
      json['__typename'] = 'Media';
    }
    
    var media = Fragment$Media.fromJson(json);
    return media;
  }
}
