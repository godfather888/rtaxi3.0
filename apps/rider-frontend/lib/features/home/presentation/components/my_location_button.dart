import 'package:api_response/api_response.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_common/core/presentation/my_location_button.dart' as button;
import 'package:rider_flutter/config/locator/locator.dart';
import 'package:rider_flutter/core/blocs/home.bloc.dart';
import 'package:rider_flutter/core/blocs/location.bloc.dart';

class AppMyLocationButton extends StatelessWidget {
  const AppMyLocationButton({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<HomeBloc, HomeState>(
      builder: (context, state) {
        return switch (state.orderSubmissionPage) {
          OrderSubmissionPage.welcome || OrderSubmissionPage.confirmLocation => button.MyLocationButton(
              onPressed: () async {
                final currentPlace = locator<LocationCubit>().state.place;
                if (currentPlace != null) {
                  locator<HomeBloc>().add(HomeEvent.onMapMoved(selectedLocation: ApiResponse.loaded(currentPlace)));
                  final mapController = state.mapViewController;
                  mapController?.moveCamera(currentPlace.latLng, 16);
                  return;
                }
              },
            ),
          _ => const SizedBox.shrink(),
        };
      },
    );
  }
}
