import 'package:api_response/api_response.dart';
import 'package:driver_flutter/core/graphql/documents/login.graphql.dart';
import 'package:driver_flutter/core/graphql/fragments/profile.fragment.graphql.dart';
import 'package:flutter_common/core/enums/gender.dart';

abstract class AuthRepository {
  Future<ApiResponse<Mutation$VerifyNumber>> verifyNumber({
    required String mobileNumber,
    required String countryIsoCode,
  });

  Future<ApiResponse<Mutation$VerifyOtp>> verifyOtp(
    String hash,
    String otp,
  );

  Future<ApiResponse<Mutation$VerifyPassword>> verifyPassword(
    String mobileNumber,
    String password,
  );

  Future<ApiResponse<Mutation$SetPassword>> setPassword(
    String password,
  );

  Future<ApiResponse<Query$RegistrationData>> getRegistrationData();

  Future<ApiResponse<Mutation$ResendOtp>> resendOtp(
    String mobileNumber,
  );

  Future<ApiResponse<Mutation$SetName>> updateProfile({
    required String firstName,
    required String lastName,
    required Gender gender,
  });

  Future<ApiResponse<Mutation$Register>> register({
    required Fragment$ProfileFull profile,
  });
}
