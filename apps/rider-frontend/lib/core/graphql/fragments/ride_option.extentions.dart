import 'package:flutter_common/core/entities/ride_option.dart';
import 'package:rider_flutter/core/enums/ride_option_icon.prod.dart';
import 'package:rider_flutter/core/graphql/fragments/ride_option.fragment.graphql.dart';

extension CurrentOrderX on Fragment$RideOption {
  RideOptionEntity get toRideOptionEntity => RideOptionEntity(
        id: id,
        name: name,
        icon: icon.toEntity,
        description: description,
        price: additionalFee,
      );
}
