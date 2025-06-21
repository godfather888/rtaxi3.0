import 'package:better_localization/country_code/country_code.dart';
import 'package:rider_flutter/core/graphql/fragments/profile.fragment.graphql.dart';
import 'package:flutter_common/gen/assets.gen.dart';

extension PaymentGatewayProdX on Fragment$Profile {
  String get fullName => [firstName, lastName].nonNulls.isNotEmpty ? [firstName, lastName].nonNulls.join(' ') : '-';

  String get mobileNumberFormatted {
    if (countryIso?.isEmpty == false) {
      final country = CountryCode.parseByIso(countryIso!)!;
      final dialCode = country.e164CountryCode;
      final number = (mobileNumber.startsWith(dialCode)) ? mobileNumber.substring(dialCode.length) : mobileNumber;
      return '+$dialCode $number';
    } else {
      return "+$mobileNumber";
    }
  }

  String? get avatar {
    if (media != null) {
      return media!.address;
    } else if (presetAvatarNumber != null) {
      return presetProfileImageAsset!.path;
    } else {
      return null;
    }
  }

  AssetGenImage? get presetProfileImageAsset {
    switch (presetAvatarNumber) {
      case (1):
        return Assets.avatars.a1;
      case (2):
        return Assets.avatars.a2;
      case (3):
        return Assets.avatars.a3;
      case (4):
        return Assets.avatars.a4;
      case (5):
        return Assets.avatars.a5;
      case (6):
        return Assets.avatars.a6;
      case (7):
        return Assets.avatars.a7;
      case (8):
        return Assets.avatars.a8;
      case (9):
        return Assets.avatars.a9;
      case (10):
        return Assets.avatars.a10;
      case (11):
        return Assets.avatars.a11;
      case (12):
        return Assets.avatars.a12;
      case (13):
        return Assets.avatars.a13;
      case (14):
        return Assets.avatars.a14;
      case (15):
        return Assets.avatars.a15;
      case (16):
        return Assets.avatars.a16;
      case (17):
        return Assets.avatars.a17;
      case (18):
        return Assets.avatars.a18;
      case (19):
        return Assets.avatars.a19;
      case (20):
        return Assets.avatars.a20;
      case (21):
        return Assets.avatars.a21;
      case (22):
        return Assets.avatars.a22;
      case (23):
        return Assets.avatars.a23;
      case (24):
        return Assets.avatars.a24;
      case (25):
        return Assets.avatars.a25;
      case (26):
        return Assets.avatars.a26;
      case (27):
        return Assets.avatars.a27;
      case (28):
        return Assets.avatars.a28;
      case (29):
        return Assets.avatars.a29;
      case (30):
        return Assets.avatars.a30;
      default:
        return null;
    }
  }
}
