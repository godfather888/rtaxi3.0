import 'package:better_localization/country_code/country_code.dart';
import 'package:flutter_common/gen/assets.gen.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:generic_map/interfaces/place.dart';
import 'package:latlong2/latlong.dart';

class Env {
  static final String serverUrl = dotenv.maybeGet('BASE_URL') ?? "https://demo.ridy.io/rider-api/";
  static final String gqlEndpoint = '${serverUrl}graphql';
  static bool isDemoMode = dotenv.maybeGet('DEMO_MODE') == 'true';
  static String appName = dotenv.maybeGet('APP_NAME') ?? "Ridy";
  static String companyName = dotenv.maybeGet('COMPANY_NAME') ?? "BetterSuite";
  static String firebaseMessagingVapidKey = dotenv.maybeGet('FIREBASE_MESSAGING_VAPID_KEY') ?? "";
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
  static int placeSearchSearchRadius = 100000;
  static double desktopNavigationBarHeight = 96;
  static String defaultAvatar = dotenv.maybeGet('DEFAULT_AVATAR') ?? Assets.avatars.a1.path;
}
