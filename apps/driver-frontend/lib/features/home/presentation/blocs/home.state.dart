part of 'home.bloc.dart';

@freezed
sealed class HomeState with _$HomeState {
  const factory HomeState({
    @Default(ApiResponseInitial()) ApiResponse<Fragment$ProfileFull> profileFragment,
    Fragment$Point? driverLocation,
    DateTime? lastLocationUpdate,

    // Online state
    @Default([]) List<Fragment$OrderRequest> orderRequests,
    Fragment$OrderRequest? currentOrderRequest,

    // On trip state
    @Default(OnTripPage.overview) OnTripPage page,
    String? currentOrderId,
    @Default(ApiResponseInitial()) ApiResponse<Fragment$CurrentOrder> acceptOrderReponse,
  }) = _HomeState;

  // factory HomeState.fromJson(Map<String, dynamic> json) => _$HomeStateFromJson(json);

  const HomeState._();
  Fragment$ProfileFull? get profile => profileFragment.data;

  Fragment$CurrentOrder? get currentOrder =>
      profile?.currentOrders.where((e) => e.id == currentOrderId).firstOrNull ?? profile?.currentOrders.firstOrNull;

  HomeStateDriverStatus get driverStatus {
    if (profileFragment.isLoading) {
      return HomeStateDriverStatus.loading;
    } else if (profileFragment.isError) {
      return HomeStateDriverStatus.initial;
    } else if (profile != null) {
      return switch (profile!.status) {
        Enum$DriverStatus.Online => HomeStateDriverStatus.online,
        Enum$DriverStatus.Offline => HomeStateDriverStatus.offline,
        Enum$DriverStatus.InService => switch (currentOrder?.status) {
            Enum$OrderStatus.DriverAccepted ||
            Enum$OrderStatus.Arrived ||
            Enum$OrderStatus.Started ||
            Enum$OrderStatus.Found ||
            Enum$OrderStatus.Requested ||
            Enum$OrderStatus.NoCloseFound ||
            Enum$OrderStatus.WaitingForPrePay ||
            Enum$OrderStatus.WaitingForReview ||
            Enum$OrderStatus.NotFound ||
            Enum$OrderStatus.WaitingForPostPay =>
              HomeStateDriverStatus.onTrip,
            _ => HomeStateDriverStatus.onTrip,
          },
        Enum$DriverStatus.SoftReject ||
        Enum$DriverStatus.WaitingDocuments ||
        Enum$DriverStatus.HardReject ||
        Enum$DriverStatus.Blocked =>
          HomeStateDriverStatus.accessDenied,
        Enum$DriverStatus.PendingApproval => HomeStateDriverStatus.offline,
        Enum$DriverStatus.$unknown => throw UnimplementedError(),
      };
    } else {
      return HomeStateDriverStatus.initial;
    }
  }

  List<Fragment$Point> get _directions {
    switch (driverStatus) {
      case HomeStateDriverStatus.online:
        return currentOrderRequest?.directions ?? [];
      case HomeStateDriverStatus.onTrip:
        switch (currentOrder?.status) {
          case Enum$OrderStatus.DriverAccepted:
            return currentOrder?.driverDirections ?? [];

          case Enum$OrderStatus.WaitingForPrePay:
          case Enum$OrderStatus.WaitingForPostPay:
          case Enum$OrderStatus.Found:
          case Enum$OrderStatus.Requested:
          case Enum$OrderStatus.NoCloseFound:
          case Enum$OrderStatus.NotFound:
          case Enum$OrderStatus.WaitingForReview:
          case Enum$OrderStatus.Booked:
          case Enum$OrderStatus.Started:
            return currentOrder?.directions ?? [];

          default:
            return [];
        }
      default:
        return [];
    }
  }

  EdgeInsets mapPadding(BuildContext context) {
    switch (driverStatus) {
      case HomeStateDriverStatus.online:
        if (orderRequests.isEmpty) {
          return EdgeInsets.only(bottom: 20, left: 100, right: 100, top: 100);
        } else {
          return EdgeInsets.only(bottom: 450, left: 100, right: 100, top: 200);
        }
      case HomeStateDriverStatus.onTrip:
      case HomeStateDriverStatus.offline:
      case HomeStateDriverStatus.accessDenied:
      case HomeStateDriverStatus.initial:
      case HomeStateDriverStatus.loading:
        return EdgeInsets.only(bottom: 16, left: 100, right: 100, top: 140);
    }
  }

  List<CustomMarker> get markers {
    final driverMarker = driverLocation == null
        ? null
        : CustomMarker(
            position: LatLng(driverLocation!.lat, driverLocation!.lng),
            rotation: driverLocation?.heading ?? 0,
            widget: Assets.images.carTopView.image(
              width: 50,
              height: 50,
              fit: BoxFit.cover,
            ),
            fallbackAssetPath: Assets.images.carTopView.path,
          );

    switch (driverStatus) {
      case HomeStateDriverStatus.online:
        final activeOrder = (currentOrderRequest ?? orderRequests.firstOrNull);
        final waypointsMarkers = activeOrder?.wayPoints.markers;
        final directionsCapMarkers =
            activeOrder?.directions!.map((e) => e.toLatLngEntity).toList().directionsCapMarkers ?? [];
        return [
          if (waypointsMarkers != null) ...waypointsMarkers,
          if (driverMarker != null) driverMarker,
          ...directionsCapMarkers,
        ];

      case HomeStateDriverStatus.onTrip:
        final List<CustomMarker> waypointsMarkers = switch (currentOrder?.status) {
              Enum$OrderStatus.DriverAccepted => [currentOrder?.wayPoints.markers.first].nonNulls.toList(),
              Enum$OrderStatus.Arrived => [currentOrder?.wayPoints.markers.firstOrNull].nonNulls.toList(),
              Enum$OrderStatus.WaitingForPrePay => currentOrder?.wayPoints.markers,
              Enum$OrderStatus.WaitingForPostPay => currentOrder?.wayPoints.markers,
              Enum$OrderStatus.Started =>
                [currentOrder?.wayPoints.markers[(currentOrder?.destinationArrivedTo ?? -1) + 1]].nonNulls.toList(),
              _ => currentOrder?.wayPoints.markers,
            } ??
            [];
        final directionsCapMarkers = _directions.toLatLngList.directionsCapMarkers;
        return [
          ...waypointsMarkers,
          ...directionsCapMarkers,
          if (driverMarker != null) driverMarker,
        ];

      case HomeStateDriverStatus.offline:
        return [
          if (driverMarker != null) driverMarker,
        ];

      default:
        return [];
    }
  }

  List<PolyLineLayer> get polylines => switch (driverStatus) {
        HomeStateDriverStatus.online => [
            if ((currentOrderRequest ?? orderRequests.firstOrNull)
                    ?.directions
                    ?.map((e) => e.toLatLngEntity)
                    .toList()
                    .toPolyLineLayer !=
                null)
              (currentOrderRequest ?? orderRequests.firstOrNull)!
                  .directions!
                  .map((e) => e.toLatLngEntity)
                  .toList()
                  .toPolyLineLayer,
          ],
        HomeStateDriverStatus.onTrip => [
            _directions.toLatLngList.toPolyLineLayer,
          ],
        _ => [],
      };

  List<CircleMarker> circleMarkers(int? radius) => switch (driverStatus) {
        HomeStateDriverStatus.online when radius != null && driverLocation != null => [
            CircleMarker(
              position: LatLng(driverLocation!.lat, driverLocation!.lng),
              radius: radius.toDouble(),
              color: ColorPalette.primary80.withValues(alpha: 0.2),
              borderColor: ColorPalette.primary80.withValues(alpha: 0.8),
              borderWidth: 1,
            ),
          ],
        _ => [],
      };
}

enum OnTripPage { overview, chat }

enum HomeStateDriverStatus { initial, loading, online, offline, onTrip, accessDenied }
