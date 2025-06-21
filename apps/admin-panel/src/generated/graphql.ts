import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** Cursor for paging through collections */
  ConnectionCursor: { input: any; output: any; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type ActiveInactiveUsers = {
  __typename?: 'ActiveInactiveUsers';
  activityLevel: UserActivityLevel;
  count: Scalars['Int']['output'];
  /** Any date in the range of the data. */
  date: Scalars['DateTime']['output'];
};

export type AddFleetsToZonePriceInput = {
  /** The id of the record. */
  id: Scalars['ID']['input'];
  /** The ids of the relations. */
  relationIds: Array<Scalars['ID']['input']>;
};

export type AddOptionsToServiceInput = {
  /** The id of the record. */
  id: Scalars['ID']['input'];
  /** The ids of the relations. */
  relationIds: Array<Scalars['ID']['input']>;
};

export type AddRegionsToServiceInput = {
  /** The id of the record. */
  id: Scalars['ID']['input'];
  /** The ids of the relations. */
  relationIds: Array<Scalars['ID']['input']>;
};

export type AddServicesToZonePriceInput = {
  /** The id of the record. */
  id: Scalars['ID']['input'];
  /** The ids of the relations. */
  relationIds: Array<Scalars['ID']['input']>;
};

export type Address = {
  __typename?: 'Address';
  details?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  location: Point;
  riderId: Scalars['ID']['output'];
  title: Scalars['String']['output'];
  type: RiderAddressType;
};

export type AddressConnection = {
  __typename?: 'AddressConnection';
  /** Array of nodes. */
  nodes: Array<Address>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type AddressFilter = {
  and?: InputMaybe<Array<AddressFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<AddressFilter>>;
  riderId?: InputMaybe<IdFilterComparison>;
};

export type AddressSort = {
  direction: SortDirection;
  field: AddressSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum AddressSortFields {
  Id = 'id',
  RiderId = 'riderId'
}

/** The type of admin notification. */
export enum AdminNotificationType {
  ReviewPendingApproval = 'ReviewPendingApproval',
  SupportRequestAssigned = 'SupportRequestAssigned',
  SupportRequestSubmitted = 'SupportRequestSubmitted',
  UserPendingVerification = 'UserPendingVerification'
}

export type AdminNotificationUnion = DriverPendingVerificationNotification | ParkSpotPendingVerificationNotification | ParkingReviewPendingApprovalNotification | ParkingSupportRequestNotification | ShopPendingVerificationNotification | ShopReviewPendingApprovalNotification | ShopSupportRequestNotification | TaxiSupportRequestNotification;

export type Announcement = {
  __typename?: 'Announcement';
  appType?: Maybe<AppType>;
  description: Scalars['String']['output'];
  expireAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  startAt: Scalars['DateTime']['output'];
  title: Scalars['String']['output'];
  url?: Maybe<Scalars['String']['output']>;
  userType: Array<AnnouncementUserType>;
};

export type AnnouncementConnection = {
  __typename?: 'AnnouncementConnection';
  /** Array of nodes. */
  nodes: Array<Announcement>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type AnnouncementDeleteResponse = {
  __typename?: 'AnnouncementDeleteResponse';
  appType?: Maybe<AppType>;
  description?: Maybe<Scalars['String']['output']>;
  expireAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  startAt?: Maybe<Scalars['DateTime']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  userType?: Maybe<Array<AnnouncementUserType>>;
};

export type AnnouncementFilter = {
  and?: InputMaybe<Array<AnnouncementFilter>>;
  appType?: InputMaybe<AppTypeFilterComparison>;
  description?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<AnnouncementFilter>>;
  title?: InputMaybe<StringFieldComparison>;
};

export type AnnouncementInput = {
  appType?: InputMaybe<AppType>;
  description?: InputMaybe<Scalars['String']['input']>;
  expireAt?: InputMaybe<Scalars['DateTime']['input']>;
  startAt?: InputMaybe<Scalars['DateTime']['input']>;
  title: Scalars['String']['input'];
  url?: InputMaybe<Scalars['String']['input']>;
  userType?: InputMaybe<Array<AnnouncementUserType>>;
};

export type AnnouncementSort = {
  direction: SortDirection;
  field: AnnouncementSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum AnnouncementSortFields {
  AppType = 'appType',
  Description = 'description',
  Id = 'id',
  Title = 'title'
}

export enum AnnouncementUserType {
  Driver = 'Driver',
  Operator = 'Operator',
  Rider = 'Rider'
}

export enum AppColorScheme {
  AutumnOrange = 'AutumnOrange',
  Cobalt = 'Cobalt',
  CoralRed = 'CoralRed',
  EarthyGreen = 'EarthyGreen',
  ElectricIndigo = 'ElectricIndigo',
  HyperPink = 'HyperPink',
  Noir = 'Noir',
  SunburstYellow = 'SunburstYellow'
}

export type AppConfigInfo = {
  __typename?: 'AppConfigInfo';
  color?: Maybe<AppColorScheme>;
  logo?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type AppConfigInfoInput = {
  color?: InputMaybe<AppColorScheme>;
  logo?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export enum AppType {
  Parking = 'Parking',
  Shop = 'Shop',
  Taxi = 'Taxi'
}

export type AppTypeFilterComparison = {
  eq?: InputMaybe<AppType>;
  gt?: InputMaybe<AppType>;
  gte?: InputMaybe<AppType>;
  iLike?: InputMaybe<AppType>;
  in?: InputMaybe<Array<AppType>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<AppType>;
  lt?: InputMaybe<AppType>;
  lte?: InputMaybe<AppType>;
  neq?: InputMaybe<AppType>;
  notILike?: InputMaybe<AppType>;
  notIn?: InputMaybe<Array<AppType>>;
  notLike?: InputMaybe<AppType>;
};

export type AssignParkingSupportRequestInput = {
  staffIds: Array<Scalars['ID']['input']>;
  supportRequestId: Scalars['ID']['input'];
};

export type AssignShopSupportRequestInput = {
  staffIds: Array<Scalars['ID']['input']>;
  supportRequestId: Scalars['ID']['input'];
};

export type AssignTaxiSupportRequestInput = {
  staffIds: Array<Scalars['ID']['input']>;
  supportRequestId: Scalars['ID']['input'];
};

export type AvaialbeUpgrade = {
  __typename?: 'AvaialbeUpgrade';
  benefits: Array<Scalars['String']['output']>;
  price: Scalars['Float']['output'];
  type: Scalars['String']['output'];
};

export type BooleanFieldComparison = {
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CalculateDeliveryFee = {
  __typename?: 'CalculateDeliveryFee';
  batchDeliveryDuration: Scalars['Int']['output'];
  batchDeliveryFee: Scalars['Float']['output'];
  splitDeliveryFee: Scalars['Float']['output'];
};

export type CalculateDeliveryFeeInput = {
  carts: Array<ShopOrderCartInput>;
  deliveryAddressId: Scalars['ID']['input'];
};

export type CalculateFare = {
  __typename?: 'CalculateFare';
  currency: Scalars['String']['output'];
  distance: Scalars['Int']['output'];
  duration: Scalars['Int']['output'];
  error?: Maybe<CalculateFareError>;
  services: Array<ServiceCategoryWithCost>;
};

export enum CalculateFareError {
  NoServiceInRegion = 'NoServiceInRegion',
  RegionUnsupported = 'RegionUnsupported'
}

export type CalculateFareInput = {
  orderType: TaxiOrderType;
  points: Array<PointInput>;
  riderId: Scalars['ID']['input'];
};

export type Campaign = {
  __typename?: 'Campaign';
  appType: Array<AppType>;
  codes: CampaignCodesConnection;
  codesAggregate: Array<CampaignCodesAggregateResponse>;
  currency: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  discountFlat: Scalars['Float']['output'];
  discountPercent: Scalars['Float']['output'];
  expireAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  isEnabled: Scalars['Boolean']['output'];
  isFirstTravelOnly: Scalars['Boolean']['output'];
  manyTimesUserCanUse: Scalars['Int']['output'];
  manyUsersCanUse: Scalars['Int']['output'];
  maximumCost: Scalars['Float']['output'];
  minimumCost: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  startAt: Scalars['DateTime']['output'];
};


export type CampaignCodesArgs = {
  filter?: CampaignCodeFilter;
  paging?: OffsetPaging;
  sorting?: Array<CampaignCodeSort>;
};


export type CampaignCodesAggregateArgs = {
  filter?: InputMaybe<CampaignCodeAggregateFilter>;
};

export type CampaignCode = {
  __typename?: 'CampaignCode';
  campaignId?: Maybe<Scalars['ID']['output']>;
  code: Scalars['String']['output'];
  customer?: Maybe<Rider>;
  customerId?: Maybe<Scalars['ID']['output']>;
  id: Scalars['ID']['output'];
};

export type CampaignCodeAggregateFilter = {
  and?: InputMaybe<Array<CampaignCodeAggregateFilter>>;
  campaignId?: InputMaybe<IdFilterComparison>;
  customerId?: InputMaybe<IdFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<CampaignCodeAggregateFilter>>;
};

export type CampaignCodeConnection = {
  __typename?: 'CampaignCodeConnection';
  /** Array of nodes. */
  nodes: Array<CampaignCode>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type CampaignCodeFilter = {
  and?: InputMaybe<Array<CampaignCodeFilter>>;
  campaignId?: InputMaybe<IdFilterComparison>;
  customerId?: InputMaybe<IdFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<CampaignCodeFilter>>;
};

export type CampaignCodeSort = {
  direction: SortDirection;
  field: CampaignCodeSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum CampaignCodeSortFields {
  CampaignId = 'campaignId',
  CustomerId = 'customerId',
  Id = 'id'
}

export type CampaignCodesAggregateGroupBy = {
  __typename?: 'CampaignCodesAggregateGroupBy';
  campaignId?: Maybe<Scalars['ID']['output']>;
  customerId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type CampaignCodesAggregateResponse = {
  __typename?: 'CampaignCodesAggregateResponse';
  avg?: Maybe<CampaignCodesAvgAggregate>;
  count?: Maybe<CampaignCodesCountAggregate>;
  groupBy?: Maybe<CampaignCodesAggregateGroupBy>;
  max?: Maybe<CampaignCodesMaxAggregate>;
  min?: Maybe<CampaignCodesMinAggregate>;
  sum?: Maybe<CampaignCodesSumAggregate>;
};

export type CampaignCodesAvgAggregate = {
  __typename?: 'CampaignCodesAvgAggregate';
  campaignId?: Maybe<Scalars['Float']['output']>;
  customerId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

export type CampaignCodesConnection = {
  __typename?: 'CampaignCodesConnection';
  /** Array of nodes. */
  nodes: Array<CampaignCode>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type CampaignCodesCountAggregate = {
  __typename?: 'CampaignCodesCountAggregate';
  campaignId?: Maybe<Scalars['Int']['output']>;
  customerId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
};

export type CampaignCodesMaxAggregate = {
  __typename?: 'CampaignCodesMaxAggregate';
  campaignId?: Maybe<Scalars['ID']['output']>;
  customerId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type CampaignCodesMinAggregate = {
  __typename?: 'CampaignCodesMinAggregate';
  campaignId?: Maybe<Scalars['ID']['output']>;
  customerId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type CampaignCodesSumAggregate = {
  __typename?: 'CampaignCodesSumAggregate';
  campaignId?: Maybe<Scalars['Float']['output']>;
  customerId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

export type CampaignConnection = {
  __typename?: 'CampaignConnection';
  /** Array of nodes. */
  nodes: Array<Campaign>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export enum CampaignCriteriaOrdersType {
  OrderCountLessThan = 'OrderCountLessThan',
  OrderCountMoreThan = 'OrderCountMoreThan',
  PurchaseAmountLessThan = 'PurchaseAmountLessThan',
  PurchaseAmountMoreThan = 'PurchaseAmountMoreThan'
}

export type CampaignDeleteResponse = {
  __typename?: 'CampaignDeleteResponse';
  appType?: Maybe<Array<AppType>>;
  currency?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  discountFlat?: Maybe<Scalars['Float']['output']>;
  discountPercent?: Maybe<Scalars['Float']['output']>;
  expireAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  isEnabled?: Maybe<Scalars['Boolean']['output']>;
  isFirstTravelOnly?: Maybe<Scalars['Boolean']['output']>;
  manyTimesUserCanUse?: Maybe<Scalars['Int']['output']>;
  manyUsersCanUse?: Maybe<Scalars['Int']['output']>;
  maximumCost?: Maybe<Scalars['Float']['output']>;
  minimumCost?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  startAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CampaignFilter = {
  and?: InputMaybe<Array<CampaignFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<CampaignFilter>>;
};

export type CampaignSort = {
  direction: SortDirection;
  field: CampaignSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum CampaignSortFields {
  Id = 'id',
  Name = 'name'
}

export type CampaignTargetSegmentCriteria = {
  appType: AppType;
  lastDays: Scalars['Int']['input'];
  type: CampaignCriteriaOrdersType;
  value: Scalars['Float']['input'];
};

export type CancelShopOrderCartsInput = {
  cartIds: Array<Scalars['ID']['input']>;
};

export type CarColor = {
  __typename?: 'CarColor';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type CarColorConnection = {
  __typename?: 'CarColorConnection';
  /** Array of nodes. */
  nodes: Array<CarColor>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type CarColorDeleteResponse = {
  __typename?: 'CarColorDeleteResponse';
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type CarColorFilter = {
  and?: InputMaybe<Array<CarColorFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<CarColorFilter>>;
};

export type CarColorInput = {
  name: Scalars['String']['input'];
};

export type CarColorSort = {
  direction: SortDirection;
  field: CarColorSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum CarColorSortFields {
  Id = 'id',
  Name = 'name'
}

export type CarModel = {
  __typename?: 'CarModel';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type CarModelConnection = {
  __typename?: 'CarModelConnection';
  /** Array of nodes. */
  nodes: Array<CarModel>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type CarModelDeleteResponse = {
  __typename?: 'CarModelDeleteResponse';
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type CarModelFilter = {
  and?: InputMaybe<Array<CarModelFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<CarModelFilter>>;
};

export type CarModelInput = {
  name: Scalars['String']['input'];
};

export type CarModelSort = {
  direction: SortDirection;
  field: CarModelSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum CarModelSortFields {
  Id = 'id',
  Name = 'name'
}

export type ChangeParkingSupportRequestStatusInput = {
  status: ComplaintStatus;
  supportRequestId: Scalars['ID']['input'];
};

export type ChangeShopSupportRequestStatusInput = {
  status: ComplaintStatus;
  supportRequestId: Scalars['ID']['input'];
};

export type ChangeTaxiSupportRequestStatusInput = {
  status: ComplaintStatus;
  supportRequestId: Scalars['ID']['input'];
};

export type ChartFilterInput = {
  endDate: Scalars['DateTime']['input'];
  interval: ChartInterval;
  startDate: Scalars['DateTime']['input'];
};

export enum ChartInterval {
  Daily = 'Daily',
  Monthly = 'Monthly',
  Quarterly = 'Quarterly',
  Yearly = 'Yearly'
}

export enum ChartTimeframe {
  Daily = 'Daily',
  Monthly = 'Monthly',
  Weekly = 'Weekly',
  Yearly = 'Yearly'
}

export enum ComplaintActivityType {
  AssignToOperator = 'AssignToOperator',
  Comment = 'Comment',
  Create = 'Create',
  Resolved = 'Resolved',
  StatusChange = 'StatusChange',
  UnassignFromOperators = 'UnassignFromOperators',
  Update = 'Update'
}

export enum ComplaintStatus {
  Resolved = 'Resolved',
  Submitted = 'Submitted',
  UnderInvestigation = 'UnderInvestigation'
}

export type ComplaintStatusFilterComparison = {
  eq?: InputMaybe<ComplaintStatus>;
  gt?: InputMaybe<ComplaintStatus>;
  gte?: InputMaybe<ComplaintStatus>;
  iLike?: InputMaybe<ComplaintStatus>;
  in?: InputMaybe<Array<ComplaintStatus>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<ComplaintStatus>;
  lt?: InputMaybe<ComplaintStatus>;
  lte?: InputMaybe<ComplaintStatus>;
  neq?: InputMaybe<ComplaintStatus>;
  notILike?: InputMaybe<ComplaintStatus>;
  notIn?: InputMaybe<Array<ComplaintStatus>>;
  notLike?: InputMaybe<ComplaintStatus>;
};

export type ConfigInformation = {
  __typename?: 'ConfigInformation';
  config?: Maybe<CurrentConfiguration>;
  isValid: Scalars['Boolean']['output'];
};

export type CountryDistribution = {
  __typename?: 'CountryDistribution';
  count: Scalars['Int']['output'];
  country: Scalars['String']['output'];
};

export type Coupon = {
  __typename?: 'Coupon';
  allowedServices: Array<Service>;
  code: Scalars['String']['output'];
  creditGift: Scalars['Float']['output'];
  description: Scalars['String']['output'];
  discountFlat: Scalars['Int']['output'];
  discountPercent: Scalars['Int']['output'];
  expireAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  isEnabled: Scalars['Boolean']['output'];
  isFirstTravelOnly: Scalars['Boolean']['output'];
  manyTimesUserCanUse: Scalars['Int']['output'];
  manyUsersCanUse: Scalars['Int']['output'];
  maximumCost: Scalars['Float']['output'];
  minimumCost: Scalars['Float']['output'];
  startAt: Scalars['DateTime']['output'];
  title: Scalars['String']['output'];
};


export type CouponAllowedServicesArgs = {
  filter?: ServiceFilter;
  sorting?: Array<ServiceSort>;
};

export type CouponConnection = {
  __typename?: 'CouponConnection';
  /** Array of nodes. */
  nodes: Array<Coupon>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type CouponDeleteResponse = {
  __typename?: 'CouponDeleteResponse';
  code?: Maybe<Scalars['String']['output']>;
  creditGift?: Maybe<Scalars['Float']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  discountFlat?: Maybe<Scalars['Int']['output']>;
  discountPercent?: Maybe<Scalars['Int']['output']>;
  expireAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  isEnabled?: Maybe<Scalars['Boolean']['output']>;
  isFirstTravelOnly?: Maybe<Scalars['Boolean']['output']>;
  manyTimesUserCanUse?: Maybe<Scalars['Int']['output']>;
  manyUsersCanUse?: Maybe<Scalars['Int']['output']>;
  maximumCost?: Maybe<Scalars['Float']['output']>;
  minimumCost?: Maybe<Scalars['Float']['output']>;
  startAt?: Maybe<Scalars['DateTime']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type CouponFilter = {
  and?: InputMaybe<Array<CouponFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<CouponFilter>>;
};

export type CouponInput = {
  code: Scalars['String']['input'];
  creditGift: Scalars['Float']['input'];
  description: Scalars['String']['input'];
  discountFlat: Scalars['Int']['input'];
  discountPercent: Scalars['Int']['input'];
  expireAt: Scalars['DateTime']['input'];
  isEnabled: Scalars['Boolean']['input'];
  isFirstTravelOnly: Scalars['Boolean']['input'];
  manyTimesUserCanUse: Scalars['Int']['input'];
  manyUsersCanUse: Scalars['Int']['input'];
  maximumCost: Scalars['Float']['input'];
  minimumCost: Scalars['Float']['input'];
  startAt: Scalars['DateTime']['input'];
  title: Scalars['String']['input'];
};

export type CouponSort = {
  direction: SortDirection;
  field: CouponSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum CouponSortFields {
  Id = 'id'
}

export type CreateCampaignInput = {
  codesCount: Scalars['Int']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  discountFlat?: InputMaybe<Scalars['Float']['input']>;
  discountPercent: Scalars['Float']['input'];
  emailSubject?: InputMaybe<Scalars['String']['input']>;
  emailText?: InputMaybe<Scalars['String']['input']>;
  expireAt?: InputMaybe<Scalars['DateTime']['input']>;
  isFirstTravelOnly: Scalars['Boolean']['input'];
  manyTimesUserCanUse: Scalars['Int']['input'];
  manyUsersCanUse: Scalars['Int']['input'];
  maximumCost?: InputMaybe<Scalars['Float']['input']>;
  minimumCost?: InputMaybe<Scalars['Float']['input']>;
  name: Scalars['String']['input'];
  pushText?: InputMaybe<Scalars['String']['input']>;
  pushTitle?: InputMaybe<Scalars['String']['input']>;
  sendAt?: InputMaybe<Scalars['DateTime']['input']>;
  sendEmail: Scalars['Boolean']['input'];
  sendPush: Scalars['Boolean']['input'];
  sendSMS: Scalars['Boolean']['input'];
  smsText?: InputMaybe<Scalars['String']['input']>;
  startAt?: InputMaybe<Scalars['DateTime']['input']>;
  targetUsers: Array<CampaignTargetSegmentCriteria>;
};

export type CreateCustomerNoteInput = {
  customerId: Scalars['ID']['input'];
  note: Scalars['String']['input'];
};

export type CreateDriverNoteInput = {
  driverId: Scalars['ID']['input'];
  note: Scalars['String']['input'];
};

export type CreateFleetInput = {
  accountNumber: Scalars['String']['input'];
  address?: InputMaybe<Scalars['String']['input']>;
  commissionShareFlat: Scalars['Float']['input'];
  commissionSharePercent: Scalars['Float']['input'];
  exclusivityAreas?: InputMaybe<Array<Array<PointInput>>>;
  feeMultiplier?: InputMaybe<Scalars['Float']['input']>;
  isBlocked?: InputMaybe<Scalars['Boolean']['input']>;
  mobileNumber: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
  profilePictureId?: InputMaybe<Scalars['ID']['input']>;
  userName: Scalars['String']['input'];
};

export type CreateFleetStaffInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName: Scalars['String']['input'];
  fleetId: Scalars['ID']['input'];
  lastName: Scalars['String']['input'];
  mobileNumber?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  permissionFinancial: FleetStaffPermissionFinancial;
  permissionOrder: FleetStaffPermissionOrder;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  profileImageId?: InputMaybe<Scalars['ID']['input']>;
  userName: Scalars['String']['input'];
};

export type CreateGiftBatchInput = {
  amount: Scalars['Float']['input'];
  availableFrom?: InputMaybe<Scalars['DateTime']['input']>;
  currency: Scalars['String']['input'];
  expireAt?: InputMaybe<Scalars['DateTime']['input']>;
  name: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
};

export type CreateItem = {
  /** The base price of the item */
  basePrice: Scalars['Float']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  discountPercentage: Scalars['Int']['input'];
  discountUntil?: InputMaybe<Scalars['DateTime']['input']>;
  discountedQuantity: Scalars['Int']['input'];
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  ratingAggregate: RatingAggregateInput;
  shopId: Scalars['ID']['input'];
  /** The stock quantity */
  stockQuantity: Scalars['Int']['input'];
  usedDiscountedQuantity: Scalars['Int']['input'];
};

export type CreateItemCategoryInput = {
  name: Scalars['String']['input'];
  shopId: Scalars['ID']['input'];
};

export type CreateManyDriverDocumentRetentionPoliciesInput = {
  /** Array of records to create */
  driverDocumentRetentionPolicies: Array<DriverDocumentRetentionPolicyInput>;
};

export type CreateManyDriverDocumentsInput = {
  /** Array of records to create */
  driverDocuments: Array<DriverDocumentInput>;
};

export type CreateManyDriverShiftRulesInput = {
  /** Array of records to create */
  driverShiftRules: Array<DriverShiftRuleInput>;
};

export type CreateManySmsInput = {
  /** Array of records to create */
  sMS: Array<CreateSms>;
};

export type CreateManySmsProvidersInput = {
  /** Array of records to create */
  sMSProviders: Array<SmsProviderInput>;
};

export type CreateOneAnnouncementInput = {
  /** The record to create */
  announcement: AnnouncementInput;
};

export type CreateOneCarColorInput = {
  /** The record to create */
  carColor: CarColorInput;
};

export type CreateOneCarModelInput = {
  /** The record to create */
  carModel: CarModelInput;
};

export type CreateOneCouponInput = {
  /** The record to create */
  coupon: CouponInput;
};

export type CreateOneCustomerNoteInput = {
  /** The record to create */
  customerNote: CreateCustomerNoteInput;
};

export type CreateOneDriverDocumentInput = {
  /** The record to create */
  driverDocument: DriverDocumentInput;
};

export type CreateOneDriverDocumentRetentionPolicyInput = {
  /** The record to create */
  driverDocumentRetentionPolicy: DriverDocumentRetentionPolicyInput;
};

export type CreateOneDriverInput = {
  /** The record to create */
  driver: UpdateDriverInput;
};

export type CreateOneDriverNoteInput = {
  /** The record to create */
  driverNote: CreateDriverNoteInput;
};

export type CreateOneDriverShiftRuleInput = {
  /** The record to create */
  driverShiftRule: DriverShiftRuleInput;
};

export type CreateOneDriverToDriverDocumentInput = {
  /** The record to create */
  driverToDriverDocument: DriverToDriverDocumentInput;
};

export type CreateOneDriverTransactionInput = {
  /** The record to create */
  driverTransaction: DriverTransactionInput;
};

export type CreateOneFeedbackParameterInput = {
  /** The record to create */
  feedbackParameter: FeedbackParameterInput;
};

export type CreateOneFleetInput = {
  /** The record to create */
  fleet: CreateFleetInput;
};

export type CreateOneFleetStaffInput = {
  /** The record to create */
  fleetStaff: CreateFleetStaffInput;
};

export type CreateOneItemCategoryInput = {
  /** The record to create */
  itemCategory: CreateItemCategoryInput;
};

export type CreateOneItemInput = {
  /** The record to create */
  item: CreateItem;
};

export type CreateOneOperatorInput = {
  /** The record to create */
  operator: CreateOperatorInput;
};

export type CreateOneOperatorRoleInput = {
  /** The record to create */
  operatorRole: OperatorRoleInput;
};

export type CreateOneOrderCancelReasonInput = {
  /** The record to create */
  orderCancelReason: OrderCancelReasonInput;
};

export type CreateOneParkOrderInput = {
  /** The record to create */
  parkOrder: CreateParkOrderInput;
};

export type CreateOneParkOrderNoteInput = {
  /** The record to create */
  parkOrderNote: CreateParkOrderNoteInput;
};

export type CreateOneParkSpotNoteInput = {
  /** The record to create */
  parkSpotNote: CreateParkSpotNoteInput;
};

export type CreateOneParkingFeedbackParameterInput = {
  /** The record to create */
  parkingFeedbackParameter: CreateParkingFeedbackParameter;
};

export type CreateOneParkingSupportRequestActivityInput = {
  /** The record to create */
  parkingSupportRequestActivity: CreateParkingSupportRequestActivity;
};

export type CreateOneParkingTransactionInput = {
  /** The record to create */
  parkingTransaction: CreateParkingTransactionInput;
};

export type CreateOnePaymentGatewayInput = {
  /** The record to create */
  paymentGateway: CreatePaymentGatewayInput;
};

export type CreateOnePayoutMethodInput = {
  /** The record to create */
  payoutMethod: CreatePayoutMethodInput;
};

export type CreateOneProviderTransactionInput = {
  /** The record to create */
  providerTransaction: ProviderTransactionInput;
};

export type CreateOneRegionCategoryInput = {
  /** The record to create */
  regionCategory: RegionCategoryInput;
};

export type CreateOneRegionInput = {
  /** The record to create */
  region: CreateRegionInput;
};

export type CreateOneRewardInput = {
  /** The record to create */
  reward: CreateReward;
};

export type CreateOneRiderAddressInput = {
  /** The record to create */
  riderAddress: CreateRiderAddress;
};

export type CreateOneRiderInput = {
  /** The record to create */
  rider: RiderInput;
};

export type CreateOneRiderTransactionInput = {
  /** The record to create */
  riderTransaction: RiderTransactionInput;
};

export type CreateOneSmsInput = {
  /** The record to create */
  sMS: CreateSms;
};

export type CreateOneSmsProviderInput = {
  /** The record to create */
  sMSProvider: SmsProviderInput;
};

export type CreateOneSosActivityInput = {
  /** The record to create */
  sOSActivity: CreateSosAcitivtyInput;
};

export type CreateOneSosReasonInput = {
  /** The record to create */
  sOSReason: CreateSosReasonInput;
};

export type CreateOneServiceCategoryInput = {
  /** The record to create */
  serviceCategory: ServiceCategoryInput;
};

export type CreateOneServiceInput = {
  /** The record to create */
  service: ServiceInput;
};

export type CreateOneServiceOptionInput = {
  /** The record to create */
  serviceOption: ServiceOptionInput;
};

export type CreateOneShopCategoryInput = {
  /** The record to create */
  shopCategory: CreateShopCategoryInput;
};

export type CreateOneShopDeliveryZoneInput = {
  /** The record to create */
  shopDeliveryZone: CreateShopDeliveryZoneInput;
};

export type CreateOneShopFeedbackParameterInput = {
  /** The record to create */
  shopFeedbackParameter: CreateShopFeedbackParameter;
};

export type CreateOneShopInput = {
  /** The record to create */
  shop: UpsertShopInput;
};

export type CreateOneShopItemPresetInput = {
  /** The record to create */
  shopItemPreset: CreateShopItemPresetInput;
};

export type CreateOneShopNoteInput = {
  /** The record to create */
  shopNote: CreateShopNoteInput;
};

export type CreateOneShopOrderNoteInput = {
  /** The record to create */
  shopOrderNote: CreateShopOrderNoteInput;
};

export type CreateOneShopSupportRequestActivityInput = {
  /** The record to create */
  shopSupportRequestActivity: CreateShopSupportRequestActivity;
};

export type CreateOneShopTransactionInput = {
  /** The record to create */
  shopTransaction: CreateShopTransactionInput;
};

export type CreateOneTaxiSupportRequestActivityInput = {
  /** The record to create */
  taxiSupportRequestActivity: CreateTaxiSupportRequestActivity;
};

export type CreateOneZonePriceCategoryInput = {
  /** The record to create */
  zonePriceCategory: ZonePriceCategoryInput;
};

export type CreateOneZonePriceInput = {
  /** The record to create */
  zonePrice: ZonePriceInput;
};

export type CreateOperatorInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  mobileNumber: Scalars['String']['input'];
  password: Scalars['String']['input'];
  roleId: Scalars['ID']['input'];
  userName: Scalars['String']['input'];
};

export type CreateOrderInput = {
  addresses: Array<Scalars['String']['input']>;
  driverId?: InputMaybe<Scalars['ID']['input']>;
  intervalMinutes?: Scalars['Int']['input'];
  optionIds?: Array<Scalars['ID']['input']>;
  points: Array<PointInput>;
  riderId: Scalars['ID']['input'];
  serviceId: Scalars['ID']['input'];
  twoWay?: Scalars['Boolean']['input'];
  waitingTimeMinutes?: Scalars['Int']['input'];
};

export type CreateParkOrderInput = {
  carSize?: InputMaybe<ParkSpotCarSize>;
  enterTime: Scalars['DateTime']['input'];
  exitTime: Scalars['DateTime']['input'];
  parkSpotId: Scalars['ID']['input'];
  paymentMethodId?: InputMaybe<Scalars['ID']['input']>;
  paymentMode: PaymentMode;
  vehicleType: ParkSpotVehicleType;
};

export type CreateParkOrderNoteInput = {
  note: Scalars['String']['input'];
  parkOrderId: Scalars['ID']['input'];
};

export type CreateParkSpotInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  bikePrice?: InputMaybe<Scalars['Float']['input']>;
  bikeSpaces: Scalars['Int']['input'];
  carPrice?: InputMaybe<Scalars['Float']['input']>;
  carSize?: InputMaybe<ParkSpotCarSize>;
  carSpaces: Scalars['Int']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  facilities: Array<ParkSpotFacility>;
  imageIds: Array<Scalars['ID']['input']>;
  location: PointInput;
  mainImageId?: InputMaybe<Scalars['ID']['input']>;
  name: Scalars['String']['input'];
  ownerEmail: Scalars['String']['input'];
  ownerFirstName: Scalars['String']['input'];
  ownerGender: Gender;
  ownerLastName: Scalars['String']['input'];
  ownerPhoneNumber: Scalars['String']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  truckPrice?: InputMaybe<Scalars['Float']['input']>;
  truckSpaces: Scalars['Int']['input'];
  type: ParkSpotType;
  weekdaySchedule: Array<WeekdayScheduleInput>;
};

export type CreateParkSpotNoteInput = {
  note: Scalars['String']['input'];
  parkSpotId: Scalars['ID']['input'];
};

export type CreateParkingFeedbackParameter = {
  id: Scalars['ID']['input'];
  isGood: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
};

export type CreateParkingSupportRequestActivity = {
  comment?: InputMaybe<Scalars['String']['input']>;
  createdAt: Scalars['DateTime']['input'];
  id: Scalars['ID']['input'];
  statusFrom?: InputMaybe<ComplaintStatus>;
  statusTo?: InputMaybe<ComplaintStatus>;
  type: ComplaintActivityType;
};

export type CreateParkingSupportRequestCommentInput = {
  comment: Scalars['String']['input'];
  supportRequestId: Scalars['ID']['input'];
};

export type CreateParkingTransactionInput = {
  amount: Scalars['Float']['input'];
  creditType?: InputMaybe<ParkingTransactionCreditType>;
  currency: Scalars['String']['input'];
  customerId: Scalars['ID']['input'];
  debitType?: InputMaybe<ParkingTransactionDebitType>;
  description?: InputMaybe<Scalars['String']['input']>;
  documentNumber?: InputMaybe<Scalars['String']['input']>;
  transactionDate?: InputMaybe<Scalars['DateTime']['input']>;
  type: TransactionType;
};

export type CreatePaymentGatewayInput = {
  enabled: Scalars['Boolean']['input'];
  mediaId?: InputMaybe<Scalars['ID']['input']>;
  merchantId?: InputMaybe<Scalars['ID']['input']>;
  privateKey: Scalars['String']['input'];
  publicKey?: InputMaybe<Scalars['String']['input']>;
  saltKey?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
  type: PaymentGatewayType;
};

export type CreatePayoutMethodInput = {
  currency: Scalars['String']['input'];
  description: Scalars['String']['input'];
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  mediaId?: InputMaybe<Scalars['ID']['input']>;
  merchantId?: InputMaybe<Scalars['ID']['input']>;
  name: Scalars['String']['input'];
  privateKey?: InputMaybe<Scalars['String']['input']>;
  publicKey?: InputMaybe<Scalars['String']['input']>;
  saltKey?: InputMaybe<Scalars['String']['input']>;
  type: PayoutMethodType;
};

export type CreatePayoutSessionInput = {
  appType?: AppType;
  currency: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  minimumAmount: Scalars['Float']['input'];
  payoutMethodIds: Array<Scalars['ID']['input']>;
};

export type CreateRegionInput = {
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  currency: Scalars['String']['input'];
  enabled: Scalars['Boolean']['input'];
  location: Array<Array<PointInput>>;
  name: Scalars['String']['input'];
};

export type CreateReward = {
  appType: RewardAppType;
  beneficiary: RewardBeneficiary;
  conditionTripCountsLessThan?: InputMaybe<Scalars['Float']['input']>;
  conditionUserNumberFirstDigits?: InputMaybe<Array<Scalars['String']['input']>>;
  creditCurrency?: InputMaybe<Scalars['String']['input']>;
  creditGift: Scalars['Float']['input'];
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  event: RewardEvent;
  id: Scalars['ID']['input'];
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  title: Scalars['String']['input'];
  tripFeePercentGift?: InputMaybe<Scalars['Float']['input']>;
};

export type CreateRiderAddress = {
  details?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  location: PointInput;
  riderId: Scalars['ID']['input'];
  title: Scalars['String']['input'];
  type: RiderAddressType;
};

export type CreateSms = {
  countryIsoCode: Scalars['String']['input'];
  from: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  message: Scalars['String']['input'];
  providerId: Scalars['ID']['input'];
  status: SmsStatus;
  to: Scalars['String']['input'];
  type: SmsType;
};

export type CreateSosAcitivtyInput = {
  action: SosActivityAction;
  note?: InputMaybe<Scalars['String']['input']>;
  sosId: Scalars['ID']['input'];
};

export type CreateShopCategoryInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  imageId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

export type CreateShopDeliveryZoneInput = {
  deliveryFee: Scalars['Float']['input'];
  location: Array<Array<PointInput>>;
  maxDeliveryTimeMinutes: Scalars['Int']['input'];
  minDeliveryTimeMinutes: Scalars['Int']['input'];
  minimumOrderAmount: Scalars['Float']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  shopId: Scalars['ID']['input'];
};

export type CreateShopFeedbackParameter = {
  id: Scalars['ID']['input'];
  isGood: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
};

export type CreateShopItemPresetInput = {
  name: Scalars['String']['input'];
  shopId: Scalars['ID']['input'];
  weeklySchedule: Array<WeekdayScheduleInput>;
};

export type CreateShopNoteInput = {
  note: Scalars['String']['input'];
  shopId: Scalars['ID']['input'];
};

export type CreateShopOrderNoteInput = {
  note: Scalars['String']['input'];
  orderId: Scalars['ID']['input'];
};

export type CreateShopSupportRequestActivity = {
  comment?: InputMaybe<Scalars['String']['input']>;
  createdAt: Scalars['DateTime']['input'];
  id: Scalars['ID']['input'];
  statusFrom?: InputMaybe<ComplaintStatus>;
  statusTo?: InputMaybe<ComplaintStatus>;
  type: ComplaintActivityType;
};

export type CreateShopSupportRequestCommentInput = {
  comment: Scalars['String']['input'];
  supportRequestId: Scalars['ID']['input'];
};

export type CreateShopTransactionInput = {
  amount: Scalars['Float']['input'];
  creditType?: InputMaybe<ShopTransactionCreditType>;
  currency: Scalars['String']['input'];
  debitType?: InputMaybe<ShopTransactionDebitType>;
  description?: InputMaybe<Scalars['String']['input']>;
  documentNumber?: InputMaybe<Scalars['String']['input']>;
  shopId: Scalars['ID']['input'];
  transactionDate?: InputMaybe<Scalars['DateTime']['input']>;
  type: TransactionType;
};

export type CreateSosReasonInput = {
  name: Scalars['String']['input'];
};

export type CreateTaxiOrderNoteInput = {
  note: Scalars['String']['input'];
  orderId: Scalars['ID']['input'];
};

export type CreateTaxiSupportRequestActivity = {
  comment?: InputMaybe<Scalars['String']['input']>;
  complaintId: Scalars['ID']['input'];
  createdAt: Scalars['DateTime']['input'];
  id: Scalars['ID']['input'];
  statusFrom?: InputMaybe<ComplaintStatus>;
  statusTo?: InputMaybe<ComplaintStatus>;
  type: ComplaintActivityType;
};

export type CreateTaxiSupportRequestCommentInput = {
  comment: Scalars['String']['input'];
  supportRequestId: Scalars['ID']['input'];
};

export type CurrentConfiguration = {
  __typename?: 'CurrentConfiguration';
  adminPanelAPIKey?: Maybe<Scalars['String']['output']>;
  backendMapsAPIKey?: Maybe<Scalars['String']['output']>;
  companyLogo?: Maybe<Scalars['String']['output']>;
  companyName?: Maybe<Scalars['String']['output']>;
  firebaseProjectPrivateKey?: Maybe<Scalars['String']['output']>;
  mysqlDatabase?: Maybe<Scalars['String']['output']>;
  mysqlHost?: Maybe<Scalars['String']['output']>;
  mysqlPassword?: Maybe<Scalars['String']['output']>;
  mysqlPort?: Maybe<Scalars['Int']['output']>;
  mysqlUser?: Maybe<Scalars['String']['output']>;
  parking?: Maybe<AppConfigInfo>;
  purchaseCode?: Maybe<Scalars['String']['output']>;
  redisDb?: Maybe<Scalars['Int']['output']>;
  redisHost?: Maybe<Scalars['String']['output']>;
  redisPassword?: Maybe<Scalars['String']['output']>;
  redisPort?: Maybe<Scalars['Int']['output']>;
  shop?: Maybe<AppConfigInfo>;
  taxi?: Maybe<AppConfigInfo>;
  versionNumber?: Maybe<Scalars['String']['output']>;
};

export type CursorPaging = {
  /** Paginate after opaque cursor */
  after?: InputMaybe<Scalars['ConnectionCursor']['input']>;
  /** Paginate before opaque cursor */
  before?: InputMaybe<Scalars['ConnectionCursor']['input']>;
  /** Paginate first */
  first?: InputMaybe<Scalars['Int']['input']>;
  /** Paginate last */
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type CustomerLoginPerApp = {
  __typename?: 'CustomerLoginPerApp';
  app: AppType;
  count: Scalars['Int']['output'];
};

export type CustomerNote = {
  __typename?: 'CustomerNote';
  createdAt: Scalars['DateTime']['output'];
  createdBy: Operator;
  createdById: Scalars['ID']['output'];
  customer: Rider;
  customerId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  note: Scalars['String']['output'];
};

export type CustomerNoteFilter = {
  and?: InputMaybe<Array<CustomerNoteFilter>>;
  customerId: IdFilterComparison;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<CustomerNoteFilter>>;
};

export type CustomerNoteSort = {
  direction: SortDirection;
  field: CustomerNoteSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum CustomerNoteSortFields {
  CustomerId = 'customerId',
  Id = 'id'
}

export type CustomerSession = {
  __typename?: 'CustomerSession';
  customerId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  sessionInfo: SessionInfo;
};

export type CustomerSessionDeleteResponse = {
  __typename?: 'CustomerSessionDeleteResponse';
  customerId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  sessionInfo?: Maybe<SessionInfo>;
};

export type CustomerSessionFilter = {
  and?: InputMaybe<Array<CustomerSessionFilter>>;
  customerId?: InputMaybe<IdFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<CustomerSessionFilter>>;
};

export type CustomerSessionSort = {
  direction: SortDirection;
  field: CustomerSessionSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum CustomerSessionSortFields {
  CustomerId = 'customerId',
  Id = 'id'
}

export type DateFieldComparison = {
  between?: InputMaybe<DateFieldComparisonBetween>;
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  neq?: InputMaybe<Scalars['DateTime']['input']>;
  notBetween?: InputMaybe<DateFieldComparisonBetween>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type DateFieldComparisonBetween = {
  lower: Scalars['DateTime']['input'];
  upper: Scalars['DateTime']['input'];
};

export type DateRangeMultiplier = {
  __typename?: 'DateRangeMultiplier';
  endDate: Scalars['Float']['output'];
  multiply: Scalars['Float']['output'];
  startDate: Scalars['Float']['output'];
};

export type DateRangeMultiplierInput = {
  endDate: Scalars['Float']['input'];
  multiply: Scalars['Float']['input'];
  startDate: Scalars['Float']['input'];
};

export type DeleteManyDriverDocumentRetentionPoliciesInput = {
  /** Filter to find records to delete */
  filter: DriverDocumentRetentionPolicyDeleteFilter;
};

export type DeleteManyDriverDocumentsInput = {
  /** Filter to find records to delete */
  filter: DriverDocumentDeleteFilter;
};

export type DeleteManyDriverShiftRulesInput = {
  /** Filter to find records to delete */
  filter: DriverShiftRuleDeleteFilter;
};

export type DeleteManyResponse = {
  __typename?: 'DeleteManyResponse';
  /** The number of records deleted. */
  deletedCount: Scalars['Int']['output'];
};

export type DeleteManySmsInput = {
  /** Filter to find records to delete */
  filter: SmsDeleteFilter;
};

export type DeleteManySmsProvidersInput = {
  /** Filter to find records to delete */
  filter: SmsProviderDeleteFilter;
};

export type DeleteOneAnnouncementInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneCampaignInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneCarColorInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneCarModelInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneCouponInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneCustomerSessionInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneDriverDocumentInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneDriverDocumentRetentionPolicyInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneDriverSessionInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneDriverShiftRuleInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneDriverToDriverDocumentInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneFeedbackParameterInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneFleetInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneFleetStaffInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneItemCategoryInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneItemInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneOperatorInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneOperatorRoleInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneOrderCancelReasonInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneParkingFeedbackParameterInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOnePaymentGatewayInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOnePayoutMethodInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneRegionCategoryInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneRegionInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneRewardInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneSmsInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneSmsProviderInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneSosReasonInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneSavedPaymentMethodInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneServiceCategoryInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneServiceInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneServiceOptionInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneShopCategoryInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneShopDeliveryZoneInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneShopFeedbackParameterInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneShopInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneShopItemPresetInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneZonePriceCategoryInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneZonePriceInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export enum DeliveryMethod {
  Batch = 'BATCH',
  Scheduled = 'SCHEDULED',
  Split = 'SPLIT'
}

export type DeliveryMethodFilterComparison = {
  eq?: InputMaybe<DeliveryMethod>;
  gt?: InputMaybe<DeliveryMethod>;
  gte?: InputMaybe<DeliveryMethod>;
  iLike?: InputMaybe<DeliveryMethod>;
  in?: InputMaybe<Array<DeliveryMethod>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<DeliveryMethod>;
  lt?: InputMaybe<DeliveryMethod>;
  lte?: InputMaybe<DeliveryMethod>;
  neq?: InputMaybe<DeliveryMethod>;
  notILike?: InputMaybe<DeliveryMethod>;
  notIn?: InputMaybe<Array<DeliveryMethod>>;
  notLike?: InputMaybe<DeliveryMethod>;
};

export enum DeliveryPackageSize {
  Large = 'Large',
  Medium = 'Medium',
  Small = 'Small'
}

export type DeliveryPackageSizeFilterComparison = {
  eq?: InputMaybe<DeliveryPackageSize>;
  gt?: InputMaybe<DeliveryPackageSize>;
  gte?: InputMaybe<DeliveryPackageSize>;
  iLike?: InputMaybe<DeliveryPackageSize>;
  in?: InputMaybe<Array<DeliveryPackageSize>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<DeliveryPackageSize>;
  lt?: InputMaybe<DeliveryPackageSize>;
  lte?: InputMaybe<DeliveryPackageSize>;
  neq?: InputMaybe<DeliveryPackageSize>;
  notILike?: InputMaybe<DeliveryPackageSize>;
  notIn?: InputMaybe<Array<DeliveryPackageSize>>;
  notLike?: InputMaybe<DeliveryPackageSize>;
};

export enum DevicePlatform {
  Android = 'Android',
  Ios = 'Ios',
  Linux = 'Linux',
  MacOs = 'MacOS',
  Web = 'Web',
  Windows = 'Windows'
}

export enum DeviceType {
  Desktop = 'DESKTOP',
  Mobile = 'MOBILE'
}

export type DispatcherShop = {
  __typename?: 'DispatcherShop';
  address: Scalars['String']['output'];
  carts: ShopCartsConnection;
  cartsAggregate: Array<ShopCartsAggregateResponse>;
  categories: Array<ShopCategory>;
  categoriesAggregate: Array<ShopCategoriesAggregateResponse>;
  createdAt: Scalars['DateTime']['output'];
  currency: Scalars['String']['output'];
  deliveryFee: Scalars['Float']['output'];
  description?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  /** The percentage of the delivery fee that shop pays so the delivery fee would be more appealing to the users. */
  expressDeliveryShopCommission: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  image?: Maybe<Media>;
  isCashOnDeliveryAvailable: Scalars['Boolean']['output'];
  isExpressDeliveryAvailable: Scalars['Boolean']['output'];
  isOnlinePaymentAvailable: Scalars['Boolean']['output'];
  isShopDeliveryAvailable: Scalars['Boolean']['output'];
  itemPresets: Array<ShopItemPreset>;
  itemPresetsAggregate: Array<ShopItemPresetsAggregateResponse>;
  lastActivityAt?: Maybe<Scalars['DateTime']['output']>;
  location: Point;
  maxDeliveryTime: Scalars['Int']['output'];
  minDeliveryTime: Scalars['Int']['output'];
  minimumOrderAmount: Scalars['Float']['output'];
  mobileNumber: PhoneNumber;
  name: Scalars['String']['output'];
  orderQueueLevel: OrderQueueLevel;
  ownerInformation: PersonalInfo;
  password?: Maybe<Scalars['String']['output']>;
  ratingAggregate?: Maybe<RatingAggregate>;
  sessions: Array<ShopSession>;
  sessionsAggregate: Array<ShopSessionsAggregateResponse>;
  status: ShopStatus;
  wallet: Array<ShopWallet>;
  walletAggregate: Array<ShopWalletAggregateResponse>;
  weeklySchedule: Array<WeekdaySchedule>;
};


export type DispatcherShopCartsArgs = {
  filter?: ShopOrderCartFilter;
  paging?: OffsetPaging;
  sorting?: Array<ShopOrderCartSort>;
};


export type DispatcherShopCartsAggregateArgs = {
  filter?: InputMaybe<ShopOrderCartAggregateFilter>;
};


export type DispatcherShopCategoriesArgs = {
  filter?: ShopCategoryFilter;
  sorting?: Array<ShopCategorySort>;
};


export type DispatcherShopCategoriesAggregateArgs = {
  filter?: InputMaybe<ShopCategoryAggregateFilter>;
};


export type DispatcherShopItemPresetsArgs = {
  filter?: ShopItemPresetFilter;
  sorting?: Array<ShopItemPresetSort>;
};


export type DispatcherShopItemPresetsAggregateArgs = {
  filter?: InputMaybe<ShopItemPresetAggregateFilter>;
};


export type DispatcherShopSessionsArgs = {
  filter?: ShopSessionFilter;
  sorting?: Array<ShopSessionSort>;
};


export type DispatcherShopSessionsAggregateArgs = {
  filter?: InputMaybe<ShopSessionAggregateFilter>;
};


export type DispatcherShopWalletArgs = {
  filter?: ShopWalletFilter;
  sorting?: Array<ShopWalletSort>;
};


export type DispatcherShopWalletAggregateArgs = {
  filter?: InputMaybe<ShopWalletAggregateFilter>;
};

export type DistanceMultiplier = {
  __typename?: 'DistanceMultiplier';
  distanceFrom: Scalars['Float']['output'];
  distanceTo: Scalars['Float']['output'];
  multiply: Scalars['Float']['output'];
};

export type DistanceMultiplierInput = {
  distanceFrom: Scalars['Float']['input'];
  distanceTo: Scalars['Float']['input'];
  multiply: Scalars['Float']['input'];
};

export type DistressSignal = {
  __typename?: 'DistressSignal';
  activities: Array<SosActivity>;
  activitiesAggregate: Array<DistressSignalActivitiesAggregateResponse>;
  comment?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  location?: Maybe<Point>;
  order: Order;
  reason?: Maybe<SosReason>;
  requestId: Scalars['ID']['output'];
  status: SosStatus;
  submittedByRider: Scalars['Boolean']['output'];
};


export type DistressSignalActivitiesArgs = {
  filter?: SosActivityFilter;
  sorting?: Array<SosActivitySort>;
};


export type DistressSignalActivitiesAggregateArgs = {
  filter?: InputMaybe<SosActivityAggregateFilter>;
};

export type DistressSignalActivitiesAggregateGroupBy = {
  __typename?: 'DistressSignalActivitiesAggregateGroupBy';
  id?: Maybe<Scalars['ID']['output']>;
};

export type DistressSignalActivitiesAggregateResponse = {
  __typename?: 'DistressSignalActivitiesAggregateResponse';
  avg?: Maybe<DistressSignalActivitiesAvgAggregate>;
  count?: Maybe<DistressSignalActivitiesCountAggregate>;
  groupBy?: Maybe<DistressSignalActivitiesAggregateGroupBy>;
  max?: Maybe<DistressSignalActivitiesMaxAggregate>;
  min?: Maybe<DistressSignalActivitiesMinAggregate>;
  sum?: Maybe<DistressSignalActivitiesSumAggregate>;
};

export type DistressSignalActivitiesAvgAggregate = {
  __typename?: 'DistressSignalActivitiesAvgAggregate';
  id?: Maybe<Scalars['Float']['output']>;
};

export type DistressSignalActivitiesCountAggregate = {
  __typename?: 'DistressSignalActivitiesCountAggregate';
  id?: Maybe<Scalars['Int']['output']>;
};

export type DistressSignalActivitiesMaxAggregate = {
  __typename?: 'DistressSignalActivitiesMaxAggregate';
  id?: Maybe<Scalars['ID']['output']>;
};

export type DistressSignalActivitiesMinAggregate = {
  __typename?: 'DistressSignalActivitiesMinAggregate';
  id?: Maybe<Scalars['ID']['output']>;
};

export type DistressSignalActivitiesSumAggregate = {
  __typename?: 'DistressSignalActivitiesSumAggregate';
  id?: Maybe<Scalars['Float']['output']>;
};

export type DistressSignalAggregateFilter = {
  and?: InputMaybe<Array<DistressSignalAggregateFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<DistressSignalAggregateFilter>>;
  status?: InputMaybe<SosStatusFilterComparison>;
};

export type DistressSignalAggregateGroupBy = {
  __typename?: 'DistressSignalAggregateGroupBy';
  id?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<SosStatus>;
};

export type DistressSignalAggregateResponse = {
  __typename?: 'DistressSignalAggregateResponse';
  avg?: Maybe<DistressSignalAvgAggregate>;
  count?: Maybe<DistressSignalCountAggregate>;
  groupBy?: Maybe<DistressSignalAggregateGroupBy>;
  max?: Maybe<DistressSignalMaxAggregate>;
  min?: Maybe<DistressSignalMinAggregate>;
  sum?: Maybe<DistressSignalSumAggregate>;
};

export type DistressSignalAvgAggregate = {
  __typename?: 'DistressSignalAvgAggregate';
  id?: Maybe<Scalars['Float']['output']>;
};

export type DistressSignalConnection = {
  __typename?: 'DistressSignalConnection';
  /** Array of nodes. */
  nodes: Array<DistressSignal>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type DistressSignalCountAggregate = {
  __typename?: 'DistressSignalCountAggregate';
  id?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
};

export type DistressSignalFilter = {
  and?: InputMaybe<Array<DistressSignalFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<DistressSignalFilter>>;
  status?: InputMaybe<SosStatusFilterComparison>;
};

export type DistressSignalMaxAggregate = {
  __typename?: 'DistressSignalMaxAggregate';
  id?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<SosStatus>;
};

export type DistressSignalMinAggregate = {
  __typename?: 'DistressSignalMinAggregate';
  id?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<SosStatus>;
};

export type DistressSignalSort = {
  direction: SortDirection;
  field: DistressSignalSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum DistressSignalSortFields {
  Id = 'id',
  Status = 'status'
}

export type DistressSignalSumAggregate = {
  __typename?: 'DistressSignalSumAggregate';
  id?: Maybe<Scalars['Float']['output']>;
};

export type Driver = {
  __typename?: 'Driver';
  accountNumber?: Maybe<Scalars['String']['output']>;
  address?: Maybe<Scalars['String']['output']>;
  bankName?: Maybe<Scalars['String']['output']>;
  bankRoutingNumber?: Maybe<Scalars['String']['output']>;
  bankSwift?: Maybe<Scalars['String']['output']>;
  canDeliver: Scalars['Boolean']['output'];
  carColorId?: Maybe<Scalars['ID']['output']>;
  carId?: Maybe<Scalars['ID']['output']>;
  carPlate?: Maybe<Scalars['String']['output']>;
  carProductionYear?: Maybe<Scalars['Int']['output']>;
  certificateNumber?: Maybe<Scalars['String']['output']>;
  countryIso?: Maybe<Scalars['String']['output']>;
  driverToDriverDocuments: Array<DriverToDriverDocument>;
  driverToDriverDocumentsAggregate: Array<DriverDriverToDriverDocumentsAggregateResponse>;
  email?: Maybe<Scalars['String']['output']>;
  enabledServices: Array<DriverServicesServiceDto>;
  enabledServicesAggregate: Array<DriverEnabledServicesAggregateResponse>;
  feedbacks: DriverFeedbacksConnection;
  feedbacksAggregate: Array<DriverFeedbacksAggregateResponse>;
  firstName?: Maybe<Scalars['String']['output']>;
  fleetId?: Maybe<Scalars['ID']['output']>;
  gender?: Maybe<Gender>;
  id: Scalars['ID']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  lastSeenTimestamp?: Maybe<Scalars['DateTime']['output']>;
  maxDeliveryPackageSize: DeliveryPackageSize;
  media?: Maybe<Media>;
  mediaId?: Maybe<Scalars['ID']['output']>;
  mobileNumber: Scalars['String']['output'];
  orders: DriverOrdersConnection;
  ordersAggregate: Array<DriverOrdersAggregateResponse>;
  payoutAccounts: DriverPayoutAccountsConnection;
  payoutAccountsAggregate: Array<DriverPayoutAccountsAggregateResponse>;
  rating?: Maybe<Scalars['Int']['output']>;
  registrationTimestamp: Scalars['DateTime']['output'];
  reviewCount: Scalars['Int']['output'];
  sessions: Array<DriverSession>;
  sessionsAggregate: Array<DriverSessionsAggregateResponse>;
  softRejectionNote?: Maybe<Scalars['String']['output']>;
  status: DriverStatus;
  transactions: DriverTransactionsConnection;
  transactionsAggregate: Array<DriverTransactionsAggregateResponse>;
  wallet: Array<DriverWallet>;
  walletAggregate: Array<DriverWalletAggregateResponse>;
};


export type DriverDriverToDriverDocumentsArgs = {
  filter?: DriverToDriverDocumentFilter;
  sorting?: Array<DriverToDriverDocumentSort>;
};


export type DriverDriverToDriverDocumentsAggregateArgs = {
  filter?: InputMaybe<DriverToDriverDocumentAggregateFilter>;
};


export type DriverEnabledServicesArgs = {
  filter?: DriverServicesServiceDtoFilter;
  sorting?: Array<DriverServicesServiceDtoSort>;
};


export type DriverEnabledServicesAggregateArgs = {
  filter?: InputMaybe<DriverServicesServiceDtoAggregateFilter>;
};


export type DriverFeedbacksArgs = {
  filter?: FeedbackFilter;
  paging?: OffsetPaging;
  sorting?: Array<FeedbackSort>;
};


export type DriverFeedbacksAggregateArgs = {
  filter?: InputMaybe<FeedbackAggregateFilter>;
};


export type DriverOrdersArgs = {
  filter?: OrderFilter;
  paging?: OffsetPaging;
  sorting?: Array<OrderSort>;
};


export type DriverOrdersAggregateArgs = {
  filter?: InputMaybe<OrderAggregateFilter>;
};


export type DriverPayoutAccountsArgs = {
  filter?: PayoutAccountFilter;
  paging?: OffsetPaging;
  sorting?: Array<PayoutAccountSort>;
};


export type DriverPayoutAccountsAggregateArgs = {
  filter?: InputMaybe<PayoutAccountAggregateFilter>;
};


export type DriverSessionsArgs = {
  filter?: DriverSessionFilter;
  sorting?: Array<DriverSessionSort>;
};


export type DriverSessionsAggregateArgs = {
  filter?: InputMaybe<DriverSessionAggregateFilter>;
};


export type DriverTransactionsArgs = {
  filter?: DriverTransactionFilter;
  paging?: OffsetPaging;
  sorting?: Array<DriverTransactionSort>;
};


export type DriverTransactionsAggregateArgs = {
  filter?: InputMaybe<DriverTransactionAggregateFilter>;
};


export type DriverWalletArgs = {
  filter?: DriverWalletFilter;
  sorting?: Array<DriverWalletSort>;
};


export type DriverWalletAggregateArgs = {
  filter?: InputMaybe<DriverWalletAggregateFilter>;
};

export type DriverAggregateFilter = {
  and?: InputMaybe<Array<DriverAggregateFilter>>;
  carColorId?: InputMaybe<IdFilterComparison>;
  carId?: InputMaybe<IdFilterComparison>;
  fleetId?: InputMaybe<IdFilterComparison>;
  gender?: InputMaybe<GenderFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  lastName?: InputMaybe<StringFieldComparison>;
  maxDeliveryPackageSize?: InputMaybe<DeliveryPackageSizeFilterComparison>;
  mobileNumber?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<DriverAggregateFilter>>;
  rating?: InputMaybe<IntFieldComparison>;
  reviewCount?: InputMaybe<IntFieldComparison>;
  status?: InputMaybe<DriverStatusFilterComparison>;
};

export type DriverAggregateGroupBy = {
  __typename?: 'DriverAggregateGroupBy';
  carColorId?: Maybe<Scalars['ID']['output']>;
  carId?: Maybe<Scalars['ID']['output']>;
  fleetId?: Maybe<Scalars['ID']['output']>;
  gender?: Maybe<Gender>;
  id?: Maybe<Scalars['ID']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  maxDeliveryPackageSize?: Maybe<DeliveryPackageSize>;
  mobileNumber?: Maybe<Scalars['String']['output']>;
  rating?: Maybe<Scalars['Int']['output']>;
  reviewCount?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<DriverStatus>;
};

export type DriverAggregateResponse = {
  __typename?: 'DriverAggregateResponse';
  avg?: Maybe<DriverAvgAggregate>;
  count?: Maybe<DriverCountAggregate>;
  groupBy?: Maybe<DriverAggregateGroupBy>;
  max?: Maybe<DriverMaxAggregate>;
  min?: Maybe<DriverMinAggregate>;
  sum?: Maybe<DriverSumAggregate>;
};

export type DriverAvgAggregate = {
  __typename?: 'DriverAvgAggregate';
  carColorId?: Maybe<Scalars['Float']['output']>;
  carId?: Maybe<Scalars['Float']['output']>;
  fleetId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  rating?: Maybe<Scalars['Float']['output']>;
  reviewCount?: Maybe<Scalars['Float']['output']>;
};

export type DriverConnection = {
  __typename?: 'DriverConnection';
  /** Array of nodes. */
  nodes: Array<Driver>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type DriverCountAggregate = {
  __typename?: 'DriverCountAggregate';
  carColorId?: Maybe<Scalars['Int']['output']>;
  carId?: Maybe<Scalars['Int']['output']>;
  fleetId?: Maybe<Scalars['Int']['output']>;
  gender?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  lastName?: Maybe<Scalars['Int']['output']>;
  maxDeliveryPackageSize?: Maybe<Scalars['Int']['output']>;
  mobileNumber?: Maybe<Scalars['Int']['output']>;
  rating?: Maybe<Scalars['Int']['output']>;
  reviewCount?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
};

export enum DriverDeductTransactionType {
  Commission = 'Commission',
  Correction = 'Correction',
  Withdraw = 'Withdraw'
}

export type DriverDocument = {
  __typename?: 'DriverDocument';
  hasExpiryDate: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  isEnabled: Scalars['Boolean']['output'];
  isRequired: Scalars['Boolean']['output'];
  notificationDaysBeforeExpiry: Scalars['Int']['output'];
  numberOfImages: Scalars['Int']['output'];
  retentionPolicies: Array<DriverDocumentRetentionPolicy>;
  title: Scalars['String']['output'];
};


export type DriverDocumentRetentionPoliciesArgs = {
  filter?: DriverDocumentRetentionPolicyFilter;
  sorting?: Array<DriverDocumentRetentionPolicySort>;
};

export type DriverDocumentDeleteFilter = {
  and?: InputMaybe<Array<DriverDocumentDeleteFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<DriverDocumentDeleteFilter>>;
};

export type DriverDocumentDeleteResponse = {
  __typename?: 'DriverDocumentDeleteResponse';
  hasExpiryDate?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  isEnabled?: Maybe<Scalars['Boolean']['output']>;
  isRequired?: Maybe<Scalars['Boolean']['output']>;
  notificationDaysBeforeExpiry?: Maybe<Scalars['Int']['output']>;
  numberOfImages?: Maybe<Scalars['Int']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type DriverDocumentFilter = {
  and?: InputMaybe<Array<DriverDocumentFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<DriverDocumentFilter>>;
};

export type DriverDocumentInput = {
  hasExpiryDate: Scalars['Boolean']['input'];
  isEnabled: Scalars['Boolean']['input'];
  isRequired: Scalars['Boolean']['input'];
  notificationDaysBeforeExpiry: Scalars['Int']['input'];
  numberOfImages: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};

export type DriverDocumentRetentionPolicy = {
  __typename?: 'DriverDocumentRetentionPolicy';
  deleteAfterDays: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
};

export type DriverDocumentRetentionPolicyConnection = {
  __typename?: 'DriverDocumentRetentionPolicyConnection';
  /** Array of edges. */
  edges: Array<DriverDocumentRetentionPolicyEdge>;
  /** Paging information */
  pageInfo: PageInfo;
};

export type DriverDocumentRetentionPolicyDeleteFilter = {
  and?: InputMaybe<Array<DriverDocumentRetentionPolicyDeleteFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<DriverDocumentRetentionPolicyDeleteFilter>>;
};

export type DriverDocumentRetentionPolicyDeleteResponse = {
  __typename?: 'DriverDocumentRetentionPolicyDeleteResponse';
  deleteAfterDays?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type DriverDocumentRetentionPolicyEdge = {
  __typename?: 'DriverDocumentRetentionPolicyEdge';
  /** Cursor for this node. */
  cursor: Scalars['ConnectionCursor']['output'];
  /** The node containing the DriverDocumentRetentionPolicy */
  node: DriverDocumentRetentionPolicy;
};

export type DriverDocumentRetentionPolicyFilter = {
  and?: InputMaybe<Array<DriverDocumentRetentionPolicyFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<DriverDocumentRetentionPolicyFilter>>;
};

export type DriverDocumentRetentionPolicyInput = {
  deleteAfterDays: Scalars['Int']['input'];
  driverDocumentId: Scalars['ID']['input'];
  title: Scalars['String']['input'];
};

export type DriverDocumentRetentionPolicySort = {
  direction: SortDirection;
  field: DriverDocumentRetentionPolicySortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum DriverDocumentRetentionPolicySortFields {
  Id = 'id'
}

export type DriverDocumentRetentionPolicyUpdateFilter = {
  and?: InputMaybe<Array<DriverDocumentRetentionPolicyUpdateFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<DriverDocumentRetentionPolicyUpdateFilter>>;
};

export type DriverDocumentSort = {
  direction: SortDirection;
  field: DriverDocumentSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum DriverDocumentSortFields {
  Id = 'id'
}

export type DriverDocumentUpdateFilter = {
  and?: InputMaybe<Array<DriverDocumentUpdateFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<DriverDocumentUpdateFilter>>;
};

export type DriverDriverToDriverDocumentsAggregateGroupBy = {
  __typename?: 'DriverDriverToDriverDocumentsAggregateGroupBy';
  driverId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type DriverDriverToDriverDocumentsAggregateResponse = {
  __typename?: 'DriverDriverToDriverDocumentsAggregateResponse';
  avg?: Maybe<DriverDriverToDriverDocumentsAvgAggregate>;
  count?: Maybe<DriverDriverToDriverDocumentsCountAggregate>;
  groupBy?: Maybe<DriverDriverToDriverDocumentsAggregateGroupBy>;
  max?: Maybe<DriverDriverToDriverDocumentsMaxAggregate>;
  min?: Maybe<DriverDriverToDriverDocumentsMinAggregate>;
  sum?: Maybe<DriverDriverToDriverDocumentsSumAggregate>;
};

export type DriverDriverToDriverDocumentsAvgAggregate = {
  __typename?: 'DriverDriverToDriverDocumentsAvgAggregate';
  driverId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

export type DriverDriverToDriverDocumentsCountAggregate = {
  __typename?: 'DriverDriverToDriverDocumentsCountAggregate';
  driverId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
};

export type DriverDriverToDriverDocumentsMaxAggregate = {
  __typename?: 'DriverDriverToDriverDocumentsMaxAggregate';
  driverId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type DriverDriverToDriverDocumentsMinAggregate = {
  __typename?: 'DriverDriverToDriverDocumentsMinAggregate';
  driverId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type DriverDriverToDriverDocumentsSumAggregate = {
  __typename?: 'DriverDriverToDriverDocumentsSumAggregate';
  driverId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

export type DriverEnabledServicesAggregateGroupBy = {
  __typename?: 'DriverEnabledServicesAggregateGroupBy';
  driverId?: Maybe<Scalars['ID']['output']>;
  serviceId?: Maybe<Scalars['ID']['output']>;
};

export type DriverEnabledServicesAggregateResponse = {
  __typename?: 'DriverEnabledServicesAggregateResponse';
  avg?: Maybe<DriverEnabledServicesAvgAggregate>;
  count?: Maybe<DriverEnabledServicesCountAggregate>;
  groupBy?: Maybe<DriverEnabledServicesAggregateGroupBy>;
  max?: Maybe<DriverEnabledServicesMaxAggregate>;
  min?: Maybe<DriverEnabledServicesMinAggregate>;
  sum?: Maybe<DriverEnabledServicesSumAggregate>;
};

export type DriverEnabledServicesAvgAggregate = {
  __typename?: 'DriverEnabledServicesAvgAggregate';
  driverId?: Maybe<Scalars['Float']['output']>;
  serviceId?: Maybe<Scalars['Float']['output']>;
};

export type DriverEnabledServicesCountAggregate = {
  __typename?: 'DriverEnabledServicesCountAggregate';
  driverId?: Maybe<Scalars['Int']['output']>;
  serviceId?: Maybe<Scalars['Int']['output']>;
};

export type DriverEnabledServicesMaxAggregate = {
  __typename?: 'DriverEnabledServicesMaxAggregate';
  driverId?: Maybe<Scalars['ID']['output']>;
  serviceId?: Maybe<Scalars['ID']['output']>;
};

export type DriverEnabledServicesMinAggregate = {
  __typename?: 'DriverEnabledServicesMinAggregate';
  driverId?: Maybe<Scalars['ID']['output']>;
  serviceId?: Maybe<Scalars['ID']['output']>;
};

export type DriverEnabledServicesSumAggregate = {
  __typename?: 'DriverEnabledServicesSumAggregate';
  driverId?: Maybe<Scalars['Float']['output']>;
  serviceId?: Maybe<Scalars['Float']['output']>;
};

export type DriverFeedbacksAggregateGroupBy = {
  __typename?: 'DriverFeedbacksAggregateGroupBy';
  driverId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  requestId?: Maybe<Scalars['ID']['output']>;
};

export type DriverFeedbacksAggregateResponse = {
  __typename?: 'DriverFeedbacksAggregateResponse';
  avg?: Maybe<DriverFeedbacksAvgAggregate>;
  count?: Maybe<DriverFeedbacksCountAggregate>;
  groupBy?: Maybe<DriverFeedbacksAggregateGroupBy>;
  max?: Maybe<DriverFeedbacksMaxAggregate>;
  min?: Maybe<DriverFeedbacksMinAggregate>;
  sum?: Maybe<DriverFeedbacksSumAggregate>;
};

export type DriverFeedbacksAvgAggregate = {
  __typename?: 'DriverFeedbacksAvgAggregate';
  driverId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  requestId?: Maybe<Scalars['Float']['output']>;
};

export type DriverFeedbacksConnection = {
  __typename?: 'DriverFeedbacksConnection';
  /** Array of nodes. */
  nodes: Array<Feedback>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type DriverFeedbacksCountAggregate = {
  __typename?: 'DriverFeedbacksCountAggregate';
  driverId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  requestId?: Maybe<Scalars['Int']['output']>;
};

export type DriverFeedbacksMaxAggregate = {
  __typename?: 'DriverFeedbacksMaxAggregate';
  driverId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  requestId?: Maybe<Scalars['ID']['output']>;
};

export type DriverFeedbacksMinAggregate = {
  __typename?: 'DriverFeedbacksMinAggregate';
  driverId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  requestId?: Maybe<Scalars['ID']['output']>;
};

export type DriverFeedbacksSumAggregate = {
  __typename?: 'DriverFeedbacksSumAggregate';
  driverId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  requestId?: Maybe<Scalars['Float']['output']>;
};

export type DriverFilter = {
  and?: InputMaybe<Array<DriverFilter>>;
  carColorId?: InputMaybe<IdFilterComparison>;
  carId?: InputMaybe<IdFilterComparison>;
  fleetId?: InputMaybe<IdFilterComparison>;
  gender?: InputMaybe<GenderFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  lastName?: InputMaybe<StringFieldComparison>;
  maxDeliveryPackageSize?: InputMaybe<DeliveryPackageSizeFilterComparison>;
  mobileNumber?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<DriverFilter>>;
  rating?: InputMaybe<IntFieldComparison>;
  reviewCount?: InputMaybe<IntFieldComparison>;
  status?: InputMaybe<DriverStatusFilterComparison>;
};

export type DriverMaxAggregate = {
  __typename?: 'DriverMaxAggregate';
  carColorId?: Maybe<Scalars['ID']['output']>;
  carId?: Maybe<Scalars['ID']['output']>;
  fleetId?: Maybe<Scalars['ID']['output']>;
  gender?: Maybe<Gender>;
  id?: Maybe<Scalars['ID']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  maxDeliveryPackageSize?: Maybe<DeliveryPackageSize>;
  mobileNumber?: Maybe<Scalars['String']['output']>;
  rating?: Maybe<Scalars['Int']['output']>;
  reviewCount?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<DriverStatus>;
};

export type DriverMinAggregate = {
  __typename?: 'DriverMinAggregate';
  carColorId?: Maybe<Scalars['ID']['output']>;
  carId?: Maybe<Scalars['ID']['output']>;
  fleetId?: Maybe<Scalars['ID']['output']>;
  gender?: Maybe<Gender>;
  id?: Maybe<Scalars['ID']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  maxDeliveryPackageSize?: Maybe<DeliveryPackageSize>;
  mobileNumber?: Maybe<Scalars['String']['output']>;
  rating?: Maybe<Scalars['Int']['output']>;
  reviewCount?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<DriverStatus>;
};

export type DriverNote = {
  __typename?: 'DriverNote';
  createdAt: Scalars['DateTime']['output'];
  driverId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  note: Scalars['String']['output'];
  staff: Operator;
};

export type DriverNoteConnection = {
  __typename?: 'DriverNoteConnection';
  /** Array of nodes. */
  nodes: Array<DriverNote>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
};

export type DriverNoteFilter = {
  and?: InputMaybe<Array<DriverNoteFilter>>;
  driverId: IdFilterComparison;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<DriverNoteFilter>>;
};

export type DriverNoteSort = {
  direction: SortDirection;
  field: DriverNoteSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum DriverNoteSortFields {
  DriverId = 'driverId',
  Id = 'id'
}

export type DriverOrdersAggregateGroupBy = {
  __typename?: 'DriverOrdersAggregateGroupBy';
  costAfterCoupon?: Maybe<Scalars['Float']['output']>;
  costBest?: Maybe<Scalars['Float']['output']>;
  createdOn?: Maybe<Scalars['DateTime']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  distanceBest?: Maybe<Scalars['Int']['output']>;
  driverId?: Maybe<Scalars['ID']['output']>;
  durationBest?: Maybe<Scalars['Int']['output']>;
  fleetId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  paymentMode?: Maybe<PaymentMode>;
  regionId?: Maybe<Scalars['ID']['output']>;
  riderId?: Maybe<Scalars['ID']['output']>;
  serviceId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<OrderStatus>;
};

export type DriverOrdersAggregateResponse = {
  __typename?: 'DriverOrdersAggregateResponse';
  avg?: Maybe<DriverOrdersAvgAggregate>;
  count?: Maybe<DriverOrdersCountAggregate>;
  groupBy?: Maybe<DriverOrdersAggregateGroupBy>;
  max?: Maybe<DriverOrdersMaxAggregate>;
  min?: Maybe<DriverOrdersMinAggregate>;
  sum?: Maybe<DriverOrdersSumAggregate>;
};

export type DriverOrdersAvgAggregate = {
  __typename?: 'DriverOrdersAvgAggregate';
  costAfterCoupon?: Maybe<Scalars['Float']['output']>;
  costBest?: Maybe<Scalars['Float']['output']>;
  distanceBest?: Maybe<Scalars['Float']['output']>;
  driverId?: Maybe<Scalars['Float']['output']>;
  durationBest?: Maybe<Scalars['Float']['output']>;
  fleetId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  regionId?: Maybe<Scalars['Float']['output']>;
  riderId?: Maybe<Scalars['Float']['output']>;
  serviceId?: Maybe<Scalars['Float']['output']>;
};

export type DriverOrdersConnection = {
  __typename?: 'DriverOrdersConnection';
  /** Array of nodes. */
  nodes: Array<Order>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type DriverOrdersCountAggregate = {
  __typename?: 'DriverOrdersCountAggregate';
  costAfterCoupon?: Maybe<Scalars['Int']['output']>;
  costBest?: Maybe<Scalars['Int']['output']>;
  createdOn?: Maybe<Scalars['Int']['output']>;
  currency?: Maybe<Scalars['Int']['output']>;
  distanceBest?: Maybe<Scalars['Int']['output']>;
  driverId?: Maybe<Scalars['Int']['output']>;
  durationBest?: Maybe<Scalars['Int']['output']>;
  fleetId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  paymentMode?: Maybe<Scalars['Int']['output']>;
  regionId?: Maybe<Scalars['Int']['output']>;
  riderId?: Maybe<Scalars['Int']['output']>;
  serviceId?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
};

export type DriverOrdersMaxAggregate = {
  __typename?: 'DriverOrdersMaxAggregate';
  costAfterCoupon?: Maybe<Scalars['Float']['output']>;
  costBest?: Maybe<Scalars['Float']['output']>;
  createdOn?: Maybe<Scalars['DateTime']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  distanceBest?: Maybe<Scalars['Int']['output']>;
  driverId?: Maybe<Scalars['ID']['output']>;
  durationBest?: Maybe<Scalars['Int']['output']>;
  fleetId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  paymentMode?: Maybe<PaymentMode>;
  regionId?: Maybe<Scalars['ID']['output']>;
  riderId?: Maybe<Scalars['ID']['output']>;
  serviceId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<OrderStatus>;
};

export type DriverOrdersMinAggregate = {
  __typename?: 'DriverOrdersMinAggregate';
  costAfterCoupon?: Maybe<Scalars['Float']['output']>;
  costBest?: Maybe<Scalars['Float']['output']>;
  createdOn?: Maybe<Scalars['DateTime']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  distanceBest?: Maybe<Scalars['Int']['output']>;
  driverId?: Maybe<Scalars['ID']['output']>;
  durationBest?: Maybe<Scalars['Int']['output']>;
  fleetId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  paymentMode?: Maybe<PaymentMode>;
  regionId?: Maybe<Scalars['ID']['output']>;
  riderId?: Maybe<Scalars['ID']['output']>;
  serviceId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<OrderStatus>;
};

export type DriverOrdersSumAggregate = {
  __typename?: 'DriverOrdersSumAggregate';
  costAfterCoupon?: Maybe<Scalars['Float']['output']>;
  costBest?: Maybe<Scalars['Float']['output']>;
  distanceBest?: Maybe<Scalars['Float']['output']>;
  driverId?: Maybe<Scalars['Float']['output']>;
  durationBest?: Maybe<Scalars['Float']['output']>;
  fleetId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  regionId?: Maybe<Scalars['Float']['output']>;
  riderId?: Maybe<Scalars['Float']['output']>;
  serviceId?: Maybe<Scalars['Float']['output']>;
};

export type DriverPayoutAccountsAggregateGroupBy = {
  __typename?: 'DriverPayoutAccountsAggregateGroupBy';
  id?: Maybe<Scalars['ID']['output']>;
  isDefault?: Maybe<Scalars['Boolean']['output']>;
};

export type DriverPayoutAccountsAggregateResponse = {
  __typename?: 'DriverPayoutAccountsAggregateResponse';
  avg?: Maybe<DriverPayoutAccountsAvgAggregate>;
  count?: Maybe<DriverPayoutAccountsCountAggregate>;
  groupBy?: Maybe<DriverPayoutAccountsAggregateGroupBy>;
  max?: Maybe<DriverPayoutAccountsMaxAggregate>;
  min?: Maybe<DriverPayoutAccountsMinAggregate>;
  sum?: Maybe<DriverPayoutAccountsSumAggregate>;
};

export type DriverPayoutAccountsAvgAggregate = {
  __typename?: 'DriverPayoutAccountsAvgAggregate';
  id?: Maybe<Scalars['Float']['output']>;
};

export type DriverPayoutAccountsConnection = {
  __typename?: 'DriverPayoutAccountsConnection';
  /** Array of nodes. */
  nodes: Array<PayoutAccount>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type DriverPayoutAccountsCountAggregate = {
  __typename?: 'DriverPayoutAccountsCountAggregate';
  id?: Maybe<Scalars['Int']['output']>;
  isDefault?: Maybe<Scalars['Int']['output']>;
};

export type DriverPayoutAccountsMaxAggregate = {
  __typename?: 'DriverPayoutAccountsMaxAggregate';
  id?: Maybe<Scalars['ID']['output']>;
};

export type DriverPayoutAccountsMinAggregate = {
  __typename?: 'DriverPayoutAccountsMinAggregate';
  id?: Maybe<Scalars['ID']['output']>;
};

export type DriverPayoutAccountsSumAggregate = {
  __typename?: 'DriverPayoutAccountsSumAggregate';
  id?: Maybe<Scalars['Float']['output']>;
};

export type DriverPendingVerificationNotification = {
  __typename?: 'DriverPendingVerificationNotification';
  appType: AppType;
  createdAt: Scalars['DateTime']['output'];
  driverPendingVerification: Driver;
  id: Scalars['ID']['output'];
  readAt?: Maybe<Scalars['DateTime']['output']>;
  type: AdminNotificationType;
};

export enum DriverRechargeTransactionType {
  BankTransfer = 'BankTransfer',
  Gift = 'Gift',
  InAppPayment = 'InAppPayment',
  OrderFee = 'OrderFee'
}

export type DriverServicesServiceDto = {
  __typename?: 'DriverServicesServiceDTO';
  driverEnabled: Scalars['Boolean']['output'];
  driverId: Scalars['ID']['output'];
  service: Service;
  serviceId: Scalars['ID']['output'];
};

export type DriverServicesServiceDtoAggregateFilter = {
  and?: InputMaybe<Array<DriverServicesServiceDtoAggregateFilter>>;
  driverId?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<DriverServicesServiceDtoAggregateFilter>>;
  serviceId?: InputMaybe<IdFilterComparison>;
};

export type DriverServicesServiceDtoFilter = {
  and?: InputMaybe<Array<DriverServicesServiceDtoFilter>>;
  driverId?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<DriverServicesServiceDtoFilter>>;
  serviceId?: InputMaybe<IdFilterComparison>;
};

export type DriverServicesServiceDtoSort = {
  direction: SortDirection;
  field: DriverServicesServiceDtoSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum DriverServicesServiceDtoSortFields {
  DriverId = 'driverId',
  ServiceId = 'serviceId'
}

export type DriverSession = {
  __typename?: 'DriverSession';
  driverId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  sessionInfo: SessionInfo;
};

export type DriverSessionAggregateFilter = {
  and?: InputMaybe<Array<DriverSessionAggregateFilter>>;
  driverId?: InputMaybe<IdFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<DriverSessionAggregateFilter>>;
};

export type DriverSessionDeleteResponse = {
  __typename?: 'DriverSessionDeleteResponse';
  driverId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  sessionInfo?: Maybe<SessionInfo>;
};

export type DriverSessionFilter = {
  and?: InputMaybe<Array<DriverSessionFilter>>;
  driverId?: InputMaybe<IdFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<DriverSessionFilter>>;
};

export type DriverSessionSort = {
  direction: SortDirection;
  field: DriverSessionSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum DriverSessionSortFields {
  DriverId = 'driverId',
  Id = 'id'
}

export type DriverSessionsAggregateGroupBy = {
  __typename?: 'DriverSessionsAggregateGroupBy';
  driverId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type DriverSessionsAggregateResponse = {
  __typename?: 'DriverSessionsAggregateResponse';
  avg?: Maybe<DriverSessionsAvgAggregate>;
  count?: Maybe<DriverSessionsCountAggregate>;
  groupBy?: Maybe<DriverSessionsAggregateGroupBy>;
  max?: Maybe<DriverSessionsMaxAggregate>;
  min?: Maybe<DriverSessionsMinAggregate>;
  sum?: Maybe<DriverSessionsSumAggregate>;
};

export type DriverSessionsAvgAggregate = {
  __typename?: 'DriverSessionsAvgAggregate';
  driverId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

export type DriverSessionsCountAggregate = {
  __typename?: 'DriverSessionsCountAggregate';
  driverId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
};

export type DriverSessionsMaxAggregate = {
  __typename?: 'DriverSessionsMaxAggregate';
  driverId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type DriverSessionsMinAggregate = {
  __typename?: 'DriverSessionsMinAggregate';
  driverId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type DriverSessionsSumAggregate = {
  __typename?: 'DriverSessionsSumAggregate';
  driverId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

export type DriverShiftRule = {
  __typename?: 'DriverShiftRule';
  id: Scalars['ID']['output'];
  mandatoryBreakMinutes: Scalars['Int']['output'];
  maxHoursPerFrequency: Scalars['Int']['output'];
  timeFrequency: TimeFrequency;
};

export type DriverShiftRuleDeleteFilter = {
  and?: InputMaybe<Array<DriverShiftRuleDeleteFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<DriverShiftRuleDeleteFilter>>;
};

export type DriverShiftRuleDeleteResponse = {
  __typename?: 'DriverShiftRuleDeleteResponse';
  id?: Maybe<Scalars['ID']['output']>;
  mandatoryBreakMinutes?: Maybe<Scalars['Int']['output']>;
  maxHoursPerFrequency?: Maybe<Scalars['Int']['output']>;
  timeFrequency?: Maybe<TimeFrequency>;
};

export type DriverShiftRuleFilter = {
  and?: InputMaybe<Array<DriverShiftRuleFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<DriverShiftRuleFilter>>;
};

export type DriverShiftRuleInput = {
  mandatoryBreakMinutes: Scalars['Int']['input'];
  maxHoursPerFrequency: Scalars['Int']['input'];
  timeFrequency: TimeFrequency;
};

export type DriverShiftRuleSort = {
  direction: SortDirection;
  field: DriverShiftRuleSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum DriverShiftRuleSortFields {
  Id = 'id'
}

export type DriverShiftRuleUpdateFilter = {
  and?: InputMaybe<Array<DriverShiftRuleUpdateFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<DriverShiftRuleUpdateFilter>>;
};

export type DriverSort = {
  direction: SortDirection;
  field: DriverSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum DriverSortFields {
  CarColorId = 'carColorId',
  CarId = 'carId',
  FleetId = 'fleetId',
  Gender = 'gender',
  Id = 'id',
  LastName = 'lastName',
  MaxDeliveryPackageSize = 'maxDeliveryPackageSize',
  MobileNumber = 'mobileNumber',
  Rating = 'rating',
  ReviewCount = 'reviewCount',
  Status = 'status'
}

export enum DriverStatus {
  Blocked = 'Blocked',
  HardReject = 'HardReject',
  InService = 'InService',
  Offline = 'Offline',
  Online = 'Online',
  PendingApproval = 'PendingApproval',
  SoftReject = 'SoftReject',
  WaitingDocuments = 'WaitingDocuments'
}

export type DriverStatusFilterComparison = {
  eq?: InputMaybe<DriverStatus>;
  gt?: InputMaybe<DriverStatus>;
  gte?: InputMaybe<DriverStatus>;
  iLike?: InputMaybe<DriverStatus>;
  in?: InputMaybe<Array<DriverStatus>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<DriverStatus>;
  lt?: InputMaybe<DriverStatus>;
  lte?: InputMaybe<DriverStatus>;
  neq?: InputMaybe<DriverStatus>;
  notILike?: InputMaybe<DriverStatus>;
  notIn?: InputMaybe<Array<DriverStatus>>;
  notLike?: InputMaybe<DriverStatus>;
};

export type DriverSumAggregate = {
  __typename?: 'DriverSumAggregate';
  carColorId?: Maybe<Scalars['Float']['output']>;
  carId?: Maybe<Scalars['Float']['output']>;
  fleetId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  rating?: Maybe<Scalars['Float']['output']>;
  reviewCount?: Maybe<Scalars['Float']['output']>;
};

export type DriverToDriverDocument = {
  __typename?: 'DriverToDriverDocument';
  driver: Driver;
  driverDocument: DriverDocument;
  driverDocumentId: Scalars['ID']['output'];
  driverId: Scalars['ID']['output'];
  expiresAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  media: Media;
  mediaId: Scalars['ID']['output'];
  retentionPolicy?: Maybe<DriverDocumentRetentionPolicy>;
  retentionPolicyId: Scalars['ID']['output'];
};

export type DriverToDriverDocumentAggregateFilter = {
  and?: InputMaybe<Array<DriverToDriverDocumentAggregateFilter>>;
  driverId?: InputMaybe<IdFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<DriverToDriverDocumentAggregateFilter>>;
};

export type DriverToDriverDocumentConnection = {
  __typename?: 'DriverToDriverDocumentConnection';
  /** Array of edges. */
  edges: Array<DriverToDriverDocumentEdge>;
  /** Paging information */
  pageInfo: PageInfo;
};

export type DriverToDriverDocumentDeleteResponse = {
  __typename?: 'DriverToDriverDocumentDeleteResponse';
  driverDocumentId?: Maybe<Scalars['ID']['output']>;
  driverId?: Maybe<Scalars['ID']['output']>;
  expiresAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  mediaId?: Maybe<Scalars['ID']['output']>;
  retentionPolicyId?: Maybe<Scalars['ID']['output']>;
};

export type DriverToDriverDocumentEdge = {
  __typename?: 'DriverToDriverDocumentEdge';
  /** Cursor for this node. */
  cursor: Scalars['ConnectionCursor']['output'];
  /** The node containing the DriverToDriverDocument */
  node: DriverToDriverDocument;
};

export type DriverToDriverDocumentFilter = {
  and?: InputMaybe<Array<DriverToDriverDocumentFilter>>;
  driverId?: InputMaybe<IdFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<DriverToDriverDocumentFilter>>;
};

export type DriverToDriverDocumentInput = {
  driverDocumentId: Scalars['ID']['input'];
  driverId: Scalars['ID']['input'];
  expiresAt?: InputMaybe<Scalars['DateTime']['input']>;
  mediaId: Scalars['ID']['input'];
  retentionPolicyId: Scalars['ID']['input'];
};

export type DriverToDriverDocumentSort = {
  direction: SortDirection;
  field: DriverToDriverDocumentSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum DriverToDriverDocumentSortFields {
  DriverId = 'driverId',
  Id = 'id'
}

export type DriverTransaction = {
  __typename?: 'DriverTransaction';
  action: TransactionAction;
  amount: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  currency: Scalars['String']['output'];
  deductType?: Maybe<DriverDeductTransactionType>;
  description?: Maybe<Scalars['String']['output']>;
  driver?: Maybe<Driver>;
  driverId?: Maybe<Scalars['ID']['output']>;
  id: Scalars['ID']['output'];
  operator?: Maybe<Operator>;
  operatorId?: Maybe<Scalars['ID']['output']>;
  paymentGateway?: Maybe<PaymentGateway>;
  paymentGatewayId?: Maybe<Scalars['ID']['output']>;
  payoutAccount?: Maybe<PayoutAccount>;
  payoutAccountId?: Maybe<Scalars['ID']['output']>;
  payoutMethod?: Maybe<PayoutMethod>;
  payoutMethodId?: Maybe<Scalars['ID']['output']>;
  payoutSessionId?: Maybe<Scalars['ID']['output']>;
  payoutSessionMethodId?: Maybe<Scalars['ID']['output']>;
  rechargeType?: Maybe<DriverRechargeTransactionType>;
  refrenceNumber?: Maybe<Scalars['String']['output']>;
  requestId?: Maybe<Scalars['ID']['output']>;
  savedPaymentMethod?: Maybe<SavedPaymentMethod>;
  status: TransactionStatus;
};

export type DriverTransactionAggregateFilter = {
  action?: InputMaybe<TransactionActionFilterComparison>;
  amount?: InputMaybe<NumberFieldComparison>;
  and?: InputMaybe<Array<DriverTransactionAggregateFilter>>;
  createdAt?: InputMaybe<DateFieldComparison>;
  currency?: InputMaybe<StringFieldComparison>;
  driverId?: InputMaybe<IdFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<DriverTransactionAggregateFilter>>;
  paymentGatewayId?: InputMaybe<IdFilterComparison>;
  payoutAccountId?: InputMaybe<IdFilterComparison>;
  payoutMethod?: InputMaybe<DriverTransactionAggregateFilterPayoutMethodAggregateFilter>;
  payoutMethodId?: InputMaybe<IdFilterComparison>;
  payoutSessionId?: InputMaybe<IdFilterComparison>;
  payoutSessionMethodId?: InputMaybe<IdFilterComparison>;
  status?: InputMaybe<TransactionStatusFilterComparison>;
};

export type DriverTransactionAggregateFilterPayoutMethodAggregateFilter = {
  and?: InputMaybe<Array<DriverTransactionAggregateFilterPayoutMethodAggregateFilter>>;
  currency?: InputMaybe<StringFieldComparison>;
  enabled?: InputMaybe<BooleanFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<DriverTransactionAggregateFilterPayoutMethodAggregateFilter>>;
  type?: InputMaybe<PayoutMethodTypeFilterComparison>;
};

export type DriverTransactionAggregateGroupBy = {
  __typename?: 'DriverTransactionAggregateGroupBy';
  action?: Maybe<TransactionAction>;
  amount?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  driverId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  paymentGatewayId?: Maybe<Scalars['ID']['output']>;
  payoutAccountId?: Maybe<Scalars['ID']['output']>;
  payoutMethodId?: Maybe<Scalars['ID']['output']>;
  payoutSessionId?: Maybe<Scalars['ID']['output']>;
  payoutSessionMethodId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<TransactionStatus>;
};


export type DriverTransactionAggregateGroupByCreatedAtArgs = {
  by?: GroupBy;
};

export type DriverTransactionAggregateResponse = {
  __typename?: 'DriverTransactionAggregateResponse';
  avg?: Maybe<DriverTransactionAvgAggregate>;
  count?: Maybe<DriverTransactionCountAggregate>;
  groupBy?: Maybe<DriverTransactionAggregateGroupBy>;
  max?: Maybe<DriverTransactionMaxAggregate>;
  min?: Maybe<DriverTransactionMinAggregate>;
  sum?: Maybe<DriverTransactionSumAggregate>;
};

export type DriverTransactionAvgAggregate = {
  __typename?: 'DriverTransactionAvgAggregate';
  amount?: Maybe<Scalars['Float']['output']>;
  driverId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  paymentGatewayId?: Maybe<Scalars['Float']['output']>;
  payoutAccountId?: Maybe<Scalars['Float']['output']>;
  payoutMethodId?: Maybe<Scalars['Float']['output']>;
  payoutSessionId?: Maybe<Scalars['Float']['output']>;
  payoutSessionMethodId?: Maybe<Scalars['Float']['output']>;
};

export type DriverTransactionConnection = {
  __typename?: 'DriverTransactionConnection';
  /** Array of nodes. */
  nodes: Array<DriverTransaction>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type DriverTransactionCountAggregate = {
  __typename?: 'DriverTransactionCountAggregate';
  action?: Maybe<Scalars['Int']['output']>;
  amount?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['Int']['output']>;
  currency?: Maybe<Scalars['Int']['output']>;
  driverId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  paymentGatewayId?: Maybe<Scalars['Int']['output']>;
  payoutAccountId?: Maybe<Scalars['Int']['output']>;
  payoutMethodId?: Maybe<Scalars['Int']['output']>;
  payoutSessionId?: Maybe<Scalars['Int']['output']>;
  payoutSessionMethodId?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
};

export type DriverTransactionFilter = {
  action?: InputMaybe<TransactionActionFilterComparison>;
  amount?: InputMaybe<NumberFieldComparison>;
  and?: InputMaybe<Array<DriverTransactionFilter>>;
  createdAt?: InputMaybe<DateFieldComparison>;
  currency?: InputMaybe<StringFieldComparison>;
  driverId?: InputMaybe<IdFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<DriverTransactionFilter>>;
  paymentGatewayId?: InputMaybe<IdFilterComparison>;
  payoutAccountId?: InputMaybe<IdFilterComparison>;
  payoutMethod?: InputMaybe<DriverTransactionFilterPayoutMethodFilter>;
  payoutMethodId?: InputMaybe<IdFilterComparison>;
  payoutSessionId?: InputMaybe<IdFilterComparison>;
  payoutSessionMethodId?: InputMaybe<IdFilterComparison>;
  status?: InputMaybe<TransactionStatusFilterComparison>;
};

export type DriverTransactionFilterPayoutMethodFilter = {
  and?: InputMaybe<Array<DriverTransactionFilterPayoutMethodFilter>>;
  currency?: InputMaybe<StringFieldComparison>;
  enabled?: InputMaybe<BooleanFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<DriverTransactionFilterPayoutMethodFilter>>;
  type?: InputMaybe<PayoutMethodTypeFilterComparison>;
};

export type DriverTransactionInput = {
  action: TransactionAction;
  amount: Scalars['Float']['input'];
  currency: Scalars['String']['input'];
  deductType?: InputMaybe<DriverDeductTransactionType>;
  description?: InputMaybe<Scalars['String']['input']>;
  driverId: Scalars['ID']['input'];
  rechargeType?: InputMaybe<DriverRechargeTransactionType>;
  refrenceNumber?: InputMaybe<Scalars['String']['input']>;
};

export type DriverTransactionMaxAggregate = {
  __typename?: 'DriverTransactionMaxAggregate';
  action?: Maybe<TransactionAction>;
  amount?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  driverId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  paymentGatewayId?: Maybe<Scalars['ID']['output']>;
  payoutAccountId?: Maybe<Scalars['ID']['output']>;
  payoutMethodId?: Maybe<Scalars['ID']['output']>;
  payoutSessionId?: Maybe<Scalars['ID']['output']>;
  payoutSessionMethodId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<TransactionStatus>;
};

export type DriverTransactionMinAggregate = {
  __typename?: 'DriverTransactionMinAggregate';
  action?: Maybe<TransactionAction>;
  amount?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  driverId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  paymentGatewayId?: Maybe<Scalars['ID']['output']>;
  payoutAccountId?: Maybe<Scalars['ID']['output']>;
  payoutMethodId?: Maybe<Scalars['ID']['output']>;
  payoutSessionId?: Maybe<Scalars['ID']['output']>;
  payoutSessionMethodId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<TransactionStatus>;
};

export type DriverTransactionSort = {
  direction: SortDirection;
  field: DriverTransactionSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum DriverTransactionSortFields {
  Action = 'action',
  Amount = 'amount',
  CreatedAt = 'createdAt',
  Currency = 'currency',
  DriverId = 'driverId',
  Id = 'id',
  PaymentGatewayId = 'paymentGatewayId',
  PayoutAccountId = 'payoutAccountId',
  PayoutMethodId = 'payoutMethodId',
  PayoutSessionId = 'payoutSessionId',
  PayoutSessionMethodId = 'payoutSessionMethodId',
  Status = 'status'
}

export type DriverTransactionSumAggregate = {
  __typename?: 'DriverTransactionSumAggregate';
  amount?: Maybe<Scalars['Float']['output']>;
  driverId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  paymentGatewayId?: Maybe<Scalars['Float']['output']>;
  payoutAccountId?: Maybe<Scalars['Float']['output']>;
  payoutMethodId?: Maybe<Scalars['Float']['output']>;
  payoutSessionId?: Maybe<Scalars['Float']['output']>;
  payoutSessionMethodId?: Maybe<Scalars['Float']['output']>;
};

export type DriverTransactionsAggregateGroupBy = {
  __typename?: 'DriverTransactionsAggregateGroupBy';
  action?: Maybe<TransactionAction>;
  amount?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  driverId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  paymentGatewayId?: Maybe<Scalars['ID']['output']>;
  payoutAccountId?: Maybe<Scalars['ID']['output']>;
  payoutMethodId?: Maybe<Scalars['ID']['output']>;
  payoutSessionId?: Maybe<Scalars['ID']['output']>;
  payoutSessionMethodId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<TransactionStatus>;
};

export type DriverTransactionsAggregateResponse = {
  __typename?: 'DriverTransactionsAggregateResponse';
  avg?: Maybe<DriverTransactionsAvgAggregate>;
  count?: Maybe<DriverTransactionsCountAggregate>;
  groupBy?: Maybe<DriverTransactionsAggregateGroupBy>;
  max?: Maybe<DriverTransactionsMaxAggregate>;
  min?: Maybe<DriverTransactionsMinAggregate>;
  sum?: Maybe<DriverTransactionsSumAggregate>;
};

export type DriverTransactionsAvgAggregate = {
  __typename?: 'DriverTransactionsAvgAggregate';
  amount?: Maybe<Scalars['Float']['output']>;
  driverId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  paymentGatewayId?: Maybe<Scalars['Float']['output']>;
  payoutAccountId?: Maybe<Scalars['Float']['output']>;
  payoutMethodId?: Maybe<Scalars['Float']['output']>;
  payoutSessionId?: Maybe<Scalars['Float']['output']>;
  payoutSessionMethodId?: Maybe<Scalars['Float']['output']>;
};

export type DriverTransactionsConnection = {
  __typename?: 'DriverTransactionsConnection';
  /** Array of nodes. */
  nodes: Array<DriverTransaction>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type DriverTransactionsCountAggregate = {
  __typename?: 'DriverTransactionsCountAggregate';
  action?: Maybe<Scalars['Int']['output']>;
  amount?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['Int']['output']>;
  currency?: Maybe<Scalars['Int']['output']>;
  driverId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  paymentGatewayId?: Maybe<Scalars['Int']['output']>;
  payoutAccountId?: Maybe<Scalars['Int']['output']>;
  payoutMethodId?: Maybe<Scalars['Int']['output']>;
  payoutSessionId?: Maybe<Scalars['Int']['output']>;
  payoutSessionMethodId?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
};

export type DriverTransactionsMaxAggregate = {
  __typename?: 'DriverTransactionsMaxAggregate';
  action?: Maybe<TransactionAction>;
  amount?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  driverId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  paymentGatewayId?: Maybe<Scalars['ID']['output']>;
  payoutAccountId?: Maybe<Scalars['ID']['output']>;
  payoutMethodId?: Maybe<Scalars['ID']['output']>;
  payoutSessionId?: Maybe<Scalars['ID']['output']>;
  payoutSessionMethodId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<TransactionStatus>;
};

export type DriverTransactionsMinAggregate = {
  __typename?: 'DriverTransactionsMinAggregate';
  action?: Maybe<TransactionAction>;
  amount?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  driverId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  paymentGatewayId?: Maybe<Scalars['ID']['output']>;
  payoutAccountId?: Maybe<Scalars['ID']['output']>;
  payoutMethodId?: Maybe<Scalars['ID']['output']>;
  payoutSessionId?: Maybe<Scalars['ID']['output']>;
  payoutSessionMethodId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<TransactionStatus>;
};

export type DriverTransactionsSumAggregate = {
  __typename?: 'DriverTransactionsSumAggregate';
  amount?: Maybe<Scalars['Float']['output']>;
  driverId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  paymentGatewayId?: Maybe<Scalars['Float']['output']>;
  payoutAccountId?: Maybe<Scalars['Float']['output']>;
  payoutMethodId?: Maybe<Scalars['Float']['output']>;
  payoutSessionId?: Maybe<Scalars['Float']['output']>;
  payoutSessionMethodId?: Maybe<Scalars['Float']['output']>;
};

export type DriverWallet = {
  __typename?: 'DriverWallet';
  balance: Scalars['Float']['output'];
  currency: Scalars['String']['output'];
  driver?: Maybe<Driver>;
  driverId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
};

export type DriverWalletAggregateFilter = {
  and?: InputMaybe<Array<DriverWalletAggregateFilter>>;
  balance?: InputMaybe<FloatFieldComparison>;
  currency?: InputMaybe<StringFieldComparison>;
  driverId?: InputMaybe<IdFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<DriverWalletAggregateFilter>>;
};

export type DriverWalletAggregateGroupBy = {
  __typename?: 'DriverWalletAggregateGroupBy';
  balance?: Maybe<Scalars['Float']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  driverId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type DriverWalletAggregateResponse = {
  __typename?: 'DriverWalletAggregateResponse';
  avg?: Maybe<DriverWalletAvgAggregate>;
  count?: Maybe<DriverWalletCountAggregate>;
  groupBy?: Maybe<DriverWalletAggregateGroupBy>;
  max?: Maybe<DriverWalletMaxAggregate>;
  min?: Maybe<DriverWalletMinAggregate>;
  sum?: Maybe<DriverWalletSumAggregate>;
};

export type DriverWalletAvgAggregate = {
  __typename?: 'DriverWalletAvgAggregate';
  balance?: Maybe<Scalars['Float']['output']>;
  driverId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

export type DriverWalletConnection = {
  __typename?: 'DriverWalletConnection';
  /** Array of nodes. */
  nodes: Array<DriverWallet>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type DriverWalletCountAggregate = {
  __typename?: 'DriverWalletCountAggregate';
  balance?: Maybe<Scalars['Int']['output']>;
  currency?: Maybe<Scalars['Int']['output']>;
  driverId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
};

export type DriverWalletFilter = {
  and?: InputMaybe<Array<DriverWalletFilter>>;
  balance?: InputMaybe<FloatFieldComparison>;
  currency?: InputMaybe<StringFieldComparison>;
  driverId?: InputMaybe<IdFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<DriverWalletFilter>>;
};

export type DriverWalletMaxAggregate = {
  __typename?: 'DriverWalletMaxAggregate';
  balance?: Maybe<Scalars['Float']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  driverId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type DriverWalletMinAggregate = {
  __typename?: 'DriverWalletMinAggregate';
  balance?: Maybe<Scalars['Float']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  driverId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type DriverWalletSort = {
  direction: SortDirection;
  field: DriverWalletSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum DriverWalletSortFields {
  Balance = 'balance',
  Currency = 'currency',
  DriverId = 'driverId',
  Id = 'id'
}

export type DriverWalletSumAggregate = {
  __typename?: 'DriverWalletSumAggregate';
  balance?: Maybe<Scalars['Float']['output']>;
  driverId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

export enum EnabledNotification {
  NewOrder = 'NewOrder',
  Sos = 'SOS',
  SupportRequest = 'SupportRequest',
  UserPendingVerification = 'UserPendingVerification'
}

export type ExportArgs = {
  filters?: InputMaybe<Array<ExportFilterArg>>;
  relations?: InputMaybe<Array<Scalars['String']['input']>>;
  sort?: InputMaybe<ExportSortArg>;
  table: ExportTable;
  type: ExportType;
};

export type ExportFilterArg = {
  field: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type ExportResult = {
  __typename?: 'ExportResult';
  url: Scalars['String']['output'];
};

export type ExportSessionToCsvInput = {
  payoutMethodId: Scalars['ID']['input'];
  payoutSessionId: Scalars['ID']['input'];
};

export type ExportSortArg = {
  direction: SortDirection;
  property: Scalars['String']['input'];
};

export enum ExportTable {
  DriverWallet = 'DriverWallet',
  FleetWallet = 'FleetWallet',
  ProviderWallet = 'ProviderWallet',
  RiderWallet = 'RiderWallet'
}

export enum ExportType {
  Csv = 'CSV'
}

export type Feedback = {
  __typename?: 'Feedback';
  description?: Maybe<Scalars['String']['output']>;
  driver: Driver;
  driverId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  parameters: Array<FeedbackParameter>;
  parametersAggregate: Array<FeedbackParametersAggregateResponse>;
  request: Order;
  requestId: Scalars['ID']['output'];
  reviewTimestamp: Scalars['DateTime']['output'];
  score: Scalars['Int']['output'];
};


export type FeedbackParametersArgs = {
  filter?: FeedbackParameterFilter;
  sorting?: Array<FeedbackParameterSort>;
};


export type FeedbackParametersAggregateArgs = {
  filter?: InputMaybe<FeedbackParameterAggregateFilter>;
};

export type FeedbackAggregateFilter = {
  and?: InputMaybe<Array<FeedbackAggregateFilter>>;
  driverId?: InputMaybe<IdFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<FeedbackAggregateFilter>>;
  parameters?: InputMaybe<FeedbackAggregateFilterFeedbackParameterAggregateFilter>;
  request?: InputMaybe<FeedbackAggregateFilterOrderAggregateFilter>;
  requestId?: InputMaybe<IdFilterComparison>;
};

export type FeedbackAggregateFilterFeedbackParameterAggregateFilter = {
  and?: InputMaybe<Array<FeedbackAggregateFilterFeedbackParameterAggregateFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  isGood?: InputMaybe<BooleanFieldComparison>;
  or?: InputMaybe<Array<FeedbackAggregateFilterFeedbackParameterAggregateFilter>>;
  title?: InputMaybe<StringFieldComparison>;
};

export type FeedbackAggregateFilterOrderAggregateFilter = {
  and?: InputMaybe<Array<FeedbackAggregateFilterOrderAggregateFilter>>;
  costAfterCoupon?: InputMaybe<FloatFieldComparison>;
  costBest?: InputMaybe<FloatFieldComparison>;
  createdOn?: InputMaybe<DateFieldComparison>;
  currency?: InputMaybe<StringFieldComparison>;
  distanceBest?: InputMaybe<IntFieldComparison>;
  driverId?: InputMaybe<IdFilterComparison>;
  durationBest?: InputMaybe<IntFieldComparison>;
  fleetId?: InputMaybe<IdFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<FeedbackAggregateFilterOrderAggregateFilter>>;
  paymentMode?: InputMaybe<PaymentModeFilterComparison>;
  regionId?: InputMaybe<IdFilterComparison>;
  riderId?: InputMaybe<IdFilterComparison>;
  serviceId?: InputMaybe<IdFilterComparison>;
  status?: InputMaybe<OrderStatusFilterComparison>;
};

export type FeedbackConnection = {
  __typename?: 'FeedbackConnection';
  /** Array of nodes. */
  nodes: Array<Feedback>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type FeedbackFilter = {
  and?: InputMaybe<Array<FeedbackFilter>>;
  driverId?: InputMaybe<IdFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<FeedbackFilter>>;
  parameters?: InputMaybe<FeedbackFilterFeedbackParameterFilter>;
  request?: InputMaybe<FeedbackFilterOrderFilter>;
  requestId?: InputMaybe<IdFilterComparison>;
};

export type FeedbackFilterFeedbackParameterFilter = {
  and?: InputMaybe<Array<FeedbackFilterFeedbackParameterFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  isGood?: InputMaybe<BooleanFieldComparison>;
  or?: InputMaybe<Array<FeedbackFilterFeedbackParameterFilter>>;
  title?: InputMaybe<StringFieldComparison>;
};

export type FeedbackFilterOrderFilter = {
  and?: InputMaybe<Array<FeedbackFilterOrderFilter>>;
  costAfterCoupon?: InputMaybe<FloatFieldComparison>;
  costBest?: InputMaybe<FloatFieldComparison>;
  createdOn?: InputMaybe<DateFieldComparison>;
  currency?: InputMaybe<StringFieldComparison>;
  distanceBest?: InputMaybe<IntFieldComparison>;
  driverId?: InputMaybe<IdFilterComparison>;
  durationBest?: InputMaybe<IntFieldComparison>;
  fleetId?: InputMaybe<IdFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<FeedbackFilterOrderFilter>>;
  paymentMode?: InputMaybe<PaymentModeFilterComparison>;
  regionId?: InputMaybe<IdFilterComparison>;
  riderId?: InputMaybe<IdFilterComparison>;
  serviceId?: InputMaybe<IdFilterComparison>;
  status?: InputMaybe<OrderStatusFilterComparison>;
};

export type FeedbackParameter = {
  __typename?: 'FeedbackParameter';
  feedbacks: FeedbackParameterFeedbacksConnection;
  feedbacksAggregate: Array<FeedbackParameterFeedbacksAggregateResponse>;
  id: Scalars['ID']['output'];
  isGood: Scalars['Boolean']['output'];
  title: Scalars['String']['output'];
};


export type FeedbackParameterFeedbacksArgs = {
  filter?: FeedbackParameterFilter;
  paging?: OffsetPaging;
  sorting?: Array<FeedbackParameterSort>;
};


export type FeedbackParameterFeedbacksAggregateArgs = {
  filter?: InputMaybe<FeedbackParameterAggregateFilter>;
};

export type FeedbackParameterAggregate = {
  __typename?: 'FeedbackParameterAggregate';
  count: Scalars['ID']['output'];
  isGood: Scalars['Boolean']['output'];
  title: Scalars['String']['output'];
};

export type FeedbackParameterAggregateFilter = {
  and?: InputMaybe<Array<FeedbackParameterAggregateFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  isGood?: InputMaybe<BooleanFieldComparison>;
  or?: InputMaybe<Array<FeedbackParameterAggregateFilter>>;
  title?: InputMaybe<StringFieldComparison>;
};

export type FeedbackParameterDeleteResponse = {
  __typename?: 'FeedbackParameterDeleteResponse';
  id?: Maybe<Scalars['ID']['output']>;
  isGood?: Maybe<Scalars['Boolean']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type FeedbackParameterFeedbacksAggregateGroupBy = {
  __typename?: 'FeedbackParameterFeedbacksAggregateGroupBy';
  id?: Maybe<Scalars['ID']['output']>;
  isGood?: Maybe<Scalars['Boolean']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type FeedbackParameterFeedbacksAggregateResponse = {
  __typename?: 'FeedbackParameterFeedbacksAggregateResponse';
  avg?: Maybe<FeedbackParameterFeedbacksAvgAggregate>;
  count?: Maybe<FeedbackParameterFeedbacksCountAggregate>;
  groupBy?: Maybe<FeedbackParameterFeedbacksAggregateGroupBy>;
  max?: Maybe<FeedbackParameterFeedbacksMaxAggregate>;
  min?: Maybe<FeedbackParameterFeedbacksMinAggregate>;
  sum?: Maybe<FeedbackParameterFeedbacksSumAggregate>;
};

export type FeedbackParameterFeedbacksAvgAggregate = {
  __typename?: 'FeedbackParameterFeedbacksAvgAggregate';
  id?: Maybe<Scalars['Float']['output']>;
};

export type FeedbackParameterFeedbacksConnection = {
  __typename?: 'FeedbackParameterFeedbacksConnection';
  /** Array of nodes. */
  nodes: Array<FeedbackParameter>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
};

export type FeedbackParameterFeedbacksCountAggregate = {
  __typename?: 'FeedbackParameterFeedbacksCountAggregate';
  id?: Maybe<Scalars['Int']['output']>;
  isGood?: Maybe<Scalars['Int']['output']>;
  title?: Maybe<Scalars['Int']['output']>;
};

export type FeedbackParameterFeedbacksMaxAggregate = {
  __typename?: 'FeedbackParameterFeedbacksMaxAggregate';
  id?: Maybe<Scalars['ID']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type FeedbackParameterFeedbacksMinAggregate = {
  __typename?: 'FeedbackParameterFeedbacksMinAggregate';
  id?: Maybe<Scalars['ID']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type FeedbackParameterFeedbacksSumAggregate = {
  __typename?: 'FeedbackParameterFeedbacksSumAggregate';
  id?: Maybe<Scalars['Float']['output']>;
};

export type FeedbackParameterFilter = {
  and?: InputMaybe<Array<FeedbackParameterFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  isGood?: InputMaybe<BooleanFieldComparison>;
  or?: InputMaybe<Array<FeedbackParameterFilter>>;
  title?: InputMaybe<StringFieldComparison>;
};

export type FeedbackParameterInput = {
  isGood: Scalars['Boolean']['input'];
  title: Scalars['String']['input'];
};

export type FeedbackParameterSort = {
  direction: SortDirection;
  field: FeedbackParameterSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum FeedbackParameterSortFields {
  Id = 'id',
  IsGood = 'isGood',
  Title = 'title'
}

export type FeedbackParametersAggregateGroupBy = {
  __typename?: 'FeedbackParametersAggregateGroupBy';
  id?: Maybe<Scalars['ID']['output']>;
  isGood?: Maybe<Scalars['Boolean']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type FeedbackParametersAggregateResponse = {
  __typename?: 'FeedbackParametersAggregateResponse';
  avg?: Maybe<FeedbackParametersAvgAggregate>;
  count?: Maybe<FeedbackParametersCountAggregate>;
  groupBy?: Maybe<FeedbackParametersAggregateGroupBy>;
  max?: Maybe<FeedbackParametersMaxAggregate>;
  min?: Maybe<FeedbackParametersMinAggregate>;
  sum?: Maybe<FeedbackParametersSumAggregate>;
};

export type FeedbackParametersAvgAggregate = {
  __typename?: 'FeedbackParametersAvgAggregate';
  id?: Maybe<Scalars['Float']['output']>;
};

export type FeedbackParametersCountAggregate = {
  __typename?: 'FeedbackParametersCountAggregate';
  id?: Maybe<Scalars['Int']['output']>;
  isGood?: Maybe<Scalars['Int']['output']>;
  title?: Maybe<Scalars['Int']['output']>;
};

export type FeedbackParametersMaxAggregate = {
  __typename?: 'FeedbackParametersMaxAggregate';
  id?: Maybe<Scalars['ID']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type FeedbackParametersMinAggregate = {
  __typename?: 'FeedbackParametersMinAggregate';
  id?: Maybe<Scalars['ID']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type FeedbackParametersSumAggregate = {
  __typename?: 'FeedbackParametersSumAggregate';
  id?: Maybe<Scalars['Float']['output']>;
};

export type FeedbackSort = {
  direction: SortDirection;
  field: FeedbackSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum FeedbackSortFields {
  DriverId = 'driverId',
  Id = 'id',
  RequestId = 'requestId'
}

export type FinancialTimeline = {
  __typename?: 'FinancialTimeline';
  amount: Scalars['Float']['output'];
  /** Any date within the range of revenue interval. */
  anyDate: Scalars['DateTime']['output'];
  dateString: Scalars['String']['output'];
};

export type Fleet = {
  __typename?: 'Fleet';
  accountNumber: Scalars['String']['output'];
  address?: Maybe<Scalars['String']['output']>;
  commissionShareFlat: Scalars['Float']['output'];
  commissionSharePercent: Scalars['Float']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  drivers: FleetDriversConnection;
  driversAggregate: Array<FleetDriversAggregateResponse>;
  exclusivityAreas?: Maybe<Array<Array<Point>>>;
  feeMultiplier?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  isBlocked: Scalars['Boolean']['output'];
  mobileNumber: Scalars['String']['output'];
  name: Scalars['String']['output'];
  password?: Maybe<Scalars['String']['output']>;
  phoneNumber: Scalars['String']['output'];
  profilePicture?: Maybe<Media>;
  transactions: FleetTransactionsConnection;
  userName?: Maybe<Scalars['String']['output']>;
  wallet: Array<FleetWallet>;
  zonePrices: FleetZonePricesConnection;
};


export type FleetDriversArgs = {
  filter?: DriverFilter;
  paging?: OffsetPaging;
  sorting?: Array<DriverSort>;
};


export type FleetDriversAggregateArgs = {
  filter?: InputMaybe<DriverAggregateFilter>;
};


export type FleetTransactionsArgs = {
  filter?: FleetTransactionFilter;
  paging?: OffsetPaging;
  sorting?: Array<FleetTransactionSort>;
};


export type FleetWalletArgs = {
  filter?: FleetWalletFilter;
  sorting?: Array<FleetWalletSort>;
};


export type FleetZonePricesArgs = {
  filter?: ZonePriceFilter;
  paging?: OffsetPaging;
  sorting?: Array<ZonePriceSort>;
};

export type FleetConnection = {
  __typename?: 'FleetConnection';
  /** Array of nodes. */
  nodes: Array<Fleet>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type FleetDeleteResponse = {
  __typename?: 'FleetDeleteResponse';
  accountNumber?: Maybe<Scalars['String']['output']>;
  address?: Maybe<Scalars['String']['output']>;
  commissionShareFlat?: Maybe<Scalars['Float']['output']>;
  commissionSharePercent?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  exclusivityAreas?: Maybe<Array<Array<Point>>>;
  feeMultiplier?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  isBlocked?: Maybe<Scalars['Boolean']['output']>;
  mobileNumber?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  userName?: Maybe<Scalars['String']['output']>;
};

export type FleetDriversAggregateGroupBy = {
  __typename?: 'FleetDriversAggregateGroupBy';
  carColorId?: Maybe<Scalars['ID']['output']>;
  carId?: Maybe<Scalars['ID']['output']>;
  fleetId?: Maybe<Scalars['ID']['output']>;
  gender?: Maybe<Gender>;
  id?: Maybe<Scalars['ID']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  maxDeliveryPackageSize?: Maybe<DeliveryPackageSize>;
  mobileNumber?: Maybe<Scalars['String']['output']>;
  rating?: Maybe<Scalars['Int']['output']>;
  reviewCount?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<DriverStatus>;
};

export type FleetDriversAggregateResponse = {
  __typename?: 'FleetDriversAggregateResponse';
  avg?: Maybe<FleetDriversAvgAggregate>;
  count?: Maybe<FleetDriversCountAggregate>;
  groupBy?: Maybe<FleetDriversAggregateGroupBy>;
  max?: Maybe<FleetDriversMaxAggregate>;
  min?: Maybe<FleetDriversMinAggregate>;
  sum?: Maybe<FleetDriversSumAggregate>;
};

export type FleetDriversAvgAggregate = {
  __typename?: 'FleetDriversAvgAggregate';
  carColorId?: Maybe<Scalars['Float']['output']>;
  carId?: Maybe<Scalars['Float']['output']>;
  fleetId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  rating?: Maybe<Scalars['Float']['output']>;
  reviewCount?: Maybe<Scalars['Float']['output']>;
};

export type FleetDriversConnection = {
  __typename?: 'FleetDriversConnection';
  /** Array of nodes. */
  nodes: Array<Driver>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type FleetDriversCountAggregate = {
  __typename?: 'FleetDriversCountAggregate';
  carColorId?: Maybe<Scalars['Int']['output']>;
  carId?: Maybe<Scalars['Int']['output']>;
  fleetId?: Maybe<Scalars['Int']['output']>;
  gender?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  lastName?: Maybe<Scalars['Int']['output']>;
  maxDeliveryPackageSize?: Maybe<Scalars['Int']['output']>;
  mobileNumber?: Maybe<Scalars['Int']['output']>;
  rating?: Maybe<Scalars['Int']['output']>;
  reviewCount?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
};

export type FleetDriversMaxAggregate = {
  __typename?: 'FleetDriversMaxAggregate';
  carColorId?: Maybe<Scalars['ID']['output']>;
  carId?: Maybe<Scalars['ID']['output']>;
  fleetId?: Maybe<Scalars['ID']['output']>;
  gender?: Maybe<Gender>;
  id?: Maybe<Scalars['ID']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  maxDeliveryPackageSize?: Maybe<DeliveryPackageSize>;
  mobileNumber?: Maybe<Scalars['String']['output']>;
  rating?: Maybe<Scalars['Int']['output']>;
  reviewCount?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<DriverStatus>;
};

export type FleetDriversMinAggregate = {
  __typename?: 'FleetDriversMinAggregate';
  carColorId?: Maybe<Scalars['ID']['output']>;
  carId?: Maybe<Scalars['ID']['output']>;
  fleetId?: Maybe<Scalars['ID']['output']>;
  gender?: Maybe<Gender>;
  id?: Maybe<Scalars['ID']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  maxDeliveryPackageSize?: Maybe<DeliveryPackageSize>;
  mobileNumber?: Maybe<Scalars['String']['output']>;
  rating?: Maybe<Scalars['Int']['output']>;
  reviewCount?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<DriverStatus>;
};

export type FleetDriversSumAggregate = {
  __typename?: 'FleetDriversSumAggregate';
  carColorId?: Maybe<Scalars['Float']['output']>;
  carId?: Maybe<Scalars['Float']['output']>;
  fleetId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  rating?: Maybe<Scalars['Float']['output']>;
  reviewCount?: Maybe<Scalars['Float']['output']>;
};

export type FleetFilter = {
  and?: InputMaybe<Array<FleetFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<FleetFilter>>;
};

export type FleetSort = {
  direction: SortDirection;
  field: FleetSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum FleetSortFields {
  Id = 'id',
  Name = 'name'
}

export type FleetStaff = {
  __typename?: 'FleetStaff';
  address?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstName: Scalars['String']['output'];
  fleetId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  isBlocked: Scalars['Boolean']['output'];
  lastActivityAt?: Maybe<Scalars['DateTime']['output']>;
  lastName: Scalars['String']['output'];
  mobileNumber: Scalars['String']['output'];
  password: Scalars['String']['output'];
  permissionFinancial: FleetStaffPermissionOrder;
  permissionOrder: FleetStaffPermissionOrder;
  phoneNumber: Scalars['String']['output'];
  profileImage?: Maybe<Media>;
  registeredAt: Scalars['DateTime']['output'];
  userName: Scalars['String']['output'];
};

export type FleetStaffConnection = {
  __typename?: 'FleetStaffConnection';
  /** Array of nodes. */
  nodes: Array<FleetStaff>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type FleetStaffDeleteResponse = {
  __typename?: 'FleetStaffDeleteResponse';
  address?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  fleetId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  isBlocked?: Maybe<Scalars['Boolean']['output']>;
  lastActivityAt?: Maybe<Scalars['DateTime']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  mobileNumber?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  permissionFinancial?: Maybe<FleetStaffPermissionOrder>;
  permissionOrder?: Maybe<FleetStaffPermissionOrder>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  registeredAt?: Maybe<Scalars['DateTime']['output']>;
  userName?: Maybe<Scalars['String']['output']>;
};

export type FleetStaffFilter = {
  and?: InputMaybe<Array<FleetStaffFilter>>;
  firstName?: InputMaybe<StringFieldComparison>;
  fleetId?: InputMaybe<IdFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  isBlocked?: InputMaybe<BooleanFieldComparison>;
  lastName?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<FleetStaffFilter>>;
  userName?: InputMaybe<StringFieldComparison>;
};

export enum FleetStaffPermissionFinancial {
  CanEdit = 'CAN_EDIT',
  CanView = 'CAN_VIEW'
}

export enum FleetStaffPermissionOrder {
  CanEdit = 'CAN_EDIT',
  CanView = 'CAN_VIEW'
}

export type FleetStaffSession = {
  __typename?: 'FleetStaffSession';
  fleetStaffId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  sessionInfo: SessionInfo;
};

export type FleetStaffSessionFilter = {
  and?: InputMaybe<Array<FleetStaffSessionFilter>>;
  fleetStaffId?: InputMaybe<IdFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<FleetStaffSessionFilter>>;
};

export type FleetStaffSessionSort = {
  direction: SortDirection;
  field: FleetStaffSessionSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum FleetStaffSessionSortFields {
  FleetStaffId = 'fleetStaffId',
  Id = 'id'
}

export type FleetStaffSort = {
  direction: SortDirection;
  field: FleetStaffSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum FleetStaffSortFields {
  FirstName = 'firstName',
  FleetId = 'fleetId',
  Id = 'id',
  IsBlocked = 'isBlocked',
  LastName = 'lastName',
  UserName = 'userName'
}

export type FleetTransaction = {
  __typename?: 'FleetTransaction';
  action: TransactionAction;
  amount: Scalars['Float']['output'];
  currency: Scalars['String']['output'];
  deductType?: Maybe<ProviderDeductTransactionType>;
  description?: Maybe<Scalars['String']['output']>;
  fleetId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  operator?: Maybe<Operator>;
  operatorId?: Maybe<Scalars['ID']['output']>;
  rechargeType?: Maybe<ProviderRechargeTransactionType>;
  refrenceNumber?: Maybe<Scalars['String']['output']>;
  requestId?: Maybe<Scalars['ID']['output']>;
  status: TransactionStatus;
  transactionTimestamp: Scalars['DateTime']['output'];
};

export type FleetTransactionAggregateFilter = {
  action?: InputMaybe<TransactionActionFilterComparison>;
  and?: InputMaybe<Array<FleetTransactionAggregateFilter>>;
  deductType?: InputMaybe<ProviderDeductTransactionTypeFilterComparison>;
  fleetId?: InputMaybe<IdFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  operatorId?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<FleetTransactionAggregateFilter>>;
  rechargeType?: InputMaybe<ProviderRechargeTransactionTypeFilterComparison>;
  requestId?: InputMaybe<IdFilterComparison>;
  status?: InputMaybe<TransactionStatusFilterComparison>;
};

export type FleetTransactionAggregateGroupBy = {
  __typename?: 'FleetTransactionAggregateGroupBy';
  action?: Maybe<TransactionAction>;
  deductType?: Maybe<ProviderDeductTransactionType>;
  fleetId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  operatorId?: Maybe<Scalars['ID']['output']>;
  rechargeType?: Maybe<ProviderRechargeTransactionType>;
  requestId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<TransactionStatus>;
};

export type FleetTransactionAggregateResponse = {
  __typename?: 'FleetTransactionAggregateResponse';
  avg?: Maybe<FleetTransactionAvgAggregate>;
  count?: Maybe<FleetTransactionCountAggregate>;
  groupBy?: Maybe<FleetTransactionAggregateGroupBy>;
  max?: Maybe<FleetTransactionMaxAggregate>;
  min?: Maybe<FleetTransactionMinAggregate>;
  sum?: Maybe<FleetTransactionSumAggregate>;
};

export type FleetTransactionAvgAggregate = {
  __typename?: 'FleetTransactionAvgAggregate';
  fleetId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  operatorId?: Maybe<Scalars['Float']['output']>;
  requestId?: Maybe<Scalars['Float']['output']>;
};

export type FleetTransactionConnection = {
  __typename?: 'FleetTransactionConnection';
  /** Array of nodes. */
  nodes: Array<FleetTransaction>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type FleetTransactionCountAggregate = {
  __typename?: 'FleetTransactionCountAggregate';
  action?: Maybe<Scalars['Int']['output']>;
  deductType?: Maybe<Scalars['Int']['output']>;
  fleetId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  operatorId?: Maybe<Scalars['Int']['output']>;
  rechargeType?: Maybe<Scalars['Int']['output']>;
  requestId?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
};

export type FleetTransactionFilter = {
  action?: InputMaybe<TransactionActionFilterComparison>;
  and?: InputMaybe<Array<FleetTransactionFilter>>;
  deductType?: InputMaybe<ProviderDeductTransactionTypeFilterComparison>;
  fleetId?: InputMaybe<IdFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  operatorId?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<FleetTransactionFilter>>;
  rechargeType?: InputMaybe<ProviderRechargeTransactionTypeFilterComparison>;
  requestId?: InputMaybe<IdFilterComparison>;
  status?: InputMaybe<TransactionStatusFilterComparison>;
};

export type FleetTransactionInput = {
  action: TransactionAction;
  amount: Scalars['Float']['input'];
  currency: Scalars['String']['input'];
  deductType?: InputMaybe<ProviderDeductTransactionType>;
  description?: InputMaybe<Scalars['String']['input']>;
  fleetId: Scalars['ID']['input'];
  rechargeType?: InputMaybe<ProviderRechargeTransactionType>;
  refrenceNumber?: InputMaybe<Scalars['String']['input']>;
};

export type FleetTransactionMaxAggregate = {
  __typename?: 'FleetTransactionMaxAggregate';
  action?: Maybe<TransactionAction>;
  deductType?: Maybe<ProviderDeductTransactionType>;
  fleetId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  operatorId?: Maybe<Scalars['ID']['output']>;
  rechargeType?: Maybe<ProviderRechargeTransactionType>;
  requestId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<TransactionStatus>;
};

export type FleetTransactionMinAggregate = {
  __typename?: 'FleetTransactionMinAggregate';
  action?: Maybe<TransactionAction>;
  deductType?: Maybe<ProviderDeductTransactionType>;
  fleetId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  operatorId?: Maybe<Scalars['ID']['output']>;
  rechargeType?: Maybe<ProviderRechargeTransactionType>;
  requestId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<TransactionStatus>;
};

export type FleetTransactionSort = {
  direction: SortDirection;
  field: FleetTransactionSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum FleetTransactionSortFields {
  Action = 'action',
  DeductType = 'deductType',
  FleetId = 'fleetId',
  Id = 'id',
  OperatorId = 'operatorId',
  RechargeType = 'rechargeType',
  RequestId = 'requestId',
  Status = 'status'
}

export type FleetTransactionSumAggregate = {
  __typename?: 'FleetTransactionSumAggregate';
  fleetId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  operatorId?: Maybe<Scalars['Float']['output']>;
  requestId?: Maybe<Scalars['Float']['output']>;
};

export type FleetTransactionsConnection = {
  __typename?: 'FleetTransactionsConnection';
  /** Array of nodes. */
  nodes: Array<FleetTransaction>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type FleetWallet = {
  __typename?: 'FleetWallet';
  balance: Scalars['Float']['output'];
  currency: Scalars['String']['output'];
  fleet: Fleet;
  fleetId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
};

export type FleetWalletAggregateFilter = {
  and?: InputMaybe<Array<FleetWalletAggregateFilter>>;
  balance?: InputMaybe<FloatFieldComparison>;
  currency?: InputMaybe<StringFieldComparison>;
  fleetId?: InputMaybe<IdFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<FleetWalletAggregateFilter>>;
};

export type FleetWalletAggregateGroupBy = {
  __typename?: 'FleetWalletAggregateGroupBy';
  balance?: Maybe<Scalars['Float']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  fleetId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type FleetWalletAggregateResponse = {
  __typename?: 'FleetWalletAggregateResponse';
  avg?: Maybe<FleetWalletAvgAggregate>;
  count?: Maybe<FleetWalletCountAggregate>;
  groupBy?: Maybe<FleetWalletAggregateGroupBy>;
  max?: Maybe<FleetWalletMaxAggregate>;
  min?: Maybe<FleetWalletMinAggregate>;
  sum?: Maybe<FleetWalletSumAggregate>;
};

export type FleetWalletAvgAggregate = {
  __typename?: 'FleetWalletAvgAggregate';
  balance?: Maybe<Scalars['Float']['output']>;
  fleetId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

export type FleetWalletConnection = {
  __typename?: 'FleetWalletConnection';
  /** Array of nodes. */
  nodes: Array<FleetWallet>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type FleetWalletCountAggregate = {
  __typename?: 'FleetWalletCountAggregate';
  balance?: Maybe<Scalars['Int']['output']>;
  currency?: Maybe<Scalars['Int']['output']>;
  fleetId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
};

export type FleetWalletFilter = {
  and?: InputMaybe<Array<FleetWalletFilter>>;
  balance?: InputMaybe<FloatFieldComparison>;
  currency?: InputMaybe<StringFieldComparison>;
  fleetId?: InputMaybe<IdFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<FleetWalletFilter>>;
};

export type FleetWalletMaxAggregate = {
  __typename?: 'FleetWalletMaxAggregate';
  balance?: Maybe<Scalars['Float']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  fleetId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type FleetWalletMinAggregate = {
  __typename?: 'FleetWalletMinAggregate';
  balance?: Maybe<Scalars['Float']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  fleetId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type FleetWalletSort = {
  direction: SortDirection;
  field: FleetWalletSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum FleetWalletSortFields {
  Balance = 'balance',
  Currency = 'currency',
  FleetId = 'fleetId',
  Id = 'id'
}

export type FleetWalletSumAggregate = {
  __typename?: 'FleetWalletSumAggregate';
  balance?: Maybe<Scalars['Float']['output']>;
  fleetId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

export type FleetZonePricesConnection = {
  __typename?: 'FleetZonePricesConnection';
  /** Array of nodes. */
  nodes: Array<ZonePrice>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type FloatFieldComparison = {
  between?: InputMaybe<FloatFieldComparisonBetween>;
  eq?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<Scalars['Float']['input']>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  neq?: InputMaybe<Scalars['Float']['input']>;
  notBetween?: InputMaybe<FloatFieldComparisonBetween>;
  notIn?: InputMaybe<Array<Scalars['Float']['input']>>;
};

export type FloatFieldComparisonBetween = {
  lower: Scalars['Float']['input'];
  upper: Scalars['Float']['input'];
};

export enum Gender {
  Female = 'Female',
  Male = 'Male',
  Unknown = 'Unknown'
}

export type GenderDistribution = {
  __typename?: 'GenderDistribution';
  count: Scalars['Int']['output'];
  gender: Gender;
};

export type GenderFilterComparison = {
  eq?: InputMaybe<Gender>;
  gt?: InputMaybe<Gender>;
  gte?: InputMaybe<Gender>;
  iLike?: InputMaybe<Gender>;
  in?: InputMaybe<Array<Gender>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Gender>;
  lt?: InputMaybe<Gender>;
  lte?: InputMaybe<Gender>;
  neq?: InputMaybe<Gender>;
  notILike?: InputMaybe<Gender>;
  notIn?: InputMaybe<Array<Gender>>;
  notLike?: InputMaybe<Gender>;
};

export enum GeoProvider {
  Google = 'GOOGLE',
  Mapbox = 'MAPBOX',
  Nominatim = 'NOMINATIM'
}

export type GiftBatch = {
  __typename?: 'GiftBatch';
  amount: Scalars['Float']['output'];
  availableFrom?: Maybe<Scalars['DateTime']['output']>;
  currency: Scalars['String']['output'];
  expireAt?: Maybe<Scalars['DateTime']['output']>;
  giftCodes: GiftBatchGiftCodesConnection;
  giftCodesAggregate: Array<GiftBatchGiftCodesAggregateResponse>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};


export type GiftBatchGiftCodesArgs = {
  filter?: GiftCodeFilter;
  paging?: OffsetPaging;
  sorting?: Array<GiftCodeSort>;
};


export type GiftBatchGiftCodesAggregateArgs = {
  filter?: InputMaybe<GiftCodeAggregateFilter>;
};

export type GiftBatchConnection = {
  __typename?: 'GiftBatchConnection';
  /** Array of nodes. */
  nodes: Array<GiftBatch>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type GiftBatchFilter = {
  and?: InputMaybe<Array<GiftBatchFilter>>;
  currency?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<GiftBatchFilter>>;
};

export type GiftBatchGiftCodesAggregateGroupBy = {
  __typename?: 'GiftBatchGiftCodesAggregateGroupBy';
  giftId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  usedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type GiftBatchGiftCodesAggregateResponse = {
  __typename?: 'GiftBatchGiftCodesAggregateResponse';
  avg?: Maybe<GiftBatchGiftCodesAvgAggregate>;
  count?: Maybe<GiftBatchGiftCodesCountAggregate>;
  groupBy?: Maybe<GiftBatchGiftCodesAggregateGroupBy>;
  max?: Maybe<GiftBatchGiftCodesMaxAggregate>;
  min?: Maybe<GiftBatchGiftCodesMinAggregate>;
  sum?: Maybe<GiftBatchGiftCodesSumAggregate>;
};

export type GiftBatchGiftCodesAvgAggregate = {
  __typename?: 'GiftBatchGiftCodesAvgAggregate';
  giftId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

export type GiftBatchGiftCodesConnection = {
  __typename?: 'GiftBatchGiftCodesConnection';
  /** Array of nodes. */
  nodes: Array<GiftCode>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type GiftBatchGiftCodesCountAggregate = {
  __typename?: 'GiftBatchGiftCodesCountAggregate';
  giftId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  usedAt?: Maybe<Scalars['Int']['output']>;
};

export type GiftBatchGiftCodesMaxAggregate = {
  __typename?: 'GiftBatchGiftCodesMaxAggregate';
  giftId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  usedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type GiftBatchGiftCodesMinAggregate = {
  __typename?: 'GiftBatchGiftCodesMinAggregate';
  giftId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  usedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type GiftBatchGiftCodesSumAggregate = {
  __typename?: 'GiftBatchGiftCodesSumAggregate';
  giftId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

export type GiftBatchSort = {
  direction: SortDirection;
  field: GiftBatchSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum GiftBatchSortFields {
  Currency = 'currency',
  Id = 'id',
  Name = 'name'
}

export type GiftCode = {
  __typename?: 'GiftCode';
  code: Scalars['String']['output'];
  driverTransaction?: Maybe<DriverTransaction>;
  giftId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  riderTransaction?: Maybe<RiderTransaction>;
  usedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type GiftCodeAggregateFilter = {
  and?: InputMaybe<Array<GiftCodeAggregateFilter>>;
  giftId?: InputMaybe<IdFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<GiftCodeAggregateFilter>>;
  usedAt?: InputMaybe<DateFieldComparison>;
};

export type GiftCodeConnection = {
  __typename?: 'GiftCodeConnection';
  /** Array of nodes. */
  nodes: Array<GiftCode>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type GiftCodeFilter = {
  and?: InputMaybe<Array<GiftCodeFilter>>;
  giftId?: InputMaybe<IdFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<GiftCodeFilter>>;
  usedAt?: InputMaybe<DateFieldComparison>;
};

export type GiftCodeSort = {
  direction: SortDirection;
  field: GiftCodeSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum GiftCodeSortFields {
  GiftId = 'giftId',
  Id = 'id',
  UsedAt = 'usedAt'
}

/** Group by */
export enum GroupBy {
  Day = 'DAY',
  Month = 'MONTH',
  Week = 'WEEK',
  Year = 'YEAR'
}

export type IdFilterComparison = {
  eq?: InputMaybe<Scalars['ID']['input']>;
  gt?: InputMaybe<Scalars['ID']['input']>;
  gte?: InputMaybe<Scalars['ID']['input']>;
  iLike?: InputMaybe<Scalars['ID']['input']>;
  in?: InputMaybe<Array<Scalars['ID']['input']>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['ID']['input']>;
  lt?: InputMaybe<Scalars['ID']['input']>;
  lte?: InputMaybe<Scalars['ID']['input']>;
  neq?: InputMaybe<Scalars['ID']['input']>;
  notILike?: InputMaybe<Scalars['ID']['input']>;
  notIn?: InputMaybe<Array<Scalars['ID']['input']>>;
  notLike?: InputMaybe<Scalars['ID']['input']>;
};

export type IncomeResultItem = {
  __typename?: 'IncomeResultItem';
  currency: Scalars['String']['output'];
  sum: Scalars['Float']['output'];
  time: Scalars['String']['output'];
};

export type IntFieldComparison = {
  between?: InputMaybe<IntFieldComparisonBetween>;
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  neq?: InputMaybe<Scalars['Int']['input']>;
  notBetween?: InputMaybe<IntFieldComparisonBetween>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type IntFieldComparisonBetween = {
  lower: Scalars['Int']['input'];
  upper: Scalars['Int']['input'];
};

export type Item = {
  __typename?: 'Item';
  /** The base price of the item */
  basePrice: Scalars['Float']['output'];
  categories: Array<ItemCategory>;
  description?: Maybe<Scalars['String']['output']>;
  discountPercentage: Scalars['Int']['output'];
  discountUntil?: Maybe<Scalars['DateTime']['output']>;
  discountedQuantity: Scalars['Int']['output'];
  feedbacks: ItemFeedbacksConnection;
  id: Scalars['ID']['output'];
  image?: Maybe<Media>;
  name: Scalars['String']['output'];
  options: Array<ItemOption>;
  presets: Array<ShopItemPreset>;
  ratingAggregate: RatingAggregate;
  shopId: Scalars['ID']['output'];
  /** The stock quantity */
  stockQuantity: Scalars['Int']['output'];
  usedDiscountedQuantity: Scalars['Int']['output'];
  variants: Array<ItemVariant>;
};


export type ItemCategoriesArgs = {
  filter?: ItemCategoryFilter;
  sorting?: Array<ItemCategorySort>;
};


export type ItemFeedbacksArgs = {
  filter?: ShopFeedbackFilter;
  paging?: OffsetPaging;
  sorting?: Array<ShopFeedbackSort>;
};


export type ItemOptionsArgs = {
  filter?: ItemOptionFilter;
  sorting?: Array<ItemOptionSort>;
};


export type ItemPresetsArgs = {
  filter?: ShopItemPresetFilter;
  sorting?: Array<ShopItemPresetSort>;
};


export type ItemVariantsArgs = {
  filter?: ItemVariantFilter;
  sorting?: Array<ItemVariantSort>;
};

export type ItemCategory = {
  __typename?: 'ItemCategory';
  id: Scalars['ID']['output'];
  items: ItemCategoryItemsConnection;
  name: Scalars['String']['output'];
  presets: Array<ShopItemPreset>;
  shopId: Scalars['ID']['output'];
};


export type ItemCategoryItemsArgs = {
  filter?: ItemFilter;
  paging?: OffsetPaging;
  sorting?: Array<ItemSort>;
};


export type ItemCategoryPresetsArgs = {
  filter?: ShopItemPresetFilter;
  sorting?: Array<ShopItemPresetSort>;
};

export type ItemCategoryConnection = {
  __typename?: 'ItemCategoryConnection';
  /** Array of nodes. */
  nodes: Array<ItemCategory>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type ItemCategoryDeleteResponse = {
  __typename?: 'ItemCategoryDeleteResponse';
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  shopId?: Maybe<Scalars['ID']['output']>;
};

export type ItemCategoryFilter = {
  and?: InputMaybe<Array<ItemCategoryFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  items?: InputMaybe<ItemCategoryFilterItemFilter>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<ItemCategoryFilter>>;
  presets?: InputMaybe<ItemCategoryFilterShopItemPresetFilter>;
  shopId?: InputMaybe<IdFilterComparison>;
};

export type ItemCategoryFilterItemFilter = {
  and?: InputMaybe<Array<ItemCategoryFilterItemFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<ItemCategoryFilterItemFilter>>;
  shopId?: InputMaybe<IdFilterComparison>;
};

export type ItemCategoryFilterShopItemPresetFilter = {
  and?: InputMaybe<Array<ItemCategoryFilterShopItemPresetFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<ItemCategoryFilterShopItemPresetFilter>>;
  shopId?: InputMaybe<IdFilterComparison>;
};

export type ItemCategoryItemsConnection = {
  __typename?: 'ItemCategoryItemsConnection';
  /** Array of nodes. */
  nodes: Array<Item>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type ItemCategorySort = {
  direction: SortDirection;
  field: ItemCategorySortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum ItemCategorySortFields {
  Id = 'id',
  Name = 'name',
  ShopId = 'shopId'
}

export type ItemConnection = {
  __typename?: 'ItemConnection';
  /** Array of nodes. */
  nodes: Array<Item>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type ItemDeleteResponse = {
  __typename?: 'ItemDeleteResponse';
  /** The base price of the item */
  basePrice?: Maybe<Scalars['Float']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  discountPercentage?: Maybe<Scalars['Int']['output']>;
  discountUntil?: Maybe<Scalars['DateTime']['output']>;
  discountedQuantity?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  ratingAggregate?: Maybe<RatingAggregate>;
  shopId?: Maybe<Scalars['ID']['output']>;
  /** The stock quantity */
  stockQuantity?: Maybe<Scalars['Int']['output']>;
  usedDiscountedQuantity?: Maybe<Scalars['Int']['output']>;
};

export type ItemFeedbacksConnection = {
  __typename?: 'ItemFeedbacksConnection';
  /** Array of nodes. */
  nodes: Array<ShopFeedback>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type ItemFilter = {
  and?: InputMaybe<Array<ItemFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<ItemFilter>>;
  shopId?: InputMaybe<IdFilterComparison>;
};

export type ItemOption = {
  __typename?: 'ItemOption';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
};

export type ItemOptionFilter = {
  and?: InputMaybe<Array<ItemOptionFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ItemOptionFilter>>;
};

export type ItemOptionSort = {
  direction: SortDirection;
  field: ItemOptionSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum ItemOptionSortFields {
  Id = 'id'
}

export type ItemSort = {
  direction: SortDirection;
  field: ItemSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum ItemSortFields {
  Id = 'id',
  Name = 'name',
  ShopId = 'shopId'
}

export type ItemVariant = {
  __typename?: 'ItemVariant';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  item: Item;
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
};

export type ItemVariantFilter = {
  and?: InputMaybe<Array<ItemVariantFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ItemVariantFilter>>;
};

export type ItemVariantSort = {
  direction: SortDirection;
  field: ItemVariantSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum ItemVariantSortFields {
  Id = 'id'
}

export type KpiAppBreakdown = {
  __typename?: 'KPIAppBreakdown';
  /** Application key or enum value (e.g., "taxi") */
  app: AppType;
  /** Percentage share of the KPI that belongs to this app */
  percentage: Scalars['Float']['output'];
  /** Value for this app in the current time period */
  value: Scalars['Float']['output'];
};

/** KPI period for the platform overview */
export enum KpiPeriod {
  AllTime = 'AllTime',
  Last7Days = 'Last7Days',
  Last30Days = 'Last30Days',
  Last90Days = 'Last90Days',
  Last365Days = 'Last365Days'
}

export type LeaderboardItem = {
  __typename?: 'LeaderboardItem';
  avatarUrl?: Maybe<Scalars['String']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  totalAmount?: Maybe<Scalars['Float']['output']>;
  totalCount: Scalars['Int']['output'];
};

export type License = {
  __typename?: 'License';
  buyerName: Scalars['String']['output'];
  connectedApps: Array<AppType>;
  licenseType: LicenseType;
  platformAddons: Array<PlatformAddOn>;
  supportExpireDate: Scalars['DateTime']['output'];
};

export type LicenseInformation = {
  __typename?: 'LicenseInformation';
  availableUpgrades?: Maybe<Array<AvaialbeUpgrade>>;
  benefits?: Maybe<Array<Scalars['String']['output']>>;
  drawbacks?: Maybe<Array<Scalars['String']['output']>>;
  license?: Maybe<License>;
};

export enum LicenseType {
  Bronze = 'Bronze',
  Extended = 'Extended',
  Gold = 'Gold',
  Regular = 'Regular',
  Silver = 'Silver'
}

export type ManualPayoutInput = {
  /** Fill this with the user's app type. Taxi for a driver, Parking for a Park Owner and Shop for a shop owner */
  appType?: AppType;
  description?: InputMaybe<Scalars['String']['input']>;
  transactionNumber: Scalars['String']['input'];
  userTransactionId: Scalars['ID']['input'];
};

export type Media = {
  __typename?: 'Media';
  address: Scalars['String']['output'];
  base64?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
};

export type MediaAggregateFilter = {
  and?: InputMaybe<Array<MediaAggregateFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<MediaAggregateFilter>>;
};

export type MediaEdge = {
  __typename?: 'MediaEdge';
  /** Cursor for this node. */
  cursor: Scalars['ConnectionCursor']['output'];
  /** The node containing the Media */
  node: Media;
};

export type MediaFilter = {
  and?: InputMaybe<Array<MediaFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<MediaFilter>>;
};

export type MediaSort = {
  direction: SortDirection;
  field: MediaSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum MediaSortFields {
  Id = 'id'
}

export enum MessageStatus {
  Delivered = 'Delivered',
  Seen = 'Seen',
  Sent = 'Sent'
}

export type Mutation = {
  __typename?: 'Mutation';
  addCommentToParkingSupportRequest: ParkingSupportRequestActivity;
  addCommentToShopSupportRequest: ShopSupportRequestActivity;
  addCommentToTaxiSupportRequest: TaxiSupportRequestActivity;
  addFleetsToZonePrice: ZonePrice;
  addOptionsToService: Service;
  addRegionsToService: Service;
  addServicesToZonePrice: ZonePrice;
  assignDriverToOrder: Order;
  assignParkingSupportRequestToStaff: ParkingSupportRequestActivity;
  assignShopSupportRequestToStaff: ShopSupportRequestActivity;
  assignTaxiSupportRequestToStaff: TaxiSupportRequestActivity;
  cancelOrder: Order;
  cancelShopOrderCarts: ShopOrder;
  changeParkingSupportRequestStatus: ParkingSupportRequestActivity;
  changeShopSupportRequestStatus: ShopSupportRequestActivity;
  changeTaxiSupportRequestStatus: TaxiSupportRequestActivity;
  createCampaign: Campaign;
  createDriverTransaction: DriverWallet;
  createFleetTransaction: FleetWallet;
  createGiftCardBatch: GiftBatch;
  createManyDriverDocumentRetentionPolicies: Array<DriverDocumentRetentionPolicy>;
  createManyDriverDocuments: Array<DriverDocument>;
  createManyDriverShiftRules: Array<DriverShiftRule>;
  createManySMS: Array<Sms>;
  createManySMSProviders: Array<SmsProvider>;
  createOneAnnouncement: Announcement;
  createOneCarColor: CarColor;
  createOneCarModel: CarModel;
  createOneCoupon: Coupon;
  createOneCustomerNote: CustomerNote;
  createOneDriver: Driver;
  createOneDriverDocument: DriverDocument;
  createOneDriverDocumentRetentionPolicy: DriverDocumentRetentionPolicy;
  createOneDriverNote: DriverNote;
  createOneDriverShiftRule: DriverShiftRule;
  createOneDriverToDriverDocument: DriverToDriverDocument;
  createOneDriverTransaction: DriverTransaction;
  createOneFeedbackParameter: FeedbackParameter;
  createOneFleet: Fleet;
  createOneFleetStaff: FleetStaff;
  createOneItem: Item;
  createOneItemCategory: ItemCategory;
  createOneOperator: Operator;
  createOneOperatorRole: OperatorRole;
  createOneOrderCancelReason: OrderCancelReason;
  createOneParkOrder: ParkOrder;
  createOneParkOrderNote: ParkOrderNote;
  createOneParkSpotNote: ParkSpotNote;
  createOneParkingFeedbackParameter: ParkingFeedbackParameter;
  createOneParkingSupportRequestActivity: ParkingSupportRequestActivity;
  createOneParkingTransaction: ParkingTransaction;
  createOnePaymentGateway: PaymentGateway;
  createOnePayoutMethod: PayoutMethod;
  createOneProviderTransaction: ProviderTransaction;
  createOneRegion: Region;
  createOneRegionCategory: RegionCategory;
  createOneReward: Reward;
  createOneRider: Rider;
  createOneRiderAddress: RiderAddress;
  createOneRiderTransaction: RiderTransaction;
  createOneSMS: Sms;
  createOneSMSProvider: SmsProvider;
  createOneSOSActivity: SosActivity;
  createOneSOSReason: SosReason;
  createOneService: Service;
  createOneServiceCategory: ServiceCategory;
  createOneServiceOption: ServiceOption;
  createOneShop: Shop;
  createOneShopCategory: ShopCategory;
  createOneShopDeliveryZone: ShopDeliveryZone;
  createOneShopFeedbackParameter: ShopFeedbackParameter;
  createOneShopItemPreset: ShopItemPreset;
  createOneShopNote: ShopNote;
  createOneShopOrderNote: ShopOrderNote;
  createOneShopSupportRequestActivity: ShopSupportRequestActivity;
  createOneShopTransaction: ShopTransaction;
  createOneTaxiSupportRequestActivity: TaxiSupportRequestActivity;
  createOneZonePrice: ZonePrice;
  createOneZonePriceCategory: ZonePriceCategory;
  createOrder: Order;
  createParkingPayoutSession: ParkingPayoutSession;
  createParkingSpot: ParkSpot;
  createRiderTransaction: RiderWallet;
  createShopOrder: ShopOrder;
  createShopPayoutSession: ShopPayoutSession;
  createTaxiOrderNote: TaxiOrderNote;
  createTaxiPayoutSession: TaxiPayoutSession;
  deleteManyDriverDocumentRetentionPolicies: DeleteManyResponse;
  deleteManyDriverDocuments: DeleteManyResponse;
  deleteManyDriverShiftRules: DeleteManyResponse;
  deleteManySMS: DeleteManyResponse;
  deleteManySMSProviders: DeleteManyResponse;
  deleteOneAnnouncement: AnnouncementDeleteResponse;
  deleteOneCampaign: CampaignDeleteResponse;
  deleteOneCarColor: CarColorDeleteResponse;
  deleteOneCarModel: CarModelDeleteResponse;
  deleteOneCoupon: CouponDeleteResponse;
  deleteOneCustomerSession: CustomerSessionDeleteResponse;
  deleteOneDriver: Driver;
  deleteOneDriverDocument: DriverDocumentDeleteResponse;
  deleteOneDriverDocumentRetentionPolicy: DriverDocumentRetentionPolicyDeleteResponse;
  deleteOneDriverSession: DriverSessionDeleteResponse;
  deleteOneDriverShiftRule: DriverShiftRuleDeleteResponse;
  deleteOneDriverToDriverDocument: DriverToDriverDocumentDeleteResponse;
  deleteOneFeedbackParameter: FeedbackParameterDeleteResponse;
  deleteOneFleet: FleetDeleteResponse;
  deleteOneFleetStaff: FleetStaffDeleteResponse;
  deleteOneItem: ItemDeleteResponse;
  deleteOneItemCategory: ItemCategoryDeleteResponse;
  deleteOneOperator: OperatorDeleteResponse;
  deleteOneOperatorRole: OperatorRoleDeleteResponse;
  deleteOneOrderCancelReason: OrderCancelReasonDeleteResponse;
  deleteOneParkingFeedbackParameter: ParkingFeedbackParameterDeleteResponse;
  deleteOnePaymentGateway: PaymentGatewayDeleteResponse;
  deleteOnePayoutMethod: PayoutMethodDeleteResponse;
  deleteOneRegion: RegionDeleteResponse;
  deleteOneRegionCategory: RegionCategoryDeleteResponse;
  deleteOneReward: RewardDeleteResponse;
  deleteOneRider: Rider;
  deleteOneSMS: SmsDeleteResponse;
  deleteOneSMSProvider: SmsProviderDeleteResponse;
  deleteOneSOSReason: SosReasonDeleteResponse;
  deleteOneSavedPaymentMethod: SavedPaymentMethodDeleteResponse;
  deleteOneService: ServiceDeleteResponse;
  deleteOneServiceCategory: ServiceCategoryDeleteResponse;
  deleteOneServiceOption: ServiceOptionDeleteResponse;
  deleteOneShop: ShopDeleteResponse;
  deleteOneShopCategory: ShopCategoryDeleteResponse;
  deleteOneShopDeliveryZone: ShopDeliveryZoneDeleteResponse;
  deleteOneShopFeedbackParameter: ShopFeedbackParameterDeleteResponse;
  deleteOneShopItemPreset: ShopItemPresetDeleteResponse;
  deleteOneZonePrice: ZonePriceDeleteResponse;
  deleteOneZonePriceCategory: ZonePriceCategoryDeleteResponse;
  disablePreviousServer: UpdateConfigResult;
  exportGiftCardBatch: Scalars['String']['output'];
  exportParkingPayoutSessionToCsv: Scalars['String']['output'];
  exportShopPayoutSessionToCsv: Scalars['String']['output'];
  exportTaxiPayoutSessionToCsv: Scalars['String']['output'];
  markAsRead: Scalars['Boolean']['output'];
  markSMSProviderAsDefault: SmsProvider;
  removeItemFromCart: ShopOrder;
  runParkingAutoPayout: Scalars['Boolean']['output'];
  runShopAutoPayout: Scalars['Boolean']['output'];
  runTaxiAutoPayout: Scalars['Boolean']['output'];
  /** @deprecated Use updateConfigurations instead */
  saveConfiguration: CurrentConfiguration;
  setActivatedServicesOnDriver: Scalars['Boolean']['output'];
  setFleetsOnZonePrice: ZonePrice;
  setOptionsOnService: Service;
  setRegionsOnService: Service;
  setServicesOnZonePrice: ZonePrice;
  taxiManualPayout: DriverTransaction;
  terminateCustomerLoginSession: Scalars['Boolean']['output'];
  terminateDriverLoginSession: Scalars['Boolean']['output'];
  terminateFleetStaffSession: Scalars['Boolean']['output'];
  terminateParkingLoginSession: Scalars['Boolean']['output'];
  terminateShopLoginSession: Scalars['Boolean']['output'];
  terminateStaffSession: Scalars['Boolean']['output'];
  updateConfigurations: UpdateConfigResult;
  /** @deprecated Use updateConfigurations instead */
  updateFirebase: UpdateConfigResult;
  updateManyDriverDocumentRetentionPolicies: UpdateManyResponse;
  updateManyDriverDocuments: UpdateManyResponse;
  updateManyDriverShiftRules: UpdateManyResponse;
  updateManyRiderAddresses: UpdateManyResponse;
  updateManySMS: UpdateManyResponse;
  updateManySMSProviders: UpdateManyResponse;
  /** @deprecated Use updateConfigurations instead */
  updateMapsAPIKey: UpdateConfigResult;
  updateOneAnnouncement: Announcement;
  updateOneCarColor: CarColor;
  updateOneCarModel: CarModel;
  updateOneCoupon: Coupon;
  updateOneDistressSignal: DistressSignal;
  updateOneDriver: Driver;
  updateOneDriverDocument: DriverDocument;
  updateOneDriverDocumentRetentionPolicy: DriverDocumentRetentionPolicy;
  updateOneDriverShiftRule: DriverShiftRule;
  updateOneDriverToDriverDocument: DriverToDriverDocument;
  updateOneFeedback: Feedback;
  updateOneFeedbackParameter: FeedbackParameter;
  updateOneFleet: Fleet;
  updateOneFleetStaff: FleetStaff;
  updateOneItem: Item;
  updateOneItemCategory: ItemCategory;
  updateOneOperator: Operator;
  updateOneOperatorRole: OperatorRole;
  updateOneOrderCancelReason: OrderCancelReason;
  updateOneParkSpot: ParkSpot;
  updateOneParkingFeedback: ParkingFeedback;
  updateOneParkingFeedbackParameter: ParkingFeedbackParameter;
  updateOneParkingPayoutSession: ParkingPayoutSession;
  updateOneParkingSupportRequest: ParkingSupportRequest;
  updateOnePaymentGateway: PaymentGateway;
  updateOnePayoutMethod: PayoutMethod;
  updateOneRegion: Region;
  updateOneRegionCategory: RegionCategory;
  updateOneReward: Reward;
  updateOneRider: Rider;
  updateOneRiderAddress: RiderAddress;
  updateOneSMS: Sms;
  updateOneSMSProvider: SmsProvider;
  updateOneSOSReason: SosReason;
  updateOneService: Service;
  updateOneServiceCategory: ServiceCategory;
  updateOneServiceOption: ServiceOption;
  updateOneShop: Shop;
  updateOneShopCategory: ShopCategory;
  updateOneShopDeliveryZone: ShopDeliveryZone;
  updateOneShopFeedback: ShopFeedback;
  updateOneShopFeedbackParameter: ShopFeedbackParameter;
  updateOneShopItemPreset: ShopItemPreset;
  updateOneShopPayoutSession: ShopPayoutSession;
  updateOneShopSupportRequest: ShopSupportRequest;
  updateOneTaxiPayoutSession: TaxiPayoutSession;
  updateOneTaxiSupportRequest: TaxiSupportRequest;
  updateOneZonePrice: ZonePrice;
  updateOneZonePriceCategory: ZonePriceCategory;
  updateParkingFeedbackStatus: ParkingFeedback;
  updatePassword: Operator;
  updateProfile: Operator;
  updatePurchaseCode: UpdatePurchaseCodeResult;
  updateShopFeedbackStatus: ShopFeedback;
};


export type MutationAddCommentToParkingSupportRequestArgs = {
  input: CreateParkingSupportRequestCommentInput;
};


export type MutationAddCommentToShopSupportRequestArgs = {
  input: CreateShopSupportRequestCommentInput;
};


export type MutationAddCommentToTaxiSupportRequestArgs = {
  input: CreateTaxiSupportRequestCommentInput;
};


export type MutationAddFleetsToZonePriceArgs = {
  input: AddFleetsToZonePriceInput;
};


export type MutationAddOptionsToServiceArgs = {
  input: AddOptionsToServiceInput;
};


export type MutationAddRegionsToServiceArgs = {
  input: AddRegionsToServiceInput;
};


export type MutationAddServicesToZonePriceArgs = {
  input: AddServicesToZonePriceInput;
};


export type MutationAssignDriverToOrderArgs = {
  driverId: Scalars['ID']['input'];
  orderId: Scalars['ID']['input'];
};


export type MutationAssignParkingSupportRequestToStaffArgs = {
  input: AssignParkingSupportRequestInput;
};


export type MutationAssignShopSupportRequestToStaffArgs = {
  input: AssignShopSupportRequestInput;
};


export type MutationAssignTaxiSupportRequestToStaffArgs = {
  input: AssignTaxiSupportRequestInput;
};


export type MutationCancelOrderArgs = {
  orderId: Scalars['ID']['input'];
};


export type MutationCancelShopOrderCartsArgs = {
  input: CancelShopOrderCartsInput;
};


export type MutationChangeParkingSupportRequestStatusArgs = {
  input: ChangeParkingSupportRequestStatusInput;
};


export type MutationChangeShopSupportRequestStatusArgs = {
  input: ChangeShopSupportRequestStatusInput;
};


export type MutationChangeTaxiSupportRequestStatusArgs = {
  input: ChangeTaxiSupportRequestStatusInput;
};


export type MutationCreateCampaignArgs = {
  input: CreateCampaignInput;
};


export type MutationCreateDriverTransactionArgs = {
  input: DriverTransactionInput;
};


export type MutationCreateFleetTransactionArgs = {
  input: FleetTransactionInput;
};


export type MutationCreateGiftCardBatchArgs = {
  input: CreateGiftBatchInput;
};


export type MutationCreateManyDriverDocumentRetentionPoliciesArgs = {
  input: CreateManyDriverDocumentRetentionPoliciesInput;
};


export type MutationCreateManyDriverDocumentsArgs = {
  input: CreateManyDriverDocumentsInput;
};


export type MutationCreateManyDriverShiftRulesArgs = {
  input: CreateManyDriverShiftRulesInput;
};


export type MutationCreateManySmsArgs = {
  input: CreateManySmsInput;
};


export type MutationCreateManySmsProvidersArgs = {
  input: CreateManySmsProvidersInput;
};


export type MutationCreateOneAnnouncementArgs = {
  input: CreateOneAnnouncementInput;
};


export type MutationCreateOneCarColorArgs = {
  input: CreateOneCarColorInput;
};


export type MutationCreateOneCarModelArgs = {
  input: CreateOneCarModelInput;
};


export type MutationCreateOneCouponArgs = {
  input: CreateOneCouponInput;
};


export type MutationCreateOneCustomerNoteArgs = {
  input: CreateOneCustomerNoteInput;
};


export type MutationCreateOneDriverArgs = {
  input: CreateOneDriverInput;
};


export type MutationCreateOneDriverDocumentArgs = {
  input: CreateOneDriverDocumentInput;
};


export type MutationCreateOneDriverDocumentRetentionPolicyArgs = {
  input: CreateOneDriverDocumentRetentionPolicyInput;
};


export type MutationCreateOneDriverNoteArgs = {
  input: CreateOneDriverNoteInput;
};


export type MutationCreateOneDriverShiftRuleArgs = {
  input: CreateOneDriverShiftRuleInput;
};


export type MutationCreateOneDriverToDriverDocumentArgs = {
  input: CreateOneDriverToDriverDocumentInput;
};


export type MutationCreateOneDriverTransactionArgs = {
  input: CreateOneDriverTransactionInput;
};


export type MutationCreateOneFeedbackParameterArgs = {
  input: CreateOneFeedbackParameterInput;
};


export type MutationCreateOneFleetArgs = {
  input: CreateOneFleetInput;
};


export type MutationCreateOneFleetStaffArgs = {
  input: CreateOneFleetStaffInput;
};


export type MutationCreateOneItemArgs = {
  input: CreateOneItemInput;
};


export type MutationCreateOneItemCategoryArgs = {
  input: CreateOneItemCategoryInput;
};


export type MutationCreateOneOperatorArgs = {
  input: CreateOneOperatorInput;
};


export type MutationCreateOneOperatorRoleArgs = {
  input: CreateOneOperatorRoleInput;
};


export type MutationCreateOneOrderCancelReasonArgs = {
  input: CreateOneOrderCancelReasonInput;
};


export type MutationCreateOneParkOrderArgs = {
  input: CreateOneParkOrderInput;
};


export type MutationCreateOneParkOrderNoteArgs = {
  input: CreateOneParkOrderNoteInput;
};


export type MutationCreateOneParkSpotNoteArgs = {
  input: CreateOneParkSpotNoteInput;
};


export type MutationCreateOneParkingFeedbackParameterArgs = {
  input: CreateOneParkingFeedbackParameterInput;
};


export type MutationCreateOneParkingSupportRequestActivityArgs = {
  input: CreateOneParkingSupportRequestActivityInput;
};


export type MutationCreateOneParkingTransactionArgs = {
  input: CreateOneParkingTransactionInput;
};


export type MutationCreateOnePaymentGatewayArgs = {
  input: CreateOnePaymentGatewayInput;
};


export type MutationCreateOnePayoutMethodArgs = {
  input: CreateOnePayoutMethodInput;
};


export type MutationCreateOneProviderTransactionArgs = {
  input: CreateOneProviderTransactionInput;
};


export type MutationCreateOneRegionArgs = {
  input: CreateOneRegionInput;
};


export type MutationCreateOneRegionCategoryArgs = {
  input: CreateOneRegionCategoryInput;
};


export type MutationCreateOneRewardArgs = {
  input: CreateOneRewardInput;
};


export type MutationCreateOneRiderArgs = {
  input: CreateOneRiderInput;
};


export type MutationCreateOneRiderAddressArgs = {
  input: CreateOneRiderAddressInput;
};


export type MutationCreateOneRiderTransactionArgs = {
  input: CreateOneRiderTransactionInput;
};


export type MutationCreateOneSmsArgs = {
  input: CreateOneSmsInput;
};


export type MutationCreateOneSmsProviderArgs = {
  input: CreateOneSmsProviderInput;
};


export type MutationCreateOneSosActivityArgs = {
  input: CreateOneSosActivityInput;
};


export type MutationCreateOneSosReasonArgs = {
  input: CreateOneSosReasonInput;
};


export type MutationCreateOneServiceArgs = {
  input: CreateOneServiceInput;
};


export type MutationCreateOneServiceCategoryArgs = {
  input: CreateOneServiceCategoryInput;
};


export type MutationCreateOneServiceOptionArgs = {
  input: CreateOneServiceOptionInput;
};


export type MutationCreateOneShopArgs = {
  input: CreateOneShopInput;
};


export type MutationCreateOneShopCategoryArgs = {
  input: CreateOneShopCategoryInput;
};


export type MutationCreateOneShopDeliveryZoneArgs = {
  input: CreateOneShopDeliveryZoneInput;
};


export type MutationCreateOneShopFeedbackParameterArgs = {
  input: CreateOneShopFeedbackParameterInput;
};


export type MutationCreateOneShopItemPresetArgs = {
  input: CreateOneShopItemPresetInput;
};


export type MutationCreateOneShopNoteArgs = {
  input: CreateOneShopNoteInput;
};


export type MutationCreateOneShopOrderNoteArgs = {
  input: CreateOneShopOrderNoteInput;
};


export type MutationCreateOneShopSupportRequestActivityArgs = {
  input: CreateOneShopSupportRequestActivityInput;
};


export type MutationCreateOneShopTransactionArgs = {
  input: CreateOneShopTransactionInput;
};


export type MutationCreateOneTaxiSupportRequestActivityArgs = {
  input: CreateOneTaxiSupportRequestActivityInput;
};


export type MutationCreateOneZonePriceArgs = {
  input: CreateOneZonePriceInput;
};


export type MutationCreateOneZonePriceCategoryArgs = {
  input: CreateOneZonePriceCategoryInput;
};


export type MutationCreateOrderArgs = {
  input: CreateOrderInput;
};


export type MutationCreateParkingPayoutSessionArgs = {
  input: CreatePayoutSessionInput;
};


export type MutationCreateParkingSpotArgs = {
  input: CreateParkSpotInput;
};


export type MutationCreateRiderTransactionArgs = {
  input: RiderTransactionInput;
};


export type MutationCreateShopOrderArgs = {
  input: ShopOrderInput;
};


export type MutationCreateShopPayoutSessionArgs = {
  input: CreatePayoutSessionInput;
};


export type MutationCreateTaxiOrderNoteArgs = {
  input: CreateTaxiOrderNoteInput;
};


export type MutationCreateTaxiPayoutSessionArgs = {
  input: CreatePayoutSessionInput;
};


export type MutationDeleteManyDriverDocumentRetentionPoliciesArgs = {
  input: DeleteManyDriverDocumentRetentionPoliciesInput;
};


export type MutationDeleteManyDriverDocumentsArgs = {
  input: DeleteManyDriverDocumentsInput;
};


export type MutationDeleteManyDriverShiftRulesArgs = {
  input: DeleteManyDriverShiftRulesInput;
};


export type MutationDeleteManySmsArgs = {
  input: DeleteManySmsInput;
};


export type MutationDeleteManySmsProvidersArgs = {
  input: DeleteManySmsProvidersInput;
};


export type MutationDeleteOneAnnouncementArgs = {
  input: DeleteOneAnnouncementInput;
};


export type MutationDeleteOneCampaignArgs = {
  input: DeleteOneCampaignInput;
};


export type MutationDeleteOneCarColorArgs = {
  input: DeleteOneCarColorInput;
};


export type MutationDeleteOneCarModelArgs = {
  input: DeleteOneCarModelInput;
};


export type MutationDeleteOneCouponArgs = {
  input: DeleteOneCouponInput;
};


export type MutationDeleteOneCustomerSessionArgs = {
  input: DeleteOneCustomerSessionInput;
};


export type MutationDeleteOneDriverArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteOneDriverDocumentArgs = {
  input: DeleteOneDriverDocumentInput;
};


export type MutationDeleteOneDriverDocumentRetentionPolicyArgs = {
  input: DeleteOneDriverDocumentRetentionPolicyInput;
};


export type MutationDeleteOneDriverSessionArgs = {
  input: DeleteOneDriverSessionInput;
};


export type MutationDeleteOneDriverShiftRuleArgs = {
  input: DeleteOneDriverShiftRuleInput;
};


export type MutationDeleteOneDriverToDriverDocumentArgs = {
  input: DeleteOneDriverToDriverDocumentInput;
};


export type MutationDeleteOneFeedbackParameterArgs = {
  input: DeleteOneFeedbackParameterInput;
};


export type MutationDeleteOneFleetArgs = {
  input: DeleteOneFleetInput;
};


export type MutationDeleteOneFleetStaffArgs = {
  input: DeleteOneFleetStaffInput;
};


export type MutationDeleteOneItemArgs = {
  input: DeleteOneItemInput;
};


export type MutationDeleteOneItemCategoryArgs = {
  input: DeleteOneItemCategoryInput;
};


export type MutationDeleteOneOperatorArgs = {
  input: DeleteOneOperatorInput;
};


export type MutationDeleteOneOperatorRoleArgs = {
  input: DeleteOneOperatorRoleInput;
};


export type MutationDeleteOneOrderCancelReasonArgs = {
  input: DeleteOneOrderCancelReasonInput;
};


export type MutationDeleteOneParkingFeedbackParameterArgs = {
  input: DeleteOneParkingFeedbackParameterInput;
};


export type MutationDeleteOnePaymentGatewayArgs = {
  input: DeleteOnePaymentGatewayInput;
};


export type MutationDeleteOnePayoutMethodArgs = {
  input: DeleteOnePayoutMethodInput;
};


export type MutationDeleteOneRegionArgs = {
  input: DeleteOneRegionInput;
};


export type MutationDeleteOneRegionCategoryArgs = {
  input: DeleteOneRegionCategoryInput;
};


export type MutationDeleteOneRewardArgs = {
  input: DeleteOneRewardInput;
};


export type MutationDeleteOneRiderArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteOneSmsArgs = {
  input: DeleteOneSmsInput;
};


export type MutationDeleteOneSmsProviderArgs = {
  input: DeleteOneSmsProviderInput;
};


export type MutationDeleteOneSosReasonArgs = {
  input: DeleteOneSosReasonInput;
};


export type MutationDeleteOneSavedPaymentMethodArgs = {
  input: DeleteOneSavedPaymentMethodInput;
};


export type MutationDeleteOneServiceArgs = {
  input: DeleteOneServiceInput;
};


export type MutationDeleteOneServiceCategoryArgs = {
  input: DeleteOneServiceCategoryInput;
};


export type MutationDeleteOneServiceOptionArgs = {
  input: DeleteOneServiceOptionInput;
};


export type MutationDeleteOneShopArgs = {
  input: DeleteOneShopInput;
};


export type MutationDeleteOneShopCategoryArgs = {
  input: DeleteOneShopCategoryInput;
};


export type MutationDeleteOneShopDeliveryZoneArgs = {
  input: DeleteOneShopDeliveryZoneInput;
};


export type MutationDeleteOneShopFeedbackParameterArgs = {
  input: DeleteOneShopFeedbackParameterInput;
};


export type MutationDeleteOneShopItemPresetArgs = {
  input: DeleteOneShopItemPresetInput;
};


export type MutationDeleteOneZonePriceArgs = {
  input: DeleteOneZonePriceInput;
};


export type MutationDeleteOneZonePriceCategoryArgs = {
  input: DeleteOneZonePriceCategoryInput;
};


export type MutationDisablePreviousServerArgs = {
  ip: Scalars['String']['input'];
  purchaseCode?: InputMaybe<Scalars['String']['input']>;
};


export type MutationExportGiftCardBatchArgs = {
  batchId: Scalars['ID']['input'];
};


export type MutationExportParkingPayoutSessionToCsvArgs = {
  input: ExportSessionToCsvInput;
};


export type MutationExportShopPayoutSessionToCsvArgs = {
  input: ExportSessionToCsvInput;
};


export type MutationExportTaxiPayoutSessionToCsvArgs = {
  input: ExportSessionToCsvInput;
};


export type MutationMarkAsReadArgs = {
  notificationIds: Array<Scalars['ID']['input']>;
};


export type MutationMarkSmsProviderAsDefaultArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveItemFromCartArgs = {
  input: RemoveItemFromCartInput;
};


export type MutationRunParkingAutoPayoutArgs = {
  input: RunAutoPayoutInput;
};


export type MutationRunShopAutoPayoutArgs = {
  input: RunAutoPayoutInput;
};


export type MutationRunTaxiAutoPayoutArgs = {
  input: RunAutoPayoutInput;
};


export type MutationSaveConfigurationArgs = {
  input: UpdateConfigInput;
};


export type MutationSetActivatedServicesOnDriverArgs = {
  input: SetActiveServicesOnDriverInput;
};


export type MutationSetFleetsOnZonePriceArgs = {
  input: SetFleetsOnZonePriceInput;
};


export type MutationSetOptionsOnServiceArgs = {
  input: SetOptionsOnServiceInput;
};


export type MutationSetRegionsOnServiceArgs = {
  input: SetRegionsOnServiceInput;
};


export type MutationSetServicesOnZonePriceArgs = {
  input: SetServicesOnZonePriceInput;
};


export type MutationTaxiManualPayoutArgs = {
  input: ManualPayoutInput;
};


export type MutationTerminateCustomerLoginSessionArgs = {
  sessionId: Scalars['ID']['input'];
};


export type MutationTerminateDriverLoginSessionArgs = {
  sessionId: Scalars['ID']['input'];
};


export type MutationTerminateFleetStaffSessionArgs = {
  id: Scalars['ID']['input'];
};


export type MutationTerminateParkingLoginSessionArgs = {
  sessionId: Scalars['ID']['input'];
};


export type MutationTerminateShopLoginSessionArgs = {
  sessionId: Scalars['ID']['input'];
};


export type MutationTerminateStaffSessionArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateConfigurationsArgs = {
  input: UpdateConfigInputV2;
};


export type MutationUpdateFirebaseArgs = {
  keyFileName: Scalars['String']['input'];
};


export type MutationUpdateManyDriverDocumentRetentionPoliciesArgs = {
  input: UpdateManyDriverDocumentRetentionPoliciesInput;
};


export type MutationUpdateManyDriverDocumentsArgs = {
  input: UpdateManyDriverDocumentsInput;
};


export type MutationUpdateManyDriverShiftRulesArgs = {
  input: UpdateManyDriverShiftRulesInput;
};


export type MutationUpdateManyRiderAddressesArgs = {
  input: UpdateManyRiderAddressesInput;
};


export type MutationUpdateManySmsArgs = {
  input: UpdateManySmsInput;
};


export type MutationUpdateManySmsProvidersArgs = {
  input: UpdateManySmsProvidersInput;
};


export type MutationUpdateMapsApiKeyArgs = {
  adminPanel: Scalars['String']['input'];
  backend: Scalars['String']['input'];
};


export type MutationUpdateOneAnnouncementArgs = {
  input: UpdateOneAnnouncementInput;
};


export type MutationUpdateOneCarColorArgs = {
  input: UpdateOneCarColorInput;
};


export type MutationUpdateOneCarModelArgs = {
  input: UpdateOneCarModelInput;
};


export type MutationUpdateOneCouponArgs = {
  input: UpdateOneCouponInput;
};


export type MutationUpdateOneDistressSignalArgs = {
  input: UpdateOneDistressSignalInput;
};


export type MutationUpdateOneDriverArgs = {
  input: UpdateOneDriverInput;
};


export type MutationUpdateOneDriverDocumentArgs = {
  input: UpdateOneDriverDocumentInput;
};


export type MutationUpdateOneDriverDocumentRetentionPolicyArgs = {
  input: UpdateOneDriverDocumentRetentionPolicyInput;
};


export type MutationUpdateOneDriverShiftRuleArgs = {
  input: UpdateOneDriverShiftRuleInput;
};


export type MutationUpdateOneDriverToDriverDocumentArgs = {
  input: UpdateOneDriverToDriverDocumentInput;
};


export type MutationUpdateOneFeedbackArgs = {
  input: UpdateOneFeedbackInput;
};


export type MutationUpdateOneFeedbackParameterArgs = {
  input: UpdateOneFeedbackParameterInput;
};


export type MutationUpdateOneFleetArgs = {
  input: UpdateOneFleetInput;
};


export type MutationUpdateOneFleetStaffArgs = {
  input: UpdateOneFleetStaffInput;
};


export type MutationUpdateOneItemArgs = {
  input: UpdateOneItemInput;
};


export type MutationUpdateOneItemCategoryArgs = {
  input: UpdateOneItemCategoryInput;
};


export type MutationUpdateOneOperatorArgs = {
  input: UpdateOneOperatorInput;
};


export type MutationUpdateOneOperatorRoleArgs = {
  input: UpdateOneOperatorRoleInput;
};


export type MutationUpdateOneOrderCancelReasonArgs = {
  input: UpdateOneOrderCancelReasonInput;
};


export type MutationUpdateOneParkSpotArgs = {
  input: UpdateOneParkSpotInput;
};


export type MutationUpdateOneParkingFeedbackArgs = {
  input: UpdateOneParkingFeedbackInput;
};


export type MutationUpdateOneParkingFeedbackParameterArgs = {
  input: UpdateOneParkingFeedbackParameterInput;
};


export type MutationUpdateOneParkingPayoutSessionArgs = {
  input: UpdateOneParkingPayoutSessionInput;
};


export type MutationUpdateOneParkingSupportRequestArgs = {
  input: UpdateOneParkingSupportRequestInput;
};


export type MutationUpdateOnePaymentGatewayArgs = {
  input: UpdateOnePaymentGatewayInput;
};


export type MutationUpdateOnePayoutMethodArgs = {
  input: UpdateOnePayoutMethodInput;
};


export type MutationUpdateOneRegionArgs = {
  input: UpdateOneRegionInput;
};


export type MutationUpdateOneRegionCategoryArgs = {
  input: UpdateOneRegionCategoryInput;
};


export type MutationUpdateOneRewardArgs = {
  input: UpdateOneRewardInput;
};


export type MutationUpdateOneRiderArgs = {
  input: UpdateOneRiderInput;
};


export type MutationUpdateOneRiderAddressArgs = {
  input: UpdateOneRiderAddressInput;
};


export type MutationUpdateOneSmsArgs = {
  input: UpdateOneSmsInput;
};


export type MutationUpdateOneSmsProviderArgs = {
  input: UpdateOneSmsProviderInput;
};


export type MutationUpdateOneSosReasonArgs = {
  input: UpdateOneSosReasonInput;
};


export type MutationUpdateOneServiceArgs = {
  input: UpdateOneServiceInput;
};


export type MutationUpdateOneServiceCategoryArgs = {
  input: UpdateOneServiceCategoryInput;
};


export type MutationUpdateOneServiceOptionArgs = {
  input: UpdateOneServiceOptionInput;
};


export type MutationUpdateOneShopArgs = {
  input: UpdateOneShopInput;
};


export type MutationUpdateOneShopCategoryArgs = {
  input: UpdateOneShopCategoryInput;
};


export type MutationUpdateOneShopDeliveryZoneArgs = {
  input: UpdateOneShopDeliveryZoneInput;
};


export type MutationUpdateOneShopFeedbackArgs = {
  input: UpdateOneShopFeedbackInput;
};


export type MutationUpdateOneShopFeedbackParameterArgs = {
  input: UpdateOneShopFeedbackParameterInput;
};


export type MutationUpdateOneShopItemPresetArgs = {
  input: UpdateOneShopItemPresetInput;
};


export type MutationUpdateOneShopPayoutSessionArgs = {
  input: UpdateOneShopPayoutSessionInput;
};


export type MutationUpdateOneShopSupportRequestArgs = {
  input: UpdateOneShopSupportRequestInput;
};


export type MutationUpdateOneTaxiPayoutSessionArgs = {
  input: UpdateOneTaxiPayoutSessionInput;
};


export type MutationUpdateOneTaxiSupportRequestArgs = {
  input: UpdateOneTaxiSupportRequestInput;
};


export type MutationUpdateOneZonePriceArgs = {
  input: UpdateOneZonePriceInput;
};


export type MutationUpdateOneZonePriceCategoryArgs = {
  input: UpdateOneZonePriceCategoryInput;
};


export type MutationUpdateParkingFeedbackStatusArgs = {
  feedbackId: Scalars['ID']['input'];
  status: ReviewStatus;
};


export type MutationUpdatePasswordArgs = {
  input: UpdatePasswordInput;
};


export type MutationUpdateProfileArgs = {
  input: UpdateProfileInput;
};


export type MutationUpdatePurchaseCodeArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  purchaseCode: Scalars['String']['input'];
};


export type MutationUpdateShopFeedbackStatusArgs = {
  feedbackId: Scalars['ID']['input'];
  status: ReviewStatus;
};

export type NameCount = {
  __typename?: 'NameCount';
  count: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type Note = {
  __typename?: 'Note';
  createdAt: Scalars['DateTime']['output'];
  note: Scalars['String']['output'];
  staffId: Scalars['ID']['output'];
};

export type NoteInput = {
  createdAt: Scalars['DateTime']['input'];
  note: Scalars['String']['input'];
  staffId: Scalars['ID']['input'];
};

export type NumberFieldComparison = {
  between?: InputMaybe<NumberFieldComparisonBetween>;
  eq?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<Scalars['Float']['input']>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  neq?: InputMaybe<Scalars['Float']['input']>;
  notBetween?: InputMaybe<NumberFieldComparisonBetween>;
  notIn?: InputMaybe<Array<Scalars['Float']['input']>>;
};

export type NumberFieldComparisonBetween = {
  lower: Scalars['Float']['input'];
  upper: Scalars['Float']['input'];
};

export type OffsetPageInfo = {
  __typename?: 'OffsetPageInfo';
  /** true if paging forward and there are more records. */
  hasNextPage?: Maybe<Scalars['Boolean']['output']>;
  /** true if paging backwards and there are more records. */
  hasPreviousPage?: Maybe<Scalars['Boolean']['output']>;
};

export type OffsetPaging = {
  /** Limit the number of records returned */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /** Offset to start returning records from */
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type OnlineDriver = {
  __typename?: 'OnlineDriver';
  driverId: Scalars['ID']['output'];
  lastUpdatedAt: Scalars['DateTime']['output'];
  location: Point;
};

export type OnlineDriverWithData = {
  __typename?: 'OnlineDriverWithData';
  avatarUrl?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Gender>;
  id: Scalars['ID']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  lastUpdatedAt: Scalars['DateTime']['output'];
  location: Point;
  mobileNumber: Scalars['String']['output'];
  rating?: Maybe<Scalars['Int']['output']>;
  reviewCount: Scalars['Int']['output'];
  status: DriverStatus;
};

export type OpeningHoursInput = {
  close: Scalars['String']['input'];
  open: Scalars['String']['input'];
};

export type Operator = {
  __typename?: 'Operator';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  enabledNotifications: Array<EnabledNotification>;
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isBlocked: Scalars['Boolean']['output'];
  lastActivity?: Maybe<Scalars['DateTime']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  media?: Maybe<Media>;
  mobileNumber?: Maybe<Scalars['String']['output']>;
  role?: Maybe<OperatorRole>;
  roleId?: Maybe<Scalars['ID']['output']>;
  sessions: Array<OperatorSession>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userName: Scalars['String']['output'];
};


export type OperatorSessionsArgs = {
  filter?: OperatorSessionFilter;
  sorting?: Array<OperatorSessionSort>;
};

export type OperatorAggregateFilter = {
  and?: InputMaybe<Array<OperatorAggregateFilter>>;
  email?: InputMaybe<StringFieldComparison>;
  firstName?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  isBlocked?: InputMaybe<BooleanFieldComparison>;
  lastName?: InputMaybe<StringFieldComparison>;
  mobileNumber?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<OperatorAggregateFilter>>;
  roleId?: InputMaybe<IdFilterComparison>;
  userName?: InputMaybe<StringFieldComparison>;
};

export type OperatorConnection = {
  __typename?: 'OperatorConnection';
  /** Array of nodes. */
  nodes: Array<Operator>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type OperatorDeleteResponse = {
  __typename?: 'OperatorDeleteResponse';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  enabledNotifications?: Maybe<Array<EnabledNotification>>;
  firstName?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  isBlocked?: Maybe<Scalars['Boolean']['output']>;
  lastActivity?: Maybe<Scalars['DateTime']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  mobileNumber?: Maybe<Scalars['String']['output']>;
  roleId?: Maybe<Scalars['ID']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userName?: Maybe<Scalars['String']['output']>;
};

export type OperatorFilter = {
  and?: InputMaybe<Array<OperatorFilter>>;
  email?: InputMaybe<StringFieldComparison>;
  firstName?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  isBlocked?: InputMaybe<BooleanFieldComparison>;
  lastName?: InputMaybe<StringFieldComparison>;
  mobileNumber?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<OperatorFilter>>;
  roleId?: InputMaybe<IdFilterComparison>;
  userName?: InputMaybe<StringFieldComparison>;
};

export enum OperatorPermission {
  AnnouncementsEdit = 'Announcements_Edit',
  AnnouncementsView = 'Announcements_View',
  CarsEdit = 'Cars_Edit',
  CarsView = 'Cars_View',
  ComplaintsEdit = 'Complaints_Edit',
  ComplaintsView = 'Complaints_View',
  CouponsEdit = 'Coupons_Edit',
  CouponsView = 'Coupons_View',
  DriverWalletEdit = 'DriverWallet_Edit',
  DriverWalletView = 'DriverWallet_View',
  DriversEdit = 'Drivers_Edit',
  DriversView = 'Drivers_View',
  FleetWalletEdit = 'FleetWallet_Edit',
  FleetWalletView = 'FleetWallet_View',
  FleetsEdit = 'Fleets_Edit',
  FleetsView = 'Fleets_View',
  GatewaysEdit = 'Gateways_Edit',
  GatewaysView = 'Gateways_View',
  GiftBatchCreate = 'GiftBatch_Create',
  GiftBatchView = 'GiftBatch_View',
  GiftBatchViewCodes = 'GiftBatch_ViewCodes',
  PayoutsEdit = 'Payouts_Edit',
  PayoutsView = 'Payouts_View',
  ProviderWalletEdit = 'ProviderWallet_Edit',
  ProviderWalletView = 'ProviderWallet_View',
  RegionsEdit = 'Regions_Edit',
  RegionsView = 'Regions_View',
  RequestsView = 'Requests_View',
  ReviewParameterEdit = 'ReviewParameter_Edit',
  RiderWalletEdit = 'RiderWallet_Edit',
  RiderWalletView = 'RiderWallet_View',
  RidersEdit = 'Riders_Edit',
  RidersView = 'Riders_View',
  SmsProvidersEdit = 'SMSProviders_Edit',
  SmsProvidersView = 'SMSProviders_View',
  ServicesEdit = 'Services_Edit',
  ServicesView = 'Services_View',
  UsersEdit = 'Users_Edit',
  UsersView = 'Users_View'
}

export type OperatorRole = {
  __typename?: 'OperatorRole';
  allowedApps: Array<AppType>;
  id: Scalars['ID']['output'];
  parkingPermissions: Array<ParkingPermission>;
  permissions: Array<OperatorPermission>;
  shopPermissions: Array<ShopPermission>;
  taxiPermissions: Array<TaxiPermission>;
  title: Scalars['String']['output'];
};

export type OperatorRoleDeleteResponse = {
  __typename?: 'OperatorRoleDeleteResponse';
  allowedApps?: Maybe<Array<AppType>>;
  id?: Maybe<Scalars['ID']['output']>;
  parkingPermissions?: Maybe<Array<ParkingPermission>>;
  permissions?: Maybe<Array<OperatorPermission>>;
  shopPermissions?: Maybe<Array<ShopPermission>>;
  taxiPermissions?: Maybe<Array<TaxiPermission>>;
  title?: Maybe<Scalars['String']['output']>;
};

export type OperatorRoleFilter = {
  and?: InputMaybe<Array<OperatorRoleFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<OperatorRoleFilter>>;
  title?: InputMaybe<StringFieldComparison>;
};

export type OperatorRoleInput = {
  allowedApps?: InputMaybe<Array<AppType>>;
  parkingPermissions?: InputMaybe<Array<ParkingPermission>>;
  permissions?: InputMaybe<Array<OperatorPermission>>;
  shopPermissions?: InputMaybe<Array<ShopPermission>>;
  taxiPermissions?: InputMaybe<Array<TaxiPermission>>;
  title: Scalars['String']['input'];
};

export type OperatorRoleSort = {
  direction: SortDirection;
  field: OperatorRoleSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum OperatorRoleSortFields {
  Id = 'id',
  Title = 'title'
}

export type OperatorSession = {
  __typename?: 'OperatorSession';
  id: Scalars['ID']['output'];
  operatorId: Scalars['ID']['output'];
  sessionInfo: SessionInfo;
};

export type OperatorSessionFilter = {
  and?: InputMaybe<Array<OperatorSessionFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  operatorId?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<OperatorSessionFilter>>;
};

export type OperatorSessionSort = {
  direction: SortDirection;
  field: OperatorSessionSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum OperatorSessionSortFields {
  Id = 'id',
  OperatorId = 'operatorId'
}

export type OperatorSort = {
  direction: SortDirection;
  field: OperatorSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum OperatorSortFields {
  Email = 'email',
  FirstName = 'firstName',
  Id = 'id',
  IsBlocked = 'isBlocked',
  LastName = 'lastName',
  MobileNumber = 'mobileNumber',
  RoleId = 'roleId',
  UserName = 'userName'
}

export type Order = {
  __typename?: 'Order';
  activities: Array<RequestActivity>;
  activitiesAggregate: Array<OrderActivitiesAggregateResponse>;
  addresses: Array<Scalars['String']['output']>;
  complaints: Array<TaxiSupportRequest>;
  complaintsAggregate: Array<OrderComplaintsAggregateResponse>;
  conversation: Array<OrderMessage>;
  conversationAggregate: Array<OrderConversationAggregateResponse>;
  costAfterCoupon: Scalars['Float']['output'];
  costBest: Scalars['Float']['output'];
  coupon?: Maybe<Coupon>;
  createdOn: Scalars['DateTime']['output'];
  currency: Scalars['String']['output'];
  destinationArrivedTo: Scalars['Int']['output'];
  directions?: Maybe<Array<Point>>;
  distanceBest: Scalars['Int']['output'];
  driver?: Maybe<Driver>;
  driverId?: Maybe<Scalars['ID']['output']>;
  driverTransactions: Array<DriverTransaction>;
  driverTransactionsAggregate: Array<OrderDriverTransactionsAggregateResponse>;
  durationBest: Scalars['Int']['output'];
  expectedTimestamp?: Maybe<Scalars['DateTime']['output']>;
  finishTimestamp?: Maybe<Scalars['DateTime']['output']>;
  fleet?: Maybe<Fleet>;
  fleetId?: Maybe<Scalars['ID']['output']>;
  fleetTransactions: Array<FleetTransaction>;
  fleetTransactionsAggregate: Array<OrderFleetTransactionsAggregateResponse>;
  id: Scalars['ID']['output'];
  options: Array<ServiceOption>;
  optionsAggregate: Array<OrderOptionsAggregateResponse>;
  paymentGateway?: Maybe<PaymentGateway>;
  paymentMode?: Maybe<PaymentMode>;
  points: Array<Point>;
  providerTransactions: Array<ProviderTransaction>;
  providerTransactionsAggregate: Array<OrderProviderTransactionsAggregateResponse>;
  regionId?: Maybe<Scalars['ID']['output']>;
  rideOptionsCost: Scalars['Float']['output'];
  rider?: Maybe<Rider>;
  riderId: Scalars['ID']['output'];
  riderTransactions: Array<RiderTransaction>;
  riderTransactionsAggregate: Array<OrderRiderTransactionsAggregateResponse>;
  savedPaymentMethod?: Maybe<SavedPaymentMethod>;
  service?: Maybe<Service>;
  serviceCost: Scalars['Float']['output'];
  serviceId?: Maybe<Scalars['ID']['output']>;
  startTimestamp?: Maybe<Scalars['DateTime']['output']>;
  status: OrderStatus;
  taxCost: Scalars['Float']['output'];
  waitCost: Scalars['Float']['output'];
  waitMinutes: Scalars['Float']['output'];
};


export type OrderActivitiesArgs = {
  filter?: RequestActivityFilter;
  sorting?: Array<RequestActivitySort>;
};


export type OrderActivitiesAggregateArgs = {
  filter?: InputMaybe<RequestActivityAggregateFilter>;
};


export type OrderComplaintsArgs = {
  filter?: TaxiSupportRequestFilter;
  sorting?: Array<TaxiSupportRequestSort>;
};


export type OrderComplaintsAggregateArgs = {
  filter?: InputMaybe<TaxiSupportRequestAggregateFilter>;
};


export type OrderConversationArgs = {
  filter?: OrderMessageFilter;
  sorting?: Array<OrderMessageSort>;
};


export type OrderConversationAggregateArgs = {
  filter?: InputMaybe<OrderMessageAggregateFilter>;
};


export type OrderDriverTransactionsArgs = {
  filter?: DriverTransactionFilter;
  sorting?: Array<DriverTransactionSort>;
};


export type OrderDriverTransactionsAggregateArgs = {
  filter?: InputMaybe<DriverTransactionAggregateFilter>;
};


export type OrderFleetTransactionsArgs = {
  filter?: FleetTransactionFilter;
  sorting?: Array<FleetTransactionSort>;
};


export type OrderFleetTransactionsAggregateArgs = {
  filter?: InputMaybe<FleetTransactionAggregateFilter>;
};


export type OrderOptionsArgs = {
  filter?: ServiceOptionFilter;
  sorting?: Array<ServiceOptionSort>;
};


export type OrderOptionsAggregateArgs = {
  filter?: InputMaybe<ServiceOptionAggregateFilter>;
};


export type OrderProviderTransactionsArgs = {
  filter?: ProviderTransactionFilter;
  sorting?: Array<ProviderTransactionSort>;
};


export type OrderProviderTransactionsAggregateArgs = {
  filter?: InputMaybe<ProviderTransactionAggregateFilter>;
};


export type OrderRiderTransactionsArgs = {
  filter?: RiderTransactionFilter;
  sorting?: Array<RiderTransactionSort>;
};


export type OrderRiderTransactionsAggregateArgs = {
  filter?: InputMaybe<RiderTransactionAggregateFilter>;
};

export type OrderActivitiesAggregateGroupBy = {
  __typename?: 'OrderActivitiesAggregateGroupBy';
  id?: Maybe<Scalars['ID']['output']>;
};

export type OrderActivitiesAggregateResponse = {
  __typename?: 'OrderActivitiesAggregateResponse';
  avg?: Maybe<OrderActivitiesAvgAggregate>;
  count?: Maybe<OrderActivitiesCountAggregate>;
  groupBy?: Maybe<OrderActivitiesAggregateGroupBy>;
  max?: Maybe<OrderActivitiesMaxAggregate>;
  min?: Maybe<OrderActivitiesMinAggregate>;
  sum?: Maybe<OrderActivitiesSumAggregate>;
};

export type OrderActivitiesAvgAggregate = {
  __typename?: 'OrderActivitiesAvgAggregate';
  id?: Maybe<Scalars['Float']['output']>;
};

export type OrderActivitiesCountAggregate = {
  __typename?: 'OrderActivitiesCountAggregate';
  id?: Maybe<Scalars['Int']['output']>;
};

export type OrderActivitiesMaxAggregate = {
  __typename?: 'OrderActivitiesMaxAggregate';
  id?: Maybe<Scalars['ID']['output']>;
};

export type OrderActivitiesMinAggregate = {
  __typename?: 'OrderActivitiesMinAggregate';
  id?: Maybe<Scalars['ID']['output']>;
};

export type OrderActivitiesSumAggregate = {
  __typename?: 'OrderActivitiesSumAggregate';
  id?: Maybe<Scalars['Float']['output']>;
};

export type OrderAggregateFilter = {
  and?: InputMaybe<Array<OrderAggregateFilter>>;
  costAfterCoupon?: InputMaybe<FloatFieldComparison>;
  costBest?: InputMaybe<FloatFieldComparison>;
  createdOn?: InputMaybe<DateFieldComparison>;
  currency?: InputMaybe<StringFieldComparison>;
  distanceBest?: InputMaybe<IntFieldComparison>;
  driverId?: InputMaybe<IdFilterComparison>;
  durationBest?: InputMaybe<IntFieldComparison>;
  fleetId?: InputMaybe<IdFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<OrderAggregateFilter>>;
  paymentMode?: InputMaybe<PaymentModeFilterComparison>;
  regionId?: InputMaybe<IdFilterComparison>;
  riderId?: InputMaybe<IdFilterComparison>;
  serviceId?: InputMaybe<IdFilterComparison>;
  status?: InputMaybe<OrderStatusFilterComparison>;
};

export type OrderAggregateGroupBy = {
  __typename?: 'OrderAggregateGroupBy';
  costAfterCoupon?: Maybe<Scalars['Float']['output']>;
  costBest?: Maybe<Scalars['Float']['output']>;
  createdOn?: Maybe<Scalars['DateTime']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  distanceBest?: Maybe<Scalars['Int']['output']>;
  driverId?: Maybe<Scalars['ID']['output']>;
  durationBest?: Maybe<Scalars['Int']['output']>;
  fleetId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  paymentMode?: Maybe<PaymentMode>;
  regionId?: Maybe<Scalars['ID']['output']>;
  riderId?: Maybe<Scalars['ID']['output']>;
  serviceId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<OrderStatus>;
};


export type OrderAggregateGroupByCreatedOnArgs = {
  by?: GroupBy;
};

export type OrderAggregateResponse = {
  __typename?: 'OrderAggregateResponse';
  avg?: Maybe<OrderAvgAggregate>;
  count?: Maybe<OrderCountAggregate>;
  groupBy?: Maybe<OrderAggregateGroupBy>;
  max?: Maybe<OrderMaxAggregate>;
  min?: Maybe<OrderMinAggregate>;
  sum?: Maybe<OrderSumAggregate>;
};

export type OrderAvgAggregate = {
  __typename?: 'OrderAvgAggregate';
  costAfterCoupon?: Maybe<Scalars['Float']['output']>;
  costBest?: Maybe<Scalars['Float']['output']>;
  distanceBest?: Maybe<Scalars['Float']['output']>;
  driverId?: Maybe<Scalars['Float']['output']>;
  durationBest?: Maybe<Scalars['Float']['output']>;
  fleetId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  regionId?: Maybe<Scalars['Float']['output']>;
  riderId?: Maybe<Scalars['Float']['output']>;
  serviceId?: Maybe<Scalars['Float']['output']>;
};

export type OrderCancelReason = {
  __typename?: 'OrderCancelReason';
  id: Scalars['ID']['output'];
  isEnabled: Scalars['Boolean']['output'];
  orders: OrderCancelReasonOrdersConnection;
  ordersAggregate: Array<OrderCancelReasonOrdersAggregateResponse>;
  title: Scalars['String']['output'];
  userType: AnnouncementUserType;
};


export type OrderCancelReasonOrdersArgs = {
  filter?: OrderFilter;
  paging?: OffsetPaging;
  sorting?: Array<OrderSort>;
};


export type OrderCancelReasonOrdersAggregateArgs = {
  filter?: InputMaybe<OrderAggregateFilter>;
};

export type OrderCancelReasonConnection = {
  __typename?: 'OrderCancelReasonConnection';
  /** Array of nodes. */
  nodes: Array<OrderCancelReason>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type OrderCancelReasonDeleteResponse = {
  __typename?: 'OrderCancelReasonDeleteResponse';
  id?: Maybe<Scalars['ID']['output']>;
  isEnabled?: Maybe<Scalars['Boolean']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  userType?: Maybe<AnnouncementUserType>;
};

export type OrderCancelReasonFilter = {
  and?: InputMaybe<Array<OrderCancelReasonFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<OrderCancelReasonFilter>>;
};

export type OrderCancelReasonInput = {
  isEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  userType?: InputMaybe<AnnouncementUserType>;
};

export type OrderCancelReasonOrdersAggregateGroupBy = {
  __typename?: 'OrderCancelReasonOrdersAggregateGroupBy';
  costAfterCoupon?: Maybe<Scalars['Float']['output']>;
  costBest?: Maybe<Scalars['Float']['output']>;
  createdOn?: Maybe<Scalars['DateTime']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  distanceBest?: Maybe<Scalars['Int']['output']>;
  driverId?: Maybe<Scalars['ID']['output']>;
  durationBest?: Maybe<Scalars['Int']['output']>;
  fleetId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  paymentMode?: Maybe<PaymentMode>;
  regionId?: Maybe<Scalars['ID']['output']>;
  riderId?: Maybe<Scalars['ID']['output']>;
  serviceId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<OrderStatus>;
};

export type OrderCancelReasonOrdersAggregateResponse = {
  __typename?: 'OrderCancelReasonOrdersAggregateResponse';
  avg?: Maybe<OrderCancelReasonOrdersAvgAggregate>;
  count?: Maybe<OrderCancelReasonOrdersCountAggregate>;
  groupBy?: Maybe<OrderCancelReasonOrdersAggregateGroupBy>;
  max?: Maybe<OrderCancelReasonOrdersMaxAggregate>;
  min?: Maybe<OrderCancelReasonOrdersMinAggregate>;
  sum?: Maybe<OrderCancelReasonOrdersSumAggregate>;
};

export type OrderCancelReasonOrdersAvgAggregate = {
  __typename?: 'OrderCancelReasonOrdersAvgAggregate';
  costAfterCoupon?: Maybe<Scalars['Float']['output']>;
  costBest?: Maybe<Scalars['Float']['output']>;
  distanceBest?: Maybe<Scalars['Float']['output']>;
  driverId?: Maybe<Scalars['Float']['output']>;
  durationBest?: Maybe<Scalars['Float']['output']>;
  fleetId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  regionId?: Maybe<Scalars['Float']['output']>;
  riderId?: Maybe<Scalars['Float']['output']>;
  serviceId?: Maybe<Scalars['Float']['output']>;
};

export type OrderCancelReasonOrdersConnection = {
  __typename?: 'OrderCancelReasonOrdersConnection';
  /** Array of nodes. */
  nodes: Array<Order>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type OrderCancelReasonOrdersCountAggregate = {
  __typename?: 'OrderCancelReasonOrdersCountAggregate';
  costAfterCoupon?: Maybe<Scalars['Int']['output']>;
  costBest?: Maybe<Scalars['Int']['output']>;
  createdOn?: Maybe<Scalars['Int']['output']>;
  currency?: Maybe<Scalars['Int']['output']>;
  distanceBest?: Maybe<Scalars['Int']['output']>;
  driverId?: Maybe<Scalars['Int']['output']>;
  durationBest?: Maybe<Scalars['Int']['output']>;
  fleetId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  paymentMode?: Maybe<Scalars['Int']['output']>;
  regionId?: Maybe<Scalars['Int']['output']>;
  riderId?: Maybe<Scalars['Int']['output']>;
  serviceId?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
};

export type OrderCancelReasonOrdersMaxAggregate = {
  __typename?: 'OrderCancelReasonOrdersMaxAggregate';
  costAfterCoupon?: Maybe<Scalars['Float']['output']>;
  costBest?: Maybe<Scalars['Float']['output']>;
  createdOn?: Maybe<Scalars['DateTime']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  distanceBest?: Maybe<Scalars['Int']['output']>;
  driverId?: Maybe<Scalars['ID']['output']>;
  durationBest?: Maybe<Scalars['Int']['output']>;
  fleetId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  paymentMode?: Maybe<PaymentMode>;
  regionId?: Maybe<Scalars['ID']['output']>;
  riderId?: Maybe<Scalars['ID']['output']>;
  serviceId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<OrderStatus>;
};

export type OrderCancelReasonOrdersMinAggregate = {
  __typename?: 'OrderCancelReasonOrdersMinAggregate';
  costAfterCoupon?: Maybe<Scalars['Float']['output']>;
  costBest?: Maybe<Scalars['Float']['output']>;
  createdOn?: Maybe<Scalars['DateTime']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  distanceBest?: Maybe<Scalars['Int']['output']>;
  driverId?: Maybe<Scalars['ID']['output']>;
  durationBest?: Maybe<Scalars['Int']['output']>;
  fleetId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  paymentMode?: Maybe<PaymentMode>;
  regionId?: Maybe<Scalars['ID']['output']>;
  riderId?: Maybe<Scalars['ID']['output']>;
  serviceId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<OrderStatus>;
};

export type OrderCancelReasonOrdersSumAggregate = {
  __typename?: 'OrderCancelReasonOrdersSumAggregate';
  costAfterCoupon?: Maybe<Scalars['Float']['output']>;
  costBest?: Maybe<Scalars['Float']['output']>;
  distanceBest?: Maybe<Scalars['Float']['output']>;
  driverId?: Maybe<Scalars['Float']['output']>;
  durationBest?: Maybe<Scalars['Float']['output']>;
  fleetId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  regionId?: Maybe<Scalars['Float']['output']>;
  riderId?: Maybe<Scalars['Float']['output']>;
  serviceId?: Maybe<Scalars['Float']['output']>;
};

export type OrderCancelReasonSort = {
  direction: SortDirection;
  field: OrderCancelReasonSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum OrderCancelReasonSortFields {
  Id = 'id'
}

export type OrderComplaintsAggregateGroupBy = {
  __typename?: 'OrderComplaintsAggregateGroupBy';
  id?: Maybe<Scalars['ID']['output']>;
  requestId?: Maybe<Scalars['ID']['output']>;
  requestedByDriver?: Maybe<Scalars['Boolean']['output']>;
  status?: Maybe<ComplaintStatus>;
};

export type OrderComplaintsAggregateResponse = {
  __typename?: 'OrderComplaintsAggregateResponse';
  avg?: Maybe<OrderComplaintsAvgAggregate>;
  count?: Maybe<OrderComplaintsCountAggregate>;
  groupBy?: Maybe<OrderComplaintsAggregateGroupBy>;
  max?: Maybe<OrderComplaintsMaxAggregate>;
  min?: Maybe<OrderComplaintsMinAggregate>;
  sum?: Maybe<OrderComplaintsSumAggregate>;
};

export type OrderComplaintsAvgAggregate = {
  __typename?: 'OrderComplaintsAvgAggregate';
  id?: Maybe<Scalars['Float']['output']>;
  requestId?: Maybe<Scalars['Float']['output']>;
};

export type OrderComplaintsCountAggregate = {
  __typename?: 'OrderComplaintsCountAggregate';
  id?: Maybe<Scalars['Int']['output']>;
  requestId?: Maybe<Scalars['Int']['output']>;
  requestedByDriver?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
};

export type OrderComplaintsMaxAggregate = {
  __typename?: 'OrderComplaintsMaxAggregate';
  id?: Maybe<Scalars['ID']['output']>;
  requestId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<ComplaintStatus>;
};

export type OrderComplaintsMinAggregate = {
  __typename?: 'OrderComplaintsMinAggregate';
  id?: Maybe<Scalars['ID']['output']>;
  requestId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<ComplaintStatus>;
};

export type OrderComplaintsSumAggregate = {
  __typename?: 'OrderComplaintsSumAggregate';
  id?: Maybe<Scalars['Float']['output']>;
  requestId?: Maybe<Scalars['Float']['output']>;
};

export type OrderConnection = {
  __typename?: 'OrderConnection';
  /** Array of nodes. */
  nodes: Array<Order>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type OrderConversationAggregateGroupBy = {
  __typename?: 'OrderConversationAggregateGroupBy';
  id?: Maybe<Scalars['ID']['output']>;
};

export type OrderConversationAggregateResponse = {
  __typename?: 'OrderConversationAggregateResponse';
  avg?: Maybe<OrderConversationAvgAggregate>;
  count?: Maybe<OrderConversationCountAggregate>;
  groupBy?: Maybe<OrderConversationAggregateGroupBy>;
  max?: Maybe<OrderConversationMaxAggregate>;
  min?: Maybe<OrderConversationMinAggregate>;
  sum?: Maybe<OrderConversationSumAggregate>;
};

export type OrderConversationAvgAggregate = {
  __typename?: 'OrderConversationAvgAggregate';
  id?: Maybe<Scalars['Float']['output']>;
};

export type OrderConversationCountAggregate = {
  __typename?: 'OrderConversationCountAggregate';
  id?: Maybe<Scalars['Int']['output']>;
};

export type OrderConversationMaxAggregate = {
  __typename?: 'OrderConversationMaxAggregate';
  id?: Maybe<Scalars['ID']['output']>;
};

export type OrderConversationMinAggregate = {
  __typename?: 'OrderConversationMinAggregate';
  id?: Maybe<Scalars['ID']['output']>;
};

export type OrderConversationSumAggregate = {
  __typename?: 'OrderConversationSumAggregate';
  id?: Maybe<Scalars['Float']['output']>;
};

export type OrderCountAggregate = {
  __typename?: 'OrderCountAggregate';
  costAfterCoupon?: Maybe<Scalars['Int']['output']>;
  costBest?: Maybe<Scalars['Int']['output']>;
  createdOn?: Maybe<Scalars['Int']['output']>;
  currency?: Maybe<Scalars['Int']['output']>;
  distanceBest?: Maybe<Scalars['Int']['output']>;
  driverId?: Maybe<Scalars['Int']['output']>;
  durationBest?: Maybe<Scalars['Int']['output']>;
  fleetId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  paymentMode?: Maybe<Scalars['Int']['output']>;
  regionId?: Maybe<Scalars['Int']['output']>;
  riderId?: Maybe<Scalars['Int']['output']>;
  serviceId?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
};

export type OrderDriverTransactionsAggregateGroupBy = {
  __typename?: 'OrderDriverTransactionsAggregateGroupBy';
  action?: Maybe<TransactionAction>;
  amount?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  driverId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  paymentGatewayId?: Maybe<Scalars['ID']['output']>;
  payoutAccountId?: Maybe<Scalars['ID']['output']>;
  payoutMethodId?: Maybe<Scalars['ID']['output']>;
  payoutSessionId?: Maybe<Scalars['ID']['output']>;
  payoutSessionMethodId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<TransactionStatus>;
};

export type OrderDriverTransactionsAggregateResponse = {
  __typename?: 'OrderDriverTransactionsAggregateResponse';
  avg?: Maybe<OrderDriverTransactionsAvgAggregate>;
  count?: Maybe<OrderDriverTransactionsCountAggregate>;
  groupBy?: Maybe<OrderDriverTransactionsAggregateGroupBy>;
  max?: Maybe<OrderDriverTransactionsMaxAggregate>;
  min?: Maybe<OrderDriverTransactionsMinAggregate>;
  sum?: Maybe<OrderDriverTransactionsSumAggregate>;
};

export type OrderDriverTransactionsAvgAggregate = {
  __typename?: 'OrderDriverTransactionsAvgAggregate';
  amount?: Maybe<Scalars['Float']['output']>;
  driverId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  paymentGatewayId?: Maybe<Scalars['Float']['output']>;
  payoutAccountId?: Maybe<Scalars['Float']['output']>;
  payoutMethodId?: Maybe<Scalars['Float']['output']>;
  payoutSessionId?: Maybe<Scalars['Float']['output']>;
  payoutSessionMethodId?: Maybe<Scalars['Float']['output']>;
};

export type OrderDriverTransactionsCountAggregate = {
  __typename?: 'OrderDriverTransactionsCountAggregate';
  action?: Maybe<Scalars['Int']['output']>;
  amount?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['Int']['output']>;
  currency?: Maybe<Scalars['Int']['output']>;
  driverId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  paymentGatewayId?: Maybe<Scalars['Int']['output']>;
  payoutAccountId?: Maybe<Scalars['Int']['output']>;
  payoutMethodId?: Maybe<Scalars['Int']['output']>;
  payoutSessionId?: Maybe<Scalars['Int']['output']>;
  payoutSessionMethodId?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
};

export type OrderDriverTransactionsMaxAggregate = {
  __typename?: 'OrderDriverTransactionsMaxAggregate';
  action?: Maybe<TransactionAction>;
  amount?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  driverId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  paymentGatewayId?: Maybe<Scalars['ID']['output']>;
  payoutAccountId?: Maybe<Scalars['ID']['output']>;
  payoutMethodId?: Maybe<Scalars['ID']['output']>;
  payoutSessionId?: Maybe<Scalars['ID']['output']>;
  payoutSessionMethodId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<TransactionStatus>;
};

export type OrderDriverTransactionsMinAggregate = {
  __typename?: 'OrderDriverTransactionsMinAggregate';
  action?: Maybe<TransactionAction>;
  amount?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  driverId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  paymentGatewayId?: Maybe<Scalars['ID']['output']>;
  payoutAccountId?: Maybe<Scalars['ID']['output']>;
  payoutMethodId?: Maybe<Scalars['ID']['output']>;
  payoutSessionId?: Maybe<Scalars['ID']['output']>;
  payoutSessionMethodId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<TransactionStatus>;
};

export type OrderDriverTransactionsSumAggregate = {
  __typename?: 'OrderDriverTransactionsSumAggregate';
  amount?: Maybe<Scalars['Float']['output']>;
  driverId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  paymentGatewayId?: Maybe<Scalars['Float']['output']>;
  payoutAccountId?: Maybe<Scalars['Float']['output']>;
  payoutMethodId?: Maybe<Scalars['Float']['output']>;
  payoutSessionId?: Maybe<Scalars['Float']['output']>;
  payoutSessionMethodId?: Maybe<Scalars['Float']['output']>;
};

export type OrderFilter = {
  and?: InputMaybe<Array<OrderFilter>>;
  costAfterCoupon?: InputMaybe<FloatFieldComparison>;
  costBest?: InputMaybe<FloatFieldComparison>;
  createdOn?: InputMaybe<DateFieldComparison>;
  currency?: InputMaybe<StringFieldComparison>;
  distanceBest?: InputMaybe<IntFieldComparison>;
  driverId?: InputMaybe<IdFilterComparison>;
  durationBest?: InputMaybe<IntFieldComparison>;
  fleetId?: InputMaybe<IdFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<OrderFilter>>;
  paymentMode?: InputMaybe<PaymentModeFilterComparison>;
  regionId?: InputMaybe<IdFilterComparison>;
  riderId?: InputMaybe<IdFilterComparison>;
  serviceId?: InputMaybe<IdFilterComparison>;
  status?: InputMaybe<OrderStatusFilterComparison>;
};

export type OrderFleetTransactionsAggregateGroupBy = {
  __typename?: 'OrderFleetTransactionsAggregateGroupBy';
  action?: Maybe<TransactionAction>;
  deductType?: Maybe<ProviderDeductTransactionType>;
  fleetId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  operatorId?: Maybe<Scalars['ID']['output']>;
  rechargeType?: Maybe<ProviderRechargeTransactionType>;
  requestId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<TransactionStatus>;
};

export type OrderFleetTransactionsAggregateResponse = {
  __typename?: 'OrderFleetTransactionsAggregateResponse';
  avg?: Maybe<OrderFleetTransactionsAvgAggregate>;
  count?: Maybe<OrderFleetTransactionsCountAggregate>;
  groupBy?: Maybe<OrderFleetTransactionsAggregateGroupBy>;
  max?: Maybe<OrderFleetTransactionsMaxAggregate>;
  min?: Maybe<OrderFleetTransactionsMinAggregate>;
  sum?: Maybe<OrderFleetTransactionsSumAggregate>;
};

export type OrderFleetTransactionsAvgAggregate = {
  __typename?: 'OrderFleetTransactionsAvgAggregate';
  fleetId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  operatorId?: Maybe<Scalars['Float']['output']>;
  requestId?: Maybe<Scalars['Float']['output']>;
};

export type OrderFleetTransactionsCountAggregate = {
  __typename?: 'OrderFleetTransactionsCountAggregate';
  action?: Maybe<Scalars['Int']['output']>;
  deductType?: Maybe<Scalars['Int']['output']>;
  fleetId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  operatorId?: Maybe<Scalars['Int']['output']>;
  rechargeType?: Maybe<Scalars['Int']['output']>;
  requestId?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
};

export type OrderFleetTransactionsMaxAggregate = {
  __typename?: 'OrderFleetTransactionsMaxAggregate';
  action?: Maybe<TransactionAction>;
  deductType?: Maybe<ProviderDeductTransactionType>;
  fleetId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  operatorId?: Maybe<Scalars['ID']['output']>;
  rechargeType?: Maybe<ProviderRechargeTransactionType>;
  requestId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<TransactionStatus>;
};

export type OrderFleetTransactionsMinAggregate = {
  __typename?: 'OrderFleetTransactionsMinAggregate';
  action?: Maybe<TransactionAction>;
  deductType?: Maybe<ProviderDeductTransactionType>;
  fleetId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  operatorId?: Maybe<Scalars['ID']['output']>;
  rechargeType?: Maybe<ProviderRechargeTransactionType>;
  requestId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<TransactionStatus>;
};

export type OrderFleetTransactionsSumAggregate = {
  __typename?: 'OrderFleetTransactionsSumAggregate';
  fleetId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  operatorId?: Maybe<Scalars['Float']['output']>;
  requestId?: Maybe<Scalars['Float']['output']>;
};

export type OrderMaxAggregate = {
  __typename?: 'OrderMaxAggregate';
  costAfterCoupon?: Maybe<Scalars['Float']['output']>;
  costBest?: Maybe<Scalars['Float']['output']>;
  createdOn?: Maybe<Scalars['DateTime']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  distanceBest?: Maybe<Scalars['Int']['output']>;
  driverId?: Maybe<Scalars['ID']['output']>;
  durationBest?: Maybe<Scalars['Int']['output']>;
  fleetId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  paymentMode?: Maybe<PaymentMode>;
  regionId?: Maybe<Scalars['ID']['output']>;
  riderId?: Maybe<Scalars['ID']['output']>;
  serviceId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<OrderStatus>;
};

export type OrderMessage = {
  __typename?: 'OrderMessage';
  content: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  sentAt: Scalars['DateTime']['output'];
  sentByDriver: Scalars['Boolean']['output'];
  status: MessageStatus;
};

export type OrderMessageAggregateFilter = {
  and?: InputMaybe<Array<OrderMessageAggregateFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<OrderMessageAggregateFilter>>;
};

export type OrderMessageFilter = {
  and?: InputMaybe<Array<OrderMessageFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<OrderMessageFilter>>;
};

export type OrderMessageSort = {
  direction: SortDirection;
  field: OrderMessageSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum OrderMessageSortFields {
  Id = 'id'
}

export type OrderMinAggregate = {
  __typename?: 'OrderMinAggregate';
  costAfterCoupon?: Maybe<Scalars['Float']['output']>;
  costBest?: Maybe<Scalars['Float']['output']>;
  createdOn?: Maybe<Scalars['DateTime']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  distanceBest?: Maybe<Scalars['Int']['output']>;
  driverId?: Maybe<Scalars['ID']['output']>;
  durationBest?: Maybe<Scalars['Int']['output']>;
  fleetId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  paymentMode?: Maybe<PaymentMode>;
  regionId?: Maybe<Scalars['ID']['output']>;
  riderId?: Maybe<Scalars['ID']['output']>;
  serviceId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<OrderStatus>;
};

export type OrderOptionsAggregateGroupBy = {
  __typename?: 'OrderOptionsAggregateGroupBy';
  id?: Maybe<Scalars['ID']['output']>;
};

export type OrderOptionsAggregateResponse = {
  __typename?: 'OrderOptionsAggregateResponse';
  avg?: Maybe<OrderOptionsAvgAggregate>;
  count?: Maybe<OrderOptionsCountAggregate>;
  groupBy?: Maybe<OrderOptionsAggregateGroupBy>;
  max?: Maybe<OrderOptionsMaxAggregate>;
  min?: Maybe<OrderOptionsMinAggregate>;
  sum?: Maybe<OrderOptionsSumAggregate>;
};

export type OrderOptionsAvgAggregate = {
  __typename?: 'OrderOptionsAvgAggregate';
  id?: Maybe<Scalars['Float']['output']>;
};

export type OrderOptionsCountAggregate = {
  __typename?: 'OrderOptionsCountAggregate';
  id?: Maybe<Scalars['Int']['output']>;
};

export type OrderOptionsMaxAggregate = {
  __typename?: 'OrderOptionsMaxAggregate';
  id?: Maybe<Scalars['ID']['output']>;
};

export type OrderOptionsMinAggregate = {
  __typename?: 'OrderOptionsMinAggregate';
  id?: Maybe<Scalars['ID']['output']>;
};

export type OrderOptionsSumAggregate = {
  __typename?: 'OrderOptionsSumAggregate';
  id?: Maybe<Scalars['Float']['output']>;
};

export type OrderProviderTransactionsAggregateGroupBy = {
  __typename?: 'OrderProviderTransactionsAggregateGroupBy';
  action?: Maybe<TransactionAction>;
  amount?: Maybe<Scalars['Float']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  deductType?: Maybe<ProviderDeductTransactionType>;
  expenseType?: Maybe<ProviderExpenseType>;
  id?: Maybe<Scalars['ID']['output']>;
  operatorId?: Maybe<Scalars['ID']['output']>;
  parkOrderId?: Maybe<Scalars['ID']['output']>;
  rechargeType?: Maybe<ProviderRechargeTransactionType>;
  requestId?: Maybe<Scalars['ID']['output']>;
  shopOrderCartId?: Maybe<Scalars['ID']['output']>;
};

export type OrderProviderTransactionsAggregateResponse = {
  __typename?: 'OrderProviderTransactionsAggregateResponse';
  avg?: Maybe<OrderProviderTransactionsAvgAggregate>;
  count?: Maybe<OrderProviderTransactionsCountAggregate>;
  groupBy?: Maybe<OrderProviderTransactionsAggregateGroupBy>;
  max?: Maybe<OrderProviderTransactionsMaxAggregate>;
  min?: Maybe<OrderProviderTransactionsMinAggregate>;
  sum?: Maybe<OrderProviderTransactionsSumAggregate>;
};

export type OrderProviderTransactionsAvgAggregate = {
  __typename?: 'OrderProviderTransactionsAvgAggregate';
  amount?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  operatorId?: Maybe<Scalars['Float']['output']>;
  parkOrderId?: Maybe<Scalars['Float']['output']>;
  requestId?: Maybe<Scalars['Float']['output']>;
  shopOrderCartId?: Maybe<Scalars['Float']['output']>;
};

export type OrderProviderTransactionsCountAggregate = {
  __typename?: 'OrderProviderTransactionsCountAggregate';
  action?: Maybe<Scalars['Int']['output']>;
  amount?: Maybe<Scalars['Int']['output']>;
  currency?: Maybe<Scalars['Int']['output']>;
  deductType?: Maybe<Scalars['Int']['output']>;
  expenseType?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  operatorId?: Maybe<Scalars['Int']['output']>;
  parkOrderId?: Maybe<Scalars['Int']['output']>;
  rechargeType?: Maybe<Scalars['Int']['output']>;
  requestId?: Maybe<Scalars['Int']['output']>;
  shopOrderCartId?: Maybe<Scalars['Int']['output']>;
};

export type OrderProviderTransactionsMaxAggregate = {
  __typename?: 'OrderProviderTransactionsMaxAggregate';
  action?: Maybe<TransactionAction>;
  amount?: Maybe<Scalars['Float']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  deductType?: Maybe<ProviderDeductTransactionType>;
  expenseType?: Maybe<ProviderExpenseType>;
  id?: Maybe<Scalars['ID']['output']>;
  operatorId?: Maybe<Scalars['ID']['output']>;
  parkOrderId?: Maybe<Scalars['ID']['output']>;
  rechargeType?: Maybe<ProviderRechargeTransactionType>;
  requestId?: Maybe<Scalars['ID']['output']>;
  shopOrderCartId?: Maybe<Scalars['ID']['output']>;
};

export type OrderProviderTransactionsMinAggregate = {
  __typename?: 'OrderProviderTransactionsMinAggregate';
  action?: Maybe<TransactionAction>;
  amount?: Maybe<Scalars['Float']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  deductType?: Maybe<ProviderDeductTransactionType>;
  expenseType?: Maybe<ProviderExpenseType>;
  id?: Maybe<Scalars['ID']['output']>;
  operatorId?: Maybe<Scalars['ID']['output']>;
  parkOrderId?: Maybe<Scalars['ID']['output']>;
  rechargeType?: Maybe<ProviderRechargeTransactionType>;
  requestId?: Maybe<Scalars['ID']['output']>;
  shopOrderCartId?: Maybe<Scalars['ID']['output']>;
};

export type OrderProviderTransactionsSumAggregate = {
  __typename?: 'OrderProviderTransactionsSumAggregate';
  amount?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  operatorId?: Maybe<Scalars['Float']['output']>;
  parkOrderId?: Maybe<Scalars['Float']['output']>;
  requestId?: Maybe<Scalars['Float']['output']>;
  shopOrderCartId?: Maybe<Scalars['Float']['output']>;
};

export enum OrderQueueLevel {
  High = 'HIGH',
  Low = 'LOW',
  Medium = 'MEDIUM'
}

export type OrderRiderTransactionsAggregateGroupBy = {
  __typename?: 'OrderRiderTransactionsAggregateGroupBy';
  action?: Maybe<TransactionAction>;
  amount?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  deductType?: Maybe<RiderDeductTransactionType>;
  id?: Maybe<Scalars['ID']['output']>;
  operatorId?: Maybe<Scalars['ID']['output']>;
  parkOrderCustomerId?: Maybe<Scalars['ID']['output']>;
  parkOrderParkOwnerId?: Maybe<Scalars['ID']['output']>;
  paymentGatewayId?: Maybe<Scalars['ID']['output']>;
  rechargeType?: Maybe<RiderRechargeTransactionType>;
  requestId?: Maybe<Scalars['ID']['output']>;
  riderId?: Maybe<Scalars['ID']['output']>;
  savedPaymentMethodId?: Maybe<Scalars['ID']['output']>;
  shopOrderId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<TransactionStatus>;
};

export type OrderRiderTransactionsAggregateResponse = {
  __typename?: 'OrderRiderTransactionsAggregateResponse';
  avg?: Maybe<OrderRiderTransactionsAvgAggregate>;
  count?: Maybe<OrderRiderTransactionsCountAggregate>;
  groupBy?: Maybe<OrderRiderTransactionsAggregateGroupBy>;
  max?: Maybe<OrderRiderTransactionsMaxAggregate>;
  min?: Maybe<OrderRiderTransactionsMinAggregate>;
  sum?: Maybe<OrderRiderTransactionsSumAggregate>;
};

export type OrderRiderTransactionsAvgAggregate = {
  __typename?: 'OrderRiderTransactionsAvgAggregate';
  amount?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  operatorId?: Maybe<Scalars['Float']['output']>;
  parkOrderCustomerId?: Maybe<Scalars['Float']['output']>;
  parkOrderParkOwnerId?: Maybe<Scalars['Float']['output']>;
  paymentGatewayId?: Maybe<Scalars['Float']['output']>;
  requestId?: Maybe<Scalars['Float']['output']>;
  riderId?: Maybe<Scalars['Float']['output']>;
  savedPaymentMethodId?: Maybe<Scalars['Float']['output']>;
  shopOrderId?: Maybe<Scalars['Float']['output']>;
};

export type OrderRiderTransactionsCountAggregate = {
  __typename?: 'OrderRiderTransactionsCountAggregate';
  action?: Maybe<Scalars['Int']['output']>;
  amount?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['Int']['output']>;
  currency?: Maybe<Scalars['Int']['output']>;
  deductType?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  operatorId?: Maybe<Scalars['Int']['output']>;
  parkOrderCustomerId?: Maybe<Scalars['Int']['output']>;
  parkOrderParkOwnerId?: Maybe<Scalars['Int']['output']>;
  paymentGatewayId?: Maybe<Scalars['Int']['output']>;
  rechargeType?: Maybe<Scalars['Int']['output']>;
  requestId?: Maybe<Scalars['Int']['output']>;
  riderId?: Maybe<Scalars['Int']['output']>;
  savedPaymentMethodId?: Maybe<Scalars['Int']['output']>;
  shopOrderId?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
};

export type OrderRiderTransactionsMaxAggregate = {
  __typename?: 'OrderRiderTransactionsMaxAggregate';
  action?: Maybe<TransactionAction>;
  amount?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  deductType?: Maybe<RiderDeductTransactionType>;
  id?: Maybe<Scalars['ID']['output']>;
  operatorId?: Maybe<Scalars['ID']['output']>;
  parkOrderCustomerId?: Maybe<Scalars['ID']['output']>;
  parkOrderParkOwnerId?: Maybe<Scalars['ID']['output']>;
  paymentGatewayId?: Maybe<Scalars['ID']['output']>;
  rechargeType?: Maybe<RiderRechargeTransactionType>;
  requestId?: Maybe<Scalars['ID']['output']>;
  riderId?: Maybe<Scalars['ID']['output']>;
  savedPaymentMethodId?: Maybe<Scalars['ID']['output']>;
  shopOrderId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<TransactionStatus>;
};

export type OrderRiderTransactionsMinAggregate = {
  __typename?: 'OrderRiderTransactionsMinAggregate';
  action?: Maybe<TransactionAction>;
  amount?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  deductType?: Maybe<RiderDeductTransactionType>;
  id?: Maybe<Scalars['ID']['output']>;
  operatorId?: Maybe<Scalars['ID']['output']>;
  parkOrderCustomerId?: Maybe<Scalars['ID']['output']>;
  parkOrderParkOwnerId?: Maybe<Scalars['ID']['output']>;
  paymentGatewayId?: Maybe<Scalars['ID']['output']>;
  rechargeType?: Maybe<RiderRechargeTransactionType>;
  requestId?: Maybe<Scalars['ID']['output']>;
  riderId?: Maybe<Scalars['ID']['output']>;
  savedPaymentMethodId?: Maybe<Scalars['ID']['output']>;
  shopOrderId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<TransactionStatus>;
};

export type OrderRiderTransactionsSumAggregate = {
  __typename?: 'OrderRiderTransactionsSumAggregate';
  amount?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  operatorId?: Maybe<Scalars['Float']['output']>;
  parkOrderCustomerId?: Maybe<Scalars['Float']['output']>;
  parkOrderParkOwnerId?: Maybe<Scalars['Float']['output']>;
  paymentGatewayId?: Maybe<Scalars['Float']['output']>;
  requestId?: Maybe<Scalars['Float']['output']>;
  riderId?: Maybe<Scalars['Float']['output']>;
  savedPaymentMethodId?: Maybe<Scalars['Float']['output']>;
  shopOrderId?: Maybe<Scalars['Float']['output']>;
};

export type OrderSort = {
  direction: SortDirection;
  field: OrderSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum OrderSortFields {
  CostAfterCoupon = 'costAfterCoupon',
  CostBest = 'costBest',
  CreatedOn = 'createdOn',
  Currency = 'currency',
  DistanceBest = 'distanceBest',
  DriverId = 'driverId',
  DurationBest = 'durationBest',
  FleetId = 'fleetId',
  Id = 'id',
  PaymentMode = 'paymentMode',
  RegionId = 'regionId',
  RiderId = 'riderId',
  ServiceId = 'serviceId',
  Status = 'status'
}

export enum OrderStatus {
  Arrived = 'Arrived',
  Booked = 'Booked',
  DriverAccepted = 'DriverAccepted',
  DriverCanceled = 'DriverCanceled',
  Expired = 'Expired',
  Finished = 'Finished',
  Found = 'Found',
  NoCloseFound = 'NoCloseFound',
  NotFound = 'NotFound',
  Requested = 'Requested',
  RiderCanceled = 'RiderCanceled',
  Started = 'Started',
  WaitingForPostPay = 'WaitingForPostPay',
  WaitingForPrePay = 'WaitingForPrePay',
  WaitingForReview = 'WaitingForReview'
}

export type OrderStatusFilterComparison = {
  eq?: InputMaybe<OrderStatus>;
  gt?: InputMaybe<OrderStatus>;
  gte?: InputMaybe<OrderStatus>;
  iLike?: InputMaybe<OrderStatus>;
  in?: InputMaybe<Array<OrderStatus>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<OrderStatus>;
  lt?: InputMaybe<OrderStatus>;
  lte?: InputMaybe<OrderStatus>;
  neq?: InputMaybe<OrderStatus>;
  notILike?: InputMaybe<OrderStatus>;
  notIn?: InputMaybe<Array<OrderStatus>>;
  notLike?: InputMaybe<OrderStatus>;
};

export type OrderSumAggregate = {
  __typename?: 'OrderSumAggregate';
  costAfterCoupon?: Maybe<Scalars['Float']['output']>;
  costBest?: Maybe<Scalars['Float']['output']>;
  distanceBest?: Maybe<Scalars['Float']['output']>;
  driverId?: Maybe<Scalars['Float']['output']>;
  durationBest?: Maybe<Scalars['Float']['output']>;
  fleetId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  regionId?: Maybe<Scalars['Float']['output']>;
  riderId?: Maybe<Scalars['Float']['output']>;
  serviceId?: Maybe<Scalars['Float']['output']>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  /** The cursor of the last returned record. */
  endCursor?: Maybe<Scalars['ConnectionCursor']['output']>;
  /** true if paging forward and there are more records. */
  hasNextPage?: Maybe<Scalars['Boolean']['output']>;
  /** true if paging backwards and there are more records. */
  hasPreviousPage?: Maybe<Scalars['Boolean']['output']>;
  /** The cursor of the first returned record. */
  startCursor?: Maybe<Scalars['ConnectionCursor']['output']>;
};

export type ParkOrder = {
  __typename?: 'ParkOrder';
  activities: Array<ParkOrderActivity>;
  activitiesAggregate: Array<ParkOrderActivitiesAggregateResponse>;
  carOwner?: Maybe<Rider>;
  carOwnerId: Scalars['ID']['output'];
  carSize?: Maybe<ParkSpotCarSize>;
  createdAt: Scalars['DateTime']['output'];
  currency: Scalars['String']['output'];
  customerTransactions: Array<RiderTransaction>;
  customerTransactionsAggregate: Array<ParkOrderCustomerTransactionsAggregateResponse>;
  enterTime: Scalars['DateTime']['output'];
  exitTime: Scalars['DateTime']['output'];
  extendedExitTime?: Maybe<Scalars['DateTime']['output']>;
  feedbacks: Array<ParkingFeedback>;
  feedbacksAggregate: Array<ParkOrderFeedbacksAggregateResponse>;
  id: Scalars['ID']['output'];
  notes: Array<ParkOrderNote>;
  notesAggregate: Array<ParkOrderNotesAggregateResponse>;
  parkOwnerTransactions: Array<RiderTransaction>;
  parkOwnerTransactionsAggregate: Array<ParkOrderParkOwnerTransactionsAggregateResponse>;
  parkSpot: ParkSpot;
  parkSpotId: Scalars['ID']['output'];
  paymentGateway?: Maybe<PaymentGateway>;
  paymentMethod: PaymentMode;
  price: Scalars['Float']['output'];
  providerTransactions: Array<ProviderTransaction>;
  providerTransactionsAggregate: Array<ParkOrderProviderTransactionsAggregateResponse>;
  savedPaymentMethod?: Maybe<SavedPaymentMethod>;
  spotOwner?: Maybe<Rider>;
  status: ParkOrderStatus;
  vehicleType: ParkSpotVehicleType;
};


export type ParkOrderActivitiesArgs = {
  filter?: ParkOrderActivityFilter;
  sorting?: Array<ParkOrderActivitySort>;
};


export type ParkOrderActivitiesAggregateArgs = {
  filter?: InputMaybe<ParkOrderActivityAggregateFilter>;
};


export type ParkOrderCustomerTransactionsArgs = {
  filter?: RiderTransactionFilter;
  sorting?: Array<RiderTransactionSort>;
};


export type ParkOrderCustomerTransactionsAggregateArgs = {
  filter?: InputMaybe<RiderTransactionAggregateFilter>;
};


export type ParkOrderFeedbacksArgs = {
  filter?: ParkingFeedbackFilter;
  sorting?: Array<ParkingFeedbackSort>;
};


export type ParkOrderFeedbacksAggregateArgs = {
  filter?: InputMaybe<ParkingFeedbackAggregateFilter>;
};


export type ParkOrderNotesArgs = {
  filter?: ParkOrderNoteFilter;
  sorting?: Array<ParkOrderNoteSort>;
};


export type ParkOrderNotesAggregateArgs = {
  filter?: InputMaybe<ParkOrderNoteAggregateFilter>;
};


export type ParkOrderParkOwnerTransactionsArgs = {
  filter?: RiderTransactionFilter;
  sorting?: Array<RiderTransactionSort>;
};


export type ParkOrderParkOwnerTransactionsAggregateArgs = {
  filter?: InputMaybe<RiderTransactionAggregateFilter>;
};


export type ParkOrderProviderTransactionsArgs = {
  filter?: ProviderTransactionFilter;
  sorting?: Array<ProviderTransactionSort>;
};


export type ParkOrderProviderTransactionsAggregateArgs = {
  filter?: InputMaybe<ProviderTransactionAggregateFilter>;
};

export type ParkOrderActivitiesAggregateGroupBy = {
  __typename?: 'ParkOrderActivitiesAggregateGroupBy';
  id?: Maybe<Scalars['ID']['output']>;
};

export type ParkOrderActivitiesAggregateResponse = {
  __typename?: 'ParkOrderActivitiesAggregateResponse';
  avg?: Maybe<ParkOrderActivitiesAvgAggregate>;
  count?: Maybe<ParkOrderActivitiesCountAggregate>;
  groupBy?: Maybe<ParkOrderActivitiesAggregateGroupBy>;
  max?: Maybe<ParkOrderActivitiesMaxAggregate>;
  min?: Maybe<ParkOrderActivitiesMinAggregate>;
  sum?: Maybe<ParkOrderActivitiesSumAggregate>;
};

export type ParkOrderActivitiesAvgAggregate = {
  __typename?: 'ParkOrderActivitiesAvgAggregate';
  id?: Maybe<Scalars['Float']['output']>;
};

export type ParkOrderActivitiesCountAggregate = {
  __typename?: 'ParkOrderActivitiesCountAggregate';
  id?: Maybe<Scalars['Int']['output']>;
};

export type ParkOrderActivitiesMaxAggregate = {
  __typename?: 'ParkOrderActivitiesMaxAggregate';
  id?: Maybe<Scalars['ID']['output']>;
};

export type ParkOrderActivitiesMinAggregate = {
  __typename?: 'ParkOrderActivitiesMinAggregate';
  id?: Maybe<Scalars['ID']['output']>;
};

export type ParkOrderActivitiesSumAggregate = {
  __typename?: 'ParkOrderActivitiesSumAggregate';
  id?: Maybe<Scalars['Float']['output']>;
};

export type ParkOrderActivity = {
  __typename?: 'ParkOrderActivity';
  expectedBy?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  status: ParkOrderStatus;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ParkOrderActivityAggregateFilter = {
  and?: InputMaybe<Array<ParkOrderActivityAggregateFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ParkOrderActivityAggregateFilter>>;
};

export type ParkOrderActivityEdge = {
  __typename?: 'ParkOrderActivityEdge';
  /** Cursor for this node. */
  cursor: Scalars['ConnectionCursor']['output'];
  /** The node containing the ParkOrderActivity */
  node: ParkOrderActivity;
};

export type ParkOrderActivityFilter = {
  and?: InputMaybe<Array<ParkOrderActivityFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ParkOrderActivityFilter>>;
};

export type ParkOrderActivitySort = {
  direction: SortDirection;
  field: ParkOrderActivitySortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum ParkOrderActivitySortFields {
  Id = 'id'
}

export type ParkOrderAggregateFilter = {
  and?: InputMaybe<Array<ParkOrderAggregateFilter>>;
  carOwnerId?: InputMaybe<IdFilterComparison>;
  carSize?: InputMaybe<ParkSpotCarSizeFilterComparison>;
  currency?: InputMaybe<StringFieldComparison>;
  enterTime?: InputMaybe<DateFieldComparison>;
  exitTime?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ParkOrderAggregateFilter>>;
  parkSpotId?: InputMaybe<IdFilterComparison>;
  paymentMethod?: InputMaybe<PaymentModeFilterComparison>;
  price?: InputMaybe<FloatFieldComparison>;
  status?: InputMaybe<ParkOrderStatusFilterComparison>;
  vehicleType?: InputMaybe<ParkSpotVehicleTypeFilterComparison>;
};

export type ParkOrderAggregateGroupBy = {
  __typename?: 'ParkOrderAggregateGroupBy';
  carOwnerId?: Maybe<Scalars['ID']['output']>;
  carSize?: Maybe<ParkSpotCarSize>;
  currency?: Maybe<Scalars['String']['output']>;
  enterTime?: Maybe<Scalars['DateTime']['output']>;
  exitTime?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  parkSpotId?: Maybe<Scalars['ID']['output']>;
  paymentMethod?: Maybe<PaymentMode>;
  price?: Maybe<Scalars['Float']['output']>;
  status?: Maybe<ParkOrderStatus>;
  vehicleType?: Maybe<ParkSpotVehicleType>;
};


export type ParkOrderAggregateGroupByEnterTimeArgs = {
  by?: GroupBy;
};


export type ParkOrderAggregateGroupByExitTimeArgs = {
  by?: GroupBy;
};

export type ParkOrderAggregateResponse = {
  __typename?: 'ParkOrderAggregateResponse';
  avg?: Maybe<ParkOrderAvgAggregate>;
  count?: Maybe<ParkOrderCountAggregate>;
  groupBy?: Maybe<ParkOrderAggregateGroupBy>;
  max?: Maybe<ParkOrderMaxAggregate>;
  min?: Maybe<ParkOrderMinAggregate>;
  sum?: Maybe<ParkOrderSumAggregate>;
};

export type ParkOrderAvgAggregate = {
  __typename?: 'ParkOrderAvgAggregate';
  carOwnerId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  parkSpotId?: Maybe<Scalars['Float']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
};

export type ParkOrderConnection = {
  __typename?: 'ParkOrderConnection';
  /** Array of nodes. */
  nodes: Array<ParkOrder>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type ParkOrderCountAggregate = {
  __typename?: 'ParkOrderCountAggregate';
  carOwnerId?: Maybe<Scalars['Int']['output']>;
  carSize?: Maybe<Scalars['Int']['output']>;
  currency?: Maybe<Scalars['Int']['output']>;
  enterTime?: Maybe<Scalars['Int']['output']>;
  exitTime?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  parkSpotId?: Maybe<Scalars['Int']['output']>;
  paymentMethod?: Maybe<Scalars['Int']['output']>;
  price?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  vehicleType?: Maybe<Scalars['Int']['output']>;
};

export type ParkOrderCustomerTransactionsAggregateGroupBy = {
  __typename?: 'ParkOrderCustomerTransactionsAggregateGroupBy';
  action?: Maybe<TransactionAction>;
  amount?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  deductType?: Maybe<RiderDeductTransactionType>;
  id?: Maybe<Scalars['ID']['output']>;
  operatorId?: Maybe<Scalars['ID']['output']>;
  parkOrderCustomerId?: Maybe<Scalars['ID']['output']>;
  parkOrderParkOwnerId?: Maybe<Scalars['ID']['output']>;
  paymentGatewayId?: Maybe<Scalars['ID']['output']>;
  rechargeType?: Maybe<RiderRechargeTransactionType>;
  requestId?: Maybe<Scalars['ID']['output']>;
  riderId?: Maybe<Scalars['ID']['output']>;
  savedPaymentMethodId?: Maybe<Scalars['ID']['output']>;
  shopOrderId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<TransactionStatus>;
};

export type ParkOrderCustomerTransactionsAggregateResponse = {
  __typename?: 'ParkOrderCustomerTransactionsAggregateResponse';
  avg?: Maybe<ParkOrderCustomerTransactionsAvgAggregate>;
  count?: Maybe<ParkOrderCustomerTransactionsCountAggregate>;
  groupBy?: Maybe<ParkOrderCustomerTransactionsAggregateGroupBy>;
  max?: Maybe<ParkOrderCustomerTransactionsMaxAggregate>;
  min?: Maybe<ParkOrderCustomerTransactionsMinAggregate>;
  sum?: Maybe<ParkOrderCustomerTransactionsSumAggregate>;
};

export type ParkOrderCustomerTransactionsAvgAggregate = {
  __typename?: 'ParkOrderCustomerTransactionsAvgAggregate';
  amount?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  operatorId?: Maybe<Scalars['Float']['output']>;
  parkOrderCustomerId?: Maybe<Scalars['Float']['output']>;
  parkOrderParkOwnerId?: Maybe<Scalars['Float']['output']>;
  paymentGatewayId?: Maybe<Scalars['Float']['output']>;
  requestId?: Maybe<Scalars['Float']['output']>;
  riderId?: Maybe<Scalars['Float']['output']>;
  savedPaymentMethodId?: Maybe<Scalars['Float']['output']>;
  shopOrderId?: Maybe<Scalars['Float']['output']>;
};

export type ParkOrderCustomerTransactionsCountAggregate = {
  __typename?: 'ParkOrderCustomerTransactionsCountAggregate';
  action?: Maybe<Scalars['Int']['output']>;
  amount?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['Int']['output']>;
  currency?: Maybe<Scalars['Int']['output']>;
  deductType?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  operatorId?: Maybe<Scalars['Int']['output']>;
  parkOrderCustomerId?: Maybe<Scalars['Int']['output']>;
  parkOrderParkOwnerId?: Maybe<Scalars['Int']['output']>;
  paymentGatewayId?: Maybe<Scalars['Int']['output']>;
  rechargeType?: Maybe<Scalars['Int']['output']>;
  requestId?: Maybe<Scalars['Int']['output']>;
  riderId?: Maybe<Scalars['Int']['output']>;
  savedPaymentMethodId?: Maybe<Scalars['Int']['output']>;
  shopOrderId?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
};

export type ParkOrderCustomerTransactionsMaxAggregate = {
  __typename?: 'ParkOrderCustomerTransactionsMaxAggregate';
  action?: Maybe<TransactionAction>;
  amount?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  deductType?: Maybe<RiderDeductTransactionType>;
  id?: Maybe<Scalars['ID']['output']>;
  operatorId?: Maybe<Scalars['ID']['output']>;
  parkOrderCustomerId?: Maybe<Scalars['ID']['output']>;
  parkOrderParkOwnerId?: Maybe<Scalars['ID']['output']>;
  paymentGatewayId?: Maybe<Scalars['ID']['output']>;
  rechargeType?: Maybe<RiderRechargeTransactionType>;
  requestId?: Maybe<Scalars['ID']['output']>;
  riderId?: Maybe<Scalars['ID']['output']>;
  savedPaymentMethodId?: Maybe<Scalars['ID']['output']>;
  shopOrderId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<TransactionStatus>;
};

export type ParkOrderCustomerTransactionsMinAggregate = {
  __typename?: 'ParkOrderCustomerTransactionsMinAggregate';
  action?: Maybe<TransactionAction>;
  amount?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  deductType?: Maybe<RiderDeductTransactionType>;
  id?: Maybe<Scalars['ID']['output']>;
  operatorId?: Maybe<Scalars['ID']['output']>;
  parkOrderCustomerId?: Maybe<Scalars['ID']['output']>;
  parkOrderParkOwnerId?: Maybe<Scalars['ID']['output']>;
  paymentGatewayId?: Maybe<Scalars['ID']['output']>;
  rechargeType?: Maybe<RiderRechargeTransactionType>;
  requestId?: Maybe<Scalars['ID']['output']>;
  riderId?: Maybe<Scalars['ID']['output']>;
  savedPaymentMethodId?: Maybe<Scalars['ID']['output']>;
  shopOrderId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<TransactionStatus>;
};

export type ParkOrderCustomerTransactionsSumAggregate = {
  __typename?: 'ParkOrderCustomerTransactionsSumAggregate';
  amount?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  operatorId?: Maybe<Scalars['Float']['output']>;
  parkOrderCustomerId?: Maybe<Scalars['Float']['output']>;
  parkOrderParkOwnerId?: Maybe<Scalars['Float']['output']>;
  paymentGatewayId?: Maybe<Scalars['Float']['output']>;
  requestId?: Maybe<Scalars['Float']['output']>;
  riderId?: Maybe<Scalars['Float']['output']>;
  savedPaymentMethodId?: Maybe<Scalars['Float']['output']>;
  shopOrderId?: Maybe<Scalars['Float']['output']>;
};

export type ParkOrderFeedbacksAggregateGroupBy = {
  __typename?: 'ParkOrderFeedbacksAggregateGroupBy';
  customerId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  parkSpotId?: Maybe<Scalars['ID']['output']>;
  score?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<ReviewStatus>;
};

export type ParkOrderFeedbacksAggregateResponse = {
  __typename?: 'ParkOrderFeedbacksAggregateResponse';
  avg?: Maybe<ParkOrderFeedbacksAvgAggregate>;
  count?: Maybe<ParkOrderFeedbacksCountAggregate>;
  groupBy?: Maybe<ParkOrderFeedbacksAggregateGroupBy>;
  max?: Maybe<ParkOrderFeedbacksMaxAggregate>;
  min?: Maybe<ParkOrderFeedbacksMinAggregate>;
  sum?: Maybe<ParkOrderFeedbacksSumAggregate>;
};

export type ParkOrderFeedbacksAvgAggregate = {
  __typename?: 'ParkOrderFeedbacksAvgAggregate';
  customerId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  parkSpotId?: Maybe<Scalars['Float']['output']>;
  score?: Maybe<Scalars['Float']['output']>;
};

export type ParkOrderFeedbacksCountAggregate = {
  __typename?: 'ParkOrderFeedbacksCountAggregate';
  customerId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  parkSpotId?: Maybe<Scalars['Int']['output']>;
  score?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
};

export type ParkOrderFeedbacksMaxAggregate = {
  __typename?: 'ParkOrderFeedbacksMaxAggregate';
  customerId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  parkSpotId?: Maybe<Scalars['ID']['output']>;
  score?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<ReviewStatus>;
};

export type ParkOrderFeedbacksMinAggregate = {
  __typename?: 'ParkOrderFeedbacksMinAggregate';
  customerId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  parkSpotId?: Maybe<Scalars['ID']['output']>;
  score?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<ReviewStatus>;
};

export type ParkOrderFeedbacksSumAggregate = {
  __typename?: 'ParkOrderFeedbacksSumAggregate';
  customerId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  parkSpotId?: Maybe<Scalars['Float']['output']>;
  score?: Maybe<Scalars['Float']['output']>;
};

export type ParkOrderFilter = {
  and?: InputMaybe<Array<ParkOrderFilter>>;
  carOwnerId?: InputMaybe<IdFilterComparison>;
  carSize?: InputMaybe<ParkSpotCarSizeFilterComparison>;
  currency?: InputMaybe<StringFieldComparison>;
  enterTime?: InputMaybe<DateFieldComparison>;
  exitTime?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ParkOrderFilter>>;
  parkSpotId?: InputMaybe<IdFilterComparison>;
  paymentMethod?: InputMaybe<PaymentModeFilterComparison>;
  price?: InputMaybe<FloatFieldComparison>;
  status?: InputMaybe<ParkOrderStatusFilterComparison>;
  vehicleType?: InputMaybe<ParkSpotVehicleTypeFilterComparison>;
};

export type ParkOrderMaxAggregate = {
  __typename?: 'ParkOrderMaxAggregate';
  carOwnerId?: Maybe<Scalars['ID']['output']>;
  carSize?: Maybe<ParkSpotCarSize>;
  currency?: Maybe<Scalars['String']['output']>;
  enterTime?: Maybe<Scalars['DateTime']['output']>;
  exitTime?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  parkSpotId?: Maybe<Scalars['ID']['output']>;
  paymentMethod?: Maybe<PaymentMode>;
  price?: Maybe<Scalars['Float']['output']>;
  status?: Maybe<ParkOrderStatus>;
  vehicleType?: Maybe<ParkSpotVehicleType>;
};

export type ParkOrderMinAggregate = {
  __typename?: 'ParkOrderMinAggregate';
  carOwnerId?: Maybe<Scalars['ID']['output']>;
  carSize?: Maybe<ParkSpotCarSize>;
  currency?: Maybe<Scalars['String']['output']>;
  enterTime?: Maybe<Scalars['DateTime']['output']>;
  exitTime?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  parkSpotId?: Maybe<Scalars['ID']['output']>;
  paymentMethod?: Maybe<PaymentMode>;
  price?: Maybe<Scalars['Float']['output']>;
  status?: Maybe<ParkOrderStatus>;
  vehicleType?: Maybe<ParkSpotVehicleType>;
};

export type ParkOrderNote = {
  __typename?: 'ParkOrderNote';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  note: Scalars['String']['output'];
  parkOrder: ParkOrder;
  parkOrderId: Scalars['ID']['output'];
  staff: Operator;
};

export type ParkOrderNoteAggregateFilter = {
  and?: InputMaybe<Array<ParkOrderNoteAggregateFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ParkOrderNoteAggregateFilter>>;
  parkOrderId?: InputMaybe<IdFilterComparison>;
};

export type ParkOrderNoteFilter = {
  and?: InputMaybe<Array<ParkOrderNoteFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ParkOrderNoteFilter>>;
  parkOrderId?: InputMaybe<IdFilterComparison>;
};

export type ParkOrderNoteSort = {
  direction: SortDirection;
  field: ParkOrderNoteSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum ParkOrderNoteSortFields {
  Id = 'id',
  ParkOrderId = 'parkOrderId'
}

export type ParkOrderNotesAggregateGroupBy = {
  __typename?: 'ParkOrderNotesAggregateGroupBy';
  id?: Maybe<Scalars['ID']['output']>;
  parkOrderId?: Maybe<Scalars['ID']['output']>;
};

export type ParkOrderNotesAggregateResponse = {
  __typename?: 'ParkOrderNotesAggregateResponse';
  avg?: Maybe<ParkOrderNotesAvgAggregate>;
  count?: Maybe<ParkOrderNotesCountAggregate>;
  groupBy?: Maybe<ParkOrderNotesAggregateGroupBy>;
  max?: Maybe<ParkOrderNotesMaxAggregate>;
  min?: Maybe<ParkOrderNotesMinAggregate>;
  sum?: Maybe<ParkOrderNotesSumAggregate>;
};

export type ParkOrderNotesAvgAggregate = {
  __typename?: 'ParkOrderNotesAvgAggregate';
  id?: Maybe<Scalars['Float']['output']>;
  parkOrderId?: Maybe<Scalars['Float']['output']>;
};

export type ParkOrderNotesCountAggregate = {
  __typename?: 'ParkOrderNotesCountAggregate';
  id?: Maybe<Scalars['Int']['output']>;
  parkOrderId?: Maybe<Scalars['Int']['output']>;
};

export type ParkOrderNotesMaxAggregate = {
  __typename?: 'ParkOrderNotesMaxAggregate';
  id?: Maybe<Scalars['ID']['output']>;
  parkOrderId?: Maybe<Scalars['ID']['output']>;
};

export type ParkOrderNotesMinAggregate = {
  __typename?: 'ParkOrderNotesMinAggregate';
  id?: Maybe<Scalars['ID']['output']>;
  parkOrderId?: Maybe<Scalars['ID']['output']>;
};

export type ParkOrderNotesSumAggregate = {
  __typename?: 'ParkOrderNotesSumAggregate';
  id?: Maybe<Scalars['Float']['output']>;
  parkOrderId?: Maybe<Scalars['Float']['output']>;
};

export type ParkOrderParkOwnerTransactionsAggregateGroupBy = {
  __typename?: 'ParkOrderParkOwnerTransactionsAggregateGroupBy';
  action?: Maybe<TransactionAction>;
  amount?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  deductType?: Maybe<RiderDeductTransactionType>;
  id?: Maybe<Scalars['ID']['output']>;
  operatorId?: Maybe<Scalars['ID']['output']>;
  parkOrderCustomerId?: Maybe<Scalars['ID']['output']>;
  parkOrderParkOwnerId?: Maybe<Scalars['ID']['output']>;
  paymentGatewayId?: Maybe<Scalars['ID']['output']>;
  rechargeType?: Maybe<RiderRechargeTransactionType>;
  requestId?: Maybe<Scalars['ID']['output']>;
  riderId?: Maybe<Scalars['ID']['output']>;
  savedPaymentMethodId?: Maybe<Scalars['ID']['output']>;
  shopOrderId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<TransactionStatus>;
};

export type ParkOrderParkOwnerTransactionsAggregateResponse = {
  __typename?: 'ParkOrderParkOwnerTransactionsAggregateResponse';
  avg?: Maybe<ParkOrderParkOwnerTransactionsAvgAggregate>;
  count?: Maybe<ParkOrderParkOwnerTransactionsCountAggregate>;
  groupBy?: Maybe<ParkOrderParkOwnerTransactionsAggregateGroupBy>;
  max?: Maybe<ParkOrderParkOwnerTransactionsMaxAggregate>;
  min?: Maybe<ParkOrderParkOwnerTransactionsMinAggregate>;
  sum?: Maybe<ParkOrderParkOwnerTransactionsSumAggregate>;
};

export type ParkOrderParkOwnerTransactionsAvgAggregate = {
  __typename?: 'ParkOrderParkOwnerTransactionsAvgAggregate';
  amount?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  operatorId?: Maybe<Scalars['Float']['output']>;
  parkOrderCustomerId?: Maybe<Scalars['Float']['output']>;
  parkOrderParkOwnerId?: Maybe<Scalars['Float']['output']>;
  paymentGatewayId?: Maybe<Scalars['Float']['output']>;
  requestId?: Maybe<Scalars['Float']['output']>;
  riderId?: Maybe<Scalars['Float']['output']>;
  savedPaymentMethodId?: Maybe<Scalars['Float']['output']>;
  shopOrderId?: Maybe<Scalars['Float']['output']>;
};

export type ParkOrderParkOwnerTransactionsCountAggregate = {
  __typename?: 'ParkOrderParkOwnerTransactionsCountAggregate';
  action?: Maybe<Scalars['Int']['output']>;
  amount?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['Int']['output']>;
  currency?: Maybe<Scalars['Int']['output']>;
  deductType?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  operatorId?: Maybe<Scalars['Int']['output']>;
  parkOrderCustomerId?: Maybe<Scalars['Int']['output']>;
  parkOrderParkOwnerId?: Maybe<Scalars['Int']['output']>;
  paymentGatewayId?: Maybe<Scalars['Int']['output']>;
  rechargeType?: Maybe<Scalars['Int']['output']>;
  requestId?: Maybe<Scalars['Int']['output']>;
  riderId?: Maybe<Scalars['Int']['output']>;
  savedPaymentMethodId?: Maybe<Scalars['Int']['output']>;
  shopOrderId?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
};

export type ParkOrderParkOwnerTransactionsMaxAggregate = {
  __typename?: 'ParkOrderParkOwnerTransactionsMaxAggregate';
  action?: Maybe<TransactionAction>;
  amount?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  deductType?: Maybe<RiderDeductTransactionType>;
  id?: Maybe<Scalars['ID']['output']>;
  operatorId?: Maybe<Scalars['ID']['output']>;
  parkOrderCustomerId?: Maybe<Scalars['ID']['output']>;
  parkOrderParkOwnerId?: Maybe<Scalars['ID']['output']>;
  paymentGatewayId?: Maybe<Scalars['ID']['output']>;
  rechargeType?: Maybe<RiderRechargeTransactionType>;
  requestId?: Maybe<Scalars['ID']['output']>;
  riderId?: Maybe<Scalars['ID']['output']>;
  savedPaymentMethodId?: Maybe<Scalars['ID']['output']>;
  shopOrderId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<TransactionStatus>;
};

export type ParkOrderParkOwnerTransactionsMinAggregate = {
  __typename?: 'ParkOrderParkOwnerTransactionsMinAggregate';
  action?: Maybe<TransactionAction>;
  amount?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  deductType?: Maybe<RiderDeductTransactionType>;
  id?: Maybe<Scalars['ID']['output']>;
  operatorId?: Maybe<Scalars['ID']['output']>;
  parkOrderCustomerId?: Maybe<Scalars['ID']['output']>;
  parkOrderParkOwnerId?: Maybe<Scalars['ID']['output']>;
  paymentGatewayId?: Maybe<Scalars['ID']['output']>;
  rechargeType?: Maybe<RiderRechargeTransactionType>;
  requestId?: Maybe<Scalars['ID']['output']>;
  riderId?: Maybe<Scalars['ID']['output']>;
  savedPaymentMethodId?: Maybe<Scalars['ID']['output']>;
  shopOrderId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<TransactionStatus>;
};

export type ParkOrderParkOwnerTransactionsSumAggregate = {
  __typename?: 'ParkOrderParkOwnerTransactionsSumAggregate';
  amount?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  operatorId?: Maybe<Scalars['Float']['output']>;
  parkOrderCustomerId?: Maybe<Scalars['Float']['output']>;
  parkOrderParkOwnerId?: Maybe<Scalars['Float']['output']>;
  paymentGatewayId?: Maybe<Scalars['Float']['output']>;
  requestId?: Maybe<Scalars['Float']['output']>;
  riderId?: Maybe<Scalars['Float']['output']>;
  savedPaymentMethodId?: Maybe<Scalars['Float']['output']>;
  shopOrderId?: Maybe<Scalars['Float']['output']>;
};

export type ParkOrderProviderTransactionsAggregateGroupBy = {
  __typename?: 'ParkOrderProviderTransactionsAggregateGroupBy';
  action?: Maybe<TransactionAction>;
  amount?: Maybe<Scalars['Float']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  deductType?: Maybe<ProviderDeductTransactionType>;
  expenseType?: Maybe<ProviderExpenseType>;
  id?: Maybe<Scalars['ID']['output']>;
  operatorId?: Maybe<Scalars['ID']['output']>;
  parkOrderId?: Maybe<Scalars['ID']['output']>;
  rechargeType?: Maybe<ProviderRechargeTransactionType>;
  requestId?: Maybe<Scalars['ID']['output']>;
  shopOrderCartId?: Maybe<Scalars['ID']['output']>;
};

export type ParkOrderProviderTransactionsAggregateResponse = {
  __typename?: 'ParkOrderProviderTransactionsAggregateResponse';
  avg?: Maybe<ParkOrderProviderTransactionsAvgAggregate>;
  count?: Maybe<ParkOrderProviderTransactionsCountAggregate>;
  groupBy?: Maybe<ParkOrderProviderTransactionsAggregateGroupBy>;
  max?: Maybe<ParkOrderProviderTransactionsMaxAggregate>;
  min?: Maybe<ParkOrderProviderTransactionsMinAggregate>;
  sum?: Maybe<ParkOrderProviderTransactionsSumAggregate>;
};

export type ParkOrderProviderTransactionsAvgAggregate = {
  __typename?: 'ParkOrderProviderTransactionsAvgAggregate';
  amount?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  operatorId?: Maybe<Scalars['Float']['output']>;
  parkOrderId?: Maybe<Scalars['Float']['output']>;
  requestId?: Maybe<Scalars['Float']['output']>;
  shopOrderCartId?: Maybe<Scalars['Float']['output']>;
};

export type ParkOrderProviderTransactionsCountAggregate = {
  __typename?: 'ParkOrderProviderTransactionsCountAggregate';
  action?: Maybe<Scalars['Int']['output']>;
  amount?: Maybe<Scalars['Int']['output']>;
  currency?: Maybe<Scalars['Int']['output']>;
  deductType?: Maybe<Scalars['Int']['output']>;
  expenseType?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  operatorId?: Maybe<Scalars['Int']['output']>;
  parkOrderId?: Maybe<Scalars['Int']['output']>;
  rechargeType?: Maybe<Scalars['Int']['output']>;
  requestId?: Maybe<Scalars['Int']['output']>;
  shopOrderCartId?: Maybe<Scalars['Int']['output']>;
};

export type ParkOrderProviderTransactionsMaxAggregate = {
  __typename?: 'ParkOrderProviderTransactionsMaxAggregate';
  action?: Maybe<TransactionAction>;
  amount?: Maybe<Scalars['Float']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  deductType?: Maybe<ProviderDeductTransactionType>;
  expenseType?: Maybe<ProviderExpenseType>;
  id?: Maybe<Scalars['ID']['output']>;
  operatorId?: Maybe<Scalars['ID']['output']>;
  parkOrderId?: Maybe<Scalars['ID']['output']>;
  rechargeType?: Maybe<ProviderRechargeTransactionType>;
  requestId?: Maybe<Scalars['ID']['output']>;
  shopOrderCartId?: Maybe<Scalars['ID']['output']>;
};

export type ParkOrderProviderTransactionsMinAggregate = {
  __typename?: 'ParkOrderProviderTransactionsMinAggregate';
  action?: Maybe<TransactionAction>;
  amount?: Maybe<Scalars['Float']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  deductType?: Maybe<ProviderDeductTransactionType>;
  expenseType?: Maybe<ProviderExpenseType>;
  id?: Maybe<Scalars['ID']['output']>;
  operatorId?: Maybe<Scalars['ID']['output']>;
  parkOrderId?: Maybe<Scalars['ID']['output']>;
  rechargeType?: Maybe<ProviderRechargeTransactionType>;
  requestId?: Maybe<Scalars['ID']['output']>;
  shopOrderCartId?: Maybe<Scalars['ID']['output']>;
};

export type ParkOrderProviderTransactionsSumAggregate = {
  __typename?: 'ParkOrderProviderTransactionsSumAggregate';
  amount?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  operatorId?: Maybe<Scalars['Float']['output']>;
  parkOrderId?: Maybe<Scalars['Float']['output']>;
  requestId?: Maybe<Scalars['Float']['output']>;
  shopOrderCartId?: Maybe<Scalars['Float']['output']>;
};

export type ParkOrderSort = {
  direction: SortDirection;
  field: ParkOrderSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum ParkOrderSortFields {
  CarOwnerId = 'carOwnerId',
  CarSize = 'carSize',
  Currency = 'currency',
  EnterTime = 'enterTime',
  ExitTime = 'exitTime',
  Id = 'id',
  ParkSpotId = 'parkSpotId',
  PaymentMethod = 'paymentMethod',
  Price = 'price',
  Status = 'status',
  VehicleType = 'vehicleType'
}

/** park order status, Pending is the default status prior to payment */
export enum ParkOrderStatus {
  Accepted = 'ACCEPTED',
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  Paid = 'PAID',
  Pending = 'PENDING',
  Rejected = 'REJECTED'
}

export type ParkOrderStatusFilterComparison = {
  eq?: InputMaybe<ParkOrderStatus>;
  gt?: InputMaybe<ParkOrderStatus>;
  gte?: InputMaybe<ParkOrderStatus>;
  iLike?: InputMaybe<ParkOrderStatus>;
  in?: InputMaybe<Array<ParkOrderStatus>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<ParkOrderStatus>;
  lt?: InputMaybe<ParkOrderStatus>;
  lte?: InputMaybe<ParkOrderStatus>;
  neq?: InputMaybe<ParkOrderStatus>;
  notILike?: InputMaybe<ParkOrderStatus>;
  notIn?: InputMaybe<Array<ParkOrderStatus>>;
  notLike?: InputMaybe<ParkOrderStatus>;
};

export type ParkOrderSumAggregate = {
  __typename?: 'ParkOrderSumAggregate';
  carOwnerId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  parkSpotId?: Maybe<Scalars['Float']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
};

export type ParkSpot = {
  __typename?: 'ParkSpot';
  acceptExtendRequest: Scalars['Boolean']['output'];
  acceptNewRequest: Scalars['Boolean']['output'];
  address?: Maybe<Scalars['String']['output']>;
  bikePrice?: Maybe<Scalars['Float']['output']>;
  bikeSpaces: Scalars['Int']['output'];
  carPrice?: Maybe<Scalars['Float']['output']>;
  carSize?: Maybe<ParkSpotCarSize>;
  carSpaces: Scalars['Int']['output'];
  closeHour?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  currency: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  facilities: Array<ParkSpotFacility>;
  feedbacks: ParkSpotFeedbacksConnection;
  feedbacksAggregate: Array<ParkSpotFeedbacksAggregateResponse>;
  id: Scalars['ID']['output'];
  images: Array<Media>;
  imagesAggregate: Array<ParkSpotImagesAggregateResponse>;
  lastActivityAt?: Maybe<Scalars['DateTime']['output']>;
  location: Point;
  mainImage?: Maybe<Media>;
  mainImageId?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  openHour?: Maybe<Scalars['String']['output']>;
  operatorName?: Maybe<Scalars['String']['output']>;
  operatorPhoneCountryCode?: Maybe<Scalars['String']['output']>;
  operatorPhoneNumber?: Maybe<Scalars['String']['output']>;
  owner?: Maybe<Rider>;
  parkOrders: ParkSpotParkOrdersConnection;
  parkOrdersAggregate: Array<ParkSpotParkOrdersAggregateResponse>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  ratingAggregate: RatingAggregate;
  status: ParkSpotStatus;
  truckPrice?: Maybe<Scalars['Float']['output']>;
  truckSpaces: Scalars['Int']['output'];
  type: ParkSpotType;
  weeklySchedule: Array<WeekdaySchedule>;
};


export type ParkSpotFeedbacksArgs = {
  filter?: ParkingFeedbackFilter;
  paging?: OffsetPaging;
  sorting?: Array<ParkingFeedbackSort>;
};


export type ParkSpotFeedbacksAggregateArgs = {
  filter?: InputMaybe<ParkingFeedbackAggregateFilter>;
};


export type ParkSpotImagesArgs = {
  filter?: MediaFilter;
  sorting?: Array<MediaSort>;
};


export type ParkSpotImagesAggregateArgs = {
  filter?: InputMaybe<MediaAggregateFilter>;
};


export type ParkSpotParkOrdersArgs = {
  filter?: ParkOrderFilter;
  paging?: OffsetPaging;
  sorting?: Array<ParkOrderSort>;
};


export type ParkSpotParkOrdersAggregateArgs = {
  filter?: InputMaybe<ParkOrderAggregateFilter>;
};

export type ParkSpotAggregateFilter = {
  address?: InputMaybe<StringFieldComparison>;
  and?: InputMaybe<Array<ParkSpotAggregateFilter>>;
  carSize?: InputMaybe<ParkSpotCarSizeFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<ParkSpotAggregateFilter>>;
  ratingAggregate?: InputMaybe<ParkSpotAggregateFilterRatingAggregateAggregateFilter>;
  status?: InputMaybe<ParkSpotStatusFilterComparison>;
  type?: InputMaybe<ParkSpotTypeFilterComparison>;
};

export type ParkSpotAggregateFilterRatingAggregateAggregateFilter = {
  and?: InputMaybe<Array<ParkSpotAggregateFilterRatingAggregateAggregateFilter>>;
  or?: InputMaybe<Array<ParkSpotAggregateFilterRatingAggregateAggregateFilter>>;
  rating?: InputMaybe<IntFieldComparison>;
};

export type ParkSpotAggregateGroupBy = {
  __typename?: 'ParkSpotAggregateGroupBy';
  address?: Maybe<Scalars['String']['output']>;
  carSize?: Maybe<ParkSpotCarSize>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  ratingAggregate?: Maybe<RatingAggregate>;
  status?: Maybe<ParkSpotStatus>;
  type?: Maybe<ParkSpotType>;
};

export type ParkSpotAggregateResponse = {
  __typename?: 'ParkSpotAggregateResponse';
  avg?: Maybe<ParkSpotAvgAggregate>;
  count?: Maybe<ParkSpotCountAggregate>;
  groupBy?: Maybe<ParkSpotAggregateGroupBy>;
  max?: Maybe<ParkSpotMaxAggregate>;
  min?: Maybe<ParkSpotMinAggregate>;
  sum?: Maybe<ParkSpotSumAggregate>;
};

export type ParkSpotAvgAggregate = {
  __typename?: 'ParkSpotAvgAggregate';
  id?: Maybe<Scalars['Float']['output']>;
};

export enum ParkSpotCarSize {
  Large = 'LARGE',
  Medium = 'MEDIUM',
  Small = 'SMALL',
  VeryLarge = 'VERY_LARGE'
}

export type ParkSpotCarSizeFilterComparison = {
  eq?: InputMaybe<ParkSpotCarSize>;
  gt?: InputMaybe<ParkSpotCarSize>;
  gte?: InputMaybe<ParkSpotCarSize>;
  iLike?: InputMaybe<ParkSpotCarSize>;
  in?: InputMaybe<Array<ParkSpotCarSize>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<ParkSpotCarSize>;
  lt?: InputMaybe<ParkSpotCarSize>;
  lte?: InputMaybe<ParkSpotCarSize>;
  neq?: InputMaybe<ParkSpotCarSize>;
  notILike?: InputMaybe<ParkSpotCarSize>;
  notIn?: InputMaybe<Array<ParkSpotCarSize>>;
  notLike?: InputMaybe<ParkSpotCarSize>;
};

export type ParkSpotConnection = {
  __typename?: 'ParkSpotConnection';
  /** Array of nodes. */
  nodes: Array<ParkSpot>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type ParkSpotCountAggregate = {
  __typename?: 'ParkSpotCountAggregate';
  address?: Maybe<Scalars['Int']['output']>;
  carSize?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['Int']['output']>;
  ratingAggregate?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<Scalars['Int']['output']>;
};

/** List of possible park spot facilities. This enum is used in ParkSpot. */
export enum ParkSpotFacility {
  CarWash = 'CAR_WASH',
  Cctv = 'CCTV',
  Covered = 'COVERED',
  ElectricCharging = 'ELECTRIC_CHARGING',
  Guarded = 'GUARDED',
  Toilet = 'TOILET'
}

export type ParkSpotFeedbacksAggregateGroupBy = {
  __typename?: 'ParkSpotFeedbacksAggregateGroupBy';
  customerId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  parkSpotId?: Maybe<Scalars['ID']['output']>;
  score?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<ReviewStatus>;
};

export type ParkSpotFeedbacksAggregateResponse = {
  __typename?: 'ParkSpotFeedbacksAggregateResponse';
  avg?: Maybe<ParkSpotFeedbacksAvgAggregate>;
  count?: Maybe<ParkSpotFeedbacksCountAggregate>;
  groupBy?: Maybe<ParkSpotFeedbacksAggregateGroupBy>;
  max?: Maybe<ParkSpotFeedbacksMaxAggregate>;
  min?: Maybe<ParkSpotFeedbacksMinAggregate>;
  sum?: Maybe<ParkSpotFeedbacksSumAggregate>;
};

export type ParkSpotFeedbacksAvgAggregate = {
  __typename?: 'ParkSpotFeedbacksAvgAggregate';
  customerId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  parkSpotId?: Maybe<Scalars['Float']['output']>;
  score?: Maybe<Scalars['Float']['output']>;
};

export type ParkSpotFeedbacksConnection = {
  __typename?: 'ParkSpotFeedbacksConnection';
  /** Array of nodes. */
  nodes: Array<ParkingFeedback>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type ParkSpotFeedbacksCountAggregate = {
  __typename?: 'ParkSpotFeedbacksCountAggregate';
  customerId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  parkSpotId?: Maybe<Scalars['Int']['output']>;
  score?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
};

export type ParkSpotFeedbacksMaxAggregate = {
  __typename?: 'ParkSpotFeedbacksMaxAggregate';
  customerId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  parkSpotId?: Maybe<Scalars['ID']['output']>;
  score?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<ReviewStatus>;
};

export type ParkSpotFeedbacksMinAggregate = {
  __typename?: 'ParkSpotFeedbacksMinAggregate';
  customerId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  parkSpotId?: Maybe<Scalars['ID']['output']>;
  score?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<ReviewStatus>;
};

export type ParkSpotFeedbacksSumAggregate = {
  __typename?: 'ParkSpotFeedbacksSumAggregate';
  customerId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  parkSpotId?: Maybe<Scalars['Float']['output']>;
  score?: Maybe<Scalars['Float']['output']>;
};

export type ParkSpotFilter = {
  address?: InputMaybe<StringFieldComparison>;
  and?: InputMaybe<Array<ParkSpotFilter>>;
  carSize?: InputMaybe<ParkSpotCarSizeFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<ParkSpotFilter>>;
  ratingAggregate?: InputMaybe<ParkSpotFilterRatingAggregateFilter>;
  status?: InputMaybe<ParkSpotStatusFilterComparison>;
  type?: InputMaybe<ParkSpotTypeFilterComparison>;
};

export type ParkSpotFilterInput = {
  facilities: Array<ParkSpotFacility>;
  fromTime?: InputMaybe<Scalars['DateTime']['input']>;
  maximumDistance: Scalars['Int']['input'];
  minimumRating: Scalars['Int']['input'];
  parkingType?: InputMaybe<ParkSpotType>;
  point: PointInput;
  toTime?: InputMaybe<Scalars['DateTime']['input']>;
  vehicleType?: InputMaybe<ParkSpotVehicleType>;
};

export type ParkSpotFilterRatingAggregateFilter = {
  and?: InputMaybe<Array<ParkSpotFilterRatingAggregateFilter>>;
  or?: InputMaybe<Array<ParkSpotFilterRatingAggregateFilter>>;
  rating?: InputMaybe<IntFieldComparison>;
};

export type ParkSpotImagesAggregateGroupBy = {
  __typename?: 'ParkSpotImagesAggregateGroupBy';
  id?: Maybe<Scalars['ID']['output']>;
};

export type ParkSpotImagesAggregateResponse = {
  __typename?: 'ParkSpotImagesAggregateResponse';
  avg?: Maybe<ParkSpotImagesAvgAggregate>;
  count?: Maybe<ParkSpotImagesCountAggregate>;
  groupBy?: Maybe<ParkSpotImagesAggregateGroupBy>;
  max?: Maybe<ParkSpotImagesMaxAggregate>;
  min?: Maybe<ParkSpotImagesMinAggregate>;
  sum?: Maybe<ParkSpotImagesSumAggregate>;
};

export type ParkSpotImagesAvgAggregate = {
  __typename?: 'ParkSpotImagesAvgAggregate';
  id?: Maybe<Scalars['Float']['output']>;
};

export type ParkSpotImagesCountAggregate = {
  __typename?: 'ParkSpotImagesCountAggregate';
  id?: Maybe<Scalars['Int']['output']>;
};

export type ParkSpotImagesMaxAggregate = {
  __typename?: 'ParkSpotImagesMaxAggregate';
  id?: Maybe<Scalars['ID']['output']>;
};

export type ParkSpotImagesMinAggregate = {
  __typename?: 'ParkSpotImagesMinAggregate';
  id?: Maybe<Scalars['ID']['output']>;
};

export type ParkSpotImagesSumAggregate = {
  __typename?: 'ParkSpotImagesSumAggregate';
  id?: Maybe<Scalars['Float']['output']>;
};

export type ParkSpotMaxAggregate = {
  __typename?: 'ParkSpotMaxAggregate';
  address?: Maybe<Scalars['String']['output']>;
  carSize?: Maybe<ParkSpotCarSize>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  ratingAggregate?: Maybe<RatingAggregate>;
  status?: Maybe<ParkSpotStatus>;
  type?: Maybe<ParkSpotType>;
};

export type ParkSpotMinAggregate = {
  __typename?: 'ParkSpotMinAggregate';
  address?: Maybe<Scalars['String']['output']>;
  carSize?: Maybe<ParkSpotCarSize>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  ratingAggregate?: Maybe<RatingAggregate>;
  status?: Maybe<ParkSpotStatus>;
  type?: Maybe<ParkSpotType>;
};

export type ParkSpotNote = {
  __typename?: 'ParkSpotNote';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  note: Scalars['String']['output'];
  parkSpot: ParkSpot;
  parkSpotId: Scalars['ID']['output'];
  staff: Operator;
};

export type ParkSpotNoteFilter = {
  and?: InputMaybe<Array<ParkSpotNoteFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ParkSpotNoteFilter>>;
  parkSpotId?: InputMaybe<IdFilterComparison>;
};

export type ParkSpotNoteSort = {
  direction: SortDirection;
  field: ParkSpotNoteSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum ParkSpotNoteSortFields {
  Id = 'id',
  ParkSpotId = 'parkSpotId'
}

export type ParkSpotParkOrdersAggregateGroupBy = {
  __typename?: 'ParkSpotParkOrdersAggregateGroupBy';
  carOwnerId?: Maybe<Scalars['ID']['output']>;
  carSize?: Maybe<ParkSpotCarSize>;
  currency?: Maybe<Scalars['String']['output']>;
  enterTime?: Maybe<Scalars['DateTime']['output']>;
  exitTime?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  parkSpotId?: Maybe<Scalars['ID']['output']>;
  paymentMethod?: Maybe<PaymentMode>;
  price?: Maybe<Scalars['Float']['output']>;
  status?: Maybe<ParkOrderStatus>;
  vehicleType?: Maybe<ParkSpotVehicleType>;
};

export type ParkSpotParkOrdersAggregateResponse = {
  __typename?: 'ParkSpotParkOrdersAggregateResponse';
  avg?: Maybe<ParkSpotParkOrdersAvgAggregate>;
  count?: Maybe<ParkSpotParkOrdersCountAggregate>;
  groupBy?: Maybe<ParkSpotParkOrdersAggregateGroupBy>;
  max?: Maybe<ParkSpotParkOrdersMaxAggregate>;
  min?: Maybe<ParkSpotParkOrdersMinAggregate>;
  sum?: Maybe<ParkSpotParkOrdersSumAggregate>;
};

export type ParkSpotParkOrdersAvgAggregate = {
  __typename?: 'ParkSpotParkOrdersAvgAggregate';
  carOwnerId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  parkSpotId?: Maybe<Scalars['Float']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
};

export type ParkSpotParkOrdersConnection = {
  __typename?: 'ParkSpotParkOrdersConnection';
  /** Array of nodes. */
  nodes: Array<ParkOrder>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type ParkSpotParkOrdersCountAggregate = {
  __typename?: 'ParkSpotParkOrdersCountAggregate';
  carOwnerId?: Maybe<Scalars['Int']['output']>;
  carSize?: Maybe<Scalars['Int']['output']>;
  currency?: Maybe<Scalars['Int']['output']>;
  enterTime?: Maybe<Scalars['Int']['output']>;
  exitTime?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  parkSpotId?: Maybe<Scalars['Int']['output']>;
  paymentMethod?: Maybe<Scalars['Int']['output']>;
  price?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  vehicleType?: Maybe<Scalars['Int']['output']>;
};

export type ParkSpotParkOrdersMaxAggregate = {
  __typename?: 'ParkSpotParkOrdersMaxAggregate';
  carOwnerId?: Maybe<Scalars['ID']['output']>;
  carSize?: Maybe<ParkSpotCarSize>;
  currency?: Maybe<Scalars['String']['output']>;
  enterTime?: Maybe<Scalars['DateTime']['output']>;
  exitTime?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  parkSpotId?: Maybe<Scalars['ID']['output']>;
  paymentMethod?: Maybe<PaymentMode>;
  price?: Maybe<Scalars['Float']['output']>;
  status?: Maybe<ParkOrderStatus>;
  vehicleType?: Maybe<ParkSpotVehicleType>;
};

export type ParkSpotParkOrdersMinAggregate = {
  __typename?: 'ParkSpotParkOrdersMinAggregate';
  carOwnerId?: Maybe<Scalars['ID']['output']>;
  carSize?: Maybe<ParkSpotCarSize>;
  currency?: Maybe<Scalars['String']['output']>;
  enterTime?: Maybe<Scalars['DateTime']['output']>;
  exitTime?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  parkSpotId?: Maybe<Scalars['ID']['output']>;
  paymentMethod?: Maybe<PaymentMode>;
  price?: Maybe<Scalars['Float']['output']>;
  status?: Maybe<ParkOrderStatus>;
  vehicleType?: Maybe<ParkSpotVehicleType>;
};

export type ParkSpotParkOrdersSumAggregate = {
  __typename?: 'ParkSpotParkOrdersSumAggregate';
  carOwnerId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  parkSpotId?: Maybe<Scalars['Float']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
};

export type ParkSpotPendingVerificationNotification = {
  __typename?: 'ParkSpotPendingVerificationNotification';
  appType: AppType;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  parkSpotPendingVerification: ParkSpot;
  readAt?: Maybe<Scalars['DateTime']['output']>;
  type: AdminNotificationType;
};

export type ParkSpotSort = {
  direction: SortDirection;
  field: ParkSpotSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum ParkSpotSortFields {
  Address = 'address',
  CarSize = 'carSize',
  Id = 'id',
  Name = 'name',
  RatingAggregate = 'ratingAggregate',
  Status = 'status',
  Type = 'type'
}

/** The status of the park spot */
export enum ParkSpotStatus {
  Active = 'Active',
  Blocked = 'Blocked',
  Inactive = 'Inactive',
  Pending = 'Pending'
}

export type ParkSpotStatusFilterComparison = {
  eq?: InputMaybe<ParkSpotStatus>;
  gt?: InputMaybe<ParkSpotStatus>;
  gte?: InputMaybe<ParkSpotStatus>;
  iLike?: InputMaybe<ParkSpotStatus>;
  in?: InputMaybe<Array<ParkSpotStatus>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<ParkSpotStatus>;
  lt?: InputMaybe<ParkSpotStatus>;
  lte?: InputMaybe<ParkSpotStatus>;
  neq?: InputMaybe<ParkSpotStatus>;
  notILike?: InputMaybe<ParkSpotStatus>;
  notIn?: InputMaybe<Array<ParkSpotStatus>>;
  notLike?: InputMaybe<ParkSpotStatus>;
};

export type ParkSpotSumAggregate = {
  __typename?: 'ParkSpotSumAggregate';
  id?: Maybe<Scalars['Float']['output']>;
};

/** The type of the park spot, If personal then show the location as name, If public then show the name as location */
export enum ParkSpotType {
  Personal = 'PERSONAL',
  Public = 'PUBLIC'
}

export type ParkSpotTypeFilterComparison = {
  eq?: InputMaybe<ParkSpotType>;
  gt?: InputMaybe<ParkSpotType>;
  gte?: InputMaybe<ParkSpotType>;
  iLike?: InputMaybe<ParkSpotType>;
  in?: InputMaybe<Array<ParkSpotType>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<ParkSpotType>;
  lt?: InputMaybe<ParkSpotType>;
  lte?: InputMaybe<ParkSpotType>;
  neq?: InputMaybe<ParkSpotType>;
  notILike?: InputMaybe<ParkSpotType>;
  notIn?: InputMaybe<Array<ParkSpotType>>;
  notLike?: InputMaybe<ParkSpotType>;
};

/** The type of ride that can be parked in a park spot */
export enum ParkSpotVehicleType {
  Bike = 'Bike',
  Car = 'Car',
  Truck = 'Truck'
}

export type ParkSpotVehicleTypeFilterComparison = {
  eq?: InputMaybe<ParkSpotVehicleType>;
  gt?: InputMaybe<ParkSpotVehicleType>;
  gte?: InputMaybe<ParkSpotVehicleType>;
  iLike?: InputMaybe<ParkSpotVehicleType>;
  in?: InputMaybe<Array<ParkSpotVehicleType>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<ParkSpotVehicleType>;
  lt?: InputMaybe<ParkSpotVehicleType>;
  lte?: InputMaybe<ParkSpotVehicleType>;
  neq?: InputMaybe<ParkSpotVehicleType>;
  notILike?: InputMaybe<ParkSpotVehicleType>;
  notIn?: InputMaybe<Array<ParkSpotVehicleType>>;
  notLike?: InputMaybe<ParkSpotVehicleType>;
};

export type ParkingFeedback = {
  __typename?: 'ParkingFeedback';
  comment?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  customerId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  order: ParkOrder;
  parameters: Array<ParkingFeedbackParameter>;
  parametersAggregate: Array<ParkingFeedbackParametersAggregateResponse>;
  parkSpotId: Scalars['ID']['output'];
  /** The score of the review, from 0 to 100 */
  score: Scalars['Int']['output'];
  status: ReviewStatus;
};


export type ParkingFeedbackParametersArgs = {
  filter?: ParkingFeedbackParameterFilter;
  sorting?: Array<ParkingFeedbackParameterSort>;
};


export type ParkingFeedbackParametersAggregateArgs = {
  filter?: InputMaybe<ParkingFeedbackParameterAggregateFilter>;
};

export type ParkingFeedbackAggregateFilter = {
  and?: InputMaybe<Array<ParkingFeedbackAggregateFilter>>;
  customerId?: InputMaybe<IdFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ParkingFeedbackAggregateFilter>>;
  order?: InputMaybe<ParkingFeedbackAggregateFilterParkOrderAggregateFilter>;
  parkSpotId?: InputMaybe<IdFilterComparison>;
  score?: InputMaybe<IntFieldComparison>;
  status?: InputMaybe<ReviewStatusFilterComparison>;
};

export type ParkingFeedbackAggregateFilterParkOrderAggregateFilter = {
  and?: InputMaybe<Array<ParkingFeedbackAggregateFilterParkOrderAggregateFilter>>;
  carOwnerId?: InputMaybe<IdFilterComparison>;
  carSize?: InputMaybe<ParkSpotCarSizeFilterComparison>;
  currency?: InputMaybe<StringFieldComparison>;
  enterTime?: InputMaybe<DateFieldComparison>;
  exitTime?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ParkingFeedbackAggregateFilterParkOrderAggregateFilter>>;
  parkSpotId?: InputMaybe<IdFilterComparison>;
  paymentMethod?: InputMaybe<PaymentModeFilterComparison>;
  price?: InputMaybe<FloatFieldComparison>;
  status?: InputMaybe<ParkOrderStatusFilterComparison>;
  vehicleType?: InputMaybe<ParkSpotVehicleTypeFilterComparison>;
};

export type ParkingFeedbackAggregateGroupBy = {
  __typename?: 'ParkingFeedbackAggregateGroupBy';
  customerId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  parkSpotId?: Maybe<Scalars['ID']['output']>;
  score?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<ReviewStatus>;
};

export type ParkingFeedbackAggregateResponse = {
  __typename?: 'ParkingFeedbackAggregateResponse';
  avg?: Maybe<ParkingFeedbackAvgAggregate>;
  count?: Maybe<ParkingFeedbackCountAggregate>;
  groupBy?: Maybe<ParkingFeedbackAggregateGroupBy>;
  max?: Maybe<ParkingFeedbackMaxAggregate>;
  min?: Maybe<ParkingFeedbackMinAggregate>;
  sum?: Maybe<ParkingFeedbackSumAggregate>;
};

export type ParkingFeedbackAvgAggregate = {
  __typename?: 'ParkingFeedbackAvgAggregate';
  customerId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  parkSpotId?: Maybe<Scalars['Float']['output']>;
  score?: Maybe<Scalars['Float']['output']>;
};

export type ParkingFeedbackConnection = {
  __typename?: 'ParkingFeedbackConnection';
  /** Array of nodes. */
  nodes: Array<ParkingFeedback>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type ParkingFeedbackCountAggregate = {
  __typename?: 'ParkingFeedbackCountAggregate';
  customerId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  parkSpotId?: Maybe<Scalars['Int']['output']>;
  score?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
};

export type ParkingFeedbackFilter = {
  and?: InputMaybe<Array<ParkingFeedbackFilter>>;
  customerId?: InputMaybe<IdFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ParkingFeedbackFilter>>;
  order?: InputMaybe<ParkingFeedbackFilterParkOrderFilter>;
  parkSpotId?: InputMaybe<IdFilterComparison>;
  score?: InputMaybe<IntFieldComparison>;
  status?: InputMaybe<ReviewStatusFilterComparison>;
};

export type ParkingFeedbackFilterParkOrderFilter = {
  and?: InputMaybe<Array<ParkingFeedbackFilterParkOrderFilter>>;
  carOwnerId?: InputMaybe<IdFilterComparison>;
  carSize?: InputMaybe<ParkSpotCarSizeFilterComparison>;
  currency?: InputMaybe<StringFieldComparison>;
  enterTime?: InputMaybe<DateFieldComparison>;
  exitTime?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ParkingFeedbackFilterParkOrderFilter>>;
  parkSpotId?: InputMaybe<IdFilterComparison>;
  paymentMethod?: InputMaybe<PaymentModeFilterComparison>;
  price?: InputMaybe<FloatFieldComparison>;
  status?: InputMaybe<ParkOrderStatusFilterComparison>;
  vehicleType?: InputMaybe<ParkSpotVehicleTypeFilterComparison>;
};

export type ParkingFeedbackMaxAggregate = {
  __typename?: 'ParkingFeedbackMaxAggregate';
  customerId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  parkSpotId?: Maybe<Scalars['ID']['output']>;
  score?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<ReviewStatus>;
};

export type ParkingFeedbackMinAggregate = {
  __typename?: 'ParkingFeedbackMinAggregate';
  customerId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  parkSpotId?: Maybe<Scalars['ID']['output']>;
  score?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<ReviewStatus>;
};

export type ParkingFeedbackParameter = {
  __typename?: 'ParkingFeedbackParameter';
  feedbacks: ParkingFeedbackParameterFeedbacksConnection;
  feedbacksAggregate: Array<ParkingFeedbackParameterFeedbacksAggregateResponse>;
  id: Scalars['ID']['output'];
  isGood: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
};


export type ParkingFeedbackParameterFeedbacksArgs = {
  filter?: ParkingFeedbackParameterFilter;
  paging?: OffsetPaging;
  sorting?: Array<ParkingFeedbackParameterSort>;
};


export type ParkingFeedbackParameterFeedbacksAggregateArgs = {
  filter?: InputMaybe<ParkingFeedbackParameterAggregateFilter>;
};

export type ParkingFeedbackParameterAggregateFilter = {
  and?: InputMaybe<Array<ParkingFeedbackParameterAggregateFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ParkingFeedbackParameterAggregateFilter>>;
};

export type ParkingFeedbackParameterDeleteResponse = {
  __typename?: 'ParkingFeedbackParameterDeleteResponse';
  id?: Maybe<Scalars['ID']['output']>;
  isGood?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type ParkingFeedbackParameterFeedbacksAggregateGroupBy = {
  __typename?: 'ParkingFeedbackParameterFeedbacksAggregateGroupBy';
  id?: Maybe<Scalars['ID']['output']>;
};

export type ParkingFeedbackParameterFeedbacksAggregateResponse = {
  __typename?: 'ParkingFeedbackParameterFeedbacksAggregateResponse';
  avg?: Maybe<ParkingFeedbackParameterFeedbacksAvgAggregate>;
  count?: Maybe<ParkingFeedbackParameterFeedbacksCountAggregate>;
  groupBy?: Maybe<ParkingFeedbackParameterFeedbacksAggregateGroupBy>;
  max?: Maybe<ParkingFeedbackParameterFeedbacksMaxAggregate>;
  min?: Maybe<ParkingFeedbackParameterFeedbacksMinAggregate>;
  sum?: Maybe<ParkingFeedbackParameterFeedbacksSumAggregate>;
};

export type ParkingFeedbackParameterFeedbacksAvgAggregate = {
  __typename?: 'ParkingFeedbackParameterFeedbacksAvgAggregate';
  id?: Maybe<Scalars['Float']['output']>;
};

export type ParkingFeedbackParameterFeedbacksConnection = {
  __typename?: 'ParkingFeedbackParameterFeedbacksConnection';
  /** Array of nodes. */
  nodes: Array<ParkingFeedbackParameter>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type ParkingFeedbackParameterFeedbacksCountAggregate = {
  __typename?: 'ParkingFeedbackParameterFeedbacksCountAggregate';
  id?: Maybe<Scalars['Int']['output']>;
};

export type ParkingFeedbackParameterFeedbacksMaxAggregate = {
  __typename?: 'ParkingFeedbackParameterFeedbacksMaxAggregate';
  id?: Maybe<Scalars['ID']['output']>;
};

export type ParkingFeedbackParameterFeedbacksMinAggregate = {
  __typename?: 'ParkingFeedbackParameterFeedbacksMinAggregate';
  id?: Maybe<Scalars['ID']['output']>;
};

export type ParkingFeedbackParameterFeedbacksSumAggregate = {
  __typename?: 'ParkingFeedbackParameterFeedbacksSumAggregate';
  id?: Maybe<Scalars['Float']['output']>;
};

export type ParkingFeedbackParameterFilter = {
  and?: InputMaybe<Array<ParkingFeedbackParameterFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ParkingFeedbackParameterFilter>>;
};

export type ParkingFeedbackParameterSort = {
  direction: SortDirection;
  field: ParkingFeedbackParameterSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum ParkingFeedbackParameterSortFields {
  Id = 'id'
}

export type ParkingFeedbackParametersAggregateGroupBy = {
  __typename?: 'ParkingFeedbackParametersAggregateGroupBy';
  id?: Maybe<Scalars['ID']['output']>;
};

export type ParkingFeedbackParametersAggregateResponse = {
  __typename?: 'ParkingFeedbackParametersAggregateResponse';
  avg?: Maybe<ParkingFeedbackParametersAvgAggregate>;
  count?: Maybe<ParkingFeedbackParametersCountAggregate>;
  groupBy?: Maybe<ParkingFeedbackParametersAggregateGroupBy>;
  max?: Maybe<ParkingFeedbackParametersMaxAggregate>;
  min?: Maybe<ParkingFeedbackParametersMinAggregate>;
  sum?: Maybe<ParkingFeedbackParametersSumAggregate>;
};

export type ParkingFeedbackParametersAvgAggregate = {
  __typename?: 'ParkingFeedbackParametersAvgAggregate';
  id?: Maybe<Scalars['Float']['output']>;
};

export type ParkingFeedbackParametersCountAggregate = {
  __typename?: 'ParkingFeedbackParametersCountAggregate';
  id?: Maybe<Scalars['Int']['output']>;
};

export type ParkingFeedbackParametersMaxAggregate = {
  __typename?: 'ParkingFeedbackParametersMaxAggregate';
  id?: Maybe<Scalars['ID']['output']>;
};

export type ParkingFeedbackParametersMinAggregate = {
  __typename?: 'ParkingFeedbackParametersMinAggregate';
  id?: Maybe<Scalars['ID']['output']>;
};

export type ParkingFeedbackParametersSumAggregate = {
  __typename?: 'ParkingFeedbackParametersSumAggregate';
  id?: Maybe<Scalars['Float']['output']>;
};

export type ParkingFeedbackSort = {
  direction: SortDirection;
  field: ParkingFeedbackSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum ParkingFeedbackSortFields {
  CustomerId = 'customerId',
  Id = 'id',
  ParkSpotId = 'parkSpotId',
  Score = 'score',
  Status = 'status'
}

export type ParkingFeedbackSumAggregate = {
  __typename?: 'ParkingFeedbackSumAggregate';
  customerId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  parkSpotId?: Maybe<Scalars['Float']['output']>;
  score?: Maybe<Scalars['Float']['output']>;
};

export type ParkingLoginSession = {
  __typename?: 'ParkingLoginSession';
  customerId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  sessionInfo: SessionInfo;
};

export type ParkingLoginSessionFilter = {
  and?: InputMaybe<Array<ParkingLoginSessionFilter>>;
  customerId?: InputMaybe<IdFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ParkingLoginSessionFilter>>;
};

export type ParkingLoginSessionSort = {
  direction: SortDirection;
  field: ParkingLoginSessionSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum ParkingLoginSessionSortFields {
  CustomerId = 'customerId',
  Id = 'id'
}

export type ParkingPayoutSession = {
  __typename?: 'ParkingPayoutSession';
  createdAt: Scalars['DateTime']['output'];
  currency: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  parkingTransactions: ParkingPayoutSessionParkingTransactionsConnection;
  parkingTransactionsAggregate: Array<ParkingPayoutSessionParkingTransactionsAggregateResponse>;
  payoutMethodDetails: Array<ParkingPayoutSessionPayoutMethodDetail>;
  payoutMethods: Array<PayoutMethod>;
  processedAt?: Maybe<Scalars['DateTime']['output']>;
  status: PayoutSessionStatus;
  totalAmount: Scalars['Float']['output'];
};


export type ParkingPayoutSessionParkingTransactionsArgs = {
  filter?: ParkingTransactionFilter;
  paging?: OffsetPaging;
  sorting?: Array<ParkingTransactionSort>;
};


export type ParkingPayoutSessionParkingTransactionsAggregateArgs = {
  filter?: InputMaybe<ParkingTransactionAggregateFilter>;
};


export type ParkingPayoutSessionPayoutMethodDetailsArgs = {
  filter?: ParkingPayoutSessionPayoutMethodDetailFilter;
  sorting?: Array<ParkingPayoutSessionPayoutMethodDetailSort>;
};


export type ParkingPayoutSessionPayoutMethodsArgs = {
  filter?: PayoutMethodFilter;
  sorting?: Array<PayoutMethodSort>;
};

export type ParkingPayoutSessionConnection = {
  __typename?: 'ParkingPayoutSessionConnection';
  /** Array of nodes. */
  nodes: Array<ParkingPayoutSession>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type ParkingPayoutSessionFilter = {
  and?: InputMaybe<Array<ParkingPayoutSessionFilter>>;
  currency?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ParkingPayoutSessionFilter>>;
  status?: InputMaybe<PayoutSessionStatusFilterComparison>;
  totalAmount?: InputMaybe<NumberFieldComparison>;
};

export type ParkingPayoutSessionParkingTransactionsAggregateGroupBy = {
  __typename?: 'ParkingPayoutSessionParkingTransactionsAggregateGroupBy';
  amount?: Maybe<Scalars['Float']['output']>;
  creditType?: Maybe<ParkingTransactionCreditType>;
  currency?: Maybe<Scalars['String']['output']>;
  customerId?: Maybe<Scalars['ID']['output']>;
  debitType?: Maybe<ParkingTransactionDebitType>;
  id?: Maybe<Scalars['ID']['output']>;
  parkSpotId?: Maybe<Scalars['ID']['output']>;
  payoutAccountId?: Maybe<Scalars['ID']['output']>;
  payoutMethodId?: Maybe<Scalars['ID']['output']>;
  payoutSessionId?: Maybe<Scalars['ID']['output']>;
  payoutSessionMethodId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<TransactionStatus>;
  type?: Maybe<TransactionType>;
};

export type ParkingPayoutSessionParkingTransactionsAggregateResponse = {
  __typename?: 'ParkingPayoutSessionParkingTransactionsAggregateResponse';
  avg?: Maybe<ParkingPayoutSessionParkingTransactionsAvgAggregate>;
  count?: Maybe<ParkingPayoutSessionParkingTransactionsCountAggregate>;
  groupBy?: Maybe<ParkingPayoutSessionParkingTransactionsAggregateGroupBy>;
  max?: Maybe<ParkingPayoutSessionParkingTransactionsMaxAggregate>;
  min?: Maybe<ParkingPayoutSessionParkingTransactionsMinAggregate>;
  sum?: Maybe<ParkingPayoutSessionParkingTransactionsSumAggregate>;
};

export type ParkingPayoutSessionParkingTransactionsAvgAggregate = {
  __typename?: 'ParkingPayoutSessionParkingTransactionsAvgAggregate';
  amount?: Maybe<Scalars['Float']['output']>;
  customerId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  parkSpotId?: Maybe<Scalars['Float']['output']>;
  payoutAccountId?: Maybe<Scalars['Float']['output']>;
  payoutMethodId?: Maybe<Scalars['Float']['output']>;
  payoutSessionId?: Maybe<Scalars['Float']['output']>;
  payoutSessionMethodId?: Maybe<Scalars['Float']['output']>;
};

export type ParkingPayoutSessionParkingTransactionsConnection = {
  __typename?: 'ParkingPayoutSessionParkingTransactionsConnection';
  /** Array of nodes. */
  nodes: Array<ParkingTransaction>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type ParkingPayoutSessionParkingTransactionsCountAggregate = {
  __typename?: 'ParkingPayoutSessionParkingTransactionsCountAggregate';
  amount?: Maybe<Scalars['Int']['output']>;
  creditType?: Maybe<Scalars['Int']['output']>;
  currency?: Maybe<Scalars['Int']['output']>;
  customerId?: Maybe<Scalars['Int']['output']>;
  debitType?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  parkSpotId?: Maybe<Scalars['Int']['output']>;
  payoutAccountId?: Maybe<Scalars['Int']['output']>;
  payoutMethodId?: Maybe<Scalars['Int']['output']>;
  payoutSessionId?: Maybe<Scalars['Int']['output']>;
  payoutSessionMethodId?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<Scalars['Int']['output']>;
};

export type ParkingPayoutSessionParkingTransactionsMaxAggregate = {
  __typename?: 'ParkingPayoutSessionParkingTransactionsMaxAggregate';
  amount?: Maybe<Scalars['Float']['output']>;
  creditType?: Maybe<ParkingTransactionCreditType>;
  currency?: Maybe<Scalars['String']['output']>;
  customerId?: Maybe<Scalars['ID']['output']>;
  debitType?: Maybe<ParkingTransactionDebitType>;
  id?: Maybe<Scalars['ID']['output']>;
  parkSpotId?: Maybe<Scalars['ID']['output']>;
  payoutAccountId?: Maybe<Scalars['ID']['output']>;
  payoutMethodId?: Maybe<Scalars['ID']['output']>;
  payoutSessionId?: Maybe<Scalars['ID']['output']>;
  payoutSessionMethodId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<TransactionStatus>;
  type?: Maybe<TransactionType>;
};

export type ParkingPayoutSessionParkingTransactionsMinAggregate = {
  __typename?: 'ParkingPayoutSessionParkingTransactionsMinAggregate';
  amount?: Maybe<Scalars['Float']['output']>;
  creditType?: Maybe<ParkingTransactionCreditType>;
  currency?: Maybe<Scalars['String']['output']>;
  customerId?: Maybe<Scalars['ID']['output']>;
  debitType?: Maybe<ParkingTransactionDebitType>;
  id?: Maybe<Scalars['ID']['output']>;
  parkSpotId?: Maybe<Scalars['ID']['output']>;
  payoutAccountId?: Maybe<Scalars['ID']['output']>;
  payoutMethodId?: Maybe<Scalars['ID']['output']>;
  payoutSessionId?: Maybe<Scalars['ID']['output']>;
  payoutSessionMethodId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<TransactionStatus>;
  type?: Maybe<TransactionType>;
};

export type ParkingPayoutSessionParkingTransactionsSumAggregate = {
  __typename?: 'ParkingPayoutSessionParkingTransactionsSumAggregate';
  amount?: Maybe<Scalars['Float']['output']>;
  customerId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  parkSpotId?: Maybe<Scalars['Float']['output']>;
  payoutAccountId?: Maybe<Scalars['Float']['output']>;
  payoutMethodId?: Maybe<Scalars['Float']['output']>;
  payoutSessionId?: Maybe<Scalars['Float']['output']>;
  payoutSessionMethodId?: Maybe<Scalars['Float']['output']>;
};

export type ParkingPayoutSessionPayoutMethodDetail = {
  __typename?: 'ParkingPayoutSessionPayoutMethodDetail';
  id: Scalars['ID']['output'];
  parkingTransactions: ParkingPayoutSessionPayoutMethodDetailParkingTransactionsConnection;
  parkingTransactionsAggregate: Array<ParkingPayoutSessionPayoutMethodDetailParkingTransactionsAggregateResponse>;
  payoutMethod: PayoutMethod;
  status: PayoutSessionStatus;
};


export type ParkingPayoutSessionPayoutMethodDetailParkingTransactionsArgs = {
  filter?: ParkingTransactionFilter;
  paging?: OffsetPaging;
  sorting?: Array<ParkingTransactionSort>;
};


export type ParkingPayoutSessionPayoutMethodDetailParkingTransactionsAggregateArgs = {
  filter?: InputMaybe<ParkingTransactionAggregateFilter>;
};

export type ParkingPayoutSessionPayoutMethodDetailFilter = {
  and?: InputMaybe<Array<ParkingPayoutSessionPayoutMethodDetailFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ParkingPayoutSessionPayoutMethodDetailFilter>>;
};

export type ParkingPayoutSessionPayoutMethodDetailParkingTransactionsAggregateGroupBy = {
  __typename?: 'ParkingPayoutSessionPayoutMethodDetailParkingTransactionsAggregateGroupBy';
  amount?: Maybe<Scalars['Float']['output']>;
  creditType?: Maybe<ParkingTransactionCreditType>;
  currency?: Maybe<Scalars['String']['output']>;
  customerId?: Maybe<Scalars['ID']['output']>;
  debitType?: Maybe<ParkingTransactionDebitType>;
  id?: Maybe<Scalars['ID']['output']>;
  parkSpotId?: Maybe<Scalars['ID']['output']>;
  payoutAccountId?: Maybe<Scalars['ID']['output']>;
  payoutMethodId?: Maybe<Scalars['ID']['output']>;
  payoutSessionId?: Maybe<Scalars['ID']['output']>;
  payoutSessionMethodId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<TransactionStatus>;
  type?: Maybe<TransactionType>;
};

export type ParkingPayoutSessionPayoutMethodDetailParkingTransactionsAggregateResponse = {
  __typename?: 'ParkingPayoutSessionPayoutMethodDetailParkingTransactionsAggregateResponse';
  avg?: Maybe<ParkingPayoutSessionPayoutMethodDetailParkingTransactionsAvgAggregate>;
  count?: Maybe<ParkingPayoutSessionPayoutMethodDetailParkingTransactionsCountAggregate>;
  groupBy?: Maybe<ParkingPayoutSessionPayoutMethodDetailParkingTransactionsAggregateGroupBy>;
  max?: Maybe<ParkingPayoutSessionPayoutMethodDetailParkingTransactionsMaxAggregate>;
  min?: Maybe<ParkingPayoutSessionPayoutMethodDetailParkingTransactionsMinAggregate>;
  sum?: Maybe<ParkingPayoutSessionPayoutMethodDetailParkingTransactionsSumAggregate>;
};

export type ParkingPayoutSessionPayoutMethodDetailParkingTransactionsAvgAggregate = {
  __typename?: 'ParkingPayoutSessionPayoutMethodDetailParkingTransactionsAvgAggregate';
  amount?: Maybe<Scalars['Float']['output']>;
  customerId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  parkSpotId?: Maybe<Scalars['Float']['output']>;
  payoutAccountId?: Maybe<Scalars['Float']['output']>;
  payoutMethodId?: Maybe<Scalars['Float']['output']>;
  payoutSessionId?: Maybe<Scalars['Float']['output']>;
  payoutSessionMethodId?: Maybe<Scalars['Float']['output']>;
};

export type ParkingPayoutSessionPayoutMethodDetailParkingTransactionsConnection = {
  __typename?: 'ParkingPayoutSessionPayoutMethodDetailParkingTransactionsConnection';
  /** Array of nodes. */
  nodes: Array<ParkingTransaction>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type ParkingPayoutSessionPayoutMethodDetailParkingTransactionsCountAggregate = {
  __typename?: 'ParkingPayoutSessionPayoutMethodDetailParkingTransactionsCountAggregate';
  amount?: Maybe<Scalars['Int']['output']>;
  creditType?: Maybe<Scalars['Int']['output']>;
  currency?: Maybe<Scalars['Int']['output']>;
  customerId?: Maybe<Scalars['Int']['output']>;
  debitType?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  parkSpotId?: Maybe<Scalars['Int']['output']>;
  payoutAccountId?: Maybe<Scalars['Int']['output']>;
  payoutMethodId?: Maybe<Scalars['Int']['output']>;
  payoutSessionId?: Maybe<Scalars['Int']['output']>;
  payoutSessionMethodId?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<Scalars['Int']['output']>;
};

export type ParkingPayoutSessionPayoutMethodDetailParkingTransactionsMaxAggregate = {
  __typename?: 'ParkingPayoutSessionPayoutMethodDetailParkingTransactionsMaxAggregate';
  amount?: Maybe<Scalars['Float']['output']>;
  creditType?: Maybe<ParkingTransactionCreditType>;
  currency?: Maybe<Scalars['String']['output']>;
  customerId?: Maybe<Scalars['ID']['output']>;
  debitType?: Maybe<ParkingTransactionDebitType>;
  id?: Maybe<Scalars['ID']['output']>;
  parkSpotId?: Maybe<Scalars['ID']['output']>;
  payoutAccountId?: Maybe<Scalars['ID']['output']>;
  payoutMethodId?: Maybe<Scalars['ID']['output']>;
  payoutSessionId?: Maybe<Scalars['ID']['output']>;
  payoutSessionMethodId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<TransactionStatus>;
  type?: Maybe<TransactionType>;
};

export type ParkingPayoutSessionPayoutMethodDetailParkingTransactionsMinAggregate = {
  __typename?: 'ParkingPayoutSessionPayoutMethodDetailParkingTransactionsMinAggregate';
  amount?: Maybe<Scalars['Float']['output']>;
  creditType?: Maybe<ParkingTransactionCreditType>;
  currency?: Maybe<Scalars['String']['output']>;
  customerId?: Maybe<Scalars['ID']['output']>;
  debitType?: Maybe<ParkingTransactionDebitType>;
  id?: Maybe<Scalars['ID']['output']>;
  parkSpotId?: Maybe<Scalars['ID']['output']>;
  payoutAccountId?: Maybe<Scalars['ID']['output']>;
  payoutMethodId?: Maybe<Scalars['ID']['output']>;
  payoutSessionId?: Maybe<Scalars['ID']['output']>;
  payoutSessionMethodId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<TransactionStatus>;
  type?: Maybe<TransactionType>;
};

export type ParkingPayoutSessionPayoutMethodDetailParkingTransactionsSumAggregate = {
  __typename?: 'ParkingPayoutSessionPayoutMethodDetailParkingTransactionsSumAggregate';
  amount?: Maybe<Scalars['Float']['output']>;
  customerId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  parkSpotId?: Maybe<Scalars['Float']['output']>;
  payoutAccountId?: Maybe<Scalars['Float']['output']>;
  payoutMethodId?: Maybe<Scalars['Float']['output']>;
  payoutSessionId?: Maybe<Scalars['Float']['output']>;
  payoutSessionMethodId?: Maybe<Scalars['Float']['output']>;
};

export type ParkingPayoutSessionPayoutMethodDetailSort = {
  direction: SortDirection;
  field: ParkingPayoutSessionPayoutMethodDetailSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum ParkingPayoutSessionPayoutMethodDetailSortFields {
  Id = 'id'
}

export type ParkingPayoutSessionSort = {
  direction: SortDirection;
  field: ParkingPayoutSessionSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum ParkingPayoutSessionSortFields {
  Currency = 'currency',
  Id = 'id',
  Status = 'status',
  TotalAmount = 'totalAmount'
}

export enum ParkingPermission {
  OrderEdit = 'ORDER_EDIT',
  OrderView = 'ORDER_VIEW',
  ParkingEdit = 'PARKING_EDIT',
  ParkingView = 'PARKING_VIEW'
}

export type ParkingReviewPendingApprovalNotification = {
  __typename?: 'ParkingReviewPendingApprovalNotification';
  appType: AppType;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  parkingReviewPendingApproval: ParkingFeedback;
  readAt?: Maybe<Scalars['DateTime']['output']>;
  type: AdminNotificationType;
};

export type ParkingSupportRequest = {
  __typename?: 'ParkingSupportRequest';
  activities: Array<ParkingSupportRequestActivity>;
  activitiesAggregate: Array<ParkingSupportRequestActivitiesAggregateResponse>;
  assignedToStaffs: Array<Operator>;
  assignedToStaffsAggregate: Array<ParkingSupportRequestAssignedToStaffsAggregateResponse>;
  content?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  parkOrder: ParkOrder;
  parkOrderId: Scalars['ID']['output'];
  requestedByOwner: Scalars['Boolean']['output'];
  status: ComplaintStatus;
  subject: Scalars['String']['output'];
};


export type ParkingSupportRequestActivitiesArgs = {
  filter?: ParkingSupportRequestActivityFilter;
  sorting?: Array<ParkingSupportRequestActivitySort>;
};


export type ParkingSupportRequestActivitiesAggregateArgs = {
  filter?: InputMaybe<ParkingSupportRequestActivityAggregateFilter>;
};


export type ParkingSupportRequestAssignedToStaffsAggregateArgs = {
  filter?: InputMaybe<OperatorAggregateFilter>;
};

export type ParkingSupportRequestActivitiesAggregateGroupBy = {
  __typename?: 'ParkingSupportRequestActivitiesAggregateGroupBy';
  id?: Maybe<Scalars['ID']['output']>;
};

export type ParkingSupportRequestActivitiesAggregateResponse = {
  __typename?: 'ParkingSupportRequestActivitiesAggregateResponse';
  avg?: Maybe<ParkingSupportRequestActivitiesAvgAggregate>;
  count?: Maybe<ParkingSupportRequestActivitiesCountAggregate>;
  groupBy?: Maybe<ParkingSupportRequestActivitiesAggregateGroupBy>;
  max?: Maybe<ParkingSupportRequestActivitiesMaxAggregate>;
  min?: Maybe<ParkingSupportRequestActivitiesMinAggregate>;
  sum?: Maybe<ParkingSupportRequestActivitiesSumAggregate>;
};

export type ParkingSupportRequestActivitiesAvgAggregate = {
  __typename?: 'ParkingSupportRequestActivitiesAvgAggregate';
  id?: Maybe<Scalars['Float']['output']>;
};

export type ParkingSupportRequestActivitiesCountAggregate = {
  __typename?: 'ParkingSupportRequestActivitiesCountAggregate';
  id?: Maybe<Scalars['Int']['output']>;
};

export type ParkingSupportRequestActivitiesMaxAggregate = {
  __typename?: 'ParkingSupportRequestActivitiesMaxAggregate';
  id?: Maybe<Scalars['ID']['output']>;
};

export type ParkingSupportRequestActivitiesMinAggregate = {
  __typename?: 'ParkingSupportRequestActivitiesMinAggregate';
  id?: Maybe<Scalars['ID']['output']>;
};

export type ParkingSupportRequestActivitiesSumAggregate = {
  __typename?: 'ParkingSupportRequestActivitiesSumAggregate';
  id?: Maybe<Scalars['Float']['output']>;
};

export type ParkingSupportRequestActivity = {
  __typename?: 'ParkingSupportRequestActivity';
  actor?: Maybe<Operator>;
  assignedToStaffs: Array<Operator>;
  comment?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  statusFrom?: Maybe<ComplaintStatus>;
  statusTo?: Maybe<ComplaintStatus>;
  type: ComplaintActivityType;
  unassignedFromStaffs: Array<Operator>;
};

export type ParkingSupportRequestActivityAggregateFilter = {
  and?: InputMaybe<Array<ParkingSupportRequestActivityAggregateFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ParkingSupportRequestActivityAggregateFilter>>;
};

export type ParkingSupportRequestActivityFilter = {
  and?: InputMaybe<Array<ParkingSupportRequestActivityFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ParkingSupportRequestActivityFilter>>;
};

export type ParkingSupportRequestActivitySort = {
  direction: SortDirection;
  field: ParkingSupportRequestActivitySortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum ParkingSupportRequestActivitySortFields {
  Id = 'id'
}

export type ParkingSupportRequestAggregateFilter = {
  and?: InputMaybe<Array<ParkingSupportRequestAggregateFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ParkingSupportRequestAggregateFilter>>;
  parkOrder?: InputMaybe<ParkingSupportRequestAggregateFilterParkOrderAggregateFilter>;
  parkOrderId?: InputMaybe<IdFilterComparison>;
  requestedByOwner?: InputMaybe<BooleanFieldComparison>;
  status?: InputMaybe<ComplaintStatusFilterComparison>;
};

export type ParkingSupportRequestAggregateFilterParkOrderAggregateFilter = {
  and?: InputMaybe<Array<ParkingSupportRequestAggregateFilterParkOrderAggregateFilter>>;
  carOwnerId?: InputMaybe<IdFilterComparison>;
  carSize?: InputMaybe<ParkSpotCarSizeFilterComparison>;
  currency?: InputMaybe<StringFieldComparison>;
  enterTime?: InputMaybe<DateFieldComparison>;
  exitTime?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ParkingSupportRequestAggregateFilterParkOrderAggregateFilter>>;
  parkSpotId?: InputMaybe<IdFilterComparison>;
  paymentMethod?: InputMaybe<PaymentModeFilterComparison>;
  price?: InputMaybe<FloatFieldComparison>;
  status?: InputMaybe<ParkOrderStatusFilterComparison>;
  vehicleType?: InputMaybe<ParkSpotVehicleTypeFilterComparison>;
};

export type ParkingSupportRequestAggregateGroupBy = {
  __typename?: 'ParkingSupportRequestAggregateGroupBy';
  id?: Maybe<Scalars['ID']['output']>;
  parkOrderId?: Maybe<Scalars['ID']['output']>;
  requestedByOwner?: Maybe<Scalars['Boolean']['output']>;
  status?: Maybe<ComplaintStatus>;
};

export type ParkingSupportRequestAggregateResponse = {
  __typename?: 'ParkingSupportRequestAggregateResponse';
  avg?: Maybe<ParkingSupportRequestAvgAggregate>;
  count?: Maybe<ParkingSupportRequestCountAggregate>;
  groupBy?: Maybe<ParkingSupportRequestAggregateGroupBy>;
  max?: Maybe<ParkingSupportRequestMaxAggregate>;
  min?: Maybe<ParkingSupportRequestMinAggregate>;
  sum?: Maybe<ParkingSupportRequestSumAggregate>;
};

export type ParkingSupportRequestAssignedToStaffsAggregateGroupBy = {
  __typename?: 'ParkingSupportRequestAssignedToStaffsAggregateGroupBy';
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  isBlocked?: Maybe<Scalars['Boolean']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  mobileNumber?: Maybe<Scalars['String']['output']>;
  roleId?: Maybe<Scalars['ID']['output']>;
  userName?: Maybe<Scalars['String']['output']>;
};

export type ParkingSupportRequestAssignedToStaffsAggregateResponse = {
  __typename?: 'ParkingSupportRequestAssignedToStaffsAggregateResponse';
  avg?: Maybe<ParkingSupportRequestAssignedToStaffsAvgAggregate>;
  count?: Maybe<ParkingSupportRequestAssignedToStaffsCountAggregate>;
  groupBy?: Maybe<ParkingSupportRequestAssignedToStaffsAggregateGroupBy>;
  max?: Maybe<ParkingSupportRequestAssignedToStaffsMaxAggregate>;
  min?: Maybe<ParkingSupportRequestAssignedToStaffsMinAggregate>;
  sum?: Maybe<ParkingSupportRequestAssignedToStaffsSumAggregate>;
};

export type ParkingSupportRequestAssignedToStaffsAvgAggregate = {
  __typename?: 'ParkingSupportRequestAssignedToStaffsAvgAggregate';
  id?: Maybe<Scalars['Float']['output']>;
  roleId?: Maybe<Scalars['Float']['output']>;
};

export type ParkingSupportRequestAssignedToStaffsCountAggregate = {
  __typename?: 'ParkingSupportRequestAssignedToStaffsCountAggregate';
  email?: Maybe<Scalars['Int']['output']>;
  firstName?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  isBlocked?: Maybe<Scalars['Int']['output']>;
  lastName?: Maybe<Scalars['Int']['output']>;
  mobileNumber?: Maybe<Scalars['Int']['output']>;
  roleId?: Maybe<Scalars['Int']['output']>;
  userName?: Maybe<Scalars['Int']['output']>;
};

export type ParkingSupportRequestAssignedToStaffsMaxAggregate = {
  __typename?: 'ParkingSupportRequestAssignedToStaffsMaxAggregate';
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  mobileNumber?: Maybe<Scalars['String']['output']>;
  roleId?: Maybe<Scalars['ID']['output']>;
  userName?: Maybe<Scalars['String']['output']>;
};

export type ParkingSupportRequestAssignedToStaffsMinAggregate = {
  __typename?: 'ParkingSupportRequestAssignedToStaffsMinAggregate';
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  mobileNumber?: Maybe<Scalars['String']['output']>;
  roleId?: Maybe<Scalars['ID']['output']>;
  userName?: Maybe<Scalars['String']['output']>;
};

export type ParkingSupportRequestAssignedToStaffsSumAggregate = {
  __typename?: 'ParkingSupportRequestAssignedToStaffsSumAggregate';
  id?: Maybe<Scalars['Float']['output']>;
  roleId?: Maybe<Scalars['Float']['output']>;
};

export type ParkingSupportRequestAvgAggregate = {
  __typename?: 'ParkingSupportRequestAvgAggregate';
  id?: Maybe<Scalars['Float']['output']>;
  parkOrderId?: Maybe<Scalars['Float']['output']>;
};

export type ParkingSupportRequestConnection = {
  __typename?: 'ParkingSupportRequestConnection';
  /** Array of nodes. */
  nodes: Array<ParkingSupportRequest>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type ParkingSupportRequestCountAggregate = {
  __typename?: 'ParkingSupportRequestCountAggregate';
  id?: Maybe<Scalars['Int']['output']>;
  parkOrderId?: Maybe<Scalars['Int']['output']>;
  requestedByOwner?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
};

export type ParkingSupportRequestFilter = {
  and?: InputMaybe<Array<ParkingSupportRequestFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ParkingSupportRequestFilter>>;
  parkOrder?: InputMaybe<ParkingSupportRequestFilterParkOrderFilter>;
  parkOrderId?: InputMaybe<IdFilterComparison>;
  requestedByOwner?: InputMaybe<BooleanFieldComparison>;
  status?: InputMaybe<ComplaintStatusFilterComparison>;
};

export type ParkingSupportRequestFilterParkOrderFilter = {
  and?: InputMaybe<Array<ParkingSupportRequestFilterParkOrderFilter>>;
  carOwnerId?: InputMaybe<IdFilterComparison>;
  carSize?: InputMaybe<ParkSpotCarSizeFilterComparison>;
  currency?: InputMaybe<StringFieldComparison>;
  enterTime?: InputMaybe<DateFieldComparison>;
  exitTime?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ParkingSupportRequestFilterParkOrderFilter>>;
  parkSpotId?: InputMaybe<IdFilterComparison>;
  paymentMethod?: InputMaybe<PaymentModeFilterComparison>;
  price?: InputMaybe<FloatFieldComparison>;
  status?: InputMaybe<ParkOrderStatusFilterComparison>;
  vehicleType?: InputMaybe<ParkSpotVehicleTypeFilterComparison>;
};

export type ParkingSupportRequestMaxAggregate = {
  __typename?: 'ParkingSupportRequestMaxAggregate';
  id?: Maybe<Scalars['ID']['output']>;
  parkOrderId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<ComplaintStatus>;
};

export type ParkingSupportRequestMinAggregate = {
  __typename?: 'ParkingSupportRequestMinAggregate';
  id?: Maybe<Scalars['ID']['output']>;
  parkOrderId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<ComplaintStatus>;
};

export type ParkingSupportRequestNotification = {
  __typename?: 'ParkingSupportRequestNotification';
  appType: AppType;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  parkingSupportRequest: ParkingSupportRequest;
  readAt?: Maybe<Scalars['DateTime']['output']>;
  type: AdminNotificationType;
};

export type ParkingSupportRequestSort = {
  direction: SortDirection;
  field: ParkingSupportRequestSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum ParkingSupportRequestSortFields {
  Id = 'id',
  ParkOrderId = 'parkOrderId',
  RequestedByOwner = 'requestedByOwner',
  Status = 'status'
}

export type ParkingSupportRequestSumAggregate = {
  __typename?: 'ParkingSupportRequestSumAggregate';
  id?: Maybe<Scalars['Float']['output']>;
  parkOrderId?: Maybe<Scalars['Float']['output']>;
};

export type ParkingTransaction = {
  __typename?: 'ParkingTransaction';
  amount: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  creditType?: Maybe<ParkingTransactionCreditType>;
  currency: Scalars['String']['output'];
  customer: Rider;
  customerId: Scalars['ID']['output'];
  debitType?: Maybe<ParkingTransactionDebitType>;
  description?: Maybe<Scalars['String']['output']>;
  documentNumber?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  parkSpotId?: Maybe<Scalars['ID']['output']>;
  paymentGateway?: Maybe<PaymentGateway>;
  payoutAccount?: Maybe<PayoutAccount>;
  payoutAccountId?: Maybe<Scalars['ID']['output']>;
  payoutMethod?: Maybe<PayoutMethod>;
  payoutMethodId?: Maybe<Scalars['ID']['output']>;
  payoutSessionId?: Maybe<Scalars['ID']['output']>;
  payoutSessionMethodId?: Maybe<Scalars['ID']['output']>;
  savedPaymentMethod?: Maybe<SavedPaymentMethod>;
  staff?: Maybe<Operator>;
  status: TransactionStatus;
  transactionDate: Scalars['DateTime']['output'];
  type: TransactionType;
};

export type ParkingTransactionAggregateFilter = {
  amount?: InputMaybe<NumberFieldComparison>;
  and?: InputMaybe<Array<ParkingTransactionAggregateFilter>>;
  creditType?: InputMaybe<ParkingTransactionCreditTypeFilterComparison>;
  currency?: InputMaybe<StringFieldComparison>;
  customerId?: InputMaybe<IdFilterComparison>;
  debitType?: InputMaybe<ParkingTransactionDebitTypeFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ParkingTransactionAggregateFilter>>;
  parkSpotId?: InputMaybe<IdFilterComparison>;
  payoutAccountId?: InputMaybe<IdFilterComparison>;
  payoutMethod?: InputMaybe<ParkingTransactionAggregateFilterPayoutMethodAggregateFilter>;
  payoutMethodId?: InputMaybe<IdFilterComparison>;
  payoutSessionId?: InputMaybe<IdFilterComparison>;
  payoutSessionMethodId?: InputMaybe<IdFilterComparison>;
  status?: InputMaybe<TransactionStatusFilterComparison>;
  type?: InputMaybe<TransactionTypeFilterComparison>;
};

export type ParkingTransactionAggregateFilterPayoutMethodAggregateFilter = {
  and?: InputMaybe<Array<ParkingTransactionAggregateFilterPayoutMethodAggregateFilter>>;
  currency?: InputMaybe<StringFieldComparison>;
  enabled?: InputMaybe<BooleanFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<ParkingTransactionAggregateFilterPayoutMethodAggregateFilter>>;
  type?: InputMaybe<PayoutMethodTypeFilterComparison>;
};

export type ParkingTransactionConnection = {
  __typename?: 'ParkingTransactionConnection';
  /** Array of nodes. */
  nodes: Array<ParkingTransaction>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export enum ParkingTransactionCreditType {
  BankTransfer = 'BankTransfer',
  Correction = 'Correction',
  GiftCardTopUp = 'GiftCardTopUp',
  ParkingRentalIncome = 'ParkingRentalIncome',
  WalletTopUp = 'WalletTopUp'
}

export type ParkingTransactionCreditTypeFilterComparison = {
  eq?: InputMaybe<ParkingTransactionCreditType>;
  gt?: InputMaybe<ParkingTransactionCreditType>;
  gte?: InputMaybe<ParkingTransactionCreditType>;
  iLike?: InputMaybe<ParkingTransactionCreditType>;
  in?: InputMaybe<Array<ParkingTransactionCreditType>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<ParkingTransactionCreditType>;
  lt?: InputMaybe<ParkingTransactionCreditType>;
  lte?: InputMaybe<ParkingTransactionCreditType>;
  neq?: InputMaybe<ParkingTransactionCreditType>;
  notILike?: InputMaybe<ParkingTransactionCreditType>;
  notIn?: InputMaybe<Array<ParkingTransactionCreditType>>;
  notLike?: InputMaybe<ParkingTransactionCreditType>;
};

export enum ParkingTransactionDebitType {
  CancelFee = 'CancelFee',
  Commission = 'Commission',
  Correction = 'Correction',
  ParkingFee = 'ParkingFee',
  Payout = 'Payout',
  Refund = 'Refund'
}

export type ParkingTransactionDebitTypeFilterComparison = {
  eq?: InputMaybe<ParkingTransactionDebitType>;
  gt?: InputMaybe<ParkingTransactionDebitType>;
  gte?: InputMaybe<ParkingTransactionDebitType>;
  iLike?: InputMaybe<ParkingTransactionDebitType>;
  in?: InputMaybe<Array<ParkingTransactionDebitType>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<ParkingTransactionDebitType>;
  lt?: InputMaybe<ParkingTransactionDebitType>;
  lte?: InputMaybe<ParkingTransactionDebitType>;
  neq?: InputMaybe<ParkingTransactionDebitType>;
  notILike?: InputMaybe<ParkingTransactionDebitType>;
  notIn?: InputMaybe<Array<ParkingTransactionDebitType>>;
  notLike?: InputMaybe<ParkingTransactionDebitType>;
};

export type ParkingTransactionFilter = {
  amount?: InputMaybe<NumberFieldComparison>;
  and?: InputMaybe<Array<ParkingTransactionFilter>>;
  creditType?: InputMaybe<ParkingTransactionCreditTypeFilterComparison>;
  currency?: InputMaybe<StringFieldComparison>;
  customerId?: InputMaybe<IdFilterComparison>;
  debitType?: InputMaybe<ParkingTransactionDebitTypeFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ParkingTransactionFilter>>;
  parkSpotId?: InputMaybe<IdFilterComparison>;
  payoutAccountId?: InputMaybe<IdFilterComparison>;
  payoutMethod?: InputMaybe<ParkingTransactionFilterPayoutMethodFilter>;
  payoutMethodId?: InputMaybe<IdFilterComparison>;
  payoutSessionId?: InputMaybe<IdFilterComparison>;
  payoutSessionMethodId?: InputMaybe<IdFilterComparison>;
  status?: InputMaybe<TransactionStatusFilterComparison>;
  type?: InputMaybe<TransactionTypeFilterComparison>;
};

export type ParkingTransactionFilterPayoutMethodFilter = {
  and?: InputMaybe<Array<ParkingTransactionFilterPayoutMethodFilter>>;
  currency?: InputMaybe<StringFieldComparison>;
  enabled?: InputMaybe<BooleanFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<ParkingTransactionFilterPayoutMethodFilter>>;
  type?: InputMaybe<PayoutMethodTypeFilterComparison>;
};

export type ParkingTransactionSort = {
  direction: SortDirection;
  field: ParkingTransactionSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum ParkingTransactionSortFields {
  Amount = 'amount',
  CreditType = 'creditType',
  Currency = 'currency',
  CustomerId = 'customerId',
  DebitType = 'debitType',
  Id = 'id',
  ParkSpotId = 'parkSpotId',
  PayoutAccountId = 'payoutAccountId',
  PayoutMethodId = 'payoutMethodId',
  PayoutSessionId = 'payoutSessionId',
  PayoutSessionMethodId = 'payoutSessionMethodId',
  Status = 'status',
  Type = 'type'
}

export type ParkingWallet = {
  __typename?: 'ParkingWallet';
  balance: Scalars['Float']['output'];
  currency: Scalars['String']['output'];
  customer: Rider;
  customerId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
};

export type ParkingWalletAggregateFilter = {
  and?: InputMaybe<Array<ParkingWalletAggregateFilter>>;
  balance?: InputMaybe<FloatFieldComparison>;
  currency?: InputMaybe<StringFieldComparison>;
  customerId?: InputMaybe<IdFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ParkingWalletAggregateFilter>>;
};

export type ParkingWalletAggregateGroupBy = {
  __typename?: 'ParkingWalletAggregateGroupBy';
  balance?: Maybe<Scalars['Float']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  customerId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type ParkingWalletAggregateResponse = {
  __typename?: 'ParkingWalletAggregateResponse';
  avg?: Maybe<ParkingWalletAvgAggregate>;
  count?: Maybe<ParkingWalletCountAggregate>;
  groupBy?: Maybe<ParkingWalletAggregateGroupBy>;
  max?: Maybe<ParkingWalletMaxAggregate>;
  min?: Maybe<ParkingWalletMinAggregate>;
  sum?: Maybe<ParkingWalletSumAggregate>;
};

export type ParkingWalletAvgAggregate = {
  __typename?: 'ParkingWalletAvgAggregate';
  balance?: Maybe<Scalars['Float']['output']>;
  customerId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

export type ParkingWalletConnection = {
  __typename?: 'ParkingWalletConnection';
  /** Array of nodes. */
  nodes: Array<ParkingWallet>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type ParkingWalletCountAggregate = {
  __typename?: 'ParkingWalletCountAggregate';
  balance?: Maybe<Scalars['Int']['output']>;
  currency?: Maybe<Scalars['Int']['output']>;
  customerId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
};

export type ParkingWalletFilter = {
  and?: InputMaybe<Array<ParkingWalletFilter>>;
  balance?: InputMaybe<FloatFieldComparison>;
  currency?: InputMaybe<StringFieldComparison>;
  customerId?: InputMaybe<IdFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ParkingWalletFilter>>;
};

export type ParkingWalletMaxAggregate = {
  __typename?: 'ParkingWalletMaxAggregate';
  balance?: Maybe<Scalars['Float']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  customerId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type ParkingWalletMinAggregate = {
  __typename?: 'ParkingWalletMinAggregate';
  balance?: Maybe<Scalars['Float']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  customerId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type ParkingWalletSort = {
  direction: SortDirection;
  field: ParkingWalletSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum ParkingWalletSortFields {
  Balance = 'balance',
  Currency = 'currency',
  CustomerId = 'customerId',
  Id = 'id'
}

export type ParkingWalletSumAggregate = {
  __typename?: 'ParkingWalletSumAggregate';
  balance?: Maybe<Scalars['Float']['output']>;
  customerId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

export type PaymentGateway = {
  __typename?: 'PaymentGateway';
  enabled: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  media?: Maybe<Media>;
  mediaId?: Maybe<Scalars['ID']['output']>;
  merchantId?: Maybe<Scalars['String']['output']>;
  privateKey: Scalars['String']['output'];
  publicKey?: Maybe<Scalars['String']['output']>;
  riderTransactions: PaymentGatewayRiderTransactionsConnection;
  riderTransactionsAggregate: Array<PaymentGatewayRiderTransactionsAggregateResponse>;
  saltKey?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  type: PaymentGatewayType;
};


export type PaymentGatewayRiderTransactionsArgs = {
  filter?: RiderTransactionFilter;
  paging?: OffsetPaging;
  sorting?: Array<RiderTransactionSort>;
};


export type PaymentGatewayRiderTransactionsAggregateArgs = {
  filter?: InputMaybe<RiderTransactionAggregateFilter>;
};

export type PaymentGatewayConnection = {
  __typename?: 'PaymentGatewayConnection';
  /** Array of nodes. */
  nodes: Array<PaymentGateway>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type PaymentGatewayDeleteResponse = {
  __typename?: 'PaymentGatewayDeleteResponse';
  enabled?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  mediaId?: Maybe<Scalars['ID']['output']>;
  merchantId?: Maybe<Scalars['String']['output']>;
  privateKey?: Maybe<Scalars['String']['output']>;
  publicKey?: Maybe<Scalars['String']['output']>;
  saltKey?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  type?: Maybe<PaymentGatewayType>;
};

export type PaymentGatewayFilter = {
  and?: InputMaybe<Array<PaymentGatewayFilter>>;
  enabled?: InputMaybe<BooleanFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<PaymentGatewayFilter>>;
  title?: InputMaybe<StringFieldComparison>;
  type?: InputMaybe<PaymentGatewayTypeFilterComparison>;
};

export type PaymentGatewayRiderTransactionsAggregateGroupBy = {
  __typename?: 'PaymentGatewayRiderTransactionsAggregateGroupBy';
  action?: Maybe<TransactionAction>;
  amount?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  deductType?: Maybe<RiderDeductTransactionType>;
  id?: Maybe<Scalars['ID']['output']>;
  operatorId?: Maybe<Scalars['ID']['output']>;
  parkOrderCustomerId?: Maybe<Scalars['ID']['output']>;
  parkOrderParkOwnerId?: Maybe<Scalars['ID']['output']>;
  paymentGatewayId?: Maybe<Scalars['ID']['output']>;
  rechargeType?: Maybe<RiderRechargeTransactionType>;
  requestId?: Maybe<Scalars['ID']['output']>;
  riderId?: Maybe<Scalars['ID']['output']>;
  savedPaymentMethodId?: Maybe<Scalars['ID']['output']>;
  shopOrderId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<TransactionStatus>;
};

export type PaymentGatewayRiderTransactionsAggregateResponse = {
  __typename?: 'PaymentGatewayRiderTransactionsAggregateResponse';
  avg?: Maybe<PaymentGatewayRiderTransactionsAvgAggregate>;
  count?: Maybe<PaymentGatewayRiderTransactionsCountAggregate>;
  groupBy?: Maybe<PaymentGatewayRiderTransactionsAggregateGroupBy>;
  max?: Maybe<PaymentGatewayRiderTransactionsMaxAggregate>;
  min?: Maybe<PaymentGatewayRiderTransactionsMinAggregate>;
  sum?: Maybe<PaymentGatewayRiderTransactionsSumAggregate>;
};

export type PaymentGatewayRiderTransactionsAvgAggregate = {
  __typename?: 'PaymentGatewayRiderTransactionsAvgAggregate';
  amount?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  operatorId?: Maybe<Scalars['Float']['output']>;
  parkOrderCustomerId?: Maybe<Scalars['Float']['output']>;
  parkOrderParkOwnerId?: Maybe<Scalars['Float']['output']>;
  paymentGatewayId?: Maybe<Scalars['Float']['output']>;
  requestId?: Maybe<Scalars['Float']['output']>;
  riderId?: Maybe<Scalars['Float']['output']>;
  savedPaymentMethodId?: Maybe<Scalars['Float']['output']>;
  shopOrderId?: Maybe<Scalars['Float']['output']>;
};

export type PaymentGatewayRiderTransactionsConnection = {
  __typename?: 'PaymentGatewayRiderTransactionsConnection';
  /** Array of nodes. */
  nodes: Array<RiderTransaction>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type PaymentGatewayRiderTransactionsCountAggregate = {
  __typename?: 'PaymentGatewayRiderTransactionsCountAggregate';
  action?: Maybe<Scalars['Int']['output']>;
  amount?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['Int']['output']>;
  currency?: Maybe<Scalars['Int']['output']>;
  deductType?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  operatorId?: Maybe<Scalars['Int']['output']>;
  parkOrderCustomerId?: Maybe<Scalars['Int']['output']>;
  parkOrderParkOwnerId?: Maybe<Scalars['Int']['output']>;
  paymentGatewayId?: Maybe<Scalars['Int']['output']>;
  rechargeType?: Maybe<Scalars['Int']['output']>;
  requestId?: Maybe<Scalars['Int']['output']>;
  riderId?: Maybe<Scalars['Int']['output']>;
  savedPaymentMethodId?: Maybe<Scalars['Int']['output']>;
  shopOrderId?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
};

export type PaymentGatewayRiderTransactionsMaxAggregate = {
  __typename?: 'PaymentGatewayRiderTransactionsMaxAggregate';
  action?: Maybe<TransactionAction>;
  amount?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  deductType?: Maybe<RiderDeductTransactionType>;
  id?: Maybe<Scalars['ID']['output']>;
  operatorId?: Maybe<Scalars['ID']['output']>;
  parkOrderCustomerId?: Maybe<Scalars['ID']['output']>;
  parkOrderParkOwnerId?: Maybe<Scalars['ID']['output']>;
  paymentGatewayId?: Maybe<Scalars['ID']['output']>;
  rechargeType?: Maybe<RiderRechargeTransactionType>;
  requestId?: Maybe<Scalars['ID']['output']>;
  riderId?: Maybe<Scalars['ID']['output']>;
  savedPaymentMethodId?: Maybe<Scalars['ID']['output']>;
  shopOrderId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<TransactionStatus>;
};

export type PaymentGatewayRiderTransactionsMinAggregate = {
  __typename?: 'PaymentGatewayRiderTransactionsMinAggregate';
  action?: Maybe<TransactionAction>;
  amount?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  deductType?: Maybe<RiderDeductTransactionType>;
  id?: Maybe<Scalars['ID']['output']>;
  operatorId?: Maybe<Scalars['ID']['output']>;
  parkOrderCustomerId?: Maybe<Scalars['ID']['output']>;
  parkOrderParkOwnerId?: Maybe<Scalars['ID']['output']>;
  paymentGatewayId?: Maybe<Scalars['ID']['output']>;
  rechargeType?: Maybe<RiderRechargeTransactionType>;
  requestId?: Maybe<Scalars['ID']['output']>;
  riderId?: Maybe<Scalars['ID']['output']>;
  savedPaymentMethodId?: Maybe<Scalars['ID']['output']>;
  shopOrderId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<TransactionStatus>;
};

export type PaymentGatewayRiderTransactionsSumAggregate = {
  __typename?: 'PaymentGatewayRiderTransactionsSumAggregate';
  amount?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  operatorId?: Maybe<Scalars['Float']['output']>;
  parkOrderCustomerId?: Maybe<Scalars['Float']['output']>;
  parkOrderParkOwnerId?: Maybe<Scalars['Float']['output']>;
  paymentGatewayId?: Maybe<Scalars['Float']['output']>;
  requestId?: Maybe<Scalars['Float']['output']>;
  riderId?: Maybe<Scalars['Float']['output']>;
  savedPaymentMethodId?: Maybe<Scalars['Float']['output']>;
  shopOrderId?: Maybe<Scalars['Float']['output']>;
};

export type PaymentGatewaySort = {
  direction: SortDirection;
  field: PaymentGatewaySortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum PaymentGatewaySortFields {
  Enabled = 'enabled',
  Id = 'id',
  Title = 'title',
  Type = 'type'
}

export enum PaymentGatewayType {
  AmazonPaymentServices = 'AmazonPaymentServices',
  BinancePay = 'BinancePay',
  BrainTree = 'BrainTree',
  CustomLink = 'CustomLink',
  Flutterwave = 'Flutterwave',
  Instamojo = 'Instamojo',
  Mips = 'MIPS',
  MercadoPago = 'MercadoPago',
  MyFatoorah = 'MyFatoorah',
  MyTMoney = 'MyTMoney',
  OpenPix = 'OpenPix',
  PayGate = 'PayGate',
  PayPal = 'PayPal',
  PayTr = 'PayTR',
  PayU = 'PayU',
  Paystack = 'Paystack',
  Paytm = 'Paytm',
  Razorpay = 'Razorpay',
  SberBank = 'SberBank',
  Stripe = 'Stripe',
  WayForPay = 'WayForPay'
}

export type PaymentGatewayTypeFilterComparison = {
  eq?: InputMaybe<PaymentGatewayType>;
  gt?: InputMaybe<PaymentGatewayType>;
  gte?: InputMaybe<PaymentGatewayType>;
  iLike?: InputMaybe<PaymentGatewayType>;
  in?: InputMaybe<Array<PaymentGatewayType>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<PaymentGatewayType>;
  lt?: InputMaybe<PaymentGatewayType>;
  lte?: InputMaybe<PaymentGatewayType>;
  neq?: InputMaybe<PaymentGatewayType>;
  notILike?: InputMaybe<PaymentGatewayType>;
  notIn?: InputMaybe<Array<PaymentGatewayType>>;
  notLike?: InputMaybe<PaymentGatewayType>;
};

/** The means of payment for an order. */
export enum PaymentMode {
  Cash = 'Cash',
  PaymentGateway = 'PaymentGateway',
  SavedPaymentMethod = 'SavedPaymentMethod',
  Wallet = 'Wallet'
}

export type PaymentModeFilterComparison = {
  eq?: InputMaybe<PaymentMode>;
  gt?: InputMaybe<PaymentMode>;
  gte?: InputMaybe<PaymentMode>;
  iLike?: InputMaybe<PaymentMode>;
  in?: InputMaybe<Array<PaymentMode>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<PaymentMode>;
  lt?: InputMaybe<PaymentMode>;
  lte?: InputMaybe<PaymentMode>;
  neq?: InputMaybe<PaymentMode>;
  notILike?: InputMaybe<PaymentMode>;
  notIn?: InputMaybe<Array<PaymentMode>>;
  notLike?: InputMaybe<PaymentMode>;
};

export type PayoutAccount = {
  __typename?: 'PayoutAccount';
  accountHolderAddress?: Maybe<Scalars['String']['output']>;
  accountHolderCity?: Maybe<Scalars['String']['output']>;
  accountHolderCountry?: Maybe<Scalars['String']['output']>;
  accountHolderDateOfBirth?: Maybe<Scalars['DateTime']['output']>;
  accountHolderName?: Maybe<Scalars['String']['output']>;
  accountHolderPhone?: Maybe<Scalars['String']['output']>;
  accountHolderState?: Maybe<Scalars['String']['output']>;
  accountHolderZip?: Maybe<Scalars['String']['output']>;
  accountNumber?: Maybe<Scalars['String']['output']>;
  bankName?: Maybe<Scalars['String']['output']>;
  branchName?: Maybe<Scalars['String']['output']>;
  currency: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isDefault: Scalars['Boolean']['output'];
  isVerified: Scalars['Boolean']['output'];
  last4: Scalars['String']['output'];
  name: Scalars['String']['output'];
  payoutMethod: PayoutMethod;
  payoutMethodId: Scalars['ID']['output'];
  routingNumber?: Maybe<Scalars['String']['output']>;
  type: SavedPaymentMethodType;
};

export type PayoutAccountAggregateFilter = {
  and?: InputMaybe<Array<PayoutAccountAggregateFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  isDefault?: InputMaybe<BooleanFieldComparison>;
  or?: InputMaybe<Array<PayoutAccountAggregateFilter>>;
};

export type PayoutAccountEdge = {
  __typename?: 'PayoutAccountEdge';
  /** Cursor for this node. */
  cursor: Scalars['ConnectionCursor']['output'];
  /** The node containing the PayoutAccount */
  node: PayoutAccount;
};

export type PayoutAccountFilter = {
  and?: InputMaybe<Array<PayoutAccountFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  isDefault?: InputMaybe<BooleanFieldComparison>;
  or?: InputMaybe<Array<PayoutAccountFilter>>;
};

export type PayoutAccountSort = {
  direction: SortDirection;
  field: PayoutAccountSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum PayoutAccountSortFields {
  Id = 'id',
  IsDefault = 'isDefault'
}

export type PayoutMethod = {
  __typename?: 'PayoutMethod';
  balance?: Maybe<Scalars['Float']['output']>;
  currency: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  driverTransactions: DriverTransaction;
  enabled: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  media?: Maybe<Media>;
  mediaId: Scalars['ID']['output'];
  merchantId?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  privateKey?: Maybe<Scalars['String']['output']>;
  publicKey?: Maybe<Scalars['String']['output']>;
  saltKey?: Maybe<Scalars['String']['output']>;
  type: PayoutMethodType;
};

export type PayoutMethodConnection = {
  __typename?: 'PayoutMethodConnection';
  /** Array of nodes. */
  nodes: Array<PayoutMethod>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type PayoutMethodDeleteResponse = {
  __typename?: 'PayoutMethodDeleteResponse';
  balance?: Maybe<Scalars['Float']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  enabled?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  mediaId?: Maybe<Scalars['ID']['output']>;
  merchantId?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  privateKey?: Maybe<Scalars['String']['output']>;
  publicKey?: Maybe<Scalars['String']['output']>;
  saltKey?: Maybe<Scalars['String']['output']>;
  type?: Maybe<PayoutMethodType>;
};

export type PayoutMethodFilter = {
  and?: InputMaybe<Array<PayoutMethodFilter>>;
  currency?: InputMaybe<StringFieldComparison>;
  driverTransactions?: InputMaybe<PayoutMethodFilterDriverTransactionFilter>;
  enabled?: InputMaybe<BooleanFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<PayoutMethodFilter>>;
  type?: InputMaybe<PayoutMethodTypeFilterComparison>;
};

export type PayoutMethodFilterDriverTransactionFilter = {
  action?: InputMaybe<TransactionActionFilterComparison>;
  amount?: InputMaybe<NumberFieldComparison>;
  and?: InputMaybe<Array<PayoutMethodFilterDriverTransactionFilter>>;
  createdAt?: InputMaybe<DateFieldComparison>;
  currency?: InputMaybe<StringFieldComparison>;
  driverId?: InputMaybe<IdFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<PayoutMethodFilterDriverTransactionFilter>>;
  paymentGatewayId?: InputMaybe<IdFilterComparison>;
  payoutAccountId?: InputMaybe<IdFilterComparison>;
  payoutMethodId?: InputMaybe<IdFilterComparison>;
  payoutSessionId?: InputMaybe<IdFilterComparison>;
  payoutSessionMethodId?: InputMaybe<IdFilterComparison>;
  status?: InputMaybe<TransactionStatusFilterComparison>;
};

export type PayoutMethodSort = {
  direction: SortDirection;
  field: PayoutMethodSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum PayoutMethodSortFields {
  Currency = 'currency',
  Enabled = 'enabled',
  Id = 'id',
  Name = 'name',
  Type = 'type'
}

export type PayoutMethodStats = {
  __typename?: 'PayoutMethodStats';
  payoutMethod?: Maybe<PayoutMethod>;
  totalCount: Scalars['Int']['output'];
};

/** The type of payout method */
export enum PayoutMethodType {
  BankTransfer = 'BankTransfer',
  Stripe = 'Stripe'
}

export type PayoutMethodTypeFilterComparison = {
  eq?: InputMaybe<PayoutMethodType>;
  gt?: InputMaybe<PayoutMethodType>;
  gte?: InputMaybe<PayoutMethodType>;
  iLike?: InputMaybe<PayoutMethodType>;
  in?: InputMaybe<Array<PayoutMethodType>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<PayoutMethodType>;
  lt?: InputMaybe<PayoutMethodType>;
  lte?: InputMaybe<PayoutMethodType>;
  neq?: InputMaybe<PayoutMethodType>;
  notILike?: InputMaybe<PayoutMethodType>;
  notIn?: InputMaybe<Array<PayoutMethodType>>;
  notLike?: InputMaybe<PayoutMethodType>;
};

export enum PayoutSessionStatus {
  Cancelled = 'CANCELLED',
  Failed = 'FAILED',
  InProgress = 'IN_PROGRESS',
  Paid = 'PAID',
  Pending = 'PENDING'
}

export type PayoutSessionStatusFilterComparison = {
  eq?: InputMaybe<PayoutSessionStatus>;
  gt?: InputMaybe<PayoutSessionStatus>;
  gte?: InputMaybe<PayoutSessionStatus>;
  iLike?: InputMaybe<PayoutSessionStatus>;
  in?: InputMaybe<Array<PayoutSessionStatus>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<PayoutSessionStatus>;
  lt?: InputMaybe<PayoutSessionStatus>;
  lte?: InputMaybe<PayoutSessionStatus>;
  neq?: InputMaybe<PayoutSessionStatus>;
  notILike?: InputMaybe<PayoutSessionStatus>;
  notIn?: InputMaybe<Array<PayoutSessionStatus>>;
  notLike?: InputMaybe<PayoutSessionStatus>;
};

export type PayoutStatistics = {
  __typename?: 'PayoutStatistics';
  currency: Scalars['String']['output'];
  lastPayoutAmount: Scalars['Float']['output'];
  pendingAmount: Scalars['Float']['output'];
  usersDefaultPayoutMethodStats: Array<PayoutMethodStats>;
};

export type PersonalInfo = {
  __typename?: 'PersonalInfo';
  address?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Gender>;
  lastName?: Maybe<Scalars['String']['output']>;
  mobileNumber?: Maybe<Scalars['String']['output']>;
};

export type PersonalInfoInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Gender>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  mobileNumber?: InputMaybe<Scalars['String']['input']>;
};

export type PhoneNumber = {
  __typename?: 'PhoneNumber';
  countryCode: Scalars['String']['output'];
  number: Scalars['String']['output'];
};

export type PhoneNumberInput = {
  countryCode: Scalars['String']['input'];
  number: Scalars['String']['input'];
};

export type PlaceDto = {
  __typename?: 'PlaceDTO';
  address: Scalars['String']['output'];
  point: Point;
  title: Scalars['String']['output'];
};

export enum PlatformAddOn {
  FleetAddOn = 'FleetAddOn'
}

export type PlatformDistribution = {
  __typename?: 'PlatformDistribution';
  count: Scalars['Int']['output'];
  platform: DevicePlatform;
};

export type PlatformKpi = {
  __typename?: 'PlatformKPI';
  activeCustomers: PlatformKpiItem;
  totalOrders: PlatformKpiItem;
  totalRevenue: PlatformKpiItem;
};

export type PlatformKpiInput = {
  /** The currency for the KPI */
  currency: Scalars['String']['input'];
  /** The period for the KPI */
  period: KpiPeriod;
};

export type PlatformKpiItem = {
  __typename?: 'PlatformKPIItem';
  /** Breakdown of KPI value by sub-application (e.g., taxi, shop) */
  breakdown: Array<KpiAppBreakdown>;
  /** Percentage change compared to the previous time period */
  change: Scalars['Float']['output'];
  /** Display name of the KPI (e.g., "Total Orders") */
  name: Scalars['String']['output'];
  /** Total value for the current time period */
  total: Scalars['Float']['output'];
  /** Unit of measurement (e.g., "orders", "$") */
  unit?: Maybe<Scalars['String']['output']>;
};

export type Point = {
  __typename?: 'Point';
  heading?: Maybe<Scalars['Int']['output']>;
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
};

export type PointInput = {
  heading?: InputMaybe<Scalars['Int']['input']>;
  lat: Scalars['Float']['input'];
  lng: Scalars['Float']['input'];
};

/** Brand of the provider wether bank name or card provider */
export enum ProviderBrand {
  Amex = 'Amex',
  Diners = 'Diners',
  Discover = 'Discover',
  EftPosAu = 'EftPosAu',
  Jcb = 'JCB',
  Mastercard = 'Mastercard',
  UnionPay = 'UnionPay',
  Unknown = 'Unknown',
  Visa = 'Visa'
}

export enum ProviderDeductTransactionType {
  Expense = 'Expense',
  Refund = 'Refund',
  Withdraw = 'Withdraw'
}

export type ProviderDeductTransactionTypeFilterComparison = {
  eq?: InputMaybe<ProviderDeductTransactionType>;
  gt?: InputMaybe<ProviderDeductTransactionType>;
  gte?: InputMaybe<ProviderDeductTransactionType>;
  iLike?: InputMaybe<ProviderDeductTransactionType>;
  in?: InputMaybe<Array<ProviderDeductTransactionType>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<ProviderDeductTransactionType>;
  lt?: InputMaybe<ProviderDeductTransactionType>;
  lte?: InputMaybe<ProviderDeductTransactionType>;
  neq?: InputMaybe<ProviderDeductTransactionType>;
  notILike?: InputMaybe<ProviderDeductTransactionType>;
  notIn?: InputMaybe<Array<ProviderDeductTransactionType>>;
  notLike?: InputMaybe<ProviderDeductTransactionType>;
};

export type ProviderExpenseBreakdownRecord = {
  __typename?: 'ProviderExpenseBreakdownRecord';
  anyDate: Scalars['DateTime']['output'];
  dateString: Scalars['String']['output'];
  expenseType: ProviderExpenseType;
  value: Scalars['Float']['output'];
};

export enum ProviderExpenseType {
  CloudServices = 'CloudServices',
  Hosting = 'Hosting',
  Marketing = 'Marketing',
  PlatformMaintenance = 'PlatformMaintenance',
  SoftwareLicense = 'SoftwareLicense',
  TechnologyDevelopment = 'TechnologyDevelopment'
}

export type ProviderExpenseTypeFilterComparison = {
  eq?: InputMaybe<ProviderExpenseType>;
  gt?: InputMaybe<ProviderExpenseType>;
  gte?: InputMaybe<ProviderExpenseType>;
  iLike?: InputMaybe<ProviderExpenseType>;
  in?: InputMaybe<Array<ProviderExpenseType>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<ProviderExpenseType>;
  lt?: InputMaybe<ProviderExpenseType>;
  lte?: InputMaybe<ProviderExpenseType>;
  neq?: InputMaybe<ProviderExpenseType>;
  notILike?: InputMaybe<ProviderExpenseType>;
  notIn?: InputMaybe<Array<ProviderExpenseType>>;
  notLike?: InputMaybe<ProviderExpenseType>;
};

export enum ProviderRechargeTransactionType {
  Commission = 'Commission'
}

export type ProviderRechargeTransactionTypeFilterComparison = {
  eq?: InputMaybe<ProviderRechargeTransactionType>;
  gt?: InputMaybe<ProviderRechargeTransactionType>;
  gte?: InputMaybe<ProviderRechargeTransactionType>;
  iLike?: InputMaybe<ProviderRechargeTransactionType>;
  in?: InputMaybe<Array<ProviderRechargeTransactionType>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<ProviderRechargeTransactionType>;
  lt?: InputMaybe<ProviderRechargeTransactionType>;
  lte?: InputMaybe<ProviderRechargeTransactionType>;
  neq?: InputMaybe<ProviderRechargeTransactionType>;
  notILike?: InputMaybe<ProviderRechargeTransactionType>;
  notIn?: InputMaybe<Array<ProviderRechargeTransactionType>>;
  notLike?: InputMaybe<ProviderRechargeTransactionType>;
};

export type ProviderTransaction = {
  __typename?: 'ProviderTransaction';
  action: TransactionAction;
  amount: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  currency: Scalars['String']['output'];
  deductType?: Maybe<ProviderDeductTransactionType>;
  description?: Maybe<Scalars['String']['output']>;
  expenseType?: Maybe<ProviderExpenseType>;
  id: Scalars['ID']['output'];
  operatorId?: Maybe<Scalars['ID']['output']>;
  parkOrderId?: Maybe<Scalars['ID']['output']>;
  rechargeType?: Maybe<ProviderRechargeTransactionType>;
  refrenceNumber?: Maybe<Scalars['String']['output']>;
  requestId?: Maybe<Scalars['ID']['output']>;
  shopOrderCartId?: Maybe<Scalars['ID']['output']>;
};

export type ProviderTransactionAggregateFilter = {
  action?: InputMaybe<TransactionActionFilterComparison>;
  amount?: InputMaybe<NumberFieldComparison>;
  and?: InputMaybe<Array<ProviderTransactionAggregateFilter>>;
  currency?: InputMaybe<StringFieldComparison>;
  deductType?: InputMaybe<ProviderDeductTransactionTypeFilterComparison>;
  expenseType?: InputMaybe<ProviderExpenseTypeFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  operatorId?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ProviderTransactionAggregateFilter>>;
  parkOrderId?: InputMaybe<IdFilterComparison>;
  rechargeType?: InputMaybe<ProviderRechargeTransactionTypeFilterComparison>;
  requestId?: InputMaybe<IdFilterComparison>;
  shopOrderCartId?: InputMaybe<IdFilterComparison>;
};

export type ProviderTransactionAggregateGroupBy = {
  __typename?: 'ProviderTransactionAggregateGroupBy';
  action?: Maybe<TransactionAction>;
  amount?: Maybe<Scalars['Float']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  deductType?: Maybe<ProviderDeductTransactionType>;
  expenseType?: Maybe<ProviderExpenseType>;
  id?: Maybe<Scalars['ID']['output']>;
  operatorId?: Maybe<Scalars['ID']['output']>;
  parkOrderId?: Maybe<Scalars['ID']['output']>;
  rechargeType?: Maybe<ProviderRechargeTransactionType>;
  requestId?: Maybe<Scalars['ID']['output']>;
  shopOrderCartId?: Maybe<Scalars['ID']['output']>;
};

export type ProviderTransactionAggregateResponse = {
  __typename?: 'ProviderTransactionAggregateResponse';
  avg?: Maybe<ProviderTransactionAvgAggregate>;
  count?: Maybe<ProviderTransactionCountAggregate>;
  groupBy?: Maybe<ProviderTransactionAggregateGroupBy>;
  max?: Maybe<ProviderTransactionMaxAggregate>;
  min?: Maybe<ProviderTransactionMinAggregate>;
  sum?: Maybe<ProviderTransactionSumAggregate>;
};

export type ProviderTransactionAvgAggregate = {
  __typename?: 'ProviderTransactionAvgAggregate';
  amount?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  operatorId?: Maybe<Scalars['Float']['output']>;
  parkOrderId?: Maybe<Scalars['Float']['output']>;
  requestId?: Maybe<Scalars['Float']['output']>;
  shopOrderCartId?: Maybe<Scalars['Float']['output']>;
};

export type ProviderTransactionConnection = {
  __typename?: 'ProviderTransactionConnection';
  /** Array of nodes. */
  nodes: Array<ProviderTransaction>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type ProviderTransactionCountAggregate = {
  __typename?: 'ProviderTransactionCountAggregate';
  action?: Maybe<Scalars['Int']['output']>;
  amount?: Maybe<Scalars['Int']['output']>;
  currency?: Maybe<Scalars['Int']['output']>;
  deductType?: Maybe<Scalars['Int']['output']>;
  expenseType?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  operatorId?: Maybe<Scalars['Int']['output']>;
  parkOrderId?: Maybe<Scalars['Int']['output']>;
  rechargeType?: Maybe<Scalars['Int']['output']>;
  requestId?: Maybe<Scalars['Int']['output']>;
  shopOrderCartId?: Maybe<Scalars['Int']['output']>;
};

export type ProviderTransactionFilter = {
  action?: InputMaybe<TransactionActionFilterComparison>;
  amount?: InputMaybe<NumberFieldComparison>;
  and?: InputMaybe<Array<ProviderTransactionFilter>>;
  currency?: InputMaybe<StringFieldComparison>;
  deductType?: InputMaybe<ProviderDeductTransactionTypeFilterComparison>;
  expenseType?: InputMaybe<ProviderExpenseTypeFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  operatorId?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ProviderTransactionFilter>>;
  parkOrderId?: InputMaybe<IdFilterComparison>;
  rechargeType?: InputMaybe<ProviderRechargeTransactionTypeFilterComparison>;
  requestId?: InputMaybe<IdFilterComparison>;
  shopOrderCartId?: InputMaybe<IdFilterComparison>;
};

export type ProviderTransactionInput = {
  action: TransactionAction;
  amount: Scalars['Float']['input'];
  currency: Scalars['String']['input'];
  deductType?: InputMaybe<ProviderDeductTransactionType>;
  description?: InputMaybe<Scalars['String']['input']>;
  expenseType?: InputMaybe<ProviderExpenseType>;
  operatorId?: InputMaybe<Scalars['ID']['input']>;
  rechargeType?: InputMaybe<ProviderRechargeTransactionType>;
  refrenceNumber?: InputMaybe<Scalars['String']['input']>;
};

export type ProviderTransactionMaxAggregate = {
  __typename?: 'ProviderTransactionMaxAggregate';
  action?: Maybe<TransactionAction>;
  amount?: Maybe<Scalars['Float']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  deductType?: Maybe<ProviderDeductTransactionType>;
  expenseType?: Maybe<ProviderExpenseType>;
  id?: Maybe<Scalars['ID']['output']>;
  operatorId?: Maybe<Scalars['ID']['output']>;
  parkOrderId?: Maybe<Scalars['ID']['output']>;
  rechargeType?: Maybe<ProviderRechargeTransactionType>;
  requestId?: Maybe<Scalars['ID']['output']>;
  shopOrderCartId?: Maybe<Scalars['ID']['output']>;
};

export type ProviderTransactionMinAggregate = {
  __typename?: 'ProviderTransactionMinAggregate';
  action?: Maybe<TransactionAction>;
  amount?: Maybe<Scalars['Float']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  deductType?: Maybe<ProviderDeductTransactionType>;
  expenseType?: Maybe<ProviderExpenseType>;
  id?: Maybe<Scalars['ID']['output']>;
  operatorId?: Maybe<Scalars['ID']['output']>;
  parkOrderId?: Maybe<Scalars['ID']['output']>;
  rechargeType?: Maybe<ProviderRechargeTransactionType>;
  requestId?: Maybe<Scalars['ID']['output']>;
  shopOrderCartId?: Maybe<Scalars['ID']['output']>;
};

export type ProviderTransactionSort = {
  direction: SortDirection;
  field: ProviderTransactionSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum ProviderTransactionSortFields {
  Action = 'action',
  Amount = 'amount',
  Currency = 'currency',
  DeductType = 'deductType',
  ExpenseType = 'expenseType',
  Id = 'id',
  OperatorId = 'operatorId',
  ParkOrderId = 'parkOrderId',
  RechargeType = 'rechargeType',
  RequestId = 'requestId',
  ShopOrderCartId = 'shopOrderCartId'
}

export type ProviderTransactionSumAggregate = {
  __typename?: 'ProviderTransactionSumAggregate';
  amount?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  operatorId?: Maybe<Scalars['Float']['output']>;
  parkOrderId?: Maybe<Scalars['Float']['output']>;
  requestId?: Maybe<Scalars['Float']['output']>;
  shopOrderCartId?: Maybe<Scalars['Float']['output']>;
};

export type ProviderWallet = {
  __typename?: 'ProviderWallet';
  balance: Scalars['Float']['output'];
  currency: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};

export type ProviderWalletFilter = {
  and?: InputMaybe<Array<ProviderWalletFilter>>;
  balance?: InputMaybe<FloatFieldComparison>;
  currency?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ProviderWalletFilter>>;
};

export type ProviderWalletSort = {
  direction: SortDirection;
  field: ProviderWalletSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum ProviderWalletSortFields {
  Balance = 'balance',
  Currency = 'currency',
  Id = 'id'
}

export type Query = {
  __typename?: 'Query';
  activeInactiveDrivers: Array<ActiveInactiveUsers>;
  activeInactiveUsers: Array<ActiveInactiveUsers>;
  address: Address;
  addresses: AddressConnection;
  announcement: Announcement;
  announcements: AnnouncementConnection;
  calculateDeliveryFee: CalculateDeliveryFee;
  calculateFare: CalculateFare;
  campaign: Campaign;
  campaignCode: CampaignCode;
  campaignCodes: CampaignCodeConnection;
  campaigns: CampaignConnection;
  cancelReasonPopularityByName: Array<NameCount>;
  cancelReasonPopularityByUserType: Array<UserTypeCountPair>;
  carColor: CarColor;
  carColors: CarColorConnection;
  carModel: CarModel;
  carModels: CarModelConnection;
  configInformation: ConfigInformation;
  countryDistribution: Array<CountryDistribution>;
  coupon: Coupon;
  coupons: CouponConnection;
  currentConfiguration: CurrentConfiguration;
  currentUserSessions: Array<OperatorSession>;
  customerNotes: Array<CustomerNote>;
  customerPlatformDistribution: Array<PlatformDistribution>;
  customerSessions: Array<CustomerSession>;
  customersPerApp: Array<CustomerLoginPerApp>;
  dispatcherShops: Array<DispatcherShop>;
  distressSignal: DistressSignal;
  distressSignalAggregate: Array<DistressSignalAggregateResponse>;
  distressSignals: DistressSignalConnection;
  driver: Driver;
  driverAggregate: Array<DriverAggregateResponse>;
  driverDocumentRetentionPolicies: DriverDocumentRetentionPolicyConnection;
  driverDocuments: Array<DriverDocument>;
  driverFeedbackParametersSummary: Array<FeedbackParameterAggregate>;
  driverNotes: DriverNoteConnection;
  driverRegistrations: Array<RegistrationResultItem>;
  driverSessions: Array<DriverSession>;
  driverShiftRules: Array<DriverShiftRule>;
  driverToDriverDocuments: DriverToDriverDocumentConnection;
  driverTransaction: DriverTransaction;
  driverTransactionAggregate: Array<DriverTransactionAggregateResponse>;
  driverTransactions: DriverTransactionConnection;
  driverWalletAggregate: Array<DriverWalletAggregateResponse>;
  driverWallets: DriverWalletConnection;
  drivers: DriverConnection;
  export: ExportResult;
  exportCampaignCodes: Scalars['String']['output'];
  feedback: Feedback;
  feedbackParameter: FeedbackParameter;
  feedbackParameters: Array<FeedbackParameter>;
  feedbacks: FeedbackConnection;
  fleet: Fleet;
  fleetIncome: Array<FinancialTimeline>;
  fleetStaff: FleetStaff;
  fleetStaffSession: FleetStaffSession;
  fleetStaffSessions: Array<FleetStaffSession>;
  fleetStaffs: FleetStaffConnection;
  fleetTransaction: FleetTransaction;
  fleetTransactionAggregate: Array<FleetTransactionAggregateResponse>;
  fleetTransactions: FleetTransactionConnection;
  fleetWallet: FleetWallet;
  fleetWalletAggregate: Array<FleetWalletAggregateResponse>;
  fleetWallets: FleetWalletConnection;
  fleets: FleetConnection;
  genderDistribution: Array<GenderDistribution>;
  getDriversLocation: Array<OnlineDriver>;
  getDriversLocationWithData: Array<OnlineDriverWithData>;
  getPlaces: Array<PlaceDto>;
  /** Get the average delivery time for a shop within a date range in minutes */
  getShopAverageDeliveryTime: Scalars['Float']['output'];
  getUsedUnusedCountPair: UsedUnusedCountPairDto;
  giftBatch: GiftBatch;
  giftBatches: GiftBatchConnection;
  giftCodes: GiftCodeConnection;
  incomeChart: Array<IncomeResultItem>;
  item: Item;
  itemCategories: ItemCategoryConnection;
  itemCategory: ItemCategory;
  items: ItemConnection;
  licenseInformation?: Maybe<LicenseInformation>;
  login: TokenObject;
  me: Operator;
  notifications: Array<AdminNotificationUnion>;
  operator: Operator;
  operatorRole: OperatorRole;
  operatorRoles: Array<OperatorRole>;
  operatorSessions: Array<OperatorSession>;
  operators: OperatorConnection;
  order: Order;
  orderAggregate: Array<OrderAggregateResponse>;
  orderCancelReason: OrderCancelReason;
  orderCancelReasons: OrderCancelReasonConnection;
  orders: OrderConnection;
  parkOrder: ParkOrder;
  parkOrderAggregate: Array<ParkOrderAggregateResponse>;
  parkOrders: ParkOrderConnection;
  parkSpot: ParkSpot;
  parkSpotAggregate: Array<ParkSpotAggregateResponse>;
  parkSpotNotes: Array<ParkSpotNote>;
  parkSpots: ParkSpotConnection;
  parkingFeedbackAggregate: Array<ParkingFeedbackAggregateResponse>;
  parkingFeedbackParameter: ParkingFeedbackParameter;
  parkingFeedbackParameters: Array<ParkingFeedbackParameter>;
  parkingFeedbacks: ParkingFeedbackConnection;
  parkingLoginSessions: Array<ParkingLoginSession>;
  parkingPayoutSession: ParkingPayoutSession;
  parkingPayoutSessions: ParkingPayoutSessionConnection;
  parkingSupportRequest: ParkingSupportRequest;
  parkingSupportRequestAggregate: Array<ParkingSupportRequestAggregateResponse>;
  parkingSupportRequests: ParkingSupportRequestConnection;
  parkingTransactions: ParkingTransactionConnection;
  parkingWalletAggregate: Array<ParkingWalletAggregateResponse>;
  parkingWallets: ParkingWalletConnection;
  parkings: Array<ParkSpot>;
  paymentGateway: PaymentGateway;
  paymentGateways: PaymentGatewayConnection;
  payoutAccount: PayoutAccount;
  payoutMethod: PayoutMethod;
  payoutMethods: PayoutMethodConnection;
  platformKPI: PlatformKpi;
  popularRegionsByTaxiOrders: Array<NameCount>;
  providerExpenseBreakdownHistory: Array<ProviderExpenseBreakdownRecord>;
  providerRevenueExpenseHistory: Array<RevenueExpensePair>;
  providerTransaction: ProviderTransaction;
  providerTransactionAggregate: Array<ProviderTransactionAggregateResponse>;
  providerTransactions: ProviderTransactionConnection;
  providerWallet: ProviderWallet;
  providerWalletBalanceHistory: Array<FinancialTimeline>;
  providerWallets: Array<ProviderWallet>;
  ratingPointPopularities: Array<NameCount>;
  region: Region;
  regionAggregate: Array<RegionAggregateResponse>;
  regionCategories: Array<RegionCategory>;
  regionCategory: RegionCategory;
  regionCategoryAggregate: Array<RegionCategoryAggregateResponse>;
  regions: RegionConnection;
  requestChart: Array<RequestResultItem>;
  retentionRate: Array<RetentionRate>;
  revenuePerApp: Array<RevenuePerApp>;
  reverseGeocode: PlaceDto;
  reward: Reward;
  rewards: RewardConnection;
  rider: Rider;
  riderAddress: RiderAddress;
  riderAddresses: RiderAddressConnection;
  riderAggregate: Array<RiderAggregateResponse>;
  riderRegistrations: Array<RegistrationResultItem>;
  riderTransaction: RiderTransaction;
  riderTransactions: RiderTransactionConnection;
  riderWallet: RiderWallet;
  riderWalletAggregate: Array<RiderWalletAggregateResponse>;
  riderWallets: RiderWalletConnection;
  riders: RiderConnection;
  savedPaymentMethods: SavedPaymentMethodConnection;
  service: Service;
  serviceCategories: Array<ServiceCategory>;
  serviceCategory: ServiceCategory;
  serviceOption: ServiceOption;
  serviceOptions: Array<ServiceOption>;
  services: Array<Service>;
  shop: Shop;
  shopAggregate: Array<ShopAggregateResponse>;
  shopCategories: ShopCategoryConnection;
  shopCategory: ShopCategory;
  shopDeliveryZone: ShopDeliveryZone;
  shopDeliveryZones: ShopDeliveryZoneConnection;
  shopFeedbackParameter: ShopFeedbackParameter;
  shopFeedbackParameters: ShopFeedbackParameterConnection;
  shopFeedbacks: ShopFeedbackConnection;
  shopItemPreset: ShopItemPreset;
  shopItemPresets: ShopItemPresetConnection;
  shopLoginSessions: Array<ShopLoginSession>;
  shopNotes: Array<ShopNote>;
  shopOrder: ShopOrder;
  shopOrderAggregate: Array<ShopOrderAggregateResponse>;
  shopOrderNotes: Array<ShopOrderNote>;
  shopOrderStatusHistories: Array<ShopOrderStatusHistory>;
  shopOrders: ShopOrderConnection;
  shopPayoutSession: ShopPayoutSession;
  shopPayoutSessions: ShopPayoutSessionConnection;
  shopSupportRequest: ShopSupportRequest;
  shopSupportRequestAggregate: Array<ShopSupportRequestAggregateResponse>;
  shopSupportRequests: ShopSupportRequestConnection;
  shopTransactions: ShopTransactionConnection;
  shopWalletAggregate: Array<ShopWalletAggregateResponse>;
  shopWallets: ShopWalletConnection;
  shops: ShopConnection;
  sms: Sms;
  smsProvider: SmsProvider;
  smsProviders: SmsProviderConnection;
  smses: SmsConnection;
  sosReason: SosReason;
  sosReasons: SosReasonConnection;
  supportedCurrencies: Array<Scalars['String']['output']>;
  taxiOrderNotes: TaxiOrderNoteConnection;
  taxiOrderSuccessRate?: Maybe<Scalars['Int']['output']>;
  taxiPayoutSession: TaxiPayoutSession;
  taxiPayoutSessions: TaxiPayoutSessionConnection;
  taxiPayoutStatistics: PayoutStatistics;
  taxiSupportRequest: TaxiSupportRequest;
  taxiSupportRequestAggregate: Array<TaxiSupportRequestAggregateResponse>;
  taxiSupportRequests: TaxiSupportRequestConnection;
  topEarningDrivers: Array<LeaderboardItem>;
  topEarningParkSpots: Array<LeaderboardItem>;
  topEarningShops: Array<LeaderboardItem>;
  topSpendingCustomers: Array<LeaderboardItem>;
  topTripsCompletedDrivers: Array<LeaderboardItem>;
  totalExpenses: TotalDailyPair;
  totalRevenue: TotalDailyPair;
  totaloutstandingUserBalances: TotalDailyPair;
  zonePrice: ZonePrice;
  zonePriceCategories: Array<ZonePriceCategory>;
  zonePriceCategory: ZonePriceCategory;
  zonePrices: ZonePriceConnection;
};


export type QueryActiveInactiveUsersArgs = {
  input: ChartFilterInput;
};


export type QueryAddressArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAddressesArgs = {
  filter?: AddressFilter;
  paging?: OffsetPaging;
  sorting?: Array<AddressSort>;
};


export type QueryAnnouncementArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAnnouncementsArgs = {
  filter?: AnnouncementFilter;
  paging?: OffsetPaging;
  sorting?: Array<AnnouncementSort>;
};


export type QueryCalculateDeliveryFeeArgs = {
  input: CalculateDeliveryFeeInput;
};


export type QueryCalculateFareArgs = {
  input: CalculateFareInput;
};


export type QueryCampaignArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCampaignCodeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCampaignCodesArgs = {
  filter?: CampaignCodeFilter;
  paging?: OffsetPaging;
  sorting?: Array<CampaignCodeSort>;
};


export type QueryCampaignsArgs = {
  filter?: CampaignFilter;
  paging?: OffsetPaging;
  sorting?: Array<CampaignSort>;
};


export type QueryCarColorArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCarColorsArgs = {
  filter?: CarColorFilter;
  paging?: OffsetPaging;
  sorting?: Array<CarColorSort>;
};


export type QueryCarModelArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCarModelsArgs = {
  filter?: CarModelFilter;
  paging?: OffsetPaging;
  sorting?: Array<CarModelSort>;
};


export type QueryCouponArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCouponsArgs = {
  filter?: CouponFilter;
  paging?: OffsetPaging;
  sorting?: Array<CouponSort>;
};


export type QueryCustomerNotesArgs = {
  filter: CustomerNoteFilter;
  sorting?: Array<CustomerNoteSort>;
};


export type QueryCustomerSessionsArgs = {
  filter?: CustomerSessionFilter;
  sorting?: Array<CustomerSessionSort>;
};


export type QueryDispatcherShopsArgs = {
  input: ShopFiltersInput;
};


export type QueryDistressSignalArgs = {
  id: Scalars['ID']['input'];
};


export type QueryDistressSignalAggregateArgs = {
  filter?: InputMaybe<DistressSignalAggregateFilter>;
};


export type QueryDistressSignalsArgs = {
  filter?: DistressSignalFilter;
  paging?: OffsetPaging;
  sorting?: Array<DistressSignalSort>;
};


export type QueryDriverArgs = {
  id: Scalars['ID']['input'];
};


export type QueryDriverAggregateArgs = {
  filter?: InputMaybe<DriverAggregateFilter>;
};


export type QueryDriverDocumentRetentionPoliciesArgs = {
  filter?: DriverDocumentRetentionPolicyFilter;
  paging?: CursorPaging;
  sorting?: Array<DriverDocumentRetentionPolicySort>;
};


export type QueryDriverDocumentsArgs = {
  filter?: DriverDocumentFilter;
  sorting?: Array<DriverDocumentSort>;
};


export type QueryDriverFeedbackParametersSummaryArgs = {
  driverId: Scalars['ID']['input'];
};


export type QueryDriverNotesArgs = {
  filter: DriverNoteFilter;
  paging?: OffsetPaging;
  sorting?: Array<DriverNoteSort>;
};


export type QueryDriverRegistrationsArgs = {
  timeframe: ChartTimeframe;
};


export type QueryDriverSessionsArgs = {
  filter?: DriverSessionFilter;
  sorting?: Array<DriverSessionSort>;
};


export type QueryDriverShiftRulesArgs = {
  filter?: DriverShiftRuleFilter;
  sorting?: Array<DriverShiftRuleSort>;
};


export type QueryDriverToDriverDocumentsArgs = {
  filter?: DriverToDriverDocumentFilter;
  paging?: CursorPaging;
  sorting?: Array<DriverToDriverDocumentSort>;
};


export type QueryDriverTransactionArgs = {
  id: Scalars['ID']['input'];
};


export type QueryDriverTransactionAggregateArgs = {
  filter?: InputMaybe<DriverTransactionAggregateFilter>;
};


export type QueryDriverTransactionsArgs = {
  filter?: DriverTransactionFilter;
  paging?: OffsetPaging;
  sorting?: Array<DriverTransactionSort>;
};


export type QueryDriverWalletAggregateArgs = {
  filter?: InputMaybe<DriverWalletAggregateFilter>;
};


export type QueryDriverWalletsArgs = {
  filter?: DriverWalletFilter;
  paging?: OffsetPaging;
  sorting?: Array<DriverWalletSort>;
};


export type QueryDriversArgs = {
  filter?: DriverFilter;
  paging?: OffsetPaging;
  sorting?: Array<DriverSort>;
};


export type QueryExportArgs = {
  input: ExportArgs;
};


export type QueryExportCampaignCodesArgs = {
  batchId: Scalars['ID']['input'];
};


export type QueryFeedbackArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFeedbackParameterArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFeedbackParametersArgs = {
  filter?: FeedbackParameterFilter;
  sorting?: Array<FeedbackParameterSort>;
};


export type QueryFeedbacksArgs = {
  filter?: FeedbackFilter;
  paging?: OffsetPaging;
  sorting?: Array<FeedbackSort>;
};


export type QueryFleetArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFleetIncomeArgs = {
  fleetId: Scalars['ID']['input'];
  input: ChartFilterInput;
};


export type QueryFleetStaffArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFleetStaffSessionArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFleetStaffSessionsArgs = {
  filter?: FleetStaffSessionFilter;
  sorting?: Array<FleetStaffSessionSort>;
};


export type QueryFleetStaffsArgs = {
  filter?: FleetStaffFilter;
  paging?: OffsetPaging;
  sorting?: Array<FleetStaffSort>;
};


export type QueryFleetTransactionArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFleetTransactionAggregateArgs = {
  filter?: InputMaybe<FleetTransactionAggregateFilter>;
};


export type QueryFleetTransactionsArgs = {
  filter?: FleetTransactionFilter;
  paging?: OffsetPaging;
  sorting?: Array<FleetTransactionSort>;
};


export type QueryFleetWalletArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFleetWalletAggregateArgs = {
  filter?: InputMaybe<FleetWalletAggregateFilter>;
};


export type QueryFleetWalletsArgs = {
  filter?: FleetWalletFilter;
  paging?: OffsetPaging;
  sorting?: Array<FleetWalletSort>;
};


export type QueryFleetsArgs = {
  filter?: FleetFilter;
  paging?: OffsetPaging;
  sorting?: Array<FleetSort>;
};


export type QueryGetDriversLocationArgs = {
  center: PointInput;
  count: Scalars['Int']['input'];
};


export type QueryGetDriversLocationWithDataArgs = {
  center: PointInput;
  count: Scalars['Int']['input'];
};


export type QueryGetPlacesArgs = {
  apiKey?: InputMaybe<Scalars['String']['input']>;
  keyword: Scalars['String']['input'];
  language?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<PointInput>;
  provider?: InputMaybe<GeoProvider>;
  radius?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetShopAverageDeliveryTimeArgs = {
  input: ShopDateRangePairInput;
};


export type QueryGetUsedUnusedCountPairArgs = {
  campaignId: Scalars['ID']['input'];
};


export type QueryGiftBatchArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGiftBatchesArgs = {
  filter?: GiftBatchFilter;
  paging?: OffsetPaging;
  sorting?: Array<GiftBatchSort>;
};


export type QueryGiftCodesArgs = {
  filter?: GiftCodeFilter;
  paging?: OffsetPaging;
  sorting?: Array<GiftCodeSort>;
};


export type QueryIncomeChartArgs = {
  timeframe: ChartTimeframe;
};


export type QueryItemArgs = {
  id: Scalars['ID']['input'];
};


export type QueryItemCategoriesArgs = {
  filter?: ItemCategoryFilter;
  paging?: OffsetPaging;
  sorting?: Array<ItemCategorySort>;
};


export type QueryItemCategoryArgs = {
  id: Scalars['ID']['input'];
};


export type QueryItemsArgs = {
  filter?: ItemFilter;
  paging?: OffsetPaging;
  sorting?: Array<ItemSort>;
};


export type QueryLoginArgs = {
  password: Scalars['String']['input'];
  userName: Scalars['String']['input'];
};


export type QueryNotificationsArgs = {
  type?: InputMaybe<AdminNotificationType>;
};


export type QueryOperatorArgs = {
  id: Scalars['ID']['input'];
};


export type QueryOperatorRoleArgs = {
  id: Scalars['ID']['input'];
};


export type QueryOperatorRolesArgs = {
  filter?: OperatorRoleFilter;
  sorting?: Array<OperatorRoleSort>;
};


export type QueryOperatorSessionsArgs = {
  filter?: OperatorSessionFilter;
  sorting?: Array<OperatorSessionSort>;
};


export type QueryOperatorsArgs = {
  filter?: OperatorFilter;
  paging?: OffsetPaging;
  sorting?: Array<OperatorSort>;
};


export type QueryOrderArgs = {
  id: Scalars['ID']['input'];
};


export type QueryOrderAggregateArgs = {
  filter?: InputMaybe<OrderAggregateFilter>;
};


export type QueryOrderCancelReasonArgs = {
  id: Scalars['ID']['input'];
};


export type QueryOrderCancelReasonsArgs = {
  filter?: OrderCancelReasonFilter;
  paging?: OffsetPaging;
  sorting?: Array<OrderCancelReasonSort>;
};


export type QueryOrdersArgs = {
  filter?: OrderFilter;
  paging?: OffsetPaging;
  sorting?: Array<OrderSort>;
};


export type QueryParkOrderArgs = {
  id: Scalars['ID']['input'];
};


export type QueryParkOrderAggregateArgs = {
  filter?: InputMaybe<ParkOrderAggregateFilter>;
};


export type QueryParkOrdersArgs = {
  filter?: ParkOrderFilter;
  paging?: OffsetPaging;
  sorting?: Array<ParkOrderSort>;
};


export type QueryParkSpotArgs = {
  id: Scalars['ID']['input'];
};


export type QueryParkSpotAggregateArgs = {
  filter?: InputMaybe<ParkSpotAggregateFilter>;
};


export type QueryParkSpotNotesArgs = {
  filter?: ParkSpotNoteFilter;
  sorting?: Array<ParkSpotNoteSort>;
};


export type QueryParkSpotsArgs = {
  filter?: ParkSpotFilter;
  paging?: OffsetPaging;
  sorting?: Array<ParkSpotSort>;
};


export type QueryParkingFeedbackAggregateArgs = {
  filter?: InputMaybe<ParkingFeedbackAggregateFilter>;
};


export type QueryParkingFeedbackParameterArgs = {
  id: Scalars['ID']['input'];
};


export type QueryParkingFeedbackParametersArgs = {
  filter?: ParkingFeedbackParameterFilter;
  sorting?: Array<ParkingFeedbackParameterSort>;
};


export type QueryParkingFeedbacksArgs = {
  filter?: ParkingFeedbackFilter;
  paging?: OffsetPaging;
  sorting?: Array<ParkingFeedbackSort>;
};


export type QueryParkingLoginSessionsArgs = {
  filter?: ParkingLoginSessionFilter;
  sorting?: Array<ParkingLoginSessionSort>;
};


export type QueryParkingPayoutSessionArgs = {
  id: Scalars['ID']['input'];
};


export type QueryParkingPayoutSessionsArgs = {
  filter?: ParkingPayoutSessionFilter;
  paging?: OffsetPaging;
  sorting?: Array<ParkingPayoutSessionSort>;
};


export type QueryParkingSupportRequestArgs = {
  id: Scalars['ID']['input'];
};


export type QueryParkingSupportRequestAggregateArgs = {
  filter?: InputMaybe<ParkingSupportRequestAggregateFilter>;
};


export type QueryParkingSupportRequestsArgs = {
  filter?: ParkingSupportRequestFilter;
  paging?: OffsetPaging;
  sorting?: Array<ParkingSupportRequestSort>;
};


export type QueryParkingTransactionsArgs = {
  filter?: ParkingTransactionFilter;
  paging?: OffsetPaging;
  sorting?: Array<ParkingTransactionSort>;
};


export type QueryParkingWalletAggregateArgs = {
  filter?: InputMaybe<ParkingWalletAggregateFilter>;
};


export type QueryParkingWalletsArgs = {
  filter?: ParkingWalletFilter;
  paging?: OffsetPaging;
  sorting?: Array<ParkingWalletSort>;
};


export type QueryParkingsArgs = {
  input: ParkSpotFilterInput;
};


export type QueryPaymentGatewayArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPaymentGatewaysArgs = {
  filter?: PaymentGatewayFilter;
  paging?: OffsetPaging;
  sorting?: Array<PaymentGatewaySort>;
};


export type QueryPayoutAccountArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPayoutMethodArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPayoutMethodsArgs = {
  filter?: PayoutMethodFilter;
  paging?: OffsetPaging;
  sorting?: Array<PayoutMethodSort>;
};


export type QueryPlatformKpiArgs = {
  input: PlatformKpiInput;
};


export type QueryProviderExpenseBreakdownHistoryArgs = {
  currency: Scalars['String']['input'];
  input: ChartFilterInput;
};


export type QueryProviderRevenueExpenseHistoryArgs = {
  currency: Scalars['String']['input'];
  input: ChartFilterInput;
};


export type QueryProviderTransactionArgs = {
  id: Scalars['ID']['input'];
};


export type QueryProviderTransactionAggregateArgs = {
  filter?: InputMaybe<ProviderTransactionAggregateFilter>;
};


export type QueryProviderTransactionsArgs = {
  filter?: ProviderTransactionFilter;
  paging?: OffsetPaging;
  sorting?: Array<ProviderTransactionSort>;
};


export type QueryProviderWalletArgs = {
  id: Scalars['ID']['input'];
};


export type QueryProviderWalletBalanceHistoryArgs = {
  currency: Scalars['String']['input'];
  input: ChartFilterInput;
};


export type QueryProviderWalletsArgs = {
  filter?: ProviderWalletFilter;
  sorting?: Array<ProviderWalletSort>;
};


export type QueryRegionArgs = {
  id: Scalars['ID']['input'];
};


export type QueryRegionAggregateArgs = {
  filter?: InputMaybe<RegionAggregateFilter>;
};


export type QueryRegionCategoriesArgs = {
  filter?: RegionCategoryFilter;
  sorting?: Array<RegionCategorySort>;
};


export type QueryRegionCategoryArgs = {
  id: Scalars['ID']['input'];
};


export type QueryRegionCategoryAggregateArgs = {
  filter?: InputMaybe<RegionCategoryAggregateFilter>;
};


export type QueryRegionsArgs = {
  filter?: RegionFilter;
  paging?: OffsetPaging;
  sorting?: Array<RegionSort>;
};


export type QueryRequestChartArgs = {
  timeframe: ChartTimeframe;
};


export type QueryRetentionRateArgs = {
  input: ChartFilterInput;
};


export type QueryRevenuePerAppArgs = {
  input: ChartFilterInput;
};


export type QueryReverseGeocodeArgs = {
  apiKey?: InputMaybe<Scalars['String']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  location: PointInput;
  provider?: InputMaybe<GeoProvider>;
};


export type QueryRewardArgs = {
  id: Scalars['ID']['input'];
};


export type QueryRewardsArgs = {
  filter?: RewardFilter;
  paging?: OffsetPaging;
  sorting?: Array<RewardSort>;
};


export type QueryRiderArgs = {
  id: Scalars['ID']['input'];
};


export type QueryRiderAddressArgs = {
  id: Scalars['ID']['input'];
};


export type QueryRiderAddressesArgs = {
  filter?: RiderAddressFilter;
  paging?: OffsetPaging;
  sorting?: Array<RiderAddressSort>;
};


export type QueryRiderAggregateArgs = {
  filter?: InputMaybe<RiderAggregateFilter>;
};


export type QueryRiderRegistrationsArgs = {
  timeframe: ChartTimeframe;
};


export type QueryRiderTransactionArgs = {
  id: Scalars['ID']['input'];
};


export type QueryRiderTransactionsArgs = {
  filter?: RiderTransactionFilter;
  paging?: OffsetPaging;
  sorting?: Array<RiderTransactionSort>;
};


export type QueryRiderWalletArgs = {
  id: Scalars['ID']['input'];
};


export type QueryRiderWalletAggregateArgs = {
  filter?: InputMaybe<RiderWalletAggregateFilter>;
};


export type QueryRiderWalletsArgs = {
  filter?: RiderWalletFilter;
  paging?: OffsetPaging;
  sorting?: Array<RiderWalletSort>;
};


export type QueryRidersArgs = {
  filter?: RiderFilter;
  paging?: OffsetPaging;
  sorting?: Array<RiderSort>;
};


export type QuerySavedPaymentMethodsArgs = {
  filter?: SavedPaymentMethodFilter;
  paging?: OffsetPaging;
  sorting?: Array<SavedPaymentMethodSort>;
};


export type QueryServiceArgs = {
  id: Scalars['ID']['input'];
};


export type QueryServiceCategoriesArgs = {
  filter?: ServiceCategoryFilter;
  sorting?: Array<ServiceCategorySort>;
};


export type QueryServiceCategoryArgs = {
  id: Scalars['ID']['input'];
};


export type QueryServiceOptionArgs = {
  id: Scalars['ID']['input'];
};


export type QueryServiceOptionsArgs = {
  filter?: ServiceOptionFilter;
  sorting?: Array<ServiceOptionSort>;
};


export type QueryServicesArgs = {
  filter?: ServiceFilter;
  sorting?: Array<ServiceSort>;
};


export type QueryShopArgs = {
  id: Scalars['ID']['input'];
};


export type QueryShopAggregateArgs = {
  filter?: InputMaybe<ShopAggregateFilter>;
};


export type QueryShopCategoriesArgs = {
  filter?: ShopCategoryFilter;
  paging?: OffsetPaging;
  sorting?: Array<ShopCategorySort>;
};


export type QueryShopCategoryArgs = {
  id: Scalars['ID']['input'];
};


export type QueryShopDeliveryZoneArgs = {
  id: Scalars['ID']['input'];
};


export type QueryShopDeliveryZonesArgs = {
  filter?: ShopDeliveryZoneFilter;
  paging?: OffsetPaging;
  sorting?: Array<ShopDeliveryZoneSort>;
};


export type QueryShopFeedbackParameterArgs = {
  id: Scalars['ID']['input'];
};


export type QueryShopFeedbackParametersArgs = {
  filter?: ShopFeedbackParameterFilter;
  paging?: OffsetPaging;
  sorting?: Array<ShopFeedbackParameterSort>;
};


export type QueryShopFeedbacksArgs = {
  filter?: ShopFeedbackFilter;
  paging?: OffsetPaging;
  sorting?: Array<ShopFeedbackSort>;
};


export type QueryShopItemPresetArgs = {
  id: Scalars['ID']['input'];
};


export type QueryShopItemPresetsArgs = {
  filter?: ShopItemPresetFilter;
  paging?: OffsetPaging;
  sorting?: Array<ShopItemPresetSort>;
};


export type QueryShopLoginSessionsArgs = {
  filter?: ShopLoginSessionFilter;
  sorting?: Array<ShopLoginSessionSort>;
};


export type QueryShopNotesArgs = {
  filter: ShopNoteFilter;
  sorting?: Array<ShopNoteSort>;
};


export type QueryShopOrderArgs = {
  id: Scalars['ID']['input'];
};


export type QueryShopOrderAggregateArgs = {
  filter?: InputMaybe<ShopOrderAggregateFilter>;
};


export type QueryShopOrderNotesArgs = {
  filter: ShopOrderNoteFilter;
  sorting?: Array<ShopOrderNoteSort>;
};


export type QueryShopOrderStatusHistoriesArgs = {
  filter?: ShopOrderStatusHistoryFilter;
  sorting?: Array<ShopOrderStatusHistorySort>;
};


export type QueryShopOrdersArgs = {
  filter?: ShopOrderFilter;
  paging?: OffsetPaging;
  sorting?: Array<ShopOrderSort>;
};


export type QueryShopPayoutSessionArgs = {
  id: Scalars['ID']['input'];
};


export type QueryShopPayoutSessionsArgs = {
  filter?: ShopPayoutSessionFilter;
  paging?: OffsetPaging;
  sorting?: Array<ShopPayoutSessionSort>;
};


export type QueryShopSupportRequestArgs = {
  id: Scalars['ID']['input'];
};


export type QueryShopSupportRequestAggregateArgs = {
  filter?: InputMaybe<ShopSupportRequestAggregateFilter>;
};


export type QueryShopSupportRequestsArgs = {
  filter?: ShopSupportRequestFilter;
  paging?: OffsetPaging;
  sorting?: Array<ShopSupportRequestSort>;
};


export type QueryShopTransactionsArgs = {
  filter?: ShopTransactionFilter;
  paging?: OffsetPaging;
  sorting?: Array<ShopTransactionSort>;
};


export type QueryShopWalletAggregateArgs = {
  filter?: InputMaybe<ShopWalletAggregateFilter>;
};


export type QueryShopWalletsArgs = {
  filter?: ShopWalletFilter;
  paging?: OffsetPaging;
  sorting?: Array<ShopWalletSort>;
};


export type QueryShopsArgs = {
  filter?: ShopFilter;
  paging?: OffsetPaging;
  sorting?: Array<ShopSort>;
};


export type QuerySmsArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySmsProviderArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySmsProvidersArgs = {
  filter?: SmsProviderFilter;
  paging?: OffsetPaging;
  sorting?: Array<SmsProviderSort>;
};


export type QuerySmsesArgs = {
  filter?: SmsFilter;
  paging?: OffsetPaging;
  sorting?: Array<SmsSort>;
};


export type QuerySosReasonArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySosReasonsArgs = {
  filter?: SosReasonFilter;
  paging?: OffsetPaging;
  sorting?: Array<SosReasonSort>;
};


export type QueryTaxiOrderNotesArgs = {
  filter: TaxiOrderNoteFilter;
  paging?: OffsetPaging;
  sorting?: Array<TaxiOrderNoteSort>;
};


export type QueryTaxiOrderSuccessRateArgs = {
  endTime?: InputMaybe<Scalars['DateTime']['input']>;
  startTime?: InputMaybe<Scalars['DateTime']['input']>;
};


export type QueryTaxiPayoutSessionArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTaxiPayoutSessionsArgs = {
  filter?: TaxiPayoutSessionFilter;
  paging?: OffsetPaging;
  sorting?: Array<TaxiPayoutSessionSort>;
};


export type QueryTaxiPayoutStatisticsArgs = {
  currency?: InputMaybe<Scalars['String']['input']>;
};


export type QueryTaxiSupportRequestArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTaxiSupportRequestAggregateArgs = {
  filter?: InputMaybe<TaxiSupportRequestAggregateFilter>;
};


export type QueryTaxiSupportRequestsArgs = {
  filter?: TaxiSupportRequestFilter;
  paging?: OffsetPaging;
  sorting?: Array<TaxiSupportRequestSort>;
};


export type QueryTopEarningDriversArgs = {
  currency: Scalars['String']['input'];
};


export type QueryTopEarningParkSpotsArgs = {
  currency: Scalars['String']['input'];
};


export type QueryTotalExpensesArgs = {
  currency: Scalars['String']['input'];
};


export type QueryTotalRevenueArgs = {
  currency: Scalars['String']['input'];
};


export type QueryTotaloutstandingUserBalancesArgs = {
  currency: Scalars['String']['input'];
};


export type QueryZonePriceArgs = {
  id: Scalars['ID']['input'];
};


export type QueryZonePriceCategoriesArgs = {
  filter?: ZonePriceCategoryFilter;
  sorting?: Array<ZonePriceCategorySort>;
};


export type QueryZonePriceCategoryArgs = {
  id: Scalars['ID']['input'];
};


export type QueryZonePricesArgs = {
  filter?: ZonePriceFilter;
  paging?: OffsetPaging;
  sorting?: Array<ZonePriceSort>;
};

export type RatingAggregate = {
  __typename?: 'RatingAggregate';
  rating?: Maybe<Scalars['Int']['output']>;
  reviewCount: Scalars['Int']['output'];
};

export type RatingAggregateInput = {
  rating?: InputMaybe<Scalars['Int']['input']>;
  reviewCount: Scalars['Int']['input'];
};

export type Region = {
  __typename?: 'Region';
  category?: Maybe<RegionCategory>;
  categoryId: Scalars['ID']['output'];
  currency: Scalars['String']['output'];
  enabled: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  location: Array<Array<Point>>;
  name: Scalars['String']['output'];
  taxiOrders: RegionTaxiOrdersConnection;
  taxiOrdersAggregate: Array<RegionTaxiOrdersAggregateResponse>;
};


export type RegionTaxiOrdersArgs = {
  filter?: OrderFilter;
  paging?: OffsetPaging;
  sorting?: Array<OrderSort>;
};


export type RegionTaxiOrdersAggregateArgs = {
  filter?: InputMaybe<OrderAggregateFilter>;
};

export type RegionAggregateFilter = {
  and?: InputMaybe<Array<RegionAggregateFilter>>;
  categoryId?: InputMaybe<IdFilterComparison>;
  currency?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<RegionAggregateFilter>>;
};

export type RegionAggregateGroupBy = {
  __typename?: 'RegionAggregateGroupBy';
  categoryId?: Maybe<Scalars['ID']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type RegionAggregateResponse = {
  __typename?: 'RegionAggregateResponse';
  avg?: Maybe<RegionAvgAggregate>;
  count?: Maybe<RegionCountAggregate>;
  groupBy?: Maybe<RegionAggregateGroupBy>;
  max?: Maybe<RegionMaxAggregate>;
  min?: Maybe<RegionMinAggregate>;
  sum?: Maybe<RegionSumAggregate>;
};

export type RegionAvgAggregate = {
  __typename?: 'RegionAvgAggregate';
  categoryId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

export type RegionCategory = {
  __typename?: 'RegionCategory';
  currency: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  regions: RegionCategoryRegionsConnection;
  regionsAggregate: Array<RegionCategoryRegionsAggregateResponse>;
};


export type RegionCategoryRegionsArgs = {
  filter?: RegionFilter;
  paging?: OffsetPaging;
  sorting?: Array<RegionSort>;
};


export type RegionCategoryRegionsAggregateArgs = {
  filter?: InputMaybe<RegionAggregateFilter>;
};

export type RegionCategoryAggregateFilter = {
  and?: InputMaybe<Array<RegionCategoryAggregateFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<RegionCategoryAggregateFilter>>;
};

export type RegionCategoryAggregateGroupBy = {
  __typename?: 'RegionCategoryAggregateGroupBy';
  id?: Maybe<Scalars['ID']['output']>;
};

export type RegionCategoryAggregateResponse = {
  __typename?: 'RegionCategoryAggregateResponse';
  avg?: Maybe<RegionCategoryAvgAggregate>;
  count?: Maybe<RegionCategoryCountAggregate>;
  groupBy?: Maybe<RegionCategoryAggregateGroupBy>;
  max?: Maybe<RegionCategoryMaxAggregate>;
  min?: Maybe<RegionCategoryMinAggregate>;
  sum?: Maybe<RegionCategorySumAggregate>;
};

export type RegionCategoryAvgAggregate = {
  __typename?: 'RegionCategoryAvgAggregate';
  id?: Maybe<Scalars['Float']['output']>;
};

export type RegionCategoryCountAggregate = {
  __typename?: 'RegionCategoryCountAggregate';
  id?: Maybe<Scalars['Int']['output']>;
};

export type RegionCategoryDeleteResponse = {
  __typename?: 'RegionCategoryDeleteResponse';
  currency?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type RegionCategoryFilter = {
  and?: InputMaybe<Array<RegionCategoryFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<RegionCategoryFilter>>;
};

export type RegionCategoryInput = {
  currency: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type RegionCategoryMaxAggregate = {
  __typename?: 'RegionCategoryMaxAggregate';
  id?: Maybe<Scalars['ID']['output']>;
};

export type RegionCategoryMinAggregate = {
  __typename?: 'RegionCategoryMinAggregate';
  id?: Maybe<Scalars['ID']['output']>;
};

export type RegionCategoryRegionsAggregateGroupBy = {
  __typename?: 'RegionCategoryRegionsAggregateGroupBy';
  categoryId?: Maybe<Scalars['ID']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type RegionCategoryRegionsAggregateResponse = {
  __typename?: 'RegionCategoryRegionsAggregateResponse';
  avg?: Maybe<RegionCategoryRegionsAvgAggregate>;
  count?: Maybe<RegionCategoryRegionsCountAggregate>;
  groupBy?: Maybe<RegionCategoryRegionsAggregateGroupBy>;
  max?: Maybe<RegionCategoryRegionsMaxAggregate>;
  min?: Maybe<RegionCategoryRegionsMinAggregate>;
  sum?: Maybe<RegionCategoryRegionsSumAggregate>;
};

export type RegionCategoryRegionsAvgAggregate = {
  __typename?: 'RegionCategoryRegionsAvgAggregate';
  categoryId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

export type RegionCategoryRegionsConnection = {
  __typename?: 'RegionCategoryRegionsConnection';
  /** Array of nodes. */
  nodes: Array<Region>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type RegionCategoryRegionsCountAggregate = {
  __typename?: 'RegionCategoryRegionsCountAggregate';
  categoryId?: Maybe<Scalars['Int']['output']>;
  currency?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['Int']['output']>;
};

export type RegionCategoryRegionsMaxAggregate = {
  __typename?: 'RegionCategoryRegionsMaxAggregate';
  categoryId?: Maybe<Scalars['ID']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type RegionCategoryRegionsMinAggregate = {
  __typename?: 'RegionCategoryRegionsMinAggregate';
  categoryId?: Maybe<Scalars['ID']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type RegionCategoryRegionsSumAggregate = {
  __typename?: 'RegionCategoryRegionsSumAggregate';
  categoryId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

export type RegionCategorySort = {
  direction: SortDirection;
  field: RegionCategorySortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum RegionCategorySortFields {
  Id = 'id'
}

export type RegionCategorySumAggregate = {
  __typename?: 'RegionCategorySumAggregate';
  id?: Maybe<Scalars['Float']['output']>;
};

export type RegionConnection = {
  __typename?: 'RegionConnection';
  /** Array of nodes. */
  nodes: Array<Region>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type RegionCountAggregate = {
  __typename?: 'RegionCountAggregate';
  categoryId?: Maybe<Scalars['Int']['output']>;
  currency?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['Int']['output']>;
};

export type RegionDeleteResponse = {
  __typename?: 'RegionDeleteResponse';
  categoryId?: Maybe<Scalars['ID']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  enabled?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  location?: Maybe<Array<Array<Point>>>;
  name?: Maybe<Scalars['String']['output']>;
};

export type RegionFilter = {
  and?: InputMaybe<Array<RegionFilter>>;
  categoryId?: InputMaybe<IdFilterComparison>;
  currency?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<RegionFilter>>;
};

export type RegionMaxAggregate = {
  __typename?: 'RegionMaxAggregate';
  categoryId?: Maybe<Scalars['ID']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type RegionMinAggregate = {
  __typename?: 'RegionMinAggregate';
  categoryId?: Maybe<Scalars['ID']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type RegionSort = {
  direction: SortDirection;
  field: RegionSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum RegionSortFields {
  CategoryId = 'categoryId',
  Currency = 'currency',
  Id = 'id',
  Name = 'name'
}

export type RegionSumAggregate = {
  __typename?: 'RegionSumAggregate';
  categoryId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

export type RegionTaxiOrdersAggregateGroupBy = {
  __typename?: 'RegionTaxiOrdersAggregateGroupBy';
  costAfterCoupon?: Maybe<Scalars['Float']['output']>;
  costBest?: Maybe<Scalars['Float']['output']>;
  createdOn?: Maybe<Scalars['DateTime']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  distanceBest?: Maybe<Scalars['Int']['output']>;
  driverId?: Maybe<Scalars['ID']['output']>;
  durationBest?: Maybe<Scalars['Int']['output']>;
  fleetId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  paymentMode?: Maybe<PaymentMode>;
  regionId?: Maybe<Scalars['ID']['output']>;
  riderId?: Maybe<Scalars['ID']['output']>;
  serviceId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<OrderStatus>;
};

export type RegionTaxiOrdersAggregateResponse = {
  __typename?: 'RegionTaxiOrdersAggregateResponse';
  avg?: Maybe<RegionTaxiOrdersAvgAggregate>;
  count?: Maybe<RegionTaxiOrdersCountAggregate>;
  groupBy?: Maybe<RegionTaxiOrdersAggregateGroupBy>;
  max?: Maybe<RegionTaxiOrdersMaxAggregate>;
  min?: Maybe<RegionTaxiOrdersMinAggregate>;
  sum?: Maybe<RegionTaxiOrdersSumAggregate>;
};

export type RegionTaxiOrdersAvgAggregate = {
  __typename?: 'RegionTaxiOrdersAvgAggregate';
  costAfterCoupon?: Maybe<Scalars['Float']['output']>;
  costBest?: Maybe<Scalars['Float']['output']>;
  distanceBest?: Maybe<Scalars['Float']['output']>;
  driverId?: Maybe<Scalars['Float']['output']>;
  durationBest?: Maybe<Scalars['Float']['output']>;
  fleetId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  regionId?: Maybe<Scalars['Float']['output']>;
  riderId?: Maybe<Scalars['Float']['output']>;
  serviceId?: Maybe<Scalars['Float']['output']>;
};

export type RegionTaxiOrdersConnection = {
  __typename?: 'RegionTaxiOrdersConnection';
  /** Array of nodes. */
  nodes: Array<Order>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type RegionTaxiOrdersCountAggregate = {
  __typename?: 'RegionTaxiOrdersCountAggregate';
  costAfterCoupon?: Maybe<Scalars['Int']['output']>;
  costBest?: Maybe<Scalars['Int']['output']>;
  createdOn?: Maybe<Scalars['Int']['output']>;
  currency?: Maybe<Scalars['Int']['output']>;
  distanceBest?: Maybe<Scalars['Int']['output']>;
  driverId?: Maybe<Scalars['Int']['output']>;
  durationBest?: Maybe<Scalars['Int']['output']>;
  fleetId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  paymentMode?: Maybe<Scalars['Int']['output']>;
  regionId?: Maybe<Scalars['Int']['output']>;
  riderId?: Maybe<Scalars['Int']['output']>;
  serviceId?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
};

export type RegionTaxiOrdersMaxAggregate = {
  __typename?: 'RegionTaxiOrdersMaxAggregate';
  costAfterCoupon?: Maybe<Scalars['Float']['output']>;
  costBest?: Maybe<Scalars['Float']['output']>;
  createdOn?: Maybe<Scalars['DateTime']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  distanceBest?: Maybe<Scalars['Int']['output']>;
  driverId?: Maybe<Scalars['ID']['output']>;
  durationBest?: Maybe<Scalars['Int']['output']>;
  fleetId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  paymentMode?: Maybe<PaymentMode>;
  regionId?: Maybe<Scalars['ID']['output']>;
  riderId?: Maybe<Scalars['ID']['output']>;
  serviceId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<OrderStatus>;
};

export type RegionTaxiOrdersMinAggregate = {
  __typename?: 'RegionTaxiOrdersMinAggregate';
  costAfterCoupon?: Maybe<Scalars['Float']['output']>;
  costBest?: Maybe<Scalars['Float']['output']>;
  createdOn?: Maybe<Scalars['DateTime']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  distanceBest?: Maybe<Scalars['Int']['output']>;
  driverId?: Maybe<Scalars['ID']['output']>;
  durationBest?: Maybe<Scalars['Int']['output']>;
  fleetId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  paymentMode?: Maybe<PaymentMode>;
  regionId?: Maybe<Scalars['ID']['output']>;
  riderId?: Maybe<Scalars['ID']['output']>;
  serviceId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<OrderStatus>;
};

export type RegionTaxiOrdersSumAggregate = {
  __typename?: 'RegionTaxiOrdersSumAggregate';
  costAfterCoupon?: Maybe<Scalars['Float']['output']>;
  costBest?: Maybe<Scalars['Float']['output']>;
  distanceBest?: Maybe<Scalars['Float']['output']>;
  driverId?: Maybe<Scalars['Float']['output']>;
  durationBest?: Maybe<Scalars['Float']['output']>;
  fleetId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  regionId?: Maybe<Scalars['Float']['output']>;
  riderId?: Maybe<Scalars['Float']['output']>;
  serviceId?: Maybe<Scalars['Float']['output']>;
};

export type RegistrationResultItem = {
  __typename?: 'RegistrationResultItem';
  count: Scalars['Int']['output'];
  time: Scalars['String']['output'];
};

export type RemoveItemFromCartInput = {
  cancelables: Array<RemoveItemFromCartItemQuantityPair>;
  cartId: Scalars['ID']['input'];
};

export type RemoveItemFromCartItemQuantityPair = {
  cancelQuantity: Scalars['Int']['input'];
  shopOrderCartItemId: Scalars['ID']['input'];
};

export type RequestActivity = {
  __typename?: 'RequestActivity';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  type: RequestActivityType;
};

export type RequestActivityAggregateFilter = {
  and?: InputMaybe<Array<RequestActivityAggregateFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<RequestActivityAggregateFilter>>;
};

export type RequestActivityFilter = {
  and?: InputMaybe<Array<RequestActivityFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<RequestActivityFilter>>;
};

export type RequestActivitySort = {
  direction: SortDirection;
  field: RequestActivitySortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum RequestActivitySortFields {
  Id = 'id'
}

export enum RequestActivityType {
  ArrivedToDestination = 'ArrivedToDestination',
  ArrivedToPickupPoint = 'ArrivedToPickupPoint',
  BookedByOperator = 'BookedByOperator',
  BookedByRider = 'BookedByRider',
  CanceledByDriver = 'CanceledByDriver',
  CanceledByOperator = 'CanceledByOperator',
  CanceledByRider = 'CanceledByRider',
  DriverAccepted = 'DriverAccepted',
  Expired = 'Expired',
  Paid = 'Paid',
  RequestedByOperator = 'RequestedByOperator',
  RequestedByRider = 'RequestedByRider',
  Reviewed = 'Reviewed',
  Started = 'Started'
}

export type RequestResultItem = {
  __typename?: 'RequestResultItem';
  count: Scalars['Int']['output'];
  status: OrderStatus;
  time: Scalars['String']['output'];
};

export type RetentionRate = {
  __typename?: 'RetentionRate';
  /** Any date within the range of revenue interval. */
  date: Scalars['DateTime']['output'];
  retentionRate: Scalars['Float']['output'];
};

export type RevenueExpensePair = {
  __typename?: 'RevenueExpensePair';
  anyDate: Scalars['DateTime']['output'];
  dateString: Scalars['String']['output'];
  expense: Scalars['Float']['output'];
  revenue: Scalars['Float']['output'];
};

export type RevenuePerApp = {
  __typename?: 'RevenuePerApp';
  app: AppType;
  /** Any date within the range of revenue interval. */
  date: Scalars['DateTime']['output'];
  revenue: Scalars['Float']['output'];
};

export enum ReviewStatus {
  Approved = 'Approved',
  ApprovedUnpublished = 'ApprovedUnpublished',
  Overridden = 'Overridden',
  Pending = 'Pending',
  Rejected = 'Rejected'
}

export type ReviewStatusFilterComparison = {
  eq?: InputMaybe<ReviewStatus>;
  gt?: InputMaybe<ReviewStatus>;
  gte?: InputMaybe<ReviewStatus>;
  iLike?: InputMaybe<ReviewStatus>;
  in?: InputMaybe<Array<ReviewStatus>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<ReviewStatus>;
  lt?: InputMaybe<ReviewStatus>;
  lte?: InputMaybe<ReviewStatus>;
  neq?: InputMaybe<ReviewStatus>;
  notILike?: InputMaybe<ReviewStatus>;
  notIn?: InputMaybe<Array<ReviewStatus>>;
  notLike?: InputMaybe<ReviewStatus>;
};

export type Reward = {
  __typename?: 'Reward';
  appType: RewardAppType;
  beneficiary: RewardBeneficiary;
  conditionTripCountsLessThan?: Maybe<Scalars['Float']['output']>;
  conditionUserNumberFirstDigits?: Maybe<Array<Scalars['String']['output']>>;
  creditCurrency?: Maybe<Scalars['String']['output']>;
  creditGift: Scalars['Float']['output'];
  endDate?: Maybe<Scalars['DateTime']['output']>;
  event: RewardEvent;
  id: Scalars['ID']['output'];
  startDate?: Maybe<Scalars['DateTime']['output']>;
  title: Scalars['String']['output'];
  tripFeePercentGift?: Maybe<Scalars['Float']['output']>;
};

export enum RewardAppType {
  Driver = 'Driver',
  Rider = 'Rider'
}

export enum RewardBeneficiary {
  Referrer = 'Referrer',
  Self = 'Self'
}

export type RewardConnection = {
  __typename?: 'RewardConnection';
  /** Array of nodes. */
  nodes: Array<Reward>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type RewardDeleteResponse = {
  __typename?: 'RewardDeleteResponse';
  appType?: Maybe<RewardAppType>;
  beneficiary?: Maybe<RewardBeneficiary>;
  conditionTripCountsLessThan?: Maybe<Scalars['Float']['output']>;
  conditionUserNumberFirstDigits?: Maybe<Array<Scalars['String']['output']>>;
  creditCurrency?: Maybe<Scalars['String']['output']>;
  creditGift?: Maybe<Scalars['Float']['output']>;
  endDate?: Maybe<Scalars['DateTime']['output']>;
  event?: Maybe<RewardEvent>;
  id?: Maybe<Scalars['ID']['output']>;
  startDate?: Maybe<Scalars['DateTime']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  tripFeePercentGift?: Maybe<Scalars['Float']['output']>;
};

export enum RewardEvent {
  Register = 'Register',
  ServiceCompleted = 'ServiceCompleted'
}

export type RewardFilter = {
  and?: InputMaybe<Array<RewardFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<RewardFilter>>;
};

export type RewardSort = {
  direction: SortDirection;
  field: RewardSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum RewardSortFields {
  Id = 'id'
}

export type Rider = {
  __typename?: 'Rider';
  addresses: RiderAddressesConnection;
  addressesAggregate: Array<RiderAddressesAggregateResponse>;
  /** Country ISO code. For example "GB" for United Kingdom, "CA" for Canada, "AU" for Australia, etc. */
  countryIso?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Gender>;
  id: Scalars['ID']['output'];
  idNumber?: Maybe<Scalars['String']['output']>;
  isResident?: Maybe<Scalars['Boolean']['output']>;
  lastActivityAt?: Maybe<Scalars['DateTime']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  media?: Maybe<Media>;
  mobileNumber: Scalars['String']['output'];
  orders: RiderOrdersConnection;
  ordersAggregate: Array<RiderOrdersAggregateResponse>;
  parkingWallets: Array<ParkingWallet>;
  parkingWalletsAggregate: Array<RiderParkingWalletsAggregateResponse>;
  registrationTimestamp: Scalars['DateTime']['output'];
  status: RiderStatus;
  transactions: RiderTransactionsConnection;
  transactionsAggregate: Array<RiderTransactionsAggregateResponse>;
  wallet: Array<RiderWallet>;
  walletAggregate: Array<RiderWalletAggregateResponse>;
};


export type RiderAddressesArgs = {
  filter?: RiderAddressFilter;
  paging?: OffsetPaging;
  sorting?: Array<RiderAddressSort>;
};


export type RiderAddressesAggregateArgs = {
  filter?: InputMaybe<RiderAddressAggregateFilter>;
};


export type RiderOrdersArgs = {
  filter?: OrderFilter;
  paging?: OffsetPaging;
  sorting?: Array<OrderSort>;
};


export type RiderOrdersAggregateArgs = {
  filter?: InputMaybe<OrderAggregateFilter>;
};


export type RiderParkingWalletsArgs = {
  filter?: ParkingWalletFilter;
  sorting?: Array<ParkingWalletSort>;
};


export type RiderParkingWalletsAggregateArgs = {
  filter?: InputMaybe<ParkingWalletAggregateFilter>;
};


export type RiderTransactionsArgs = {
  filter?: RiderTransactionFilter;
  paging?: OffsetPaging;
  sorting?: Array<RiderTransactionSort>;
};


export type RiderTransactionsAggregateArgs = {
  filter?: InputMaybe<RiderTransactionAggregateFilter>;
};


export type RiderWalletArgs = {
  filter?: RiderWalletFilter;
  sorting?: Array<RiderWalletSort>;
};


export type RiderWalletAggregateArgs = {
  filter?: InputMaybe<RiderWalletAggregateFilter>;
};

export type RiderAddress = {
  __typename?: 'RiderAddress';
  details?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  location: Point;
  riderId: Scalars['ID']['output'];
  title: Scalars['String']['output'];
  type: RiderAddressType;
};

export type RiderAddressAggregateFilter = {
  and?: InputMaybe<Array<RiderAddressAggregateFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<RiderAddressAggregateFilter>>;
  riderId?: InputMaybe<IdFilterComparison>;
};

export type RiderAddressConnection = {
  __typename?: 'RiderAddressConnection';
  /** Array of nodes. */
  nodes: Array<RiderAddress>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type RiderAddressFilter = {
  and?: InputMaybe<Array<RiderAddressFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<RiderAddressFilter>>;
  riderId?: InputMaybe<IdFilterComparison>;
};

export type RiderAddressSort = {
  direction: SortDirection;
  field: RiderAddressSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum RiderAddressSortFields {
  Id = 'id',
  RiderId = 'riderId'
}

export enum RiderAddressType {
  Cafe = 'Cafe',
  Gym = 'Gym',
  Home = 'Home',
  Other = 'Other',
  Parent = 'Parent',
  Park = 'Park',
  Partner = 'Partner',
  Work = 'Work'
}

export type RiderAddressUpdateFilter = {
  and?: InputMaybe<Array<RiderAddressUpdateFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<RiderAddressUpdateFilter>>;
  riderId?: InputMaybe<IdFilterComparison>;
};

export type RiderAddressesAggregateGroupBy = {
  __typename?: 'RiderAddressesAggregateGroupBy';
  id?: Maybe<Scalars['ID']['output']>;
  riderId?: Maybe<Scalars['ID']['output']>;
};

export type RiderAddressesAggregateResponse = {
  __typename?: 'RiderAddressesAggregateResponse';
  avg?: Maybe<RiderAddressesAvgAggregate>;
  count?: Maybe<RiderAddressesCountAggregate>;
  groupBy?: Maybe<RiderAddressesAggregateGroupBy>;
  max?: Maybe<RiderAddressesMaxAggregate>;
  min?: Maybe<RiderAddressesMinAggregate>;
  sum?: Maybe<RiderAddressesSumAggregate>;
};

export type RiderAddressesAvgAggregate = {
  __typename?: 'RiderAddressesAvgAggregate';
  id?: Maybe<Scalars['Float']['output']>;
  riderId?: Maybe<Scalars['Float']['output']>;
};

export type RiderAddressesConnection = {
  __typename?: 'RiderAddressesConnection';
  /** Array of nodes. */
  nodes: Array<RiderAddress>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type RiderAddressesCountAggregate = {
  __typename?: 'RiderAddressesCountAggregate';
  id?: Maybe<Scalars['Int']['output']>;
  riderId?: Maybe<Scalars['Int']['output']>;
};

export type RiderAddressesMaxAggregate = {
  __typename?: 'RiderAddressesMaxAggregate';
  id?: Maybe<Scalars['ID']['output']>;
  riderId?: Maybe<Scalars['ID']['output']>;
};

export type RiderAddressesMinAggregate = {
  __typename?: 'RiderAddressesMinAggregate';
  id?: Maybe<Scalars['ID']['output']>;
  riderId?: Maybe<Scalars['ID']['output']>;
};

export type RiderAddressesSumAggregate = {
  __typename?: 'RiderAddressesSumAggregate';
  id?: Maybe<Scalars['Float']['output']>;
  riderId?: Maybe<Scalars['Float']['output']>;
};

export type RiderAggregateFilter = {
  and?: InputMaybe<Array<RiderAggregateFilter>>;
  firstName?: InputMaybe<StringFieldComparison>;
  gender?: InputMaybe<GenderFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  lastName?: InputMaybe<StringFieldComparison>;
  mobileNumber?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<RiderAggregateFilter>>;
  status?: InputMaybe<RiderStatusFilterComparison>;
};

export type RiderAggregateGroupBy = {
  __typename?: 'RiderAggregateGroupBy';
  firstName?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Gender>;
  id?: Maybe<Scalars['ID']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  mobileNumber?: Maybe<Scalars['String']['output']>;
  status?: Maybe<RiderStatus>;
};

export type RiderAggregateResponse = {
  __typename?: 'RiderAggregateResponse';
  avg?: Maybe<RiderAvgAggregate>;
  count?: Maybe<RiderCountAggregate>;
  groupBy?: Maybe<RiderAggregateGroupBy>;
  max?: Maybe<RiderMaxAggregate>;
  min?: Maybe<RiderMinAggregate>;
  sum?: Maybe<RiderSumAggregate>;
};

export type RiderAvgAggregate = {
  __typename?: 'RiderAvgAggregate';
  id?: Maybe<Scalars['Float']['output']>;
};

export type RiderConnection = {
  __typename?: 'RiderConnection';
  /** Array of nodes. */
  nodes: Array<Rider>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type RiderCountAggregate = {
  __typename?: 'RiderCountAggregate';
  firstName?: Maybe<Scalars['Int']['output']>;
  gender?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  lastName?: Maybe<Scalars['Int']['output']>;
  mobileNumber?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
};

export enum RiderDeductTransactionType {
  CancellationFee = 'CancellationFee',
  Correction = 'Correction',
  OrderFee = 'OrderFee',
  ParkingFee = 'ParkingFee',
  Withdraw = 'Withdraw'
}

export type RiderDeductTransactionTypeFilterComparison = {
  eq?: InputMaybe<RiderDeductTransactionType>;
  gt?: InputMaybe<RiderDeductTransactionType>;
  gte?: InputMaybe<RiderDeductTransactionType>;
  iLike?: InputMaybe<RiderDeductTransactionType>;
  in?: InputMaybe<Array<RiderDeductTransactionType>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<RiderDeductTransactionType>;
  lt?: InputMaybe<RiderDeductTransactionType>;
  lte?: InputMaybe<RiderDeductTransactionType>;
  neq?: InputMaybe<RiderDeductTransactionType>;
  notILike?: InputMaybe<RiderDeductTransactionType>;
  notIn?: InputMaybe<Array<RiderDeductTransactionType>>;
  notLike?: InputMaybe<RiderDeductTransactionType>;
};

export type RiderFilter = {
  and?: InputMaybe<Array<RiderFilter>>;
  firstName?: InputMaybe<StringFieldComparison>;
  gender?: InputMaybe<GenderFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  lastName?: InputMaybe<StringFieldComparison>;
  mobileNumber?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<RiderFilter>>;
  status?: InputMaybe<RiderStatusFilterComparison>;
};

export type RiderInput = {
  countryIso?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Gender>;
  idNumber?: InputMaybe<Scalars['String']['input']>;
  isResident?: InputMaybe<Scalars['Boolean']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  mobileNumber?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  registrationTimestamp?: InputMaybe<Scalars['DateTime']['input']>;
  status?: InputMaybe<RiderStatus>;
};

export type RiderMaxAggregate = {
  __typename?: 'RiderMaxAggregate';
  firstName?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Gender>;
  id?: Maybe<Scalars['ID']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  mobileNumber?: Maybe<Scalars['String']['output']>;
  status?: Maybe<RiderStatus>;
};

export type RiderMinAggregate = {
  __typename?: 'RiderMinAggregate';
  firstName?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Gender>;
  id?: Maybe<Scalars['ID']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  mobileNumber?: Maybe<Scalars['String']['output']>;
  status?: Maybe<RiderStatus>;
};

export type RiderOrdersAggregateGroupBy = {
  __typename?: 'RiderOrdersAggregateGroupBy';
  costAfterCoupon?: Maybe<Scalars['Float']['output']>;
  costBest?: Maybe<Scalars['Float']['output']>;
  createdOn?: Maybe<Scalars['DateTime']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  distanceBest?: Maybe<Scalars['Int']['output']>;
  driverId?: Maybe<Scalars['ID']['output']>;
  durationBest?: Maybe<Scalars['Int']['output']>;
  fleetId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  paymentMode?: Maybe<PaymentMode>;
  regionId?: Maybe<Scalars['ID']['output']>;
  riderId?: Maybe<Scalars['ID']['output']>;
  serviceId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<OrderStatus>;
};

export type RiderOrdersAggregateResponse = {
  __typename?: 'RiderOrdersAggregateResponse';
  avg?: Maybe<RiderOrdersAvgAggregate>;
  count?: Maybe<RiderOrdersCountAggregate>;
  groupBy?: Maybe<RiderOrdersAggregateGroupBy>;
  max?: Maybe<RiderOrdersMaxAggregate>;
  min?: Maybe<RiderOrdersMinAggregate>;
  sum?: Maybe<RiderOrdersSumAggregate>;
};

export type RiderOrdersAvgAggregate = {
  __typename?: 'RiderOrdersAvgAggregate';
  costAfterCoupon?: Maybe<Scalars['Float']['output']>;
  costBest?: Maybe<Scalars['Float']['output']>;
  distanceBest?: Maybe<Scalars['Float']['output']>;
  driverId?: Maybe<Scalars['Float']['output']>;
  durationBest?: Maybe<Scalars['Float']['output']>;
  fleetId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  regionId?: Maybe<Scalars['Float']['output']>;
  riderId?: Maybe<Scalars['Float']['output']>;
  serviceId?: Maybe<Scalars['Float']['output']>;
};

export type RiderOrdersConnection = {
  __typename?: 'RiderOrdersConnection';
  /** Array of nodes. */
  nodes: Array<Order>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type RiderOrdersCountAggregate = {
  __typename?: 'RiderOrdersCountAggregate';
  costAfterCoupon?: Maybe<Scalars['Int']['output']>;
  costBest?: Maybe<Scalars['Int']['output']>;
  createdOn?: Maybe<Scalars['Int']['output']>;
  currency?: Maybe<Scalars['Int']['output']>;
  distanceBest?: Maybe<Scalars['Int']['output']>;
  driverId?: Maybe<Scalars['Int']['output']>;
  durationBest?: Maybe<Scalars['Int']['output']>;
  fleetId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  paymentMode?: Maybe<Scalars['Int']['output']>;
  regionId?: Maybe<Scalars['Int']['output']>;
  riderId?: Maybe<Scalars['Int']['output']>;
  serviceId?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
};

export type RiderOrdersMaxAggregate = {
  __typename?: 'RiderOrdersMaxAggregate';
  costAfterCoupon?: Maybe<Scalars['Float']['output']>;
  costBest?: Maybe<Scalars['Float']['output']>;
  createdOn?: Maybe<Scalars['DateTime']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  distanceBest?: Maybe<Scalars['Int']['output']>;
  driverId?: Maybe<Scalars['ID']['output']>;
  durationBest?: Maybe<Scalars['Int']['output']>;
  fleetId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  paymentMode?: Maybe<PaymentMode>;
  regionId?: Maybe<Scalars['ID']['output']>;
  riderId?: Maybe<Scalars['ID']['output']>;
  serviceId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<OrderStatus>;
};

export type RiderOrdersMinAggregate = {
  __typename?: 'RiderOrdersMinAggregate';
  costAfterCoupon?: Maybe<Scalars['Float']['output']>;
  costBest?: Maybe<Scalars['Float']['output']>;
  createdOn?: Maybe<Scalars['DateTime']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  distanceBest?: Maybe<Scalars['Int']['output']>;
  driverId?: Maybe<Scalars['ID']['output']>;
  durationBest?: Maybe<Scalars['Int']['output']>;
  fleetId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  paymentMode?: Maybe<PaymentMode>;
  regionId?: Maybe<Scalars['ID']['output']>;
  riderId?: Maybe<Scalars['ID']['output']>;
  serviceId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<OrderStatus>;
};

export type RiderOrdersSumAggregate = {
  __typename?: 'RiderOrdersSumAggregate';
  costAfterCoupon?: Maybe<Scalars['Float']['output']>;
  costBest?: Maybe<Scalars['Float']['output']>;
  distanceBest?: Maybe<Scalars['Float']['output']>;
  driverId?: Maybe<Scalars['Float']['output']>;
  durationBest?: Maybe<Scalars['Float']['output']>;
  fleetId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  regionId?: Maybe<Scalars['Float']['output']>;
  riderId?: Maybe<Scalars['Float']['output']>;
  serviceId?: Maybe<Scalars['Float']['output']>;
};

export type RiderParkingWalletsAggregateGroupBy = {
  __typename?: 'RiderParkingWalletsAggregateGroupBy';
  balance?: Maybe<Scalars['Float']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  customerId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type RiderParkingWalletsAggregateResponse = {
  __typename?: 'RiderParkingWalletsAggregateResponse';
  avg?: Maybe<RiderParkingWalletsAvgAggregate>;
  count?: Maybe<RiderParkingWalletsCountAggregate>;
  groupBy?: Maybe<RiderParkingWalletsAggregateGroupBy>;
  max?: Maybe<RiderParkingWalletsMaxAggregate>;
  min?: Maybe<RiderParkingWalletsMinAggregate>;
  sum?: Maybe<RiderParkingWalletsSumAggregate>;
};

export type RiderParkingWalletsAvgAggregate = {
  __typename?: 'RiderParkingWalletsAvgAggregate';
  balance?: Maybe<Scalars['Float']['output']>;
  customerId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

export type RiderParkingWalletsCountAggregate = {
  __typename?: 'RiderParkingWalletsCountAggregate';
  balance?: Maybe<Scalars['Int']['output']>;
  currency?: Maybe<Scalars['Int']['output']>;
  customerId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
};

export type RiderParkingWalletsMaxAggregate = {
  __typename?: 'RiderParkingWalletsMaxAggregate';
  balance?: Maybe<Scalars['Float']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  customerId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type RiderParkingWalletsMinAggregate = {
  __typename?: 'RiderParkingWalletsMinAggregate';
  balance?: Maybe<Scalars['Float']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  customerId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type RiderParkingWalletsSumAggregate = {
  __typename?: 'RiderParkingWalletsSumAggregate';
  balance?: Maybe<Scalars['Float']['output']>;
  customerId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

export enum RiderRechargeTransactionType {
  BankTransfer = 'BankTransfer',
  Correction = 'Correction',
  Gift = 'Gift',
  InAppPayment = 'InAppPayment'
}

export type RiderRechargeTransactionTypeFilterComparison = {
  eq?: InputMaybe<RiderRechargeTransactionType>;
  gt?: InputMaybe<RiderRechargeTransactionType>;
  gte?: InputMaybe<RiderRechargeTransactionType>;
  iLike?: InputMaybe<RiderRechargeTransactionType>;
  in?: InputMaybe<Array<RiderRechargeTransactionType>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<RiderRechargeTransactionType>;
  lt?: InputMaybe<RiderRechargeTransactionType>;
  lte?: InputMaybe<RiderRechargeTransactionType>;
  neq?: InputMaybe<RiderRechargeTransactionType>;
  notILike?: InputMaybe<RiderRechargeTransactionType>;
  notIn?: InputMaybe<Array<RiderRechargeTransactionType>>;
  notLike?: InputMaybe<RiderRechargeTransactionType>;
};

export type RiderSort = {
  direction: SortDirection;
  field: RiderSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum RiderSortFields {
  FirstName = 'firstName',
  Gender = 'gender',
  Id = 'id',
  LastName = 'lastName',
  MobileNumber = 'mobileNumber',
  Status = 'status'
}

export enum RiderStatus {
  Disabled = 'Disabled',
  Enabled = 'Enabled'
}

export type RiderStatusFilterComparison = {
  eq?: InputMaybe<RiderStatus>;
  gt?: InputMaybe<RiderStatus>;
  gte?: InputMaybe<RiderStatus>;
  iLike?: InputMaybe<RiderStatus>;
  in?: InputMaybe<Array<RiderStatus>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<RiderStatus>;
  lt?: InputMaybe<RiderStatus>;
  lte?: InputMaybe<RiderStatus>;
  neq?: InputMaybe<RiderStatus>;
  notILike?: InputMaybe<RiderStatus>;
  notIn?: InputMaybe<Array<RiderStatus>>;
  notLike?: InputMaybe<RiderStatus>;
};

export type RiderSumAggregate = {
  __typename?: 'RiderSumAggregate';
  id?: Maybe<Scalars['Float']['output']>;
};

export type RiderTransaction = {
  __typename?: 'RiderTransaction';
  action: TransactionAction;
  amount: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  currency: Scalars['String']['output'];
  deductType?: Maybe<RiderDeductTransactionType>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  operator?: Maybe<Operator>;
  operatorId?: Maybe<Scalars['ID']['output']>;
  parkOrderCustomerId?: Maybe<Scalars['ID']['output']>;
  parkOrderParkOwnerId?: Maybe<Scalars['ID']['output']>;
  paymentGateway?: Maybe<PaymentGateway>;
  paymentGatewayId?: Maybe<Scalars['ID']['output']>;
  rechargeType?: Maybe<RiderRechargeTransactionType>;
  refrenceNumber?: Maybe<Scalars['String']['output']>;
  requestId?: Maybe<Scalars['ID']['output']>;
  rider: Rider;
  riderId: Scalars['ID']['output'];
  savedPaymentMethod?: Maybe<SavedPaymentMethod>;
  savedPaymentMethodId?: Maybe<Scalars['ID']['output']>;
  shopOrderId?: Maybe<Scalars['ID']['output']>;
  status: TransactionStatus;
};

export type RiderTransactionAggregateFilter = {
  action?: InputMaybe<TransactionActionFilterComparison>;
  amount?: InputMaybe<FloatFieldComparison>;
  and?: InputMaybe<Array<RiderTransactionAggregateFilter>>;
  createdAt?: InputMaybe<DateFieldComparison>;
  currency?: InputMaybe<StringFieldComparison>;
  deductType?: InputMaybe<RiderDeductTransactionTypeFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  operatorId?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<RiderTransactionAggregateFilter>>;
  parkOrderCustomerId?: InputMaybe<IdFilterComparison>;
  parkOrderParkOwnerId?: InputMaybe<IdFilterComparison>;
  paymentGatewayId?: InputMaybe<IdFilterComparison>;
  rechargeType?: InputMaybe<RiderRechargeTransactionTypeFilterComparison>;
  requestId?: InputMaybe<IdFilterComparison>;
  riderId?: InputMaybe<IdFilterComparison>;
  savedPaymentMethodId?: InputMaybe<IdFilterComparison>;
  shopOrderId?: InputMaybe<IdFilterComparison>;
  status?: InputMaybe<TransactionStatusFilterComparison>;
};

export type RiderTransactionConnection = {
  __typename?: 'RiderTransactionConnection';
  /** Array of nodes. */
  nodes: Array<RiderTransaction>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type RiderTransactionFilter = {
  action?: InputMaybe<TransactionActionFilterComparison>;
  amount?: InputMaybe<FloatFieldComparison>;
  and?: InputMaybe<Array<RiderTransactionFilter>>;
  createdAt?: InputMaybe<DateFieldComparison>;
  currency?: InputMaybe<StringFieldComparison>;
  deductType?: InputMaybe<RiderDeductTransactionTypeFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  operatorId?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<RiderTransactionFilter>>;
  parkOrderCustomerId?: InputMaybe<IdFilterComparison>;
  parkOrderParkOwnerId?: InputMaybe<IdFilterComparison>;
  paymentGatewayId?: InputMaybe<IdFilterComparison>;
  rechargeType?: InputMaybe<RiderRechargeTransactionTypeFilterComparison>;
  requestId?: InputMaybe<IdFilterComparison>;
  riderId?: InputMaybe<IdFilterComparison>;
  savedPaymentMethodId?: InputMaybe<IdFilterComparison>;
  shopOrderId?: InputMaybe<IdFilterComparison>;
  status?: InputMaybe<TransactionStatusFilterComparison>;
};

export type RiderTransactionInput = {
  action: TransactionAction;
  amount: Scalars['Float']['input'];
  currency: Scalars['String']['input'];
  deductType?: InputMaybe<RiderDeductTransactionType>;
  description?: InputMaybe<Scalars['String']['input']>;
  rechargeType?: InputMaybe<RiderRechargeTransactionType>;
  refrenceNumber?: InputMaybe<Scalars['String']['input']>;
  riderId: Scalars['ID']['input'];
};

export type RiderTransactionSort = {
  direction: SortDirection;
  field: RiderTransactionSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum RiderTransactionSortFields {
  Action = 'action',
  Amount = 'amount',
  CreatedAt = 'createdAt',
  Currency = 'currency',
  DeductType = 'deductType',
  Id = 'id',
  OperatorId = 'operatorId',
  ParkOrderCustomerId = 'parkOrderCustomerId',
  ParkOrderParkOwnerId = 'parkOrderParkOwnerId',
  PaymentGatewayId = 'paymentGatewayId',
  RechargeType = 'rechargeType',
  RequestId = 'requestId',
  RiderId = 'riderId',
  SavedPaymentMethodId = 'savedPaymentMethodId',
  ShopOrderId = 'shopOrderId',
  Status = 'status'
}

export type RiderTransactionsAggregateGroupBy = {
  __typename?: 'RiderTransactionsAggregateGroupBy';
  action?: Maybe<TransactionAction>;
  amount?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  deductType?: Maybe<RiderDeductTransactionType>;
  id?: Maybe<Scalars['ID']['output']>;
  operatorId?: Maybe<Scalars['ID']['output']>;
  parkOrderCustomerId?: Maybe<Scalars['ID']['output']>;
  parkOrderParkOwnerId?: Maybe<Scalars['ID']['output']>;
  paymentGatewayId?: Maybe<Scalars['ID']['output']>;
  rechargeType?: Maybe<RiderRechargeTransactionType>;
  requestId?: Maybe<Scalars['ID']['output']>;
  riderId?: Maybe<Scalars['ID']['output']>;
  savedPaymentMethodId?: Maybe<Scalars['ID']['output']>;
  shopOrderId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<TransactionStatus>;
};

export type RiderTransactionsAggregateResponse = {
  __typename?: 'RiderTransactionsAggregateResponse';
  avg?: Maybe<RiderTransactionsAvgAggregate>;
  count?: Maybe<RiderTransactionsCountAggregate>;
  groupBy?: Maybe<RiderTransactionsAggregateGroupBy>;
  max?: Maybe<RiderTransactionsMaxAggregate>;
  min?: Maybe<RiderTransactionsMinAggregate>;
  sum?: Maybe<RiderTransactionsSumAggregate>;
};

export type RiderTransactionsAvgAggregate = {
  __typename?: 'RiderTransactionsAvgAggregate';
  amount?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  operatorId?: Maybe<Scalars['Float']['output']>;
  parkOrderCustomerId?: Maybe<Scalars['Float']['output']>;
  parkOrderParkOwnerId?: Maybe<Scalars['Float']['output']>;
  paymentGatewayId?: Maybe<Scalars['Float']['output']>;
  requestId?: Maybe<Scalars['Float']['output']>;
  riderId?: Maybe<Scalars['Float']['output']>;
  savedPaymentMethodId?: Maybe<Scalars['Float']['output']>;
  shopOrderId?: Maybe<Scalars['Float']['output']>;
};

export type RiderTransactionsConnection = {
  __typename?: 'RiderTransactionsConnection';
  /** Array of nodes. */
  nodes: Array<RiderTransaction>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type RiderTransactionsCountAggregate = {
  __typename?: 'RiderTransactionsCountAggregate';
  action?: Maybe<Scalars['Int']['output']>;
  amount?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['Int']['output']>;
  currency?: Maybe<Scalars['Int']['output']>;
  deductType?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  operatorId?: Maybe<Scalars['Int']['output']>;
  parkOrderCustomerId?: Maybe<Scalars['Int']['output']>;
  parkOrderParkOwnerId?: Maybe<Scalars['Int']['output']>;
  paymentGatewayId?: Maybe<Scalars['Int']['output']>;
  rechargeType?: Maybe<Scalars['Int']['output']>;
  requestId?: Maybe<Scalars['Int']['output']>;
  riderId?: Maybe<Scalars['Int']['output']>;
  savedPaymentMethodId?: Maybe<Scalars['Int']['output']>;
  shopOrderId?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
};

export type RiderTransactionsMaxAggregate = {
  __typename?: 'RiderTransactionsMaxAggregate';
  action?: Maybe<TransactionAction>;
  amount?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  deductType?: Maybe<RiderDeductTransactionType>;
  id?: Maybe<Scalars['ID']['output']>;
  operatorId?: Maybe<Scalars['ID']['output']>;
  parkOrderCustomerId?: Maybe<Scalars['ID']['output']>;
  parkOrderParkOwnerId?: Maybe<Scalars['ID']['output']>;
  paymentGatewayId?: Maybe<Scalars['ID']['output']>;
  rechargeType?: Maybe<RiderRechargeTransactionType>;
  requestId?: Maybe<Scalars['ID']['output']>;
  riderId?: Maybe<Scalars['ID']['output']>;
  savedPaymentMethodId?: Maybe<Scalars['ID']['output']>;
  shopOrderId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<TransactionStatus>;
};

export type RiderTransactionsMinAggregate = {
  __typename?: 'RiderTransactionsMinAggregate';
  action?: Maybe<TransactionAction>;
  amount?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  deductType?: Maybe<RiderDeductTransactionType>;
  id?: Maybe<Scalars['ID']['output']>;
  operatorId?: Maybe<Scalars['ID']['output']>;
  parkOrderCustomerId?: Maybe<Scalars['ID']['output']>;
  parkOrderParkOwnerId?: Maybe<Scalars['ID']['output']>;
  paymentGatewayId?: Maybe<Scalars['ID']['output']>;
  rechargeType?: Maybe<RiderRechargeTransactionType>;
  requestId?: Maybe<Scalars['ID']['output']>;
  riderId?: Maybe<Scalars['ID']['output']>;
  savedPaymentMethodId?: Maybe<Scalars['ID']['output']>;
  shopOrderId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<TransactionStatus>;
};

export type RiderTransactionsSumAggregate = {
  __typename?: 'RiderTransactionsSumAggregate';
  amount?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  operatorId?: Maybe<Scalars['Float']['output']>;
  parkOrderCustomerId?: Maybe<Scalars['Float']['output']>;
  parkOrderParkOwnerId?: Maybe<Scalars['Float']['output']>;
  paymentGatewayId?: Maybe<Scalars['Float']['output']>;
  requestId?: Maybe<Scalars['Float']['output']>;
  riderId?: Maybe<Scalars['Float']['output']>;
  savedPaymentMethodId?: Maybe<Scalars['Float']['output']>;
  shopOrderId?: Maybe<Scalars['Float']['output']>;
};

export type RiderWallet = {
  __typename?: 'RiderWallet';
  balance: Scalars['Float']['output'];
  currency: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  rider?: Maybe<Rider>;
  riderId: Scalars['ID']['output'];
};

export type RiderWalletAggregateFilter = {
  and?: InputMaybe<Array<RiderWalletAggregateFilter>>;
  balance?: InputMaybe<FloatFieldComparison>;
  currency?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<RiderWalletAggregateFilter>>;
  riderId?: InputMaybe<IdFilterComparison>;
};

export type RiderWalletAggregateGroupBy = {
  __typename?: 'RiderWalletAggregateGroupBy';
  balance?: Maybe<Scalars['Float']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  riderId?: Maybe<Scalars['ID']['output']>;
};

export type RiderWalletAggregateResponse = {
  __typename?: 'RiderWalletAggregateResponse';
  avg?: Maybe<RiderWalletAvgAggregate>;
  count?: Maybe<RiderWalletCountAggregate>;
  groupBy?: Maybe<RiderWalletAggregateGroupBy>;
  max?: Maybe<RiderWalletMaxAggregate>;
  min?: Maybe<RiderWalletMinAggregate>;
  sum?: Maybe<RiderWalletSumAggregate>;
};

export type RiderWalletAvgAggregate = {
  __typename?: 'RiderWalletAvgAggregate';
  balance?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  riderId?: Maybe<Scalars['Float']['output']>;
};

export type RiderWalletConnection = {
  __typename?: 'RiderWalletConnection';
  /** Array of nodes. */
  nodes: Array<RiderWallet>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type RiderWalletCountAggregate = {
  __typename?: 'RiderWalletCountAggregate';
  balance?: Maybe<Scalars['Int']['output']>;
  currency?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  riderId?: Maybe<Scalars['Int']['output']>;
};

export type RiderWalletFilter = {
  and?: InputMaybe<Array<RiderWalletFilter>>;
  balance?: InputMaybe<FloatFieldComparison>;
  currency?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<RiderWalletFilter>>;
  riderId?: InputMaybe<IdFilterComparison>;
};

export type RiderWalletMaxAggregate = {
  __typename?: 'RiderWalletMaxAggregate';
  balance?: Maybe<Scalars['Float']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  riderId?: Maybe<Scalars['ID']['output']>;
};

export type RiderWalletMinAggregate = {
  __typename?: 'RiderWalletMinAggregate';
  balance?: Maybe<Scalars['Float']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  riderId?: Maybe<Scalars['ID']['output']>;
};

export type RiderWalletSort = {
  direction: SortDirection;
  field: RiderWalletSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum RiderWalletSortFields {
  Balance = 'balance',
  Currency = 'currency',
  Id = 'id',
  RiderId = 'riderId'
}

export type RiderWalletSumAggregate = {
  __typename?: 'RiderWalletSumAggregate';
  balance?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  riderId?: Maybe<Scalars['Float']['output']>;
};

export type RunAutoPayoutInput = {
  payoutMethodId: Scalars['ID']['input'];
  payoutSessionId: Scalars['ID']['input'];
};

export type Sms = {
  __typename?: 'SMS';
  countryIsoCode: Scalars['String']['output'];
  from: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  message: Scalars['String']['output'];
  providerId: Scalars['ID']['output'];
  status: SmsStatus;
  to: Scalars['String']['output'];
  type: SmsType;
};

export type SmsAggregateFilter = {
  and?: InputMaybe<Array<SmsAggregateFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<SmsAggregateFilter>>;
};

export type SmsConnection = {
  __typename?: 'SMSConnection';
  /** Array of nodes. */
  nodes: Array<Sms>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type SmsDeleteFilter = {
  and?: InputMaybe<Array<SmsDeleteFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<SmsDeleteFilter>>;
};

export type SmsDeleteResponse = {
  __typename?: 'SMSDeleteResponse';
  countryIsoCode?: Maybe<Scalars['String']['output']>;
  from?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  providerId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<SmsStatus>;
  to?: Maybe<Scalars['String']['output']>;
  type?: Maybe<SmsType>;
};

export type SmsFilter = {
  and?: InputMaybe<Array<SmsFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<SmsFilter>>;
};

/** SMS Provider */
export type SmsProvider = {
  __typename?: 'SMSProvider';
  accountId: Scalars['ID']['output'];
  authToken?: Maybe<Scalars['String']['output']>;
  fromNumber?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isDefault: Scalars['Boolean']['output'];
  messages: SmsProviderMessagesConnection;
  messagesAggregate: Array<SmsProviderMessagesAggregateResponse>;
  name: Scalars['String']['output'];
  smsType?: Maybe<Scalars['String']['output']>;
  type: SmsProviderType;
  verificationTemplate?: Maybe<Scalars['String']['output']>;
};


/** SMS Provider */
export type SmsProviderMessagesArgs = {
  filter?: SmsFilter;
  paging?: OffsetPaging;
  sorting?: Array<SmsSort>;
};


/** SMS Provider */
export type SmsProviderMessagesAggregateArgs = {
  filter?: InputMaybe<SmsAggregateFilter>;
};

export type SmsProviderConnection = {
  __typename?: 'SMSProviderConnection';
  /** Array of nodes. */
  nodes: Array<SmsProvider>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type SmsProviderDeleteFilter = {
  and?: InputMaybe<Array<SmsProviderDeleteFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<SmsProviderDeleteFilter>>;
  type?: InputMaybe<SmsProviderTypeFilterComparison>;
};

export type SmsProviderDeleteResponse = {
  __typename?: 'SMSProviderDeleteResponse';
  accountId?: Maybe<Scalars['ID']['output']>;
  authToken?: Maybe<Scalars['String']['output']>;
  fromNumber?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  isDefault?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  smsType?: Maybe<Scalars['String']['output']>;
  type?: Maybe<SmsProviderType>;
  verificationTemplate?: Maybe<Scalars['String']['output']>;
};

export type SmsProviderFilter = {
  and?: InputMaybe<Array<SmsProviderFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<SmsProviderFilter>>;
  type?: InputMaybe<SmsProviderTypeFilterComparison>;
};

export type SmsProviderInput = {
  accountId?: InputMaybe<Scalars['String']['input']>;
  authToken?: InputMaybe<Scalars['String']['input']>;
  fromNumber?: InputMaybe<Scalars['String']['input']>;
  isDefault?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  smsType?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<SmsProviderType>;
  verificationTemplate?: InputMaybe<Scalars['String']['input']>;
};

export type SmsProviderMessagesAggregateGroupBy = {
  __typename?: 'SMSProviderMessagesAggregateGroupBy';
  id?: Maybe<Scalars['ID']['output']>;
};

export type SmsProviderMessagesAggregateResponse = {
  __typename?: 'SMSProviderMessagesAggregateResponse';
  avg?: Maybe<SmsProviderMessagesAvgAggregate>;
  count?: Maybe<SmsProviderMessagesCountAggregate>;
  groupBy?: Maybe<SmsProviderMessagesAggregateGroupBy>;
  max?: Maybe<SmsProviderMessagesMaxAggregate>;
  min?: Maybe<SmsProviderMessagesMinAggregate>;
  sum?: Maybe<SmsProviderMessagesSumAggregate>;
};

export type SmsProviderMessagesAvgAggregate = {
  __typename?: 'SMSProviderMessagesAvgAggregate';
  id?: Maybe<Scalars['Float']['output']>;
};

export type SmsProviderMessagesConnection = {
  __typename?: 'SMSProviderMessagesConnection';
  /** Array of nodes. */
  nodes: Array<Sms>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type SmsProviderMessagesCountAggregate = {
  __typename?: 'SMSProviderMessagesCountAggregate';
  id?: Maybe<Scalars['Int']['output']>;
};

export type SmsProviderMessagesMaxAggregate = {
  __typename?: 'SMSProviderMessagesMaxAggregate';
  id?: Maybe<Scalars['ID']['output']>;
};

export type SmsProviderMessagesMinAggregate = {
  __typename?: 'SMSProviderMessagesMinAggregate';
  id?: Maybe<Scalars['ID']['output']>;
};

export type SmsProviderMessagesSumAggregate = {
  __typename?: 'SMSProviderMessagesSumAggregate';
  id?: Maybe<Scalars['Float']['output']>;
};

export type SmsProviderSort = {
  direction: SortDirection;
  field: SmsProviderSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum SmsProviderSortFields {
  Id = 'id',
  Name = 'name',
  Type = 'type'
}

/** The type of the SMS provider */
export enum SmsProviderType {
  BroadNet = 'BroadNet',
  ClickSend = 'ClickSend',
  Firebase = 'Firebase',
  Infobip = 'Infobip',
  MessageBird = 'MessageBird',
  Pahappa = 'Pahappa',
  Plivo = 'Plivo',
  Twilio = 'Twilio',
  VentisSms = 'VentisSMS',
  Vonage = 'Vonage'
}

export type SmsProviderTypeFilterComparison = {
  eq?: InputMaybe<SmsProviderType>;
  gt?: InputMaybe<SmsProviderType>;
  gte?: InputMaybe<SmsProviderType>;
  iLike?: InputMaybe<SmsProviderType>;
  in?: InputMaybe<Array<SmsProviderType>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<SmsProviderType>;
  lt?: InputMaybe<SmsProviderType>;
  lte?: InputMaybe<SmsProviderType>;
  neq?: InputMaybe<SmsProviderType>;
  notILike?: InputMaybe<SmsProviderType>;
  notIn?: InputMaybe<Array<SmsProviderType>>;
  notLike?: InputMaybe<SmsProviderType>;
};

export type SmsProviderUpdateFilter = {
  and?: InputMaybe<Array<SmsProviderUpdateFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<SmsProviderUpdateFilter>>;
  type?: InputMaybe<SmsProviderTypeFilterComparison>;
};

export type SmsSort = {
  direction: SortDirection;
  field: SmsSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum SmsSortFields {
  Id = 'id'
}

export enum SmsStatus {
  Delivered = 'DELIVERED',
  Expired = 'EXPIRED',
  Failed = 'FAILED',
  Pending = 'PENDING',
  Rejected = 'REJECTED',
  Sent = 'SENT',
  Undelivered = 'UNDELIVERED'
}

export enum SmsType {
  Notification = 'NOTIFICATION',
  Otp = 'OTP',
  Promotional = 'PROMOTIONAL',
  Transactional = 'TRANSACTIONAL'
}

export type SmsUpdateFilter = {
  and?: InputMaybe<Array<SmsUpdateFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<SmsUpdateFilter>>;
};

export type SosActivity = {
  __typename?: 'SOSActivity';
  action: SosActivityAction;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  note?: Maybe<Scalars['String']['output']>;
  operator: Operator;
  operatorId: Scalars['ID']['output'];
};

export enum SosActivityAction {
  ContactAuthorities = 'ContactAuthorities',
  ContactDriver = 'ContactDriver',
  MarkedAsFalseAlarm = 'MarkedAsFalseAlarm',
  MarkedAsResolved = 'MarkedAsResolved',
  Seen = 'Seen',
  Submitted = 'Submitted'
}

export type SosActivityAggregateFilter = {
  and?: InputMaybe<Array<SosActivityAggregateFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<SosActivityAggregateFilter>>;
};

export type SosActivityFilter = {
  and?: InputMaybe<Array<SosActivityFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<SosActivityFilter>>;
};

export type SosActivitySort = {
  direction: SortDirection;
  field: SosActivitySortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum SosActivitySortFields {
  Id = 'id'
}

export type SosReason = {
  __typename?: 'SOSReason';
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  sos: SosReasonSosConnection;
  sosAggregate: Array<SosReasonSosAggregateResponse>;
};


export type SosReasonSosArgs = {
  filter?: DistressSignalFilter;
  paging?: OffsetPaging;
  sorting?: Array<DistressSignalSort>;
};


export type SosReasonSosAggregateArgs = {
  filter?: InputMaybe<DistressSignalAggregateFilter>;
};

export type SosReasonConnection = {
  __typename?: 'SOSReasonConnection';
  /** Array of nodes. */
  nodes: Array<SosReason>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type SosReasonDeleteResponse = {
  __typename?: 'SOSReasonDeleteResponse';
  id?: Maybe<Scalars['ID']['output']>;
  isActive?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type SosReasonFilter = {
  and?: InputMaybe<Array<SosReasonFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  isActive?: InputMaybe<BooleanFieldComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<SosReasonFilter>>;
};

export type SosReasonSort = {
  direction: SortDirection;
  field: SosReasonSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum SosReasonSortFields {
  Id = 'id',
  IsActive = 'isActive',
  Name = 'name'
}

export type SosReasonSosAggregateGroupBy = {
  __typename?: 'SOSReasonSosAggregateGroupBy';
  id?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<SosStatus>;
};

export type SosReasonSosAggregateResponse = {
  __typename?: 'SOSReasonSosAggregateResponse';
  avg?: Maybe<SosReasonSosAvgAggregate>;
  count?: Maybe<SosReasonSosCountAggregate>;
  groupBy?: Maybe<SosReasonSosAggregateGroupBy>;
  max?: Maybe<SosReasonSosMaxAggregate>;
  min?: Maybe<SosReasonSosMinAggregate>;
  sum?: Maybe<SosReasonSosSumAggregate>;
};

export type SosReasonSosAvgAggregate = {
  __typename?: 'SOSReasonSosAvgAggregate';
  id?: Maybe<Scalars['Float']['output']>;
};

export type SosReasonSosConnection = {
  __typename?: 'SOSReasonSosConnection';
  /** Array of nodes. */
  nodes: Array<DistressSignal>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type SosReasonSosCountAggregate = {
  __typename?: 'SOSReasonSosCountAggregate';
  id?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
};

export type SosReasonSosMaxAggregate = {
  __typename?: 'SOSReasonSosMaxAggregate';
  id?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<SosStatus>;
};

export type SosReasonSosMinAggregate = {
  __typename?: 'SOSReasonSosMinAggregate';
  id?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<SosStatus>;
};

export type SosReasonSosSumAggregate = {
  __typename?: 'SOSReasonSosSumAggregate';
  id?: Maybe<Scalars['Float']['output']>;
};

export enum SosStatus {
  FalseAlarm = 'FalseAlarm',
  Resolved = 'Resolved',
  Submitted = 'Submitted',
  UnderReview = 'UnderReview'
}

export type SosStatusFilterComparison = {
  eq?: InputMaybe<SosStatus>;
  gt?: InputMaybe<SosStatus>;
  gte?: InputMaybe<SosStatus>;
  iLike?: InputMaybe<SosStatus>;
  in?: InputMaybe<Array<SosStatus>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<SosStatus>;
  lt?: InputMaybe<SosStatus>;
  lte?: InputMaybe<SosStatus>;
  neq?: InputMaybe<SosStatus>;
  notILike?: InputMaybe<SosStatus>;
  notIn?: InputMaybe<Array<SosStatus>>;
  notLike?: InputMaybe<SosStatus>;
};

export type SavedPaymentMethod = {
  __typename?: 'SavedPaymentMethod';
  driverId?: Maybe<Scalars['ID']['output']>;
  expiryDate?: Maybe<Scalars['DateTime']['output']>;
  holderName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isDefault: Scalars['Boolean']['output'];
  lastFour?: Maybe<Scalars['String']['output']>;
  providerBrand?: Maybe<ProviderBrand>;
  riderId?: Maybe<Scalars['ID']['output']>;
  title: Scalars['String']['output'];
  type: SavedPaymentMethodType;
};

export type SavedPaymentMethodConnection = {
  __typename?: 'SavedPaymentMethodConnection';
  /** Array of nodes. */
  nodes: Array<SavedPaymentMethod>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type SavedPaymentMethodDeleteResponse = {
  __typename?: 'SavedPaymentMethodDeleteResponse';
  driverId?: Maybe<Scalars['ID']['output']>;
  expiryDate?: Maybe<Scalars['DateTime']['output']>;
  holderName?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  isDefault?: Maybe<Scalars['Boolean']['output']>;
  lastFour?: Maybe<Scalars['String']['output']>;
  providerBrand?: Maybe<ProviderBrand>;
  riderId?: Maybe<Scalars['ID']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  type?: Maybe<SavedPaymentMethodType>;
};

export type SavedPaymentMethodFilter = {
  and?: InputMaybe<Array<SavedPaymentMethodFilter>>;
  driverId?: InputMaybe<IdFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  isEnabled?: InputMaybe<BooleanFieldComparison>;
  or?: InputMaybe<Array<SavedPaymentMethodFilter>>;
  riderId?: InputMaybe<IdFilterComparison>;
};

export type SavedPaymentMethodSort = {
  direction: SortDirection;
  field: SavedPaymentMethodSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum SavedPaymentMethodSortFields {
  DriverId = 'driverId',
  Id = 'id',
  IsEnabled = 'isEnabled',
  RiderId = 'riderId'
}

/** Saved payment method type */
export enum SavedPaymentMethodType {
  BankAccount = 'BANK_ACCOUNT',
  Card = 'CARD'
}

export type Service = {
  __typename?: 'Service';
  baseFare: Scalars['Float']['output'];
  cancellationDriverShare: Scalars['Float']['output'];
  cancellationTotalFee: Scalars['Float']['output'];
  categoryId: Scalars['ID']['output'];
  dateRangeMultipliers: Array<DateRangeMultiplier>;
  description?: Maybe<Scalars['String']['output']>;
  distanceMultipliers: Array<DistanceMultiplier>;
  id: Scalars['ID']['output'];
  maximumDestinationDistance: Scalars['Int']['output'];
  media: Media;
  mediaId: Scalars['ID']['output'];
  minimumFee: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  options: Array<ServiceOption>;
  orderTypes: Array<TaxiOrderType>;
  paymentMethod: ServicePaymentMethod;
  perHundredMeters: Scalars['Float']['output'];
  perMinuteDrive: Scalars['Float']['output'];
  perMinuteWait: Scalars['Float']['output'];
  personCapacity?: Maybe<Scalars['Int']['output']>;
  prepayPercent: Scalars['Float']['output'];
  providerShareFlat: Scalars['Float']['output'];
  providerSharePercent: Scalars['Int']['output'];
  regions: Array<Region>;
  roundingFactor?: Maybe<Scalars['Float']['output']>;
  searchRadius: Scalars['Int']['output'];
  timeMultipliers: Array<TimeMultiplier>;
  twoWayAvailable: Scalars['Boolean']['output'];
  weekdayMultipliers: Array<WeekdayMultiplier>;
};


export type ServiceOptionsArgs = {
  filter?: ServiceOptionFilter;
  sorting?: Array<ServiceOptionSort>;
};


export type ServiceRegionsArgs = {
  filter?: RegionFilter;
  sorting?: Array<RegionSort>;
};

export type ServiceCategory = {
  __typename?: 'ServiceCategory';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  services: Array<Service>;
};


export type ServiceCategoryServicesArgs = {
  filter?: ServiceFilter;
  sorting?: Array<ServiceSort>;
};

export type ServiceCategoryDeleteResponse = {
  __typename?: 'ServiceCategoryDeleteResponse';
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type ServiceCategoryFilter = {
  and?: InputMaybe<Array<ServiceCategoryFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ServiceCategoryFilter>>;
};

export type ServiceCategoryInput = {
  enabled?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type ServiceCategorySort = {
  direction: SortDirection;
  field: ServiceCategorySortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum ServiceCategorySortFields {
  Id = 'id'
}

export type ServiceCategoryWithCost = {
  __typename?: 'ServiceCategoryWithCost';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  services: Array<ServiceWithCost>;
};

export type ServiceDeleteResponse = {
  __typename?: 'ServiceDeleteResponse';
  baseFare?: Maybe<Scalars['Float']['output']>;
  cancellationDriverShare?: Maybe<Scalars['Float']['output']>;
  cancellationTotalFee?: Maybe<Scalars['Float']['output']>;
  categoryId?: Maybe<Scalars['ID']['output']>;
  dateRangeMultipliers?: Maybe<Array<DateRangeMultiplier>>;
  description?: Maybe<Scalars['String']['output']>;
  distanceMultipliers?: Maybe<Array<DistanceMultiplier>>;
  id?: Maybe<Scalars['ID']['output']>;
  maximumDestinationDistance?: Maybe<Scalars['Int']['output']>;
  mediaId?: Maybe<Scalars['ID']['output']>;
  minimumFee?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  orderTypes?: Maybe<Array<TaxiOrderType>>;
  paymentMethod?: Maybe<ServicePaymentMethod>;
  perHundredMeters?: Maybe<Scalars['Float']['output']>;
  perMinuteDrive?: Maybe<Scalars['Float']['output']>;
  perMinuteWait?: Maybe<Scalars['Float']['output']>;
  personCapacity?: Maybe<Scalars['Int']['output']>;
  prepayPercent?: Maybe<Scalars['Float']['output']>;
  providerShareFlat?: Maybe<Scalars['Float']['output']>;
  providerSharePercent?: Maybe<Scalars['Int']['output']>;
  roundingFactor?: Maybe<Scalars['Float']['output']>;
  searchRadius?: Maybe<Scalars['Int']['output']>;
  timeMultipliers?: Maybe<Array<TimeMultiplier>>;
  twoWayAvailable?: Maybe<Scalars['Boolean']['output']>;
  weekdayMultipliers?: Maybe<Array<WeekdayMultiplier>>;
};

export type ServiceFilter = {
  and?: InputMaybe<Array<ServiceFilter>>;
  categoryId?: InputMaybe<IdFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<ServiceFilter>>;
};

export type ServiceInput = {
  baseFare: Scalars['Float']['input'];
  cancellationDriverShare: Scalars['Float']['input'];
  cancellationTotalFee: Scalars['Float']['input'];
  categoryId: Scalars['ID']['input'];
  dateRangeMultipliers: Array<DateRangeMultiplierInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  distanceMultipliers: Array<DistanceMultiplierInput>;
  maximumDestinationDistance: Scalars['Int']['input'];
  mediaId: Scalars['ID']['input'];
  minimumFee: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  orderTypes?: Array<TaxiOrderType>;
  paymentMethod: ServicePaymentMethod;
  perHundredMeters: Scalars['Float']['input'];
  perMinuteDrive: Scalars['Float']['input'];
  perMinuteWait: Scalars['Float']['input'];
  personCapacity?: InputMaybe<Scalars['Int']['input']>;
  prepayPercent: Scalars['Float']['input'];
  providerShareFlat: Scalars['Float']['input'];
  providerSharePercent: Scalars['Int']['input'];
  roundingFactor?: InputMaybe<Scalars['Float']['input']>;
  searchRadius: Scalars['Int']['input'];
  timeMultipliers: Array<TimeMultiplierInput>;
  twoWayAvailable: Scalars['Boolean']['input'];
  weekdayMultipliers: Array<WeekdayMultiplierInput>;
};

export type ServiceOption = {
  __typename?: 'ServiceOption';
  additionalFee?: Maybe<Scalars['Float']['output']>;
  icon: ServiceOptionIcon;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  type: ServiceOptionType;
};

export type ServiceOptionAggregateFilter = {
  and?: InputMaybe<Array<ServiceOptionAggregateFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ServiceOptionAggregateFilter>>;
};

export type ServiceOptionDeleteResponse = {
  __typename?: 'ServiceOptionDeleteResponse';
  additionalFee?: Maybe<Scalars['Float']['output']>;
  icon?: Maybe<ServiceOptionIcon>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  type?: Maybe<ServiceOptionType>;
};

export type ServiceOptionFilter = {
  and?: InputMaybe<Array<ServiceOptionFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ServiceOptionFilter>>;
};

export enum ServiceOptionIcon {
  Custom1 = 'Custom1',
  Custom2 = 'Custom2',
  Custom3 = 'Custom3',
  Custom4 = 'Custom4',
  Custom5 = 'Custom5',
  Luggage = 'Luggage',
  PackageDelivery = 'PackageDelivery',
  Pet = 'Pet',
  Shopping = 'Shopping',
  TwoWay = 'TwoWay'
}

export type ServiceOptionInput = {
  additionalFee?: InputMaybe<Scalars['Float']['input']>;
  icon: ServiceOptionIcon;
  name: Scalars['String']['input'];
  type: ServiceOptionType;
};

export type ServiceOptionSort = {
  direction: SortDirection;
  field: ServiceOptionSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum ServiceOptionSortFields {
  Id = 'id'
}

export enum ServiceOptionType {
  Free = 'Free',
  Paid = 'Paid',
  TwoWay = 'TwoWay'
}

export enum ServicePaymentMethod {
  CashCredit = 'CashCredit',
  OnlyCash = 'OnlyCash',
  OnlyCredit = 'OnlyCredit'
}

export type ServiceSort = {
  direction: SortDirection;
  field: ServiceSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum ServiceSortFields {
  CategoryId = 'categoryId',
  Id = 'id',
  Name = 'name'
}

export type ServiceWithCost = {
  __typename?: 'ServiceWithCost';
  cost: Scalars['Float']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  media: Media;
  name: Scalars['String']['output'];
  options: Array<ServiceOption>;
  personCapacity?: Maybe<Scalars['Int']['output']>;
};

export type SessionInfo = {
  __typename?: 'SessionInfo';
  appType: AppType;
  createdAt: Scalars['DateTime']['output'];
  deviceName?: Maybe<Scalars['String']['output']>;
  devicePlatform: DevicePlatform;
  deviceType: DeviceType;
  ip?: Maybe<Scalars['String']['output']>;
  ipLocation?: Maybe<Scalars['String']['output']>;
  lastActivityAt?: Maybe<Scalars['DateTime']['output']>;
  token: Scalars['String']['output'];
};

export type SetActiveServicesOnDriverInput = {
  driverId: Scalars['ID']['input'];
  serviceIds: Array<Scalars['ID']['input']>;
};

export type SetFleetsOnZonePriceInput = {
  /** The id of the record. */
  id: Scalars['ID']['input'];
  /** The ids of the relations. */
  relationIds: Array<Scalars['ID']['input']>;
};

export type SetOptionsOnServiceInput = {
  /** The id of the record. */
  id: Scalars['ID']['input'];
  /** The ids of the relations. */
  relationIds: Array<Scalars['ID']['input']>;
};

export type SetRegionsOnServiceInput = {
  /** The id of the record. */
  id: Scalars['ID']['input'];
  /** The ids of the relations. */
  relationIds: Array<Scalars['ID']['input']>;
};

export type SetServicesOnZonePriceInput = {
  /** The id of the record. */
  id: Scalars['ID']['input'];
  /** The ids of the relations. */
  relationIds: Array<Scalars['ID']['input']>;
};

export type Shop = {
  __typename?: 'Shop';
  address: Scalars['String']['output'];
  carts: ShopCartsConnection;
  cartsAggregate: Array<ShopCartsAggregateResponse>;
  categories: Array<ShopCategory>;
  categoriesAggregate: Array<ShopCategoriesAggregateResponse>;
  createdAt: Scalars['DateTime']['output'];
  currency: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  /** The percentage of the delivery fee that shop pays so the delivery fee would be more appealing to the users. */
  expressDeliveryShopCommission: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  image?: Maybe<Media>;
  isCashOnDeliveryAvailable: Scalars['Boolean']['output'];
  isExpressDeliveryAvailable: Scalars['Boolean']['output'];
  isOnlinePaymentAvailable: Scalars['Boolean']['output'];
  isShopDeliveryAvailable: Scalars['Boolean']['output'];
  itemPresets: Array<ShopItemPreset>;
  itemPresetsAggregate: Array<ShopItemPresetsAggregateResponse>;
  lastActivityAt?: Maybe<Scalars['DateTime']['output']>;
  location: Point;
  mobileNumber: PhoneNumber;
  name: Scalars['String']['output'];
  orderQueueLevel: OrderQueueLevel;
  ownerInformation: PersonalInfo;
  password?: Maybe<Scalars['String']['output']>;
  ratingAggregate?: Maybe<RatingAggregate>;
  sessions: Array<ShopSession>;
  sessionsAggregate: Array<ShopSessionsAggregateResponse>;
  status: ShopStatus;
  wallet: Array<ShopWallet>;
  walletAggregate: Array<ShopWalletAggregateResponse>;
  weeklySchedule: Array<WeekdaySchedule>;
};


export type ShopCartsArgs = {
  filter?: ShopOrderCartFilter;
  paging?: OffsetPaging;
  sorting?: Array<ShopOrderCartSort>;
};


export type ShopCartsAggregateArgs = {
  filter?: InputMaybe<ShopOrderCartAggregateFilter>;
};


export type ShopCategoriesArgs = {
  filter?: ShopCategoryFilter;
  sorting?: Array<ShopCategorySort>;
};


export type ShopCategoriesAggregateArgs = {
  filter?: InputMaybe<ShopCategoryAggregateFilter>;
};


export type ShopItemPresetsArgs = {
  filter?: ShopItemPresetFilter;
  sorting?: Array<ShopItemPresetSort>;
};


export type ShopItemPresetsAggregateArgs = {
  filter?: InputMaybe<ShopItemPresetAggregateFilter>;
};


export type ShopSessionsArgs = {
  filter?: ShopSessionFilter;
  sorting?: Array<ShopSessionSort>;
};


export type ShopSessionsAggregateArgs = {
  filter?: InputMaybe<ShopSessionAggregateFilter>;
};


export type ShopWalletArgs = {
  filter?: ShopWalletFilter;
  sorting?: Array<ShopWalletSort>;
};


export type ShopWalletAggregateArgs = {
  filter?: InputMaybe<ShopWalletAggregateFilter>;
};

export type ShopAggregateFilter = {
  and?: InputMaybe<Array<ShopAggregateFilter>>;
  categories?: InputMaybe<ShopAggregateFilterShopCategoryAggregateFilter>;
  id?: InputMaybe<IdFilterComparison>;
  itemPresets?: InputMaybe<ShopAggregateFilterShopItemPresetAggregateFilter>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<ShopAggregateFilter>>;
  ratingAggregate?: InputMaybe<ShopAggregateFilterRatingAggregateAggregateFilter>;
  status?: InputMaybe<ShopStatusFilterComparison>;
};

export type ShopAggregateFilterRatingAggregateAggregateFilter = {
  and?: InputMaybe<Array<ShopAggregateFilterRatingAggregateAggregateFilter>>;
  or?: InputMaybe<Array<ShopAggregateFilterRatingAggregateAggregateFilter>>;
  rating?: InputMaybe<IntFieldComparison>;
};

export type ShopAggregateFilterShopCategoryAggregateFilter = {
  and?: InputMaybe<Array<ShopAggregateFilterShopCategoryAggregateFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<ShopAggregateFilterShopCategoryAggregateFilter>>;
  status?: InputMaybe<ShopCategoryStatusFilterComparison>;
};

export type ShopAggregateFilterShopItemPresetAggregateFilter = {
  and?: InputMaybe<Array<ShopAggregateFilterShopItemPresetAggregateFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<ShopAggregateFilterShopItemPresetAggregateFilter>>;
  shopId?: InputMaybe<IdFilterComparison>;
};

export type ShopAggregateGroupBy = {
  __typename?: 'ShopAggregateGroupBy';
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  ratingAggregate?: Maybe<RatingAggregate>;
  status?: Maybe<ShopStatus>;
};

export type ShopAggregateResponse = {
  __typename?: 'ShopAggregateResponse';
  avg?: Maybe<ShopAvgAggregate>;
  count?: Maybe<ShopCountAggregate>;
  groupBy?: Maybe<ShopAggregateGroupBy>;
  max?: Maybe<ShopMaxAggregate>;
  min?: Maybe<ShopMinAggregate>;
  sum?: Maybe<ShopSumAggregate>;
};

export type ShopAvgAggregate = {
  __typename?: 'ShopAvgAggregate';
  id?: Maybe<Scalars['Float']['output']>;
};

export type ShopCartsAggregateGroupBy = {
  __typename?: 'ShopCartsAggregateGroupBy';
  id?: Maybe<Scalars['ID']['output']>;
  shopId?: Maybe<Scalars['ID']['output']>;
};

export type ShopCartsAggregateResponse = {
  __typename?: 'ShopCartsAggregateResponse';
  avg?: Maybe<ShopCartsAvgAggregate>;
  count?: Maybe<ShopCartsCountAggregate>;
  groupBy?: Maybe<ShopCartsAggregateGroupBy>;
  max?: Maybe<ShopCartsMaxAggregate>;
  min?: Maybe<ShopCartsMinAggregate>;
  sum?: Maybe<ShopCartsSumAggregate>;
};

export type ShopCartsAvgAggregate = {
  __typename?: 'ShopCartsAvgAggregate';
  id?: Maybe<Scalars['Float']['output']>;
  shopId?: Maybe<Scalars['Float']['output']>;
};

export type ShopCartsConnection = {
  __typename?: 'ShopCartsConnection';
  /** Array of nodes. */
  nodes: Array<ShopOrderCart>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type ShopCartsCountAggregate = {
  __typename?: 'ShopCartsCountAggregate';
  id?: Maybe<Scalars['Int']['output']>;
  shopId?: Maybe<Scalars['Int']['output']>;
};

export type ShopCartsMaxAggregate = {
  __typename?: 'ShopCartsMaxAggregate';
  id?: Maybe<Scalars['ID']['output']>;
  shopId?: Maybe<Scalars['ID']['output']>;
};

export type ShopCartsMinAggregate = {
  __typename?: 'ShopCartsMinAggregate';
  id?: Maybe<Scalars['ID']['output']>;
  shopId?: Maybe<Scalars['ID']['output']>;
};

export type ShopCartsSumAggregate = {
  __typename?: 'ShopCartsSumAggregate';
  id?: Maybe<Scalars['Float']['output']>;
  shopId?: Maybe<Scalars['Float']['output']>;
};

export type ShopCategoriesAggregateGroupBy = {
  __typename?: 'ShopCategoriesAggregateGroupBy';
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  status?: Maybe<ShopCategoryStatus>;
};

export type ShopCategoriesAggregateResponse = {
  __typename?: 'ShopCategoriesAggregateResponse';
  avg?: Maybe<ShopCategoriesAvgAggregate>;
  count?: Maybe<ShopCategoriesCountAggregate>;
  groupBy?: Maybe<ShopCategoriesAggregateGroupBy>;
  max?: Maybe<ShopCategoriesMaxAggregate>;
  min?: Maybe<ShopCategoriesMinAggregate>;
  sum?: Maybe<ShopCategoriesSumAggregate>;
};

export type ShopCategoriesAvgAggregate = {
  __typename?: 'ShopCategoriesAvgAggregate';
  id?: Maybe<Scalars['Float']['output']>;
};

export type ShopCategoriesCountAggregate = {
  __typename?: 'ShopCategoriesCountAggregate';
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
};

export type ShopCategoriesMaxAggregate = {
  __typename?: 'ShopCategoriesMaxAggregate';
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  status?: Maybe<ShopCategoryStatus>;
};

export type ShopCategoriesMinAggregate = {
  __typename?: 'ShopCategoriesMinAggregate';
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  status?: Maybe<ShopCategoryStatus>;
};

export type ShopCategoriesSumAggregate = {
  __typename?: 'ShopCategoriesSumAggregate';
  id?: Maybe<Scalars['Float']['output']>;
};

export type ShopCategory = {
  __typename?: 'ShopCategory';
  id: Scalars['ID']['output'];
  image?: Maybe<Media>;
  name: Scalars['String']['output'];
  shops: ShopCategoryShopsConnection;
  status: ShopCategoryStatus;
};


export type ShopCategoryShopsArgs = {
  filter?: ShopFilter;
  paging?: OffsetPaging;
  sorting?: Array<ShopSort>;
};

export type ShopCategoryAggregateFilter = {
  and?: InputMaybe<Array<ShopCategoryAggregateFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<ShopCategoryAggregateFilter>>;
  status?: InputMaybe<ShopCategoryStatusFilterComparison>;
};

export type ShopCategoryConnection = {
  __typename?: 'ShopCategoryConnection';
  /** Array of nodes. */
  nodes: Array<ShopCategory>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type ShopCategoryDeleteResponse = {
  __typename?: 'ShopCategoryDeleteResponse';
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  status?: Maybe<ShopCategoryStatus>;
};

export type ShopCategoryFilter = {
  and?: InputMaybe<Array<ShopCategoryFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<ShopCategoryFilter>>;
  status?: InputMaybe<ShopCategoryStatusFilterComparison>;
};

export type ShopCategoryShopsConnection = {
  __typename?: 'ShopCategoryShopsConnection';
  /** Array of nodes. */
  nodes: Array<Shop>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type ShopCategorySort = {
  direction: SortDirection;
  field: ShopCategorySortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum ShopCategorySortFields {
  Id = 'id',
  Name = 'name',
  Status = 'status'
}

export enum ShopCategoryStatus {
  Disabled = 'Disabled',
  Enabled = 'Enabled'
}

export type ShopCategoryStatusFilterComparison = {
  eq?: InputMaybe<ShopCategoryStatus>;
  gt?: InputMaybe<ShopCategoryStatus>;
  gte?: InputMaybe<ShopCategoryStatus>;
  iLike?: InputMaybe<ShopCategoryStatus>;
  in?: InputMaybe<Array<ShopCategoryStatus>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<ShopCategoryStatus>;
  lt?: InputMaybe<ShopCategoryStatus>;
  lte?: InputMaybe<ShopCategoryStatus>;
  neq?: InputMaybe<ShopCategoryStatus>;
  notILike?: InputMaybe<ShopCategoryStatus>;
  notIn?: InputMaybe<Array<ShopCategoryStatus>>;
  notLike?: InputMaybe<ShopCategoryStatus>;
};

export type ShopConnection = {
  __typename?: 'ShopConnection';
  /** Array of nodes. */
  nodes: Array<Shop>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type ShopCountAggregate = {
  __typename?: 'ShopCountAggregate';
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['Int']['output']>;
  ratingAggregate?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
};

export type ShopDateRangePairInput = {
  endDate: Scalars['DateTime']['input'];
  shopId: Scalars['ID']['input'];
  startDate: Scalars['DateTime']['input'];
};

export type ShopDeleteResponse = {
  __typename?: 'ShopDeleteResponse';
  address?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  /** The percentage of the delivery fee that shop pays so the delivery fee would be more appealing to the users. */
  expressDeliveryShopCommission?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  isCashOnDeliveryAvailable?: Maybe<Scalars['Boolean']['output']>;
  isExpressDeliveryAvailable?: Maybe<Scalars['Boolean']['output']>;
  isOnlinePaymentAvailable?: Maybe<Scalars['Boolean']['output']>;
  isShopDeliveryAvailable?: Maybe<Scalars['Boolean']['output']>;
  lastActivityAt?: Maybe<Scalars['DateTime']['output']>;
  location?: Maybe<Point>;
  mobileNumber?: Maybe<PhoneNumber>;
  name?: Maybe<Scalars['String']['output']>;
  orderQueueLevel?: Maybe<OrderQueueLevel>;
  ownerInformation?: Maybe<PersonalInfo>;
  password?: Maybe<Scalars['String']['output']>;
  ratingAggregate?: Maybe<RatingAggregate>;
  status?: Maybe<ShopStatus>;
  weeklySchedule?: Maybe<Array<WeekdaySchedule>>;
};

export type ShopDeliveryZone = {
  __typename?: 'ShopDeliveryZone';
  deliveryFee: Scalars['Float']['output'];
  enabled: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  location: Array<Array<Point>>;
  maxDeliveryTimeMinutes: Scalars['Int']['output'];
  minDeliveryTimeMinutes: Scalars['Int']['output'];
  minimumOrderAmount: Scalars['Float']['output'];
  name?: Maybe<Scalars['String']['output']>;
  shopId: Scalars['ID']['output'];
};

export type ShopDeliveryZoneConnection = {
  __typename?: 'ShopDeliveryZoneConnection';
  /** Array of nodes. */
  nodes: Array<ShopDeliveryZone>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type ShopDeliveryZoneDeleteResponse = {
  __typename?: 'ShopDeliveryZoneDeleteResponse';
  deliveryFee?: Maybe<Scalars['Float']['output']>;
  enabled?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  location?: Maybe<Array<Array<Point>>>;
  maxDeliveryTimeMinutes?: Maybe<Scalars['Int']['output']>;
  minDeliveryTimeMinutes?: Maybe<Scalars['Int']['output']>;
  minimumOrderAmount?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  shopId?: Maybe<Scalars['ID']['output']>;
};

export type ShopDeliveryZoneFilter = {
  and?: InputMaybe<Array<ShopDeliveryZoneFilter>>;
  deliveryFee?: InputMaybe<FloatFieldComparison>;
  enabled?: InputMaybe<BooleanFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<ShopDeliveryZoneFilter>>;
  shopId?: InputMaybe<IdFilterComparison>;
};

export type ShopDeliveryZoneSort = {
  direction: SortDirection;
  field: ShopDeliveryZoneSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum ShopDeliveryZoneSortFields {
  DeliveryFee = 'deliveryFee',
  Enabled = 'enabled',
  Id = 'id',
  Name = 'name',
  ShopId = 'shopId'
}

export type ShopFeedback = {
  __typename?: 'ShopFeedback';
  comment?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  customerId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  orderCart: ShopOrderCart;
  parameters: Array<ShopFeedbackParameter>;
  /** The score of the review, from 0 to 100 */
  score: Scalars['Int']['output'];
  shopId: Scalars['ID']['output'];
  status: ReviewStatus;
};


export type ShopFeedbackParametersArgs = {
  filter?: ShopFeedbackParameterFilter;
  sorting?: Array<ShopFeedbackParameterSort>;
};

export type ShopFeedbackConnection = {
  __typename?: 'ShopFeedbackConnection';
  /** Array of nodes. */
  nodes: Array<ShopFeedback>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type ShopFeedbackFilter = {
  and?: InputMaybe<Array<ShopFeedbackFilter>>;
  comment?: InputMaybe<StringFieldComparison>;
  customerId?: InputMaybe<IdFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ShopFeedbackFilter>>;
  orderCart?: InputMaybe<ShopFeedbackFilterShopOrderCartFilter>;
  shopId?: InputMaybe<IdFilterComparison>;
  status?: InputMaybe<ReviewStatusFilterComparison>;
};

export type ShopFeedbackFilterShopOrderCartFilter = {
  and?: InputMaybe<Array<ShopFeedbackFilterShopOrderCartFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ShopFeedbackFilterShopOrderCartFilter>>;
  shopId?: InputMaybe<IdFilterComparison>;
};

export type ShopFeedbackParameter = {
  __typename?: 'ShopFeedbackParameter';
  id: Scalars['ID']['output'];
  isGood: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
};

export type ShopFeedbackParameterConnection = {
  __typename?: 'ShopFeedbackParameterConnection';
  /** Array of nodes. */
  nodes: Array<ShopFeedbackParameter>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
};

export type ShopFeedbackParameterDeleteResponse = {
  __typename?: 'ShopFeedbackParameterDeleteResponse';
  id?: Maybe<Scalars['ID']['output']>;
  isGood?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type ShopFeedbackParameterFilter = {
  and?: InputMaybe<Array<ShopFeedbackParameterFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ShopFeedbackParameterFilter>>;
};

export type ShopFeedbackParameterSort = {
  direction: SortDirection;
  field: ShopFeedbackParameterSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum ShopFeedbackParameterSortFields {
  Id = 'id'
}

export type ShopFeedbackSort = {
  direction: SortDirection;
  field: ShopFeedbackSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum ShopFeedbackSortFields {
  Comment = 'comment',
  CustomerId = 'customerId',
  Id = 'id',
  ShopId = 'shopId',
  Status = 'status'
}

export type ShopFilter = {
  and?: InputMaybe<Array<ShopFilter>>;
  categories?: InputMaybe<ShopFilterShopCategoryFilter>;
  id?: InputMaybe<IdFilterComparison>;
  itemPresets?: InputMaybe<ShopFilterShopItemPresetFilter>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<ShopFilter>>;
  ratingAggregate?: InputMaybe<ShopFilterRatingAggregateFilter>;
  status?: InputMaybe<ShopStatusFilterComparison>;
};

export type ShopFilterRatingAggregateFilter = {
  and?: InputMaybe<Array<ShopFilterRatingAggregateFilter>>;
  or?: InputMaybe<Array<ShopFilterRatingAggregateFilter>>;
  rating?: InputMaybe<IntFieldComparison>;
};

export type ShopFilterShopCategoryFilter = {
  and?: InputMaybe<Array<ShopFilterShopCategoryFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<ShopFilterShopCategoryFilter>>;
  status?: InputMaybe<ShopCategoryStatusFilterComparison>;
};

export type ShopFilterShopItemPresetFilter = {
  and?: InputMaybe<Array<ShopFilterShopItemPresetFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<ShopFilterShopItemPresetFilter>>;
  shopId?: InputMaybe<IdFilterComparison>;
};

export type ShopFiltersInput = {
  addressId: Scalars['ID']['input'];
  categoryId: Scalars['ID']['input'];
  query?: InputMaybe<Scalars['String']['input']>;
};

export type ShopItemPreset = {
  __typename?: 'ShopItemPreset';
  id: Scalars['ID']['output'];
  itemCategories: ShopItemPresetItemCategoriesConnection;
  items: ShopItemPresetItemsConnection;
  name: Scalars['String']['output'];
  shopId: Scalars['ID']['output'];
  weeklySchedule: Array<WeekdaySchedule>;
};


export type ShopItemPresetItemCategoriesArgs = {
  filter?: ItemCategoryFilter;
  paging?: OffsetPaging;
  sorting?: Array<ItemCategorySort>;
};


export type ShopItemPresetItemsArgs = {
  filter?: ItemFilter;
  paging?: OffsetPaging;
  sorting?: Array<ItemSort>;
};

export type ShopItemPresetAggregateFilter = {
  and?: InputMaybe<Array<ShopItemPresetAggregateFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  itemCategories?: InputMaybe<ShopItemPresetAggregateFilterItemCategoryAggregateFilter>;
  items?: InputMaybe<ShopItemPresetAggregateFilterItemAggregateFilter>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<ShopItemPresetAggregateFilter>>;
  shopId?: InputMaybe<IdFilterComparison>;
};

export type ShopItemPresetAggregateFilterItemAggregateFilter = {
  and?: InputMaybe<Array<ShopItemPresetAggregateFilterItemAggregateFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<ShopItemPresetAggregateFilterItemAggregateFilter>>;
  shopId?: InputMaybe<IdFilterComparison>;
};

export type ShopItemPresetAggregateFilterItemCategoryAggregateFilter = {
  and?: InputMaybe<Array<ShopItemPresetAggregateFilterItemCategoryAggregateFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<ShopItemPresetAggregateFilterItemCategoryAggregateFilter>>;
  shopId?: InputMaybe<IdFilterComparison>;
};

export type ShopItemPresetConnection = {
  __typename?: 'ShopItemPresetConnection';
  /** Array of nodes. */
  nodes: Array<ShopItemPreset>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type ShopItemPresetDeleteResponse = {
  __typename?: 'ShopItemPresetDeleteResponse';
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  shopId?: Maybe<Scalars['ID']['output']>;
  weeklySchedule?: Maybe<Array<WeekdaySchedule>>;
};

export type ShopItemPresetFilter = {
  and?: InputMaybe<Array<ShopItemPresetFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  itemCategories?: InputMaybe<ShopItemPresetFilterItemCategoryFilter>;
  items?: InputMaybe<ShopItemPresetFilterItemFilter>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<ShopItemPresetFilter>>;
  shopId?: InputMaybe<IdFilterComparison>;
};

export type ShopItemPresetFilterItemCategoryFilter = {
  and?: InputMaybe<Array<ShopItemPresetFilterItemCategoryFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<ShopItemPresetFilterItemCategoryFilter>>;
  shopId?: InputMaybe<IdFilterComparison>;
};

export type ShopItemPresetFilterItemFilter = {
  and?: InputMaybe<Array<ShopItemPresetFilterItemFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<ShopItemPresetFilterItemFilter>>;
  shopId?: InputMaybe<IdFilterComparison>;
};

export type ShopItemPresetItemCategoriesConnection = {
  __typename?: 'ShopItemPresetItemCategoriesConnection';
  /** Array of nodes. */
  nodes: Array<ItemCategory>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type ShopItemPresetItemsConnection = {
  __typename?: 'ShopItemPresetItemsConnection';
  /** Array of nodes. */
  nodes: Array<Item>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type ShopItemPresetSort = {
  direction: SortDirection;
  field: ShopItemPresetSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum ShopItemPresetSortFields {
  Id = 'id',
  Name = 'name',
  ShopId = 'shopId'
}

export type ShopItemPresetsAggregateGroupBy = {
  __typename?: 'ShopItemPresetsAggregateGroupBy';
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  shopId?: Maybe<Scalars['ID']['output']>;
};

export type ShopItemPresetsAggregateResponse = {
  __typename?: 'ShopItemPresetsAggregateResponse';
  avg?: Maybe<ShopItemPresetsAvgAggregate>;
  count?: Maybe<ShopItemPresetsCountAggregate>;
  groupBy?: Maybe<ShopItemPresetsAggregateGroupBy>;
  max?: Maybe<ShopItemPresetsMaxAggregate>;
  min?: Maybe<ShopItemPresetsMinAggregate>;
  sum?: Maybe<ShopItemPresetsSumAggregate>;
};

export type ShopItemPresetsAvgAggregate = {
  __typename?: 'ShopItemPresetsAvgAggregate';
  id?: Maybe<Scalars['Float']['output']>;
  shopId?: Maybe<Scalars['Float']['output']>;
};

export type ShopItemPresetsCountAggregate = {
  __typename?: 'ShopItemPresetsCountAggregate';
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['Int']['output']>;
  shopId?: Maybe<Scalars['Int']['output']>;
};

export type ShopItemPresetsMaxAggregate = {
  __typename?: 'ShopItemPresetsMaxAggregate';
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  shopId?: Maybe<Scalars['ID']['output']>;
};

export type ShopItemPresetsMinAggregate = {
  __typename?: 'ShopItemPresetsMinAggregate';
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  shopId?: Maybe<Scalars['ID']['output']>;
};

export type ShopItemPresetsSumAggregate = {
  __typename?: 'ShopItemPresetsSumAggregate';
  id?: Maybe<Scalars['Float']['output']>;
  shopId?: Maybe<Scalars['Float']['output']>;
};

export type ShopLoginSession = {
  __typename?: 'ShopLoginSession';
  id: Scalars['ID']['output'];
  sessionInfo: SessionInfo;
  shopId: Scalars['ID']['output'];
};

export type ShopLoginSessionFilter = {
  and?: InputMaybe<Array<ShopLoginSessionFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ShopLoginSessionFilter>>;
  shopId?: InputMaybe<IdFilterComparison>;
};

export type ShopLoginSessionSort = {
  direction: SortDirection;
  field: ShopLoginSessionSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum ShopLoginSessionSortFields {
  Id = 'id',
  ShopId = 'shopId'
}

export type ShopMaxAggregate = {
  __typename?: 'ShopMaxAggregate';
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  ratingAggregate?: Maybe<RatingAggregate>;
  status?: Maybe<ShopStatus>;
};

export type ShopMinAggregate = {
  __typename?: 'ShopMinAggregate';
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  ratingAggregate?: Maybe<RatingAggregate>;
  status?: Maybe<ShopStatus>;
};

export type ShopNote = {
  __typename?: 'ShopNote';
  id: Scalars['ID']['output'];
  note: Note;
  shop: Shop;
  shopId: Scalars['ID']['output'];
  staff: Operator;
  staffId: Scalars['ID']['output'];
};

export type ShopNoteFilter = {
  and?: InputMaybe<Array<ShopNoteFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ShopNoteFilter>>;
  shopId: IdFilterComparison;
};

export type ShopNoteSort = {
  direction: SortDirection;
  field: ShopNoteSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum ShopNoteSortFields {
  Id = 'id',
  ShopId = 'shopId'
}

export type ShopOrder = {
  __typename?: 'ShopOrder';
  carts: Array<ShopOrderCart>;
  cartsAggregate: Array<ShopOrderCartsAggregateResponse>;
  createdAt: Scalars['DateTime']['output'];
  currency: Scalars['String']['output'];
  customer: Rider;
  customerId: Scalars['ID']['output'];
  deliveryAddress: Address;
  deliveryDirections?: Maybe<Array<Point>>;
  deliveryFee: Scalars['Float']['output'];
  deliveryMethod: DeliveryMethod;
  discount: Scalars['Float']['output'];
  driverTransactions: Array<DriverTransaction>;
  driverTransactionsAggregate: Array<ShopOrderDriverTransactionsAggregateResponse>;
  estimatedDeliveryTime?: Maybe<Scalars['DateTime']['output']>;
  fullfillmentTime?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  paymentGateway?: Maybe<PaymentGateway>;
  paymentMethod: PaymentMode;
  riderTransactions: Array<RiderTransaction>;
  riderTransactionsAggregate: Array<ShopOrderRiderTransactionsAggregateResponse>;
  savedPaymentMethod?: Maybe<SavedPaymentMethod>;
  serviceFee: Scalars['Float']['output'];
  status: ShopOrderStatus;
  statusHistories: Array<ShopOrderStatusHistory>;
  statusHistoriesAggregate: Array<ShopOrderStatusHistoriesAggregateResponse>;
  subTotal: Scalars['Float']['output'];
  tax: Scalars['Float']['output'];
  total: Scalars['Float']['output'];
};


export type ShopOrderCartsArgs = {
  filter?: ShopOrderCartFilter;
  sorting?: Array<ShopOrderCartSort>;
};


export type ShopOrderCartsAggregateArgs = {
  filter?: InputMaybe<ShopOrderCartAggregateFilter>;
};


export type ShopOrderDriverTransactionsArgs = {
  filter?: DriverTransactionFilter;
  sorting?: Array<DriverTransactionSort>;
};


export type ShopOrderDriverTransactionsAggregateArgs = {
  filter?: InputMaybe<DriverTransactionAggregateFilter>;
};


export type ShopOrderRiderTransactionsArgs = {
  filter?: RiderTransactionFilter;
  sorting?: Array<RiderTransactionSort>;
};


export type ShopOrderRiderTransactionsAggregateArgs = {
  filter?: InputMaybe<RiderTransactionAggregateFilter>;
};


export type ShopOrderStatusHistoriesArgs = {
  filter?: ShopOrderStatusHistoryFilter;
  sorting?: Array<ShopOrderStatusHistorySort>;
};


export type ShopOrderStatusHistoriesAggregateArgs = {
  filter?: InputMaybe<ShopOrderStatusHistoryAggregateFilter>;
};

export type ShopOrderAggregateFilter = {
  and?: InputMaybe<Array<ShopOrderAggregateFilter>>;
  carts?: InputMaybe<ShopOrderAggregateFilterShopOrderCartAggregateFilter>;
  createdAt?: InputMaybe<DateFieldComparison>;
  currency?: InputMaybe<StringFieldComparison>;
  customerId?: InputMaybe<IdFilterComparison>;
  deliveryMethod?: InputMaybe<DeliveryMethodFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ShopOrderAggregateFilter>>;
  paymentMethod?: InputMaybe<PaymentModeFilterComparison>;
  status?: InputMaybe<ShopOrderStatusFilterComparison>;
  total?: InputMaybe<FloatFieldComparison>;
};

export type ShopOrderAggregateFilterShopOrderCartAggregateFilter = {
  and?: InputMaybe<Array<ShopOrderAggregateFilterShopOrderCartAggregateFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ShopOrderAggregateFilterShopOrderCartAggregateFilter>>;
  shopId?: InputMaybe<IdFilterComparison>;
};

export type ShopOrderAggregateGroupBy = {
  __typename?: 'ShopOrderAggregateGroupBy';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  customerId?: Maybe<Scalars['ID']['output']>;
  deliveryMethod?: Maybe<DeliveryMethod>;
  id?: Maybe<Scalars['ID']['output']>;
  paymentMethod?: Maybe<PaymentMode>;
  status?: Maybe<ShopOrderStatus>;
  total?: Maybe<Scalars['Float']['output']>;
};


export type ShopOrderAggregateGroupByCreatedAtArgs = {
  by?: GroupBy;
};

export type ShopOrderAggregateResponse = {
  __typename?: 'ShopOrderAggregateResponse';
  avg?: Maybe<ShopOrderAvgAggregate>;
  count?: Maybe<ShopOrderCountAggregate>;
  groupBy?: Maybe<ShopOrderAggregateGroupBy>;
  max?: Maybe<ShopOrderMaxAggregate>;
  min?: Maybe<ShopOrderMinAggregate>;
  sum?: Maybe<ShopOrderSumAggregate>;
};

export type ShopOrderAvgAggregate = {
  __typename?: 'ShopOrderAvgAggregate';
  customerId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  total?: Maybe<Scalars['Float']['output']>;
};

export type ShopOrderCart = {
  __typename?: 'ShopOrderCart';
  feedbacks?: Maybe<Array<ShopFeedback>>;
  id: Scalars['ID']['output'];
  items: Array<ShopOrderCartItem>;
  order: ShopOrder;
  providerTransactions: Array<ProviderTransaction>;
  shop: Shop;
  shopId: Scalars['ID']['output'];
  shopTransactions: Array<ShopTransaction>;
  subtotal: Scalars['Float']['output'];
};


export type ShopOrderCartFeedbacksArgs = {
  filter?: ShopFeedbackFilter;
  sorting?: Array<ShopFeedbackSort>;
};


export type ShopOrderCartItemsArgs = {
  filter?: ShopOrderCartItemFilter;
  sorting?: Array<ShopOrderCartItemSort>;
};


export type ShopOrderCartProviderTransactionsArgs = {
  filter?: ProviderTransactionFilter;
  sorting?: Array<ProviderTransactionSort>;
};


export type ShopOrderCartShopTransactionsArgs = {
  filter?: ShopTransactionFilter;
  sorting?: Array<ShopTransactionSort>;
};

export type ShopOrderCartAggregateFilter = {
  and?: InputMaybe<Array<ShopOrderCartAggregateFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ShopOrderCartAggregateFilter>>;
  order?: InputMaybe<ShopOrderCartAggregateFilterShopOrderAggregateFilter>;
  shopId?: InputMaybe<IdFilterComparison>;
};

export type ShopOrderCartAggregateFilterShopOrderAggregateFilter = {
  and?: InputMaybe<Array<ShopOrderCartAggregateFilterShopOrderAggregateFilter>>;
  createdAt?: InputMaybe<DateFieldComparison>;
  currency?: InputMaybe<StringFieldComparison>;
  customerId?: InputMaybe<IdFilterComparison>;
  deliveryMethod?: InputMaybe<DeliveryMethodFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ShopOrderCartAggregateFilterShopOrderAggregateFilter>>;
  paymentMethod?: InputMaybe<PaymentModeFilterComparison>;
  status?: InputMaybe<ShopOrderStatusFilterComparison>;
  total?: InputMaybe<FloatFieldComparison>;
};

export type ShopOrderCartFilter = {
  and?: InputMaybe<Array<ShopOrderCartFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ShopOrderCartFilter>>;
  order?: InputMaybe<ShopOrderCartFilterShopOrderFilter>;
  shopId?: InputMaybe<IdFilterComparison>;
};

export type ShopOrderCartFilterShopOrderFilter = {
  and?: InputMaybe<Array<ShopOrderCartFilterShopOrderFilter>>;
  createdAt?: InputMaybe<DateFieldComparison>;
  currency?: InputMaybe<StringFieldComparison>;
  customerId?: InputMaybe<IdFilterComparison>;
  deliveryMethod?: InputMaybe<DeliveryMethodFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ShopOrderCartFilterShopOrderFilter>>;
  paymentMethod?: InputMaybe<PaymentModeFilterComparison>;
  status?: InputMaybe<ShopOrderStatusFilterComparison>;
  total?: InputMaybe<FloatFieldComparison>;
};

export type ShopOrderCartInput = {
  items: Array<ShopOrderCartItemInput>;
  shopId: Scalars['ID']['input'];
};

export type ShopOrderCartItem = {
  __typename?: 'ShopOrderCartItem';
  canceledQuantity: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  itemVariant: ItemVariant;
  options: Array<ItemOption>;
  priceEach: Scalars['Float']['output'];
  quantity: Scalars['Int']['output'];
};


export type ShopOrderCartItemOptionsArgs = {
  filter?: ItemOptionFilter;
  sorting?: Array<ItemOptionSort>;
};

export type ShopOrderCartItemFilter = {
  and?: InputMaybe<Array<ShopOrderCartItemFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ShopOrderCartItemFilter>>;
};

export type ShopOrderCartItemInput = {
  itemOptionIds: Array<Scalars['ID']['input']>;
  itemVariantId: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
};

export type ShopOrderCartItemSort = {
  direction: SortDirection;
  field: ShopOrderCartItemSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum ShopOrderCartItemSortFields {
  Id = 'id'
}

export type ShopOrderCartSort = {
  direction: SortDirection;
  field: ShopOrderCartSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum ShopOrderCartSortFields {
  Id = 'id',
  ShopId = 'shopId'
}

export type ShopOrderCartsAggregateGroupBy = {
  __typename?: 'ShopOrderCartsAggregateGroupBy';
  id?: Maybe<Scalars['ID']['output']>;
  shopId?: Maybe<Scalars['ID']['output']>;
};

export type ShopOrderCartsAggregateResponse = {
  __typename?: 'ShopOrderCartsAggregateResponse';
  avg?: Maybe<ShopOrderCartsAvgAggregate>;
  count?: Maybe<ShopOrderCartsCountAggregate>;
  groupBy?: Maybe<ShopOrderCartsAggregateGroupBy>;
  max?: Maybe<ShopOrderCartsMaxAggregate>;
  min?: Maybe<ShopOrderCartsMinAggregate>;
  sum?: Maybe<ShopOrderCartsSumAggregate>;
};

export type ShopOrderCartsAvgAggregate = {
  __typename?: 'ShopOrderCartsAvgAggregate';
  id?: Maybe<Scalars['Float']['output']>;
  shopId?: Maybe<Scalars['Float']['output']>;
};

export type ShopOrderCartsCountAggregate = {
  __typename?: 'ShopOrderCartsCountAggregate';
  id?: Maybe<Scalars['Int']['output']>;
  shopId?: Maybe<Scalars['Int']['output']>;
};

export type ShopOrderCartsMaxAggregate = {
  __typename?: 'ShopOrderCartsMaxAggregate';
  id?: Maybe<Scalars['ID']['output']>;
  shopId?: Maybe<Scalars['ID']['output']>;
};

export type ShopOrderCartsMinAggregate = {
  __typename?: 'ShopOrderCartsMinAggregate';
  id?: Maybe<Scalars['ID']['output']>;
  shopId?: Maybe<Scalars['ID']['output']>;
};

export type ShopOrderCartsSumAggregate = {
  __typename?: 'ShopOrderCartsSumAggregate';
  id?: Maybe<Scalars['Float']['output']>;
  shopId?: Maybe<Scalars['Float']['output']>;
};

export type ShopOrderConnection = {
  __typename?: 'ShopOrderConnection';
  /** Array of nodes. */
  nodes: Array<ShopOrder>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type ShopOrderCountAggregate = {
  __typename?: 'ShopOrderCountAggregate';
  createdAt?: Maybe<Scalars['Int']['output']>;
  currency?: Maybe<Scalars['Int']['output']>;
  customerId?: Maybe<Scalars['Int']['output']>;
  deliveryMethod?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  paymentMethod?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type ShopOrderDriverTransactionsAggregateGroupBy = {
  __typename?: 'ShopOrderDriverTransactionsAggregateGroupBy';
  action?: Maybe<TransactionAction>;
  amount?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  driverId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  paymentGatewayId?: Maybe<Scalars['ID']['output']>;
  payoutAccountId?: Maybe<Scalars['ID']['output']>;
  payoutMethodId?: Maybe<Scalars['ID']['output']>;
  payoutSessionId?: Maybe<Scalars['ID']['output']>;
  payoutSessionMethodId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<TransactionStatus>;
};

export type ShopOrderDriverTransactionsAggregateResponse = {
  __typename?: 'ShopOrderDriverTransactionsAggregateResponse';
  avg?: Maybe<ShopOrderDriverTransactionsAvgAggregate>;
  count?: Maybe<ShopOrderDriverTransactionsCountAggregate>;
  groupBy?: Maybe<ShopOrderDriverTransactionsAggregateGroupBy>;
  max?: Maybe<ShopOrderDriverTransactionsMaxAggregate>;
  min?: Maybe<ShopOrderDriverTransactionsMinAggregate>;
  sum?: Maybe<ShopOrderDriverTransactionsSumAggregate>;
};

export type ShopOrderDriverTransactionsAvgAggregate = {
  __typename?: 'ShopOrderDriverTransactionsAvgAggregate';
  amount?: Maybe<Scalars['Float']['output']>;
  driverId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  paymentGatewayId?: Maybe<Scalars['Float']['output']>;
  payoutAccountId?: Maybe<Scalars['Float']['output']>;
  payoutMethodId?: Maybe<Scalars['Float']['output']>;
  payoutSessionId?: Maybe<Scalars['Float']['output']>;
  payoutSessionMethodId?: Maybe<Scalars['Float']['output']>;
};

export type ShopOrderDriverTransactionsCountAggregate = {
  __typename?: 'ShopOrderDriverTransactionsCountAggregate';
  action?: Maybe<Scalars['Int']['output']>;
  amount?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['Int']['output']>;
  currency?: Maybe<Scalars['Int']['output']>;
  driverId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  paymentGatewayId?: Maybe<Scalars['Int']['output']>;
  payoutAccountId?: Maybe<Scalars['Int']['output']>;
  payoutMethodId?: Maybe<Scalars['Int']['output']>;
  payoutSessionId?: Maybe<Scalars['Int']['output']>;
  payoutSessionMethodId?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
};

export type ShopOrderDriverTransactionsMaxAggregate = {
  __typename?: 'ShopOrderDriverTransactionsMaxAggregate';
  action?: Maybe<TransactionAction>;
  amount?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  driverId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  paymentGatewayId?: Maybe<Scalars['ID']['output']>;
  payoutAccountId?: Maybe<Scalars['ID']['output']>;
  payoutMethodId?: Maybe<Scalars['ID']['output']>;
  payoutSessionId?: Maybe<Scalars['ID']['output']>;
  payoutSessionMethodId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<TransactionStatus>;
};

export type ShopOrderDriverTransactionsMinAggregate = {
  __typename?: 'ShopOrderDriverTransactionsMinAggregate';
  action?: Maybe<TransactionAction>;
  amount?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  driverId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  paymentGatewayId?: Maybe<Scalars['ID']['output']>;
  payoutAccountId?: Maybe<Scalars['ID']['output']>;
  payoutMethodId?: Maybe<Scalars['ID']['output']>;
  payoutSessionId?: Maybe<Scalars['ID']['output']>;
  payoutSessionMethodId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<TransactionStatus>;
};

export type ShopOrderDriverTransactionsSumAggregate = {
  __typename?: 'ShopOrderDriverTransactionsSumAggregate';
  amount?: Maybe<Scalars['Float']['output']>;
  driverId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  paymentGatewayId?: Maybe<Scalars['Float']['output']>;
  payoutAccountId?: Maybe<Scalars['Float']['output']>;
  payoutMethodId?: Maybe<Scalars['Float']['output']>;
  payoutSessionId?: Maybe<Scalars['Float']['output']>;
  payoutSessionMethodId?: Maybe<Scalars['Float']['output']>;
};

export type ShopOrderFilter = {
  and?: InputMaybe<Array<ShopOrderFilter>>;
  carts?: InputMaybe<ShopOrderFilterShopOrderCartFilter>;
  createdAt?: InputMaybe<DateFieldComparison>;
  currency?: InputMaybe<StringFieldComparison>;
  customerId?: InputMaybe<IdFilterComparison>;
  deliveryMethod?: InputMaybe<DeliveryMethodFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ShopOrderFilter>>;
  paymentMethod?: InputMaybe<PaymentModeFilterComparison>;
  status?: InputMaybe<ShopOrderStatusFilterComparison>;
  total?: InputMaybe<FloatFieldComparison>;
};

export type ShopOrderFilterShopOrderCartFilter = {
  and?: InputMaybe<Array<ShopOrderFilterShopOrderCartFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ShopOrderFilterShopOrderCartFilter>>;
  shopId?: InputMaybe<IdFilterComparison>;
};

export type ShopOrderInput = {
  carts: Array<ShopOrderCartInput>;
  deliveryAddressId: Scalars['ID']['input'];
  deliveryMethod: DeliveryMethod;
};

export type ShopOrderMaxAggregate = {
  __typename?: 'ShopOrderMaxAggregate';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  customerId?: Maybe<Scalars['ID']['output']>;
  deliveryMethod?: Maybe<DeliveryMethod>;
  id?: Maybe<Scalars['ID']['output']>;
  paymentMethod?: Maybe<PaymentMode>;
  status?: Maybe<ShopOrderStatus>;
  total?: Maybe<Scalars['Float']['output']>;
};

export type ShopOrderMinAggregate = {
  __typename?: 'ShopOrderMinAggregate';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  customerId?: Maybe<Scalars['ID']['output']>;
  deliveryMethod?: Maybe<DeliveryMethod>;
  id?: Maybe<Scalars['ID']['output']>;
  paymentMethod?: Maybe<PaymentMode>;
  status?: Maybe<ShopOrderStatus>;
  total?: Maybe<Scalars['Float']['output']>;
};

export type ShopOrderNote = {
  __typename?: 'ShopOrderNote';
  id: Scalars['ID']['output'];
  note: Note;
  order: ShopOrder;
  orderId: Scalars['ID']['output'];
  staff: Operator;
  staffId: Scalars['ID']['output'];
};

export type ShopOrderNoteFilter = {
  and?: InputMaybe<Array<ShopOrderNoteFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ShopOrderNoteFilter>>;
  orderId: IdFilterComparison;
};

export type ShopOrderNoteSort = {
  direction: SortDirection;
  field: ShopOrderNoteSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum ShopOrderNoteSortFields {
  Id = 'id',
  OrderId = 'orderId'
}

export type ShopOrderRiderTransactionsAggregateGroupBy = {
  __typename?: 'ShopOrderRiderTransactionsAggregateGroupBy';
  action?: Maybe<TransactionAction>;
  amount?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  deductType?: Maybe<RiderDeductTransactionType>;
  id?: Maybe<Scalars['ID']['output']>;
  operatorId?: Maybe<Scalars['ID']['output']>;
  parkOrderCustomerId?: Maybe<Scalars['ID']['output']>;
  parkOrderParkOwnerId?: Maybe<Scalars['ID']['output']>;
  paymentGatewayId?: Maybe<Scalars['ID']['output']>;
  rechargeType?: Maybe<RiderRechargeTransactionType>;
  requestId?: Maybe<Scalars['ID']['output']>;
  riderId?: Maybe<Scalars['ID']['output']>;
  savedPaymentMethodId?: Maybe<Scalars['ID']['output']>;
  shopOrderId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<TransactionStatus>;
};

export type ShopOrderRiderTransactionsAggregateResponse = {
  __typename?: 'ShopOrderRiderTransactionsAggregateResponse';
  avg?: Maybe<ShopOrderRiderTransactionsAvgAggregate>;
  count?: Maybe<ShopOrderRiderTransactionsCountAggregate>;
  groupBy?: Maybe<ShopOrderRiderTransactionsAggregateGroupBy>;
  max?: Maybe<ShopOrderRiderTransactionsMaxAggregate>;
  min?: Maybe<ShopOrderRiderTransactionsMinAggregate>;
  sum?: Maybe<ShopOrderRiderTransactionsSumAggregate>;
};

export type ShopOrderRiderTransactionsAvgAggregate = {
  __typename?: 'ShopOrderRiderTransactionsAvgAggregate';
  amount?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  operatorId?: Maybe<Scalars['Float']['output']>;
  parkOrderCustomerId?: Maybe<Scalars['Float']['output']>;
  parkOrderParkOwnerId?: Maybe<Scalars['Float']['output']>;
  paymentGatewayId?: Maybe<Scalars['Float']['output']>;
  requestId?: Maybe<Scalars['Float']['output']>;
  riderId?: Maybe<Scalars['Float']['output']>;
  savedPaymentMethodId?: Maybe<Scalars['Float']['output']>;
  shopOrderId?: Maybe<Scalars['Float']['output']>;
};

export type ShopOrderRiderTransactionsCountAggregate = {
  __typename?: 'ShopOrderRiderTransactionsCountAggregate';
  action?: Maybe<Scalars['Int']['output']>;
  amount?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['Int']['output']>;
  currency?: Maybe<Scalars['Int']['output']>;
  deductType?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  operatorId?: Maybe<Scalars['Int']['output']>;
  parkOrderCustomerId?: Maybe<Scalars['Int']['output']>;
  parkOrderParkOwnerId?: Maybe<Scalars['Int']['output']>;
  paymentGatewayId?: Maybe<Scalars['Int']['output']>;
  rechargeType?: Maybe<Scalars['Int']['output']>;
  requestId?: Maybe<Scalars['Int']['output']>;
  riderId?: Maybe<Scalars['Int']['output']>;
  savedPaymentMethodId?: Maybe<Scalars['Int']['output']>;
  shopOrderId?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
};

export type ShopOrderRiderTransactionsMaxAggregate = {
  __typename?: 'ShopOrderRiderTransactionsMaxAggregate';
  action?: Maybe<TransactionAction>;
  amount?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  deductType?: Maybe<RiderDeductTransactionType>;
  id?: Maybe<Scalars['ID']['output']>;
  operatorId?: Maybe<Scalars['ID']['output']>;
  parkOrderCustomerId?: Maybe<Scalars['ID']['output']>;
  parkOrderParkOwnerId?: Maybe<Scalars['ID']['output']>;
  paymentGatewayId?: Maybe<Scalars['ID']['output']>;
  rechargeType?: Maybe<RiderRechargeTransactionType>;
  requestId?: Maybe<Scalars['ID']['output']>;
  riderId?: Maybe<Scalars['ID']['output']>;
  savedPaymentMethodId?: Maybe<Scalars['ID']['output']>;
  shopOrderId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<TransactionStatus>;
};

export type ShopOrderRiderTransactionsMinAggregate = {
  __typename?: 'ShopOrderRiderTransactionsMinAggregate';
  action?: Maybe<TransactionAction>;
  amount?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  deductType?: Maybe<RiderDeductTransactionType>;
  id?: Maybe<Scalars['ID']['output']>;
  operatorId?: Maybe<Scalars['ID']['output']>;
  parkOrderCustomerId?: Maybe<Scalars['ID']['output']>;
  parkOrderParkOwnerId?: Maybe<Scalars['ID']['output']>;
  paymentGatewayId?: Maybe<Scalars['ID']['output']>;
  rechargeType?: Maybe<RiderRechargeTransactionType>;
  requestId?: Maybe<Scalars['ID']['output']>;
  riderId?: Maybe<Scalars['ID']['output']>;
  savedPaymentMethodId?: Maybe<Scalars['ID']['output']>;
  shopOrderId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<TransactionStatus>;
};

export type ShopOrderRiderTransactionsSumAggregate = {
  __typename?: 'ShopOrderRiderTransactionsSumAggregate';
  amount?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  operatorId?: Maybe<Scalars['Float']['output']>;
  parkOrderCustomerId?: Maybe<Scalars['Float']['output']>;
  parkOrderParkOwnerId?: Maybe<Scalars['Float']['output']>;
  paymentGatewayId?: Maybe<Scalars['Float']['output']>;
  requestId?: Maybe<Scalars['Float']['output']>;
  riderId?: Maybe<Scalars['Float']['output']>;
  savedPaymentMethodId?: Maybe<Scalars['Float']['output']>;
  shopOrderId?: Maybe<Scalars['Float']['output']>;
};

export type ShopOrderSort = {
  direction: SortDirection;
  field: ShopOrderSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum ShopOrderSortFields {
  CreatedAt = 'createdAt',
  Currency = 'currency',
  CustomerId = 'customerId',
  DeliveryMethod = 'deliveryMethod',
  Id = 'id',
  PaymentMethod = 'paymentMethod',
  Status = 'status',
  Total = 'total'
}

/** The status of the shop order */
export enum ShopOrderStatus {
  Cancelled = 'Cancelled',
  Completed = 'Completed',
  New = 'New',
  OnHold = 'OnHold',
  OutForDelivery = 'OutForDelivery',
  PaymentFailed = 'PaymentFailed',
  PaymentPending = 'PaymentPending',
  Processing = 'Processing',
  ReadyForPickup = 'ReadyForPickup',
  Refunded = 'Refunded',
  Returned = 'Returned'
}

export type ShopOrderStatusFilterComparison = {
  eq?: InputMaybe<ShopOrderStatus>;
  gt?: InputMaybe<ShopOrderStatus>;
  gte?: InputMaybe<ShopOrderStatus>;
  iLike?: InputMaybe<ShopOrderStatus>;
  in?: InputMaybe<Array<ShopOrderStatus>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<ShopOrderStatus>;
  lt?: InputMaybe<ShopOrderStatus>;
  lte?: InputMaybe<ShopOrderStatus>;
  neq?: InputMaybe<ShopOrderStatus>;
  notILike?: InputMaybe<ShopOrderStatus>;
  notIn?: InputMaybe<Array<ShopOrderStatus>>;
  notLike?: InputMaybe<ShopOrderStatus>;
};

export type ShopOrderStatusHistoriesAggregateGroupBy = {
  __typename?: 'ShopOrderStatusHistoriesAggregateGroupBy';
  id?: Maybe<Scalars['ID']['output']>;
  orderId?: Maybe<Scalars['ID']['output']>;
};

export type ShopOrderStatusHistoriesAggregateResponse = {
  __typename?: 'ShopOrderStatusHistoriesAggregateResponse';
  avg?: Maybe<ShopOrderStatusHistoriesAvgAggregate>;
  count?: Maybe<ShopOrderStatusHistoriesCountAggregate>;
  groupBy?: Maybe<ShopOrderStatusHistoriesAggregateGroupBy>;
  max?: Maybe<ShopOrderStatusHistoriesMaxAggregate>;
  min?: Maybe<ShopOrderStatusHistoriesMinAggregate>;
  sum?: Maybe<ShopOrderStatusHistoriesSumAggregate>;
};

export type ShopOrderStatusHistoriesAvgAggregate = {
  __typename?: 'ShopOrderStatusHistoriesAvgAggregate';
  id?: Maybe<Scalars['Float']['output']>;
  orderId?: Maybe<Scalars['Float']['output']>;
};

export type ShopOrderStatusHistoriesCountAggregate = {
  __typename?: 'ShopOrderStatusHistoriesCountAggregate';
  id?: Maybe<Scalars['Int']['output']>;
  orderId?: Maybe<Scalars['Int']['output']>;
};

export type ShopOrderStatusHistoriesMaxAggregate = {
  __typename?: 'ShopOrderStatusHistoriesMaxAggregate';
  id?: Maybe<Scalars['ID']['output']>;
  orderId?: Maybe<Scalars['ID']['output']>;
};

export type ShopOrderStatusHistoriesMinAggregate = {
  __typename?: 'ShopOrderStatusHistoriesMinAggregate';
  id?: Maybe<Scalars['ID']['output']>;
  orderId?: Maybe<Scalars['ID']['output']>;
};

export type ShopOrderStatusHistoriesSumAggregate = {
  __typename?: 'ShopOrderStatusHistoriesSumAggregate';
  id?: Maybe<Scalars['Float']['output']>;
  orderId?: Maybe<Scalars['Float']['output']>;
};

export type ShopOrderStatusHistory = {
  __typename?: 'ShopOrderStatusHistory';
  expectedBy?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  orderCart: ShopOrderCart;
  orderId: Scalars['ID']['output'];
  status: ShopOrderStatus;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ShopOrderStatusHistoryAggregateFilter = {
  and?: InputMaybe<Array<ShopOrderStatusHistoryAggregateFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ShopOrderStatusHistoryAggregateFilter>>;
  orderId?: InputMaybe<IdFilterComparison>;
};

export type ShopOrderStatusHistoryFilter = {
  and?: InputMaybe<Array<ShopOrderStatusHistoryFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ShopOrderStatusHistoryFilter>>;
  orderId?: InputMaybe<IdFilterComparison>;
};

export type ShopOrderStatusHistorySort = {
  direction: SortDirection;
  field: ShopOrderStatusHistorySortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum ShopOrderStatusHistorySortFields {
  Id = 'id',
  OrderId = 'orderId'
}

export type ShopOrderSumAggregate = {
  __typename?: 'ShopOrderSumAggregate';
  customerId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  total?: Maybe<Scalars['Float']['output']>;
};

export type ShopPayoutSession = {
  __typename?: 'ShopPayoutSession';
  createdAt: Scalars['DateTime']['output'];
  currency: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  payoutMethodDetails: Array<ShopPayoutSessionPayoutMethodDetail>;
  payoutMethods: Array<PayoutMethod>;
  processedAt?: Maybe<Scalars['DateTime']['output']>;
  shopTransactions: ShopPayoutSessionShopTransactionsConnection;
  shopTransactionsAggregate: Array<ShopPayoutSessionShopTransactionsAggregateResponse>;
  status: PayoutSessionStatus;
  totalAmount: Scalars['Float']['output'];
};


export type ShopPayoutSessionPayoutMethodDetailsArgs = {
  filter?: ShopPayoutSessionPayoutMethodDetailFilter;
  sorting?: Array<ShopPayoutSessionPayoutMethodDetailSort>;
};


export type ShopPayoutSessionPayoutMethodsArgs = {
  filter?: PayoutMethodFilter;
  sorting?: Array<PayoutMethodSort>;
};


export type ShopPayoutSessionShopTransactionsArgs = {
  filter?: ShopTransactionFilter;
  paging?: OffsetPaging;
  sorting?: Array<ShopTransactionSort>;
};


export type ShopPayoutSessionShopTransactionsAggregateArgs = {
  filter?: InputMaybe<ShopTransactionAggregateFilter>;
};

export type ShopPayoutSessionConnection = {
  __typename?: 'ShopPayoutSessionConnection';
  /** Array of nodes. */
  nodes: Array<ShopPayoutSession>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type ShopPayoutSessionFilter = {
  and?: InputMaybe<Array<ShopPayoutSessionFilter>>;
  currency?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ShopPayoutSessionFilter>>;
  status?: InputMaybe<PayoutSessionStatusFilterComparison>;
  totalAmount?: InputMaybe<NumberFieldComparison>;
};

export type ShopPayoutSessionPayoutMethodDetail = {
  __typename?: 'ShopPayoutSessionPayoutMethodDetail';
  id: Scalars['ID']['output'];
  payoutMethod: PayoutMethod;
  shopTransactions: ShopPayoutSessionPayoutMethodDetailShopTransactionsConnection;
  shopTransactionsAggregate: Array<ShopPayoutSessionPayoutMethodDetailShopTransactionsAggregateResponse>;
  status: PayoutSessionStatus;
};


export type ShopPayoutSessionPayoutMethodDetailShopTransactionsArgs = {
  filter?: ShopTransactionFilter;
  paging?: OffsetPaging;
  sorting?: Array<ShopTransactionSort>;
};


export type ShopPayoutSessionPayoutMethodDetailShopTransactionsAggregateArgs = {
  filter?: InputMaybe<ShopTransactionAggregateFilter>;
};

export type ShopPayoutSessionPayoutMethodDetailFilter = {
  and?: InputMaybe<Array<ShopPayoutSessionPayoutMethodDetailFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ShopPayoutSessionPayoutMethodDetailFilter>>;
};

export type ShopPayoutSessionPayoutMethodDetailShopTransactionsAggregateGroupBy = {
  __typename?: 'ShopPayoutSessionPayoutMethodDetailShopTransactionsAggregateGroupBy';
  amount?: Maybe<Scalars['Float']['output']>;
  creditType?: Maybe<ShopTransactionCreditType>;
  currency?: Maybe<Scalars['String']['output']>;
  debitType?: Maybe<ShopTransactionDebitType>;
  id?: Maybe<Scalars['ID']['output']>;
  payoutAccountId?: Maybe<Scalars['ID']['output']>;
  payoutMethodId?: Maybe<Scalars['ID']['output']>;
  payoutSessionId?: Maybe<Scalars['ID']['output']>;
  payoutSessionMethodId?: Maybe<Scalars['ID']['output']>;
  shopId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<TransactionStatus>;
  type?: Maybe<TransactionType>;
};

export type ShopPayoutSessionPayoutMethodDetailShopTransactionsAggregateResponse = {
  __typename?: 'ShopPayoutSessionPayoutMethodDetailShopTransactionsAggregateResponse';
  avg?: Maybe<ShopPayoutSessionPayoutMethodDetailShopTransactionsAvgAggregate>;
  count?: Maybe<ShopPayoutSessionPayoutMethodDetailShopTransactionsCountAggregate>;
  groupBy?: Maybe<ShopPayoutSessionPayoutMethodDetailShopTransactionsAggregateGroupBy>;
  max?: Maybe<ShopPayoutSessionPayoutMethodDetailShopTransactionsMaxAggregate>;
  min?: Maybe<ShopPayoutSessionPayoutMethodDetailShopTransactionsMinAggregate>;
  sum?: Maybe<ShopPayoutSessionPayoutMethodDetailShopTransactionsSumAggregate>;
};

export type ShopPayoutSessionPayoutMethodDetailShopTransactionsAvgAggregate = {
  __typename?: 'ShopPayoutSessionPayoutMethodDetailShopTransactionsAvgAggregate';
  amount?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  payoutAccountId?: Maybe<Scalars['Float']['output']>;
  payoutMethodId?: Maybe<Scalars['Float']['output']>;
  payoutSessionId?: Maybe<Scalars['Float']['output']>;
  payoutSessionMethodId?: Maybe<Scalars['Float']['output']>;
  shopId?: Maybe<Scalars['Float']['output']>;
};

export type ShopPayoutSessionPayoutMethodDetailShopTransactionsConnection = {
  __typename?: 'ShopPayoutSessionPayoutMethodDetailShopTransactionsConnection';
  /** Array of nodes. */
  nodes: Array<ShopTransaction>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type ShopPayoutSessionPayoutMethodDetailShopTransactionsCountAggregate = {
  __typename?: 'ShopPayoutSessionPayoutMethodDetailShopTransactionsCountAggregate';
  amount?: Maybe<Scalars['Int']['output']>;
  creditType?: Maybe<Scalars['Int']['output']>;
  currency?: Maybe<Scalars['Int']['output']>;
  debitType?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  payoutAccountId?: Maybe<Scalars['Int']['output']>;
  payoutMethodId?: Maybe<Scalars['Int']['output']>;
  payoutSessionId?: Maybe<Scalars['Int']['output']>;
  payoutSessionMethodId?: Maybe<Scalars['Int']['output']>;
  shopId?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<Scalars['Int']['output']>;
};

export type ShopPayoutSessionPayoutMethodDetailShopTransactionsMaxAggregate = {
  __typename?: 'ShopPayoutSessionPayoutMethodDetailShopTransactionsMaxAggregate';
  amount?: Maybe<Scalars['Float']['output']>;
  creditType?: Maybe<ShopTransactionCreditType>;
  currency?: Maybe<Scalars['String']['output']>;
  debitType?: Maybe<ShopTransactionDebitType>;
  id?: Maybe<Scalars['ID']['output']>;
  payoutAccountId?: Maybe<Scalars['ID']['output']>;
  payoutMethodId?: Maybe<Scalars['ID']['output']>;
  payoutSessionId?: Maybe<Scalars['ID']['output']>;
  payoutSessionMethodId?: Maybe<Scalars['ID']['output']>;
  shopId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<TransactionStatus>;
  type?: Maybe<TransactionType>;
};

export type ShopPayoutSessionPayoutMethodDetailShopTransactionsMinAggregate = {
  __typename?: 'ShopPayoutSessionPayoutMethodDetailShopTransactionsMinAggregate';
  amount?: Maybe<Scalars['Float']['output']>;
  creditType?: Maybe<ShopTransactionCreditType>;
  currency?: Maybe<Scalars['String']['output']>;
  debitType?: Maybe<ShopTransactionDebitType>;
  id?: Maybe<Scalars['ID']['output']>;
  payoutAccountId?: Maybe<Scalars['ID']['output']>;
  payoutMethodId?: Maybe<Scalars['ID']['output']>;
  payoutSessionId?: Maybe<Scalars['ID']['output']>;
  payoutSessionMethodId?: Maybe<Scalars['ID']['output']>;
  shopId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<TransactionStatus>;
  type?: Maybe<TransactionType>;
};

export type ShopPayoutSessionPayoutMethodDetailShopTransactionsSumAggregate = {
  __typename?: 'ShopPayoutSessionPayoutMethodDetailShopTransactionsSumAggregate';
  amount?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  payoutAccountId?: Maybe<Scalars['Float']['output']>;
  payoutMethodId?: Maybe<Scalars['Float']['output']>;
  payoutSessionId?: Maybe<Scalars['Float']['output']>;
  payoutSessionMethodId?: Maybe<Scalars['Float']['output']>;
  shopId?: Maybe<Scalars['Float']['output']>;
};

export type ShopPayoutSessionPayoutMethodDetailSort = {
  direction: SortDirection;
  field: ShopPayoutSessionPayoutMethodDetailSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum ShopPayoutSessionPayoutMethodDetailSortFields {
  Id = 'id'
}

export type ShopPayoutSessionShopTransactionsAggregateGroupBy = {
  __typename?: 'ShopPayoutSessionShopTransactionsAggregateGroupBy';
  amount?: Maybe<Scalars['Float']['output']>;
  creditType?: Maybe<ShopTransactionCreditType>;
  currency?: Maybe<Scalars['String']['output']>;
  debitType?: Maybe<ShopTransactionDebitType>;
  id?: Maybe<Scalars['ID']['output']>;
  payoutAccountId?: Maybe<Scalars['ID']['output']>;
  payoutMethodId?: Maybe<Scalars['ID']['output']>;
  payoutSessionId?: Maybe<Scalars['ID']['output']>;
  payoutSessionMethodId?: Maybe<Scalars['ID']['output']>;
  shopId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<TransactionStatus>;
  type?: Maybe<TransactionType>;
};

export type ShopPayoutSessionShopTransactionsAggregateResponse = {
  __typename?: 'ShopPayoutSessionShopTransactionsAggregateResponse';
  avg?: Maybe<ShopPayoutSessionShopTransactionsAvgAggregate>;
  count?: Maybe<ShopPayoutSessionShopTransactionsCountAggregate>;
  groupBy?: Maybe<ShopPayoutSessionShopTransactionsAggregateGroupBy>;
  max?: Maybe<ShopPayoutSessionShopTransactionsMaxAggregate>;
  min?: Maybe<ShopPayoutSessionShopTransactionsMinAggregate>;
  sum?: Maybe<ShopPayoutSessionShopTransactionsSumAggregate>;
};

export type ShopPayoutSessionShopTransactionsAvgAggregate = {
  __typename?: 'ShopPayoutSessionShopTransactionsAvgAggregate';
  amount?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  payoutAccountId?: Maybe<Scalars['Float']['output']>;
  payoutMethodId?: Maybe<Scalars['Float']['output']>;
  payoutSessionId?: Maybe<Scalars['Float']['output']>;
  payoutSessionMethodId?: Maybe<Scalars['Float']['output']>;
  shopId?: Maybe<Scalars['Float']['output']>;
};

export type ShopPayoutSessionShopTransactionsConnection = {
  __typename?: 'ShopPayoutSessionShopTransactionsConnection';
  /** Array of nodes. */
  nodes: Array<ShopTransaction>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type ShopPayoutSessionShopTransactionsCountAggregate = {
  __typename?: 'ShopPayoutSessionShopTransactionsCountAggregate';
  amount?: Maybe<Scalars['Int']['output']>;
  creditType?: Maybe<Scalars['Int']['output']>;
  currency?: Maybe<Scalars['Int']['output']>;
  debitType?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  payoutAccountId?: Maybe<Scalars['Int']['output']>;
  payoutMethodId?: Maybe<Scalars['Int']['output']>;
  payoutSessionId?: Maybe<Scalars['Int']['output']>;
  payoutSessionMethodId?: Maybe<Scalars['Int']['output']>;
  shopId?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<Scalars['Int']['output']>;
};

export type ShopPayoutSessionShopTransactionsMaxAggregate = {
  __typename?: 'ShopPayoutSessionShopTransactionsMaxAggregate';
  amount?: Maybe<Scalars['Float']['output']>;
  creditType?: Maybe<ShopTransactionCreditType>;
  currency?: Maybe<Scalars['String']['output']>;
  debitType?: Maybe<ShopTransactionDebitType>;
  id?: Maybe<Scalars['ID']['output']>;
  payoutAccountId?: Maybe<Scalars['ID']['output']>;
  payoutMethodId?: Maybe<Scalars['ID']['output']>;
  payoutSessionId?: Maybe<Scalars['ID']['output']>;
  payoutSessionMethodId?: Maybe<Scalars['ID']['output']>;
  shopId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<TransactionStatus>;
  type?: Maybe<TransactionType>;
};

export type ShopPayoutSessionShopTransactionsMinAggregate = {
  __typename?: 'ShopPayoutSessionShopTransactionsMinAggregate';
  amount?: Maybe<Scalars['Float']['output']>;
  creditType?: Maybe<ShopTransactionCreditType>;
  currency?: Maybe<Scalars['String']['output']>;
  debitType?: Maybe<ShopTransactionDebitType>;
  id?: Maybe<Scalars['ID']['output']>;
  payoutAccountId?: Maybe<Scalars['ID']['output']>;
  payoutMethodId?: Maybe<Scalars['ID']['output']>;
  payoutSessionId?: Maybe<Scalars['ID']['output']>;
  payoutSessionMethodId?: Maybe<Scalars['ID']['output']>;
  shopId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<TransactionStatus>;
  type?: Maybe<TransactionType>;
};

export type ShopPayoutSessionShopTransactionsSumAggregate = {
  __typename?: 'ShopPayoutSessionShopTransactionsSumAggregate';
  amount?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  payoutAccountId?: Maybe<Scalars['Float']['output']>;
  payoutMethodId?: Maybe<Scalars['Float']['output']>;
  payoutSessionId?: Maybe<Scalars['Float']['output']>;
  payoutSessionMethodId?: Maybe<Scalars['Float']['output']>;
  shopId?: Maybe<Scalars['Float']['output']>;
};

export type ShopPayoutSessionSort = {
  direction: SortDirection;
  field: ShopPayoutSessionSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum ShopPayoutSessionSortFields {
  Currency = 'currency',
  Id = 'id',
  Status = 'status',
  TotalAmount = 'totalAmount'
}

export type ShopPendingVerificationNotification = {
  __typename?: 'ShopPendingVerificationNotification';
  appType: AppType;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  readAt?: Maybe<Scalars['DateTime']['output']>;
  shopPendingVerification: Shop;
  type: AdminNotificationType;
};

export enum ShopPermission {
  OrderEdit = 'ORDER_EDIT',
  OrderView = 'ORDER_VIEW',
  ShopEdit = 'SHOP_EDIT',
  ShopView = 'SHOP_VIEW'
}

export type ShopReviewPendingApprovalNotification = {
  __typename?: 'ShopReviewPendingApprovalNotification';
  appType: AppType;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  readAt?: Maybe<Scalars['DateTime']['output']>;
  shopReviewPendingApproval: ShopFeedback;
  type: AdminNotificationType;
};

export type ShopSession = {
  __typename?: 'ShopSession';
  appType: AppType;
  createdAt: Scalars['DateTime']['output'];
  deviceName?: Maybe<Scalars['String']['output']>;
  devicePlatform: DevicePlatform;
  deviceType: DeviceType;
  id: Scalars['ID']['output'];
  ipLocation?: Maybe<Scalars['String']['output']>;
  lastActivityAt?: Maybe<Scalars['DateTime']['output']>;
  shopId: Scalars['ID']['output'];
};

export type ShopSessionAggregateFilter = {
  and?: InputMaybe<Array<ShopSessionAggregateFilter>>;
  appType?: InputMaybe<AppTypeFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ShopSessionAggregateFilter>>;
  shopId?: InputMaybe<IdFilterComparison>;
};

export type ShopSessionFilter = {
  and?: InputMaybe<Array<ShopSessionFilter>>;
  appType?: InputMaybe<AppTypeFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ShopSessionFilter>>;
  shopId?: InputMaybe<IdFilterComparison>;
};

export type ShopSessionSort = {
  direction: SortDirection;
  field: ShopSessionSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum ShopSessionSortFields {
  AppType = 'appType',
  Id = 'id',
  ShopId = 'shopId'
}

export type ShopSessionsAggregateGroupBy = {
  __typename?: 'ShopSessionsAggregateGroupBy';
  appType?: Maybe<AppType>;
  id?: Maybe<Scalars['ID']['output']>;
  shopId?: Maybe<Scalars['ID']['output']>;
};

export type ShopSessionsAggregateResponse = {
  __typename?: 'ShopSessionsAggregateResponse';
  avg?: Maybe<ShopSessionsAvgAggregate>;
  count?: Maybe<ShopSessionsCountAggregate>;
  groupBy?: Maybe<ShopSessionsAggregateGroupBy>;
  max?: Maybe<ShopSessionsMaxAggregate>;
  min?: Maybe<ShopSessionsMinAggregate>;
  sum?: Maybe<ShopSessionsSumAggregate>;
};

export type ShopSessionsAvgAggregate = {
  __typename?: 'ShopSessionsAvgAggregate';
  id?: Maybe<Scalars['Float']['output']>;
  shopId?: Maybe<Scalars['Float']['output']>;
};

export type ShopSessionsCountAggregate = {
  __typename?: 'ShopSessionsCountAggregate';
  appType?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  shopId?: Maybe<Scalars['Int']['output']>;
};

export type ShopSessionsMaxAggregate = {
  __typename?: 'ShopSessionsMaxAggregate';
  appType?: Maybe<AppType>;
  id?: Maybe<Scalars['ID']['output']>;
  shopId?: Maybe<Scalars['ID']['output']>;
};

export type ShopSessionsMinAggregate = {
  __typename?: 'ShopSessionsMinAggregate';
  appType?: Maybe<AppType>;
  id?: Maybe<Scalars['ID']['output']>;
  shopId?: Maybe<Scalars['ID']['output']>;
};

export type ShopSessionsSumAggregate = {
  __typename?: 'ShopSessionsSumAggregate';
  id?: Maybe<Scalars['Float']['output']>;
  shopId?: Maybe<Scalars['Float']['output']>;
};

export type ShopSort = {
  direction: SortDirection;
  field: ShopSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum ShopSortFields {
  Id = 'id',
  Name = 'name',
  RatingAggregate = 'ratingAggregate',
  Status = 'status'
}

/** The status of the shop */
export enum ShopStatus {
  Active = 'Active',
  Blocked = 'Blocked',
  Deleted = 'Deleted',
  Inactive = 'Inactive',
  PendingApproval = 'PendingApproval',
  PendingSubmission = 'PendingSubmission'
}

export type ShopStatusFilterComparison = {
  eq?: InputMaybe<ShopStatus>;
  gt?: InputMaybe<ShopStatus>;
  gte?: InputMaybe<ShopStatus>;
  iLike?: InputMaybe<ShopStatus>;
  in?: InputMaybe<Array<ShopStatus>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<ShopStatus>;
  lt?: InputMaybe<ShopStatus>;
  lte?: InputMaybe<ShopStatus>;
  neq?: InputMaybe<ShopStatus>;
  notILike?: InputMaybe<ShopStatus>;
  notIn?: InputMaybe<Array<ShopStatus>>;
  notLike?: InputMaybe<ShopStatus>;
};

export type ShopSumAggregate = {
  __typename?: 'ShopSumAggregate';
  id?: Maybe<Scalars['Float']['output']>;
};

export type ShopSupportRequest = {
  __typename?: 'ShopSupportRequest';
  activities: Array<ShopSupportRequestActivity>;
  activitiesAggregate: Array<ShopSupportRequestActivitiesAggregateResponse>;
  assignedToStaffs: Array<Operator>;
  assignedToStaffsAggregate: Array<ShopSupportRequestAssignedToStaffsAggregateResponse>;
  cart?: Maybe<ShopOrderCart>;
  cartId?: Maybe<Scalars['ID']['output']>;
  content?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  order: ShopOrder;
  orderId: Scalars['ID']['output'];
  requestedByShop: Scalars['Boolean']['output'];
  status: ComplaintStatus;
  subject: Scalars['String']['output'];
};


export type ShopSupportRequestActivitiesArgs = {
  filter?: ShopSupportRequestActivityFilter;
  sorting?: Array<ShopSupportRequestActivitySort>;
};


export type ShopSupportRequestActivitiesAggregateArgs = {
  filter?: InputMaybe<ShopSupportRequestActivityAggregateFilter>;
};


export type ShopSupportRequestAssignedToStaffsAggregateArgs = {
  filter?: InputMaybe<OperatorAggregateFilter>;
};

export type ShopSupportRequestActivitiesAggregateGroupBy = {
  __typename?: 'ShopSupportRequestActivitiesAggregateGroupBy';
  id?: Maybe<Scalars['ID']['output']>;
};

export type ShopSupportRequestActivitiesAggregateResponse = {
  __typename?: 'ShopSupportRequestActivitiesAggregateResponse';
  avg?: Maybe<ShopSupportRequestActivitiesAvgAggregate>;
  count?: Maybe<ShopSupportRequestActivitiesCountAggregate>;
  groupBy?: Maybe<ShopSupportRequestActivitiesAggregateGroupBy>;
  max?: Maybe<ShopSupportRequestActivitiesMaxAggregate>;
  min?: Maybe<ShopSupportRequestActivitiesMinAggregate>;
  sum?: Maybe<ShopSupportRequestActivitiesSumAggregate>;
};

export type ShopSupportRequestActivitiesAvgAggregate = {
  __typename?: 'ShopSupportRequestActivitiesAvgAggregate';
  id?: Maybe<Scalars['Float']['output']>;
};

export type ShopSupportRequestActivitiesCountAggregate = {
  __typename?: 'ShopSupportRequestActivitiesCountAggregate';
  id?: Maybe<Scalars['Int']['output']>;
};

export type ShopSupportRequestActivitiesMaxAggregate = {
  __typename?: 'ShopSupportRequestActivitiesMaxAggregate';
  id?: Maybe<Scalars['ID']['output']>;
};

export type ShopSupportRequestActivitiesMinAggregate = {
  __typename?: 'ShopSupportRequestActivitiesMinAggregate';
  id?: Maybe<Scalars['ID']['output']>;
};

export type ShopSupportRequestActivitiesSumAggregate = {
  __typename?: 'ShopSupportRequestActivitiesSumAggregate';
  id?: Maybe<Scalars['Float']['output']>;
};

export type ShopSupportRequestActivity = {
  __typename?: 'ShopSupportRequestActivity';
  actor?: Maybe<Operator>;
  assignedToStaffs: Array<Operator>;
  comment?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  statusFrom?: Maybe<ComplaintStatus>;
  statusTo?: Maybe<ComplaintStatus>;
  type: ComplaintActivityType;
  unassignedFromStaffs: Array<Operator>;
};

export type ShopSupportRequestActivityAggregateFilter = {
  and?: InputMaybe<Array<ShopSupportRequestActivityAggregateFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ShopSupportRequestActivityAggregateFilter>>;
};

export type ShopSupportRequestActivityFilter = {
  and?: InputMaybe<Array<ShopSupportRequestActivityFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ShopSupportRequestActivityFilter>>;
};

export type ShopSupportRequestActivitySort = {
  direction: SortDirection;
  field: ShopSupportRequestActivitySortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum ShopSupportRequestActivitySortFields {
  Id = 'id'
}

export type ShopSupportRequestAggregateFilter = {
  and?: InputMaybe<Array<ShopSupportRequestAggregateFilter>>;
  cartId?: InputMaybe<IdFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ShopSupportRequestAggregateFilter>>;
  order?: InputMaybe<ShopSupportRequestAggregateFilterShopOrderAggregateFilter>;
  orderId?: InputMaybe<IdFilterComparison>;
  requestedByShop?: InputMaybe<BooleanFieldComparison>;
  status?: InputMaybe<ComplaintStatusFilterComparison>;
};

export type ShopSupportRequestAggregateFilterShopOrderAggregateFilter = {
  and?: InputMaybe<Array<ShopSupportRequestAggregateFilterShopOrderAggregateFilter>>;
  createdAt?: InputMaybe<DateFieldComparison>;
  currency?: InputMaybe<StringFieldComparison>;
  customerId?: InputMaybe<IdFilterComparison>;
  deliveryMethod?: InputMaybe<DeliveryMethodFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ShopSupportRequestAggregateFilterShopOrderAggregateFilter>>;
  paymentMethod?: InputMaybe<PaymentModeFilterComparison>;
  status?: InputMaybe<ShopOrderStatusFilterComparison>;
  total?: InputMaybe<FloatFieldComparison>;
};

export type ShopSupportRequestAggregateGroupBy = {
  __typename?: 'ShopSupportRequestAggregateGroupBy';
  cartId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  orderId?: Maybe<Scalars['ID']['output']>;
  requestedByShop?: Maybe<Scalars['Boolean']['output']>;
  status?: Maybe<ComplaintStatus>;
};

export type ShopSupportRequestAggregateResponse = {
  __typename?: 'ShopSupportRequestAggregateResponse';
  avg?: Maybe<ShopSupportRequestAvgAggregate>;
  count?: Maybe<ShopSupportRequestCountAggregate>;
  groupBy?: Maybe<ShopSupportRequestAggregateGroupBy>;
  max?: Maybe<ShopSupportRequestMaxAggregate>;
  min?: Maybe<ShopSupportRequestMinAggregate>;
  sum?: Maybe<ShopSupportRequestSumAggregate>;
};

export type ShopSupportRequestAssignedToStaffsAggregateGroupBy = {
  __typename?: 'ShopSupportRequestAssignedToStaffsAggregateGroupBy';
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  isBlocked?: Maybe<Scalars['Boolean']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  mobileNumber?: Maybe<Scalars['String']['output']>;
  roleId?: Maybe<Scalars['ID']['output']>;
  userName?: Maybe<Scalars['String']['output']>;
};

export type ShopSupportRequestAssignedToStaffsAggregateResponse = {
  __typename?: 'ShopSupportRequestAssignedToStaffsAggregateResponse';
  avg?: Maybe<ShopSupportRequestAssignedToStaffsAvgAggregate>;
  count?: Maybe<ShopSupportRequestAssignedToStaffsCountAggregate>;
  groupBy?: Maybe<ShopSupportRequestAssignedToStaffsAggregateGroupBy>;
  max?: Maybe<ShopSupportRequestAssignedToStaffsMaxAggregate>;
  min?: Maybe<ShopSupportRequestAssignedToStaffsMinAggregate>;
  sum?: Maybe<ShopSupportRequestAssignedToStaffsSumAggregate>;
};

export type ShopSupportRequestAssignedToStaffsAvgAggregate = {
  __typename?: 'ShopSupportRequestAssignedToStaffsAvgAggregate';
  id?: Maybe<Scalars['Float']['output']>;
  roleId?: Maybe<Scalars['Float']['output']>;
};

export type ShopSupportRequestAssignedToStaffsCountAggregate = {
  __typename?: 'ShopSupportRequestAssignedToStaffsCountAggregate';
  email?: Maybe<Scalars['Int']['output']>;
  firstName?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  isBlocked?: Maybe<Scalars['Int']['output']>;
  lastName?: Maybe<Scalars['Int']['output']>;
  mobileNumber?: Maybe<Scalars['Int']['output']>;
  roleId?: Maybe<Scalars['Int']['output']>;
  userName?: Maybe<Scalars['Int']['output']>;
};

export type ShopSupportRequestAssignedToStaffsMaxAggregate = {
  __typename?: 'ShopSupportRequestAssignedToStaffsMaxAggregate';
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  mobileNumber?: Maybe<Scalars['String']['output']>;
  roleId?: Maybe<Scalars['ID']['output']>;
  userName?: Maybe<Scalars['String']['output']>;
};

export type ShopSupportRequestAssignedToStaffsMinAggregate = {
  __typename?: 'ShopSupportRequestAssignedToStaffsMinAggregate';
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  mobileNumber?: Maybe<Scalars['String']['output']>;
  roleId?: Maybe<Scalars['ID']['output']>;
  userName?: Maybe<Scalars['String']['output']>;
};

export type ShopSupportRequestAssignedToStaffsSumAggregate = {
  __typename?: 'ShopSupportRequestAssignedToStaffsSumAggregate';
  id?: Maybe<Scalars['Float']['output']>;
  roleId?: Maybe<Scalars['Float']['output']>;
};

export type ShopSupportRequestAvgAggregate = {
  __typename?: 'ShopSupportRequestAvgAggregate';
  cartId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  orderId?: Maybe<Scalars['Float']['output']>;
};

export type ShopSupportRequestConnection = {
  __typename?: 'ShopSupportRequestConnection';
  /** Array of nodes. */
  nodes: Array<ShopSupportRequest>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type ShopSupportRequestCountAggregate = {
  __typename?: 'ShopSupportRequestCountAggregate';
  cartId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  orderId?: Maybe<Scalars['Int']['output']>;
  requestedByShop?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
};

export type ShopSupportRequestFilter = {
  and?: InputMaybe<Array<ShopSupportRequestFilter>>;
  cartId?: InputMaybe<IdFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ShopSupportRequestFilter>>;
  order?: InputMaybe<ShopSupportRequestFilterShopOrderFilter>;
  orderId?: InputMaybe<IdFilterComparison>;
  requestedByShop?: InputMaybe<BooleanFieldComparison>;
  status?: InputMaybe<ComplaintStatusFilterComparison>;
};

export type ShopSupportRequestFilterShopOrderFilter = {
  and?: InputMaybe<Array<ShopSupportRequestFilterShopOrderFilter>>;
  createdAt?: InputMaybe<DateFieldComparison>;
  currency?: InputMaybe<StringFieldComparison>;
  customerId?: InputMaybe<IdFilterComparison>;
  deliveryMethod?: InputMaybe<DeliveryMethodFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ShopSupportRequestFilterShopOrderFilter>>;
  paymentMethod?: InputMaybe<PaymentModeFilterComparison>;
  status?: InputMaybe<ShopOrderStatusFilterComparison>;
  total?: InputMaybe<FloatFieldComparison>;
};

export type ShopSupportRequestMaxAggregate = {
  __typename?: 'ShopSupportRequestMaxAggregate';
  cartId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  orderId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<ComplaintStatus>;
};

export type ShopSupportRequestMinAggregate = {
  __typename?: 'ShopSupportRequestMinAggregate';
  cartId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  orderId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<ComplaintStatus>;
};

export type ShopSupportRequestNotification = {
  __typename?: 'ShopSupportRequestNotification';
  appType: AppType;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  readAt?: Maybe<Scalars['DateTime']['output']>;
  shopSupportRequest: ShopSupportRequest;
  type: AdminNotificationType;
};

export type ShopSupportRequestSort = {
  direction: SortDirection;
  field: ShopSupportRequestSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum ShopSupportRequestSortFields {
  CartId = 'cartId',
  Id = 'id',
  OrderId = 'orderId',
  RequestedByShop = 'requestedByShop',
  Status = 'status'
}

export type ShopSupportRequestSumAggregate = {
  __typename?: 'ShopSupportRequestSumAggregate';
  cartId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  orderId?: Maybe<Scalars['Float']['output']>;
};

export type ShopTransaction = {
  __typename?: 'ShopTransaction';
  amount: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  creditType?: Maybe<ShopTransactionCreditType>;
  currency: Scalars['String']['output'];
  debitType?: Maybe<ShopTransactionDebitType>;
  description?: Maybe<Scalars['String']['output']>;
  documentNumber?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  paymentGateway?: Maybe<PaymentGateway>;
  payoutAccount?: Maybe<PayoutAccount>;
  payoutAccountId?: Maybe<Scalars['ID']['output']>;
  payoutMethod?: Maybe<PayoutMethod>;
  payoutMethodId?: Maybe<Scalars['ID']['output']>;
  payoutSessionId?: Maybe<Scalars['ID']['output']>;
  payoutSessionMethodId?: Maybe<Scalars['ID']['output']>;
  savedPaymentMethod?: Maybe<SavedPaymentMethod>;
  shop: Shop;
  shopId: Scalars['ID']['output'];
  staff?: Maybe<Operator>;
  status: TransactionStatus;
  transactionDate: Scalars['DateTime']['output'];
  type: TransactionType;
};

export type ShopTransactionAggregateFilter = {
  amount?: InputMaybe<NumberFieldComparison>;
  and?: InputMaybe<Array<ShopTransactionAggregateFilter>>;
  creditType?: InputMaybe<ShopTransactionCreditTypeFilterComparison>;
  currency?: InputMaybe<StringFieldComparison>;
  debitType?: InputMaybe<ShopTransactionDebitTypeFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ShopTransactionAggregateFilter>>;
  payoutAccountId?: InputMaybe<IdFilterComparison>;
  payoutMethod?: InputMaybe<ShopTransactionAggregateFilterPayoutMethodAggregateFilter>;
  payoutMethodId?: InputMaybe<IdFilterComparison>;
  payoutSessionId?: InputMaybe<IdFilterComparison>;
  payoutSessionMethodId?: InputMaybe<IdFilterComparison>;
  shopId?: InputMaybe<IdFilterComparison>;
  status?: InputMaybe<TransactionStatusFilterComparison>;
  type?: InputMaybe<TransactionTypeFilterComparison>;
};

export type ShopTransactionAggregateFilterPayoutMethodAggregateFilter = {
  and?: InputMaybe<Array<ShopTransactionAggregateFilterPayoutMethodAggregateFilter>>;
  currency?: InputMaybe<StringFieldComparison>;
  enabled?: InputMaybe<BooleanFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<ShopTransactionAggregateFilterPayoutMethodAggregateFilter>>;
  type?: InputMaybe<PayoutMethodTypeFilterComparison>;
};

export type ShopTransactionConnection = {
  __typename?: 'ShopTransactionConnection';
  /** Array of nodes. */
  nodes: Array<ShopTransaction>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export enum ShopTransactionCreditType {
  Correction = 'Correction',
  SaleRevenue = 'SaleRevenue'
}

export type ShopTransactionCreditTypeFilterComparison = {
  eq?: InputMaybe<ShopTransactionCreditType>;
  gt?: InputMaybe<ShopTransactionCreditType>;
  gte?: InputMaybe<ShopTransactionCreditType>;
  iLike?: InputMaybe<ShopTransactionCreditType>;
  in?: InputMaybe<Array<ShopTransactionCreditType>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<ShopTransactionCreditType>;
  lt?: InputMaybe<ShopTransactionCreditType>;
  lte?: InputMaybe<ShopTransactionCreditType>;
  neq?: InputMaybe<ShopTransactionCreditType>;
  notILike?: InputMaybe<ShopTransactionCreditType>;
  notIn?: InputMaybe<Array<ShopTransactionCreditType>>;
  notLike?: InputMaybe<ShopTransactionCreditType>;
};

export enum ShopTransactionDebitType {
  Commission = 'Commission',
  Correction = 'Correction',
  Payout = 'Payout',
  Refund = 'Refund'
}

export type ShopTransactionDebitTypeFilterComparison = {
  eq?: InputMaybe<ShopTransactionDebitType>;
  gt?: InputMaybe<ShopTransactionDebitType>;
  gte?: InputMaybe<ShopTransactionDebitType>;
  iLike?: InputMaybe<ShopTransactionDebitType>;
  in?: InputMaybe<Array<ShopTransactionDebitType>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<ShopTransactionDebitType>;
  lt?: InputMaybe<ShopTransactionDebitType>;
  lte?: InputMaybe<ShopTransactionDebitType>;
  neq?: InputMaybe<ShopTransactionDebitType>;
  notILike?: InputMaybe<ShopTransactionDebitType>;
  notIn?: InputMaybe<Array<ShopTransactionDebitType>>;
  notLike?: InputMaybe<ShopTransactionDebitType>;
};

export type ShopTransactionFilter = {
  amount?: InputMaybe<NumberFieldComparison>;
  and?: InputMaybe<Array<ShopTransactionFilter>>;
  creditType?: InputMaybe<ShopTransactionCreditTypeFilterComparison>;
  currency?: InputMaybe<StringFieldComparison>;
  debitType?: InputMaybe<ShopTransactionDebitTypeFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ShopTransactionFilter>>;
  payoutAccountId?: InputMaybe<IdFilterComparison>;
  payoutMethod?: InputMaybe<ShopTransactionFilterPayoutMethodFilter>;
  payoutMethodId?: InputMaybe<IdFilterComparison>;
  payoutSessionId?: InputMaybe<IdFilterComparison>;
  payoutSessionMethodId?: InputMaybe<IdFilterComparison>;
  shopId?: InputMaybe<IdFilterComparison>;
  status?: InputMaybe<TransactionStatusFilterComparison>;
  type?: InputMaybe<TransactionTypeFilterComparison>;
};

export type ShopTransactionFilterPayoutMethodFilter = {
  and?: InputMaybe<Array<ShopTransactionFilterPayoutMethodFilter>>;
  currency?: InputMaybe<StringFieldComparison>;
  enabled?: InputMaybe<BooleanFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<ShopTransactionFilterPayoutMethodFilter>>;
  type?: InputMaybe<PayoutMethodTypeFilterComparison>;
};

export type ShopTransactionSort = {
  direction: SortDirection;
  field: ShopTransactionSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum ShopTransactionSortFields {
  Amount = 'amount',
  CreditType = 'creditType',
  Currency = 'currency',
  DebitType = 'debitType',
  Id = 'id',
  PayoutAccountId = 'payoutAccountId',
  PayoutMethodId = 'payoutMethodId',
  PayoutSessionId = 'payoutSessionId',
  PayoutSessionMethodId = 'payoutSessionMethodId',
  ShopId = 'shopId',
  Status = 'status',
  Type = 'type'
}

export type ShopWallet = {
  __typename?: 'ShopWallet';
  balance: Scalars['Float']['output'];
  currency: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  shop: Shop;
  shopId: Scalars['ID']['output'];
};

export type ShopWalletAggregateFilter = {
  and?: InputMaybe<Array<ShopWalletAggregateFilter>>;
  balance?: InputMaybe<NumberFieldComparison>;
  currency?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ShopWalletAggregateFilter>>;
  shopId?: InputMaybe<IdFilterComparison>;
};

export type ShopWalletAggregateGroupBy = {
  __typename?: 'ShopWalletAggregateGroupBy';
  balance?: Maybe<Scalars['Float']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  shopId?: Maybe<Scalars['ID']['output']>;
};

export type ShopWalletAggregateResponse = {
  __typename?: 'ShopWalletAggregateResponse';
  avg?: Maybe<ShopWalletAvgAggregate>;
  count?: Maybe<ShopWalletCountAggregate>;
  groupBy?: Maybe<ShopWalletAggregateGroupBy>;
  max?: Maybe<ShopWalletMaxAggregate>;
  min?: Maybe<ShopWalletMinAggregate>;
  sum?: Maybe<ShopWalletSumAggregate>;
};

export type ShopWalletAvgAggregate = {
  __typename?: 'ShopWalletAvgAggregate';
  balance?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  shopId?: Maybe<Scalars['Float']['output']>;
};

export type ShopWalletConnection = {
  __typename?: 'ShopWalletConnection';
  /** Array of nodes. */
  nodes: Array<ShopWallet>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type ShopWalletCountAggregate = {
  __typename?: 'ShopWalletCountAggregate';
  balance?: Maybe<Scalars['Int']['output']>;
  currency?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  shopId?: Maybe<Scalars['Int']['output']>;
};

export type ShopWalletFilter = {
  and?: InputMaybe<Array<ShopWalletFilter>>;
  balance?: InputMaybe<NumberFieldComparison>;
  currency?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ShopWalletFilter>>;
  shopId?: InputMaybe<IdFilterComparison>;
};

export type ShopWalletMaxAggregate = {
  __typename?: 'ShopWalletMaxAggregate';
  balance?: Maybe<Scalars['Float']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  shopId?: Maybe<Scalars['ID']['output']>;
};

export type ShopWalletMinAggregate = {
  __typename?: 'ShopWalletMinAggregate';
  balance?: Maybe<Scalars['Float']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  shopId?: Maybe<Scalars['ID']['output']>;
};

export type ShopWalletSort = {
  direction: SortDirection;
  field: ShopWalletSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum ShopWalletSortFields {
  Balance = 'balance',
  Currency = 'currency',
  Id = 'id',
  ShopId = 'shopId'
}

export type ShopWalletSumAggregate = {
  __typename?: 'ShopWalletSumAggregate';
  balance?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  shopId?: Maybe<Scalars['Float']['output']>;
};

/** Sort Directions */
export enum SortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

/** Sort Nulls Options */
export enum SortNulls {
  NullsFirst = 'NULLS_FIRST',
  NullsLast = 'NULLS_LAST'
}

export type StringFieldComparison = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  iLike?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  neq?: InputMaybe<Scalars['String']['input']>;
  notILike?: InputMaybe<Scalars['String']['input']>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  complaintCreated: TaxiSupportRequest;
  notificationCreated: AdminNotificationUnion;
  orderUpdated: Order;
  sosCreated: DistressSignal;
};


export type SubscriptionOrderUpdatedArgs = {
  orderId: Scalars['ID']['input'];
};

export type TaxiOrderNote = {
  __typename?: 'TaxiOrderNote';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  note: Scalars['String']['output'];
  orderId: Scalars['ID']['output'];
  staff: Operator;
};

export type TaxiOrderNoteConnection = {
  __typename?: 'TaxiOrderNoteConnection';
  /** Array of nodes. */
  nodes: Array<TaxiOrderNote>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
};

export type TaxiOrderNoteFilter = {
  and?: InputMaybe<Array<TaxiOrderNoteFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<TaxiOrderNoteFilter>>;
  orderId: IdFilterComparison;
};

export type TaxiOrderNoteSort = {
  direction: SortDirection;
  field: TaxiOrderNoteSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum TaxiOrderNoteSortFields {
  Id = 'id',
  OrderId = 'orderId'
}

/** Different types of taxi orders, including ride, rideshare, parcel delivery, food delivery, and shop delivery. */
export enum TaxiOrderType {
  FoodDelivery = 'FoodDelivery',
  ParcelDelivery = 'ParcelDelivery',
  Ride = 'Ride',
  Rideshare = 'Rideshare',
  ShopDelivery = 'ShopDelivery'
}

export type TaxiPayoutSession = {
  __typename?: 'TaxiPayoutSession';
  createdAt: Scalars['DateTime']['output'];
  currency: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  driverTransactions: TaxiPayoutSessionDriverTransactionsConnection;
  driverTransactionsAggregate: Array<TaxiPayoutSessionDriverTransactionsAggregateResponse>;
  id: Scalars['ID']['output'];
  payoutMethodDetails: Array<TaxiPayoutSessionPayoutMethodDetail>;
  payoutMethods: Array<PayoutMethod>;
  processedAt?: Maybe<Scalars['DateTime']['output']>;
  status: PayoutSessionStatus;
  totalAmount: Scalars['Float']['output'];
};


export type TaxiPayoutSessionDriverTransactionsArgs = {
  filter?: DriverTransactionFilter;
  paging?: OffsetPaging;
  sorting?: Array<DriverTransactionSort>;
};


export type TaxiPayoutSessionDriverTransactionsAggregateArgs = {
  filter?: InputMaybe<DriverTransactionAggregateFilter>;
};


export type TaxiPayoutSessionPayoutMethodDetailsArgs = {
  filter?: TaxiPayoutSessionPayoutMethodDetailFilter;
  sorting?: Array<TaxiPayoutSessionPayoutMethodDetailSort>;
};


export type TaxiPayoutSessionPayoutMethodsArgs = {
  filter?: PayoutMethodFilter;
  sorting?: Array<PayoutMethodSort>;
};

export type TaxiPayoutSessionConnection = {
  __typename?: 'TaxiPayoutSessionConnection';
  /** Array of nodes. */
  nodes: Array<TaxiPayoutSession>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type TaxiPayoutSessionDriverTransactionsAggregateGroupBy = {
  __typename?: 'TaxiPayoutSessionDriverTransactionsAggregateGroupBy';
  action?: Maybe<TransactionAction>;
  amount?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  driverId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  paymentGatewayId?: Maybe<Scalars['ID']['output']>;
  payoutAccountId?: Maybe<Scalars['ID']['output']>;
  payoutMethodId?: Maybe<Scalars['ID']['output']>;
  payoutSessionId?: Maybe<Scalars['ID']['output']>;
  payoutSessionMethodId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<TransactionStatus>;
};

export type TaxiPayoutSessionDriverTransactionsAggregateResponse = {
  __typename?: 'TaxiPayoutSessionDriverTransactionsAggregateResponse';
  avg?: Maybe<TaxiPayoutSessionDriverTransactionsAvgAggregate>;
  count?: Maybe<TaxiPayoutSessionDriverTransactionsCountAggregate>;
  groupBy?: Maybe<TaxiPayoutSessionDriverTransactionsAggregateGroupBy>;
  max?: Maybe<TaxiPayoutSessionDriverTransactionsMaxAggregate>;
  min?: Maybe<TaxiPayoutSessionDriverTransactionsMinAggregate>;
  sum?: Maybe<TaxiPayoutSessionDriverTransactionsSumAggregate>;
};

export type TaxiPayoutSessionDriverTransactionsAvgAggregate = {
  __typename?: 'TaxiPayoutSessionDriverTransactionsAvgAggregate';
  amount?: Maybe<Scalars['Float']['output']>;
  driverId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  paymentGatewayId?: Maybe<Scalars['Float']['output']>;
  payoutAccountId?: Maybe<Scalars['Float']['output']>;
  payoutMethodId?: Maybe<Scalars['Float']['output']>;
  payoutSessionId?: Maybe<Scalars['Float']['output']>;
  payoutSessionMethodId?: Maybe<Scalars['Float']['output']>;
};

export type TaxiPayoutSessionDriverTransactionsConnection = {
  __typename?: 'TaxiPayoutSessionDriverTransactionsConnection';
  /** Array of nodes. */
  nodes: Array<DriverTransaction>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type TaxiPayoutSessionDriverTransactionsCountAggregate = {
  __typename?: 'TaxiPayoutSessionDriverTransactionsCountAggregate';
  action?: Maybe<Scalars['Int']['output']>;
  amount?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['Int']['output']>;
  currency?: Maybe<Scalars['Int']['output']>;
  driverId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  paymentGatewayId?: Maybe<Scalars['Int']['output']>;
  payoutAccountId?: Maybe<Scalars['Int']['output']>;
  payoutMethodId?: Maybe<Scalars['Int']['output']>;
  payoutSessionId?: Maybe<Scalars['Int']['output']>;
  payoutSessionMethodId?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
};

export type TaxiPayoutSessionDriverTransactionsMaxAggregate = {
  __typename?: 'TaxiPayoutSessionDriverTransactionsMaxAggregate';
  action?: Maybe<TransactionAction>;
  amount?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  driverId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  paymentGatewayId?: Maybe<Scalars['ID']['output']>;
  payoutAccountId?: Maybe<Scalars['ID']['output']>;
  payoutMethodId?: Maybe<Scalars['ID']['output']>;
  payoutSessionId?: Maybe<Scalars['ID']['output']>;
  payoutSessionMethodId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<TransactionStatus>;
};

export type TaxiPayoutSessionDriverTransactionsMinAggregate = {
  __typename?: 'TaxiPayoutSessionDriverTransactionsMinAggregate';
  action?: Maybe<TransactionAction>;
  amount?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  driverId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  paymentGatewayId?: Maybe<Scalars['ID']['output']>;
  payoutAccountId?: Maybe<Scalars['ID']['output']>;
  payoutMethodId?: Maybe<Scalars['ID']['output']>;
  payoutSessionId?: Maybe<Scalars['ID']['output']>;
  payoutSessionMethodId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<TransactionStatus>;
};

export type TaxiPayoutSessionDriverTransactionsSumAggregate = {
  __typename?: 'TaxiPayoutSessionDriverTransactionsSumAggregate';
  amount?: Maybe<Scalars['Float']['output']>;
  driverId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  paymentGatewayId?: Maybe<Scalars['Float']['output']>;
  payoutAccountId?: Maybe<Scalars['Float']['output']>;
  payoutMethodId?: Maybe<Scalars['Float']['output']>;
  payoutSessionId?: Maybe<Scalars['Float']['output']>;
  payoutSessionMethodId?: Maybe<Scalars['Float']['output']>;
};

export type TaxiPayoutSessionFilter = {
  and?: InputMaybe<Array<TaxiPayoutSessionFilter>>;
  currency?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<TaxiPayoutSessionFilter>>;
  status?: InputMaybe<PayoutSessionStatusFilterComparison>;
  totalAmount?: InputMaybe<NumberFieldComparison>;
};

export type TaxiPayoutSessionPayoutMethodDetail = {
  __typename?: 'TaxiPayoutSessionPayoutMethodDetail';
  driverTransactions: TaxiPayoutSessionPayoutMethodDetailDriverTransactionsConnection;
  driverTransactionsAggregate: Array<TaxiPayoutSessionPayoutMethodDetailDriverTransactionsAggregateResponse>;
  id: Scalars['ID']['output'];
  payoutMethod: PayoutMethod;
  status: PayoutSessionStatus;
};


export type TaxiPayoutSessionPayoutMethodDetailDriverTransactionsArgs = {
  filter?: DriverTransactionFilter;
  paging?: OffsetPaging;
  sorting?: Array<DriverTransactionSort>;
};


export type TaxiPayoutSessionPayoutMethodDetailDriverTransactionsAggregateArgs = {
  filter?: InputMaybe<DriverTransactionAggregateFilter>;
};

export type TaxiPayoutSessionPayoutMethodDetailDriverTransactionsAggregateGroupBy = {
  __typename?: 'TaxiPayoutSessionPayoutMethodDetailDriverTransactionsAggregateGroupBy';
  action?: Maybe<TransactionAction>;
  amount?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  driverId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  paymentGatewayId?: Maybe<Scalars['ID']['output']>;
  payoutAccountId?: Maybe<Scalars['ID']['output']>;
  payoutMethodId?: Maybe<Scalars['ID']['output']>;
  payoutSessionId?: Maybe<Scalars['ID']['output']>;
  payoutSessionMethodId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<TransactionStatus>;
};

export type TaxiPayoutSessionPayoutMethodDetailDriverTransactionsAggregateResponse = {
  __typename?: 'TaxiPayoutSessionPayoutMethodDetailDriverTransactionsAggregateResponse';
  avg?: Maybe<TaxiPayoutSessionPayoutMethodDetailDriverTransactionsAvgAggregate>;
  count?: Maybe<TaxiPayoutSessionPayoutMethodDetailDriverTransactionsCountAggregate>;
  groupBy?: Maybe<TaxiPayoutSessionPayoutMethodDetailDriverTransactionsAggregateGroupBy>;
  max?: Maybe<TaxiPayoutSessionPayoutMethodDetailDriverTransactionsMaxAggregate>;
  min?: Maybe<TaxiPayoutSessionPayoutMethodDetailDriverTransactionsMinAggregate>;
  sum?: Maybe<TaxiPayoutSessionPayoutMethodDetailDriverTransactionsSumAggregate>;
};

export type TaxiPayoutSessionPayoutMethodDetailDriverTransactionsAvgAggregate = {
  __typename?: 'TaxiPayoutSessionPayoutMethodDetailDriverTransactionsAvgAggregate';
  amount?: Maybe<Scalars['Float']['output']>;
  driverId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  paymentGatewayId?: Maybe<Scalars['Float']['output']>;
  payoutAccountId?: Maybe<Scalars['Float']['output']>;
  payoutMethodId?: Maybe<Scalars['Float']['output']>;
  payoutSessionId?: Maybe<Scalars['Float']['output']>;
  payoutSessionMethodId?: Maybe<Scalars['Float']['output']>;
};

export type TaxiPayoutSessionPayoutMethodDetailDriverTransactionsConnection = {
  __typename?: 'TaxiPayoutSessionPayoutMethodDetailDriverTransactionsConnection';
  /** Array of nodes. */
  nodes: Array<DriverTransaction>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type TaxiPayoutSessionPayoutMethodDetailDriverTransactionsCountAggregate = {
  __typename?: 'TaxiPayoutSessionPayoutMethodDetailDriverTransactionsCountAggregate';
  action?: Maybe<Scalars['Int']['output']>;
  amount?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['Int']['output']>;
  currency?: Maybe<Scalars['Int']['output']>;
  driverId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  paymentGatewayId?: Maybe<Scalars['Int']['output']>;
  payoutAccountId?: Maybe<Scalars['Int']['output']>;
  payoutMethodId?: Maybe<Scalars['Int']['output']>;
  payoutSessionId?: Maybe<Scalars['Int']['output']>;
  payoutSessionMethodId?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
};

export type TaxiPayoutSessionPayoutMethodDetailDriverTransactionsMaxAggregate = {
  __typename?: 'TaxiPayoutSessionPayoutMethodDetailDriverTransactionsMaxAggregate';
  action?: Maybe<TransactionAction>;
  amount?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  driverId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  paymentGatewayId?: Maybe<Scalars['ID']['output']>;
  payoutAccountId?: Maybe<Scalars['ID']['output']>;
  payoutMethodId?: Maybe<Scalars['ID']['output']>;
  payoutSessionId?: Maybe<Scalars['ID']['output']>;
  payoutSessionMethodId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<TransactionStatus>;
};

export type TaxiPayoutSessionPayoutMethodDetailDriverTransactionsMinAggregate = {
  __typename?: 'TaxiPayoutSessionPayoutMethodDetailDriverTransactionsMinAggregate';
  action?: Maybe<TransactionAction>;
  amount?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  driverId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  paymentGatewayId?: Maybe<Scalars['ID']['output']>;
  payoutAccountId?: Maybe<Scalars['ID']['output']>;
  payoutMethodId?: Maybe<Scalars['ID']['output']>;
  payoutSessionId?: Maybe<Scalars['ID']['output']>;
  payoutSessionMethodId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<TransactionStatus>;
};

export type TaxiPayoutSessionPayoutMethodDetailDriverTransactionsSumAggregate = {
  __typename?: 'TaxiPayoutSessionPayoutMethodDetailDriverTransactionsSumAggregate';
  amount?: Maybe<Scalars['Float']['output']>;
  driverId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  paymentGatewayId?: Maybe<Scalars['Float']['output']>;
  payoutAccountId?: Maybe<Scalars['Float']['output']>;
  payoutMethodId?: Maybe<Scalars['Float']['output']>;
  payoutSessionId?: Maybe<Scalars['Float']['output']>;
  payoutSessionMethodId?: Maybe<Scalars['Float']['output']>;
};

export type TaxiPayoutSessionPayoutMethodDetailFilter = {
  and?: InputMaybe<Array<TaxiPayoutSessionPayoutMethodDetailFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<TaxiPayoutSessionPayoutMethodDetailFilter>>;
};

export type TaxiPayoutSessionPayoutMethodDetailSort = {
  direction: SortDirection;
  field: TaxiPayoutSessionPayoutMethodDetailSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum TaxiPayoutSessionPayoutMethodDetailSortFields {
  Id = 'id'
}

export type TaxiPayoutSessionSort = {
  direction: SortDirection;
  field: TaxiPayoutSessionSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum TaxiPayoutSessionSortFields {
  Currency = 'currency',
  Id = 'id',
  Status = 'status',
  TotalAmount = 'totalAmount'
}

export enum TaxiPermission {
  DriverEdit = 'DRIVER_EDIT',
  DriverView = 'DRIVER_VIEW',
  FleetEdit = 'FLEET_EDIT',
  FleetView = 'FLEET_VIEW',
  OrderEdit = 'ORDER_EDIT',
  OrderView = 'ORDER_VIEW',
  PricingEdit = 'PRICING_EDIT',
  PricingView = 'PRICING_VIEW',
  RegionEdit = 'REGION_EDIT',
  RegionView = 'REGION_VIEW',
  VehicleEdit = 'VEHICLE_EDIT',
  VehicleView = 'VEHICLE_VIEW'
}

export type TaxiSupportRequest = {
  __typename?: 'TaxiSupportRequest';
  activities: Array<TaxiSupportRequestActivity>;
  activitiesAggregate: Array<TaxiSupportRequestActivitiesAggregateResponse>;
  assignedToStaffs: Array<Operator>;
  assignedToStaffsAggregate: Array<TaxiSupportRequestAssignedToStaffsAggregateResponse>;
  content?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  inscriptionTimestamp: Scalars['DateTime']['output'];
  order: Order;
  requestId: Scalars['ID']['output'];
  requestedByDriver: Scalars['Boolean']['output'];
  status: ComplaintStatus;
  subject: Scalars['String']['output'];
};


export type TaxiSupportRequestActivitiesArgs = {
  filter?: TaxiSupportRequestActivityFilter;
  sorting?: Array<TaxiSupportRequestActivitySort>;
};


export type TaxiSupportRequestActivitiesAggregateArgs = {
  filter?: InputMaybe<TaxiSupportRequestActivityAggregateFilter>;
};


export type TaxiSupportRequestAssignedToStaffsAggregateArgs = {
  filter?: InputMaybe<OperatorAggregateFilter>;
};

export type TaxiSupportRequestActivitiesAggregateGroupBy = {
  __typename?: 'TaxiSupportRequestActivitiesAggregateGroupBy';
  complaintId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type TaxiSupportRequestActivitiesAggregateResponse = {
  __typename?: 'TaxiSupportRequestActivitiesAggregateResponse';
  avg?: Maybe<TaxiSupportRequestActivitiesAvgAggregate>;
  count?: Maybe<TaxiSupportRequestActivitiesCountAggregate>;
  groupBy?: Maybe<TaxiSupportRequestActivitiesAggregateGroupBy>;
  max?: Maybe<TaxiSupportRequestActivitiesMaxAggregate>;
  min?: Maybe<TaxiSupportRequestActivitiesMinAggregate>;
  sum?: Maybe<TaxiSupportRequestActivitiesSumAggregate>;
};

export type TaxiSupportRequestActivitiesAvgAggregate = {
  __typename?: 'TaxiSupportRequestActivitiesAvgAggregate';
  complaintId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

export type TaxiSupportRequestActivitiesCountAggregate = {
  __typename?: 'TaxiSupportRequestActivitiesCountAggregate';
  complaintId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
};

export type TaxiSupportRequestActivitiesMaxAggregate = {
  __typename?: 'TaxiSupportRequestActivitiesMaxAggregate';
  complaintId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type TaxiSupportRequestActivitiesMinAggregate = {
  __typename?: 'TaxiSupportRequestActivitiesMinAggregate';
  complaintId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type TaxiSupportRequestActivitiesSumAggregate = {
  __typename?: 'TaxiSupportRequestActivitiesSumAggregate';
  complaintId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

export type TaxiSupportRequestActivity = {
  __typename?: 'TaxiSupportRequestActivity';
  actor: Operator;
  assignedToStaffs: Array<Operator>;
  comment?: Maybe<Scalars['String']['output']>;
  complaintId: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  statusFrom?: Maybe<ComplaintStatus>;
  statusTo?: Maybe<ComplaintStatus>;
  type: ComplaintActivityType;
  unassignedFromStaffs: Array<Operator>;
};

export type TaxiSupportRequestActivityAggregateFilter = {
  and?: InputMaybe<Array<TaxiSupportRequestActivityAggregateFilter>>;
  complaintId?: InputMaybe<IdFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<TaxiSupportRequestActivityAggregateFilter>>;
};

export type TaxiSupportRequestActivityFilter = {
  and?: InputMaybe<Array<TaxiSupportRequestActivityFilter>>;
  complaintId?: InputMaybe<IdFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<TaxiSupportRequestActivityFilter>>;
};

export type TaxiSupportRequestActivitySort = {
  direction: SortDirection;
  field: TaxiSupportRequestActivitySortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum TaxiSupportRequestActivitySortFields {
  ComplaintId = 'complaintId',
  Id = 'id'
}

export type TaxiSupportRequestAggregateFilter = {
  and?: InputMaybe<Array<TaxiSupportRequestAggregateFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<TaxiSupportRequestAggregateFilter>>;
  order?: InputMaybe<TaxiSupportRequestAggregateFilterOrderAggregateFilter>;
  requestId?: InputMaybe<IdFilterComparison>;
  requestedByDriver?: InputMaybe<BooleanFieldComparison>;
  status?: InputMaybe<ComplaintStatusFilterComparison>;
};

export type TaxiSupportRequestAggregateFilterOrderAggregateFilter = {
  and?: InputMaybe<Array<TaxiSupportRequestAggregateFilterOrderAggregateFilter>>;
  costAfterCoupon?: InputMaybe<FloatFieldComparison>;
  costBest?: InputMaybe<FloatFieldComparison>;
  createdOn?: InputMaybe<DateFieldComparison>;
  currency?: InputMaybe<StringFieldComparison>;
  distanceBest?: InputMaybe<IntFieldComparison>;
  driverId?: InputMaybe<IdFilterComparison>;
  durationBest?: InputMaybe<IntFieldComparison>;
  fleetId?: InputMaybe<IdFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<TaxiSupportRequestAggregateFilterOrderAggregateFilter>>;
  paymentMode?: InputMaybe<PaymentModeFilterComparison>;
  regionId?: InputMaybe<IdFilterComparison>;
  riderId?: InputMaybe<IdFilterComparison>;
  serviceId?: InputMaybe<IdFilterComparison>;
  status?: InputMaybe<OrderStatusFilterComparison>;
};

export type TaxiSupportRequestAggregateGroupBy = {
  __typename?: 'TaxiSupportRequestAggregateGroupBy';
  id?: Maybe<Scalars['ID']['output']>;
  requestId?: Maybe<Scalars['ID']['output']>;
  requestedByDriver?: Maybe<Scalars['Boolean']['output']>;
  status?: Maybe<ComplaintStatus>;
};

export type TaxiSupportRequestAggregateResponse = {
  __typename?: 'TaxiSupportRequestAggregateResponse';
  avg?: Maybe<TaxiSupportRequestAvgAggregate>;
  count?: Maybe<TaxiSupportRequestCountAggregate>;
  groupBy?: Maybe<TaxiSupportRequestAggregateGroupBy>;
  max?: Maybe<TaxiSupportRequestMaxAggregate>;
  min?: Maybe<TaxiSupportRequestMinAggregate>;
  sum?: Maybe<TaxiSupportRequestSumAggregate>;
};

export type TaxiSupportRequestAssignedToStaffsAggregateGroupBy = {
  __typename?: 'TaxiSupportRequestAssignedToStaffsAggregateGroupBy';
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  isBlocked?: Maybe<Scalars['Boolean']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  mobileNumber?: Maybe<Scalars['String']['output']>;
  roleId?: Maybe<Scalars['ID']['output']>;
  userName?: Maybe<Scalars['String']['output']>;
};

export type TaxiSupportRequestAssignedToStaffsAggregateResponse = {
  __typename?: 'TaxiSupportRequestAssignedToStaffsAggregateResponse';
  avg?: Maybe<TaxiSupportRequestAssignedToStaffsAvgAggregate>;
  count?: Maybe<TaxiSupportRequestAssignedToStaffsCountAggregate>;
  groupBy?: Maybe<TaxiSupportRequestAssignedToStaffsAggregateGroupBy>;
  max?: Maybe<TaxiSupportRequestAssignedToStaffsMaxAggregate>;
  min?: Maybe<TaxiSupportRequestAssignedToStaffsMinAggregate>;
  sum?: Maybe<TaxiSupportRequestAssignedToStaffsSumAggregate>;
};

export type TaxiSupportRequestAssignedToStaffsAvgAggregate = {
  __typename?: 'TaxiSupportRequestAssignedToStaffsAvgAggregate';
  id?: Maybe<Scalars['Float']['output']>;
  roleId?: Maybe<Scalars['Float']['output']>;
};

export type TaxiSupportRequestAssignedToStaffsCountAggregate = {
  __typename?: 'TaxiSupportRequestAssignedToStaffsCountAggregate';
  email?: Maybe<Scalars['Int']['output']>;
  firstName?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  isBlocked?: Maybe<Scalars['Int']['output']>;
  lastName?: Maybe<Scalars['Int']['output']>;
  mobileNumber?: Maybe<Scalars['Int']['output']>;
  roleId?: Maybe<Scalars['Int']['output']>;
  userName?: Maybe<Scalars['Int']['output']>;
};

export type TaxiSupportRequestAssignedToStaffsMaxAggregate = {
  __typename?: 'TaxiSupportRequestAssignedToStaffsMaxAggregate';
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  mobileNumber?: Maybe<Scalars['String']['output']>;
  roleId?: Maybe<Scalars['ID']['output']>;
  userName?: Maybe<Scalars['String']['output']>;
};

export type TaxiSupportRequestAssignedToStaffsMinAggregate = {
  __typename?: 'TaxiSupportRequestAssignedToStaffsMinAggregate';
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  mobileNumber?: Maybe<Scalars['String']['output']>;
  roleId?: Maybe<Scalars['ID']['output']>;
  userName?: Maybe<Scalars['String']['output']>;
};

export type TaxiSupportRequestAssignedToStaffsSumAggregate = {
  __typename?: 'TaxiSupportRequestAssignedToStaffsSumAggregate';
  id?: Maybe<Scalars['Float']['output']>;
  roleId?: Maybe<Scalars['Float']['output']>;
};

export type TaxiSupportRequestAvgAggregate = {
  __typename?: 'TaxiSupportRequestAvgAggregate';
  id?: Maybe<Scalars['Float']['output']>;
  requestId?: Maybe<Scalars['Float']['output']>;
};

export type TaxiSupportRequestConnection = {
  __typename?: 'TaxiSupportRequestConnection';
  /** Array of nodes. */
  nodes: Array<TaxiSupportRequest>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type TaxiSupportRequestCountAggregate = {
  __typename?: 'TaxiSupportRequestCountAggregate';
  id?: Maybe<Scalars['Int']['output']>;
  requestId?: Maybe<Scalars['Int']['output']>;
  requestedByDriver?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
};

export type TaxiSupportRequestFilter = {
  and?: InputMaybe<Array<TaxiSupportRequestFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<TaxiSupportRequestFilter>>;
  order?: InputMaybe<TaxiSupportRequestFilterOrderFilter>;
  requestId?: InputMaybe<IdFilterComparison>;
  requestedByDriver?: InputMaybe<BooleanFieldComparison>;
  status?: InputMaybe<ComplaintStatusFilterComparison>;
};

export type TaxiSupportRequestFilterOrderFilter = {
  and?: InputMaybe<Array<TaxiSupportRequestFilterOrderFilter>>;
  costAfterCoupon?: InputMaybe<FloatFieldComparison>;
  costBest?: InputMaybe<FloatFieldComparison>;
  createdOn?: InputMaybe<DateFieldComparison>;
  currency?: InputMaybe<StringFieldComparison>;
  distanceBest?: InputMaybe<IntFieldComparison>;
  driverId?: InputMaybe<IdFilterComparison>;
  durationBest?: InputMaybe<IntFieldComparison>;
  fleetId?: InputMaybe<IdFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<TaxiSupportRequestFilterOrderFilter>>;
  paymentMode?: InputMaybe<PaymentModeFilterComparison>;
  regionId?: InputMaybe<IdFilterComparison>;
  riderId?: InputMaybe<IdFilterComparison>;
  serviceId?: InputMaybe<IdFilterComparison>;
  status?: InputMaybe<OrderStatusFilterComparison>;
};

export type TaxiSupportRequestMaxAggregate = {
  __typename?: 'TaxiSupportRequestMaxAggregate';
  id?: Maybe<Scalars['ID']['output']>;
  requestId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<ComplaintStatus>;
};

export type TaxiSupportRequestMinAggregate = {
  __typename?: 'TaxiSupportRequestMinAggregate';
  id?: Maybe<Scalars['ID']['output']>;
  requestId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<ComplaintStatus>;
};

export type TaxiSupportRequestNotification = {
  __typename?: 'TaxiSupportRequestNotification';
  appType: AppType;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  readAt?: Maybe<Scalars['DateTime']['output']>;
  taxiSupportRequest: TaxiSupportRequest;
  type: AdminNotificationType;
};

export type TaxiSupportRequestSort = {
  direction: SortDirection;
  field: TaxiSupportRequestSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum TaxiSupportRequestSortFields {
  Id = 'id',
  RequestId = 'requestId',
  RequestedByDriver = 'requestedByDriver',
  Status = 'status'
}

export type TaxiSupportRequestSumAggregate = {
  __typename?: 'TaxiSupportRequestSumAggregate';
  id?: Maybe<Scalars['Float']['output']>;
  requestId?: Maybe<Scalars['Float']['output']>;
};

export enum TimeFrequency {
  Daily = 'Daily',
  Monthly = 'Monthly',
  Quarterly = 'Quarterly',
  Weekly = 'Weekly',
  Yearly = 'Yearly'
}

export type TimeMultiplier = {
  __typename?: 'TimeMultiplier';
  endTime: Scalars['String']['output'];
  multiply: Scalars['Float']['output'];
  startTime: Scalars['String']['output'];
};

export type TimeMultiplierInput = {
  endTime: Scalars['String']['input'];
  multiply: Scalars['Float']['input'];
  startTime: Scalars['String']['input'];
};

export type TimeRange = {
  __typename?: 'TimeRange';
  close: Scalars['String']['output'];
  open: Scalars['String']['output'];
};

export type TokenObject = {
  __typename?: 'TokenObject';
  token: Scalars['String']['output'];
};

export type TotalDailyPair = {
  __typename?: 'TotalDailyPair';
  daily: Scalars['Float']['output'];
  total: Scalars['Float']['output'];
};

export enum TransactionAction {
  Deduct = 'Deduct',
  Recharge = 'Recharge'
}

export type TransactionActionFilterComparison = {
  eq?: InputMaybe<TransactionAction>;
  gt?: InputMaybe<TransactionAction>;
  gte?: InputMaybe<TransactionAction>;
  iLike?: InputMaybe<TransactionAction>;
  in?: InputMaybe<Array<TransactionAction>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<TransactionAction>;
  lt?: InputMaybe<TransactionAction>;
  lte?: InputMaybe<TransactionAction>;
  neq?: InputMaybe<TransactionAction>;
  notILike?: InputMaybe<TransactionAction>;
  notIn?: InputMaybe<Array<TransactionAction>>;
  notLike?: InputMaybe<TransactionAction>;
};

export enum TransactionStatus {
  Canceled = 'Canceled',
  Done = 'Done',
  Processing = 'Processing',
  Rejected = 'Rejected'
}

export type TransactionStatusFilterComparison = {
  eq?: InputMaybe<TransactionStatus>;
  gt?: InputMaybe<TransactionStatus>;
  gte?: InputMaybe<TransactionStatus>;
  iLike?: InputMaybe<TransactionStatus>;
  in?: InputMaybe<Array<TransactionStatus>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<TransactionStatus>;
  lt?: InputMaybe<TransactionStatus>;
  lte?: InputMaybe<TransactionStatus>;
  neq?: InputMaybe<TransactionStatus>;
  notILike?: InputMaybe<TransactionStatus>;
  notIn?: InputMaybe<Array<TransactionStatus>>;
  notLike?: InputMaybe<TransactionStatus>;
};

export enum TransactionType {
  Credit = 'Credit',
  Debit = 'Debit'
}

export type TransactionTypeFilterComparison = {
  eq?: InputMaybe<TransactionType>;
  gt?: InputMaybe<TransactionType>;
  gte?: InputMaybe<TransactionType>;
  iLike?: InputMaybe<TransactionType>;
  in?: InputMaybe<Array<TransactionType>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<TransactionType>;
  lt?: InputMaybe<TransactionType>;
  lte?: InputMaybe<TransactionType>;
  neq?: InputMaybe<TransactionType>;
  notILike?: InputMaybe<TransactionType>;
  notIn?: InputMaybe<Array<TransactionType>>;
  notLike?: InputMaybe<TransactionType>;
};

export type UpdateConfigInput = {
  adminPanelAPIKey?: InputMaybe<Scalars['String']['input']>;
  backendMapsAPIKey?: InputMaybe<Scalars['String']['input']>;
  twilioAccountSid?: InputMaybe<Scalars['String']['input']>;
  twilioAuthToken?: InputMaybe<Scalars['String']['input']>;
  twilioFromNumber?: InputMaybe<Scalars['String']['input']>;
  twilioVerificationCodeSMSTemplate?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateConfigInputV2 = {
  adminPanelAPIKey?: InputMaybe<Scalars['String']['input']>;
  backendMapsAPIKey?: InputMaybe<Scalars['String']['input']>;
  companyLogo?: InputMaybe<Scalars['String']['input']>;
  companyName?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firebaseProjectPrivateKey?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  mysqlDatabase?: InputMaybe<Scalars['String']['input']>;
  mysqlHost?: InputMaybe<Scalars['String']['input']>;
  mysqlPassword?: InputMaybe<Scalars['String']['input']>;
  mysqlPort?: InputMaybe<Scalars['Int']['input']>;
  mysqlUser?: InputMaybe<Scalars['String']['input']>;
  parking?: InputMaybe<AppConfigInfoInput>;
  password?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  profilePicture?: InputMaybe<Scalars['String']['input']>;
  redisDb?: InputMaybe<Scalars['Int']['input']>;
  redisHost?: InputMaybe<Scalars['String']['input']>;
  redisPassword?: InputMaybe<Scalars['String']['input']>;
  redisPort?: InputMaybe<Scalars['Int']['input']>;
  shop?: InputMaybe<AppConfigInfoInput>;
  taxi?: InputMaybe<AppConfigInfoInput>;
};

export type UpdateConfigResult = {
  __typename?: 'UpdateConfigResult';
  message?: Maybe<Scalars['String']['output']>;
  status: UpdateConfigStatus;
};

export enum UpdateConfigStatus {
  Invalid = 'INVALID',
  Ok = 'OK'
}

export type UpdateDriverInput = {
  accountNumber?: InputMaybe<Scalars['String']['input']>;
  address?: InputMaybe<Scalars['String']['input']>;
  bankName?: InputMaybe<Scalars['String']['input']>;
  bankRoutingNumber?: InputMaybe<Scalars['String']['input']>;
  bankSwift?: InputMaybe<Scalars['String']['input']>;
  canDeliver?: InputMaybe<Scalars['Boolean']['input']>;
  carColorId?: InputMaybe<Scalars['ID']['input']>;
  carId?: InputMaybe<Scalars['ID']['input']>;
  carPlate?: InputMaybe<Scalars['String']['input']>;
  carProductionYear?: InputMaybe<Scalars['Int']['input']>;
  certificateNumber?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  fleetId?: InputMaybe<Scalars['ID']['input']>;
  gender?: InputMaybe<Gender>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  maxDeliveryPackageSize?: InputMaybe<DeliveryPackageSize>;
  mediaId?: InputMaybe<Scalars['ID']['input']>;
  mobileNumber?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  softRejectionNote?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<DriverStatus>;
};

export type UpdateFeedback = {
  description?: InputMaybe<Scalars['String']['input']>;
  driverId?: InputMaybe<Scalars['ID']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  requestId?: InputMaybe<Scalars['ID']['input']>;
  reviewTimestamp?: InputMaybe<Scalars['DateTime']['input']>;
  score?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateFleetInput = {
  accountNumber?: InputMaybe<Scalars['String']['input']>;
  address?: InputMaybe<Scalars['String']['input']>;
  commissionShareFlat?: InputMaybe<Scalars['Float']['input']>;
  commissionSharePercent?: InputMaybe<Scalars['Float']['input']>;
  exclusivityAreas?: InputMaybe<Array<Array<PointInput>>>;
  feeMultiplier?: InputMaybe<Scalars['Float']['input']>;
  isBlocked?: InputMaybe<Scalars['Boolean']['input']>;
  mobileNumber?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  profilePictureId?: InputMaybe<Scalars['ID']['input']>;
  userName?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateFleetStaffInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  isBlocked?: InputMaybe<Scalars['Boolean']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  mobileNumber?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  permissionFinancial?: InputMaybe<FleetStaffPermissionFinancial>;
  permissionOrder?: InputMaybe<FleetStaffPermissionOrder>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  profileImageId?: InputMaybe<Scalars['ID']['input']>;
  userName?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateItem = {
  /** The base price of the item */
  basePrice?: InputMaybe<Scalars['Float']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  discountPercentage?: InputMaybe<Scalars['Int']['input']>;
  discountUntil?: InputMaybe<Scalars['DateTime']['input']>;
  discountedQuantity?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  ratingAggregate?: InputMaybe<RatingAggregateInput>;
  shopId?: InputMaybe<Scalars['ID']['input']>;
  /** The stock quantity */
  stockQuantity?: InputMaybe<Scalars['Int']['input']>;
  usedDiscountedQuantity?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateItemCategoryInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateManyDriverDocumentRetentionPoliciesInput = {
  /** Filter used to find fields to update */
  filter: DriverDocumentRetentionPolicyUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: DriverDocumentRetentionPolicyInput;
};

export type UpdateManyDriverDocumentsInput = {
  /** Filter used to find fields to update */
  filter: DriverDocumentUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: DriverDocumentInput;
};

export type UpdateManyDriverShiftRulesInput = {
  /** Filter used to find fields to update */
  filter: DriverShiftRuleUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: DriverShiftRuleInput;
};

export type UpdateManyResponse = {
  __typename?: 'UpdateManyResponse';
  /** The number of records updated. */
  updatedCount: Scalars['Int']['output'];
};

export type UpdateManyRiderAddressesInput = {
  /** Filter used to find fields to update */
  filter: RiderAddressUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: UpdateRiderAddress;
};

export type UpdateManySmsInput = {
  /** Filter used to find fields to update */
  filter: SmsUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: UpdateSms;
};

export type UpdateManySmsProvidersInput = {
  /** Filter used to find fields to update */
  filter: SmsProviderUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: SmsProviderInput;
};

export type UpdateOneAnnouncementInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: AnnouncementInput;
};

export type UpdateOneCarColorInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: CarColorInput;
};

export type UpdateOneCarModelInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: CarModelInput;
};

export type UpdateOneCouponInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: CouponInput;
};

export type UpdateOneDistressSignalInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateSosInput;
};

export type UpdateOneDriverDocumentInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: DriverDocumentInput;
};

export type UpdateOneDriverDocumentRetentionPolicyInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: DriverDocumentRetentionPolicyInput;
};

export type UpdateOneDriverInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateDriverInput;
};

export type UpdateOneDriverShiftRuleInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: DriverShiftRuleInput;
};

export type UpdateOneDriverToDriverDocumentInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: DriverToDriverDocumentInput;
};

export type UpdateOneFeedbackInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateFeedback;
};

export type UpdateOneFeedbackParameterInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: FeedbackParameterInput;
};

export type UpdateOneFleetInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateFleetInput;
};

export type UpdateOneFleetStaffInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateFleetStaffInput;
};

export type UpdateOneItemCategoryInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateItemCategoryInput;
};

export type UpdateOneItemInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateItem;
};

export type UpdateOneOperatorInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateOperatorInput;
};

export type UpdateOneOperatorRoleInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: OperatorRoleInput;
};

export type UpdateOneOrderCancelReasonInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: OrderCancelReasonInput;
};

export type UpdateOneParkSpotInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateParkSpotInput;
};

export type UpdateOneParkingFeedbackInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateParkingFeedback;
};

export type UpdateOneParkingFeedbackParameterInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateParkingFeedbackParameter;
};

export type UpdateOneParkingPayoutSessionInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdatePayoutSessionInput;
};

export type UpdateOneParkingSupportRequestInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateParkingSupportRequest;
};

export type UpdateOnePaymentGatewayInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdatePaymentGatewayInput;
};

export type UpdateOnePayoutMethodInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: CreatePayoutMethodInput;
};

export type UpdateOneRegionCategoryInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: RegionCategoryInput;
};

export type UpdateOneRegionInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateRegionInput;
};

export type UpdateOneRewardInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateReward;
};

export type UpdateOneRiderAddressInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateRiderAddress;
};

export type UpdateOneRiderInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: RiderInput;
};

export type UpdateOneSmsInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateSms;
};

export type UpdateOneSmsProviderInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: SmsProviderInput;
};

export type UpdateOneSosReasonInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateSosReasonInput;
};

export type UpdateOneServiceCategoryInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: ServiceCategoryInput;
};

export type UpdateOneServiceInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: ServiceInput;
};

export type UpdateOneServiceOptionInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: ServiceOptionInput;
};

export type UpdateOneShopCategoryInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateShopCategoryInput;
};

export type UpdateOneShopDeliveryZoneInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateShopDeliveryZoneInput;
};

export type UpdateOneShopFeedbackInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateShopFeedback;
};

export type UpdateOneShopFeedbackParameterInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateShopFeedbackParameter;
};

export type UpdateOneShopInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpsertShopInput;
};

export type UpdateOneShopItemPresetInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateShopItemPresetInput;
};

export type UpdateOneShopPayoutSessionInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdatePayoutSessionInput;
};

export type UpdateOneShopSupportRequestInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateShopSupportRequest;
};

export type UpdateOneTaxiPayoutSessionInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdatePayoutSessionInput;
};

export type UpdateOneTaxiSupportRequestInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateTaxiSupportRequest;
};

export type UpdateOneZonePriceCategoryInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: ZonePriceCategoryInput;
};

export type UpdateOneZonePriceInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: ZonePriceInput;
};

export type UpdateOperatorInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  enabledNotifications?: InputMaybe<Array<Scalars['String']['input']>>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  isBlocked?: InputMaybe<Scalars['Boolean']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  mediaId?: InputMaybe<Scalars['ID']['input']>;
  mobileNumber?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  roleId?: InputMaybe<Scalars['ID']['input']>;
  userName?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateParkSpotInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  bikePrice?: InputMaybe<Scalars['Float']['input']>;
  bikeSpaces?: InputMaybe<Scalars['Int']['input']>;
  carPrice?: InputMaybe<Scalars['Float']['input']>;
  carSize?: InputMaybe<ParkSpotCarSize>;
  carSpaces?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  facilities?: InputMaybe<Array<ParkSpotFacility>>;
  location?: InputMaybe<PointInput>;
  mainImageId?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ParkSpotStatus>;
  truckPrice?: InputMaybe<Scalars['Float']['input']>;
  truckSpaces?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<ParkSpotType>;
  weeklySchedule?: InputMaybe<Array<WeekdayScheduleInput>>;
};

export type UpdateParkingFeedback = {
  comment?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  customerId?: InputMaybe<Scalars['ID']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  parkSpotId?: InputMaybe<Scalars['ID']['input']>;
  /** The score of the review, from 0 to 100 */
  score?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<ReviewStatus>;
};

export type UpdateParkingFeedbackParameter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  isGood?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateParkingSupportRequest = {
  content?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  parkOrderId?: InputMaybe<Scalars['ID']['input']>;
  requestedByOwner?: InputMaybe<Scalars['Boolean']['input']>;
  status?: InputMaybe<ComplaintStatus>;
  subject?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePasswordInput = {
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
};

export type UpdatePaymentGatewayInput = {
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  mediaId?: InputMaybe<Scalars['ID']['input']>;
  merchantId?: InputMaybe<Scalars['ID']['input']>;
  privateKey?: InputMaybe<Scalars['String']['input']>;
  publicKey?: InputMaybe<Scalars['String']['input']>;
  saltKey?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<PaymentGatewayType>;
};

export type UpdatePayoutSessionInput = {
  status: PayoutSessionStatus;
};

export type UpdateProfileInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  enabledNotifications?: InputMaybe<Array<EnabledNotification>>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  mediaId?: InputMaybe<Scalars['ID']['input']>;
  mobileNumber?: InputMaybe<Scalars['String']['input']>;
  userName?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePurchaseCodeClient = {
  __typename?: 'UpdatePurchaseCodeClient';
  enabled: Scalars['Boolean']['output'];
  firstVerifiedAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  ip: Scalars['String']['output'];
  lastVerifiedAt: Scalars['DateTime']['output'];
  port: Scalars['Float']['output'];
  purchaseId: Scalars['ID']['output'];
  token: Scalars['String']['output'];
};

export type UpdatePurchaseCodeResult = {
  __typename?: 'UpdatePurchaseCodeResult';
  clients?: Maybe<Array<UpdatePurchaseCodeClient>>;
  data?: Maybe<LicenseInformation>;
  message?: Maybe<Scalars['String']['output']>;
  status: UpdatePurchaseCodeStatus;
};

export enum UpdatePurchaseCodeStatus {
  ClientFound = 'CLIENT_FOUND',
  Invalid = 'INVALID',
  Ok = 'OK',
  Overused = 'OVERUSED'
}

export type UpdateRegionInput = {
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  location?: InputMaybe<Array<Array<PointInput>>>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateReward = {
  appType?: InputMaybe<RewardAppType>;
  beneficiary?: InputMaybe<RewardBeneficiary>;
  conditionTripCountsLessThan?: InputMaybe<Scalars['Float']['input']>;
  conditionUserNumberFirstDigits?: InputMaybe<Array<Scalars['String']['input']>>;
  creditCurrency?: InputMaybe<Scalars['String']['input']>;
  creditGift?: InputMaybe<Scalars['Float']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  event?: InputMaybe<RewardEvent>;
  id?: InputMaybe<Scalars['ID']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  tripFeePercentGift?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateRiderAddress = {
  details?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  location?: InputMaybe<PointInput>;
  riderId?: InputMaybe<Scalars['ID']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<RiderAddressType>;
};

export type UpdateSms = {
  countryIsoCode?: InputMaybe<Scalars['String']['input']>;
  from?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  providerId?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<SmsStatus>;
  to?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<SmsType>;
};

export type UpdateShopCategoryInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  imageId?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ShopCategoryStatus>;
};

export type UpdateShopDeliveryZoneInput = {
  deliveryFee?: InputMaybe<Scalars['Float']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  location?: InputMaybe<Array<Array<PointInput>>>;
  maxDeliveryTimeMinutes: Scalars['Int']['input'];
  minDeliveryTimeMinutes: Scalars['Int']['input'];
  minimumOrderAmount?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateShopFeedback = {
  comment?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  customerId?: InputMaybe<Scalars['ID']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** The score of the review, from 0 to 100 */
  score?: InputMaybe<Scalars['Int']['input']>;
  shopId?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<ReviewStatus>;
};

export type UpdateShopFeedbackParameter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  isGood?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateShopItemPresetInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  weeklySchedule?: InputMaybe<Array<WeekdayScheduleInput>>;
};

export type UpdateShopSupportRequest = {
  cartId?: InputMaybe<Scalars['ID']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  orderId?: InputMaybe<Scalars['ID']['input']>;
  requestedByShop?: InputMaybe<Scalars['Boolean']['input']>;
  status?: InputMaybe<ComplaintStatus>;
  subject?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateSosInput = {
  status: SosStatus;
};

export type UpdateSosReasonInput = {
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTaxiSupportRequest = {
  content?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  inscriptionTimestamp?: InputMaybe<Scalars['DateTime']['input']>;
  requestId?: InputMaybe<Scalars['ID']['input']>;
  requestedByDriver?: InputMaybe<Scalars['Boolean']['input']>;
  status?: InputMaybe<ComplaintStatus>;
  subject?: InputMaybe<Scalars['String']['input']>;
};

export type UpsertShopInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  /** The percentage of the delivery fee that shop pays so the delivery fee would be more appealing to the users. */
  expressDeliveryShopCommission?: InputMaybe<Scalars['Int']['input']>;
  imageId?: InputMaybe<Scalars['ID']['input']>;
  isCashOnDeliveryAvailable?: InputMaybe<Scalars['Boolean']['input']>;
  isExpressDeliveryAvailable?: InputMaybe<Scalars['Boolean']['input']>;
  isOnlinePaymentAvailable?: InputMaybe<Scalars['Boolean']['input']>;
  isShopDeliveryAvailable?: InputMaybe<Scalars['Boolean']['input']>;
  location?: InputMaybe<PointInput>;
  mobileNumber?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  personalInfo?: InputMaybe<PersonalInfoInput>;
  status?: InputMaybe<ShopStatus>;
  weeklySchedule?: InputMaybe<Array<WeekdayScheduleInput>>;
};

export type UsedUnusedCountPairDto = {
  __typename?: 'UsedUnusedCountPairDTO';
  unused: Scalars['Int']['output'];
  used: Scalars['Int']['output'];
};

/** The activity level of the user. */
export enum UserActivityLevel {
  Active = 'Active',
  Inactive = 'Inactive'
}

export type UserTypeCountPair = {
  __typename?: 'UserTypeCountPair';
  count: Scalars['Float']['output'];
  userType: AnnouncementUserType;
};

export enum Weekday {
  Friday = 'Friday',
  Monday = 'Monday',
  Saturday = 'Saturday',
  Sunday = 'Sunday',
  Thursday = 'Thursday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday'
}

export type WeekdayMultiplier = {
  __typename?: 'WeekdayMultiplier';
  multiply: Scalars['Float']['output'];
  weekday: Weekday;
};

export type WeekdayMultiplierInput = {
  multiply: Scalars['Float']['input'];
  weekday: Weekday;
};

export type WeekdaySchedule = {
  __typename?: 'WeekdaySchedule';
  openingHours: Array<TimeRange>;
  weekday: Weekday;
};

export type WeekdayScheduleInput = {
  openingHours: Array<OpeningHoursInput>;
  weekday: Weekday;
};

export type ZonePrice = {
  __typename?: 'ZonePrice';
  cost: Scalars['Float']['output'];
  fleets: Array<Fleet>;
  from: Array<Array<Point>>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  services: Array<Service>;
  timeMultipliers: Array<TimeMultiplier>;
  to: Array<Array<Point>>;
};


export type ZonePriceFleetsArgs = {
  filter?: FleetFilter;
  sorting?: Array<FleetSort>;
};


export type ZonePriceServicesArgs = {
  filter?: ServiceFilter;
  sorting?: Array<ServiceSort>;
};

export type ZonePriceCategory = {
  __typename?: 'ZonePriceCategory';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  zonePrices: ZonePriceCategoryZonePricesConnection;
};


export type ZonePriceCategoryZonePricesArgs = {
  filter?: ZonePriceFilter;
  paging?: OffsetPaging;
  sorting?: Array<ZonePriceSort>;
};

export type ZonePriceCategoryDeleteResponse = {
  __typename?: 'ZonePriceCategoryDeleteResponse';
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type ZonePriceCategoryFilter = {
  and?: InputMaybe<Array<ZonePriceCategoryFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ZonePriceCategoryFilter>>;
};

export type ZonePriceCategoryInput = {
  name: Scalars['String']['input'];
};

export type ZonePriceCategorySort = {
  direction: SortDirection;
  field: ZonePriceCategorySortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum ZonePriceCategorySortFields {
  Id = 'id'
}

export type ZonePriceCategoryZonePricesConnection = {
  __typename?: 'ZonePriceCategoryZonePricesConnection';
  /** Array of nodes. */
  nodes: Array<ZonePrice>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type ZonePriceConnection = {
  __typename?: 'ZonePriceConnection';
  /** Array of nodes. */
  nodes: Array<ZonePrice>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type ZonePriceDeleteResponse = {
  __typename?: 'ZonePriceDeleteResponse';
  cost?: Maybe<Scalars['Float']['output']>;
  from?: Maybe<Array<Array<Point>>>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  timeMultipliers?: Maybe<Array<TimeMultiplier>>;
  to?: Maybe<Array<Array<Point>>>;
};

export type ZonePriceFilter = {
  and?: InputMaybe<Array<ZonePriceFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ZonePriceFilter>>;
};

export type ZonePriceInput = {
  cost: Scalars['Float']['input'];
  from: Array<Array<PointInput>>;
  name: Scalars['String']['input'];
  timeMultipliers: Array<TimeMultiplierInput>;
  to: Array<Array<PointInput>>;
};

export type ZonePriceSort = {
  direction: SortDirection;
  field: ZonePriceSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum ZonePriceSortFields {
  Id = 'id'
}

export type NotificationsQueryVariables = Exact<{ [key: string]: never; }>;


export type NotificationsQuery = { __typename?: 'Query', taxiSupportRequestAggregate: Array<{ __typename?: 'TaxiSupportRequestAggregateResponse', count?: { __typename?: 'TaxiSupportRequestCountAggregate', id?: number | null } | null }>, distressSignalAggregate: Array<{ __typename?: 'DistressSignalAggregateResponse', count?: { __typename?: 'DistressSignalCountAggregate', id?: number | null } | null }>, driverAggregate: Array<{ __typename?: 'DriverAggregateResponse', count?: { __typename?: 'DriverCountAggregate', id?: number | null } | null }> };

export type SosSubscriptionSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type SosSubscriptionSubscription = { __typename?: 'Subscription', sosCreated: { __typename?: 'DistressSignal', id: string, status: SosStatus } };

export type ComplaintSubscriptionSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type ComplaintSubscriptionSubscription = { __typename?: 'Subscription', complaintCreated: { __typename?: 'TaxiSupportRequest', id: string, status: ComplaintStatus } };

export type ViewComplaintQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ViewComplaintQuery = { __typename?: 'Query', complaint: { __typename?: 'TaxiSupportRequest', id: string, inscriptionTimestamp: any, status: ComplaintStatus, subject: string, content?: string | null, requestedByDriver: boolean, activities: Array<{ __typename?: 'TaxiSupportRequestActivity', type: ComplaintActivityType, comment?: string | null, actor: { __typename?: 'Operator', firstName?: string | null, lastName?: string | null }, assignedToStaffs: Array<{ __typename?: 'Operator', firstName?: string | null, lastName?: string | null }> }>, order: { __typename?: 'Order', id: string, status: OrderStatus, createdOn: any, startTimestamp?: any | null, finishTimestamp?: any | null, expectedTimestamp?: any | null, costBest: number, costAfterCoupon: number, addresses: Array<string>, currency: string, rider?: { __typename?: 'Rider', id: string, mobileNumber: string, status: RiderStatus, firstName?: string | null, lastName?: string | null, registrationTimestamp: any } | null, driver?: { __typename?: 'Driver', id: string, mobileNumber: string, status: DriverStatus, firstName?: string | null, lastName?: string | null, registrationTimestamp: any } | null } } };

export type UpdateComplaintStatusMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  status: ComplaintStatus;
}>;


export type UpdateComplaintStatusMutation = { __typename?: 'Mutation', updateOneTaxiSupportRequest: { __typename?: 'TaxiSupportRequest', id: string } };

export type ComplaintsListQueryVariables = Exact<{
  paging?: InputMaybe<OffsetPaging>;
}>;


export type ComplaintsListQuery = { __typename?: 'Query', taxiSupportRequests: { __typename?: 'TaxiSupportRequestConnection', totalCount: number, nodes: Array<{ __typename?: 'TaxiSupportRequest', id: string, inscriptionTimestamp: any, subject: string, status: ComplaintStatus, content?: string | null }> } };

export type CreateDriverMutationVariables = Exact<{
  input: UpdateDriverInput;
}>;


export type CreateDriverMutation = { __typename?: 'Mutation', createOneDriver: { __typename?: 'Driver', id: string } };

export type ViewDriverQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ViewDriverQuery = { __typename?: 'Query', driver: { __typename?: 'Driver', id: string, firstName?: string | null, lastName?: string | null, mobileNumber: string, registrationTimestamp: any, lastSeenTimestamp?: any | null, status: DriverStatus, gender?: Gender | null, carId?: string | null, carColorId?: string | null, fleetId?: string | null, carProductionYear?: number | null, carPlate?: string | null, accountNumber?: string | null, bankName?: string | null, bankRoutingNumber?: string | null, bankSwift?: string | null, address?: string | null, email?: string | null, mediaId?: string | null, rating?: number | null, reviewCount: number, feedbacks: { __typename?: 'DriverFeedbacksConnection', nodes: Array<{ __typename?: 'Feedback', parametersAggregate: Array<{ __typename?: 'FeedbackParametersAggregateResponse', groupBy?: { __typename?: 'FeedbackParametersAggregateGroupBy', title?: string | null, isGood?: boolean | null } | null, count?: { __typename?: 'FeedbackParametersCountAggregate', id?: number | null } | null }> }> }, enabledServices: Array<{ __typename?: 'DriverServicesServiceDTO', serviceId: string }>, driverToDriverDocuments: Array<{ __typename?: 'DriverToDriverDocument', id: string, media: { __typename?: 'Media', address: string } }>, media?: { __typename?: 'Media', address: string } | null }, services: Array<{ __typename?: 'Service', id: string, name: string }>, fleets: { __typename?: 'FleetConnection', nodes: Array<{ __typename?: 'Fleet', id: string, name: string }> }, driverFeedbackParametersSummary: Array<{ __typename?: 'FeedbackParameterAggregate', title: string, isGood: boolean, count: string }>, carModels: { __typename?: 'CarModelConnection', nodes: Array<{ __typename?: 'CarModel', id: string, name: string }> }, carColors: { __typename?: 'CarColorConnection', nodes: Array<{ __typename?: 'CarColor', id: string, name: string }> } };

export type UpdateDriverProfileMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  update: UpdateDriverInput;
  serviceIds: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;


export type UpdateDriverProfileMutation = { __typename?: 'Mutation', setActivatedServicesOnDriver: boolean, updateOneDriver: { __typename?: 'Driver', id: string } };

export type UpdateDriverStatusMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  status?: InputMaybe<DriverStatus>;
}>;


export type UpdateDriverStatusMutation = { __typename?: 'Mutation', updateOneDriver: { __typename?: 'Driver', id: string } };

export type DriverFinancialsQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  paging?: InputMaybe<OffsetPaging>;
  filter?: InputMaybe<DriverTransactionFilter>;
  sorting?: InputMaybe<Array<DriverTransactionSort> | DriverTransactionSort>;
}>;


export type DriverFinancialsQuery = { __typename?: 'Query', driver: { __typename?: 'Driver', transactions: { __typename?: 'DriverTransactionsConnection', totalCount: number, nodes: Array<{ __typename?: 'DriverTransaction', status: TransactionStatus, createdAt: any, amount: number, description?: string | null, currency: string, action: TransactionAction, deductType?: DriverDeductTransactionType | null, rechargeType?: DriverRechargeTransactionType | null, refrenceNumber?: string | null, requestId?: string | null, paymentGatewayId?: string | null, operatorId?: string | null }> }, wallet: Array<{ __typename?: 'DriverWallet', balance: number, currency: string }> }, regions: { __typename?: 'RegionConnection', nodes: Array<{ __typename?: 'Region', currency: string }> } };

export type DriverFeedbacksQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  paging?: InputMaybe<OffsetPaging>;
}>;


export type DriverFeedbacksQuery = { __typename?: 'Query', feedbacks: { __typename?: 'FeedbackConnection', nodes: Array<{ __typename?: 'Feedback', id: string, requestId: string, reviewTimestamp: any, score: number, description?: string | null, parameters: Array<{ __typename?: 'FeedbackParameter', isGood: boolean, title: string }> }> } };

export type DriverOrdersQueryVariables = Exact<{
  driverId: Scalars['ID']['input'];
  filter?: InputMaybe<OrderFilter>;
  paging?: InputMaybe<OffsetPaging>;
  sorting?: InputMaybe<Array<OrderSort> | OrderSort>;
}>;


export type DriverOrdersQuery = { __typename?: 'Query', driver: { __typename?: 'Driver', orders: { __typename?: 'DriverOrdersConnection', totalCount: number, nodes: Array<{ __typename?: 'Order', id: string, createdOn: any, status: OrderStatus, distanceBest: number, durationBest: number, costBest: number, costAfterCoupon: number, currency: string, addresses: Array<string>, expectedTimestamp?: any | null, points: Array<{ __typename?: 'Point', lat: number, lng: number }> }> } } };

export type CreateDriverTransactionMutationVariables = Exact<{
  input: DriverTransactionInput;
}>;


export type CreateDriverTransactionMutation = { __typename?: 'Mutation', createDriverTransaction: { __typename?: 'DriverWallet', id: string } };

export type DeleteDriverMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteDriverMutation = { __typename?: 'Mutation', deleteOneDriver: { __typename?: 'Driver', id: string } };

export type DriversListQueryVariables = Exact<{
  paging?: InputMaybe<OffsetPaging>;
  filter?: InputMaybe<DriverFilter>;
  sorting?: InputMaybe<Array<DriverSort> | DriverSort>;
}>;


export type DriversListQuery = { __typename?: 'Query', drivers: { __typename?: 'DriverConnection', totalCount: number, nodes: Array<{ __typename?: 'Driver', id: string, firstName?: string | null, lastName?: string | null, gender?: Gender | null, mobileNumber: string, status: DriverStatus, registrationTimestamp: any }> } };

export type ProviderWalletsListQueryVariables = Exact<{
  paging?: InputMaybe<OffsetPaging>;
}>;


export type ProviderWalletsListQuery = { __typename?: 'Query', providerTransactions: { __typename?: 'ProviderTransactionConnection', totalCount: number, nodes: Array<{ __typename?: 'ProviderTransaction', createdAt: any, action: TransactionAction, deductType?: ProviderDeductTransactionType | null, rechargeType?: ProviderRechargeTransactionType | null, amount: number, currency: string, description?: string | null, requestId?: string | null, operatorId?: string | null }> }, providerWallets: Array<{ __typename?: 'ProviderWallet', balance: number, currency: string }>, regions: { __typename?: 'RegionConnection', nodes: Array<{ __typename?: 'Region', currency: string }> } };

export type ExportQueryVariables = Exact<{
  input: ExportArgs;
}>;


export type ExportQuery = { __typename?: 'Query', export: { __typename?: 'ExportResult', url: string } };

export type DriverWalletsListQueryVariables = Exact<{
  paging?: InputMaybe<OffsetPaging>;
}>;


export type DriverWalletsListQuery = { __typename?: 'Query', driverWallets: { __typename?: 'DriverWalletConnection', totalCount: number, nodes: Array<{ __typename?: 'DriverWallet', id: string, driverId: string, balance: number, currency: string, driver?: { __typename?: 'Driver', firstName?: string | null, lastName?: string | null } | null }> }, regions: { __typename?: 'RegionConnection', nodes: Array<{ __typename?: 'Region', currency: string }> } };

export type FleetWalletsListQueryVariables = Exact<{
  paging?: InputMaybe<OffsetPaging>;
  filter?: InputMaybe<FleetWalletFilter>;
}>;


export type FleetWalletsListQuery = { __typename?: 'Query', fleetWallets: { __typename?: 'FleetWalletConnection', totalCount: number, nodes: Array<{ __typename?: 'FleetWallet', id: string, balance: number, currency: string, fleetId: string, fleet: { __typename?: 'Fleet', name: string } }> }, regions: { __typename?: 'RegionConnection', nodes: Array<{ __typename?: 'Region', currency: string }> } };

export type RiderWalletsListQueryVariables = Exact<{
  paging?: InputMaybe<OffsetPaging>;
}>;


export type RiderWalletsListQuery = { __typename?: 'Query', riderWallets: { __typename?: 'RiderWalletConnection', totalCount: number, nodes: Array<{ __typename?: 'RiderWallet', balance: number, currency: string, riderId: string, rider?: { __typename?: 'Rider', firstName?: string | null, lastName?: string | null } | null }> }, regions: { __typename?: 'RegionConnection', nodes: Array<{ __typename?: 'Region', currency: string }> } };

export type DispatcherCalculateFareQueryVariables = Exact<{
  points: Array<PointInput> | PointInput;
  riderId: Scalars['ID']['input'];
}>;


export type DispatcherCalculateFareQuery = { __typename?: 'Query', calculateFare: { __typename?: 'CalculateFare', currency: string, distance: number, duration: number, services: Array<{ __typename?: 'ServiceCategoryWithCost', name: string, services: Array<{ __typename?: 'ServiceWithCost', id: string, name: string, cost: number }> }> } };

export type CreateOrderMutationVariables = Exact<{
  riderId: Scalars['ID']['input'];
  points: Array<PointInput> | PointInput;
  addresses: Array<Scalars['String']['input']> | Scalars['String']['input'];
  serviceId: Scalars['ID']['input'];
  intervalMinutes: Scalars['Int']['input'];
}>;


export type CreateOrderMutation = { __typename?: 'Mutation', createOrder: { __typename?: 'Order', id: string } };

export type OrderUpdatedSubscriptionVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type OrderUpdatedSubscription = { __typename?: 'Subscription', orderUpdated: { __typename?: 'Order', id: string, status: OrderStatus, driver?: { __typename?: 'Driver', firstName?: string | null, lastName?: string | null, mobileNumber: string } | null } };

export type CancelOrderMutationVariables = Exact<{
  orderId: Scalars['ID']['input'];
}>;


export type CancelOrderMutation = { __typename?: 'Mutation', cancelOrder: { __typename?: 'Order', id: string, status: OrderStatus } };

export type DriverOverviewInfoFragment = { __typename?: 'Driver', id: string, firstName?: string | null, lastName?: string | null, mobileNumber: string, status: DriverStatus };

export type DriverLocationFragment = { __typename?: 'OnlineDriver', driverId: string, lastUpdatedAt: any, location: { __typename?: 'Point', lat: number, lng: number } };

export type OverviewQueryVariables = Exact<{ [key: string]: never; }>;


export type OverviewQuery = { __typename?: 'Query', taxiSupportRequestAggregate: Array<{ __typename?: 'TaxiSupportRequestAggregateResponse', count?: { __typename?: 'TaxiSupportRequestCountAggregate', id?: number | null } | null }>, driverAggregate: Array<{ __typename?: 'DriverAggregateResponse', count?: { __typename?: 'DriverCountAggregate', id?: number | null } | null }>, activeOrders: Array<{ __typename?: 'OrderAggregateResponse', count?: { __typename?: 'OrderCountAggregate', id?: number | null } | null }>, bookedOrders: Array<{ __typename?: 'OrderAggregateResponse', count?: { __typename?: 'OrderCountAggregate', id?: number | null } | null }>, getDriversLocation: Array<{ __typename?: 'OnlineDriver', driverId: string, lastUpdatedAt: any, location: { __typename?: 'Point', lat: number, lng: number } }> };

export type OverviewDriverPagingQueryVariables = Exact<{
  ids: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;


export type OverviewDriverPagingQuery = { __typename?: 'Query', drivers: { __typename?: 'DriverConnection', totalCount: number, nodes: Array<{ __typename?: 'Driver', id: string, firstName?: string | null, lastName?: string | null, mobileNumber: string, status: DriverStatus }> } };

export type RequestsChartQueryVariables = Exact<{
  timeframe: ChartTimeframe;
}>;


export type RequestsChartQuery = { __typename?: 'Query', requestChart: Array<{ __typename?: 'RequestResultItem', time: string, count: number, status: OrderStatus }> };

export type IncomeChartQueryVariables = Exact<{
  timeframe: ChartTimeframe;
}>;


export type IncomeChartQuery = { __typename?: 'Query', incomeChart: Array<{ __typename?: 'IncomeResultItem', time: string, sum: number, currency: string }> };

export type DriverRegistrationsQueryVariables = Exact<{
  timeframe: ChartTimeframe;
}>;


export type DriverRegistrationsQuery = { __typename?: 'Query', driverRegistrations: Array<{ __typename?: 'RegistrationResultItem', time: string, count: number }> };

export type RiderRegistrationsQueryVariables = Exact<{
  timeframe: ChartTimeframe;
}>;


export type RiderRegistrationsQuery = { __typename?: 'Query', riderRegistrations: Array<{ __typename?: 'RegistrationResultItem', time: string, count: number }> };

export type CarsListQueryVariables = Exact<{ [key: string]: never; }>;


export type CarsListQuery = { __typename?: 'Query', carModels: { __typename?: 'CarModelConnection', nodes: Array<{ __typename?: 'CarModel', id: string, name: string }> }, carColors: { __typename?: 'CarColorConnection', nodes: Array<{ __typename?: 'CarColor', id: string, name: string }> } };

export type DeleteCarModelMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteCarModelMutation = { __typename?: 'Mutation', deleteOneCarModel: { __typename?: 'CarModelDeleteResponse', id?: string | null } };

export type DeleteCarColorMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteCarColorMutation = { __typename?: 'Mutation', deleteOneCarColor: { __typename?: 'CarColorDeleteResponse', id?: string | null } };

export type CreateCarModelMutationVariables = Exact<{
  input: CarModelInput;
}>;


export type CreateCarModelMutation = { __typename?: 'Mutation', createOneCarModel: { __typename?: 'CarModel', id: string } };

export type CreateCarColorMutationVariables = Exact<{
  input: CarColorInput;
}>;


export type CreateCarColorMutation = { __typename?: 'Mutation', createOneCarColor: { __typename?: 'CarColor', id: string } };

export type UpdateCarModelMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: CarModelInput;
}>;


export type UpdateCarModelMutation = { __typename?: 'Mutation', updateOneCarModel: { __typename?: 'CarModel', id: string } };

export type UpdateCarColorMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: CarColorInput;
}>;


export type UpdateCarColorMutation = { __typename?: 'Mutation', updateOneCarColor: { __typename?: 'CarColor', id: string } };

export type CreateFleetMutationVariables = Exact<{
  input: CreateFleetInput;
}>;


export type CreateFleetMutation = { __typename?: 'Mutation', createOneFleet: { __typename?: 'Fleet', id: string } };

export type ViewFleetQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ViewFleetQuery = { __typename?: 'Query', fleet: { __typename?: 'Fleet', id: string, name: string, phoneNumber: string, address?: string | null, mobileNumber: string, accountNumber: string, userName?: string | null, password?: string | null, commissionSharePercent: number, commissionShareFlat: number, feeMultiplier?: number | null, exclusivityAreas?: Array<Array<{ __typename?: 'Point', lat: number, lng: number }>> | null } };

export type FleetFinancialsQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  paging?: InputMaybe<OffsetPaging>;
  filter?: InputMaybe<FleetTransactionFilter>;
  sorting?: InputMaybe<Array<FleetTransactionSort> | FleetTransactionSort>;
}>;


export type FleetFinancialsQuery = { __typename?: 'Query', fleet: { __typename?: 'Fleet', transactions: { __typename?: 'FleetTransactionsConnection', totalCount: number, nodes: Array<{ __typename?: 'FleetTransaction', transactionTimestamp: any, amount: number, currency: string, action: TransactionAction, deductType?: ProviderDeductTransactionType | null, rechargeType?: ProviderRechargeTransactionType | null, refrenceNumber?: string | null, operatorId?: string | null, requestId?: string | null, description?: string | null }> }, wallet: Array<{ __typename?: 'FleetWallet', currency: string, balance: number }> }, regions: { __typename?: 'RegionConnection', nodes: Array<{ __typename?: 'Region', currency: string }> } };

export type FleetZonePricesQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  paging?: InputMaybe<OffsetPaging>;
  filter?: InputMaybe<ZonePriceFilter>;
  sorting?: InputMaybe<Array<ZonePriceSort> | ZonePriceSort>;
}>;


export type FleetZonePricesQuery = { __typename?: 'Query', fleet: { __typename?: 'Fleet', zonePrices: { __typename?: 'FleetZonePricesConnection', totalCount: number, nodes: Array<{ __typename?: 'ZonePrice', id: string, name: string }> } } };

export type FleetDriversQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  paging?: InputMaybe<OffsetPaging>;
}>;


export type FleetDriversQuery = { __typename?: 'Query', drivers: { __typename?: 'DriverConnection', nodes: Array<{ __typename?: 'Driver', id: string, firstName?: string | null, lastName?: string | null, mobileNumber: string }> } };

export type UpdateFleetMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  update: UpdateFleetInput;
}>;


export type UpdateFleetMutation = { __typename?: 'Mutation', updateOneFleet: { __typename?: 'Fleet', id: string } };

export type CreateFleetTransactionMutationVariables = Exact<{
  input: FleetTransactionInput;
}>;


export type CreateFleetTransactionMutation = { __typename?: 'Mutation', createFleetTransaction: { __typename?: 'FleetWallet', id: string } };

export type FleetsListQueryVariables = Exact<{
  paging?: InputMaybe<OffsetPaging>;
  filter?: InputMaybe<FleetFilter>;
}>;


export type FleetsListQuery = { __typename?: 'Query', fleets: { __typename?: 'FleetConnection', totalCount: number, nodes: Array<{ __typename?: 'Fleet', id: string, name: string, phoneNumber: string, address?: string | null }> } };

export type OrderCancelReasonListQueryVariables = Exact<{
  paging?: InputMaybe<OffsetPaging>;
}>;


export type OrderCancelReasonListQuery = { __typename?: 'Query', orderCancelReasons: { __typename?: 'OrderCancelReasonConnection', totalCount: number, nodes: Array<{ __typename?: 'OrderCancelReason', id: string, title: string, isEnabled: boolean, userType: AnnouncementUserType }> } };

export type OrderCancelReasonViewQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type OrderCancelReasonViewQuery = { __typename?: 'Query', orderCancelReason: { __typename?: 'OrderCancelReason', id: string, title: string, userType: AnnouncementUserType, isEnabled: boolean } };

export type UpdateOrderCancelReasonMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  update: OrderCancelReasonInput;
}>;


export type UpdateOrderCancelReasonMutation = { __typename?: 'Mutation', updateOneOrderCancelReason: { __typename?: 'OrderCancelReason', id: string } };

export type CreateOrderCancelReasonMutationVariables = Exact<{
  input: OrderCancelReasonInput;
}>;


export type CreateOrderCancelReasonMutation = { __typename?: 'Mutation', createOneOrderCancelReason: { __typename?: 'OrderCancelReason', id: string } };

export type ViewPaymentGatewayQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ViewPaymentGatewayQuery = { __typename?: 'Query', paymentGateway: { __typename?: 'PaymentGateway', id: string, title: string, type: PaymentGatewayType, enabled: boolean, privateKey: string, publicKey?: string | null, merchantId?: string | null, saltKey?: string | null, mediaId?: string | null, media?: { __typename?: 'Media', address: string } | null } };

export type CreatePaymentGatewayMutationVariables = Exact<{
  input: CreatePaymentGatewayInput;
}>;


export type CreatePaymentGatewayMutation = { __typename?: 'Mutation', createOnePaymentGateway: { __typename?: 'PaymentGateway', id: string } };

export type UpdatePaymentGatewayMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdatePaymentGatewayInput;
}>;


export type UpdatePaymentGatewayMutation = { __typename?: 'Mutation', updateOnePaymentGateway: { __typename?: 'PaymentGateway', id: string } };

export type PaymentGatewaysQueryVariables = Exact<{
  paging?: InputMaybe<OffsetPaging>;
}>;


export type PaymentGatewaysQuery = { __typename?: 'Query', paymentGateways: { __typename?: 'PaymentGatewayConnection', totalCount: number, nodes: Array<{ __typename?: 'PaymentGateway', id: string, enabled: boolean, title: string, type: PaymentGatewayType, media?: { __typename?: 'Media', address: string } | null }> } };

export type RegionListQueryVariables = Exact<{
  paging?: InputMaybe<OffsetPaging>;
}>;


export type RegionListQuery = { __typename?: 'Query', regions: { __typename?: 'RegionConnection', totalCount: number, nodes: Array<{ __typename?: 'Region', id: string, name: string, currency: string, enabled: boolean, location: Array<Array<{ __typename?: 'Point', lat: number, lng: number }>> }> } };

export type RegionViewQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RegionViewQuery = { __typename?: 'Query', region: { __typename?: 'Region', id: string, name: string, currency: string, enabled: boolean, location: Array<Array<{ __typename?: 'Point', lat: number, lng: number }>> } };

export type UpdateRegionMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  update: UpdateRegionInput;
}>;


export type UpdateRegionMutation = { __typename?: 'Mutation', updateOneRegion: { __typename?: 'Region', id: string } };

export type CreateRegionMutationVariables = Exact<{
  input: CreateRegionInput;
}>;


export type CreateRegionMutation = { __typename?: 'Mutation', createOneRegion: { __typename?: 'Region', id: string } };

export type ReviewParameterViewQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ReviewParameterViewQuery = { __typename?: 'Query', feedbackParameter: { __typename?: 'FeedbackParameter', id: string, title: string, isGood: boolean } };

export type UpdateReviewParameterMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  update: FeedbackParameterInput;
}>;


export type UpdateReviewParameterMutation = { __typename?: 'Mutation', updateOneFeedbackParameter: { __typename?: 'FeedbackParameter', id: string } };

export type CreateReviewParameterMutationVariables = Exact<{
  input: FeedbackParameterInput;
}>;


export type CreateReviewParameterMutation = { __typename?: 'Mutation', createOneFeedbackParameter: { __typename?: 'FeedbackParameter', id: string } };

export type ReviewParametersListQueryVariables = Exact<{ [key: string]: never; }>;


export type ReviewParametersListQuery = { __typename?: 'Query', feedbackParameters: Array<{ __typename?: 'FeedbackParameter', id: string, title: string, isGood: boolean }> };

export type RolesQueryVariables = Exact<{ [key: string]: never; }>;


export type RolesQuery = { __typename?: 'Query', operatorRoles: Array<{ __typename?: 'OperatorRole', id: string, title: string }> };

export type RoleQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RoleQuery = { __typename?: 'Query', operatorRole: { __typename?: 'OperatorRole', id: string, title: string, permissions: Array<OperatorPermission> } };

export type CreateRoleMutationVariables = Exact<{
  input: OperatorRoleInput;
}>;


export type CreateRoleMutation = { __typename?: 'Mutation', createOneOperatorRole: { __typename?: 'OperatorRole', id: string, title: string, permissions: Array<OperatorPermission> } };

export type UpdateRoleMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: OperatorRoleInput;
}>;


export type UpdateRoleMutation = { __typename?: 'Mutation', updateOneOperatorRole: { __typename?: 'OperatorRole', id: string } };

export type ServiceOptionViewQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ServiceOptionViewQuery = { __typename?: 'Query', serviceOption: { __typename?: 'ServiceOption', id: string, name: string, type: ServiceOptionType, icon: ServiceOptionIcon, additionalFee?: number | null } };

export type UpdateServiceOptionMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  update: ServiceOptionInput;
}>;


export type UpdateServiceOptionMutation = { __typename?: 'Mutation', updateOneServiceOption: { __typename?: 'ServiceOption', id: string } };

export type CreateServiceOptionMutationVariables = Exact<{
  input: ServiceOptionInput;
}>;


export type CreateServiceOptionMutation = { __typename?: 'Mutation', createOneServiceOption: { __typename?: 'ServiceOption', id: string } };

export type ServiceOptionsListQueryVariables = Exact<{ [key: string]: never; }>;


export type ServiceOptionsListQuery = { __typename?: 'Query', serviceOptions: Array<{ __typename?: 'ServiceOption', id: string, name: string, icon: ServiceOptionIcon, type: ServiceOptionType, additionalFee?: number | null }> };

export type ViewServiceCategoryQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ViewServiceCategoryQuery = { __typename?: 'Query', serviceCategory: { __typename?: 'ServiceCategory', id: string, name: string } };

export type CreateServiceCategoryMutationVariables = Exact<{
  input: ServiceCategoryInput;
}>;


export type CreateServiceCategoryMutation = { __typename?: 'Mutation', createOneServiceCategory: { __typename?: 'ServiceCategory', id: string } };

export type UpdateServiceCategoryMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: ServiceCategoryInput;
}>;


export type UpdateServiceCategoryMutation = { __typename?: 'Mutation', updateOneServiceCategory: { __typename?: 'ServiceCategory', id: string } };

export type DeleteServiceCategoryMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteServiceCategoryMutation = { __typename?: 'Mutation', deleteOneServiceCategory: { __typename?: 'ServiceCategoryDeleteResponse', id?: string | null } };

export type ServicesListQueryVariables = Exact<{ [key: string]: never; }>;


export type ServicesListQuery = { __typename?: 'Query', serviceCategories: Array<{ __typename?: 'ServiceCategory', id: string, name: string, services: Array<{ __typename?: 'Service', id: string, name: string, description?: string | null, media: { __typename?: 'Media', address: string } }> }> };

export type ViewServiceQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ViewServiceQuery = { __typename?: 'Query', service: { __typename?: 'Service', id: string, name: string, categoryId: string, baseFare: number, perHundredMeters: number, perMinuteDrive: number, perMinuteWait: number, minimumFee: number, searchRadius: number, maximumDestinationDistance: number, paymentMethod: ServicePaymentMethod, cancellationTotalFee: number, cancellationDriverShare: number, providerShareFlat: number, providerSharePercent: number, prepayPercent: number, mediaId: string, description?: string | null, personCapacity?: number | null, roundingFactor?: number | null, media: { __typename?: 'Media', address: string }, timeMultipliers: Array<{ __typename?: 'TimeMultiplier', startTime: string, endTime: string, multiply: number }>, distanceMultipliers: Array<{ __typename?: 'DistanceMultiplier', distanceFrom: number, distanceTo: number, multiply: number }>, weekdayMultipliers: Array<{ __typename?: 'WeekdayMultiplier', weekday: Weekday, multiply: number }>, dateRangeMultipliers: Array<{ __typename?: 'DateRangeMultiplier', startDate: number, endDate: number, multiply: number }>, options: Array<{ __typename?: 'ServiceOption', id: string, name: string, type: ServiceOptionType, additionalFee?: number | null, icon: ServiceOptionIcon }>, regions: Array<{ __typename?: 'Region', id: string, name: string, currency: string }> }, regions: { __typename?: 'RegionConnection', nodes: Array<{ __typename?: 'Region', id: string, name: string, currency: string }> }, serviceCategories: Array<{ __typename?: 'ServiceCategory', id: string, name: string }>, serviceOptions: Array<{ __typename?: 'ServiceOption', id: string, name: string, icon: ServiceOptionIcon, type: ServiceOptionType, additionalFee?: number | null }> };

export type NewServiceQueryVariables = Exact<{ [key: string]: never; }>;


export type NewServiceQuery = { __typename?: 'Query', regions: { __typename?: 'RegionConnection', nodes: Array<{ __typename?: 'Region', id: string, name: string, currency: string }> }, serviceCategories: Array<{ __typename?: 'ServiceCategory', id: string, name: string }>, serviceOptions: Array<{ __typename?: 'ServiceOption', id: string, name: string, icon: ServiceOptionIcon, type: ServiceOptionType, additionalFee?: number | null }> };

export type CreateServiceMutationVariables = Exact<{
  input: ServiceInput;
}>;


export type CreateServiceMutation = { __typename?: 'Mutation', createOneService: { __typename?: 'Service', id: string } };

export type DeleteServiceMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteServiceMutation = { __typename?: 'Mutation', deleteOneService: { __typename?: 'ServiceDeleteResponse', id?: string | null } };

export type UpdateServiceMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: ServiceInput;
}>;


export type UpdateServiceMutation = { __typename?: 'Mutation', updateOneService: { __typename?: 'Service', id: string } };

export type SetRegionsOnServiceMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  relationIds: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;


export type SetRegionsOnServiceMutation = { __typename?: 'Mutation', setRegionsOnService: { __typename?: 'Service', id: string } };

export type SetOptionsOnServiceMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  relationIds: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;


export type SetOptionsOnServiceMutation = { __typename?: 'Mutation', setOptionsOnService: { __typename?: 'Service', id: string } };

export type UpdatePasswordMutationVariables = Exact<{
  input: UpdatePasswordInput;
}>;


export type UpdatePasswordMutation = { __typename?: 'Mutation', updatePassword: { __typename?: 'Operator', id: string } };

export type GetConfigurationQueryVariables = Exact<{ [key: string]: never; }>;


export type GetConfigurationQuery = { __typename?: 'Query', currentConfiguration: { __typename?: 'CurrentConfiguration', backendMapsAPIKey?: string | null, adminPanelAPIKey?: string | null } };

export type UpdateConfigMutationVariables = Exact<{
  input: UpdateConfigInput;
}>;


export type UpdateConfigMutation = { __typename?: 'Mutation', saveConfiguration: { __typename?: 'CurrentConfiguration', backendMapsAPIKey?: string | null, adminPanelAPIKey?: string | null } };

export type SmsProvidersQueryVariables = Exact<{
  paging?: InputMaybe<OffsetPaging>;
}>;


export type SmsProvidersQuery = { __typename?: 'Query', smsProviders: { __typename?: 'SMSProviderConnection', totalCount: number, nodes: Array<{ __typename?: 'SMSProvider', id: string, isDefault: boolean, name: string, type: SmsProviderType }> } };

export type ViewSmsProviderQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ViewSmsProviderQuery = { __typename?: 'Query', smsProvider: { __typename?: 'SMSProvider', id: string, name: string, type: SmsProviderType, isDefault: boolean, authToken?: string | null, accountId: string, fromNumber?: string | null, verificationTemplate?: string | null, smsType?: string | null } };

export type CreateSmsProviderMutationVariables = Exact<{
  input: SmsProviderInput;
}>;


export type CreateSmsProviderMutation = { __typename?: 'Mutation', createOneSMSProvider: { __typename?: 'SMSProvider', id: string } };

export type UpdateSmsProviderMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: SmsProviderInput;
}>;


export type UpdateSmsProviderMutation = { __typename?: 'Mutation', updateOneSMSProvider: { __typename?: 'SMSProvider', id: string } };

export type MarkSmsProviderAsDefaultMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type MarkSmsProviderAsDefaultMutation = { __typename?: 'Mutation', markSMSProviderAsDefault: { __typename?: 'SMSProvider', id: string } };

export type CreateOperatorMutationVariables = Exact<{
  input: CreateOperatorInput;
}>;


export type CreateOperatorMutation = { __typename?: 'Mutation', createOneOperator: { __typename?: 'Operator', id: string } };

export type ViewOperatorQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ViewOperatorQuery = { __typename?: 'Query', operator: { __typename?: 'Operator', id: string, firstName?: string | null, lastName?: string | null, mobileNumber?: string | null, userName: string, email?: string | null, roleId?: string | null }, operatorRoles: Array<{ __typename?: 'OperatorRole', id: string, title: string }> };

export type NewOperatorQueryVariables = Exact<{ [key: string]: never; }>;


export type NewOperatorQuery = { __typename?: 'Query', operatorRoles: Array<{ __typename?: 'OperatorRole', id: string, title: string }> };

export type UpdateOperatorMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  update: UpdateOperatorInput;
}>;


export type UpdateOperatorMutation = { __typename?: 'Mutation', updateOneOperator: { __typename?: 'Operator', id: string } };

export type UsersListQueryVariables = Exact<{
  paging?: InputMaybe<OffsetPaging>;
}>;


export type UsersListQuery = { __typename?: 'Query', operators: { __typename?: 'OperatorConnection', totalCount: number, nodes: Array<{ __typename?: 'Operator', id: string, userName: string, firstName?: string | null, lastName?: string | null, role?: { __typename?: 'OperatorRole', title: string } | null }> } };

export type ZonePriceViewQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ZonePriceViewQuery = { __typename?: 'Query', zonePrice: { __typename?: 'ZonePrice', id: string, name: string, cost: number, from: Array<Array<{ __typename?: 'Point', lat: number, lng: number }>>, to: Array<Array<{ __typename?: 'Point', lat: number, lng: number }>>, services: Array<{ __typename?: 'Service', id: string }>, fleets: Array<{ __typename?: 'Fleet', id: string }>, timeMultipliers: Array<{ __typename?: 'TimeMultiplier', startTime: string, endTime: string, multiply: number }> }, fleets: { __typename?: 'FleetConnection', nodes: Array<{ __typename?: 'Fleet', id: string, name: string }> }, services: Array<{ __typename?: 'Service', id: string, name: string }> };

export type ZonePriceNewQueryVariables = Exact<{ [key: string]: never; }>;


export type ZonePriceNewQuery = { __typename?: 'Query', fleets: { __typename?: 'FleetConnection', nodes: Array<{ __typename?: 'Fleet', id: string, name: string }> }, services: Array<{ __typename?: 'Service', id: string, name: string }> };

export type UpdateZonePriceMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  update: ZonePriceInput;
}>;


export type UpdateZonePriceMutation = { __typename?: 'Mutation', updateOneZonePrice: { __typename?: 'ZonePrice', id: string } };

export type CreateZonePriceMutationVariables = Exact<{
  input: ZonePriceInput;
}>;


export type CreateZonePriceMutation = { __typename?: 'Mutation', createOneZonePrice: { __typename?: 'ZonePrice', id: string } };

export type DeleteZonePriceMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteZonePriceMutation = { __typename?: 'Mutation', deleteOneZonePrice: { __typename?: 'ZonePriceDeleteResponse', id?: string | null } };

export type SetZonePriceRelationsMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  services: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
  fleets: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;


export type SetZonePriceRelationsMutation = { __typename?: 'Mutation', setServicesOnZonePrice: { __typename?: 'ZonePrice', id: string }, setFleetsOnZonePrice: { __typename?: 'ZonePrice', id: string } };

export type ZonePricesListQueryVariables = Exact<{
  paging?: InputMaybe<OffsetPaging>;
}>;


export type ZonePricesListQuery = { __typename?: 'Query', zonePrices: { __typename?: 'ZonePriceConnection', totalCount: number, nodes: Array<{ __typename?: 'ZonePrice', id: string, name: string }> } };

export type ViewAnnouncementQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ViewAnnouncementQuery = { __typename?: 'Query', announcement: { __typename?: 'Announcement', id: string, title: string, userType: Array<AnnouncementUserType>, description: string, url?: string | null, startAt: any, expireAt: any } };

export type CreateAnnouncementMutationVariables = Exact<{
  input: AnnouncementInput;
}>;


export type CreateAnnouncementMutation = { __typename?: 'Mutation', createOneAnnouncement: { __typename?: 'Announcement', id: string } };

export type UpdateAnnouncementMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: AnnouncementInput;
}>;


export type UpdateAnnouncementMutation = { __typename?: 'Mutation', updateOneAnnouncement: { __typename?: 'Announcement', id: string } };

export type DeleteAnnouncementMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteAnnouncementMutation = { __typename?: 'Mutation', deleteOneAnnouncement: { __typename?: 'AnnouncementDeleteResponse', id?: string | null } };

export type AnnouncementsListQueryVariables = Exact<{
  paging?: InputMaybe<OffsetPaging>;
}>;


export type AnnouncementsListQuery = { __typename?: 'Query', announcements: { __typename?: 'AnnouncementConnection', totalCount: number, nodes: Array<{ __typename?: 'Announcement', id: string, title: string, description: string, startAt: any, expireAt: any }> } };

export type ViewCouponQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ViewCouponQuery = { __typename?: 'Query', coupon: { __typename?: 'Coupon', id: string, isEnabled: boolean, code: string, title: string, description: string, manyUsersCanUse: number, manyTimesUserCanUse: number, minimumCost: number, maximumCost: number, startAt: any, expireAt: any, discountPercent: number, discountFlat: number, creditGift: number, isFirstTravelOnly: boolean, allowedServices: Array<{ __typename?: 'Service', id: string, name: string }> } };

export type CreateCouponMutationVariables = Exact<{
  input: CouponInput;
}>;


export type CreateCouponMutation = { __typename?: 'Mutation', createOneCoupon: { __typename?: 'Coupon', id: string } };

export type UpdateCouponMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: CouponInput;
}>;


export type UpdateCouponMutation = { __typename?: 'Mutation', updateOneCoupon: { __typename?: 'Coupon', id: string } };

export type DeleteCouponMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteCouponMutation = { __typename?: 'Mutation', deleteOneCoupon: { __typename?: 'CouponDeleteResponse', id?: string | null } };

export type CouponListQueryVariables = Exact<{
  paging?: InputMaybe<OffsetPaging>;
}>;


export type CouponListQuery = { __typename?: 'Query', coupons: { __typename?: 'CouponConnection', totalCount: number, nodes: Array<{ __typename?: 'Coupon', id: string, code: string, title: string, isEnabled: boolean, description: string, startAt: any, expireAt: any }> } };

export type GiftBatchListQueryVariables = Exact<{
  paging?: InputMaybe<OffsetPaging>;
}>;


export type GiftBatchListQuery = { __typename?: 'Query', giftBatches: { __typename?: 'GiftBatchConnection', totalCount: number, nodes: Array<{ __typename?: 'GiftBatch', id: string, name: string, currency: string, amount: number, availableFrom?: any | null, expireAt?: any | null, totalUsed: Array<{ __typename?: 'GiftBatchGiftCodesAggregateResponse', count?: { __typename?: 'GiftBatchGiftCodesCountAggregate', id?: number | null } | null }>, totalUnused: Array<{ __typename?: 'GiftBatchGiftCodesAggregateResponse', count?: { __typename?: 'GiftBatchGiftCodesCountAggregate', id?: number | null } | null }> }> } };

export type CreateGiftBachMutationVariables = Exact<{
  input: CreateGiftBatchInput;
}>;


export type CreateGiftBachMutation = { __typename?: 'Mutation', createGiftCardBatch: { __typename?: 'GiftBatch', id: string, name: string } };

export type ViewGiftBatchQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ViewGiftBatchQuery = { __typename?: 'Query', giftBatch: { __typename?: 'GiftBatch', id: string, name: string, amount: number, currency: string, availableFrom?: any | null, expireAt?: any | null, totalUsed: Array<{ __typename?: 'GiftBatchGiftCodesAggregateResponse', count?: { __typename?: 'GiftBatchGiftCodesCountAggregate', id?: number | null } | null }>, totalUnused: Array<{ __typename?: 'GiftBatchGiftCodesAggregateResponse', count?: { __typename?: 'GiftBatchGiftCodesCountAggregate', id?: number | null } | null }> } };

export type GiftCodeListQueryVariables = Exact<{
  giftBatchId: Scalars['ID']['input'];
  paging: OffsetPaging;
}>;


export type GiftCodeListQuery = { __typename?: 'Query', giftBatch: { __typename?: 'GiftBatch', giftCodes: { __typename?: 'GiftBatchGiftCodesConnection', totalCount: number, nodes: Array<{ __typename?: 'GiftCode', id: string, code: string, usedAt?: any | null, riderTransaction?: { __typename?: 'RiderTransaction', riderId: string, rider: { __typename?: 'Rider', firstName?: string | null, lastName?: string | null } } | null, driverTransaction?: { __typename?: 'DriverTransaction', driverId?: string | null, driver?: { __typename?: 'Driver', firstName?: string | null, lastName?: string | null } | null } | null }> } } };

export type ExportGiftBatchToCsvMutationVariables = Exact<{
  giftBatchId: Scalars['ID']['input'];
}>;


export type ExportGiftBatchToCsvMutation = { __typename?: 'Mutation', exportGiftCardBatch: string };

export type RewardListQueryVariables = Exact<{
  paging?: InputMaybe<OffsetPaging>;
}>;


export type RewardListQuery = { __typename?: 'Query', rewards: { __typename?: 'RewardConnection', totalCount: number, nodes: Array<{ __typename?: 'Reward', id: string, title: string, startDate?: any | null, endDate?: any | null, beneficiary: RewardBeneficiary, event: RewardEvent }> } };

export type ViewRewardQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ViewRewardQuery = { __typename?: 'Query', reward: { __typename?: 'Reward', id: string, title: string, startDate?: any | null, endDate?: any | null, appType: RewardAppType, beneficiary: RewardBeneficiary, event: RewardEvent, creditGift: number, tripFeePercentGift?: number | null, creditCurrency?: string | null, conditionTripCountsLessThan?: number | null, conditionUserNumberFirstDigits?: Array<string> | null } };

export type CreateRewardMutationVariables = Exact<{
  input: CreateReward;
}>;


export type CreateRewardMutation = { __typename?: 'Mutation', createOneReward: { __typename?: 'Reward', id: string } };

export type UpdateRewardMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateReward;
}>;


export type UpdateRewardMutation = { __typename?: 'Mutation', updateOneReward: { __typename?: 'Reward', id: string } };

export type CreatePayoutSessionFieldsQueryVariables = Exact<{ [key: string]: never; }>;


export type CreatePayoutSessionFieldsQuery = { __typename?: 'Query', supportedCurrencies: Array<string>, payoutMethods: { __typename?: 'PayoutMethodConnection', nodes: Array<{ __typename?: 'PayoutMethod', id: string, name: string }> } };

export type CreatePayoutSessionMutationVariables = Exact<{
  input: CreatePayoutSessionInput;
}>;


export type CreatePayoutSessionMutation = { __typename?: 'Mutation', createTaxiPayoutSession: { __typename?: 'TaxiPayoutSession', id: string } };

export type PayoutMethodsQueryVariables = Exact<{ [key: string]: never; }>;


export type PayoutMethodsQuery = { __typename?: 'Query', payoutMethods: { __typename?: 'PayoutMethodConnection', nodes: Array<{ __typename?: 'PayoutMethod', id: string, name: string, description?: string | null, type: PayoutMethodType, media?: { __typename?: 'Media', id: string, address: string } | null }> } };

export type ViewPayoutMethodQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ViewPayoutMethodQuery = { __typename?: 'Query', payoutMethod: { __typename?: 'PayoutMethod', id: string, name: string, currency: string, description?: string | null, type: PayoutMethodType, privateKey?: string | null, publicKey?: string | null, saltKey?: string | null, merchantId?: string | null, media?: { __typename?: 'Media', address: string } | null } };

export type CreatePayoutMethodMutationVariables = Exact<{
  input: CreatePayoutMethodInput;
}>;


export type CreatePayoutMethodMutation = { __typename?: 'Mutation', createOnePayoutMethod: { __typename?: 'PayoutMethod', id: string } };

export type UpdatePayoutMethodMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  update: CreatePayoutMethodInput;
}>;


export type UpdatePayoutMethodMutation = { __typename?: 'Mutation', updateOnePayoutMethod: { __typename?: 'PayoutMethod', id: string } };

export type PayoutsQueryVariables = Exact<{
  sessionsPaging: OffsetPaging;
  currency?: InputMaybe<Scalars['String']['input']>;
}>;


export type PayoutsQuery = { __typename?: 'Query', supportedCurrencies: Array<string>, taxiPayoutStatistics: { __typename?: 'PayoutStatistics', pendingAmount: number, lastPayoutAmount: number, currency: string, usersDefaultPayoutMethodStats: Array<{ __typename?: 'PayoutMethodStats', totalCount: number, payoutMethod?: { __typename?: 'PayoutMethod', id: string, name: string } | null }> }, taxiPayoutSessions: { __typename?: 'TaxiPayoutSessionConnection', totalCount: number, nodes: Array<{ __typename?: 'TaxiPayoutSession', id: string, createdAt: any, processedAt?: any | null, status: PayoutSessionStatus, totalAmount: number, currency: string }> } };

export type ViewPayoutSessionQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ViewPayoutSessionQuery = { __typename?: 'Query', taxiPayoutSession: { __typename?: 'TaxiPayoutSession', id: string, currency: string, createdAt: any, processedAt?: any | null, totalAmount: number, status: PayoutSessionStatus, payoutMethods: Array<{ __typename?: 'PayoutMethod', id: string, type: PayoutMethodType, name: string, description?: string | null, currency: string, balance?: number | null, media?: { __typename?: 'Media', address: string } | null }>, driverTransactions: { __typename?: 'TaxiPayoutSessionDriverTransactionsConnection', nodes: Array<{ __typename?: 'DriverTransaction', amount: number, currency: string, status: TransactionStatus, createdAt: any, driver?: { __typename?: 'Driver', firstName?: string | null, lastName?: string | null, media?: { __typename?: 'Media', address: string } | null } | null }> }, amountToBePaidByPayoutMethod: Array<{ __typename?: 'TaxiPayoutSessionDriverTransactionsAggregateResponse', groupBy?: { __typename?: 'TaxiPayoutSessionDriverTransactionsAggregateGroupBy', payoutMethodId?: string | null } | null, sum?: { __typename?: 'TaxiPayoutSessionDriverTransactionsSumAggregate', amount?: number | null } | null }>, unpaidAmount: Array<{ __typename?: 'TaxiPayoutSessionDriverTransactionsAggregateResponse', sum?: { __typename?: 'TaxiPayoutSessionDriverTransactionsSumAggregate', amount?: number | null } | null }>, paidAmount: Array<{ __typename?: 'TaxiPayoutSessionDriverTransactionsAggregateResponse', sum?: { __typename?: 'TaxiPayoutSessionDriverTransactionsSumAggregate', amount?: number | null } | null }> } };

export type PayoutSessionTransactionsQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  paging: OffsetPaging;
}>;


export type PayoutSessionTransactionsQuery = { __typename?: 'Query', taxiPayoutSession: { __typename?: 'TaxiPayoutSession', driverTransactions: { __typename?: 'TaxiPayoutSessionDriverTransactionsConnection', nodes: Array<{ __typename?: 'DriverTransaction', id: string, amount: number, currency: string, status: TransactionStatus, createdAt: any, driver?: { __typename?: 'Driver', firstName?: string | null, lastName?: string | null, media?: { __typename?: 'Media', address: string } | null, payoutAccounts: { __typename?: 'DriverPayoutAccountsConnection', nodes: Array<{ __typename?: 'PayoutAccount', id: string, name: string, type: SavedPaymentMethodType, accountNumber?: string | null, routingNumber?: string | null, bankName?: string | null, branchName?: string | null, accountHolderName?: string | null, accountHolderCountry?: string | null, accountHolderCity?: string | null, accountHolderState?: string | null, accountHolderZip?: string | null, accountHolderAddress?: string | null, accountHolderDateOfBirth?: any | null, payoutMethod: { __typename?: 'PayoutMethod', name: string, media?: { __typename?: 'Media', address: string } | null } }> } } | null }> } } };

export type ExportToCsvMutationVariables = Exact<{
  input: ExportSessionToCsvInput;
}>;


export type ExportToCsvMutation = { __typename?: 'Mutation', exportTaxiPayoutSessionToCsv: string };

export type RunAutoPayoutMutationVariables = Exact<{
  input: RunAutoPayoutInput;
}>;


export type RunAutoPayoutMutation = { __typename?: 'Mutation', runTaxiAutoPayout: boolean };

export type SaveManualPayoutItemMutationVariables = Exact<{
  input: ManualPayoutInput;
}>;


export type SaveManualPayoutItemMutation = { __typename?: 'Mutation', taxiManualPayout: { __typename?: 'DriverTransaction', amount: number } };

export type UpdatePayoutSessionMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  update: UpdatePayoutSessionInput;
}>;


export type UpdatePayoutSessionMutation = { __typename?: 'Mutation', updateOneTaxiPayoutSession: { __typename?: 'TaxiPayoutSession', id: string, status: PayoutSessionStatus } };

export type AvailableDriversForOrderQueryVariables = Exact<{
  center: PointInput;
  count: Scalars['Int']['input'];
}>;


export type AvailableDriversForOrderQuery = { __typename?: 'Query', getDriversLocationWithData: Array<{ __typename?: 'OnlineDriverWithData', id: string, mobileNumber: string, firstName?: string | null, lastName?: string | null, lastUpdatedAt: any, rating?: number | null, reviewCount: number, status: DriverStatus, location: { __typename?: 'Point', lat: number, lng: number } }> };

export type DriverSearchQueryVariables = Exact<{
  filter: Scalars['String']['input'];
}>;


export type DriverSearchQuery = { __typename?: 'Query', drivers: { __typename?: 'DriverConnection', nodes: Array<{ __typename?: 'Driver', id: string, mobileNumber: string, firstName?: string | null, lastName?: string | null, rating?: number | null, reviewCount: number, status: DriverStatus }> } };

export type AssignDriverToOrderMutationVariables = Exact<{
  orderId: Scalars['ID']['input'];
  driverId: Scalars['ID']['input'];
}>;


export type AssignDriverToOrderMutation = { __typename?: 'Mutation', assignDriverToOrder: { __typename?: 'Order', id: string } };

export type ViewOrderQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ViewOrderQuery = { __typename?: 'Query', order: { __typename?: 'Order', id: string, createdOn: any, expectedTimestamp?: any | null, costBest: number, costAfterCoupon: number, status: OrderStatus, currency: string, distanceBest: number, durationBest: number, startTimestamp?: any | null, finishTimestamp?: any | null, addresses: Array<string>, points: Array<{ __typename?: 'Point', lat: number, lng: number }>, service?: { __typename?: 'Service', name: string } | null, driver?: { __typename?: 'Driver', id: string, firstName?: string | null, lastName?: string | null, mobileNumber: string, registrationTimestamp: any, status: DriverStatus, media?: { __typename?: 'Media', address: string } | null } | null, rider?: { __typename?: 'Rider', id: string, firstName?: string | null, lastName?: string | null, mobileNumber: string, registrationTimestamp: any, status: RiderStatus, media?: { __typename?: 'Media', address: string } | null } | null, complaints: Array<{ __typename?: 'TaxiSupportRequest', id: string, subject: string, inscriptionTimestamp: any, content?: string | null, requestedByDriver: boolean }>, conversation: Array<{ __typename?: 'OrderMessage', sentAt: any, sentByDriver: boolean, status: MessageStatus, content: string }>, activities: Array<{ __typename?: 'RequestActivity', createdAt: any, type: RequestActivityType }>, coupon?: { __typename?: 'Coupon', title: string, code: string, expireAt: any } | null, riderTransactions: Array<{ __typename?: 'RiderTransaction', action: TransactionAction, rechargeType?: RiderRechargeTransactionType | null, deductType?: RiderDeductTransactionType | null, amount: number, status: TransactionStatus, currency: string, refrenceNumber?: string | null, paymentGateway?: { __typename?: 'PaymentGateway', title: string } | null }>, driverTransactions: Array<{ __typename?: 'DriverTransaction', action: TransactionAction, rechargeType?: DriverRechargeTransactionType | null, deductType?: DriverDeductTransactionType | null, amount: number, status: TransactionStatus, currency: string, refrenceNumber?: string | null }>, providerTransactions: Array<{ __typename?: 'ProviderTransaction', action: TransactionAction, rechargeType?: ProviderRechargeTransactionType | null, deductType?: ProviderDeductTransactionType | null, amount: number, currency: string, refrenceNumber?: string | null }>, fleetTransactions: Array<{ __typename?: 'FleetTransaction', action: TransactionAction, rechargeType?: ProviderRechargeTransactionType | null, deductType?: ProviderDeductTransactionType | null, amount: number, currency: string, refrenceNumber?: string | null }> } };

export type OrdersListQueryVariables = Exact<{
  paging?: InputMaybe<OffsetPaging>;
  filter?: InputMaybe<OrderFilter>;
  sorting?: InputMaybe<Array<OrderSort> | OrderSort>;
}>;


export type OrdersListQuery = { __typename?: 'Query', orders: { __typename?: 'OrderConnection', totalCount: number, nodes: Array<{ __typename?: 'Order', id: string, status: OrderStatus, createdOn: any, expectedTimestamp?: any | null, costAfterCoupon: number, currency: string }> } };

export type CreateRiderMutationVariables = Exact<{
  input: RiderInput;
}>;


export type CreateRiderMutation = { __typename?: 'Mutation', createOneRider: { __typename?: 'Rider', id: string, firstName?: string | null, lastName?: string | null, mobileNumber: string, gender?: Gender | null } };

export type ViewRiderQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ViewRiderQuery = { __typename?: 'Query', rider: { __typename?: 'Rider', id: string, status: RiderStatus, firstName?: string | null, lastName?: string | null, mobileNumber: string, isResident?: boolean | null, idNumber?: string | null, registrationTimestamp: any, email?: string | null, gender?: Gender | null, media?: { __typename?: 'Media', address: string } | null, wallet: Array<{ __typename?: 'RiderWallet', balance: number, currency: string }> } };

export type RiderAddressesQueryVariables = Exact<{
  riderId: Scalars['ID']['input'];
  paging?: InputMaybe<OffsetPaging>;
}>;


export type RiderAddressesQuery = { __typename?: 'Query', riderAddresses: { __typename?: 'RiderAddressConnection', nodes: Array<{ __typename?: 'RiderAddress', title: string, details?: string | null, location: { __typename?: 'Point', lat: number, lng: number } }> } };

export type RiderWalletQueryVariables = Exact<{
  riderId: Scalars['ID']['input'];
  paging?: InputMaybe<OffsetPaging>;
  filter?: InputMaybe<RiderTransactionFilter>;
  sorting?: InputMaybe<Array<RiderTransactionSort> | RiderTransactionSort>;
}>;


export type RiderWalletQuery = { __typename?: 'Query', rider: { __typename?: 'Rider', wallet: Array<{ __typename?: 'RiderWallet', balance: number, currency: string }>, transactions: { __typename?: 'RiderTransactionsConnection', totalCount: number, nodes: Array<{ __typename?: 'RiderTransaction', action: TransactionAction, deductType?: RiderDeductTransactionType | null, status: TransactionStatus, createdAt: any, rechargeType?: RiderRechargeTransactionType | null, amount: number, currency: string, refrenceNumber?: string | null, description?: string | null, paymentGatewayId?: string | null, operatorId?: string | null, requestId?: string | null }> } }, regions: { __typename?: 'RegionConnection', nodes: Array<{ __typename?: 'Region', currency: string }> } };

export type RiderOrdersQueryVariables = Exact<{
  riderId: Scalars['ID']['input'];
  filter?: InputMaybe<OrderFilter>;
  paging?: InputMaybe<OffsetPaging>;
  sorting?: InputMaybe<Array<OrderSort> | OrderSort>;
}>;


export type RiderOrdersQuery = { __typename?: 'Query', rider: { __typename?: 'Rider', orders: { __typename?: 'RiderOrdersConnection', totalCount: number, nodes: Array<{ __typename?: 'Order', id: string, createdOn: any, status: OrderStatus, distanceBest: number, durationBest: number, costBest: number, costAfterCoupon: number, currency: string, addresses: Array<string>, expectedTimestamp?: any | null, points: Array<{ __typename?: 'Point', lat: number, lng: number }> }> } } };

export type UpdateRiderMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  update: RiderInput;
}>;


export type UpdateRiderMutation = { __typename?: 'Mutation', updateOneRider: { __typename?: 'Rider', id: string } };

export type CreateRiderTransactionMutationVariables = Exact<{
  input: RiderTransactionInput;
}>;


export type CreateRiderTransactionMutation = { __typename?: 'Mutation', createRiderTransaction: { __typename?: 'RiderWallet', id: string } };

export type DeleteRiderMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteRiderMutation = { __typename?: 'Mutation', deleteOneRider: { __typename?: 'Rider', id: string } };

export type RidersListQueryVariables = Exact<{
  filter?: InputMaybe<RiderFilter>;
  paging?: InputMaybe<OffsetPaging>;
  sorting?: InputMaybe<Array<RiderSort> | RiderSort>;
}>;


export type RidersListQuery = { __typename?: 'Query', riders: { __typename?: 'RiderConnection', totalCount: number, nodes: Array<{ __typename?: 'Rider', id: string, firstName?: string | null, lastName?: string | null, status: RiderStatus, gender?: Gender | null, mobileNumber: string, registrationTimestamp: any }> } };

export type SosListQueryVariables = Exact<{
  paging?: InputMaybe<OffsetPaging>;
}>;


export type SosListQuery = { __typename?: 'Query', distressSignals: { __typename?: 'DistressSignalConnection', totalCount: number, nodes: Array<{ __typename?: 'DistressSignal', id: string, createdAt: any, status: SosStatus, location?: { __typename?: 'Point', lat: number, lng: number } | null }> } };

export type ViewSosQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ViewSosQuery = { __typename?: 'Query', distressSignal: { __typename?: 'DistressSignal', id: string, createdAt: any, status: SosStatus, submittedByRider: boolean, location?: { __typename?: 'Point', lat: number, lng: number } | null, activities: Array<{ __typename?: 'SOSActivity', action: SosActivityAction, createdAt: any, note?: string | null, operator: { __typename?: 'Operator', id: string, firstName?: string | null, lastName?: string | null } }>, order: { __typename?: 'Order', id: string, status: OrderStatus, createdOn: any, startTimestamp?: any | null, finishTimestamp?: any | null, expectedTimestamp?: any | null, costBest: number, costAfterCoupon: number, addresses: Array<string>, currency: string, rider?: { __typename?: 'Rider', id: string, mobileNumber: string, status: RiderStatus, firstName?: string | null, lastName?: string | null, registrationTimestamp: any } | null, driver?: { __typename?: 'Driver', id: string, mobileNumber: string, status: DriverStatus, firstName?: string | null, lastName?: string | null, registrationTimestamp: any } | null } } };

export type CreateSosActivityMutationVariables = Exact<{
  activity: CreateSosAcitivtyInput;
}>;


export type CreateSosActivityMutation = { __typename?: 'Mutation', createOneSOSActivity: { __typename?: 'SOSActivity', id: string } };

export type CurrentConfigurationQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentConfigurationQuery = { __typename?: 'Query', currentConfiguration: { __typename?: 'CurrentConfiguration', purchaseCode?: string | null, backendMapsAPIKey?: string | null, adminPanelAPIKey?: string | null, firebaseProjectPrivateKey?: string | null } };

export type UpdatePurchaseCodeMutationVariables = Exact<{
  code: Scalars['String']['input'];
  email?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdatePurchaseCodeMutation = { __typename?: 'Mutation', updatePurchaseCode: { __typename?: 'UpdatePurchaseCodeResult', status: UpdatePurchaseCodeStatus, message?: string | null, clients?: Array<{ __typename?: 'UpdatePurchaseCodeClient', ip: string }> | null } };

export type UpdateMapsApiKeyMutationVariables = Exact<{
  backend: Scalars['String']['input'];
  adminPanel: Scalars['String']['input'];
}>;


export type UpdateMapsApiKeyMutation = { __typename?: 'Mutation', updateMapsAPIKey: { __typename?: 'UpdateConfigResult', status: UpdateConfigStatus, message?: string | null } };

export type UpdateFirebaseMutationVariables = Exact<{
  keyFileName: Scalars['String']['input'];
}>;


export type UpdateFirebaseMutation = { __typename?: 'Mutation', updateFirebase: { __typename?: 'UpdateConfigResult', status: UpdateConfigStatus, message?: string | null } };

export type DisableServerMutationVariables = Exact<{
  ip: Scalars['String']['input'];
}>;


export type DisableServerMutation = { __typename?: 'Mutation', disablePreviousServer: { __typename?: 'UpdateConfigResult', status: UpdateConfigStatus, message?: string | null } };

export type LoginQueryVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginQuery = { __typename?: 'Query', login: { __typename?: 'TokenObject', token: string } };

export const DriverOverviewInfoFragmentDoc = gql`
    fragment DriverOverviewInfo on Driver {
  id
  firstName
  lastName
  mobileNumber
  status
}
    `;
export const DriverLocationFragmentDoc = gql`
    fragment DriverLocation on OnlineDriver {
  location {
    lat
    lng
  }
  driverId
  lastUpdatedAt
}
    `;
export const NotificationsDocument = gql`
    query Notifications {
  taxiSupportRequestAggregate(
    filter: {status: {in: [UnderInvestigation, Submitted]}}
  ) {
    count {
      id
    }
  }
  distressSignalAggregate(filter: {status: {in: [UnderReview, Submitted]}}) {
    count {
      id
    }
  }
  driverAggregate(filter: {status: {in: [PendingApproval]}}) {
    count {
      id
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class NotificationsGQL extends Apollo.Query<NotificationsQuery, NotificationsQueryVariables> {
    document = NotificationsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const SosSubscriptionDocument = gql`
    subscription SOSSubscription {
  sosCreated {
    id
    status
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SosSubscriptionGQL extends Apollo.Subscription<SosSubscriptionSubscription, SosSubscriptionSubscriptionVariables> {
    document = SosSubscriptionDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ComplaintSubscriptionDocument = gql`
    subscription ComplaintSubscription {
  complaintCreated {
    id
    status
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ComplaintSubscriptionGQL extends Apollo.Subscription<ComplaintSubscriptionSubscription, ComplaintSubscriptionSubscriptionVariables> {
    document = ComplaintSubscriptionDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ViewComplaintDocument = gql`
    query ViewComplaint($id: ID!) {
  complaint: taxiSupportRequest(id: $id) {
    id
    inscriptionTimestamp
    status
    subject
    content
    requestedByDriver
    activities {
      type
      comment
      actor {
        firstName
        lastName
      }
      assignedToStaffs {
        firstName
        lastName
      }
    }
    order {
      id
      status
      createdOn
      startTimestamp
      finishTimestamp
      expectedTimestamp
      costBest
      costAfterCoupon
      addresses
      currency
      rider {
        id
        mobileNumber
        status
        firstName
        lastName
        registrationTimestamp
      }
      driver {
        id
        mobileNumber
        status
        firstName
        lastName
        registrationTimestamp
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ViewComplaintGQL extends Apollo.Query<ViewComplaintQuery, ViewComplaintQueryVariables> {
    document = ViewComplaintDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateComplaintStatusDocument = gql`
    mutation UpdateComplaintStatus($id: ID!, $status: ComplaintStatus!) {
  updateOneTaxiSupportRequest(input: {id: $id, update: {status: $status}}) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateComplaintStatusGQL extends Apollo.Mutation<UpdateComplaintStatusMutation, UpdateComplaintStatusMutationVariables> {
    document = UpdateComplaintStatusDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ComplaintsListDocument = gql`
    query ComplaintsList($paging: OffsetPaging) {
  taxiSupportRequests(paging: $paging) {
    nodes {
      id
      inscriptionTimestamp
      subject
      status
      content
    }
    totalCount
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ComplaintsListGQL extends Apollo.Query<ComplaintsListQuery, ComplaintsListQueryVariables> {
    document = ComplaintsListDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateDriverDocument = gql`
    mutation CreateDriver($input: UpdateDriverInput!) {
  createOneDriver(input: {driver: $input}) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateDriverGQL extends Apollo.Mutation<CreateDriverMutation, CreateDriverMutationVariables> {
    document = CreateDriverDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ViewDriverDocument = gql`
    query ViewDriver($id: ID!) {
  driver(id: $id) {
    id
    firstName
    lastName
    mobileNumber
    registrationTimestamp
    lastSeenTimestamp
    status
    gender
    carId
    carColorId
    fleetId
    carProductionYear
    carPlate
    accountNumber
    bankName
    bankRoutingNumber
    bankSwift
    address
    email
    feedbacks {
      nodes {
        parametersAggregate {
          groupBy {
            title
            isGood
          }
          count {
            id
          }
        }
      }
    }
    enabledServices {
      serviceId
    }
    driverToDriverDocuments {
      id
      media {
        address
      }
    }
    mediaId
    media {
      address
    }
    rating
    reviewCount
  }
  services {
    id
    name
  }
  fleets {
    nodes {
      id
      name
    }
  }
  driverFeedbackParametersSummary(driverId: $id) {
    title
    isGood
    count
  }
  carModels(paging: {limit: 100}) {
    nodes {
      id
      name
    }
  }
  carColors {
    nodes {
      id
      name
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ViewDriverGQL extends Apollo.Query<ViewDriverQuery, ViewDriverQueryVariables> {
    document = ViewDriverDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateDriverProfileDocument = gql`
    mutation UpdateDriverProfile($id: ID!, $update: UpdateDriverInput!, $serviceIds: [ID!]!) {
  updateOneDriver(input: {id: $id, update: $update}) {
    id
  }
  setActivatedServicesOnDriver(input: {driverId: $id, serviceIds: $serviceIds})
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateDriverProfileGQL extends Apollo.Mutation<UpdateDriverProfileMutation, UpdateDriverProfileMutationVariables> {
    document = UpdateDriverProfileDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateDriverStatusDocument = gql`
    mutation UpdateDriverStatus($id: ID!, $status: DriverStatus) {
  updateOneDriver(input: {id: $id, update: {status: $status}}) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateDriverStatusGQL extends Apollo.Mutation<UpdateDriverStatusMutation, UpdateDriverStatusMutationVariables> {
    document = UpdateDriverStatusDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DriverFinancialsDocument = gql`
    query DriverFinancials($id: ID!, $paging: OffsetPaging, $filter: DriverTransactionFilter, $sorting: [DriverTransactionSort!]) {
  driver(id: $id) {
    transactions(filter: $filter, paging: $paging, sorting: $sorting) {
      nodes {
        status
        createdAt
        amount
        description
        currency
        action
        deductType
        rechargeType
        refrenceNumber
        requestId
        paymentGatewayId
        operatorId
      }
      totalCount
    }
    wallet {
      balance
      currency
    }
  }
  regions {
    nodes {
      currency
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DriverFinancialsGQL extends Apollo.Query<DriverFinancialsQuery, DriverFinancialsQueryVariables> {
    document = DriverFinancialsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DriverFeedbacksDocument = gql`
    query DriverFeedbacks($id: ID!, $paging: OffsetPaging) {
  feedbacks(filter: {driverId: {eq: $id}}, paging: $paging) {
    nodes {
      id
      requestId
      reviewTimestamp
      score
      description
      parameters {
        isGood
        title
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DriverFeedbacksGQL extends Apollo.Query<DriverFeedbacksQuery, DriverFeedbacksQueryVariables> {
    document = DriverFeedbacksDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DriverOrdersDocument = gql`
    query DriverOrders($driverId: ID!, $filter: OrderFilter, $paging: OffsetPaging, $sorting: [OrderSort!]) {
  driver(id: $driverId) {
    orders(filter: $filter, paging: $paging, sorting: $sorting) {
      nodes {
        id
        createdOn
        status
        distanceBest
        durationBest
        costBest
        costAfterCoupon
        currency
        addresses
        points {
          lat
          lng
        }
        expectedTimestamp
      }
      totalCount
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DriverOrdersGQL extends Apollo.Query<DriverOrdersQuery, DriverOrdersQueryVariables> {
    document = DriverOrdersDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateDriverTransactionDocument = gql`
    mutation CreateDriverTransaction($input: DriverTransactionInput!) {
  createDriverTransaction(input: $input) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateDriverTransactionGQL extends Apollo.Mutation<CreateDriverTransactionMutation, CreateDriverTransactionMutationVariables> {
    document = CreateDriverTransactionDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteDriverDocument = gql`
    mutation DeleteDriver($id: ID!) {
  deleteOneDriver(id: $id) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteDriverGQL extends Apollo.Mutation<DeleteDriverMutation, DeleteDriverMutationVariables> {
    document = DeleteDriverDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DriversListDocument = gql`
    query DriversList($paging: OffsetPaging, $filter: DriverFilter, $sorting: [DriverSort!]) {
  drivers(paging: $paging, filter: $filter, sorting: $sorting) {
    nodes {
      id
      firstName
      lastName
      gender
      mobileNumber
      status
      registrationTimestamp
    }
    totalCount
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DriversListGQL extends Apollo.Query<DriversListQuery, DriversListQueryVariables> {
    document = DriversListDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ProviderWalletsListDocument = gql`
    query ProviderWalletsList($paging: OffsetPaging) {
  providerTransactions(paging: $paging) {
    nodes {
      createdAt
      action
      deductType
      rechargeType
      amount
      currency
      description
      requestId
      operatorId
    }
    totalCount
  }
  providerWallets {
    balance
    currency
  }
  regions {
    nodes {
      currency
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ProviderWalletsListGQL extends Apollo.Query<ProviderWalletsListQuery, ProviderWalletsListQueryVariables> {
    document = ProviderWalletsListDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ExportDocument = gql`
    query Export($input: ExportArgs!) {
  export(input: $input) {
    url
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ExportGQL extends Apollo.Query<ExportQuery, ExportQueryVariables> {
    document = ExportDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DriverWalletsListDocument = gql`
    query DriverWalletsList($paging: OffsetPaging) {
  driverWallets(paging: $paging) {
    nodes {
      id
      driverId
      balance
      currency
      driver {
        firstName
        lastName
      }
    }
    totalCount
  }
  regions {
    nodes {
      currency
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DriverWalletsListGQL extends Apollo.Query<DriverWalletsListQuery, DriverWalletsListQueryVariables> {
    document = DriverWalletsListDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const FleetWalletsListDocument = gql`
    query FleetWalletsList($paging: OffsetPaging, $filter: FleetWalletFilter) {
  fleetWallets(paging: $paging, filter: $filter) {
    nodes {
      id
      balance
      currency
      fleetId
      fleet {
        name
      }
    }
    totalCount
  }
  regions {
    nodes {
      currency
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class FleetWalletsListGQL extends Apollo.Query<FleetWalletsListQuery, FleetWalletsListQueryVariables> {
    document = FleetWalletsListDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RiderWalletsListDocument = gql`
    query RiderWalletsList($paging: OffsetPaging) {
  riderWallets(paging: $paging) {
    nodes {
      balance
      currency
      riderId
      rider {
        firstName
        lastName
      }
    }
    totalCount
  }
  regions {
    nodes {
      currency
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RiderWalletsListGQL extends Apollo.Query<RiderWalletsListQuery, RiderWalletsListQueryVariables> {
    document = RiderWalletsListDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DispatcherCalculateFareDocument = gql`
    query DispatcherCalculateFare($points: [PointInput!]!, $riderId: ID!) {
  calculateFare(input: {points: $points, riderId: $riderId, orderType: Ride}) {
    currency
    distance
    duration
    services {
      name
      services {
        id
        name
        cost
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DispatcherCalculateFareGQL extends Apollo.Query<DispatcherCalculateFareQuery, DispatcherCalculateFareQueryVariables> {
    document = DispatcherCalculateFareDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateOrderDocument = gql`
    mutation CreateOrder($riderId: ID!, $points: [PointInput!]!, $addresses: [String!]!, $serviceId: ID!, $intervalMinutes: Int!) {
  createOrder(
    input: {points: $points, serviceId: $serviceId, addresses: $addresses, intervalMinutes: $intervalMinutes, riderId: $riderId}
  ) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateOrderGQL extends Apollo.Mutation<CreateOrderMutation, CreateOrderMutationVariables> {
    document = CreateOrderDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const OrderUpdatedDocument = gql`
    subscription OrderUpdated($id: ID!) {
  orderUpdated(orderId: $id) {
    id
    status
    driver {
      firstName
      lastName
      mobileNumber
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class OrderUpdatedGQL extends Apollo.Subscription<OrderUpdatedSubscription, OrderUpdatedSubscriptionVariables> {
    document = OrderUpdatedDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CancelOrderDocument = gql`
    mutation CancelOrder($orderId: ID!) {
  cancelOrder(orderId: $orderId) {
    id
    status
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CancelOrderGQL extends Apollo.Mutation<CancelOrderMutation, CancelOrderMutationVariables> {
    document = CancelOrderDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const OverviewDocument = gql`
    query Overview {
  taxiSupportRequestAggregate(
    filter: {status: {in: [Submitted, UnderInvestigation]}}
  ) {
    count {
      id
    }
  }
  driverAggregate(filter: {status: {eq: PendingApproval}}) {
    count {
      id
    }
  }
  activeOrders: orderAggregate(
    filter: {status: {in: [DriverAccepted, Arrived, Started, WaitingForPostPay]}}
  ) {
    count {
      id
    }
  }
  bookedOrders: orderAggregate(filter: {status: {eq: Booked}}) {
    count {
      id
    }
  }
  getDriversLocation(center: {lat: 45, lng: 45}, count: 150) {
    ...DriverLocation
  }
}
    ${DriverLocationFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class OverviewGQL extends Apollo.Query<OverviewQuery, OverviewQueryVariables> {
    document = OverviewDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const OverviewDriverPagingDocument = gql`
    query OverviewDriverPaging($ids: [ID!]!) {
  drivers(filter: {id: {in: $ids}}) {
    nodes {
      ...DriverOverviewInfo
    }
    totalCount
  }
}
    ${DriverOverviewInfoFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class OverviewDriverPagingGQL extends Apollo.Query<OverviewDriverPagingQuery, OverviewDriverPagingQueryVariables> {
    document = OverviewDriverPagingDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RequestsChartDocument = gql`
    query RequestsChart($timeframe: ChartTimeframe!) {
  requestChart(timeframe: $timeframe) {
    time
    count
    status
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RequestsChartGQL extends Apollo.Query<RequestsChartQuery, RequestsChartQueryVariables> {
    document = RequestsChartDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const IncomeChartDocument = gql`
    query IncomeChart($timeframe: ChartTimeframe!) {
  incomeChart(timeframe: $timeframe) {
    time
    sum
    currency
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class IncomeChartGQL extends Apollo.Query<IncomeChartQuery, IncomeChartQueryVariables> {
    document = IncomeChartDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DriverRegistrationsDocument = gql`
    query DriverRegistrations($timeframe: ChartTimeframe!) {
  driverRegistrations(timeframe: $timeframe) {
    time
    count
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DriverRegistrationsGQL extends Apollo.Query<DriverRegistrationsQuery, DriverRegistrationsQueryVariables> {
    document = DriverRegistrationsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RiderRegistrationsDocument = gql`
    query RiderRegistrations($timeframe: ChartTimeframe!) {
  riderRegistrations(timeframe: $timeframe) {
    time
    count
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RiderRegistrationsGQL extends Apollo.Query<RiderRegistrationsQuery, RiderRegistrationsQueryVariables> {
    document = RiderRegistrationsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CarsListDocument = gql`
    query CarsList {
  carModels(paging: {limit: 100}) {
    nodes {
      id
      name
    }
  }
  carColors {
    nodes {
      id
      name
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CarsListGQL extends Apollo.Query<CarsListQuery, CarsListQueryVariables> {
    document = CarsListDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteCarModelDocument = gql`
    mutation DeleteCarModel($id: ID!) {
  deleteOneCarModel(input: {id: $id}) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteCarModelGQL extends Apollo.Mutation<DeleteCarModelMutation, DeleteCarModelMutationVariables> {
    document = DeleteCarModelDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteCarColorDocument = gql`
    mutation DeleteCarColor($id: ID!) {
  deleteOneCarColor(input: {id: $id}) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteCarColorGQL extends Apollo.Mutation<DeleteCarColorMutation, DeleteCarColorMutationVariables> {
    document = DeleteCarColorDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateCarModelDocument = gql`
    mutation CreateCarModel($input: CarModelInput!) {
  createOneCarModel(input: {carModel: $input}) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateCarModelGQL extends Apollo.Mutation<CreateCarModelMutation, CreateCarModelMutationVariables> {
    document = CreateCarModelDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateCarColorDocument = gql`
    mutation CreateCarColor($input: CarColorInput!) {
  createOneCarColor(input: {carColor: $input}) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateCarColorGQL extends Apollo.Mutation<CreateCarColorMutation, CreateCarColorMutationVariables> {
    document = CreateCarColorDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateCarModelDocument = gql`
    mutation UpdateCarModel($id: ID!, $input: CarModelInput!) {
  updateOneCarModel(input: {id: $id, update: $input}) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateCarModelGQL extends Apollo.Mutation<UpdateCarModelMutation, UpdateCarModelMutationVariables> {
    document = UpdateCarModelDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateCarColorDocument = gql`
    mutation UpdateCarColor($id: ID!, $input: CarColorInput!) {
  updateOneCarColor(input: {id: $id, update: $input}) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateCarColorGQL extends Apollo.Mutation<UpdateCarColorMutation, UpdateCarColorMutationVariables> {
    document = UpdateCarColorDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateFleetDocument = gql`
    mutation CreateFleet($input: CreateFleetInput!) {
  createOneFleet(input: {fleet: $input}) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateFleetGQL extends Apollo.Mutation<CreateFleetMutation, CreateFleetMutationVariables> {
    document = CreateFleetDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ViewFleetDocument = gql`
    query ViewFleet($id: ID!) {
  fleet(id: $id) {
    id
    name
    phoneNumber
    address
    mobileNumber
    accountNumber
    userName
    password
    commissionSharePercent
    commissionShareFlat
    feeMultiplier
    exclusivityAreas {
      lat
      lng
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ViewFleetGQL extends Apollo.Query<ViewFleetQuery, ViewFleetQueryVariables> {
    document = ViewFleetDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const FleetFinancialsDocument = gql`
    query FleetFinancials($id: ID!, $paging: OffsetPaging, $filter: FleetTransactionFilter, $sorting: [FleetTransactionSort!]) {
  fleet(id: $id) {
    transactions(paging: $paging, filter: $filter, sorting: $sorting) {
      nodes {
        transactionTimestamp
        amount
        currency
        action
        deductType
        rechargeType
        refrenceNumber
        operatorId
        requestId
        description
      }
      totalCount
    }
    wallet {
      currency
      balance
    }
  }
  regions {
    nodes {
      currency
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class FleetFinancialsGQL extends Apollo.Query<FleetFinancialsQuery, FleetFinancialsQueryVariables> {
    document = FleetFinancialsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const FleetZonePricesDocument = gql`
    query FleetZonePrices($id: ID!, $paging: OffsetPaging, $filter: ZonePriceFilter, $sorting: [ZonePriceSort!]) {
  fleet(id: $id) {
    zonePrices(paging: $paging, filter: $filter, sorting: $sorting) {
      nodes {
        id
        name
      }
      totalCount
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class FleetZonePricesGQL extends Apollo.Query<FleetZonePricesQuery, FleetZonePricesQueryVariables> {
    document = FleetZonePricesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const FleetDriversDocument = gql`
    query FleetDrivers($id: ID!, $paging: OffsetPaging) {
  drivers(filter: {fleetId: {eq: $id}}, paging: $paging) {
    nodes {
      id
      firstName
      lastName
      mobileNumber
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class FleetDriversGQL extends Apollo.Query<FleetDriversQuery, FleetDriversQueryVariables> {
    document = FleetDriversDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateFleetDocument = gql`
    mutation UpdateFleet($id: ID!, $update: UpdateFleetInput!) {
  updateOneFleet(input: {id: $id, update: $update}) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateFleetGQL extends Apollo.Mutation<UpdateFleetMutation, UpdateFleetMutationVariables> {
    document = UpdateFleetDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateFleetTransactionDocument = gql`
    mutation CreateFleetTransaction($input: FleetTransactionInput!) {
  createFleetTransaction(input: $input) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateFleetTransactionGQL extends Apollo.Mutation<CreateFleetTransactionMutation, CreateFleetTransactionMutationVariables> {
    document = CreateFleetTransactionDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const FleetsListDocument = gql`
    query FleetsList($paging: OffsetPaging, $filter: FleetFilter) {
  fleets(paging: $paging, filter: $filter) {
    nodes {
      id
      name
      phoneNumber
      address
    }
    totalCount
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class FleetsListGQL extends Apollo.Query<FleetsListQuery, FleetsListQueryVariables> {
    document = FleetsListDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const OrderCancelReasonListDocument = gql`
    query OrderCancelReasonList($paging: OffsetPaging) {
  orderCancelReasons(paging: $paging) {
    nodes {
      id
      title
      isEnabled
      userType
    }
    totalCount
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class OrderCancelReasonListGQL extends Apollo.Query<OrderCancelReasonListQuery, OrderCancelReasonListQueryVariables> {
    document = OrderCancelReasonListDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const OrderCancelReasonViewDocument = gql`
    query OrderCancelReasonView($id: ID!) {
  orderCancelReason(id: $id) {
    id
    title
    userType
    isEnabled
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class OrderCancelReasonViewGQL extends Apollo.Query<OrderCancelReasonViewQuery, OrderCancelReasonViewQueryVariables> {
    document = OrderCancelReasonViewDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateOrderCancelReasonDocument = gql`
    mutation UpdateOrderCancelReason($id: ID!, $update: OrderCancelReasonInput!) {
  updateOneOrderCancelReason(input: {id: $id, update: $update}) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateOrderCancelReasonGQL extends Apollo.Mutation<UpdateOrderCancelReasonMutation, UpdateOrderCancelReasonMutationVariables> {
    document = UpdateOrderCancelReasonDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateOrderCancelReasonDocument = gql`
    mutation CreateOrderCancelReason($input: OrderCancelReasonInput!) {
  createOneOrderCancelReason(input: {orderCancelReason: $input}) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateOrderCancelReasonGQL extends Apollo.Mutation<CreateOrderCancelReasonMutation, CreateOrderCancelReasonMutationVariables> {
    document = CreateOrderCancelReasonDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ViewPaymentGatewayDocument = gql`
    query ViewPaymentGateway($id: ID!) {
  paymentGateway(id: $id) {
    id
    title
    type
    enabled
    privateKey
    publicKey
    merchantId
    saltKey
    mediaId
    media {
      address
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ViewPaymentGatewayGQL extends Apollo.Query<ViewPaymentGatewayQuery, ViewPaymentGatewayQueryVariables> {
    document = ViewPaymentGatewayDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreatePaymentGatewayDocument = gql`
    mutation CreatePaymentGateway($input: CreatePaymentGatewayInput!) {
  createOnePaymentGateway(input: {paymentGateway: $input}) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreatePaymentGatewayGQL extends Apollo.Mutation<CreatePaymentGatewayMutation, CreatePaymentGatewayMutationVariables> {
    document = CreatePaymentGatewayDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdatePaymentGatewayDocument = gql`
    mutation UpdatePaymentGateway($id: ID!, $input: UpdatePaymentGatewayInput!) {
  updateOnePaymentGateway(input: {id: $id, update: $input}) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdatePaymentGatewayGQL extends Apollo.Mutation<UpdatePaymentGatewayMutation, UpdatePaymentGatewayMutationVariables> {
    document = UpdatePaymentGatewayDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const PaymentGatewaysDocument = gql`
    query PaymentGateways($paging: OffsetPaging) {
  paymentGateways(paging: $paging) {
    nodes {
      id
      enabled
      title
      type
      media {
        address
      }
    }
    totalCount
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class PaymentGatewaysGQL extends Apollo.Query<PaymentGatewaysQuery, PaymentGatewaysQueryVariables> {
    document = PaymentGatewaysDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RegionListDocument = gql`
    query RegionList($paging: OffsetPaging) {
  regions(paging: $paging) {
    nodes {
      id
      name
      currency
      enabled
      location {
        lat
        lng
      }
    }
    totalCount
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RegionListGQL extends Apollo.Query<RegionListQuery, RegionListQueryVariables> {
    document = RegionListDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RegionViewDocument = gql`
    query RegionView($id: ID!) {
  region(id: $id) {
    id
    name
    currency
    enabled
    location {
      lat
      lng
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RegionViewGQL extends Apollo.Query<RegionViewQuery, RegionViewQueryVariables> {
    document = RegionViewDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateRegionDocument = gql`
    mutation UpdateRegion($id: ID!, $update: UpdateRegionInput!) {
  updateOneRegion(input: {id: $id, update: $update}) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateRegionGQL extends Apollo.Mutation<UpdateRegionMutation, UpdateRegionMutationVariables> {
    document = UpdateRegionDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateRegionDocument = gql`
    mutation CreateRegion($input: CreateRegionInput!) {
  createOneRegion(input: {region: $input}) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateRegionGQL extends Apollo.Mutation<CreateRegionMutation, CreateRegionMutationVariables> {
    document = CreateRegionDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ReviewParameterViewDocument = gql`
    query ReviewParameterView($id: ID!) {
  feedbackParameter(id: $id) {
    id
    title
    isGood
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ReviewParameterViewGQL extends Apollo.Query<ReviewParameterViewQuery, ReviewParameterViewQueryVariables> {
    document = ReviewParameterViewDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateReviewParameterDocument = gql`
    mutation UpdateReviewParameter($id: ID!, $update: FeedbackParameterInput!) {
  updateOneFeedbackParameter(input: {id: $id, update: $update}) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateReviewParameterGQL extends Apollo.Mutation<UpdateReviewParameterMutation, UpdateReviewParameterMutationVariables> {
    document = UpdateReviewParameterDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateReviewParameterDocument = gql`
    mutation CreateReviewParameter($input: FeedbackParameterInput!) {
  createOneFeedbackParameter(input: {feedbackParameter: $input}) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateReviewParameterGQL extends Apollo.Mutation<CreateReviewParameterMutation, CreateReviewParameterMutationVariables> {
    document = CreateReviewParameterDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ReviewParametersListDocument = gql`
    query ReviewParametersList {
  feedbackParameters {
    id
    title
    isGood
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ReviewParametersListGQL extends Apollo.Query<ReviewParametersListQuery, ReviewParametersListQueryVariables> {
    document = ReviewParametersListDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RolesDocument = gql`
    query Roles {
  operatorRoles {
    id
    title
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RolesGQL extends Apollo.Query<RolesQuery, RolesQueryVariables> {
    document = RolesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RoleDocument = gql`
    query Role($id: ID!) {
  operatorRole(id: $id) {
    id
    title
    permissions
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RoleGQL extends Apollo.Query<RoleQuery, RoleQueryVariables> {
    document = RoleDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateRoleDocument = gql`
    mutation CreateRole($input: OperatorRoleInput!) {
  createOneOperatorRole(input: {operatorRole: $input}) {
    id
    title
    permissions
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateRoleGQL extends Apollo.Mutation<CreateRoleMutation, CreateRoleMutationVariables> {
    document = CreateRoleDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateRoleDocument = gql`
    mutation UpdateRole($id: ID!, $input: OperatorRoleInput!) {
  updateOneOperatorRole(input: {id: $id, update: $input}) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateRoleGQL extends Apollo.Mutation<UpdateRoleMutation, UpdateRoleMutationVariables> {
    document = UpdateRoleDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ServiceOptionViewDocument = gql`
    query ServiceOptionView($id: ID!) {
  serviceOption(id: $id) {
    id
    name
    type
    icon
    additionalFee
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ServiceOptionViewGQL extends Apollo.Query<ServiceOptionViewQuery, ServiceOptionViewQueryVariables> {
    document = ServiceOptionViewDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateServiceOptionDocument = gql`
    mutation UpdateServiceOption($id: ID!, $update: ServiceOptionInput!) {
  updateOneServiceOption(input: {id: $id, update: $update}) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateServiceOptionGQL extends Apollo.Mutation<UpdateServiceOptionMutation, UpdateServiceOptionMutationVariables> {
    document = UpdateServiceOptionDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateServiceOptionDocument = gql`
    mutation CreateServiceOption($input: ServiceOptionInput!) {
  createOneServiceOption(input: {serviceOption: $input}) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateServiceOptionGQL extends Apollo.Mutation<CreateServiceOptionMutation, CreateServiceOptionMutationVariables> {
    document = CreateServiceOptionDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ServiceOptionsListDocument = gql`
    query ServiceOptionsList {
  serviceOptions {
    id
    name
    icon
    type
    additionalFee
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ServiceOptionsListGQL extends Apollo.Query<ServiceOptionsListQuery, ServiceOptionsListQueryVariables> {
    document = ServiceOptionsListDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ViewServiceCategoryDocument = gql`
    query ViewServiceCategory($id: ID!) {
  serviceCategory(id: $id) {
    id
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ViewServiceCategoryGQL extends Apollo.Query<ViewServiceCategoryQuery, ViewServiceCategoryQueryVariables> {
    document = ViewServiceCategoryDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateServiceCategoryDocument = gql`
    mutation CreateServiceCategory($input: ServiceCategoryInput!) {
  createOneServiceCategory(input: {serviceCategory: $input}) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateServiceCategoryGQL extends Apollo.Mutation<CreateServiceCategoryMutation, CreateServiceCategoryMutationVariables> {
    document = CreateServiceCategoryDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateServiceCategoryDocument = gql`
    mutation UpdateServiceCategory($id: ID!, $input: ServiceCategoryInput!) {
  updateOneServiceCategory(input: {id: $id, update: $input}) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateServiceCategoryGQL extends Apollo.Mutation<UpdateServiceCategoryMutation, UpdateServiceCategoryMutationVariables> {
    document = UpdateServiceCategoryDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteServiceCategoryDocument = gql`
    mutation DeleteServiceCategory($id: ID!) {
  deleteOneServiceCategory(input: {id: $id}) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteServiceCategoryGQL extends Apollo.Mutation<DeleteServiceCategoryMutation, DeleteServiceCategoryMutationVariables> {
    document = DeleteServiceCategoryDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ServicesListDocument = gql`
    query ServicesList {
  serviceCategories {
    id
    name
    services {
      id
      name
      description
      media {
        address
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ServicesListGQL extends Apollo.Query<ServicesListQuery, ServicesListQueryVariables> {
    document = ServicesListDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ViewServiceDocument = gql`
    query ViewService($id: ID!) {
  service(id: $id) {
    id
    name
    categoryId
    baseFare
    perHundredMeters
    perMinuteDrive
    perMinuteWait
    minimumFee
    searchRadius
    maximumDestinationDistance
    paymentMethod
    cancellationTotalFee
    cancellationDriverShare
    providerShareFlat
    providerSharePercent
    prepayPercent
    searchRadius
    mediaId
    description
    personCapacity
    roundingFactor
    media {
      address
    }
    timeMultipliers {
      startTime
      endTime
      multiply
    }
    distanceMultipliers {
      distanceFrom
      distanceTo
      multiply
    }
    weekdayMultipliers {
      weekday
      multiply
    }
    dateRangeMultipliers {
      startDate
      endDate
      multiply
    }
    options {
      id
      name
      type
      additionalFee
      icon
    }
    regions {
      id
      name
      currency
    }
  }
  regions {
    nodes {
      id
      name
      currency
    }
  }
  serviceCategories {
    id
    name
  }
  serviceOptions {
    id
    name
    icon
    type
    additionalFee
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ViewServiceGQL extends Apollo.Query<ViewServiceQuery, ViewServiceQueryVariables> {
    document = ViewServiceDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const NewServiceDocument = gql`
    query NewService {
  regions {
    nodes {
      id
      name
      currency
    }
  }
  serviceCategories {
    id
    name
  }
  serviceOptions {
    id
    name
    icon
    type
    additionalFee
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class NewServiceGQL extends Apollo.Query<NewServiceQuery, NewServiceQueryVariables> {
    document = NewServiceDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateServiceDocument = gql`
    mutation CreateService($input: ServiceInput!) {
  createOneService(input: {service: $input}) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateServiceGQL extends Apollo.Mutation<CreateServiceMutation, CreateServiceMutationVariables> {
    document = CreateServiceDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteServiceDocument = gql`
    mutation DeleteService($id: ID!) {
  deleteOneService(input: {id: $id}) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteServiceGQL extends Apollo.Mutation<DeleteServiceMutation, DeleteServiceMutationVariables> {
    document = DeleteServiceDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateServiceDocument = gql`
    mutation UpdateService($id: ID!, $input: ServiceInput!) {
  updateOneService(input: {id: $id, update: $input}) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateServiceGQL extends Apollo.Mutation<UpdateServiceMutation, UpdateServiceMutationVariables> {
    document = UpdateServiceDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const SetRegionsOnServiceDocument = gql`
    mutation SetRegionsOnService($id: ID!, $relationIds: [ID!]!) {
  setRegionsOnService(input: {id: $id, relationIds: $relationIds}) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SetRegionsOnServiceGQL extends Apollo.Mutation<SetRegionsOnServiceMutation, SetRegionsOnServiceMutationVariables> {
    document = SetRegionsOnServiceDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const SetOptionsOnServiceDocument = gql`
    mutation SetOptionsOnService($id: ID!, $relationIds: [ID!]!) {
  setOptionsOnService(input: {id: $id, relationIds: $relationIds}) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SetOptionsOnServiceGQL extends Apollo.Mutation<SetOptionsOnServiceMutation, SetOptionsOnServiceMutationVariables> {
    document = SetOptionsOnServiceDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdatePasswordDocument = gql`
    mutation UpdatePassword($input: UpdatePasswordInput!) {
  updatePassword(input: $input) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdatePasswordGQL extends Apollo.Mutation<UpdatePasswordMutation, UpdatePasswordMutationVariables> {
    document = UpdatePasswordDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetConfigurationDocument = gql`
    query GetConfiguration {
  currentConfiguration {
    backendMapsAPIKey
    adminPanelAPIKey
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetConfigurationGQL extends Apollo.Query<GetConfigurationQuery, GetConfigurationQueryVariables> {
    document = GetConfigurationDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateConfigDocument = gql`
    mutation UpdateConfig($input: UpdateConfigInput!) {
  saveConfiguration(input: $input) {
    backendMapsAPIKey
    adminPanelAPIKey
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateConfigGQL extends Apollo.Mutation<UpdateConfigMutation, UpdateConfigMutationVariables> {
    document = UpdateConfigDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const SmsProvidersDocument = gql`
    query SMSProviders($paging: OffsetPaging) {
  smsProviders(paging: $paging) {
    nodes {
      id
      isDefault
      name
      type
    }
    totalCount
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SmsProvidersGQL extends Apollo.Query<SmsProvidersQuery, SmsProvidersQueryVariables> {
    document = SmsProvidersDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ViewSmsProviderDocument = gql`
    query ViewSMSProvider($id: ID!) {
  smsProvider(id: $id) {
    id
    name
    type
    isDefault
    authToken
    accountId
    fromNumber
    verificationTemplate
    smsType
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ViewSmsProviderGQL extends Apollo.Query<ViewSmsProviderQuery, ViewSmsProviderQueryVariables> {
    document = ViewSmsProviderDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateSmsProviderDocument = gql`
    mutation CreateSMSProvider($input: SMSProviderInput!) {
  createOneSMSProvider(input: {sMSProvider: $input}) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateSmsProviderGQL extends Apollo.Mutation<CreateSmsProviderMutation, CreateSmsProviderMutationVariables> {
    document = CreateSmsProviderDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateSmsProviderDocument = gql`
    mutation UpdateSMSProvider($id: ID!, $input: SMSProviderInput!) {
  updateOneSMSProvider(input: {id: $id, update: $input}) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateSmsProviderGQL extends Apollo.Mutation<UpdateSmsProviderMutation, UpdateSmsProviderMutationVariables> {
    document = UpdateSmsProviderDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const MarkSmsProviderAsDefaultDocument = gql`
    mutation MarkSMSProviderAsDefault($id: ID!) {
  markSMSProviderAsDefault(id: $id) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class MarkSmsProviderAsDefaultGQL extends Apollo.Mutation<MarkSmsProviderAsDefaultMutation, MarkSmsProviderAsDefaultMutationVariables> {
    document = MarkSmsProviderAsDefaultDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateOperatorDocument = gql`
    mutation CreateOperator($input: CreateOperatorInput!) {
  createOneOperator(input: {operator: $input}) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateOperatorGQL extends Apollo.Mutation<CreateOperatorMutation, CreateOperatorMutationVariables> {
    document = CreateOperatorDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ViewOperatorDocument = gql`
    query ViewOperator($id: ID!) {
  operator(id: $id) {
    id
    firstName
    lastName
    mobileNumber
    userName
    email
    roleId
  }
  operatorRoles {
    id
    title
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ViewOperatorGQL extends Apollo.Query<ViewOperatorQuery, ViewOperatorQueryVariables> {
    document = ViewOperatorDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const NewOperatorDocument = gql`
    query NewOperator {
  operatorRoles {
    id
    title
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class NewOperatorGQL extends Apollo.Query<NewOperatorQuery, NewOperatorQueryVariables> {
    document = NewOperatorDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateOperatorDocument = gql`
    mutation UpdateOperator($id: ID!, $update: UpdateOperatorInput!) {
  updateOneOperator(input: {id: $id, update: $update}) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateOperatorGQL extends Apollo.Mutation<UpdateOperatorMutation, UpdateOperatorMutationVariables> {
    document = UpdateOperatorDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UsersListDocument = gql`
    query UsersList($paging: OffsetPaging) {
  operators(paging: $paging) {
    nodes {
      id
      userName
      firstName
      lastName
      role {
        title
      }
    }
    totalCount
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UsersListGQL extends Apollo.Query<UsersListQuery, UsersListQueryVariables> {
    document = UsersListDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ZonePriceViewDocument = gql`
    query ZonePriceView($id: ID!) {
  zonePrice(id: $id) {
    id
    name
    from {
      lat
      lng
    }
    to {
      lat
      lng
    }
    cost
    services {
      id
    }
    fleets {
      id
    }
    timeMultipliers {
      startTime
      endTime
      multiply
    }
  }
  fleets(paging: {limit: 50}) {
    nodes {
      id
      name
    }
  }
  services {
    id
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ZonePriceViewGQL extends Apollo.Query<ZonePriceViewQuery, ZonePriceViewQueryVariables> {
    document = ZonePriceViewDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ZonePriceNewDocument = gql`
    query ZonePriceNew {
  fleets(paging: {limit: 50}) {
    nodes {
      id
      name
    }
  }
  services {
    id
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ZonePriceNewGQL extends Apollo.Query<ZonePriceNewQuery, ZonePriceNewQueryVariables> {
    document = ZonePriceNewDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateZonePriceDocument = gql`
    mutation UpdateZonePrice($id: ID!, $update: ZonePriceInput!) {
  updateOneZonePrice(input: {id: $id, update: $update}) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateZonePriceGQL extends Apollo.Mutation<UpdateZonePriceMutation, UpdateZonePriceMutationVariables> {
    document = UpdateZonePriceDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateZonePriceDocument = gql`
    mutation CreateZonePrice($input: ZonePriceInput!) {
  createOneZonePrice(input: {zonePrice: $input}) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateZonePriceGQL extends Apollo.Mutation<CreateZonePriceMutation, CreateZonePriceMutationVariables> {
    document = CreateZonePriceDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteZonePriceDocument = gql`
    mutation DeleteZonePrice($id: ID!) {
  deleteOneZonePrice(input: {id: $id}) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteZonePriceGQL extends Apollo.Mutation<DeleteZonePriceMutation, DeleteZonePriceMutationVariables> {
    document = DeleteZonePriceDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const SetZonePriceRelationsDocument = gql`
    mutation SetZonePriceRelations($id: ID!, $services: [ID!]!, $fleets: [ID!]!) {
  setServicesOnZonePrice(input: {id: $id, relationIds: $services}) {
    id
  }
  setFleetsOnZonePrice(input: {id: $id, relationIds: $fleets}) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SetZonePriceRelationsGQL extends Apollo.Mutation<SetZonePriceRelationsMutation, SetZonePriceRelationsMutationVariables> {
    document = SetZonePriceRelationsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ZonePricesListDocument = gql`
    query ZonePricesList($paging: OffsetPaging) {
  zonePrices(paging: $paging) {
    nodes {
      id
      name
    }
    totalCount
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ZonePricesListGQL extends Apollo.Query<ZonePricesListQuery, ZonePricesListQueryVariables> {
    document = ZonePricesListDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ViewAnnouncementDocument = gql`
    query ViewAnnouncement($id: ID!) {
  announcement(id: $id) {
    id
    title
    userType
    description
    url
    startAt
    expireAt
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ViewAnnouncementGQL extends Apollo.Query<ViewAnnouncementQuery, ViewAnnouncementQueryVariables> {
    document = ViewAnnouncementDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateAnnouncementDocument = gql`
    mutation CreateAnnouncement($input: AnnouncementInput!) {
  createOneAnnouncement(input: {announcement: $input}) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateAnnouncementGQL extends Apollo.Mutation<CreateAnnouncementMutation, CreateAnnouncementMutationVariables> {
    document = CreateAnnouncementDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateAnnouncementDocument = gql`
    mutation UpdateAnnouncement($id: ID!, $input: AnnouncementInput!) {
  updateOneAnnouncement(input: {id: $id, update: $input}) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateAnnouncementGQL extends Apollo.Mutation<UpdateAnnouncementMutation, UpdateAnnouncementMutationVariables> {
    document = UpdateAnnouncementDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteAnnouncementDocument = gql`
    mutation DeleteAnnouncement($id: ID!) {
  deleteOneAnnouncement(input: {id: $id}) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteAnnouncementGQL extends Apollo.Mutation<DeleteAnnouncementMutation, DeleteAnnouncementMutationVariables> {
    document = DeleteAnnouncementDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AnnouncementsListDocument = gql`
    query AnnouncementsList($paging: OffsetPaging) {
  announcements(paging: $paging) {
    nodes {
      id
      title
      description
      startAt
      expireAt
    }
    totalCount
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AnnouncementsListGQL extends Apollo.Query<AnnouncementsListQuery, AnnouncementsListQueryVariables> {
    document = AnnouncementsListDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ViewCouponDocument = gql`
    query ViewCoupon($id: ID!) {
  coupon(id: $id) {
    id
    isEnabled
    code
    title
    description
    manyUsersCanUse
    manyTimesUserCanUse
    minimumCost
    maximumCost
    startAt
    expireAt
    discountPercent
    discountFlat
    creditGift
    isEnabled
    isFirstTravelOnly
    allowedServices {
      id
      name
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ViewCouponGQL extends Apollo.Query<ViewCouponQuery, ViewCouponQueryVariables> {
    document = ViewCouponDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateCouponDocument = gql`
    mutation CreateCoupon($input: CouponInput!) {
  createOneCoupon(input: {coupon: $input}) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateCouponGQL extends Apollo.Mutation<CreateCouponMutation, CreateCouponMutationVariables> {
    document = CreateCouponDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateCouponDocument = gql`
    mutation UpdateCoupon($id: ID!, $input: CouponInput!) {
  updateOneCoupon(input: {id: $id, update: $input}) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateCouponGQL extends Apollo.Mutation<UpdateCouponMutation, UpdateCouponMutationVariables> {
    document = UpdateCouponDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteCouponDocument = gql`
    mutation DeleteCoupon($id: ID!) {
  deleteOneCoupon(input: {id: $id}) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteCouponGQL extends Apollo.Mutation<DeleteCouponMutation, DeleteCouponMutationVariables> {
    document = DeleteCouponDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CouponListDocument = gql`
    query CouponList($paging: OffsetPaging) {
  coupons(paging: $paging) {
    nodes {
      id
      code
      title
      isEnabled
      description
      startAt
      expireAt
    }
    totalCount
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CouponListGQL extends Apollo.Query<CouponListQuery, CouponListQueryVariables> {
    document = CouponListDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GiftBatchListDocument = gql`
    query GiftBatchList($paging: OffsetPaging) {
  giftBatches(paging: $paging) {
    nodes {
      id
      name
      currency
      amount
      availableFrom
      expireAt
      totalUsed: giftCodesAggregate(filter: {usedAt: {isNot: null}}) {
        count {
          id
        }
      }
      totalUnused: giftCodesAggregate(filter: {usedAt: {is: null}}) {
        count {
          id
        }
      }
    }
    totalCount
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GiftBatchListGQL extends Apollo.Query<GiftBatchListQuery, GiftBatchListQueryVariables> {
    document = GiftBatchListDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateGiftBachDocument = gql`
    mutation CreateGiftBach($input: CreateGiftBatchInput!) {
  createGiftCardBatch(input: $input) {
    id
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateGiftBachGQL extends Apollo.Mutation<CreateGiftBachMutation, CreateGiftBachMutationVariables> {
    document = CreateGiftBachDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ViewGiftBatchDocument = gql`
    query ViewGiftBatch($id: ID!) {
  giftBatch(id: $id) {
    id
    name
    amount
    currency
    availableFrom
    expireAt
    totalUsed: giftCodesAggregate(filter: {usedAt: {isNot: null}}) {
      count {
        id
      }
    }
    totalUnused: giftCodesAggregate(filter: {usedAt: {is: null}}) {
      count {
        id
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ViewGiftBatchGQL extends Apollo.Query<ViewGiftBatchQuery, ViewGiftBatchQueryVariables> {
    document = ViewGiftBatchDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GiftCodeListDocument = gql`
    query GiftCodeList($giftBatchId: ID!, $paging: OffsetPaging!) {
  giftBatch(id: $giftBatchId) {
    giftCodes(paging: $paging) {
      nodes {
        id
        code
        usedAt
        riderTransaction {
          riderId
          rider {
            firstName
            lastName
          }
        }
        driverTransaction {
          driverId
          driver {
            firstName
            lastName
          }
        }
      }
      totalCount
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GiftCodeListGQL extends Apollo.Query<GiftCodeListQuery, GiftCodeListQueryVariables> {
    document = GiftCodeListDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ExportGiftBatchToCsvDocument = gql`
    mutation ExportGiftBatchToCSV($giftBatchId: ID!) {
  exportGiftCardBatch(batchId: $giftBatchId)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ExportGiftBatchToCsvGQL extends Apollo.Mutation<ExportGiftBatchToCsvMutation, ExportGiftBatchToCsvMutationVariables> {
    document = ExportGiftBatchToCsvDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RewardListDocument = gql`
    query RewardList($paging: OffsetPaging) {
  rewards(paging: $paging) {
    nodes {
      id
      title
      startDate
      endDate
      beneficiary
      event
    }
    totalCount
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RewardListGQL extends Apollo.Query<RewardListQuery, RewardListQueryVariables> {
    document = RewardListDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ViewRewardDocument = gql`
    query ViewReward($id: ID!) {
  reward(id: $id) {
    id
    title
    startDate
    endDate
    appType
    beneficiary
    event
    creditGift
    tripFeePercentGift
    creditCurrency
    conditionTripCountsLessThan
    conditionUserNumberFirstDigits
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ViewRewardGQL extends Apollo.Query<ViewRewardQuery, ViewRewardQueryVariables> {
    document = ViewRewardDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateRewardDocument = gql`
    mutation CreateReward($input: CreateReward!) {
  createOneReward(input: {reward: $input}) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateRewardGQL extends Apollo.Mutation<CreateRewardMutation, CreateRewardMutationVariables> {
    document = CreateRewardDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateRewardDocument = gql`
    mutation UpdateReward($id: ID!, $input: UpdateReward!) {
  updateOneReward(input: {id: $id, update: $input}) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateRewardGQL extends Apollo.Mutation<UpdateRewardMutation, UpdateRewardMutationVariables> {
    document = UpdateRewardDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreatePayoutSessionFieldsDocument = gql`
    query CreatePayoutSessionFields {
  supportedCurrencies
  payoutMethods {
    nodes {
      id
      name
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreatePayoutSessionFieldsGQL extends Apollo.Query<CreatePayoutSessionFieldsQuery, CreatePayoutSessionFieldsQueryVariables> {
    document = CreatePayoutSessionFieldsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreatePayoutSessionDocument = gql`
    mutation CreatePayoutSession($input: CreatePayoutSessionInput!) {
  createTaxiPayoutSession(input: $input) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreatePayoutSessionGQL extends Apollo.Mutation<CreatePayoutSessionMutation, CreatePayoutSessionMutationVariables> {
    document = CreatePayoutSessionDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const PayoutMethodsDocument = gql`
    query PayoutMethods {
  payoutMethods {
    nodes {
      id
      name
      description
      type
      media {
        id
        address
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class PayoutMethodsGQL extends Apollo.Query<PayoutMethodsQuery, PayoutMethodsQueryVariables> {
    document = PayoutMethodsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ViewPayoutMethodDocument = gql`
    query ViewPayoutMethod($id: ID!) {
  payoutMethod(id: $id) {
    id
    name
    currency
    description
    type
    privateKey
    publicKey
    saltKey
    merchantId
    media {
      address
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ViewPayoutMethodGQL extends Apollo.Query<ViewPayoutMethodQuery, ViewPayoutMethodQueryVariables> {
    document = ViewPayoutMethodDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreatePayoutMethodDocument = gql`
    mutation CreatePayoutMethod($input: CreatePayoutMethodInput!) {
  createOnePayoutMethod(input: {payoutMethod: $input}) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreatePayoutMethodGQL extends Apollo.Mutation<CreatePayoutMethodMutation, CreatePayoutMethodMutationVariables> {
    document = CreatePayoutMethodDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdatePayoutMethodDocument = gql`
    mutation UpdatePayoutMethod($id: ID!, $update: CreatePayoutMethodInput!) {
  updateOnePayoutMethod(input: {id: $id, update: $update}) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdatePayoutMethodGQL extends Apollo.Mutation<UpdatePayoutMethodMutation, UpdatePayoutMethodMutationVariables> {
    document = UpdatePayoutMethodDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const PayoutsDocument = gql`
    query Payouts($sessionsPaging: OffsetPaging!, $currency: String) {
  supportedCurrencies
  taxiPayoutStatistics(currency: $currency) {
    pendingAmount
    lastPayoutAmount
    currency
    usersDefaultPayoutMethodStats {
      payoutMethod {
        id
        name
      }
      totalCount
    }
  }
  taxiPayoutSessions(paging: $sessionsPaging) {
    nodes {
      id
      createdAt
      processedAt
      status
      totalAmount
      currency
    }
    totalCount
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class PayoutsGQL extends Apollo.Query<PayoutsQuery, PayoutsQueryVariables> {
    document = PayoutsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ViewPayoutSessionDocument = gql`
    query ViewPayoutSession($id: ID!) {
  taxiPayoutSession(id: $id) {
    id
    currency
    createdAt
    processedAt
    totalAmount
    status
    payoutMethods {
      id
      type
      name
      description
      currency
      balance
      media {
        address
      }
    }
    driverTransactions {
      nodes {
        amount
        currency
        status
        createdAt
        driver {
          firstName
          lastName
          media {
            address
          }
        }
      }
    }
    amountToBePaidByPayoutMethod: driverTransactionsAggregate(
      filter: {status: {eq: Processing}, payoutSessionId: {eq: $id}}
    ) {
      groupBy {
        payoutMethodId
      }
      sum {
        amount
      }
    }
    unpaidAmount: driverTransactionsAggregate(filter: {status: {eq: Processing}}) {
      sum {
        amount
      }
    }
    paidAmount: driverTransactionsAggregate(filter: {status: {eq: Done}}) {
      sum {
        amount
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ViewPayoutSessionGQL extends Apollo.Query<ViewPayoutSessionQuery, ViewPayoutSessionQueryVariables> {
    document = ViewPayoutSessionDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const PayoutSessionTransactionsDocument = gql`
    query PayoutSessionTransactions($id: ID!, $paging: OffsetPaging!) {
  taxiPayoutSession(id: $id) {
    driverTransactions(paging: $paging) {
      nodes {
        id
        amount
        currency
        status
        createdAt
        driver {
          firstName
          lastName
          media {
            address
          }
          payoutAccounts(filter: {isDefault: {is: true}}) {
            nodes {
              id
              name
              type
              accountNumber
              routingNumber
              bankName
              branchName
              accountHolderName
              accountHolderCountry
              accountHolderCity
              accountHolderState
              accountHolderZip
              accountHolderAddress
              accountHolderDateOfBirth
              payoutMethod {
                name
                media {
                  address
                }
              }
            }
          }
        }
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class PayoutSessionTransactionsGQL extends Apollo.Query<PayoutSessionTransactionsQuery, PayoutSessionTransactionsQueryVariables> {
    document = PayoutSessionTransactionsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ExportToCsvDocument = gql`
    mutation ExportToCSV($input: ExportSessionToCsvInput!) {
  exportTaxiPayoutSessionToCsv(input: $input)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ExportToCsvGQL extends Apollo.Mutation<ExportToCsvMutation, ExportToCsvMutationVariables> {
    document = ExportToCsvDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RunAutoPayoutDocument = gql`
    mutation RunAutoPayout($input: RunAutoPayoutInput!) {
  runTaxiAutoPayout(input: $input)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RunAutoPayoutGQL extends Apollo.Mutation<RunAutoPayoutMutation, RunAutoPayoutMutationVariables> {
    document = RunAutoPayoutDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const SaveManualPayoutItemDocument = gql`
    mutation SaveManualPayoutItem($input: ManualPayoutInput!) {
  taxiManualPayout(input: $input) {
    amount
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SaveManualPayoutItemGQL extends Apollo.Mutation<SaveManualPayoutItemMutation, SaveManualPayoutItemMutationVariables> {
    document = SaveManualPayoutItemDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdatePayoutSessionDocument = gql`
    mutation UpdatePayoutSession($id: ID!, $update: UpdatePayoutSessionInput!) {
  updateOneTaxiPayoutSession(input: {id: $id, update: $update}) {
    id
    status
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdatePayoutSessionGQL extends Apollo.Mutation<UpdatePayoutSessionMutation, UpdatePayoutSessionMutationVariables> {
    document = UpdatePayoutSessionDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AvailableDriversForOrderDocument = gql`
    query AvailableDriversForOrder($center: PointInput!, $count: Int!) {
  getDriversLocationWithData(center: $center, count: $count) {
    id
    location {
      lat
      lng
    }
    mobileNumber
    firstName
    lastName
    lastUpdatedAt
    rating
    reviewCount
    status
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AvailableDriversForOrderGQL extends Apollo.Query<AvailableDriversForOrderQuery, AvailableDriversForOrderQueryVariables> {
    document = AvailableDriversForOrderDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DriverSearchDocument = gql`
    query DriverSearch($filter: String!) {
  drivers(
    filter: {or: [{mobileNumber: {like: $filter}}, {lastName: {like: $filter}}]}
  ) {
    nodes {
      id
      mobileNumber
      firstName
      lastName
      rating
      reviewCount
      status
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DriverSearchGQL extends Apollo.Query<DriverSearchQuery, DriverSearchQueryVariables> {
    document = DriverSearchDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AssignDriverToOrderDocument = gql`
    mutation AssignDriverToOrder($orderId: ID!, $driverId: ID!) {
  assignDriverToOrder(orderId: $orderId, driverId: $driverId) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AssignDriverToOrderGQL extends Apollo.Mutation<AssignDriverToOrderMutation, AssignDriverToOrderMutationVariables> {
    document = AssignDriverToOrderDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ViewOrderDocument = gql`
    query ViewOrder($id: ID!) {
  order(id: $id) {
    id
    createdOn
    expectedTimestamp
    costBest
    costAfterCoupon
    status
    currency
    distanceBest
    durationBest
    startTimestamp
    finishTimestamp
    addresses
    points {
      lat
      lng
    }
    service {
      name
    }
    driver {
      id
      firstName
      lastName
      mobileNumber
      registrationTimestamp
      status
      media {
        address
      }
    }
    rider {
      id
      firstName
      lastName
      mobileNumber
      registrationTimestamp
      status
      media {
        address
      }
    }
    complaints {
      id
      subject
      inscriptionTimestamp
      content
      requestedByDriver
    }
    conversation {
      sentAt
      sentByDriver
      status
      content
    }
    activities {
      createdAt
      type
    }
    coupon {
      title
      code
      expireAt
    }
    riderTransactions {
      action
      rechargeType
      deductType
      amount
      status
      currency
      refrenceNumber
      paymentGateway {
        title
      }
    }
    driverTransactions {
      action
      rechargeType
      deductType
      amount
      status
      currency
      refrenceNumber
    }
    providerTransactions {
      action
      rechargeType
      deductType
      amount
      currency
      refrenceNumber
    }
    fleetTransactions {
      action
      rechargeType
      deductType
      amount
      currency
      refrenceNumber
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ViewOrderGQL extends Apollo.Query<ViewOrderQuery, ViewOrderQueryVariables> {
    document = ViewOrderDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const OrdersListDocument = gql`
    query OrdersList($paging: OffsetPaging, $filter: OrderFilter, $sorting: [OrderSort!]) {
  orders(paging: $paging, filter: $filter, sorting: $sorting) {
    nodes {
      id
      status
      createdOn
      expectedTimestamp
      costAfterCoupon
      currency
    }
    totalCount
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class OrdersListGQL extends Apollo.Query<OrdersListQuery, OrdersListQueryVariables> {
    document = OrdersListDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateRiderDocument = gql`
    mutation CreateRider($input: RiderInput!) {
  createOneRider(input: {rider: $input}) {
    id
    firstName
    lastName
    mobileNumber
    gender
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateRiderGQL extends Apollo.Mutation<CreateRiderMutation, CreateRiderMutationVariables> {
    document = CreateRiderDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ViewRiderDocument = gql`
    query ViewRider($id: ID!) {
  rider(id: $id) {
    id
    status
    firstName
    lastName
    mobileNumber
    isResident
    idNumber
    media {
      address
    }
    mobileNumber
    registrationTimestamp
    email
    gender
    wallet(sorting: [{field: balance, direction: DESC}]) {
      balance
      currency
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ViewRiderGQL extends Apollo.Query<ViewRiderQuery, ViewRiderQueryVariables> {
    document = ViewRiderDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RiderAddressesDocument = gql`
    query RiderAddresses($riderId: ID!, $paging: OffsetPaging) {
  riderAddresses(filter: {riderId: {eq: $riderId}}, paging: $paging) {
    nodes {
      title
      details
      location {
        lat
        lng
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RiderAddressesGQL extends Apollo.Query<RiderAddressesQuery, RiderAddressesQueryVariables> {
    document = RiderAddressesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RiderWalletDocument = gql`
    query RiderWallet($riderId: ID!, $paging: OffsetPaging, $filter: RiderTransactionFilter, $sorting: [RiderTransactionSort!]) {
  rider(id: $riderId) {
    wallet {
      balance
      currency
    }
    transactions(paging: $paging, sorting: $sorting, filter: $filter) {
      nodes {
        action
        deductType
        status
        createdAt
        rechargeType
        amount
        currency
        refrenceNumber
        description
        paymentGatewayId
        operatorId
        requestId
      }
      totalCount
    }
  }
  regions {
    nodes {
      currency
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RiderWalletGQL extends Apollo.Query<RiderWalletQuery, RiderWalletQueryVariables> {
    document = RiderWalletDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RiderOrdersDocument = gql`
    query RiderOrders($riderId: ID!, $filter: OrderFilter, $paging: OffsetPaging, $sorting: [OrderSort!]) {
  rider(id: $riderId) {
    orders(paging: $paging, filter: $filter, sorting: $sorting) {
      nodes {
        id
        createdOn
        status
        distanceBest
        durationBest
        costBest
        costAfterCoupon
        currency
        addresses
        points {
          lat
          lng
        }
        expectedTimestamp
      }
      totalCount
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RiderOrdersGQL extends Apollo.Query<RiderOrdersQuery, RiderOrdersQueryVariables> {
    document = RiderOrdersDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateRiderDocument = gql`
    mutation UpdateRider($id: ID!, $update: RiderInput!) {
  updateOneRider(input: {id: $id, update: $update}) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateRiderGQL extends Apollo.Mutation<UpdateRiderMutation, UpdateRiderMutationVariables> {
    document = UpdateRiderDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateRiderTransactionDocument = gql`
    mutation CreateRiderTransaction($input: RiderTransactionInput!) {
  createRiderTransaction(input: $input) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateRiderTransactionGQL extends Apollo.Mutation<CreateRiderTransactionMutation, CreateRiderTransactionMutationVariables> {
    document = CreateRiderTransactionDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteRiderDocument = gql`
    mutation DeleteRider($id: ID!) {
  deleteOneRider(id: $id) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteRiderGQL extends Apollo.Mutation<DeleteRiderMutation, DeleteRiderMutationVariables> {
    document = DeleteRiderDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RidersListDocument = gql`
    query RidersList($filter: RiderFilter, $paging: OffsetPaging, $sorting: [RiderSort!]) {
  riders(filter: $filter, paging: $paging, sorting: $sorting) {
    nodes {
      id
      firstName
      lastName
      status
      gender
      mobileNumber
      registrationTimestamp
    }
    totalCount
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RidersListGQL extends Apollo.Query<RidersListQuery, RidersListQueryVariables> {
    document = RidersListDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const SosListDocument = gql`
    query SOSList($paging: OffsetPaging) {
  distressSignals(paging: $paging) {
    nodes {
      id
      createdAt
      status
      location {
        lat
        lng
      }
    }
    totalCount
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SosListGQL extends Apollo.Query<SosListQuery, SosListQueryVariables> {
    document = SosListDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ViewSosDocument = gql`
    query ViewSOS($id: ID!) {
  distressSignal(id: $id) {
    id
    createdAt
    status
    submittedByRider
    location {
      lat
      lng
    }
    activities {
      action
      createdAt
      note
      operator {
        id
        firstName
        lastName
      }
    }
    order {
      id
      status
      createdOn
      startTimestamp
      finishTimestamp
      expectedTimestamp
      costBest
      costAfterCoupon
      addresses
      currency
      rider {
        id
        mobileNumber
        status
        firstName
        lastName
        registrationTimestamp
      }
      driver {
        id
        mobileNumber
        status
        firstName
        lastName
        registrationTimestamp
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ViewSosGQL extends Apollo.Query<ViewSosQuery, ViewSosQueryVariables> {
    document = ViewSosDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateSosActivityDocument = gql`
    mutation CreateSOSActivity($activity: CreateSOSAcitivtyInput!) {
  createOneSOSActivity(input: {sOSActivity: $activity}) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateSosActivityGQL extends Apollo.Mutation<CreateSosActivityMutation, CreateSosActivityMutationVariables> {
    document = CreateSosActivityDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CurrentConfigurationDocument = gql`
    query CurrentConfiguration {
  currentConfiguration {
    purchaseCode
    backendMapsAPIKey
    adminPanelAPIKey
    firebaseProjectPrivateKey
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CurrentConfigurationGQL extends Apollo.Query<CurrentConfigurationQuery, CurrentConfigurationQueryVariables> {
    document = CurrentConfigurationDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdatePurchaseCodeDocument = gql`
    mutation UpdatePurchaseCode($code: String!, $email: String) {
  updatePurchaseCode(purchaseCode: $code, email: $email) {
    status
    message
    clients {
      ip
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdatePurchaseCodeGQL extends Apollo.Mutation<UpdatePurchaseCodeMutation, UpdatePurchaseCodeMutationVariables> {
    document = UpdatePurchaseCodeDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateMapsApiKeyDocument = gql`
    mutation UpdateMapsAPIKey($backend: String!, $adminPanel: String!) {
  updateMapsAPIKey(backend: $backend, adminPanel: $adminPanel) {
    status
    message
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateMapsApiKeyGQL extends Apollo.Mutation<UpdateMapsApiKeyMutation, UpdateMapsApiKeyMutationVariables> {
    document = UpdateMapsApiKeyDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateFirebaseDocument = gql`
    mutation UpdateFirebase($keyFileName: String!) {
  updateFirebase(keyFileName: $keyFileName) {
    status
    message
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateFirebaseGQL extends Apollo.Mutation<UpdateFirebaseMutation, UpdateFirebaseMutationVariables> {
    document = UpdateFirebaseDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DisableServerDocument = gql`
    mutation DisableServer($ip: String!) {
  disablePreviousServer(ip: $ip) {
    status
    message
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DisableServerGQL extends Apollo.Mutation<DisableServerMutation, DisableServerMutationVariables> {
    document = DisableServerDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const LoginDocument = gql`
    query Login($username: String!, $password: String!) {
  login(userName: $username, password: $password) {
    token
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class LoginGQL extends Apollo.Query<LoginQuery, LoginQueryVariables> {
    document = LoginDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }