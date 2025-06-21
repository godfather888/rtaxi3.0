import 'package:driver_flutter/config/env.dart';
import 'package:driver_flutter/config/locator/locator.dart';
import 'package:driver_flutter/core/extensions/extensions.dart';
import 'package:driver_flutter/features/auth/domain/entities/login_page.dart';
import 'package:flutter/material.dart';
import 'package:flutter_common/core/presentation/buttons/app_primary_button.dart';
import 'package:flutter_common/core/presentation/buttons/app_text_button.dart';
import 'package:flutter_common/core/presentation/otp_textfield.dart';

import '../../blocs/login.bloc.dart';

class EnterOtpForm extends StatelessWidget {
  final LoginState state;

  const EnterOtpForm({
    super.key,
    required this.state,
  });

  @override
  Widget build(BuildContext context) {
    final loginBloc = locator<LoginBloc>();
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Expanded(
          child: SingleChildScrollView(
            child: Column(
              children: [
                Text(
                  context.translate.sendOtpDescription,
                  style: context.bodyMedium?.copyWith(
                    color: context.theme.colorScheme.onSurfaceVariant,
                  ),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(
                  height: 16,
                ),
                Center(
                  child: OtpTextField(
                    length: 6,
                    onChanged: loginBloc.onOtpChanged,
                  ),
                ),
                if (Env.isDemoMode) ...[
                  const SizedBox(
                    height: 16,
                  ),
                  Text(
                    "In demo mode, use 123456 as OTP",
                    style: context.bodyMedium?.copyWith(
                      color: context.theme.colorScheme.onSurfaceVariant,
                    ),
                    textAlign: TextAlign.center,
                  ),
                ],
                const SizedBox(
                  height: 32,
                ),
                StreamBuilder(
                  stream: Stream.periodic(const Duration(seconds: 1)),
                  builder: (context, snapShot) {
                    return state.canResendOtp
                        ? AppTextButton(
                            isDisabled: state.isLoading,
                            text: context.translate.resendOtp,
                            onPressed: locator<LoginBloc>().sendOtp,
                          )
                        : Text(
                            context.translate.resendCodeInSeconds(state.resendOtpIn),
                            style: context.bodyMedium?.copyWith(
                              color: context.theme.colorScheme.onSurfaceVariant,
                            ),
                            textAlign: TextAlign.center,
                          );
                  },
                ),
                const SizedBox(
                  height: 16,
                ),
              ],
            ),
          ),
        ),
        AppPrimaryButton(
          isDisabled: switch (state.loginPage) {
            LoginPage$EnterOtpPage(otp: final otp) => otp?.length != 6 || state.isLoading,
            _ => false,
          },
          onPressed: loginBloc.onConfirmOtpPressed,
          child: Text(context.translate.confirm),
        ),
      ],
    );
  }
}
