import 'package:api_response/api_response.dart';
import 'package:auto_route/auto_route.dart';
import 'package:better_localization/country_code/country_code.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_common/config/constants.dart';
import 'package:flutter_common/features/country_code_dialog/presentation/widgets/app_phone_number_textfield.dart';
import 'package:generic_map/interfaces/place.dart';
import 'package:ionicons/ionicons.dart';
import 'package:flutter_common/core/color_palette/color_palette.dart';
import 'package:latlong2/latlong.dart';
import 'package:rider_flutter/config/locator/locator.dart';
import 'package:rider_flutter/core/enums/address_type.dart';
import 'package:rider_flutter/core/extensions/extensions.dart';
import 'package:flutter_common/core/presentation/buttons/app_primary_button.dart';
import 'package:flutter_common/core/presentation/responsive_dialog/app_top_bar.dart';
import 'package:rider_flutter/core/graphql/fragments/favorite_location.graphql.dart';
import 'package:rider_flutter/core/graphql/schema.gql.dart';
import 'package:rider_flutter/features/favorite_locations/presentation/blocs/favorite_locations.bloc.dart';
import 'package:rider_flutter/features/favorite_locations/presentation/components/select_place_form_field.dart';
import 'package:rider_flutter/features/home/presentation/blocs/destination_suggestions.bloc.dart';

import '../../models/update_favorite_location_input.dart';
import '../blocs/favorite_location_desktop_map.bloc.dart';
import '../blocs/edit_favorite_location.bloc.dart';

@RoutePage()
class EditFavoriteLocationScreen extends StatefulWidget {
  final Fragment$FavoriteLocation entity;

  const EditFavoriteLocationScreen({
    super.key,
    required this.entity,
  });

  @override
  State<EditFavoriteLocationScreen> createState() => _EditFavoriteLocationScreenState();
}

class _EditFavoriteLocationScreenState extends State<EditFavoriteLocationScreen> {
  GlobalKey<FormState> formKey = GlobalKey<FormState>();

  @override
  void initState() {
    locator<FavoriteLocationsDesktopMapCubit>().viewOne(
      name: widget.entity.title,
      location: Place(
        LatLng(
          widget.entity.location.lat,
          widget.entity.location.lng,
        ),
        widget.entity.details,
        null,
      ),
    );
    locator<EditFavoriteLocationCubit>().init(
      addressType: widget.entity.type,
      addressName: widget.entity.title,
      selectedLocation: Place(
        LatLng(
          widget.entity.location.lat,
          widget.entity.location.lng,
        ),
        widget.entity.details,
        null,
      ),
      addressPhone: (
        CountryCode.parseByIso(widget.entity.phoneNumber.countryCode) ?? Constants.defaultCountry,
        widget.entity.phoneNumber.number,
      ),
    );
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    final editBloc = locator<EditFavoriteLocationCubit>();
    return BlocProvider.value(
      value: locator<EditFavoriteLocationCubit>(),
      child: Container(
        clipBehavior: Clip.none,
        padding: context.responsive(
          const EdgeInsets.all(16),
          xl: const EdgeInsets.all(24),
        ),
        color: context.theme.scaffoldBackgroundColor,
        child: SafeArea(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              AppTopBar(
                title: context.translate.createAFavoriteLocation,
                trailing: CupertinoButton(
                  padding: EdgeInsets.zero,
                  onPressed: () {
                    locator<EditFavoriteLocationCubit>().delete(widget.entity.id);
                  },
                  minimumSize: Size(0, 0),
                  child: const Icon(
                    Ionicons.trash,
                    color: ColorPalette.error40,
                  ),
                ),
              ),
              const SizedBox(
                height: 24,
              ),
              Expanded(
                child: BlocConsumer<EditFavoriteLocationCubit, EditFavoriteLocationState>(
                  listener: (context, state) {
                    switch (state.updateFavoriteLocationState) {
                      case ApiResponseLoaded():
                        locator<FavoriteLocationsCubit>().onStarted();
                        locator<DestinationSuggestionsCubit>().onStarted();
                        context.router.maybePop();
                      case ApiResponseError(:final message):
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(
                            content: Text(message),
                          ),
                        );
                      case _:
                    }
                  },
                  builder: (context, state) {
                    return Form(
                      key: formKey,
                      child: Column(
                        children: [
                          DropdownButtonFormField(
                            value: state.addressType,
                            items: Enum$RiderAddressType.values
                                .where((e) => e != Enum$RiderAddressType.$unknown)
                                .map(
                                  (e) => DropdownMenuItem(
                                    value: e,
                                    child: Text(
                                      e.name(context),
                                    ),
                                  ),
                                )
                                .toList(),
                            style: context.labelLarge,
                            focusColor: Colors.transparent,
                            icon: const Icon(Ionicons.chevron_forward),
                            elevation: 1,
                            decoration: const InputDecoration(
                              isDense: true,
                              prefixIcon: Icon(
                                Ionicons.list,
                                color: ColorPalette.neutral50,
                              ),
                            ),
                            onChanged: editBloc.updateAddressType,
                            onSaved: editBloc.updateAddressType,
                          ),
                          const SizedBox(
                            height: 16,
                          ),
                          TextFormField(
                            initialValue: state.addressName,
                            onSaved: editBloc.updateAddressName,
                            validator: (value) => (value?.isEmpty ?? true) ? context.translate.fieldIsRequired : null,
                            decoration: InputDecoration(
                              labelText: context.translate.addressTitleLabel,
                              isDense: true,
                            ),
                          ),
                          const SizedBox(
                            height: 16,
                          ),
                          AppPhoneNumberTextField(
                            initalValue: (Constants.defaultCountry, null),
                            validator: (value) =>
                                (value?.$2?.isEmpty ?? true) ? context.translate.fieldIsRequired : null,
                            onChanged: editBloc.updateAddressPhone,
                          ),
                          const SizedBox(
                            height: 32,
                          ),
                          SelectPlaceFormField(
                            onSaved: editBloc.updateSelectedLocation,
                            initialValue: state.selectedLocation,
                            onChanged: editBloc.updateSelectedLocation,
                            markerTitle: state.addressName ?? "",
                          ),
                        ],
                      ),
                    );
                  },
                ),
              ),
              BlocBuilder<EditFavoriteLocationCubit, EditFavoriteLocationState>(
                builder: (context, state) {
                  return AppPrimaryButton(
                    isDisabled: state.updateFavoriteLocationState.isLoading,
                    onPressed: () {
                      if (formKey.currentState!.validate()) {
                        formKey.currentState!.save();
                        locator<EditFavoriteLocationCubit>().save(
                          id: widget.entity.id,
                          input: UpdateFavoriteLocationInput(
                            name: state.addressName!,
                            type: state.addressType!,
                            place: state.selectedLocation!,
                            phone: state.addressPhone,
                          ),
                        );
                      }
                    },
                    child: Text(context.translate.saveChanges),
                  );
                },
              )
            ],
          ),
        ),
      ),
    );
  }
}
