import 'package:flutter/material.dart';
import 'package:generic_map/generic_map.dart';
import 'package:flutter_common/core/color_palette/color_palette.dart';

class CurrentLocationMarker extends StatelessWidget {
  const CurrentLocationMarker({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: ColorPalette.primary50.withValues(alpha: 0.10),
        shape: BoxShape.circle,
      ),
      child: Container(
        padding: const EdgeInsets.all(8),
        decoration: BoxDecoration(
          color: ColorPalette.primary50.withValues(alpha: 0.3),
          shape: BoxShape.circle,
        ),
        child: Container(
          decoration: BoxDecoration(
            color: ColorPalette.primary60,
            border: Border.all(color: Colors.white, width: 1.5),
            shape: BoxShape.circle,
            boxShadow: const [
              BoxShadow(
                blurRadius: 20,
                spreadRadius: 0,
              ),
            ],
          ),
          width: 15,
          height: 15,
        ),
      ),
    );
  }

  CenterMarker get marker => CenterMarker(
        widget: this,
        size: const Size(55, 55),
        alignment: Alignment.center,
      );
}
