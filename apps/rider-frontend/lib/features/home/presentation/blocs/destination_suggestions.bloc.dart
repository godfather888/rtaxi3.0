import 'package:api_response/api_response.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:generic_map/interfaces/place.dart';
import 'package:injectable/injectable.dart';
import 'package:latlong2/latlong.dart';
import 'package:rider_flutter/core/graphql/documents/home.graphql.dart';
import 'package:rider_flutter/core/graphql/fragments/favorite_location.graphql.dart';
import 'package:rider_flutter/features/home/features/welcome/domain/repositories/new_order_repository.dart';

part 'destination_suggestions.state.dart';
part 'destination_suggestions.bloc.freezed.dart';

@lazySingleton
class DestinationSuggestionsCubit extends Cubit<DestinationSuggestionsState> {
  final NewOrderRepository repository;

  DestinationSuggestionsCubit(this.repository) : super(const DestinationSuggestionsState());

  void onStarted() async {
    emit(
      state.copyWith(
        destinationSuggesionsState: ApiResponse.loading(),
      ),
    );

    final destinationSuggestionsResponse = await repository.getDestinationSuggestions();

    emit(
      state.copyWith(
        destinationSuggesionsState: destinationSuggestionsResponse,
      ),
    );
  }
}
