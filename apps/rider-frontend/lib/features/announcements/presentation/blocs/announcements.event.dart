part of 'announcements.bloc.dart';

@freezed
class AnnouncementsEvent with _$AnnouncementsEvent {
  const factory AnnouncementsEvent.onStarted() = _OnStarted;
}
