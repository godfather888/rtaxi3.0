// import 'package:flutter_bloc/flutter_bloc.dart';
// import 'package:freezed_annotation/freezed_annotation.dart';
// import 'package:injectable/injectable.dart';
// import 'package:flutter_common/core/entities/payment_method_union.dart';
// import 'package:rider_flutter/core/graphql/fragments/service.fragment.graphql.dart';
// import 'package:rider_flutter/core/graphql/fragments/service_category.fragment.graphql.dart';

// part 'order_preview_options.state.dart';
// part 'order_preview_options.bloc.freezed.dart';

// @lazySingleton
// class OrderPreviewOptionsCubit extends Cubit<OrderPreviewOptionsState> {
//   OrderPreviewOptionsCubit() : super(OrderPreviewOptionsState.initial());

//   void onPaymentMethodSelected(PaymentMethodUnion paymentMethod) {
//     emit(state.copyWith(
//       paymentMethod: paymentMethod,
//     ));
//   }

//   void onServiceSelected(Fragment$Service service) {
//     emit(
//       state.copyWith(
//         selectedService: service,
//       ),
//     );
//   }

//   void onServiceCategorySelected(Fragment$ServiceCategory serviceCategory) {
//     emit(
//       state.copyWith(
//         selectedServiceCategory: serviceCategory,
//       ),
//     );
//   }
// }
