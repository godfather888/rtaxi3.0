import 'package:api_response/api_response.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:injectable/injectable.dart';
import 'package:rider_flutter/core/graphql/fragments/login.fragment.graphql.dart';
import 'package:rider_flutter/core/graphql/fragments/profile.fragment.graphql.dart';
import 'package:rider_flutter/features/auth/domain/repositories/auth_repository.dart';
import 'package:flutter_common/core/enums/gender.dart';

part 'login.event.dart';
part 'login.state.dart';
part 'login.bloc.freezed.dart';

@lazySingleton
class LoginBloc extends Cubit<LoginState> {
  AuthRepository repository;

  LoginBloc(
    this.repository,
  ) : super(const LoginState());

  void _onSuccessVerifyResponse(Fragment$VerifyOtpOrPassword response) {
    emit(
      state.copyWith(
        loginPage: response.hasPassword == false
            ? const LoginPage.setPassword()
            : (response.hasName == false ? const LoginPage.enterName() : const LoginPage.success()),
        jwtToken: response.jwtToken,
        profile: response.user,
      ),
    );
  }

  void onNumberVerificationRequested({
    required String mobileNumber,
    required String countryCode,
  }) async {
    emit(
      state.copyWith.loginPage.call(
        state: const PageState.loading(),
      ),
    );
    final verifyNumberResponse = await repository.verifyNumber(
      mobileNumber: mobileNumber,
      countryCode: countryCode,
    );

    switch (verifyNumberResponse) {
      case ApiResponseLoaded(:final data):
        if (data.verifyNumber.isExistingUser) {
          emit(
            state.copyWith(
              loginPage: const LoginPage.enterPassword(),
              mobileNumber: mobileNumber,
            ),
          );
        } else {
          emit(
            state.copyWith(
              loginPage: const LoginPage.enterOtp(),
              mobileNumber: mobileNumber,
              hash: data.verifyNumber.hash,
              lastOtpSentAt: DateTime.now(),
            ),
          );
        }
      case ApiResponseError(:final message):
        emit(
          state.copyWith.loginPage.call(
            state: PageState.error(
              errorMessage: message,
            ),
          ),
        );

      case _:
    }
  }

  void onVerificationSkipped() {
    emit(
      state.copyWith(
        loginPage: const LoginPage.success(),
      ),
    );
  }

  void onOtpVerificationRequested(String otp) async {
    final verifyOtpResponse = await repository.verifyOtp(state.hash!, otp);

    switch (verifyOtpResponse) {
      case ApiResponseLoaded(:final data):
        _onSuccessVerifyResponse(
          data.verifyOtp,
        );
      case ApiResponseError(:final message):
        final newState = state.copyWith.loginPage.call(
          state: PageState.error(
            errorMessage: message,
          ),
        );
        emit(newState);

      case _:
    }
  }

  void onCodeResendRequested() async {
    emit(state.copyWith.loginPage.call(state: const PageState.loading()));
    final resendOtpResponse = await repository.resendOtp(state.mobileNumber);

    switch (resendOtpResponse) {
      case ApiResponseLoaded(:final data):
        emit(
          state.copyWith(
            loginPage: const LoginPage.enterOtp(),
            hash: data.verifyNumber.hash,
            lastOtpSentAt: DateTime.now(),
          ),
        );
      case ApiResponseError(:final message):
        emit(
          state.copyWith.loginPage(
            state: PageState.error(errorMessage: message),
          ),
        );

      case _:
    }
  }

  void onPasswordSubmitted(String password) async {
    emit(
      state.copyWith.loginPage.call(
        state: const PageState.loading(),
      ),
    );
    final verifyPasswordResponse = await repository.verifyPassword(
      state.mobileNumber,
      password,
    );

    switch (verifyPasswordResponse) {
      case ApiResponseLoaded(:final data):
        _onSuccessVerifyResponse(
          data.verifyPassword,
        );
      case ApiResponseError(:final message):
        final newState = state.copyWith.loginPage.call(
          state: PageState.error(errorMessage: message),
        );
        emit(
          newState,
        );

      case _:
    }
  }

  void onNewPasswordChanged(String password) {
    switch (state.loginPage) {
      case LoginPage$SetPassword():
        emit(
          state.copyWith(
            loginPage: LoginPage$SetPassword().copyWith(newPassword: password),
          ),
        );
        break;
      default:
        throw Exception("Invalid state");
    }
  }

  void onNewPasswordSubmitted() async {
    final page = state.loginPage;

    switch (page) {
      case LoginPage$SetPassword():
        emit(state.copyWith.loginPage.call(state: const PageState.loading()));

        final setPasswordResponse = await repository.setPassword(page.newPassword);

        switch (setPasswordResponse) {
          case ApiResponseLoaded(:final data):
            _onSuccessVerifyResponse(data.setPassword);
            break;

          case ApiResponseError(:final message):
            emit(
              state.copyWith.loginPage.call(
                state: PageState.error(errorMessage: message),
              ),
            );
            break;

          case _:
            break;
        }
        break;

      default:
        throw Exception('Invalid state');
    }
  }

  void onProfileDataSubmitted({
    required String firstName,
    required String lastName,
    required Gender gender,
    required String? email,
  }) async {
    emit(state.copyWith.loginPage.call(state: const PageState.loading()));
    final updateProfileResponse = await repository.updateProfile(
      firstName: firstName,
      lastName: lastName,
      email: email,
      gender: gender,
    );
    switch (updateProfileResponse) {
      case ApiResponseLoaded(:final data):
        emit(
          state.copyWith(
            jwtToken: state.jwtToken,
            profile: data.updateOneRider,
            loginPage: const LoginPage.success(),
          ),
        );
      case ApiResponseError(:final message):
        emit(
          state.copyWith.loginPage.call(
            state: PageState.error(errorMessage: message),
          ),
        );

      case _:
    }
  }

  void onBackButtonPressed() {
    emit(state.copyWith.call(loginPage: const LoginPage.enterNumber()));
  }

  void reset() {
    emit(const LoginState());
  }
}
