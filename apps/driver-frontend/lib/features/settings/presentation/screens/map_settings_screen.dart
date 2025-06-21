import 'dart:io';

import 'package:auto_route/auto_route.dart';
import 'package:driver_flutter/config/locator/locator.dart';
import 'package:driver_flutter/core/blocs/settings.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/foundation.dart';
import 'package:driver_flutter/core/extensions/extensions.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_common/core/presentation/responsive_dialog/app_top_bar.dart';
import 'package:flutter_common/gen/assets.gen.dart';
import 'package:generic_map/generic_map.dart';

import '../components/map_settings_item.dart';

@RoutePage()
class MapSettingsScreen extends StatefulWidget {
  const MapSettingsScreen({super.key});

  @override
  State<MapSettingsScreen> createState() => _MapSettingsScreenState();
}

class _MapSettingsScreenState extends State<MapSettingsScreen> {
  PageController? pageController;

  int activeId = 0;

  @override
  Widget build(BuildContext context) {
    pageController ??= PageController(viewportFraction: context.responsive(0.8, xl: 0.3));
    return Container(
      color: context.theme.scaffoldBackgroundColor,
      padding: EdgeInsets.symmetric(
        horizontal: context.responsive(16, xl: 24),
        vertical: context.responsive(
          16,
          xl: 24,
        ),
      ),
      child: SafeArea(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            context.responsive(
              const SizedBox(),
              xl: const SizedBox(
                height: 80,
              ),
            ),
            AppTopBar(
              title: context.translate.mapSettings,
            ),
            const SizedBox(
              height: 24,
            ),
            BlocBuilder<SettingsCubit, SettingsState>(
              buildWhen: (previous, current) => previous.mapProvider != current.mapProvider,
              builder: (context, state) {
                return Expanded(
                  child: PageView(
                    controller: pageController,
                    onPageChanged: (newSelectedPage) {
                      setState(() {
                        activeId = newSelectedPage;
                      });
                    },
                    children: [
                      MapSettingItem(
                        isActive: activeId == 0,
                        isSelected: state.mapProvider == MapProviderEnum.mapBoxSDK,
                        image: Assets.mapPreviews.mapboxSdk,
                        title: "MapBox",
                        benefits: const ["Attractive design", "Good performance"],
                        shortComings: const ["Web and desktop not supported"],
                        onPressed: () => locator<SettingsCubit>().changeMapProvider(MapProviderEnum.mapBoxSDK),
                      ),
                      MapSettingItem(
                        isActive: activeId == 1,
                        isSelected: state.mapProvider == MapProviderEnum.mapBox,
                        image: Assets.mapPreviews.mapbox,
                        title: "MapBox Static",
                        benefits: const ["Attractive design", "Great performance"],
                        shortComings: const ["Expensive"],
                        onPressed: () => locator<SettingsCubit>().changeMapProvider(MapProviderEnum.mapBox),
                      ),
                      MapSettingItem(
                        isActive: activeId == 2,
                        isSelected: state.mapProvider == MapProviderEnum.openStreetMaps,
                        image: Assets.mapPreviews.openstreet,
                        title: "OpenStreetMap",
                        benefits: const [
                          "Free",
                          "Good performance",
                        ],
                        shortComings: const [
                          "Less Attractive UI",
                        ],
                        onPressed: () => locator<SettingsCubit>().changeMapProvider(MapProviderEnum.openStreetMaps),
                      ),
                      MapSettingItem(
                        isActive: activeId == 3,
                        isSelected: state.mapProvider == MapProviderEnum.googleMaps,
                        image: Assets.mapPreviews.googlemap,
                        title: "Google Maps",
                        benefits: const [
                          "Best location coverage",
                          "Good pricing",
                        ],
                        shortComings: const [
                          "No support for web and desktop",
                        ],
                        onPressed: (kIsWeb || Platform.isMacOS || Platform.isWindows || Platform.isLinux)
                            ? null
                            : () => locator<SettingsCubit>().changeMapProvider(MapProviderEnum.googleMaps),
                      ),
                      MapSettingItem(
                        isActive: activeId == 4,
                        isSelected: state.mapProvider == MapProviderEnum.mapLibre,
                        image: Assets.mapPreviews.maplibre,
                        title: "MapLibre",
                        benefits: const [
                          "Free",
                          "Good performance",
                        ],
                        shortComings: const [
                          "UI could be better",
                        ],
                        onPressed: () => locator<SettingsCubit>().changeMapProvider(MapProviderEnum.mapLibre),
                      ),
                    ],
                  ),
                );
              },
            )
          ],
        ),
      ),
    );
  }
}
