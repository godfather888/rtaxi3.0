import 'package:flutter/material.dart';
import 'package:ionicons/ionicons.dart';
import 'package:rider_flutter/core/extensions/extensions.dart';
import 'package:rider_flutter/core/graphql/schema.gql.dart';

extension AddressTypeX on Enum$RiderAddressType {
  String name(BuildContext context) => switch (this) {
        Enum$RiderAddressType.Home => context.translate.home,
        Enum$RiderAddressType.Work => context.translate.addressWork,
        Enum$RiderAddressType.Partner => context.translate.addressPartner,
        Enum$RiderAddressType.Gym => context.translate.addressGym,
        Enum$RiderAddressType.Parent => context.translate.addressParent,
        Enum$RiderAddressType.Cafe => context.translate.addressCafe,
        Enum$RiderAddressType.Park => context.translate.addressPark,
        Enum$RiderAddressType.Other => context.translate.addressOther,
        Enum$RiderAddressType.$unknown => context.translate.unknown
      };

  IconData get icon => switch (this) {
        Enum$RiderAddressType.Home => Ionicons.home,
        Enum$RiderAddressType.Work => Ionicons.business,
        Enum$RiderAddressType.Partner => Ionicons.heart,
        Enum$RiderAddressType.Gym => Ionicons.fitness,
        Enum$RiderAddressType.Parent => Ionicons.people,
        Enum$RiderAddressType.Cafe => Ionicons.cafe,
        Enum$RiderAddressType.Park => Ionicons.leaf,
        Enum$RiderAddressType.Other => Ionicons.ellipsis_horizontal_circle,
        Enum$RiderAddressType.$unknown => Ionicons.alert_circle
      };
}
