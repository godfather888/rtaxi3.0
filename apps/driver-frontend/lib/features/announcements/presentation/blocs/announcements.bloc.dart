import 'package:api_response/api_response.dart';
import 'package:driver_flutter/core/graphql/documents/announcements.graphql.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:injectable/injectable.dart';

import '../../domain/repositories/announcements_repository.dart';

part 'announcements.event.dart';
part 'announcements.state.dart';
part 'announcements.bloc.freezed.dart';

@lazySingleton
class AnnouncementsBloc extends Cubit<AnnouncementsState> {
  final AnnouncementsRepository _repository;

  AnnouncementsBloc(this._repository) : super(const AnnouncementsState());

  void fetchAnnouncements() async {
    emit(
      state.copyWith(
        announcementsState: ApiResponse.loading(),
      ),
    );
    final announcementsResponse = await _repository.getAnnouncements();
    emit(
      state.copyWith(
        announcementsState: announcementsResponse,
      ),
    );
  }
}
