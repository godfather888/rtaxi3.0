import 'package:api_response/api_response.dart';
import 'package:auto_route/auto_route.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_common/core/color_palette/color_palette.dart';
import 'package:flutter_common/core/presentation/responsive_dialog/app_top_bar.dart';
import 'package:flutter_common/core/theme/animation_duration.dart';
import 'package:ionicons/ionicons.dart';
import 'package:rider_flutter/config/locator/locator.dart';
import 'package:rider_flutter/core/extensions/extensions.dart';
import 'package:rider_flutter/features/profile/presentation/blocs/favorite_drivers.bloc.dart';
import 'package:rider_flutter/features/profile/presentation/components/favorite_driver_item.dart';
import 'package:rider_flutter/gen/assets.gen.dart';

@RoutePage()
class FavoriteDriversScreen extends StatefulWidget {
  const FavoriteDriversScreen({super.key});

  @override
  State<FavoriteDriversScreen> createState() => _FavoriteDriversScreenState();
}

class _FavoriteDriversScreenState extends State<FavoriteDriversScreen> {
  bool editMode = false;

  @override
  void initState() {
    locator<FavoriteDriversCubit>().fetchFavoriteDrivers();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return BlocProvider.value(
      value: locator<FavoriteDriversCubit>(),
      child: Container(
        color: ColorPalette.neutralVariant99,
        padding: context.responsive(
          const EdgeInsets.all(16),
          xl: const EdgeInsets.all(16).copyWith(top: 100),
        ),
        child: SafeArea(
            child: Column(
          children: [
            AppTopBar(
              title: context.translate.favoriteDrivers,
              trailing: CupertinoButton(
                padding: EdgeInsets.zero,
                onPressed: () => setState(
                  () => editMode = !editMode,
                ), minimumSize: Size(0, 0),
                child: const Icon(
                  Ionicons.create,
                  color: ColorPalette.neutral70,
                ),
              ),
            ),
            const SizedBox(height: 16),
            Expanded(
              child: BlocBuilder<FavoriteDriversCubit, FavoriteDriversState>(builder: (context, state) {
                return AnimatedSwitcher(
                  duration: AnimationDuration.pageStateTransitionMobile,
                  child: switch (state.favoriteDriversState) {
                    ApiResponseInitial() => const SizedBox(),
                    ApiResponseLoading() => Assets.lottie.loading.lottie(
                        width: double.infinity,
                        height: double.infinity,
                      ),
                    ApiResponseLoaded(:final data) => ListView.separated(
                        padding: EdgeInsets.zero,
                        itemCount: data.rider.favoriteDrivers.length,
                        itemBuilder: (context, index) {
                          return FavoriteDriverItem(
                            entity: data.rider.favoriteDrivers[index],
                            editMode: editMode,
                            onDeletePressed: () {
                              locator<FavoriteDriversCubit>().deleteFavoriteDriver(
                                data.rider.favoriteDrivers[index].id,
                              );
                            },
                          );
                        },
                        separatorBuilder: (context, index) => const SizedBox(height: 16),
                      ),
                    ApiResponseError(:final message) => Text(message),

                    // empty: (_) => EmptyListState(
                    //       imagePath: Assets.images.rideHistoryEmptyState.path,
                    //       title: context.translate.noFavoriteDrivers,
                    //       subTitle: context.translate.noFavoriteDriversDescription,
                    //     ),
                  },
                );
              }),
            )
          ],
        )),
      ),
    );
  }
}
