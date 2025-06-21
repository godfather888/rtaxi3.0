import 'package:api_response/api_response.dart';
import 'package:rider_flutter/core/graphql/documents/track_order.graphql.dart';
import 'package:rider_flutter/core/graphql/documents/wallet.graphql.dart';

abstract class TrackOrderRepository {
  Future<ApiResponse<Query$CancelReasons>> getCancelReasons();

  Future<ApiResponse<Mutation$SendSOS>> sendSOSSignal({
    required String orderId,
  });

  Future<ApiResponse<Query$PaymentMethods>> getPaymentMethods();
}
