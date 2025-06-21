import 'package:driver_flutter/core/graphql/fragments/current_order.mock.dart';
import 'package:driver_flutter/core/graphql/fragments/driver_transactions.mock.dart';
import 'package:driver_flutter/core/graphql/fragments/media.extentions.dart';
import 'package:driver_flutter/core/graphql/fragments/profile.fragment.graphql.dart';
import 'package:driver_flutter/core/graphql/fragments/wallet.mock.dart';
import 'package:driver_flutter/core/graphql/schema.gql.dart';
import 'package:image_faker/image_faker.dart';

final mockProfile1 = Fragment$Profile(
  id: '1',
  mobileNumber: '+12065550123',
  countryIso: 'US',
  email: 'john.doe@example.com',
  firstName: 'John',
  lastName: 'Doe',
  gender: Enum$Gender.Male,
  media: ImageFaker().person.random().toMedia,
  currentOrders: [
    mockCurrentOrder1,
  ],
  isWalletHidden: true,
  status: Enum$DriverStatus.Online,
  searchDistance: 15,
  softRejectionNote: 'Preferred not to take the last trip',
  wallet: [
    mockWallet1,
    mockWallet2,
  ],
  transactions: Fragment$Profile$transactions(
    nodes: [
      mockDriverTransaction1,
      mockDriverTransaction2,
    ],
  ),
);

final mockProfile2 = Fragment$Profile(
  id: '2',
  mobileNumber: '+12065550456',
  countryIso: 'US',
  email: 'jane.smith@example.com',
  firstName: 'Jane',
  lastName: 'Smith',
  gender: Enum$Gender.Female,
  media: ImageFaker().person.random().toMedia,
  currentOrders: [
    mockCurrentOrder2,
  ],
  isWalletHidden: false,
  status: Enum$DriverStatus.Offline,
  searchDistance: 12,
  softRejectionNote: 'Declined previous request',
  wallet: [
    mockWallet3,
    mockWallet4,
  ],
  transactions: Fragment$Profile$transactions(
    nodes: [
      mockDriverTransaction3,
      mockDriverTransaction4,
    ],
  ),
);

final mockProfileFull1 = Fragment$ProfileFull(
    id: '1',
    mobileNumber: '+12065550123',
    countryIso: 'US',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    gender: Enum$Gender.Male,
    media: ImageFaker().person.random().toMedia,
    status: Enum$DriverStatus.Online,
    searchDistance: 15,
    accountNumber: '9876543210',
    address: '1234 Elm Street, Springfield, IL 62704',
    bankName: 'Bank of America',
    bankRoutingNumber: '026009593',
    bankSwift: 'BOFAUS3N',
    carColorId: 'blue',
    carId: '1',
    carPlate: 'ABC-1234',
    carProductionYear: 2020,
    certificateNumber: 'DL1234567890',
    documents: [
      ImageFaker().idCard.one.toMedia,
      ImageFaker().idCard.two.toMedia,
    ],
    wallet: [
      mockWallet1,
      mockWallet2,
    ],
    currentOrders: mockCurrentOrders);
