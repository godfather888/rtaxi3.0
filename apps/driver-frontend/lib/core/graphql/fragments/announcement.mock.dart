import 'package:driver_flutter/core/graphql/fragments/announcement.fragment.graphql.dart';
import 'package:driver_flutter/core/graphql/schema.gql.dart';
import 'package:time/time.dart';

final mockAnnouncement1 = Fragment$Announcement(
  id: '1',
  userType: [Enum$AnnouncementUserType.Driver],
  title: 'New Payment System Available',
  description: 'You can now receive your earnings through our new payment gateway.',
  startAt: 2.days.ago,
  expireAt: 5.days.fromNow,
  url: 'https://example.com/new-payment-system',
);

final mockAnnouncement2 = Fragment$Announcement(
  id: '2',
  userType: [Enum$AnnouncementUserType.Operator],
  title: 'App Update Released',
  description: 'Download the latest version of the app from the store for new features and bug fixes.',
  startAt: 1.days.ago,
  expireAt: 7.days.fromNow,
  url: 'https://example.com/app-update',
);

final mockAnnouncement3 = Fragment$Announcement(
  id: '3',
  userType: [Enum$AnnouncementUserType.Rider],
  title: 'Weekly Bonus Program',
  description: 'Complete 50 rides this week to earn a \$100 bonus.',
  startAt: DateTime.now(),
  expireAt: 6.days.fromNow,
  url: 'https://example.com/weekly-bonus',
);

final mockAnnouncement4 = Fragment$Announcement(
  id: '4',
  userType: [Enum$AnnouncementUserType.Driver],
  title: 'Service Area Expansion',
  description: 'We’ve expanded our service coverage to include new neighborhoods.',
  startAt: 3.days.ago,
  expireAt: 4.days.fromNow,
  url: 'https://example.com/service-expansion',
);

final mockAnnouncement5 = Fragment$Announcement(
  id: '5',
  userType: [Enum$AnnouncementUserType.Driver],
  title: 'Safety Guidelines Reminder',
  description: 'Please review the updated safety guidelines to ensure a secure ride experience.',
  startAt: DateTime.now(),
  expireAt: 10.days.fromNow,
  url: 'https://example.com/safety-guidelines',
);

final mockAnnouncements = [
  mockAnnouncement1,
  mockAnnouncement2,
  mockAnnouncement3,
  mockAnnouncement4,
  mockAnnouncement5,
];
