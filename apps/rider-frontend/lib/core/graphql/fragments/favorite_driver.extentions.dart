import 'package:flutter/material.dart';
import 'package:rider_flutter/core/extensions/extensions.dart';
import 'package:rider_flutter/core/graphql/fragments/favorite_driver.fragment.graphql.dart';

extension CurrentOrderX on Fragment$FavoriteDriver {
  String get fullName => [firstName, lastName].nonNulls.isNotEmpty ? [firstName, lastName].nonNulls.join(' ') : '-';

  String ratingTitle(BuildContext context, int? ratingToShow) {
    final name = firstName ?? '';
    switch (ratingToShow) {
      case 1:
        return context.translate.oneStarReviewTitle(name);
      case 2:
        return context.translate.twoStarReviewTitle(name);
      case 3:
        return context.translate.threeStarReviewTitle(name);
      case 4:
        return context.translate.fourStarReviewTitle(name);
      case 5:
        return context.translate.fiveStarReviewTitle(name);
      default:
        return context.translate.howWasYourTrip;
    }
  }
}
