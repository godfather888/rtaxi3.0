import 'package:api_response/api_response.dart';
import 'package:graphql/client.dart';
import 'package:injectable/injectable.dart';
import 'package:rider_flutter/core/graphql/documents/login.graphql.dart';
import 'package:rider_flutter/core/datasources/graphql_datasource.dart';
import 'package:rider_flutter/core/enums/gender.prod.dart';
import 'package:flutter_common/core/enums/gender.dart';
import '../../domain/repositories/auth_repository.dart';

@prod
@LazySingleton(as: AuthRepository)
class LoginRepositoryImpl implements AuthRepository {
  final GraphqlDatasource graphqlDatasource;

  LoginRepositoryImpl(this.graphqlDatasource);

  @override
  Future<ApiResponse<Mutation$VerifyNumber>> verifyNumber({
    required String mobileNumber,
    required String countryCode,
  }) async {
    final verifyNumberResponse = await graphqlDatasource.mutate(
      Options$Mutation$VerifyNumber(
        fetchPolicy: FetchPolicy.noCache,
        variables: Variables$Mutation$VerifyNumber(
          number: mobileNumber,
          countryIso: countryCode,
        ),
      ),
    );
    return verifyNumberResponse;
  }

  @override
  Future<ApiResponse<Mutation$VerifyOtp>> verifyOtp(String hash, String otp) async {
    final verifyOtpResponse = await graphqlDatasource.mutate(
      Options$Mutation$VerifyOtp(
        fetchPolicy: FetchPolicy.noCache,
        variables: Variables$Mutation$VerifyOtp(
          hash: hash,
          code: otp,
        ),
      ),
    );
    return verifyOtpResponse;
  }

  @override
  Future<ApiResponse<Mutation$VerifyPassword>> verifyPassword(String mobileNumber, String password) async {
    final verifyPasswordResponse = await graphqlDatasource.mutate(
      Options$Mutation$VerifyPassword(
        fetchPolicy: FetchPolicy.noCache,
        variables: Variables$Mutation$VerifyPassword(
          mobileNumber: mobileNumber,
          password: password,
        ),
      ),
    );
    return verifyPasswordResponse;
  }

  @override
  Future<ApiResponse<Mutation$ResendOtp>> resendOtp(String mobileNumber) async {
    final resendOtpResponse = await graphqlDatasource.mutate(
      Options$Mutation$ResendOtp(
        fetchPolicy: FetchPolicy.noCache,
        variables: Variables$Mutation$ResendOtp(
          mobileNumber: mobileNumber,
          force: true,
        ),
      ),
    );
    return resendOtpResponse;
  }

  @override
  Future<ApiResponse<Mutation$SetPassword>> setPassword(String password) async {
    final setPasswordResponse = await graphqlDatasource.mutate(
      Options$Mutation$SetPassword(
        fetchPolicy: FetchPolicy.noCache,
        variables: Variables$Mutation$SetPassword(
          password: password,
        ),
      ),
    );
    return setPasswordResponse;
  }

  @override
  Future<ApiResponse<Mutation$SetName>> updateProfile({
    required String firstName,
    required String lastName,
    required String? email,
    required Gender? gender,
  }) async {
    final updateProfileResponse = await graphqlDatasource.mutate(
      Options$Mutation$SetName(
        fetchPolicy: FetchPolicy.noCache,
        variables: Variables$Mutation$SetName(
          firstName: firstName,
          lastName: lastName,
          email: email,
          gender: gender!.toGql,
        ),
      ),
    );
    return updateProfileResponse;
  }
}
