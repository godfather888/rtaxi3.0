import 'package:driver_flutter/config/locator/locator.dart';
import 'package:driver_flutter/core/blocs/location.bloc.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_common/core/presentation/my_location_button.dart';

import '../blocs/home.bloc.dart';

class HomeMyLocationButton extends StatelessWidget {
  const HomeMyLocationButton({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<HomeBloc, HomeState>(builder: (context, state) {
      return switch (state.driverStatus) {
        HomeStateDriverStatus.online => state.orderRequests.isNotEmpty ? const SizedBox() : _buildButton(context),
        _ => _buildButton(context),
      };
    });
  }

  Widget _buildButton(BuildContext context) {
    return MyLocationButton(
      onPressed: () {
        locator<LocationBloc>().fetchCurrentLocation();
      },
    );
  }
}
