part of 'home.bloc.dart';

@freezed
sealed class HomeEvent with _$HomeEvent {
  const factory HomeEvent.onStarted({required bool authenticated, required Place? currentLocationPlace}) =
      HomeEvent$OnStarted;

  const factory HomeEvent.onMapReady({required MapViewController controller}) = HomeEvent$OnMapReady;

  const factory HomeEvent.onMapMoved({required ApiResponse<Place> selectedLocation}) = HomeEvent$OnMapMoved;

  const factory HomeEvent.onAddStop() = HomeEvent$OnAddStop;

  const factory HomeEvent.onRemoveStop({required int index}) = HomeEvent$OnRemoveStop;

  const factory HomeEvent.initializeWelcome({required Place? pickupPoint}) = HomeEvent$InitializeWelcome;

  const factory HomeEvent.changeOrderSubmissionPage({required OrderSubmissionPage orderSubmissionPage}) =
      HomeEvent$ChangeOrderSubmissionPage;

  const factory HomeEvent.onRideOptionSelected() = HomeEvent$OnRideOptionSelected;

  const factory HomeEvent.onDeliveryOptionSelected() = HomeEvent$OnDeliveryOptionSelected;

  const factory HomeEvent.changeTrackOrderPage({required TrackOrderPage page}) = HomeEvent$ChangeTrackOrderPage;

  const factory HomeEvent.onWaypointConfirmed() = HomeEvent$OnWaypointConfirmed;

  const factory HomeEvent.showConfirmWaypoint({required Place selectedLocation}) = HomeEvent$ShowConfirmWaypoint;

  const factory HomeEvent.updateContactName({required String name}) = HomeEvent$UpdateContactName;
  const factory HomeEvent.updateContactPhone({required Input$PhoneNumberInput? phoneNumber}) =
      HomeEvent$UpdateContactPhone;
  const factory HomeEvent.updateContactAddress({required String address}) = HomeEvent$UpdateContactAddress;
  const factory HomeEvent.updateContactBuilding({required String building}) = HomeEvent$UpdateContactBuilding;
  const factory HomeEvent.updateContactApartment({required String apartment}) = HomeEvent$UpdateContactApartment;
  const factory HomeEvent.updateContactInstructions({required String instructions}) =
      HomeEvent$UpdateContactInstructions;

  const factory HomeEvent.confirmContactInfo() = HomeEvent$ConfirmContactInfo;

  const factory HomeEvent.onChatMessageSent({required String message}) = HomeEvent$OnChatMessageSent;

  const factory HomeEvent.showPreview({Place? destination}) = HomeEvent$ShowPreview;

  const factory HomeEvent.onServiceCategorySelected({required Fragment$ServiceCategory serviceCategory}) =
      HomeEvent$OnServiceCategorySelected;

  const factory HomeEvent.onServiceSelected({required Fragment$Service service, required bool value}) =
      HomeEvent$OnServiceSelected;

  const factory HomeEvent.onPaymentMethodSelected({required PaymentMethodUnion paymentMethod}) =
      HomeEvent$OnPaymentMethodSelected;

  const factory HomeEvent.submitOrder({required DateTime? selectedDateTime}) = HomeEvent$SubmitOrder;

  const factory HomeEvent.onRidePreferencesUpdated({
    required bool isTwoWayTrip,
    required int? waitTime,
    required List<Fragment$RideOption> rideOptions,
  }) = HomeEvent$OnRidePreferencesUpdated;

  const factory HomeEvent.onCouponCodeChanged({required String couponCode}) = HomeEvent$OnCouponCodeUpdated;

  const factory HomeEvent.focusOnWaypoint({required int index}) = HomeEvent$FocusOnWaypoint;

  const factory HomeEvent.cancelRide({
    required String orderId,
    required String? cancelReasonId,
    required String? cancelReasonNote,
  }) = HomeEvent$CancelRide;

  const factory HomeEvent.onReviewSubmitted({
    required String orderId,
    required int rating,
    required String? comment,
    required List<Fragment$ReviewParameter> parameters,
    required bool isFavorite,
  }) = HomeEvent$OnReviewSubmitted;

  const factory HomeEvent.skipReview({required String orderId}) = HomeEvent$SkipReview;
}
