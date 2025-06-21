part of 'profile.bloc.dart';

@freezed
sealed class ProfileState with _$ProfileState {
  const factory ProfileState({
    String? code,
    @Default(ApiResponseInitial()) ApiResponse<Query$ProfileAggregations> profileAggregationsState,
  }) = _ProfileState;
}
