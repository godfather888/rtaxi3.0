import 'package:driver_flutter/core/graphql/fragments/current_order.extentions.dart';
import 'package:driver_flutter/features/home/domain/repositories/home_repository.dart';
import 'package:driver_flutter/features/home/presentation/blocs/home.bloc.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_common/core/presentation/empty_list_state.dart';
import 'package:flutter_common/core/presentation/snackbar/snackbar.dart';
import 'package:ionicons/ionicons.dart';
import 'package:driver_flutter/config/locator/locator.dart';

import 'package:driver_flutter/core/extensions/extensions.dart';
import 'package:flutter_common/core/presentation/buttons/app_back_button.dart';
import 'package:flutter_common/core/presentation/buttons/app_icon_button.dart';

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
        final order = state.currentOrder;
        if (order == null) {
          return EmptyListState(title: context.translate.notFound);
        }
        return Container(
          padding: const EdgeInsets.all(16),
          color: context.theme.scaffoldBackgroundColor,
          child: SafeArea(
            child: Column(children: [
              Row(
                children: [
                  AppBackButton(
                    onPressed: () => locator<HomeBloc>().add(const HomeEvent.onHideChat()),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: Text(
                      order.riderFullName,
                      style: context.titleMedium,
                    ),
                  ),
                  AppIconButton(
                    icon: Ionicons.call,
                    onPressed: () {
                      launchUrlString("tel://+${order.rider?.mobileNumber}");
                    },
                  ),
                ],
              ),
              const SizedBox(height: 16),
              Expanded(
                child: ListView.builder(
                  controller: scrollController,
                  itemBuilder: (context, index) {
                    final item = order.conversation[index];
                    if (item.sentByDriver) {
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
                  itemCount: order.conversation.length,
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
                            final messageResult = await locator<HomeRepository>().sendMessage(
                              orderId: order.id,
                              message: message!,
                            );
                            messageResult.fold(
                              (l) => context.showSnackBar(message: l),
                              (r) {
                                textEditingController.clear();
                                setState(() => message = null);
                              },
                            );
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
