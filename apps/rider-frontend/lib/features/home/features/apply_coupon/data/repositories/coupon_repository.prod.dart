import 'package:api_response/api_response.dart';
import 'package:injectable/injectable.dart';
import 'package:rider_flutter/core/graphql/documents/calculate_fare.graphql.dart';
import 'package:rider_flutter/core/datasources/graphql_datasource.dart';
import 'package:rider_flutter/features/home/features/apply_coupon/domain/repositories/coupon_repository.dart';

@prod
@LazySingleton(as: CouponRepository)
class CouponRepositoryImpl implements CouponRepository {
  final GraphqlDatasource graphqlDatasource;

  CouponRepositoryImpl(this.graphqlDatasource);

  @override
  Future<ApiResponse<Query$GetCouponInfo>> checkCouponValidity(String code) async {
    final checkCouponValidityResponse = await graphqlDatasource.query(
      Options$Query$GetCouponInfo(
        variables: Variables$Query$GetCouponInfo(
          couponCode: code,
        ),
      ),
    );
    return checkCouponValidityResponse;
  }
}
