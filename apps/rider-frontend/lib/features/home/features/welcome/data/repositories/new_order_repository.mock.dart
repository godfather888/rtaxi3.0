import 'package:api_response/api_response.dart';
import 'package:rider_flutter/core/graphql/documents/home.graphql.dart';
import 'package:rider_flutter/core/graphql/fragments/favorite_location.mock.dart';
import 'package:rider_flutter/core/graphql/fragments/point.mock.dart';
import '../../../welcome/domain/repositories/new_order_repository.dart';
import 'package:injectable/injectable.dart';

@dev
@LazySingleton(as: NewOrderRepository)
class NewOrderRepositoryMock implements NewOrderRepository {
  @override
  Future<ApiResponse<Query$DestinationSuggesions>> getDestinationSuggestions() async {
    return ApiResponse.loaded(
      Query$DestinationSuggesions(
        riderAddresses: mockFavoriteLocations,
        orders: Query$DestinationSuggesions$orders(edges: [
          Query$DestinationSuggesions$orders$edges(
            node: Query$DestinationSuggesions$orders$edges$node(
              addresses: [
                mockAddress1,
                mockAddress2,
                mockAddress3,
                mockAddress4,
              ],
              points: [
                Query$DestinationSuggesions$orders$edges$node$points(
                  lat: mockPoint1.lat,
                  lng: mockPoint2.lng,
                ),
                Query$DestinationSuggesions$orders$edges$node$points(
                  lat: mockPoint3.lat,
                  lng: mockPoint4.lng,
                ),
              ],
            ),
          ),
        ]),
      ),
    );
  }
}
