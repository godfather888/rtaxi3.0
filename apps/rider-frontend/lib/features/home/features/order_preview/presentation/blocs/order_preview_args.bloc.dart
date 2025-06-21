// import 'package:flutter_bloc/flutter_bloc.dart';
// import 'package:freezed_annotation/freezed_annotation.dart';
// import 'package:generic_map/interfaces/place.dart';
// import 'package:injectable/injectable.dart';
// import 'package:flutter_common/core/entities/ride_option.dart';
// import 'package:rider_flutter/core/graphql/schema.gql.dart';

// part 'order_preview_args.state.dart';
// part 'order_preview_args.bloc.freezed.dart';

// @LazySingleton()
// class OrderPreviewArgsCubit extends Cubit<OrderPreviewArgsState> {
//   OrderPreviewArgsCubit() : super(OrderPreviewArgsState.initial());

//   void onStarted(List<Place> waypoints) {
//     emit(
//       state.copyWith(
//         waypoints: waypoints,
//       ),
//     );
//   }

//   void onCouponCodeChanged(String couponCode) {
//     emit(state.copyWith(couponCode: couponCode));
//   }

//   void onRidePreferencesChanged({
//     required List<RideOptionEntity> rideOptions,
//     required int? waitTime,
//     required bool isTwoWayTrip,
//   }) {
//     emit(
//       state.copyWith(
//         rideOptions: rideOptions,
//         waitTime: waitTime,
//         isTwoWay: isTwoWayTrip,
//       ),
//     );
//   }
// }
