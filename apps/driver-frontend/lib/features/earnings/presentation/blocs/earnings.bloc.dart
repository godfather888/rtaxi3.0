import 'package:api_response/api_response.dart';
import 'package:driver_flutter/core/graphql/documents/earnings.graphql.dart';
import 'package:driver_flutter/core/graphql/schema.gql.dart';

import 'package:driver_flutter/features/earnings/domain/repositories/earnings_repository.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:injectable/injectable.dart';

part 'earnings.state.dart';
part 'earnings.bloc.freezed.dart';

@lazySingleton
class EarningsBloc extends Cubit<EarningsState> {
  final EarningsRepository _repository;

  EarningsBloc(this._repository) : super(EarningsState.initial());

  void fetchEarningsDataset() async {
    emit(
      state.copyWith(
        earningsState: ApiResponse.loading(),
      ),
    );

    final earningsDatasetResponse = await _repository.getEarningsDataset(
      timeFrame: state.timeframe,
      startDate: state.startDate,
      endDate: state.endDate,
    );

    emit(state.copyWith(
      earningsState: earningsDatasetResponse,
    ));
  }

  void setTimeFrame(Enum$TimeQuery timeFrame) {
    emit(state.copyWith(
      timeframe: timeFrame,
      endDate: DateTime.now(),
      startDate: DateTime.now().subtract(
        Duration(days: timeFrame == Enum$TimeQuery.Daily ? 7 : 180),
      ),
    ));
    fetchEarningsDataset();
  }

  void previousTimeframe() {
    emit(state.copyWith(
      endDate: state.startDate,
      startDate: state.startDate.subtract(
        Duration(days: state.timeframe == Enum$TimeQuery.Daily ? 7 : 180),
      ),
    ));
    fetchEarningsDataset();
  }

  void nextTimeframe() {
    emit(state.copyWith(
      startDate: state.endDate,
      endDate: state.endDate.add(
        Duration(days: state.timeframe == Enum$TimeQuery.Daily ? 7 : 180),
      ),
    ));
    fetchEarningsDataset();
  }
}
