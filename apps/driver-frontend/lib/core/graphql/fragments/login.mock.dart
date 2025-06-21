import 'package:driver_flutter/core/graphql/fragments/login.fragment.graphql.dart';
import 'package:driver_flutter/core/graphql/fragments/profile.mock.dart';

final mockVerifyOtpOrPasswordSuccess = Fragment$VerifyOtpOrPassword(
  hasPassword: true,
  user: mockProfileFull1,
  hasName: true,
  jwtToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mockTokenExample',
);

final mockVerifyOtpOrPasswordFailed = Fragment$VerifyOtpOrPassword(
  hasPassword: false,
  user: mockProfileFull1,
  hasName: false,
  jwtToken: '',
);

final mockVerifyNumberSuccess = Fragment$VerifyNumber(
  isExistingUser: true,
);

final mockVerifyNumberFailed = Fragment$VerifyNumber(
  isExistingUser: false,
);
