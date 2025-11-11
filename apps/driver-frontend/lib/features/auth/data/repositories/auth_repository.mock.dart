import 'package:api_response/api_response.dart';
import 'package:driver_flutter/core/graphql/documents/login.graphql.dart';
import 'package:driver_flutter/core/graphql/fragments/driver_document.fragment.graphql.dart';
import 'package:driver_flutter/core/graphql/fragments/login.mock.dart';
import 'package:driver_flutter/core/graphql/fragments/profile.fragment.graphql.dart';
import 'package:driver_flutter/core/graphql/fragments/profile.mock.dart';
import 'package:driver_flutter/core/graphql/fragments/vehicle_color.mock.dart';
import 'package:driver_flutter/core/graphql/fragments/vehicle_model.mock.dart';
import 'package:flutter_common/core/enums/gender.dart';
import 'package:injectable/injectable.dart';

import '../../domain/repositories/auth_repository.dart';

@dev
@LazySingleton(as: AuthRepository)
class AuthRepositoryMock implements AuthRepository {
  @override
  Future<ApiResponse<Mutation$ResendOtp>> resendOtp(String mobileNumber) async {
    await Future.delayed(const Duration(seconds: 1));
    return ApiResponse.loaded(
      Mutation$ResendOtp(
        verifyNumber: mockVerifyNumberSuccess,
      ),
    );
  }

  @override
  Future<ApiResponse<Mutation$SetPassword>> setPassword(String password) async {
    await Future.delayed(const Duration(seconds: 1));
    return ApiResponse.loaded(
      Mutation$SetPassword(
        setPassword: mockVerifyOtpOrPasswordSuccess,
      ),
    );
  }

  @override
  Future<ApiResponse<Mutation$SetName>> updateProfile(
      {required String firstName, required String lastName, required Gender gender}) async {
    await Future.delayed(const Duration(seconds: 1));
    return ApiResponse.loaded(
      Mutation$SetName(
        updateOneDriver: mockProfile1,
      ),
    );
  }

  @override
  Future<ApiResponse<Mutation$VerifyNumber>> verifyNumber({
    required String mobileNumber,
    required String countryIsoCode,
  }) async {
    await Future.delayed(const Duration(seconds: 1));
    return ApiResponse.loaded(
      Mutation$VerifyNumber(
        verifyNumber: mockVerifyNumberSuccess,
      ),
    );
  }

  @override
  Future<ApiResponse<Mutation$VerifyOtp>> verifyOtp(String hash, String otp) async {
    await Future.delayed(const Duration(seconds: 1));
    return ApiResponse.loaded(
      Mutation$VerifyOtp(
        verifyOtp: mockVerifyOtpOrPasswordSuccess,
      ),
    );
  }

  @override
  Future<ApiResponse<Mutation$VerifyPassword>> verifyPassword(String mobileNumber, String password) async {
    await Future.delayed(const Duration(seconds: 1));
    return ApiResponse.loaded(
      Mutation$VerifyPassword(
        verifyPassword: mockVerifyOtpOrPasswordSuccess,
      ),
    );
  }

  @override
  Future<ApiResponse<Query$RegistrationData>> getRegistrationData() async {
    await Future.delayed(const Duration(seconds: 1));
    return ApiResponse.loaded(
      Query$RegistrationData(
        driver: mockProfileFull1,
        carModels: [
          mockVehicleModel1,
          mockVehicleModel2,
        ],
        carColors: [
          mockVehicleColor1,
          mockVehicleColor2,
        ],
        driverRequiredDocuments: [
          Fragment$DriverDocument(
            id: '1',
            title: 'Водительское удостоверение',
            isRequired: true,
          ),
          Fragment$DriverDocument(
            id: '2',
            title: 'Техпаспорт автомобиля',
            isRequired: true,
          ),
        ],
      ),
    );
  }

  @override
  Future<ApiResponse<Mutation$Register>> register({
    required Fragment$ProfileFull profile,
  }) async {
    await Future.delayed(const Duration(seconds: 1));
    return ApiResponse.loaded(
      Mutation$Register(
        updateOneDriver: mockProfileFull1,
        setDocumentsOnDriver: mockProfileFull1,
      ),
    );
  }
}
