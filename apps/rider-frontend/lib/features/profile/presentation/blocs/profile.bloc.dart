import 'package:api_response/api_response.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:injectable/injectable.dart';
import 'package:rider_flutter/core/graphql/documents/profile.graphql.dart';
import '../../domain/repositories/profile_repository.dart';

part 'profile.state.dart';
part 'profile.bloc.freezed.dart';

@lazySingleton
class ProfileBloc extends Cubit<ProfileState> {
  final ProfileRepository _repository;
  ProfileBloc(this._repository) : super(const ProfileState());

  void fetchProfileAggregationsInfo() async {
    emit(
      state.copyWith(
        profileAggregationsState: ApiResponse.loading(),
      ),
    );

    final profileAggregationsInfoResponse = await _repository.getProfileAggregationsInfo();

    emit(
      state.copyWith(
        profileAggregationsState: profileAggregationsInfoResponse,
      ),
    );
  }
}
