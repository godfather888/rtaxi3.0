import 'package:api_response/api_response.dart';
import 'package:collection/collection.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:generic_map/interfaces/place.dart';
import 'package:rider_flutter/config/locator/locator.dart';
import 'package:flutter_common/core/presentation/app_card_sheet.dart';
import 'package:rider_flutter/core/blocs/home.bloc.dart';
import 'package:rider_flutter/core/blocs/payment_methods.bloc.dart';
import 'package:rider_flutter/core/extensions/extensions.dart';
import 'package:rider_flutter/core/graphql/schema.gql.dart';
import 'package:rider_flutter/features/home/features/order_preview/presentation/dialogs/reserve_success_dialog.dart';
import 'package:rider_flutter/features/home/features/order_preview/presentation/screens/service_selection_sheet.dart';
import 'package:rider_flutter/gen/assets.gen.dart';

class OrderPreviewSheet extends StatefulWidget {
  final List<Place> wayPoints;

  const OrderPreviewSheet({
    super.key,
    required this.wayPoints,
  });

  @override
  State<OrderPreviewSheet> createState() => _OrderPreviewSheetState();
}

class _OrderPreviewSheetState extends State<OrderPreviewSheet> with TickerProviderStateMixin {
  @override
  void initState() {
    super.initState();
    locator<PaymentMethodsBloc>().load();
  }

  @override
  Widget build(BuildContext context) {
    return BlocProvider.value(
      value: locator<PaymentMethodsBloc>(),
      child: BlocConsumer<HomeBloc, HomeState>(
        listener: (context, state) {
          if (state.createOrderResponse.isLoaded) {
            final order = state.createOrderResponse.data!;
            if (order.order.status == Enum$OrderStatus.Booked) {
              showDialog(context: context, useSafeArea: false, builder: (context) => const ReserveSuccessDialog());
              locator<HomeBloc>().add(HomeEvent.initializeWelcome(pickupPoint: state.waypoints.firstOrNull));
            } else if (order.order.status == Enum$OrderStatus.NoCloseFound || order.order.status == Enum$OrderStatus.NotFound) {
              // No drivers found - show error and reset state
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(
                  content: Text(context.translate.noDriversFoundError),
                  backgroundColor: Colors.red,
                  duration: const Duration(seconds: 5),
                ),
              );
              locator<HomeBloc>().add(HomeEvent.initializeWelcome(pickupPoint: state.waypoints.firstOrNull));
            }
          } else if (state.createOrderResponse.isError) {
            // Show error message
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(
                content: Text(state.createOrderResponse.errorMessage ?? context.translate.orderCreationError),
                backgroundColor: Colors.red,
                duration: const Duration(seconds: 5),
              ),
            );
          }
        },
        builder: (context, state) {
          return AnimatedSwitcher(
            duration: const Duration(milliseconds: 300),
            child: switch (state.ridePreviewFareResponse) {
              ApiResponseInitial() => const SizedBox.shrink(),
              ApiResponseError(:final errorMessage) => Text(errorMessage ?? 'An error occurred'),
              ApiResponseLoading() => AppCardSheet(
                  child: Assets.lottie.loading.lottie(
                    width: double.infinity,
                    height: 400,
                  ),
                ),
              ApiResponseLoaded(
                :final data,
              ) =>
                BlocBuilder<PaymentMethodsBloc, PaymentMethodsState>(
                  builder: (context, statePaymentMethod) {
                    return ServicesSelectionSheet(
                      paymentMethods: statePaymentMethod.allPaymentMethods,
                      serviceCategories: data.getFares.services,
                      currency: data.getFares.currency,
                      walletCredit: data.riderWallets
                              .firstWhereOrNull(
                                (wallet) => wallet.currency == data.getFares.currency,
                              )
                              ?.balance ??
                          0,
                    );
                  },
                ),
            },
          );
        },
      ),
    );
  }
}
