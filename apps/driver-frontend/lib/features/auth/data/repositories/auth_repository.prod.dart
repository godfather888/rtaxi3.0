import 'package:api_response/api_response.dart';
import 'package:driver_flutter/core/datasources/graphql_datasource.dart';
import 'package:driver_flutter/core/graphql/documents/login.graphql.dart';
import 'package:driver_flutter/core/graphql/fragments/profile.fragment.graphql.dart';
import 'package:flutter_common/core/enums/gender.dart';
import 'package:graphql/client.dart';
import 'package:injectable/injectable.dart';
import '../../domain/repositories/auth_repository.dart';

@prod
@LazySingleton(as: AuthRepository)
class LoginRepositoryImpl implements AuthRepository {
  final GraphqlDatasource graphqlDatasource;

  LoginRepositoryImpl(this.graphqlDatasource);

  @override
  Future<ApiResponse<Mutation$VerifyNumber>> verifyNumber({
    required String mobileNumber,
    required String countryIsoCode,
  }) async {
    final verifyNumberResponse = await graphqlDatasource.mutate(
      Options$Mutation$VerifyNumber(
        fetchPolicy: FetchPolicy.noCache,
        variables: Variables$Mutation$VerifyNumber(
          countryIso: countryIsoCode,
          number: mobileNumber,
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
    required Gender gender,
  }) async {
    final updateProfileResponse = await graphqlDatasource.mutate(
      Options$Mutation$SetName(
        fetchPolicy: FetchPolicy.noCache,
        variables: Variables$Mutation$SetName(
          firstName: firstName,
          lastName: lastName,
        ),
      ),
    );
    return updateProfileResponse;
  }

  @override
  Future<ApiResponse<Query$RegistrationData>> getRegistrationData() async {
    final registrationDataResponse = await graphqlDatasource.query(
      Options$Query$RegistrationData(
        fetchPolicy: FetchPolicy.noCache,
      ),
    );

    return registrationDataResponse;
  }

  @override
  Future<ApiResponse<Mutation$Register>> register({
    required Fragment$ProfileFull profile,
  }) async {
    final registerResponse = await graphqlDatasource.mutate(
      Options$Mutation$Register(
        fetchPolicy: FetchPolicy.noCache,
        variables: Variables$Mutation$Register(
          id: profile.id,
          firstName: profile.firstName!,
          lastName: profile.lastName!,
          profilePictureId: profile.presetAvatarNumber.toString(),
          documentIds: profile.documents?.map((e) => e.id).toList() ?? [],
          address: profile.address,
          bankName: profile.bankName,
          bankRoutingNumber: profile.bankRoutingNumber,
          bankSwiftCode: profile.bankSwift,
          email: profile.email,
          gender: profile.gender,
          vehicleColorId: profile.carColorId,
          vehicleModelId: profile.carId,
          vehiclePlateNumber: profile.carPlate,
          vehicleProductionYear: profile.carProductionYear,
        ),
      ),
    );
    return registerResponse;
  }
}
