import 'package:api_response/api_response.dart';
import 'package:driver_flutter/core/graphql/documents/ride_history.graphql.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:injectable/injectable.dart';
import 'package:driver_flutter/features/ride_history/domain/repositories/ride_history_repository.dart';

part 'ride_history.state.dart';
part 'ride_history.bloc.freezed.dart';

@lazySingleton
class RideHistoryBloc extends Cubit<RideHistoryState> {
  final RideHistoryRepository _repository;
  RideHistoryBloc(this._repository) : super(const RideHistoryState());

  void fetchRideHistory() async {
    emit(state.copyWith(
      rideHistoryState: ApiResponse.loading(),
    ));
    final rideHistoryResponse = await _repository.getRideHistory();

    emit(state.copyWith(
      rideHistoryState: rideHistoryResponse,
    ));
  }
}
