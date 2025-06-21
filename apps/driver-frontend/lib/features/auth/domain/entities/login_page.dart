import 'package:driver_flutter/core/extensions/extensions.dart';
import 'package:driver_flutter/core/graphql/fragments/profile.fragment.graphql.dart';
import 'package:flutter/cupertino.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

part 'login_page.freezed.dart';
part 'login_page.g.dart';

@freezed
sealed class LoginPage with _$LoginPage {
  const factory LoginPage.enterNumber() = LoginPage$EnterNumberPage;
  const factory LoginPage.enterOtp({
    String? otp,
  }) = LoginPage$EnterOtpPage;
  const factory LoginPage.enterPassword() = LoginPage$EnterPassword;
  const factory LoginPage.setPassword() = LoginPage$SetPassword;
  const factory LoginPage.contactDetails() = LoginPage$ContactDetails;
  const factory LoginPage.vehicleDetails() = LoginPage$VehicleDetails;
  const factory LoginPage.payoutInformation() = LoginPage$PayoutInformation;
  const factory LoginPage.documents() = LoginPage$Documents;
  const factory LoginPage.accessDenied() = LoginPage$AccessDenied;
  const factory LoginPage.success({
    required Fragment$ProfileFull profile,
  }) = LoginPage$Success;

  factory LoginPage.fromJson(Map<String, dynamic> json) => _$LoginPageFromJson(json);

  const LoginPage._();

  int? get loginStep {
    return switch (this) {
      LoginPage$EnterNumberPage() => 3,
      _ => null,
    };
  }

  int? get wizardStep {
    return switch (this) {
      LoginPage$EnterNumberPage() => null,
      LoginPage$EnterOtpPage() => 1,
      LoginPage$EnterPassword() => 1,
      LoginPage$SetPassword() => 1,
      LoginPage$ContactDetails() => 2,
      LoginPage$VehicleDetails() => 3,
      LoginPage$PayoutInformation() => 4,
      LoginPage$Documents() => 5,
      LoginPage$AccessDenied() => null,
      LoginPage$Success() => null,
    };
  }

  String title(BuildContext context) => switch (this) {
        LoginPage$EnterNumberPage() => context.translate.signInSignUp,
        LoginPage$EnterOtpPage() => context.translate.enterOtp,
        LoginPage$EnterPassword() => context.translate.enterPassword,
        LoginPage$SetPassword() => context.translate.setPassword,
        LoginPage$ContactDetails() => context.translate.contactDetails,
        LoginPage$VehicleDetails() => context.translate.vehicleDetails,
        LoginPage$PayoutInformation() => context.translate.payoutInformation,
        LoginPage$Documents() => context.translate.documents,
        LoginPage$AccessDenied() => context.translate.accessDenied,
        LoginPage$Success() => context.translate.success,
      };
}
