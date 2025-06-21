import 'package:flutter/material.dart';
import 'package:flutter_common/core/presentation/buttons/app_list_button.dart';
import 'package:intl/intl.dart';
import 'package:ionicons/ionicons.dart';
import 'package:rider_flutter/core/extensions/extensions.dart';
import 'package:flutter_common/core/presentation/buttons/app_bordered_button.dart';
import 'package:flutter_common/core/presentation/responsive_dialog/app_responsive_dialog.dart';
import 'package:rider_flutter/core/graphql/fragments/active_order.fragment.graphql.dart';
import 'package:rider_flutter/features/ride_history/presentation/dialogs/report_issue_form_dialog.dart';
import 'package:share_plus/share_plus.dart';

import 'send_sos_dialog.dart';

class RideSafetyDialog extends StatelessWidget {
  final Fragment$CurrentOrder order;

  const RideSafetyDialog({
    super.key,
    required this.order,
  });

  @override
  Widget build(BuildContext context) {
    return AppResponsiveDialog(
      type: context.responsive(DialogType.bottomSheet, xl: DialogType.dialog),
      header: (Ionicons.shield, context.translate.rideSafety, null),
      primaryButton: AppBorderedButton(
        onPressed: () {
          Navigator.of(context).pop();
        },
        title: context.translate.goBackToRide,
      ),
      child: Column(
        children: [
          AppListButton(
            icon: Ionicons.share_social,
            title: context.translate.shareTripInformation,
            subtitle: context.translate.shareTripInformationDescription,
            onPressed: () {
              var text = context.translate.share_trip_text_locations(
                order.addresses.last,
                order.addresses.first,
              );
              if (order.driver != null) {
                text += context.translate.share_trip_text_driver(
                  order.driver!.firstName ?? "",
                  order.driver!.lastName ?? "",
                  order.driver!.mobileNumber,
                );
              }
              text += context.translate.share_trip_started_time(
                DateFormat('HH:mm a').format(order.createdOn),
                ((order.durationBest / 60) + order.waitMinutes).ceil(),
              );
              SharePlus.instance.share(ShareParams(
                text: text,
                subject: context.translate.shareTripInformation,
              ));
            },
          ),
          const Divider(
            height: 24,
          ),
          AppListButton(
            icon: Ionicons.shield,
            title: context.translate.sos,
            subtitle: context.translate.sosDescription,
            onPressed: () {
              Navigator.of(context).pop();
              showDialog(
                context: context,
                useSafeArea: false,
                builder: (_) => SendSOSDialog(
                  orderId: order.id,
                ),
              );
            },
          ),
          const Divider(
            height: 24,
          ),
          AppListButton(
            icon: Ionicons.warning,
            title: context.translate.reportAnIssue,
            subtitle: context.translate.reportAnIssueMidTripDescription,
            onPressed: () {
              Navigator.of(context).pop();
              showDialog(
                context: context,
                useSafeArea: false,
                builder: (context) {
                  return ReportIssueFormDialog(orderId: order.id);
                },
              );
            },
          ),
        ],
      ),
    );
  }
}
