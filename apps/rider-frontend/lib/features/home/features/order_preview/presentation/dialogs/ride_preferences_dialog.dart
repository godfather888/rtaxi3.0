import 'package:flutter/material.dart';
import 'package:flutter_common/core/enums/ride_option_icon.dart';
import 'package:ionicons/ionicons.dart';
import 'package:rider_flutter/core/entities/ride_option.prod.dart';
import 'package:rider_flutter/core/extensions/extensions.dart';
import 'package:flutter_common/core/presentation/buttons/app_primary_button.dart';
import 'package:flutter_common/core/presentation/responsive_dialog/app_responsive_dialog.dart';
import 'package:flutter_common/core/presentation/buttons/app_list_item_dropdown.dart';
import 'package:rider_flutter/core/graphql/fragments/ride_option.fragment.graphql.dart';
import 'package:rider_flutter/core/graphql/schema.gql.dart';

import '../components/ride_preference_checkable_item.dart';

class RidePreferencesDialog extends StatefulWidget {
  final List<Fragment$RideOption> rideOptions;
  final List<Fragment$RideOption> selectedRideOptions;
  final int? defaultWaitTime;
  final bool isTwoWayTrip;
  final String currency;

  const RidePreferencesDialog({
    super.key,
    required this.rideOptions,
    required this.selectedRideOptions,
    required this.defaultWaitTime,
    required this.isTwoWayTrip,
    required this.currency,
  });

  @override
  State<RidePreferencesDialog> createState() => _RidePreferencesDialogState();
}

class _RidePreferencesDialogState extends State<RidePreferencesDialog> {
  late int? waitTime;
  late bool isTwoWayTrip;
  late List<Fragment$RideOption> selectedRideOptions;

  @override
  void initState() {
    waitTime = widget.defaultWaitTime;
    isTwoWayTrip = widget.isTwoWayTrip;
    selectedRideOptions = [...widget.selectedRideOptions];
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return AppResponsiveDialog(
      onBackPressed: () => Navigator.of(context).pop(),
      header: (
        Ionicons.options,
        context.translate.ridePreferences,
        null,
      ),
      primaryButton: AppPrimaryButton(
        onPressed: () {
          Navigator.of(context).pop((
            isTwoWayTrip,
            waitTime,
            selectedRideOptions,
          ));
        },
        child: Text(context.translate.apply),
      ),
      type: context.responsive(
        DialogType.fullScreen,
        xl: DialogType.dialog,
      ),
      child: SingleChildScrollView(
        child: Column(
          children: [
            if (widget.rideOptions.any((element) => element.icon == Enum$ServiceOptionIcon.TwoWay))
              RidePreferenceCheckableItem(
                title: context.translate.twoWayTrip,
                icon: Ionicons.repeat,
                isSelected: isTwoWayTrip,
                onChanged: (p0) {
                  setState(() {
                    isTwoWayTrip = p0;
                  });
                },
              ),
            const Divider(
              height: 24,
              indent: 54,
            ),
            AppListItemDropdown(
              title: context.translate.waitTime,
              icon: Ionicons.time,
              selectedItem: waitTime,
              onChanged: (value) => setState(() => waitTime = value),
              items: {
                context.translate.noWaitTime: null,
                context.translate.minutesRange("0-5"): 5,
                context.translate.minutesRange("5-10"): 10,
                context.translate.minutesRange("10-15"): 15,
                context.translate.minutesRange("15-20"): 20,
                context.translate.minutesRange("20-25"): 25,
                context.translate.minutesRange("25-30"): 30,
              },
            ),
            ...widget.rideOptions.where((element) => element.icon != Enum$ServiceOptionIcon.TwoWay).map((e) => Column(
                  children: [
                    const Divider(
                      height: 24,
                      indent: 54,
                    ),
                    RidePreferenceCheckableItem(
                      title: e.name,
                      icon: e.toEntity.icon.icon,
                      fee: e.additionalFee,
                      currency: widget.currency,
                      isSelected: selectedRideOptions.contains(e),
                      onChanged: (p0) {
                        setState(() {
                          if (p0) {
                            selectedRideOptions.add(e);
                          } else {
                            selectedRideOptions.remove(e);
                          }
                        });
                      },
                    ),
                  ],
                ))
          ],
        ),
      ),
    );
  }
}
