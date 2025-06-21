import 'package:api_response/api_response.dart';
import 'package:flutter_common/core/enums/gender.dart';
import 'package:rider_flutter/core/graphql/documents/login.graphql.dart';

abstract class AuthRepository {
  Future<ApiResponse<Mutation$VerifyNumber>> verifyNumber({
    required String mobileNumber,
    required String countryCode,
  });

  Future<ApiResponse<Mutation$VerifyOtp>> verifyOtp(String hash, String otp);

  Future<ApiResponse<Mutation$VerifyPassword>> verifyPassword(
    String mobileNumber,
    String password,
  );

  Future<ApiResponse<Mutation$SetPassword>> setPassword(String password);

  Future<ApiResponse<Mutation$ResendOtp>> resendOtp(String mobileNumber);

  Future<ApiResponse<Mutation$SetName>> updateProfile({
    required String firstName,
    required String lastName,
    required String? email,
    required Gender? gender,
  });
}
