import 'package:api_response/api_response.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:generic_map/interfaces/place.dart';
import 'package:injectable/injectable.dart';
import 'package:rider_flutter/core/datasources/geo_datasource.dart';

part 'place_confirm.state.dart';
part 'place_confirm.bloc.freezed.dart';

@lazySingleton
class PlaceConfirmCubit extends Cubit<PlaceConfirmState> {
  final GeoDatasource geoDatasource;

  PlaceConfirmCubit(this.geoDatasource) : super(const PlaceConfirmState());

  void onLoaded({required Place place}) {
    emit(state.copyWith(place: ApiResponse.loaded(place)));
  }

  void onLoading() => emit(state.copyWith(place: ApiResponseLoading()));
}
