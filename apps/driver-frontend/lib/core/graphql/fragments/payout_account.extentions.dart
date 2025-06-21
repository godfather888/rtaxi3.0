import 'package:driver_flutter/core/graphql/fragments/payout_account.fragment.graphql.dart';
import 'package:driver_flutter/gen/assets.gen.dart';
import 'package:flutter_common/features/wallet/presentation/components/saved_card.dart';

extension PayoutAccountX on Fragment$PayoutAccount {
  SavedCard toSavedCard({
    required Function(bool)? onDefaultChanged,
    required Function()? onDeletePressed,
  }) {
    return SavedCard(
      bankName: bankName ?? "-",
      accountNumber: accountNumber ?? "-",
      accountHolderName: accountHolderName ?? "-",
      cardImage: Assets.images.cardBackground2.provider(),
      icon: null,
      markAsDefaultPressed: onDefaultChanged,
      deletePressed: onDeletePressed,
      isDefault: isDefault,
    );
  }
}
