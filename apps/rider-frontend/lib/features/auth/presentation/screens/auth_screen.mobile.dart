import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_common/core/color_palette/color_palette.dart';
import 'package:flutter_common/core/presentation/buttons/app_back_button.dart';
import 'package:rider_flutter/config/locator/locator.dart';
import 'package:rider_flutter/features/auth/presentation/blocs/onboarding_cubit.dart';
import 'package:rider_flutter/features/auth/presentation/widgets/login_form_builder.dart';

import '../blocs/login.bloc.dart';

class AuthScreenMobile extends StatelessWidget {
  const AuthScreenMobile({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: ColorPalette.neutralVariant99,
      body: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        SafeArea(
          bottom: false,
          child: Padding(
            padding: const EdgeInsets.only(top: 16, left: 16, right: 16),
            child: BlocBuilder<LoginBloc, LoginState>(
              builder: (context, state) {
                return AppBackButton(
                  onPressed: () {
                    switch (state.loginPage) {
                      case LoginPage$EnterNumber():
                        locator<OnboardingCubit>().previousPage();
                        break;

                      default:
                        locator<LoginBloc>().onBackButtonPressed();
                    }
                  },
                );
              },
            ),
          ),
        ),
        Expanded(
          child: SafeArea(
            top: false,
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: AnimatedSwitcher(
                duration: const Duration(milliseconds: 300),
                child: BlocBuilder<LoginBloc, LoginState>(
                  builder: (context, state) {
                    return LoginFormBuilder(loginPage: state.loginPage).footer;
                  },
                ),
              ),
            ),
          ),
        ),
      ]),
    );
  }
}
