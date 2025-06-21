part of 'report_issue.bloc.dart';

@freezed
sealed class ReportIssueState with _$ReportIssueState {
  const factory ReportIssueState({
    @Default(ApiResponseInitial()) ApiResponse<Mutation$SubmitIssue> submitIssueState,
  }) = _ReportIssueState;
}
