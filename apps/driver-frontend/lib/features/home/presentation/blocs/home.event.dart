part of 'home.bloc.dart';

@freezed
sealed class HomeEvent with _$HomeEvent {
  const factory HomeEvent.onStarted() = HomeEvent$OnStarted;

  const factory HomeEvent.onStatusChanged({
    required Enum$DriverStatus status,
  }) = HomeEvent$OnStatusChanged;

  const factory HomeEvent.onOrderRequestPageChanged({
    required Fragment$OrderRequest request,
  }) = HomeEvent$OnOrderRequestPageChanged;

  const factory HomeEvent.requestUpdatedOrderRequests() = HomeEvent$OnRefreshOrderRequests;

  const factory HomeEvent.onAcceptOrder({
    required Fragment$OrderRequest request,
  }) = HomeEvent$OnAcceptOrder;

  const factory HomeEvent.onCancelOrder({
    required String orderId,
    required String? reasonId,
    required String? reasonNote,
  }) = HomeEvent$OnCancelOrder;

  const factory HomeEvent.onArrivedToPickupPoint({
    required String orderId,
  }) = HomeEvent$OnArrivedToPickupPoint;

  const factory HomeEvent.onStripStarted({
    required String orderId,
  }) = HomeEvent$OnTripStarted;

  const factory HomeEvent.onArrivedToDestination({
    required Fragment$CurrentOrder order,
    required int destinationArrivedTo,
  }) = HomeEvent$OnArrivedToDestination;

  const factory HomeEvent.paidInCash({
    required String orderId,
    required double amount,
  }) = HomeEvent$PaidInCash;

  const factory HomeEvent.onSummaryConfirmed({
    required String orderId,
  }) = HomeEvent$OnSummaryConfirmed;

  const factory HomeEvent.reviewSubmitted({
    required String orderId,
    required int? rating,
    required String? review,
  }) = HomeEvent$ReviewSubmitted;

  const factory HomeEvent.onShowChat() = HomeEvent$OnShowChat;

  const factory HomeEvent.onHideChat() = HomeEvent$OnHideChat;
}
