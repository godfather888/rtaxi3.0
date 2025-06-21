import 'package:driver_flutter/core/graphql/fragments/chat_message.fragment.graphql.dart';
import 'package:driver_flutter/core/graphql/schema.gql.dart';
import 'package:time/time.dart';

final mockChatMessage1 = Fragment$ChatMessage(
  id: '1',
  sentAt: 7.days.ago,
  requestId: '1',
  content: 'content',
  status: Enum$MessageStatus.Delivered,
  sentByDriver: true,
);

final mockChatMessage2 = Fragment$ChatMessage(
  id: '2',
  sentAt: 5.days.ago,
  requestId: '2',
  content: 'content',
  status: Enum$MessageStatus.Seen,
  sentByDriver: false,
);

final mockChatMessage3 = Fragment$ChatMessage(
  id: '3',
  sentAt: 3.days.ago,
  requestId: '3',
  content: 'content',
  status: Enum$MessageStatus.Sent,
  sentByDriver: true,
);

final mockChatMessage4 = Fragment$ChatMessage(
  id: '4',
  sentAt: 1.days.ago,
  requestId: '4',
  content: 'content',
  status: Enum$MessageStatus.Delivered,
  sentByDriver: false,
);

final mockChatMessages = [
  mockChatMessage1,
  mockChatMessage2,
  mockChatMessage3,
  mockChatMessage4,
];
