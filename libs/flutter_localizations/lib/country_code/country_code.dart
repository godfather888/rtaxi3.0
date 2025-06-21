import 'country_codes.dart';
import 'package:collection/collection.dart';

class CountryCode {
  /// The E.164 country code (e.g., "1" for the United States).
  final String e164CountryCode;

  /// The ISO 3166-1 alpha-2 country code (e.g., "US" for the United States).
  final String iso2CountryCode;

  /// The E.164 significant digits (e.g., the area code in the US).
  final int e164SignificantDigits;

  /// Indicates whether the country is geographically defined.
  final bool isGeographic;

  /// The level of the country code (e.g., 0 for a top-level country).
  final int level;

  /// The full name of the country (e.g., "United States").
  final String countryName;

  /// An example phone number for the country without the country code.
  final String examplePhoneNumber;

  /// The display name of the country (e.g., "United States (+1)").
  final String displayName;

  /// An example phone number with the plus sign and country code (e.g., "+15551234567").
  final String? fullExamplePhoneNumberWithPlusSign;

  /// The display name of the country without the E.164 country code (e.g., "United States").
  final String displayNameWithoutCountryCode;

  /// A unique key based on the E.164 country code (used for lookups).
  final String e164Key;

  CountryCode({
    required this.e164CountryCode,
    required this.iso2CountryCode,
    required this.e164SignificantDigits,
    required this.isGeographic,
    required this.level,
    required this.countryName,
    required this.examplePhoneNumber,
    required this.displayName,
    required this.fullExamplePhoneNumberWithPlusSign,
    required this.displayNameWithoutCountryCode,
    required this.e164Key,
  });

  factory CountryCode.fromJson(Map<String, dynamic> json) => CountryCode(
    e164CountryCode: json['e164CountryCode'] as String,
    iso2CountryCode: json['iso2CountryCode'] as String,
    e164SignificantDigits: json['e164SignificantDigits'] as int,
    isGeographic: json['isGeographic'] as bool,
    level: json['level'] as int,
    countryName: json['countryName'] as String,
    examplePhoneNumber: json['examplePhoneNumber'] as String,
    displayName: json['displayName'] as String,
    fullExamplePhoneNumberWithPlusSign:
        json['fullExamplePhoneNumberWithPlusSign'] as String?,
    displayNameWithoutCountryCode:
        json['displayNameWithoutCountryCode'] as String,
    e164Key: json['e164Key'] as String,
  );
  @override
  String toString() {
    return 'CountryCode{e164CountryCode: $e164CountryCode, iso2CountryCode: $iso2CountryCode, e164SignificantDigits: $e164SignificantDigits, isGeographic: $isGeographic, level: $level, countryName: $countryName, examplePhoneNumber: $examplePhoneNumber, displayName: $displayName, fullExamplePhoneNumberWithPlusSign: $fullExamplePhoneNumberWithPlusSign, displayNameWithoutCountryCode: $displayNameWithoutCountryCode, e164Key: $e164Key}';
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;

    return other is CountryCode &&
        other.e164CountryCode == e164CountryCode &&
        other.iso2CountryCode == iso2CountryCode &&
        other.e164SignificantDigits == e164SignificantDigits &&
        other.isGeographic == isGeographic &&
        other.level == level &&
        other.countryName == countryName &&
        other.examplePhoneNumber == examplePhoneNumber &&
        other.displayName == displayName &&
        other.fullExamplePhoneNumberWithPlusSign ==
            fullExamplePhoneNumberWithPlusSign &&
        other.displayNameWithoutCountryCode == displayNameWithoutCountryCode &&
        other.e164Key == e164Key;
  }

  @override
  int get hashCode {
    return e164CountryCode.hashCode ^
        iso2CountryCode.hashCode ^
        e164SignificantDigits.hashCode ^
        isGeographic.hashCode ^
        level.hashCode ^
        countryName.hashCode ^
        examplePhoneNumber.hashCode ^
        displayName.hashCode ^
        fullExamplePhoneNumberWithPlusSign.hashCode ^
        displayNameWithoutCountryCode.hashCode ^
        e164Key.hashCode;
  }

  Map<String, dynamic> toJson() => {
    'e164CountryCode': e164CountryCode,
    'iso2CountryCode': iso2CountryCode,
    'e164SignificantDigits': e164SignificantDigits,
    'isGeographic': isGeographic,
    'level': level,
    'countryName': countryName,
    'examplePhoneNumber': examplePhoneNumber,
    'displayName': displayName,
    'fullExamplePhoneNumberWithPlusSign': fullExamplePhoneNumberWithPlusSign,
    'displayNameWithoutCountryCode': displayNameWithoutCountryCode,
    'e164Key': e164Key,
  };

  static CountryCode? parseByIso(String? iso) {
    if (iso == null) return null;
    final result = countryCodes.firstWhereOrNull(
      (element) =>
          element['iso2CountryCode'].toString().toLowerCase() ==
          iso.toLowerCase(),
    );
    if (result == null) return null;

    return CountryCode.fromJson(result);
  }

  static List<CountryCode> getAll() =>
      countryCodes.map((e) => CountryCode.fromJson(e)).toList();

  String get image {
    return 'assets/countries/${this.iso2CountryCode.toLowerCase()}.svg.png';
  }
}

// Primitive parser for the country code
extension CountryCodeParser on (String, String?) {
  (CountryCode, String?) parse() {
    final countryCode = CountryCode.parseByIso(this.$1)!;
    return (countryCode, this.$2);
  }
}

extension StringToCountryCodeParser on (CountryCode, String?) {
  (String, String?) toPrimitive() {
    final countryCode = this.$1;
    return (countryCode.iso2CountryCode, this.$2);
  }
}
