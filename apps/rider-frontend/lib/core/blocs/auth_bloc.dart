import 'package:api_response/api_response.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:hydrated_bloc/hydrated_bloc.dart';
import 'package:injectable/injectable.dart';
import 'package:rider_flutter/core/graphql/fragments/profile.extentions.dart';
import 'package:rider_flutter/core/graphql/fragments/profile.fragment.graphql.dart';
import '../repositories/profile_repository.dart';

part 'auth_bloc.state.dart';
part 'auth_bloc.freezed.dart';
part 'auth_bloc.g.dart';

@lazySingleton
class AuthBloc extends HydratedCubit<AuthState> {
  final ProfileRepository profileRepository;

  AuthBloc(this.profileRepository) : super(const AuthState.unauthenticated());

  @override
  AuthState? fromJson(Map<String, dynamic> json) => AuthState.fromJson(json);

  @override
  Map<String, dynamic>? toJson(AuthState state) => state.toJson();

  void onLoggedIn({
    required String jwtToken,
    required profile,
  }) {
    emit(
      AuthState.authenticated(
        jwtToken: jwtToken,
        profile: profile,
      ),
    );
  }

  void profileUpdated(Fragment$Profile profile) {
    emit(
      switch (state) {
        AuthState$Authenticated(:final jwtToken) => AuthState.authenticated(
            jwtToken: jwtToken,
            profile: profile,
          ),
        AuthState$Unauthenticated() => throw Exception('Unauthenticated user'),
      },
    );
  }

  Future<void> requestUserInfo() async {
    if (state is! AuthState$Authenticated) return;

    final profile = await profileRepository.getProfile();

    emit(
      switch (profile) {
        ApiResponseLoaded(:final data) => AuthState.authenticated(
            jwtToken: (state as AuthState$Authenticated).jwtToken,
            profile: data,
          ),
        ApiResponseError(:final message) =>
          message == 'GqlAuthGuard' ? const AuthState.unauthenticated() : throw Exception("Couldn't retrieve user info"),
        _ => state,
      },
    );
  }

  void onLoggedOut() async {
    emit(const AuthState.unauthenticated());
    // Принудительно очищаем сохраненное состояние при выходе
    await HydratedBloc.storage.delete(storageToken);
  }
}
