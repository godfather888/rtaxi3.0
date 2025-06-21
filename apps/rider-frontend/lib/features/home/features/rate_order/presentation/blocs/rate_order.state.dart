part of 'rate_order.bloc.dart';

@freezed
sealed class RateOrderState with _$RateOrderState {
  const factory RateOrderState.initial() = RateOrderState$Initial;
  const factory RateOrderState.loading() = RateOrderState$Loading;
  const factory RateOrderState.error({
    required String message,
  }) = RateOrderState$Error;
  const factory RateOrderState.parametersLoaded({
    required List<Fragment$ReviewParameter> strengthParameters,
    required List<Fragment$ReviewParameter> weaknessParameters,
    @Default([]) List<Fragment$ReviewParameter> selectedParameters,
  }) = RateOrderState$ParametersLoaded;
  const factory RateOrderState.reviewSubmitted() = RateOrderState$ReviewSubmitted;
}

extension ParametersLoadedX on RateOrderState$ParametersLoaded {
  bool parameterSelected(Fragment$ReviewParameter parameter) => selectedParameters.contains(parameter);
}
