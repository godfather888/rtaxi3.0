import 'package:api_response/api_response.dart';
import 'package:auto_route/auto_route.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:ionicons/ionicons.dart';
import 'package:rider_flutter/config/locator/locator.dart';
import 'package:rider_flutter/config/router/app_router.dart';
import 'package:flutter_common/core/theme/animation_duration.dart';
import 'package:rider_flutter/core/blocs/auth_bloc.dart';
import 'package:rider_flutter/core/extensions/extensions.dart';
import 'package:flutter_common/core/presentation/app_menu_item.dart';
import 'package:rider_flutter/features/profile/presentation/components/profile_header.dart';
import 'package:rider_flutter/gen/assets.gen.dart';

import '../blocs/profile.bloc.dart';

@RoutePage()
class ProfileScreen extends StatefulWidget {
  const ProfileScreen({super.key});

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  @override
  void initState() {
    locator<ProfileBloc>().fetchProfileAggregationsInfo();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return BlocProvider.value(
      value: locator<ProfileBloc>(),
      child: BlocBuilder<ProfileBloc, ProfileState>(
        builder: (context, state) {
          return Container(
            color: context.theme.scaffoldBackgroundColor,
            child: AnimatedSwitcher(
              duration: AnimationDuration.pageStateTransitionMobile,
              child: switch (state.profileAggregationsState) {
                ApiResponseInitial() => const SizedBox(),
                ApiResponseLoading() => Assets.lottie.loading.lottie(
                    width: double.infinity,
                    height: double.infinity,
                  ),
                ApiResponseLoaded(:final data) => Container(
                    padding: context.responsive(
                      null,
                      xl: const EdgeInsets.only(top: 104, left: 24, right: 24, bottom: 24),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        context.responsive(
                          const SizedBox(),
                          xl: Padding(
                            padding: const EdgeInsets.only(bottom: 24),
                            child: Text(
                              context.translate.profile,
                              style: context.headlineSmall,
                            ),
                          ),
                        ),
                        BlocBuilder<AuthBloc, AuthState>(builder: (context, stateAuth) {
                          return ProfileHeader(
                            profile: switch (stateAuth) {
                              AuthState$Authenticated(:final profile) => profile,
                              _ => throw Exception(),
                            },
                            aggregationsInfo: data,
                          );
                        }),
                        const SizedBox(
                          height: 24,
                        ),
                        Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 16),
                          child: Column(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              AppMenuItem(
                                icon: Ionicons.person,
                                title: context.translate.profileInfo,
                                onPressed: () {
                                  context.router.push(const ProfileInfoRoute());
                                },
                              ),
                              const SizedBox(
                                height: 16,
                              ),
                              AppMenuItem(
                                icon: Ionicons.card,
                                title: context.translate.paymentMethods,
                                onPressed: () {
                                  context.router.pushAll([
                                    const WalletParentRoute(),
                                    const PaymentMethodsRoute(),
                                  ]);
                                },
                              ),
                              const SizedBox(
                                height: 16,
                              ),
                              AppMenuItem(
                                icon: Ionicons.settings,
                                title: context.translate.appSettings,
                                onPressed: () {
                                  context.router.navigate(const SettingsParentRoute());
                                },
                              ),
                            ],
                          ),
                        )
                      ],
                    ),
                  ),
                ApiResponseError(:final message) => Center(
                    child: Text(message),
                  ),
              },
            ),
          );
        },
      ),
    );
  }
}
