import 'package:api_response/api_response.dart';
import 'package:auto_route/auto_route.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:ionicons/ionicons.dart';
import 'package:flutter_common/core/color_palette/color_palette.dart';
import 'package:driver_flutter/config/locator/locator.dart';
import 'package:driver_flutter/core/extensions/extensions.dart';
import 'package:flutter_common/core/presentation/buttons/app_primary_button.dart';
import 'package:flutter_common/core/presentation/responsive_dialog/app_responsive_dialog.dart';
import 'package:flutter_common/core/presentation/buttons/app_text_button.dart';
import 'package:driver_flutter/features/redeem_gift_card/presentation/blocs/redeem_gift_card.bloc.dart';
import 'package:driver_flutter/features/redeem_gift_card/presentation/dialogs/redeem_success_dialog.dart';

class RedeemGiftCardDialog extends StatefulWidget {
  const RedeemGiftCardDialog({super.key});

  @override
  State<RedeemGiftCardDialog> createState() => _RedeemGiftCardDialogState();
}

class _RedeemGiftCardDialogState extends State<RedeemGiftCardDialog> {
  final _formKey = GlobalKey<FormState>();

  @override
  void initState() {
    locator<RedeemGiftCardBloc>().onStarted();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    final bloc = locator<RedeemGiftCardBloc>();
    return BlocProvider.value(
      value: locator<RedeemGiftCardBloc>(),
      child: AppResponsiveDialog(
        type: context.responsive(
          DialogType.bottomSheet,
          xl: DialogType.dialog,
        ),
        onBackPressed: () => context.router.maybePop(),
        header: (
          Ionicons.gift,
          context.translate.redeemGiftCard,
          context.translate.redeemGiftCardDescription,
        ),
        primaryButton: AppPrimaryButton(
          onPressed: () {
            if (_formKey.currentState?.validate() ?? false) {
              bloc.onSubmitted();
            }
          },
          child: Text(context.translate.redeem),
        ),
        secondaryButton: AppTextButton(
          text: context.translate.cancel,
          onPressed: () {
            context.router.maybePop();
          },
        ),
        child: BlocConsumer<RedeemGiftCardBloc, RedeemGiftCardState>(
          listener: (context, state) {
            switch (state.redeemGiftCardState) {
              case ApiResponseLoaded(:final data):
                Navigator.of(context).pop();
                showDialog(
                  context: context,
                  useSafeArea: false,
                  builder: (context) => RedeemSuccessDialog(
                    amount: data.redeemGiftCard.amount,
                    currency: data.redeemGiftCard.currency,
                  ),
                );
                break;

              default:
                break;
            }
          },
          builder: (context, state) => Form(
            key: _formKey,
            child: Padding(
              padding: EdgeInsets.only(bottom: MediaQuery.viewInsetsOf(context).bottom),
              child: TextFormField(
                onChanged: bloc.onCodeChanged,
                validator: (value) => value?.isEmpty == true ? context.translate.pleaseEnterGiftCardCode : null,
                decoration: InputDecoration(
                  hintText: context.translate.enterGiftCardCode,
                  errorText: switch (state.redeemGiftCardState) {
                    ApiResponseError(:final message) => message,
                    _ => null
                  },
                  prefixIcon: Icon(
                    Ionicons.gift,
                    color: ColorPalette.primary30.withValues(alpha: 0.3),
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
