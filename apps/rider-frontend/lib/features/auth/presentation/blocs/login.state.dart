part of 'login.bloc.dart';

@freezed
sealed class LoginState with _$LoginState {
  const factory LoginState({
    @Default(LoginPage.enterNumber()) LoginPage loginPage,
    @Default("") String mobileNumber,
    String? hash,
    String? jwtToken,
    Fragment$Profile? profile,
    DateTime? lastOtpSentAt,
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
}

@freezed
sealed class LoginPage with _$LoginPage {
  const factory LoginPage.enterNumber({
    @Default(PageState.idle()) PageState state,
  }) = LoginPage$EnterNumber;

  const factory LoginPage.enterOtp({
    @Default(PageState.idle()) PageState state,
  }) = LoginPage$EnterOtp;

  const factory LoginPage.enterPassword({
    @Default(PageState.idle()) PageState state,
  }) = LoginPage$EnterPassword;

  const factory LoginPage.enterName({
    @Default(PageState.idle()) PageState state,
  }) = LoginPage$EnterName;

  const factory LoginPage.setPassword({
    @Default(PageState.idle()) PageState state,
    @Default("") String newPassword,
  }) = LoginPage$SetPassword;

  const factory LoginPage.success({
    @Default(PageState.idle()) PageState state,
  }) = LoginPage$Success;
}

@freezed
sealed class PageState with _$PageState {
  const factory PageState.idle() = PageState$Idle;
  const factory PageState.loading() = PageState$Loading;
  const factory PageState.error({required String errorMessage}) = PageState$Error;

  const PageState._();

  bool get isLoading => switch (this) {
        PageState$Loading() => true,
        _ => false,
      };
}

extension SetPasswordX on LoginPage$SetPassword {
  bool get codeLengthIsSafe => newPassword.length >= 9 && newPassword.length <= 64;

  bool get hasUppercase => newPassword.contains(RegExp(r'[A-Z]'));

  bool get hasDigits => newPassword.contains(RegExp(r'[0-9]'));

  bool get hasLowercase => newPassword.contains(RegExp(r'[a-z]'));

  bool get hasSpecialCharacters => newPassword.contains(
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
      ].where((element) => element).length >=
      2;
}
