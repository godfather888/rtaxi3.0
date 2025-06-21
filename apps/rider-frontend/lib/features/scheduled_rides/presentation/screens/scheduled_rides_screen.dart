import 'package:api_response/api_response.dart';
import 'package:auto_route/auto_route.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:rider_flutter/config/locator/locator.dart';
import 'package:rider_flutter/config/router/app_router.dart';
import 'package:flutter_common/core/theme/animation_duration.dart';
import 'package:rider_flutter/core/blocs/home.bloc.dart';
import 'package:rider_flutter/core/extensions/extensions.dart';
import 'package:flutter_common/core/presentation/buttons/app_back_button.dart';
import 'package:rider_flutter/features/scheduled_rides/presentation/components/empty_state.dart';
import 'package:rider_flutter/features/scheduled_rides/presentation/components/list_item.dart';
import 'package:rider_flutter/gen/assets.gen.dart';

@RoutePage()
class ScheduledRidesScreen extends StatefulWidget {
  const ScheduledRidesScreen({super.key});

  @override
  State<ScheduledRidesScreen> createState() => _ScheduledRidesScreenState();
}

class _ScheduledRidesScreenState extends State<ScheduledRidesScreen> {
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return BlocProvider.value(
      value: locator<HomeBloc>(),
      child: Container(
        color: context.theme.scaffoldBackgroundColor,
        padding: const EdgeInsets.all(16),
        child: SafeArea(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              context.responsive(
                AppBackButton(
                  onPressed: () {
                    context.router.maybePop();
                  },
                ),
                xl: const SizedBox.shrink(),
              ),
              SizedBox(height: context.responsive(16, xl: 84)),
              Text(
                context.translate.scheduledRides,
                style: context.headlineSmall,
              ),
              const SizedBox(height: 24),
              Expanded(
                child: BlocBuilder<HomeBloc, HomeState>(
                  builder: (context, state) {
                    return AnimatedSwitcher(
                      duration: AnimationDuration.pageStateTransitionDesktop,
                      child: switch (state.scheduledRidesResponse) {
                        ApiResponseInitial() => const SizedBox.shrink(),
                        ApiResponseLoading() => Assets.lottie.loading.lottie(
                            width: double.infinity,
                            height: double.infinity,
                          ),
                        ApiResponseLoaded(:final data) => data.isEmpty
                            ? ScheduledRidesEmptyState()
                            : ListView.separated(
                                padding: EdgeInsets.zero,
                                itemBuilder: (context, index) {
                                  return ScheduledRidesListItem(
                                    entity: data[index].order,
                                    onPressed: () async {
                                      await context.router.push(
                                        ScheduledRideDetailsRoute(entity: data[index].order),
                                      );
                                    },
                                  );
                                },
                                separatorBuilder: (context, index) => const SizedBox(
                                  height: 16,
                                ),
                                itemCount: data.length,
                              ),
                        ApiResponseError(:final message) => Center(
                            child: Text(message),
                          ),
                      },
                    );
                  },
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
