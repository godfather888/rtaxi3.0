// import 'package:api_response/api_response.dart';
// import 'package:collection/collection.dart';
// import 'package:flutter_bloc/flutter_bloc.dart';
// import 'package:freezed_annotation/freezed_annotation.dart';
// import 'package:generic_map/interfaces/place.dart';
// import 'package:injectable/injectable.dart';
// import 'package:latlong2/latlong.dart';

// import 'package:flutter_common/core/entities/payment_method_union.dart';
// import 'package:rider_flutter/core/enums/payment_mode.prod.dart';
// import 'package:rider_flutter/core/extensions/point_fragment.pod.dart';
// import 'package:rider_flutter/core/graphql/fragments/active_order.fragment.graphql.dart';
// import 'package:rider_flutter/core/graphql/fragments/payment_gateway.extentions.dart';
// import 'package:rider_flutter/core/graphql/fragments/saved_payment_method.extentions.dart';
// import 'package:rider_flutter/core/graphql/fragments/service.fragment.graphql.dart';
// import 'package:rider_flutter/core/graphql/fragments/service_category.fragment.graphql.dart';
// import 'package:rider_flutter/core/graphql/schema.gql.dart';
// import 'package:rider_flutter/core/repositories/firebase_repository.dart';
// import 'package:rider_flutter/core/repositories/order_repository.dart';

// import '../../domain/repositories/order_preview_repository.dart';

// part 'order_preview.state.dart';
// part 'order_preview.bloc.freezed.dart';

// @lazySingleton
// class OrderPreviewCubit extends Cubit<OrderPreviewState> {
//   final OrderRepository orderRepository;
//   final OrderPreviewRepository orderPreviewRepository;
//   final FirebaseRepository firebaseRepository;

//   OrderPreviewCubit(this.orderRepository, this.orderPreviewRepository, this.firebaseRepository)
//       : super(const OrderPreviewState.initial());

//   void onStarted(List<Place> waypoints) {
//     fetchRidePreview(
//       Input$CalculateFareInput(
//         points: waypoints
//             .map(
//               (e) => Input$PointInput(
//                 lat: e.latLng.latitude,
//                 lng: e.latLng.longitude,
//               ),
//             )
//             .toList(),
//         couponCode: null,
//         twoWay: false,
//         waitTime: 0,
//         selectedOptionIds: [],
//       ),
//     );
//   }

//   void fetchRidePreview(Input$CalculateFareInput args) async {
//     emit(const OrderPreviewState.loading());
//     final calculasteFareResponse = await orderRepository.calculateFare(
//       args: args,
//     );

//     switch (calculasteFareResponse) {
//       case ApiResponseLoaded(:final data):
//         final walletCredit = data.riderWallets
//                 .map((e) => (e.currency, e.balance))
//                 .toList()
//                 .firstWhereOrNull((e) => e.$1 == data.getFares.currency)
//                 ?.$2 ??
//             0;
//         final paymentMethods = [
//           if (walletCredit > 0) const PaymentMethod$Wallet(),
//           ...(data.paymentGateways.toEntity, data.savedPaymentMethods.toEntity).toPaymentMethodUnion,
//           const PaymentMethod$Cash(),
//         ];

//         emit(
//           OrderPreviewState.loaded(
//             paymentMethods: paymentMethods,
//             serviceCategories: data.getFares.services,
//             currency: data.getFares.currency,
//             walletCredit: walletCredit,
//             directions: data.getFares.directions.toLatLngEntities,
//           ),
//         );
//         break;

//       case ApiResponseError(:final message):
//         emit(OrderPreviewState.error(message));
//         break;

//       case _:
//     }
//   }

//   void goToServicesPage() => _changePage(OrderPreviewPage.services);

//   void goToPaymentMethodPage() => _changePage(OrderPreviewPage.paymentMethods);

//   void _changePage(OrderPreviewPage page) {
//     switch (state) {
//       case OrderPreviewState$Loaded():
//         emit((state as OrderPreviewState$Loaded).copyWith(selectedPage: page));
//         break;
//       default:
//         throw Exception('Invalid state');
//     }
//   }

//   void confirmRide({
//     required Input$CalculateFareInput args,
//     required PaymentMethodUnion selectedPaymentMethod,
//     required DateTime pickupTime,
//     required Fragment$Service selectedService,
//   }) async {
//     switch (state) {
//       case OrderPreviewState$Loaded():
//         emit((state as OrderPreviewState$Loaded).copyWith(isLoading: true));

//       case _:
//     }
//     await firebaseRepository.retrieveAndUpdateFcmToken();
//     final submitOrderResponse = await orderPreviewRepository.submitOrder(
//       args: Input$CreateOrderInput(
//         points: args.points,
//         couponCode: args.couponCode,
//         twoWay: args.twoWay,
//         waitTime: args.waitTime ?? 0,
//         optionIds: args.selectedOptionIds,
//         paymentMode: selectedPaymentMethod.toEntity,
//         // TODO : dateTime , addresses are missing
//         // dateTime: pickupTime,
//         addresses: [],
//         serviceId: int.parse(selectedService.id),
//         intervalMinutes: args.waitTime ?? 0,
//       ),
//     );

//     switch (submitOrderResponse) {
//       case ApiResponseLoaded(:final data):
//         emit(
//           OrderPreviewState.orderSubmitted(
//             order: Fragment$ActiveOrder(order: data.createOrder),
//           ),
//         );
//       case ApiResponseError(:final message):
//         emit(OrderPreviewState.error(message));
//       case _:
//     }
//   }
// }
