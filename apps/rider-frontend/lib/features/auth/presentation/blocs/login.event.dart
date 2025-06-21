part of 'login.bloc.dart';

@freezed
sealed class LoginEvent with _$LoginEvent {
  const factory LoginEvent.onNumberVerificationRequested({
    required String mobileNumber,
    required String countryCode,
  }) = LoginEvent$OnNumberVerificationRequested;
  const factory LoginEvent.onVerificationSkipped() = LoginEvent$OnSkipVerificationRequested;

  const factory LoginEvent.onBackButtonPressed() = LoginEvent$OnBackButtonPressed;

  const factory LoginEvent.onOtpVerificationRequested({
    required String otp,
  }) = LoginEvent$OnOtpVerificationRequested;
  const factory LoginEvent.onCodeResendRequested() = LoginEvent$OnCodeResendRequested;

  const factory LoginEvent.onPasswordSubmitted({
    required String password,
  }) = LoginEvent$OnPasswordSubmitted;

  const factory LoginEvent.onNewPasswordSubmitted({
    required String password,
  }) = LoginEvent$OnNewPasswordSubmitted;

  const factory LoginEvent.onProfileDataSubmitted({
    required String firstName,
    required String lastName,
    required Gender? gender,
  }) = LoginEvent$OnProfileDataSubmitted;

  const factory LoginEvent.reset() = LoginEvent$Reset;
}
