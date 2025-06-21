import 'package:driver_flutter/core/graphql/fragments/chat_message.fragment.graphql.dart';
import 'package:flutter_common/features/chat/chat.dart';

extension ChatMessageX on Fragment$ChatMessage {
  ChatMessageEntity get toEntity {
    return ChatMessageEntity(
      id: id,
      message: content,
      createdAt: sentAt,
      isSender: sentByDriver,
    );
  }
}

extension ChatMessageListX on List<Fragment$ChatMessage> {
  List<ChatMessageEntity> get toEntity {
    return map(
      (e) => ChatMessageEntity(
        id: e.id,
        message: e.content,
        createdAt: e.sentAt,
        isSender: e.sentByDriver,
      ),
    ).toList();
  }
}
