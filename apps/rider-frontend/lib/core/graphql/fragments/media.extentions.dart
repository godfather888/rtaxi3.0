import 'package:rider_flutter/core/graphql/fragments/media.fragment.graphql.dart';

extension MediaX on String {
  Fragment$Media get toMedia {
    return Fragment$Media(id: "1", address: this);
  }
}
