import 'package:driver_flutter/features/auth/domain/entities/login_page.dart';
import 'package:driver_flutter/features/auth/presentation/blocs/login.bloc.dart';
import 'package:driver_flutter/features/auth/presentation/widgets/access_denied_form.dart';
import 'package:driver_flutter/features/auth/presentation/widgets/login_forms/contact_details.dart';
import 'package:driver_flutter/features/auth/presentation/widgets/login_forms/documents_form.dart';
import 'package:driver_flutter/features/auth/presentation/widgets/login_forms/payout_information.dart';
import 'package:driver_flutter/features/auth/presentation/widgets/login_forms/vehicle_details.dart';
import 'package:flutter/cupertino.dart';

import 'login_forms/enter_number_form.dart';
import 'login_forms/enter_otp_form.dart';
import 'login_forms/enter_password_form.dart';
import 'login_forms/set_password_form.dart';

class LoginFormBuilder {
  final LoginState loginState;

  LoginFormBuilder({
    required this.loginState,
  });

  Widget get footer {
    return switch (loginState.loginPage) {
      LoginPage$EnterNumberPage() => EnterNumberForm(state: loginState),
      LoginPage$EnterOtpPage() => EnterOtpForm(state: loginState),
      LoginPage$EnterPassword() => const EnterPasswordForm(),
      LoginPage$SetPassword() => const SetPasswordForm(),
      LoginPage$ContactDetails() => ContactDetails(state: loginState),
      LoginPage$VehicleDetails() => VehicleDetails(state: loginState),
      LoginPage$PayoutInformation() => PayoutInformation(state: loginState),
      LoginPage$Documents() => DocumentsForm(state: loginState),
      LoginPage$AccessDenied() => const AccessDeniedForm(),
      LoginPage$Success() => const SizedBox(),
    };
  }
}
