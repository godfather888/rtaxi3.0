// part of 'order_preview_args.bloc.dart';

// @freezed
// sealed class OrderPreviewArgsState with _$OrderPreviewArgsState {
//   const factory OrderPreviewArgsState({
//     required List<Place> waypoints,
//     required String? couponCode,
//     required bool isTwoWay,
//     required int? waitTime,
//     required List<RideOptionEntity> rideOptions,
//   }) = _OrderPreviewArgsState;

//   factory OrderPreviewArgsState.initial() => const OrderPreviewArgsState(
//         waypoints: [],
//         couponCode: null,
//         isTwoWay: false,
//         waitTime: null,
//         rideOptions: [],
//       );

//   const OrderPreviewArgsState._();

//   Input$CalculateFareInput get calculateFareArgs => Input$CalculateFareInput(
//         points: waypoints
//             .map(
//               (e) => Input$PointInput(
//                 lat: e.latLng.latitude,
//                 lng: e.latLng.longitude,
//               ),
//             )
//             .toList(),
//         couponCode: couponCode,
//         twoWay: isTwoWay,
//         waitTime: waitTime,
//         selectedOptionIds: rideOptions.map((e) => e.id).toList(),
//       );
// }
