import 'package:api_response/api_response.dart';

import 'package:better_localization/country_code/country_code.dart';
import 'package:driver_flutter/core/enums/gender.prod.dart';
import 'package:driver_flutter/core/graphql/fragments/login.fragment.graphql.dart';
import 'package:driver_flutter/core/graphql/fragments/media.fragment.graphql.dart';
import 'package:driver_flutter/core/graphql/fragments/profile.fragment.graphql.dart';
import 'package:driver_flutter/core/graphql/fragments/vehicle_color.fragment.graphql.dart';
import 'package:driver_flutter/core/graphql/fragments/vehicle_model.fragment.graphql.dart';
import 'package:driver_flutter/core/graphql/schema.gql.dart';
import 'package:driver_flutter/features/auth/domain/entities/login_page.dart';
import 'package:flutter_common/core/enums/gender.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:hydrated_bloc/hydrated_bloc.dart';
import 'package:injectable/injectable.dart';

import '../../domain/repositories/auth_repository.dart';

part 'login.state.dart';
part 'login.bloc.freezed.dart';
part 'login.bloc.g.dart';

@LazySingleton()
class LoginBloc extends HydratedCubit<LoginState> {
  AuthRepository repository;

  LoginBloc(
    this.repository,
  ) : super(const LoginState());

  void onBackPressed() {
    emit(
      () {
        switch (state.loginPage) {
          case LoginPage$EnterNumberPage():
            return state.copyWith(loginPage: const LoginPage.enterNumber());

          case LoginPage$EnterOtpPage():
            return state.copyWith(loginPage: const LoginPage.enterNumber());

          case LoginPage$EnterPassword():
            return state.copyWith(loginPage: const LoginPage.enterNumber());

          case LoginPage$SetPassword():
            return state.copyWith(loginPage: const LoginPage.enterNumber());

          case LoginPage$ContactDetails():
            return state.copyWith(loginPage: const LoginPage.enterNumber());

          case LoginPage$VehicleDetails():
            return state.copyWith(loginPage: const LoginPage.contactDetails());

          case LoginPage$PayoutInformation():
            return state.copyWith(loginPage: const LoginPage.vehicleDetails());

          case LoginPage$Documents():
            return state.copyWith(loginPage: const LoginPage.payoutInformation());

          case LoginPage$Success():
            return state.copyWith(loginPage: const LoginPage.enterNumber());

          case LoginPage$AccessDenied():
            return state.copyWith(loginPage: const LoginPage.enterNumber());
        }
      }(),
    );
  }

  void reset() => emit(const LoginState());

  void onNumberChanged(CountryCode countryCode, String number) => emit(
        state.copyWith(
          countryCode: countryCode,
          mobileNumber: number,
        ),
      );

  void onOtpChanged(String newOtp) {
    switch (state.loginPage) {
      case LoginPage$EnterOtpPage enterOtp:
        emit(
          state.copyWith(
            loginPage: enterOtp.copyWith(
              otp: newOtp,
            ),
          ),
        );
        break;
      default:
        break;
    }
  }

  void onCurrentPasswordChanged(String password) => emit(state.copyWith(currentPassword: password));

  void onNewPasswordChanged(String password) => emit(state.copyWith(newPassword: password));

  void onNewPasswordSubmitted() async {
    emit(state.copyWith(isLoading: true));
    final setPasswordResponse = await repository.setPassword(state.newPassword!);

    switch (setPasswordResponse) {
      case ApiResponseLoaded():
        _processVerifiedUser(
          Fragment$VerifyOtpOrPassword(
              jwtToken: state.jwtToken!, user: state.profileFullEntity!, hasPassword: true, hasName: true),
        );
      case ApiResponseError(:final message):
        emit(state.copyWith(errorMessage: message, isLoading: false));

      case _:
    }
  }

  void sendOtp() async {
    emit(state.copyWith(isLoading: true));
    final resendOtpResponse = await repository.resendOtp(
      state.countryCode!.e164CountryCode + state.mobileNumber!,
    );

    switch (resendOtpResponse) {
      case ApiResponseLoaded(:final data):
        emit(
          state.copyWith(
            loginPage: state.loginPage is LoginPage$EnterOtpPage ? state.loginPage : const LoginPage.enterOtp(),
            isLoading: false,
            errorMessage: null,
            verificationHash: data.verifyNumber.hash,
            lastOtpSentAt: DateTime.now(),
          ),
        );
      case ApiResponseError(:final message):
        emit(state.copyWith(errorMessage: message, isLoading: false));

      case _:
    }
  }

  void onNumberSubmitted() async {
    emit(state.copyWith(isLoading: true));
    final verifyNumberResponse = await repository.verifyNumber(
      mobileNumber: state.countryCode!.e164CountryCode + state.mobileNumber!,
      countryIsoCode: state.countryCode!.iso2CountryCode,
    );

    switch (verifyNumberResponse) {
      case ApiResponseLoaded(:final data):
        if (data.verifyNumber.isExistingUser) {
          emit(state.copyWith(
            loginPage: const LoginPage.enterPassword(),
            isLoading: false,
            errorMessage: null,
            verificationHash: null,
          ));
        } else {
          emit(
            state.copyWith(
              loginPage: const LoginPage.enterOtp(),
              isLoading: false,
              errorMessage: null,
              verificationHash: data.verifyNumber.hash,
              lastOtpSentAt: DateTime.now(),
            ),
          );
        }
      case ApiResponseError(:final message):
        emit(
          state.copyWith(
            isLoading: false,
            errorMessage: message,
          ),
        );

      case _:
    }
  }

  void onConfirmOtpPressed() async {
    emit(state.copyWith(isLoading: true));
    final verifyOtpResponse = await repository.verifyOtp(
      state.verificationHash!,
      switch (state.loginPage) { LoginPage$EnterOtpPage(:final otp) => otp!, _ => '' },
    );

    switch (verifyOtpResponse) {
      case ApiResponseLoaded(:final data):
        _processVerifiedUser(data.verifyOtp);
      case ApiResponseError(:final message):
        if (message == 'Mobile number not found') {
          emit(state.copyWith(
            loginPage: const LoginPage.enterNumber(),
            isLoading: false,
            errorMessage: null,
            verificationHash: null,
          ));
          return;
        }
        emit(
          state.copyWith(
            errorMessage: message,
            isLoading: false,
          ),
        );

      case _:
    }
  }

  void onConfirmPasswordPressed() async {
    emit(state.copyWith(isLoading: true));

    final verifyPasswordResponse = await repository.verifyPassword(
      state.countryCode!.e164CountryCode + state.mobileNumber!,
      state.currentPassword!,
    );

    switch (verifyPasswordResponse) {
      case ApiResponseLoaded(:final data):
        _processVerifiedUser(data.verifyPassword);
      case ApiResponseError(:final message):
        emit(
          state.copyWith(
            errorMessage: message,
            isLoading: false,
          ),
        );

      case _:
    }
  }

  void _processVerifiedUser(Fragment$VerifyOtpOrPassword response) async {
    final profile = response.user;
    emit(
      state.copyWith(
        isLoading: true,
        jwtToken: response.jwtToken,
        profileFullEntity: profile,
      ),
    );
    if (response.hasPassword == false) {
      emit(state.copyWith(
        loginPage: const LoginPage.setPassword(),
        isLoading: false,
        errorMessage: null,
      ));
      return;
    }
    if (profile.status == Enum$DriverStatus.PendingApproval) {
      final remoteDataResponse = await repository.getRegistrationData();

      switch (remoteDataResponse) {
        case ApiResponseLoaded(:final data):
          emit(
            state.copyWith(
              loginPage: const LoginPage.contactDetails(),
              isLoading: false,
              vehicleModels: data.carModels,
              vehicleColors: data.carColors,
              profileFullEntity: data.driver,
              errorMessage: null,
              jwtToken: response.jwtToken,
            ),
          );
        case ApiResponseError(:final message):
          emit(
            state.copyWith(
              errorMessage: message,
              isLoading: false,
            ),
          );

        case _:
      }
    } else if (profile.status == Enum$DriverStatus.Blocked || profile.status == Enum$DriverStatus.HardReject) {
      emit(
        state.copyWith(
          loginPage: const LoginPage.accessDenied(),
          isLoading: false,
          errorMessage: null,
        ),
      );
    } else {
      emit(
        state.copyWith(
          loginPage: LoginPage.success(profile: profile),
          isLoading: false,
          errorMessage: null,
          jwtToken: response.jwtToken,
          profileFullEntity: profile,
        ),
      );
    }
  }

  // START: Contact Details

  void onGenderChanged(Gender? gender) => emit(
        state.copyWith(
          profileFullEntity: state.profileFullEntity?.copyWith(
            gender: gender!.toGql,
          ),
        ),
      );

  void onFirstNameChanged(String? firstName) => emit(
        state.copyWith(
          profileFullEntity: state.profileFullEntity?.copyWith(
            firstName: firstName,
          ),
        ),
      );

  void onLastNameChanged(String? lastName) => emit(
        state.copyWith(
          profileFullEntity: state.profileFullEntity?.copyWith(
            lastName: lastName,
          ),
        ),
      );

  void onAddressChanged(String? address) => emit(
        state.copyWith(
          profileFullEntity: state.profileFullEntity?.copyWith(
            address: address,
          ),
        ),
      );

  void onEmailChanged(String? email) => emit(
        state.copyWith(
          profileFullEntity: state.profileFullEntity?.copyWith(
            email: email,
          ),
        ),
      );

  void onCertificateNumberChanged(String? certificateNumber) => emit(
        state.copyWith(
          profileFullEntity: state.profileFullEntity?.copyWith(
            certificateNumber: certificateNumber,
          ),
        ),
      );

  void onConfirmContactDetailsPressed() => emit(state.copyWith(loginPage: const LoginPage.vehicleDetails()));

  // END: Contact Details

  // START: Vehicle Details

  void onPlateNumberChanged(String? newValue) => emit(
        state.copyWith(
          profileFullEntity: state.profileFullEntity?.copyWith(
            carPlate: newValue,
          ),
        ),
      );

  void onVehicleModelIdChanged(String? newValue) => emit(
        state.copyWith(
          profileFullEntity: state.profileFullEntity?.copyWith(
            carId: newValue,
          ),
        ),
      );

  void onVehicleColorIdChanged(String? newValue) => emit(
        state.copyWith(
          profileFullEntity: state.profileFullEntity?.copyWith(
            countryIso: newValue,
          ),
        ),
      );

  void onVehicleProductionYearChanged(int? newValue) => emit(
        state.copyWith(
          profileFullEntity: state.profileFullEntity?.copyWith(
            carProductionYear: newValue,
          ),
        ),
      );

  void onConfirmVehicleDetailsPressed() => emit(state.copyWith(loginPage: const LoginPage.payoutInformation()));

  // END: Vehicle Details

  // START: Payout Information

  void onBankNameChanged(String? newValue) => emit(
        state.copyWith(
          profileFullEntity: state.profileFullEntity?.copyWith(
            bankName: newValue,
          ),
        ),
      );

  void onBankAccountNumberChanged(String? newValue) => emit(
        state.copyWith(
          profileFullEntity: state.profileFullEntity?.copyWith(
            accountNumber: newValue,
          ),
        ),
      );

  void onBankRoutingNumberChanged(String? newValue) => emit(
        state.copyWith(
          profileFullEntity: state.profileFullEntity?.copyWith(
            bankRoutingNumber: newValue,
          ),
        ),
      );

  void onBankSwiftCodeChanged(String? newValue) => emit(
        state.copyWith(
          profileFullEntity: state.profileFullEntity?.copyWith(
            bankSwift: newValue,
          ),
        ),
      );

  void onConfirmPayoutInformationPressed() => emit(state.copyWith(loginPage: const LoginPage.documents()));

  // END: Payout Information

  // START: Upload Documents

  void onProfilePhotoChanged(Fragment$Media? newValue) => emit(
        state.copyWith(
          profileFullEntity: state.profileFullEntity?.copyWith(
            media: newValue,
          ),
        ),
      );

  void setDocuments(List<Fragment$Media> newValue) {
    final updatedProfile = state.profileFullEntity?.copyWith(documents: newValue);
    emit(
      state.copyWith(profileFullEntity: updatedProfile),
    );
  }

  void onConfirmDocumentsPressed() async {
    emit(state.copyWith(isLoading: true));
    final registerResponse = await repository.register(profile: state.profileFullEntity!);

    switch (registerResponse) {
      case ApiResponseLoaded(:final data):
        emit(
          state.copyWith(
            loginPage: LoginPage.success(
              profile: data.updateOneDriver,
            ),
          ),
        );
      case ApiResponseError(:final message):
        emit(
          state.copyWith(
            errorMessage: message,
            isLoading: false,
          ),
        );

      case _:
    }
  }

  @override
  LoginState? fromJson(Map<String, dynamic> json) => LoginState.fromJson(json);

  @override
  Map<String, dynamic>? toJson(LoginState state) => state.toJson();
}
