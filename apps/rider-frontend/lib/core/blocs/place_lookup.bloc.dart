import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:generic_map/generic_map.dart';
import 'package:injectable/injectable.dart';
import 'package:latlong2/latlong.dart';
import 'package:rider_flutter/core/datasources/geo_datasource.dart';
import 'package:rxdart/rxdart.dart';

part 'place_lookup.event.dart';
part 'place_lookup.state.dart';
part 'place_lookup.bloc.freezed.dart';

@lazySingleton
class PlaceLookupBloc extends Bloc<PlaceLookupEvent, PlaceLookupState> {
  final GeoDatasource geoDatasource;

  PlaceLookupBloc(this.geoDatasource) : super(const PlaceLookupState.initial()) {
    on<PlaceLookupEvent>(
      (event, emit) async {
        switch (event) {
          case PlaceLookupEvent$OnStarted():
            emit(const PlaceLookupState.initial());
            break;

          case PlaceLookupEvent$OnQueryChanged(
              :final query,
              :final latLng,
              :final radius,
              :final language,
              :final mapProvider,
            ):
            if (query?.isEmpty ?? true) {
              add(const PlaceLookupEvent.onStarted());
              return;
            }

            if (query!.length < 3) {
              emit(const PlaceLookupState.moreCharacters());
              return;
            }

            emit(const PlaceLookupState.loading());

            final result = await geoDatasource.getNearbyPlaces(
              query: query,
              latLng: latLng,
              radius: radius,
              language: language,
              mapProvider: mapProvider,
            );

            emit(
              await result.fold(
                (l) async => PlaceLookupState.error(l),
                (r) async => PlaceLookupState.loaded(places: r),
              ),
            );
            break;
        }
      },
      transformer: (events, mapper) {
        final debouncedEvents = events
            .where((event) => ((event is PlaceLookupEvent$OnQueryChanged && ((event).query?.length ?? 0) > 2)))
            .debounceTime(const Duration(milliseconds: 500));
        final notDebouncedEvents =
            events.where((event) => !(event is PlaceLookupEvent$OnQueryChanged && ((event).query?.length ?? 0) > 2));
        return MergeStream([debouncedEvents, notDebouncedEvents]).flatMap(mapper);
      },
    );
  }

  void onStarted() => add(const PlaceLookupEvent.onStarted());
}
