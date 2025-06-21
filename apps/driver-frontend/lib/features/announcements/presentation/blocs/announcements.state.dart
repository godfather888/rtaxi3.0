part of 'announcements.bloc.dart';

@freezed
sealed class AnnouncementsState with _$AnnouncementsState {
  const factory AnnouncementsState({
    @Default(ApiResponseInitial()) ApiResponse<Query$Announcements> announcementsState,
  }) = _AnnouncementsState;
}
