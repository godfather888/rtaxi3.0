import 'package:api_response/api_response.dart';
import 'package:driver_flutter/config/locator/locator.dart';
import 'package:driver_flutter/core/graphql/fragments/earningsDataset.extentions.dart';
import 'package:driver_flutter/core/graphql/schema.gql.dart';
import 'package:driver_flutter/features/earnings/presentation/blocs/earnings.bloc.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:driver_flutter/core/extensions/extensions.dart';
import 'package:ionicons/ionicons.dart';

class FiltersBox extends StatelessWidget {
  const FiltersBox({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        Center(
          child: Container(
              margin: const EdgeInsets.only(top: 40),
              padding: const EdgeInsets.symmetric(horizontal: 48, vertical: 16),
              decoration: BoxDecoration(
                color: Colors.white.withValues(alpha: 0.5),
                borderRadius: BorderRadius.circular(20),
              ),
              child: BlocBuilder<EarningsBloc, EarningsState>(
                builder: (context, state) {
                  return Column(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      SegmentedButton<Enum$TimeQuery?>(
                        onSelectionChanged: (value) => locator<EarningsBloc>().setTimeFrame(value.first!),
                        segments: [
                          ButtonSegment(
                            value: Enum$TimeQuery.Monthly,
                            label: Text(context.translate.monthly),
                          ),
                          ButtonSegment(
                            value: Enum$TimeQuery.Daily,
                            label: Text(context.translate.daily),
                          ),
                        ],
                        selected: {state.timeframe},
                      ),
                      const SizedBox(
                        height: 16,
                      ),
                      Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          CupertinoButton(
                            onPressed: state.canGoBack ? () => locator<EarningsBloc>().previousTimeframe() : null,
                            child: const Icon(Ionicons.chevron_back),
                          ),
                          Column(
                            children: [
                              Text(
                                "${state.startDate.formatDate(context)}-${state.endDate.formatDate(context)}",
                                style: context.titleSmall,
                              ),
                              const SizedBox(
                                height: 4,
                              ),
                              switch (state.earningsState) {
                                ApiResponseLoaded(:final data) => Text(
                                    data.totalEarnings.formatCurrency(
                                      data.getStatsNew.currency,
                                    ),
                                    style: context.headlineMedium,
                                  ),
                                _ => const SizedBox()
                              }
                            ],
                          ),
                          CupertinoButton(
                            onPressed: state.canGoForward ? () => locator<EarningsBloc>().nextTimeframe() : null,
                            child: const Icon(Ionicons.chevron_forward),
                          ),
                        ],
                      ),
                    ],
                  );
                },
              )),
        ),
      ],
    );
  }
}
