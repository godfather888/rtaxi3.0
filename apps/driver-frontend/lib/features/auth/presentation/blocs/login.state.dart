part of 'login.bloc.dart';

@freezed
sealed class LoginState with _$LoginState {
  const factory LoginState({
    @Default(false) bool isLoading,
    String? errorMessage,
    @Default(LoginPage.enterNumber()) LoginPage loginPage,
    CountryCode? countryCode,
    String? verificationHash,
    DateTime? lastOtpSentAt,
    String? jwtToken,
    String? currentPassword,
    String? newPassword,
    String? mobileNumber,
    @Default([]) List<Fragment$VehicleModel> vehicleModels,
    @Default([]) List<Fragment$VehicleColor> vehicleColors,
    Fragment$ProfileFull? profileFullEntity,
  }) = _LoginState;

  const LoginState._();

  bool get canResendOtp {
    if (lastOtpSentAt == null) {
      return true;
    }

    final now = DateTime.now();
    final difference = now.difference(lastOtpSentAt!);
    return difference.inSeconds > 60;
  }

  int get resendOtpIn {
    if (lastOtpSentAt == null) {
      return 0;
    }

    final now = DateTime.now();
    final difference = now.difference(lastOtpSentAt!);
    return 60 - difference.inSeconds;
  }

  factory LoginState.fromJson(Map<String, dynamic> json) => _$LoginStateFromJson(json);

  bool get codeLengthIsSafe => newPassword != null && newPassword!.length >= 9 && newPassword!.length <= 64;

  bool get hasUppercase => newPassword != null && newPassword!.contains(RegExp(r'[A-Z]'));

  bool get hasDigits => newPassword != null && newPassword!.contains(RegExp(r'[0-9]'));

  bool get hasLowercase => newPassword != null && newPassword!.contains(RegExp(r'[a-z]'));

  double get desktopHeight {
    return switch (loginPage) {
      LoginPage$EnterNumberPage() => 200,
      LoginPage$EnterOtpPage() => 300,
      LoginPage$EnterPassword() => 400,
      LoginPage$SetPassword() => 400,
      LoginPage$ContactDetails() => 700,
      LoginPage$VehicleDetails() => double.infinity,
      LoginPage$PayoutInformation() => double.infinity,
      LoginPage$Documents() => double.infinity,
      LoginPage$AccessDenied() => 100,
      LoginPage$Success() => 100,
    };
  }

  bool get hasSpecialCharacters =>
      newPassword != null &&
      newPassword!.contains(
        RegExp(
          r'[!@#$%^&*(),.?":{}|<>]',
        ),
      );

  bool get hasAtLeastTwoChecks =>
      [
        hasUppercase,
        hasDigits,
        hasLowercase,
        hasSpecialCharacters,
      ]
          .where(
            (element) => element,
          )
          .length >=
      2;
}
