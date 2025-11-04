import 'package:rider_flutter/config/env.dart';
import 'package:rider_flutter/core/graphql/fragments/media.fragment.graphql.dart';

extension MediaX on String {
  Fragment$Media get toMedia {
    return Fragment$Media(id: "1", address: this);
  }
}

extension Fragment$MediaX on Fragment$Media {
  String get fullUrl {
    // If address is already a full URL, return as is
    if (address.startsWith('http://') || address.startsWith('https://')) {
      return address;
    }
    
    // Remove leading slashes and combine with server URL
    final cleanAddress = address.startsWith('/') ? address.substring(1) : address;
    return '${Env.serverUrl}$cleanAddress';
  }
}
