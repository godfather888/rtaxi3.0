import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_common/core/presentation/buttons/app_primary_button.dart';
import 'package:flutter_common/core/presentation/buttons/app_text_button.dart';
import 'package:ionicons/ionicons.dart';
import 'package:rider_flutter/config/locator/locator.dart';
import 'package:rider_flutter/core/extensions/extensions.dart';
import 'package:rider_flutter/features/auth/presentation/blocs/login.bloc.dart';

class EnterPasswordForm extends StatefulWidget {
  const EnterPasswordForm({super.key});

  @override
  State<EnterPasswordForm> createState() => _EnterPasswordFormState();
}

class _EnterPasswordFormState extends State<EnterPasswordForm> {
  bool showPassword = false;
  String password = "";

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<LoginBloc, LoginState>(
      builder: (context, loginState) {
        switch (loginState.loginPage) {
          case LoginPage$EnterPassword(:final state):
            return Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Expanded(
                  child: SingleChildScrollView(
                    child: Column(
                      children: [
                        Text(
                          context.translate.enterPassword,
                          style: context.titleLarge,
                          textAlign: TextAlign.center,
                        ),
                        const SizedBox(height: 16),
                        Text(
                          context.translate.enterPasswordDescription,
                          style: context.bodyMedium?.copyWith(
                            color: context.theme.colorScheme.onSurfaceVariant,
                          ),
                          textAlign: TextAlign.center,
                        ),
                        const SizedBox(height: 16),
                        BlocBuilder<LoginBloc, LoginState>(
                          builder: (context, state) {
                            final errorText = switch (state.loginPage.state) {
                              PageState$Error(:final errorMessage) => errorMessage,
                              _ => null
                            };

                            return TextField(
                              onChanged: (value) => setState(() => password = value),
                              obscureText: !showPassword,
                              decoration: InputDecoration(
                                hintText: context.translate.enterPassword,
                                errorText: errorText,
                                suffixIcon: CupertinoButton(
                                  onPressed: () => setState(() => showPassword = !showPassword),
                                  child: Icon(
                                    Ionicons.eye,
                                    color: context.theme.inputDecorationTheme.suffixIconColor,
                                  ),
                                ),
                              ),
                            );
                          },
                        ),
                      ],
                    ),
                  ),
                ),
                AppPrimaryButton(
                  isDisabled: password.isEmpty || state.isLoading,
                  onPressed: () => locator<LoginBloc>().onPasswordSubmitted(password),
                  child: Text(context.translate.actionContinue),
                ),
                AppTextButton(
                  isDisabled: state.isLoading,
                  text: context.translate.useOtpInstead,
                  onPressed: locator<LoginBloc>().onCodeResendRequested,
                ),
              ],
            );

          default:
            return const SizedBox();
        }
      },
    );
  }
}
