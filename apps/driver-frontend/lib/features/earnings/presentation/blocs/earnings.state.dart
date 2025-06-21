part of 'earnings.bloc.dart';

@freezed
sealed class EarningsState with _$EarningsState {
  const factory EarningsState({
    required Enum$TimeQuery timeframe,
    required DateTime startDate,
    required DateTime endDate,
    @Default(ApiResponseInitial()) ApiResponse<Query$Earnings> earningsState,
  }) = _EarningsState;

  const EarningsState._();

  bool get canGoBack => startDate.isAfter(
        DateTime.now().subtract(
          Duration(days: timeframe == Enum$TimeQuery.Weekly ? 180 : 365),
        ),
      );

  bool get canGoForward => endDate.isBefore(
        DateTime.now().subtract(const Duration(days: 1)),
      );

  factory EarningsState.initial() => EarningsState(
        timeframe: Enum$TimeQuery.Daily,
        startDate: DateTime.now(),
        endDate: DateTime.now().subtract(const Duration(days: 7)),
        earningsState: const ApiResponse.initial(),
      );
}
