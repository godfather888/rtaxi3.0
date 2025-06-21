import 'package:api_response/api_response.dart';
import 'package:driver_flutter/core/graphql/documents/home.graphql.dart';
import 'package:driver_flutter/features/home/domain/repositories/home_repository.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:injectable/injectable.dart';

part 'cancel_reason.state.dart';
part 'cancel_reason.bloc.freezed.dart';

@lazySingleton
class CancelReasonCubit extends Cubit<CancelReasonState> {
  final HomeRepository _repository;

  CancelReasonCubit(this._repository) : super(const CancelReasonState());

  void onStarted() async {
    emit(state.copyWith(cancelReasonsState: ApiResponse.loading()));
    var cancelReasonsResponse = await _repository.getCancelReasons();

    emit(state.copyWith(cancelReasonsState: cancelReasonsResponse));
  }
}
