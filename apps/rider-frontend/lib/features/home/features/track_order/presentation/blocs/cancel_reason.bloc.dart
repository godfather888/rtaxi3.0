import 'package:api_response/api_response.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:injectable/injectable.dart';
import 'package:rider_flutter/core/graphql/documents/track_order.graphql.dart';
import 'package:rider_flutter/features/home/features/track_order/domain/repositories/track_order_repository.dart';

part 'cancel_reason.state.dart';
part 'cancel_reason.bloc.freezed.dart';

@lazySingleton
class CancelReasonCubit extends Cubit<CancelReasonState> {
  final TrackOrderRepository _repository;

  CancelReasonCubit(this._repository) : super(const CancelReasonState());

  void onStarted() async {
    emit(
      state.copyWith(
        cancelOrderState: ApiResponse.loading(),
      ),
    );

    var cancelReasonsResponse = await _repository.getCancelReasons();

    emit(
      state.copyWith(
        cancelOrderState: cancelReasonsResponse,
      ),
    );
  }
}
