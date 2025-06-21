part of 'auth_bloc.dart';

@freezed
sealed class AuthState with _$AuthState {
  const factory AuthState.authenticated({
    required String jwtToken,
    required Fragment$ProfileFull profile,
  }) = AuthState$Authenticated;

  const factory AuthState.unauthenticated() = AuthState$Unauthenticated;

  const factory AuthState.error({
    required String message,
  }) = AuthState$Error;

  factory AuthState.fromJson(Map<String, dynamic> json) => _$AuthStateFromJson(json);

  const AuthState._();

  bool get isAuthenticated => this is AuthState$Authenticated;
  String? get jwtToken => authenticatedState?.jwtToken;

  AuthState$Authenticated? get authenticatedState => switch (this) {
        AuthState$Authenticated() => this as AuthState$Authenticated,
        _ => null,
      };

  Fragment$ProfileFull? get profile => authenticatedState?.profile;
  String? get avatar => profile?.address;
}
