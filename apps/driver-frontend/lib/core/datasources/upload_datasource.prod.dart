// ignore_for_file: depend_on_referenced_packages

import 'dart:convert';

import 'package:driver_flutter/core/graphql/fragments/media.fragment.graphql.dart';
import 'package:injectable/injectable.dart';
import 'package:http/http.dart';
import 'package:http_parser/http_parser.dart';
import 'package:path/path.dart' as path;
import 'package:driver_flutter/config/env.dart';
import 'package:driver_flutter/config/locator/locator.dart';
import 'package:driver_flutter/core/blocs/auth_bloc.dart';
import 'package:flutter/foundation.dart';
import 'package:cross_file/cross_file.dart';

import 'upload_datasource.dart';

@prod
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
    
    // Читаем байты из XFile (работает и на Web, и на мобильных)
    final bytes = await file.readAsBytes();
    final fileName = file.name.isNotEmpty ? file.name : 'upload.jpg';
    
    // Определяем MIME type
    String? mimeType;
    if (fileName.toLowerCase().endsWith('.jpg') || fileName.toLowerCase().endsWith('.jpeg')) {
      mimeType = 'image/jpeg';
    } else if (fileName.toLowerCase().endsWith('.png')) {
      mimeType = 'image/png';
    } else if (fileName.toLowerCase().endsWith('.gif')) {
      mimeType = 'image/gif';
    }
    
    request.files.add(MultipartFile.fromBytes(
      'file',
      bytes,
      filename: fileName,
      contentType: mimeType != null ? MediaType.parse(mimeType) : null,
    ));
    
    final stramedResponse = await request.send();
    var response = await Response.fromStream(stramedResponse);
    
    // Проверяем статус
    if (response.statusCode >= 400) {
      throw Exception('Upload failed: ${response.statusCode} - ${response.body}');
    }
    
    var json = jsonDecode(response.body);
    
    // Преобразуем id в String (сервер возвращает int)
    if (json['id'] is int) {
      json['id'] = json['id'].toString();
    }
    
    // Добавляем __typename если отсутствует (REST API не возвращает его)
    if (!json.containsKey('__typename')) {
      json['__typename'] = 'Media';
    }
    
    final media = Fragment$Media.fromJson(json);

    return Fragment$Media(
      id: media.id,
      address: media.address,
    );
  }

  @override
  Future<Fragment$Media> uploadDocument(XFile file) {
    String? token = locator<AuthBloc>().state.jwtToken;
    if (token == null) {
      throw Exception('Token is null');
    }
    final serverUrl = path.join(Env.serverUrl, 'upload_document');
    return _uploadFile(serverUrl, token, file);
  }
}
