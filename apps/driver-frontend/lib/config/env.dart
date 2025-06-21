import 'package:better_localization/country_code/country_code.dart';
import 'package:flutter_common/core/enums/measurement_system.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:generic_map/interfaces/place.dart';
import 'package:latlong2/latlong.dart';

class Env {
  static final String serverUrl = dotenv.maybeGet('BASE_URL') ?? "http://localhost:3002/driver-api/";
  static final String gqlEndpoint = '${serverUrl}graphql';
  static bool isDemoMode = dotenv.maybeGet('DEMO_MODE') == 'true';
  static String appName = dotenv.maybeGet('APP_NAME') ?? "Ridy Driver";
  static String companyName = dotenv.maybeGet('COMPANY_NAME') ?? "BetterSuite";
  static String defaultCurrency = dotenv.maybeGet('DEFAULT_CURRENCY') ?? "USD";
  static CountryCode defaultCountry =
      CountryCode.parseByIso(dotenv.maybeGet('DEFAULT_COUNTRY')) ?? CountryCode.parseByIso("US")!;
  static String defaultLanguage = dotenv.maybeGet('DEFAULT_LANGUAGE') ?? "en";
  static Place defaultLocation = Place(
    LatLng(
      double.parse(dotenv.maybeGet('DEFAULT_LATITUDE') ?? "37.3875"),
      double.parse(dotenv.maybeGet('DEFAULT_LONGITUDE') ?? "-122.0575"),
    ),
    "",
    "",
  );
  static final MeasurementSystem defaultMeasurementSystem =
      dotenv.get('DEFAULT_MEASUREMENT_SYSTEM', fallback: 'metric') == 'imperial'
          ? MeasurementSystem.imperial
          : MeasurementSystem.metric;
}
