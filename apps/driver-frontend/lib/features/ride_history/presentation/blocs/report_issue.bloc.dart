import 'package:api_response/api_response.dart';
import 'package:driver_flutter/core/graphql/documents/ride_history.graphql.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:injectable/injectable.dart';
import 'package:driver_flutter/features/ride_history/domain/repositories/ride_history_repository.dart';

part 'report_issue.state.dart';
part 'report_issue.bloc.freezed.dart';

@lazySingleton
class ReportIssueCubit extends Cubit<ReportIssueState> {
  final RideHistoryRepository repository;

  ReportIssueCubit(this.repository) : super(const ReportIssueState());

  void reportIssue({
    required String orderId,
    required String subject,
    required String issue,
  }) async {
    emit(state.copyWith(
      submitIssueState: ApiResponse.loading(),
    ));
    final reportIssueResponse = await repository.reportIssue(
      orderId: orderId,
      subject: subject,
      issue: issue,
    );
    emit(state.copyWith(
      submitIssueState: reportIssueResponse,
    ));
  }
}
