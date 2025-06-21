import 'package:api_response/api_response.dart';
import 'package:injectable/injectable.dart';
import 'package:flutter_common/core/enums/gender.dart';
import 'package:rider_flutter/core/graphql/documents/login.graphql.dart';
import 'package:rider_flutter/core/graphql/fragments/login.mock.dart';
import 'package:rider_flutter/core/graphql/fragments/profile.mock.dart';
import '../../domain/repositories/auth_repository.dart';

@dev
@LazySingleton(as: AuthRepository)
class AuthRepositoryMock implements AuthRepository {
  @override
  Future<ApiResponse<Mutation$ResendOtp>> resendOtp(String mobileNumber) async {
    await Future.delayed(
      Duration(
        seconds: 1,
      ),
    );
    return ApiResponse.loaded(
      Mutation$ResendOtp(
        verifyNumber: mockVerifyNumberSuccess,
      ),
    );
  }

  @override
  Future<ApiResponse<Mutation$SetPassword>> setPassword(String password) async {
    await Future.delayed(
      Duration(
        seconds: 1,
      ),
    );
    return ApiResponse.loaded(
      Mutation$SetPassword(
        setPassword: mockVerifyOtpOrPasswordSuccess,
      ),
    );
  }

  @override
  Future<ApiResponse<Mutation$SetName>> updateProfile({
    required String firstName,
    required String lastName,
    required Gender? gender,
    required String? email,
  }) async {
    await Future.delayed(
      Duration(
        seconds: 1,
      ),
    );
    return ApiResponse.loaded(
      Mutation$SetName(
        updateOneRider: mockProfile1,
      ),
    );
  }

  @override
  Future<ApiResponse<Mutation$VerifyNumber>> verifyNumber({
    required String mobileNumber,
    required String countryCode,
  }) async {
    await Future.delayed(
      Duration(
        seconds: 1,
      ),
    );
    return ApiResponse.loaded(
      Mutation$VerifyNumber(
        verifyNumber: mockVerifyNumberSuccess,
      ),
    );
  }

  @override
  Future<ApiResponse<Mutation$VerifyOtp>> verifyOtp(String hash, String otp) async {
    await Future.delayed(
      Duration(
        seconds: 1,
      ),
    );
    return ApiResponse.loaded(
      Mutation$VerifyOtp(
        verifyOtp: mockVerifyOtpOrPasswordSuccess,
      ),
    );
  }

  @override
  Future<ApiResponse<Mutation$VerifyPassword>> verifyPassword(String mobileNumber, String password) async {
    await Future.delayed(
      Duration(
        seconds: 1,
      ),
    );
    return ApiResponse.loaded(
      Mutation$VerifyPassword(
        verifyPassword: mockVerifyOtpOrPasswordSuccess,
      ),
    );
  }
}
