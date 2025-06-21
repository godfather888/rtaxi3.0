import 'package:flutter/widgets.dart';
import 'package:better_localization/l10n/messages.dart';

export 'l10n/messages.dart';
export 'language_model.dart';
export 'country_code/country_code.dart';

extension BuildContextLocalizations on BuildContext {
  S get tr => S.of(this);
}
