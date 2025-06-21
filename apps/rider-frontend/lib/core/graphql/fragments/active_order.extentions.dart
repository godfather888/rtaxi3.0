import 'package:collection/collection.dart';
import 'package:flutter_common/core/entities/payment_method_union.dart';
import 'package:generic_map/interfaces/place.dart';
import 'package:rider_flutter/core/enums/payment_mode.prod.dart';
import 'package:rider_flutter/core/extensions/point_fragment.pod.dart';
import 'package:rider_flutter/core/graphql/fragments/active_order.fragment.graphql.dart';

import 'package:rider_flutter/core/graphql/fragments/payment_gateway.extentions.dart';
import 'package:rider_flutter/core/graphql/fragments/saved_payment_method.extentions.dart';

extension CurrentOrderX on Fragment$CurrentOrder {
  bool get isTwoWayTrip => addresses.first == addresses.last;

  List<Place> get wayPoints {
    return points
        .mapIndexed(
          (index, element) => Place(element.toLatLng, addresses.length > index ? addresses[index] : '-', null),
        )
        .toList();
  }

  PaymentMethodUnion get paymentMethodUnion {
    return (
      paymentMode?.toEntity,
      paymentGateway?.toEntity,
      savedPaymentMethod?.toEntity,
    ).toUnion;
  }
}
