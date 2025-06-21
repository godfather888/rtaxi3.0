import 'package:better_localization/country_code/country_code.dart';
import 'package:dartz/dartz.dart';
import 'package:driver_flutter/core/graphql/fragments/profile.fragment.graphql.dart';
import 'package:driver_flutter/core/graphql/fragments/wallet.extentions.dart';
import 'package:flutter_common/core/entities/wallet.dart';

extension ProfileX on Fragment$Profile {
  String get fullName => '$firstName $lastName';

  Option<Either<String, String>> get avatar {
    if (media != null) {
      return Some(Right(media!.address));
    } else {
      return const None();
    }
  }

  String get mobileNumberFormatted {
    if (countryIso?.isEmpty == false) {
      final country = CountryCode.parseByIso(countryIso!);
      final dialCode = country!.e164CountryCode;
      final mobile = (mobileNumber.startsWith(dialCode)) ? mobileNumber.substring(dialCode.length) : mobileNumber;
      return '+$dialCode $mobile';
    } else {
      return "+$mobileNumber";
    }
  }

  WalletEntity? get mainWallet {
    if (wallet.map((e) => e.toEntity).toList().isEmpty) {
      return null;
    } else {
      return wallet
          .map((e) => e.toEntity)
          .toList()
          .reduce((value, element) => value.balance > element.balance ? value : element);
    }
  }
}

extension ProfileFullX on Fragment$ProfileFull {
  String get fullName {
    final names = [firstName, lastName].where((e) => e?.isNotEmpty == true);
    return names.isNotEmpty ? names.join(' ') : 'N/A';
  }

  Option<Either<String, String>> get avatar {
    if (media != null) {
      return Some(Right(media!.address));
    } else {
      return const None();
    }
  }

  String get mobileNumberFormatted {
    if (countryIso?.isEmpty == false) {
      final country = CountryCode.parseByIso(countryIso!);
      final dialCode = country!.e164CountryCode;
      final mobile = (mobileNumber.startsWith(dialCode)) ? mobileNumber.substring(dialCode.length) : mobileNumber;
      return '+$dialCode $mobile';
    } else {
      return "+$mobileNumber";
    }
  }

  WalletEntity? get mainWallet {
    if (wallet.map((e) => e.toEntity).toList().isEmpty) {
      return null;
    } else {
      return wallet
          .map((e) => e.toEntity)
          .toList()
          .reduce((value, element) => value.balance > element.balance ? value : element);
    }
  }
}
