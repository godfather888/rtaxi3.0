import 'package:api_response/api_response.dart';
import 'package:injectable/injectable.dart';
import 'package:rider_flutter/core/graphql/documents/scheduled_rides.graphql.dart';
import 'package:rider_flutter/core/datasources/graphql_datasource.dart';

import '../../domain/repositories/scheduled_rides_repository.dart';

@prod
@LazySingleton(as: ScheduledRidesRepository)
class ScheduledRidesRepositoryImpl implements ScheduledRidesRepository {
  final GraphqlDatasource graphQLDatasource;

  ScheduledRidesRepositoryImpl(
    this.graphQLDatasource,
  );

  @override
  Future<ApiResponse<Query$ScheduledRides>> getUpcomingRides() async {
    final upcomingRidesResponse = await graphQLDatasource.query(
      Options$Query$ScheduledRides(),
    );
    return upcomingRidesResponse;
  }

  @override
  Future<ApiResponse<Mutation$CancelBooking>> cancelRide({required String orderId}) async {
    final cancelRideResponse = await graphQLDatasource.mutate(
      Options$Mutation$CancelBooking(
        variables: Variables$Mutation$CancelBooking(orderId: orderId),
      ),
    );
    return cancelRideResponse;
  }
}
