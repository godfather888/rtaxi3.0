import 'package:collection/collection.dart';
import 'package:driver_flutter/config/theme/fonts.dart';
import 'package:driver_flutter/core/extensions/extensions.dart';
import 'package:driver_flutter/core/graphql/documents/earnings.graphql.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_common/core/color_palette/color_palette.dart';

extension EarningsdatasetX on Query$Earnings {
  double get totalEarnings => getStatsNew.dataset.fold(
        0,
        (previousValue, element) => previousValue + element.earning,
      );

  double get totalRides => getStatsNew.dataset.fold(
        0,
        (previousValue, element) => previousValue + element.count,
      );

  double get totalTimeSpent => getStatsNew.dataset.fold(
        0,
        (previousValue, element) => previousValue + element.time,
      );

  double get totalDistanceTraveled => getStatsNew.dataset.fold(
        0,
        (previousValue, element) => previousValue + element.distance,
      );

  BarChartData get barChartData {
    final barGroups = getStatsNew.dataset
        .mapIndexed(
          (index, e) => BarChartGroupData(
            x: index,
            barRods: [
              BarChartRodData(
                toY: e.earning,
                color: ColorPalette.primary30,
                width: 16,
              ),
            ],
          ),
        )
        .toList();

    return BarChartData(
      barTouchData: BarTouchData(
        enabled: false,
      ),
      titlesData: FlTitlesData(
        show: true,
        bottomTitles: AxisTitles(
          sideTitles: SideTitles(
            showTitles: true,
            getTitlesWidget: (value, meta) {
              return Transform.rotate(
                angle: -45 * 3.14 / 180,
                child: Padding(
                  padding: const EdgeInsets.only(top: 8),
                  child: Text(
                    getStatsNew.dataset[value.toInt()].name,
                    style: const TextStyle(
                      color: Color(0xFF73777F),
                      fontSize: 10,
                      fontFamily: Fonts.secondary,
                      fontWeight: FontWeight.w400,
                    ),
                  ),
                ),
              );
            },
          ),
        ),
        rightTitles: const AxisTitles(
          sideTitles: SideTitles(
            showTitles: false,
          ),
        ),
        topTitles: const AxisTitles(
          sideTitles: SideTitles(
            showTitles: false,
          ),
        ),
        leftTitles: AxisTitles(
          sideTitles: SideTitles(
            showTitles: true,
            reservedSize: 40,
            getTitlesWidget: (value, meta) {
              return Text(
                value.formatCurrency(getStatsNew.currency),
                style: const TextStyle(
                  color: Color(0xFF73777F),
                  fontSize: 10,
                  fontFamily: Fonts.secondary,
                  fontWeight: FontWeight.w400,
                ),
              );
            },
          ),
        ),
      ),
      gridData: const FlGridData(show: false),
      borderData: FlBorderData(
        show: false,
      ),
      barGroups: barGroups,
    );
  }
}
