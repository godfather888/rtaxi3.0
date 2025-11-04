part of 'settings.dart';

@freezed
sealed class SettingsState with _$SettingsState {
  const factory SettingsState({
    required String locale,
    required MapProviderEnum mapProvider,
  }) = _SettingsState;

  factory SettingsState.initial() => const SettingsState(
        locale: 'ru',
        mapProvider: Constants.defaultMapProvider,
      );

  factory SettingsState.fromJson(Map<String, dynamic> json) => _$SettingsStateFromJson(json);

  const SettingsState._();
}
