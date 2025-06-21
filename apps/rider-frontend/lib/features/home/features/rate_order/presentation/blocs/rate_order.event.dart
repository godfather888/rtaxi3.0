part of 'rate_order.bloc.dart';

@freezed
sealed class RateOrderEvent with _$RateOrderEvent {
  const factory RateOrderEvent.onStarted() = RateOrderEvent$OnStarted;

  const factory RateOrderEvent.onParameterTapped({
    required Fragment$ReviewParameter parameter,
  }) = RateOrderEvent$OnParameterTapped;

  const factory RateOrderEvent.onReviewSubmitted({
    required String orderId,
    required int rating,
    required String? comment,
    required List<Fragment$ReviewParameter> parameters,
    required bool isFavorite,
  }) = RateOrderEvent$OnReviewSubmitted;

  const factory RateOrderEvent.skipReview({
    required String orderId,
  }) = RateOrderEvent$SkipReview;
}
