import 'package:flutter_common/features/chat/domain/entities/chat_message.dart';
import 'package:rider_flutter/core/graphql/fragments/chat_message.fragment.graphql.dart';

extension ChatMessageX on Fragment$ChatMessage {
  ChatMessageEntity get toEntity {
    return ChatMessageEntity(
      id: id,
      message: content,
      isSender: sentByDriver,
      createdAt: sentAt,
    );
  }
}
