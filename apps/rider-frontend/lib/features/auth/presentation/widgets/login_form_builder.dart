import 'package:flutter/cupertino.dart';
import 'package:rider_flutter/features/auth/presentation/blocs/login.bloc.dart';
import 'package:rider_flutter/features/auth/presentation/widgets/login_forms/enter_name_form.dart';
import 'package:rider_flutter/features/auth/presentation/widgets/login_forms/enter_number_form.dart';
import 'package:rider_flutter/features/auth/presentation/widgets/login_forms/enter_otp_form.dart';
import 'package:rider_flutter/features/auth/presentation/widgets/login_forms/enter_password_form.dart';
import 'package:rider_flutter/features/auth/presentation/widgets/login_forms/set_password_form.dart';

class LoginFormBuilder {
  final LoginPage loginPage;

  LoginFormBuilder({
    required this.loginPage,
  });

  Widget get footer {
    return switch (loginPage) {
      LoginPage$EnterNumber() => const EnterNumberForm(),
      LoginPage$EnterOtp() => const EnterOtpForm(),
      LoginPage$EnterPassword() => const EnterPasswordForm(),
      LoginPage$EnterName() => const EnterNameForm(),
      LoginPage$SetPassword() => const SetPasswordForm(),
      LoginPage$Success() => const SizedBox()
    };
  }
}
