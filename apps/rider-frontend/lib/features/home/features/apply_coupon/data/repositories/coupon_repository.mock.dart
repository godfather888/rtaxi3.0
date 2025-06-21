import 'package:api_response/api_response.dart';
import 'package:injectable/injectable.dart';
import 'package:rider_flutter/core/graphql/documents/calculate_fare.graphql.dart';
import '../../domain/repositories/coupon_repository.dart';

@dev
@LazySingleton(as: CouponRepository)
class CouponRepositoryMock implements CouponRepository {
  @override
  Future<ApiResponse<Query$GetCouponInfo>> checkCouponValidity(String code) async {
    await Future.delayed(
      Duration(seconds: 1),
    );
    return ApiResponse.loaded(
      Query$GetCouponInfo(
        couponInfo: Query$GetCouponInfo$couponInfo(id: '1', code: code),
      ),
    );
  }
}
