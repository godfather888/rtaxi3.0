part of 'feedbacks_summary.bloc.dart';

@freezed
sealed class FeedbacksSummaryState with _$FeedbacksSummaryState {
  const factory FeedbacksSummaryState({
    @Default(ApiResponseInitial()) ApiResponse<Query$FeedbacksSummary> feedbacksSummaryState,
  }) = _FeedbacksSummaryState;
}
