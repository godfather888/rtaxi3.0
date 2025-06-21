import 'package:collection/collection.dart';
import 'package:driver_flutter/core/graphql/fragments/order_request.fragment.graphql.dart';
import 'package:driver_flutter/core/graphql/fragments/point.extentions.dart';
import 'package:driver_flutter/core/graphql/schema.gql.dart';

import 'package:generic_map/interfaces/place.dart';

extension OrderRequestX on Fragment$OrderRequest {
  List<Place> get wayPoints => points
      .mapIndexed(
        (index, element) => Place(
          element.toLatLngEntity,
          addresses[index],
          null,
        ),
      )
      .toList();

  bool get cashPaymentAllowed => service?.paymentMethod != Enum$ServicePaymentMethod.OnlyCredit;
}
