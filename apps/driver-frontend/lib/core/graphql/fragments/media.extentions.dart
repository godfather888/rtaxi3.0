import 'package:driver_flutter/core/graphql/fragments/media.fragment.graphql.dart';

extension MediaX on String {
  Fragment$Media get toMedia => Fragment$Media(
        id: "1",
        address: this,
      );
}
