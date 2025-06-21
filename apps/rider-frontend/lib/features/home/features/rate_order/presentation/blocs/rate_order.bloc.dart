import 'package:api_response/api_response.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:injectable/injectable.dart';
import 'package:rider_flutter/core/graphql/fragments/review_parameter.fragment.graphql.dart';
import 'package:rider_flutter/core/repositories/order_repository.dart';
import '../../domain/repositories/rate_order_repository.dart';

part 'rate_order.event.dart';
part 'rate_order.state.dart';
part 'rate_order.bloc.freezed.dart';

@lazySingleton
class RateOrderBloc extends Bloc<RateOrderEvent, RateOrderState> {
  final RateOrderRepository repository;
  final OrderRepository orderRepository;

  RateOrderBloc(this.repository, this.orderRepository) : super(const RateOrderState.initial()) {
    on<RateOrderEvent>((event, emit) async {
      switch (event) {
        case RateOrderEvent$OnStarted():
          emit(const RateOrderState.loading());
          final reviewParametersResponse = await repository.getReviewParameters();
          switch (reviewParametersResponse) {
            case ApiResponseLoaded(:final data):
              emit(RateOrderState.parametersLoaded(
                strengthParameters: data.feedbackParameters.where((e) => e.isGood).toList(),
                weaknessParameters: data.feedbackParameters.where((e) => !e.isGood).toList(),
              ));
              break;
            case ApiResponseError(:final message):
              emit(RateOrderState.error(message: message));
              break;
            default:
              break;
          }
          break;

        case RateOrderEvent$OnParameterTapped(:final parameter):
          final currentState = state;
          if (currentState is RateOrderState$ParametersLoaded) {
            List<Fragment$ReviewParameter> selectedParameters;
            if (currentState.selectedParameters.contains(parameter)) {
              selectedParameters = currentState.selectedParameters.where((e) => e.id != parameter.id).toList();
            } else {
              selectedParameters = [...currentState.selectedParameters, parameter];
            }
            emit(currentState.copyWith(selectedParameters: selectedParameters));
          }
          break;

        case RateOrderEvent$OnReviewSubmitted(
            :final orderId,
            :final rating,
            :final comment,
            :final parameters,
            :final isFavorite
          ):
          emit(const RateOrderState.loading());
          final submitReviewResponse = await orderRepository.submitReview(
            orderId: orderId,
            rating: rating,
            comment: comment,
            reviewParameters: parameters.map((e) => int.parse(e.id)).toList(),
            isFavorite: isFavorite,
          );
          switch (submitReviewResponse) {
            case ApiResponseLoaded():
              emit(const RateOrderState.reviewSubmitted());
              break;
            case ApiResponseError(:final message):
              emit(RateOrderState.error(message: message));
              break;
            default:
              break;
          }
          break;

        case RateOrderEvent$SkipReview(:final orderId):
          emit(const RateOrderState.loading());
          final skipReviewResponse = await orderRepository.skipReview(orderId: orderId);
          switch (skipReviewResponse) {
            case ApiResponseLoaded():
              emit(const RateOrderState.reviewSubmitted());
              break;
            case ApiResponseError(:final message):
              emit(RateOrderState.error(message: message));
              break;
            default:
              break;
          }
          break;
      }
    });
  }

  void onStarted() => add(const RateOrderEvent.onStarted());

  void onParameterTapped(Fragment$ReviewParameter parameter) =>
      add(RateOrderEvent.onParameterTapped(parameter: parameter));

  void onReviewSubmitted({
    required String orderId,
    required int rating,
    required List<Fragment$ReviewParameter> parameters,
    required String? comment,
    required bool isFavorite,
  }) =>
      add(
        RateOrderEvent.onReviewSubmitted(
          orderId: orderId,
          rating: rating,
          comment: comment,
          parameters: parameters,
          isFavorite: rating > 4 ? isFavorite : false,
        ),
      );

  void skipReview({required String orderId}) => add(RateOrderEvent.skipReview(orderId: orderId));
}
