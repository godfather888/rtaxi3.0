import 'package:api_response/api_response.dart';
import 'package:driver_flutter/core/graphql/documents/profile.graphql.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:injectable/injectable.dart';
import '../../domain/repositories/profile_repository.dart';

part 'feedbacks_summary.state.dart';
part 'feedbacks_summary.bloc.freezed.dart';

@lazySingleton
class FeedbacksSummaryCubit extends Cubit<FeedbacksSummaryState> {
  final ProfileRepository _repository;
  FeedbacksSummaryCubit(this._repository) : super(const FeedbacksSummaryState());

  void fetchFeedbacksSummary() async {
    emit(state.copyWith(feedbacksSummaryState: ApiResponse.loading()));

    final feedbacksSummaryResponse = await _repository.getFeedbacksSummary();

    emit(state.copyWith(feedbacksSummaryState: feedbacksSummaryResponse));
  }
}
