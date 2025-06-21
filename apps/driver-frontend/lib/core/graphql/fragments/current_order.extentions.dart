import 'package:collection/collection.dart';
import 'package:dartz/dartz.dart';
import 'package:driver_flutter/core/graphql/fragments/current_order.fragment.graphql.dart';
import 'package:driver_flutter/core/graphql/fragments/point.extentions.dart';
import 'package:driver_flutter/core/graphql/schema.gql.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_common/core/extensions/extensions.dart';
import 'package:generic_map/interfaces/place.dart';

extension CurrentOrderX on Fragment$CurrentOrder {
  Option<Either<String, String>> get avatar => rider?.media?.address != null
      ? Some(Right(rider!.media!.address))
      : rider?.presetAvatarNumber != null
          ? Some(Left('assets/avatars/a${rider?.presetAvatarNumber}.png'))
          : const None();

  String get riderFullName => '${rider?.firstName} ${rider?.lastName}';

  double get total => switch (paymentMode) {
        Enum$PaymentMode.Cash => costAfterCoupon,
        _ => (costBest - providerShare),
      };

  DateTime? get expectedDesintationArrival => startTimestamp?.add(
        Duration(
          seconds: durationBest,
        ),
      );

  String? expectedArrival(BuildContext context) => expectedDesintationArrival?.minutesFromNow(context);

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

  bool get isPaid => switch (paymentMode) {
        Enum$PaymentMode.Cash => false,
        Enum$PaymentMode.SavedPaymentMethod => true,
        Enum$PaymentMode.Wallet => true,
        Enum$PaymentMode.PaymentGateway => paidAmount > costAfterCoupon,
        _ => false,
      };
}
