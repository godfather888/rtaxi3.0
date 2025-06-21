import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:ionicons/ionicons.dart';
import 'package:rider_flutter/config/locator/locator.dart';
import 'package:rider_flutter/core/blocs/home.bloc.dart';
import 'package:rider_flutter/core/extensions/extensions.dart';
import 'package:flutter_common/core/presentation/buttons/app_back_button.dart';
import 'package:flutter_common/core/presentation/buttons/app_icon_button.dart';
import 'package:rider_flutter/core/graphql/fragments/favorite_driver.extentions.dart';

import 'package:url_launcher/url_launcher_string.dart';

import 'package:flutter_common/features/chat/chat.dart';

class ChatSheet extends StatefulWidget {
  const ChatSheet({
    super.key,
  });

  @override
  State<ChatSheet> createState() => _ChatSheetState();
}

class _ChatSheetState extends State<ChatSheet> {
  String? message;
  TextEditingController textEditingController = TextEditingController();
  ScrollController scrollController = ScrollController();

  @override
  Widget build(BuildContext context) {
    return BlocConsumer<HomeBloc, HomeState>(
      listener: (context, state) {
        Future.delayed(const Duration(milliseconds: 300), () {
          if (!mounted) return;
          scrollController.animateTo(
            scrollController.position.maxScrollExtent,
            duration: const Duration(milliseconds: 300),
            curve: Curves.easeOut,
          );
        });
      },
      builder: (context, state) {
        return Container(
          padding: const EdgeInsets.all(16),
          color: context.theme.scaffoldBackgroundColor,
          child: SafeArea(
            child: Column(children: [
              Row(
                children: [
                  AppBackButton(
                    onPressed: () {
                      locator<HomeBloc>().add(HomeEvent.changeTrackOrderPage(page: TrackOrderPage.overview));
                    },
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: Text(
                      state.activeOrder?.order.driver?.fullName ?? '',
                      style: context.titleMedium,
                    ),
                  ),
                  AppIconButton(
                    icon: Ionicons.call,
                    onPressed: () {
                      launchUrlString("tel://+${state.activeOrder?.order.driver?.mobileNumber}");
                    },
                  ),
                ],
              ),
              const SizedBox(height: 16),
              Expanded(
                child: ListView.builder(
                  controller: scrollController,
                  itemBuilder: (context, index) {
                    final item = state.activeOrder!.order.conversation[index];
                    if (!item.sentByDriver) {
                      return ChatItemMe(
                        message: item.content,
                        dateTime: item.sentAt,
                      );
                    } else {
                      return ChatItemOtherPerson(
                        message: item.content,
                        dateTime: item.sentAt,
                      );
                    }
                  },
                  itemCount: state.activeOrder?.order.conversation.length ?? 0,
                ),
              ),
              Row(
                children: [
                  Expanded(
                    child: TextField(
                      controller: textEditingController,
                      onChanged: (value) => setState(() => message = value),
                      decoration: InputDecoration(
                        isDense: true,
                        hintText: context.translate.typeAMessage,
                        border: InputBorder.none,
                      ),
                    ),
                  ),
                  const SizedBox(width: 16),
                  AppIconButton(
                    icon: Ionicons.send,
                    onPressed: message == null
                        ? null
                        : () async {
                            locator<HomeBloc>().add(HomeEvent.onChatMessageSent(
                              message: message!,
                            ));
                            textEditingController.clear();
                            setState(() => message = null);
                          },
                  ),
                ],
              )
            ]),
          ),
        );
      },
    );
  }
}
