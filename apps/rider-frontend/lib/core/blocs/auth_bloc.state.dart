part of 'auth_bloc.dart';

@freezed
sealed class AuthState with _$AuthState {
  const factory AuthState.authenticated({
    required String jwtToken,
    required Fragment$Profile profile,
  }) = AuthState$Authenticated;

  const factory AuthState.unauthenticated() = AuthState$Unauthenticated;

  factory AuthState.fromJson(Map<String, dynamic> json) => _$AuthStateFromJson(json);
}

extension AuthStateX on AuthState {
  bool get isAuthenticated => this is AuthState$Authenticated;
  String? get jwtToken => isAuthenticated ? (this as AuthState$Authenticated).jwtToken : null;

  String get fullName => switch (this) {
        AuthState$Authenticated(:final profile) => profile.fullName,
        AuthState$Unauthenticated() => '',
      };

  Fragment$Profile? get profile => switch (this) {
        AuthState$Authenticated(:final profile) => profile,
        AuthState$Unauthenticated() => null,
      };

  String? get avatar => switch (this) {
        AuthState$Authenticated(:final profile) => profile.avatar,
        AuthState$Unauthenticated() => null,
      };
}
