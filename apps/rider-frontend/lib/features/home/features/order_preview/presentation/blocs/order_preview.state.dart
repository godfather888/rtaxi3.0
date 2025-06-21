// part of 'order_preview.bloc.dart';

// @freezed
// sealed class OrderPreviewState with _$OrderPreviewState {
//   const factory OrderPreviewState.initial() = OrderPreviewState$Initial;

//   const factory OrderPreviewState.loading() = OrderPreviewState$Loading;

//   const factory OrderPreviewState.loaded({
//     required List<PaymentMethodUnion> paymentMethods,
//     required List<Fragment$ServiceCategory> serviceCategories,
//     required String currency,
//     required List<LatLng> directions,
//     required double walletCredit,
//     @Default(false) bool isLoading,
//     @Default(OrderPreviewPage.services) OrderPreviewPage selectedPage,
//   }) = OrderPreviewState$Loaded;

//   const factory OrderPreviewState.orderSubmitted({
//     required Fragment$ActiveOrder order,
//   }) = OrderPreviewState$OrderSubmitted;

//   const factory OrderPreviewState.error(String message) = OrderPreviewState$Error;

//   const OrderPreviewState._();

//   bool get isLoading => switch (this) {
//         OrderPreviewState$Loading() => true,
//         OrderPreviewState$Loaded(:final isLoading) => isLoading,
//         _ => false,
//       };
// }

// enum OrderPreviewPage { services, paymentMethods }

// extension OrderPreviewPageX on OrderPreviewPage {
//   // when method
//   R when<R>({
//     required R Function() services,
//     required R Function() paymentMethods,
//   }) {
//     switch (this) {
//       case OrderPreviewPage.services:
//         return services();
//       case OrderPreviewPage.paymentMethods:
//         return paymentMethods();
//     }
//   }
// }

// extension OrderPreviewLoadedStateX on OrderPreviewState$Loaded {
//   PaymentMethodUnion? defaultPaymentMethod(Fragment$Service? service) {
//     if (service != null && walletCredit > service.cost) {
//       return const PaymentMethod$Wallet();
//     }
//     final defaultSavedPaymentMethod = paymentMethods.firstWhereOrNull(
//       (element) =>
//           switch (element) { SavedPaymentMethod(:final savedPaymentMethod) => savedPaymentMethod.isDefault, _ => false },
//     );
//     return defaultSavedPaymentMethod;
//   }
// }
