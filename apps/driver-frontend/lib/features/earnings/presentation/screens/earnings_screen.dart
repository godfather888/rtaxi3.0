import 'package:api_response/api_response.dart';
import 'package:auto_route/auto_route.dart';
import 'package:driver_flutter/core/graphql/fragments/earningsDataset.extentions.dart';
import 'package:driver_flutter/gen/assets.gen.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:driver_flutter/config/locator/locator.dart';
import 'package:driver_flutter/core/extensions/extensions.dart';
import 'package:flutter_common/core/theme/animation_duration.dart';
import 'package:fl_chart/fl_chart.dart';

import '../blocs/earnings.bloc.dart';
import '../components/earnings_header.dart';

@RoutePage()
class EarningsScreen extends StatefulWidget {
  const EarningsScreen({super.key});

  @override
  State<EarningsScreen> createState() => _EarningsScreenState();
}

class _EarningsScreenState extends State<EarningsScreen> {
  @override
  void initState() {
    locator<EarningsBloc>().fetchEarningsDataset();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return BlocProvider.value(
      value: locator<EarningsBloc>(),
      child: Container(
        color: context.theme.scaffoldBackgroundColor,
        padding: context.responsive(
          null,
          xl: const EdgeInsets.only(
            top: 104,
            left: 24,
            right: 24,
            bottom: 24,
          ),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            context.responsive(
              const SizedBox(),
              xl: Padding(
                padding: const EdgeInsets.only(bottom: 24),
                child: Text(
                  context.translate.earnings,
                  style: context.headlineSmall,
                ),
              ),
            ),
            Expanded(
              child: BlocBuilder<EarningsBloc, EarningsState>(
                builder: (context, state) {
                  return Column(
                    children: [
                      EarningsHeader(
                        dataset: switch (state.earningsState) {
                          ApiResponseLoaded(:final data) => data,
                          _ => null,
                        },
                      ),
                      const SizedBox(
                        height: 24,
                      ),
                      Expanded(
                        child: AnimatedSwitcher(
                          duration: AnimationDuration.pageStateTransitionMobile,
                          child: switch (state.earningsState) {
                            ApiResponseInitial() => const SizedBox(),
                            ApiResponseLoading() => Assets.lottie.loading.lottie(),
                            ApiResponseLoaded(:final data) => Padding(
                                padding: const EdgeInsets.symmetric(
                                  horizontal: 16,
                                ),
                                child: SingleChildScrollView(
                                  child: Column(
                                    mainAxisSize: MainAxisSize.min,
                                    children: [
                                      Center(
                                        child: Container(
                                          height: 300,
                                          constraints: const BoxConstraints(maxWidth: 500),
                                          child: BarChart(
                                            data.barChartData,
                                          ),
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              ),
                            ApiResponseError() => throw UnimplementedError(),
                          },
                        ),
                      ),
                    ],
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
