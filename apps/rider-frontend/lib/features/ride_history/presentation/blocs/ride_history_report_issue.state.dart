part of 'ride_history_report_issue.bloc.dart';

@freezed
sealed class RideHistoryReportIssueState with _$RideHistoryReportIssueState {
  const factory RideHistoryReportIssueState({
    @Default(ApiResponseInitial()) ApiResponse<Mutation$SubmitIssue> submitIssueState,
  }) = _RideHistoryReportIssueState;
}
