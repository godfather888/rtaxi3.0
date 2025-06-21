import 'package:better_localization/country_code/country_code.dart';
import 'package:flutter_common/core/enums/measurement_system.dart';
import 'package:generic_map/generic_map.dart';
import 'package:latlong2/latlong.dart';

import 'package:flutter_dotenv/flutter_dotenv.dart';

class Constants {
  static const int resendOtpTime = 90;
  static bool isDemoMode = dotenv.maybeGet('DEMO_MODE') == 'true';
  static bool showTimeIn24HourFormat = true;
  static final CountryCode defaultCountry = CountryCode.parseByIso('US')!;

  static PlatformMapProviderSettings get mapProviderPlatformSettings => PlatformMapProviderSettings(
    defaultProvider: MapProviderEnum.openStreetMaps,
    desktopProvider: MapProviderEnum.openStreetMaps,
    webProvider: MapProviderEnum.openStreetMaps,
  );

  static MapLibreOptions mapLibreOptions(bool isDarkMode) => MapLibreOptions(
    apiKey: dotenv.maybeGet('MAPLIBRE_API_KEY'),
    styleUrl: isDarkMode ? dotenv.maybeGet('MAPLIBRE_STYLE_DARK_URL') : dotenv.maybeGet('MAPLIBRE_STYLE_URL'),
  );

  static MapboxOptions mapboxOptions(bool isDarkMode) => MapboxOptions(
    accessToken: dotenv.maybeGet('MAPBOX_TOKEN') ?? "",
    styleTileSetId: isDarkMode ? 'dark-v11' : 'streets-v12',
  );

  static MapboxSdkOptions mapboxSdkOptions(bool isDarkMode) => MapboxSdkOptions(
    accessToken: dotenv.maybeGet('MAPBOX_TOKEN') ?? "",
    style: isDarkMode ? MapboxSdkStyle.dark : MapboxSdkStyle.standard,
  );

  static const Place defaultLocation = Place(LatLng(37.3875, -122.0575), "Mountain View, CA", "Mountain View, CA");
  static const List<double> walletPresets = [10, 20, 50];
  static const MapProviderEnum defaultMapProvider = MapProviderEnum.googleMaps;
  static const MeasurementSystem defaultMeasurementSystem = MeasurementSystem.metric;
}
