import 'package:better_localization/gen/assets.gen.dart';

class Language {
  final AssetGenImage image;
  final String name;
  final String code;

  Language({
    required this.image,
    required this.name,
    required this.code,
  });
}

extension LanguageListX on List<Language> {
  Language getLanguageByCode(String code) {
    return firstWhere((element) => element.code == code);
  }
}

List<Language> supportedLanguages = [
  Language(
    image: LocaleAssets.countries.usSvg,
    name: 'English',
    code: 'en',
  ),
  Language(
    image: LocaleAssets.countries.deSvg,
    name: 'German',
    code: 'de',
  ),
  Language(
    image: LocaleAssets.countries.frSvg,
    name: 'French',
    code: 'fr',
  ),
  Language(
    image: LocaleAssets.countries.esSvg,
    name: 'Spanish',
    code: 'es',
  ),
  Language(
    image: LocaleAssets.countries.itSvg,
    name: 'Italian',
    code: 'it',
  ),
  Language(
    image: LocaleAssets.countries.arSvg,
    name: 'Arabic',
    code: 'ar',
  ),
  Language(
    image: LocaleAssets.countries.krSvg,
    name: 'Korean',
    code: 'ko',
  ),
  Language(
    image: LocaleAssets.countries.cnSvg,
    name: 'Chinese',
    code: 'zh',
  ),
  Language(
    image: LocaleAssets.countries.ruSvg,
    name: 'Russian',
    code: 'ru',
  ),
  Language(
    image: LocaleAssets.countries.trSvg,
    name: 'Turkish',
    code: 'tr',
  ),
  Language(
    image: LocaleAssets.countries.inSvg,
    name: 'India',
    code: 'hi',
  ),
  Language(
    image: LocaleAssets.countries.nlSvg,
    name: 'Dutch',
    code: 'nl',
  ),
  Language(
    image: LocaleAssets.countries.ptSvg,
    name: 'Portuguese',
    code: 'pt',
  ),
  Language(
    image: LocaleAssets.countries.idSvg,
    name: 'Indonesian',
    code: 'id',
  ),
  Language(
    image: LocaleAssets.countries.thSvg,
    name: 'Thai',
    code: 'th',
  ),
  Language(
    image: LocaleAssets.countries.vnSvg,
    name: 'Vietnamese',
    code: 'vi',
  ),
  Language(
    image: LocaleAssets.countries.plSvg,
    name: 'Polish',
    code: 'pl',
  ),
  Language(
    image: LocaleAssets.countries.fiSvg,
    name: 'Finnish',
    code: 'fi',
  ),
  Language(
    image: LocaleAssets.countries.noSvg,
    name: 'Norwegian',
    code: 'no',
  ),
  Language(
    image: LocaleAssets.countries.seSvg,
    name: 'Swedish',
    code: 'sv',
  ),
  Language(
    image: LocaleAssets.countries.amSvg,
    name: 'Armenian',
    code: 'hy',
  ),
  Language(
    image: LocaleAssets.countries.jpSvg,
    name: 'Japanese',
    code: 'ja',
  ),
  Language(
    image: LocaleAssets.countries.roSvg,
    name: 'Romanian',
    code: 'ro',
  ),
  Language(
    image: LocaleAssets.countries.mySvg,
    name: 'Malay',
    code: 'ms',
  ),
  Language(
    image: LocaleAssets.countries.irSvg,
    name: 'Persian',
    code: 'fa',
  ),
  Language(
    image: LocaleAssets.countries.uaSvg,
    name: 'Ukrainian',
    code: 'uk',
  ),
];
