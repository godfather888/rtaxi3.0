import 'package:collection/collection.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:ionicons/ionicons.dart';
import 'package:flutter_common/core/color_palette/color_palette.dart';
import 'package:rider_flutter/config/locator/locator.dart';
import 'package:flutter_common/core/entities/payment_method_union.dart';
import 'package:rider_flutter/core/blocs/home.bloc.dart';
import 'package:rider_flutter/core/blocs/location.bloc.dart';
import 'package:rider_flutter/core/extensions/extensions.dart';
import 'package:flutter_common/core/presentation/buttons/app_back_button.dart';
import 'package:flutter_common/core/presentation/app_card_sheet.dart';
import 'package:flutter_common/core/presentation/buttons/app_primary_button.dart';
import 'package:flutter_common/core/presentation/buttons/app_text_button.dart';
import 'package:flutter_common/core/presentation/card_handle.dart';
import 'package:rider_flutter/core/graphql/fragments/ride_option.fragment.graphql.dart';
import 'package:rider_flutter/core/graphql/fragments/service_category.fragment.graphql.dart';
import 'package:rider_flutter/core/graphql/schema.gql.dart';
import 'package:rider_flutter/core/presentation/payment_method_select_field.dart';
import 'package:rider_flutter/features/home/features/apply_coupon/presentation/dialogs/enter_coupon_dialog.dart';
import 'package:rider_flutter/features/home/features/order_preview/presentation/screens/select_payment_method_sheet.dart';

import '../components/service_item.dart';
import '../dialogs/reserve_time_dialog.dart';
import '../dialogs/ride_preferences_dialog.dart';

class ServicesSelectionSheet extends StatefulWidget {
  final List<PaymentMethodUnion> paymentMethods;
  final List<Fragment$ServiceCategory> serviceCategories;
  final double walletCredit;
  final String currency;

  const ServicesSelectionSheet({
    super.key,
    required this.paymentMethods,
    required this.serviceCategories,
    required this.walletCredit,
    required this.currency,
  });

  @override
  State<ServicesSelectionSheet> createState() => _ServicesSelectionSheetState();
}

class _ServicesSelectionSheetState extends State<ServicesSelectionSheet> with TickerProviderStateMixin {
  final homeBloc = locator<HomeBloc>();
  @override
  Widget build(BuildContext context) {
    return AppCardSheet(
      child: BlocBuilder<HomeBloc, HomeState>(
        builder: (context, state) {
          return SafeArea(
            top: false,
            child: DefaultTabController(
              length: widget.serviceCategories.length,
              initialIndex: state.selectedServiceCategory == null
                  ? 0
                  : widget.serviceCategories.indexOf(state.selectedServiceCategory!),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Align(
                    alignment: Alignment.centerLeft,
                    child: context.responsive(
                      const CardHandle(),
                      xl: Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: AppBackButton(
                          onPressed: () => homeBloc.add(
                            HomeEvent.initializeWelcome(pickupPoint: locator<LocationCubit>().state.place),
                          ),
                        ),
                      ),
                    ),
                  ),
                  Visibility(
                    visible: widget.serviceCategories.length > 1,
                    child: SegmentedButton<Fragment$ServiceCategory?>(
                      multiSelectionEnabled: false,
                      onSelectionChanged: (value) => homeBloc.onServiceCategorySelected(value.first!),
                      segments: widget.serviceCategories
                          .map(
                            (e) => ButtonSegment(
                              value: e,
                              label: Text(e.name),
                            ),
                          )
                          .toList(),
                      selected: {state.selectedServiceCategory},
                    ),
                  ),
                  const SizedBox(height: 20),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 16),
                    height: context.responsive(250),
                    child: TabBarView(
                      physics: const NeverScrollableScrollPhysics(),
                      controller: TabController(
                        length: widget.serviceCategories.length,
                        initialIndex: state.selectedServiceCategory == null
                            ? 0
                            : widget.serviceCategories.indexOf(state.selectedServiceCategory!),
                        vsync: this,
                      ),
                      children: widget.serviceCategories.mapIndexed(
                        (index, e) {
                          return ListView.separated(
                            padding: EdgeInsets.zero,
                            itemCount: e.services.length,
                            separatorBuilder: (context, index) => const SizedBox(height: 16),
                            itemBuilder: (context, index) {
                              return ServiceItem(
                                currency: widget.currency,
                                entity: e.services[index],
                                isSelected: state.selectedService?.id == e.services[index].id,
                                onPressed: () {
                                  homeBloc.add(HomeEvent.onServiceSelected(service: e.services[index], value: true));
                                },
                              );
                            },
                          );
                        },
                      ).toList(),
                    ),
                  ),
                  Container(
                    height: 16,
                    decoration: BoxDecoration(
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withValues(alpha: 0.02),
                          blurRadius: 10,
                          offset: const Offset(0, -5),
                        )
                      ],
                      color: ColorPalette.neutralVariant99,
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 16),
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        PaymentMethodSelectField(
                          paymentMethod: state.selectedPaymentMethod,
                          onPressed: () {
                            final selectedService = state.selectedService;
                            final selectedPaymentMethod = locator<HomeBloc>().state.selectedPaymentMethod;

                            final serviceFee = selectedService?.cost ?? 0;
                            final priceAfterCoupon = selectedService?.costAfterCoupon ?? 0;
                            final couponDiscount =
                                selectedService?.costAfterCoupon == null ? 0 : priceAfterCoupon - serviceFee;

                            showDialog(
                                context: context,
                                useSafeArea: false,
                                builder: (context) {
                                  return SelectPaymentMethodSheet(
                                    isCashPaymentEnabled:
                                        selectedService?.paymentMethod == Enum$ServicePaymentMethod.OnlyCash ||
                                            selectedService?.paymentMethod == Enum$ServicePaymentMethod.CashCredit,
                                    selectedPaymentMethod: selectedPaymentMethod,
                                    paymentMethods: widget.paymentMethods,
                                    walletCredit: widget.walletCredit,
                                    serviceFee: serviceFee,
                                    couponDiscount: couponDiscount.toDouble(),
                                    currency: widget.currency,
                                    serviceOptionFee: 0,
                                  );
                                });
                          },
                        ),
                        const Divider(
                          color: ColorPalette.neutral95,
                          height: 24,
                        ),
                        Row(
                          children: [
                            AppTextButton(
                              isDense: true,
                              badge: state.rideOptions.length +
                                  (state.isTwoWayRide ? 1 : 0) +
                                  (state.waitTime == null ? 0 : 1),
                              text: context.translate.ridePreferences,
                              iconData: Ionicons.options,
                              onPressed: () async {
                                final dialogResult = await showDialog<(bool, int?, List<Fragment$RideOption>)>(
                                  context: context,
                                  useSafeArea: false,
                                  builder: (context) => RidePreferencesDialog(
                                    currency: widget.currency,
                                    selectedRideOptions: homeBloc.state.rideOptions,
                                    rideOptions: homeBloc.state.selectedService?.options ?? [],
                                    isTwoWayTrip: homeBloc.state.isTwoWayRide,
                                    defaultWaitTime: homeBloc.state.waitTime,
                                  ),
                                );
                                if (dialogResult != null) {
                                  homeBloc.add(
                                    HomeEvent.onRidePreferencesUpdated(
                                      isTwoWayTrip: dialogResult.$1,
                                      waitTime: dialogResult.$2,
                                      rideOptions: dialogResult.$3,
                                    ),
                                  );
                                }
                              },
                            ),
                            const Spacer(),
                            AppTextButton(
                              isDense: true,
                              text: context.translate.couponCode,
                              iconData: Ionicons.ticket,
                              onPressed: () async {
                                final dialogResult = await showDialog<String>(
                                  context: context,
                                  useSafeArea: false,
                                  builder: (context) => EnterCouponDialog(
                                    calculateFareArgs: Input$CalculateFareInput(points: []),
                                  ),
                                );
                                if (dialogResult != null) {
                                  // homeBloc.onCouponCodeChanged(dialogResult);
                                }
                              },
                            ),
                          ],
                        ),
                        const SizedBox(
                          height: 16,
                        ),
                        Row(
                          children: [
                            AppPrimaryButton(
                              isDisabled: !state.canSubmitOrder,
                              onPressed: () async {
                                final result = await showDialog<DateTime>(
                                  context: context,
                                  useSafeArea: false,
                                  builder: (context) => const ReserveTimeDialog(),
                                );
                                if (result != null) {
                                  homeBloc.add(
                                    HomeEvent.submitOrder(
                                      selectedDateTime: result,
                                    ),
                                  );
                                }
                              },
                              child: const Icon(
                                Ionicons.calendar,
                                color: Colors.white,
                              ),
                            ),
                            const SizedBox(width: 16),
                            Expanded(
                              child: AppPrimaryButton(
                                isDisabled: !state.canSubmitOrder,
                                onPressed: () {
                                  homeBloc.add(
                                    HomeEvent.submitOrder(
                                      selectedDateTime: DateTime.now(),
                                    ),
                                  );
                                },
                                child: Text(
                                  context.translate.bookNow,
                                ),
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  )
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}
