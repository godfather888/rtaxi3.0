import {
  Field,
  ID,
  ObjectType,
  createUnionType,
  PickType,
} from '@nestjs/graphql';
import { IDField } from '@ptc-org/nestjs-query-graphql';
import { AdminNotificationType } from '@ridy/database';
import { AppType } from '@ridy/database';
import { TaxiSupportRequestDTO } from '../../taxi-support-request/dto/taxi-support-request.dto';
import { ShopSupportRequestDTO } from '../../shop/modules/support-request/dto/shop-support-request.dto';
import { ParkingSupportRequestDTO } from '../../parking/modules/support-request/dto/parking-support-request.dto';
import { DriverDTO } from '../../driver/dto/driver.dto';
import { ShopDTO } from '../../shop/dto/shop.dto';
import { ParkSpotDTO } from '../../parking/dto/park-spot.dto';
import { ShopFeedbackDTO } from '../../shop/modules/feedback/dto/shop-feedback.dto';
import { ParkingFeedbackDTO } from '../../parking/modules/feedback/dto/parking-feedback.dto';

@ObjectType('AdminNotificationBase')
export class AdminNotificationBase {
  @IDField(() => ID)
  id: number;

  @Field(() => AdminNotificationType)
  type: AdminNotificationType;

  @Field(() => AppType)
  appType: AppType;

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  readAt?: Date;

  @Field({ nullable: true })
  taxiSupportRequestId?: number;

  @Field({ nullable: true })
  shopSupportRequestId?: number;

  @Field({ nullable: true })
  parkingSupportRequestId?: number;

  @Field({ nullable: true })
  driverPendingVerificationId?: number;

  @Field({ nullable: true })
  shopPendingVerificationId?: number;

  @Field({ nullable: true })
  parkSpotPendingVerificationId?: number;

  @Field({ nullable: true })
  shopReviewPendingApprovalId?: number;

  @Field({ nullable: true })
  parkingReviewPendingApprovalId?: number;
}

@ObjectType('TaxiSupportRequestNotification')
export class TaxiSupportRequestNotification extends PickType(
  AdminNotificationBase,
  ['id', 'type', 'appType', 'createdAt', 'readAt'] as const,
) {
  @Field(() => TaxiSupportRequestDTO)
  taxiSupportRequest!: TaxiSupportRequestDTO;
}

@ObjectType('ShopSupportRequestNotification')
export class ShopSupportRequestNotification extends PickType(
  AdminNotificationBase,
  ['id', 'type', 'appType', 'createdAt', 'readAt'] as const,
) {
  @Field(() => ShopSupportRequestDTO)
  shopSupportRequest!: ShopSupportRequestDTO;
}

@ObjectType('ParkingSupportRequestNotification')
export class ParkingSupportRequestNotification extends PickType(
  AdminNotificationBase,
  ['id', 'type', 'appType', 'createdAt', 'readAt'] as const,
) {
  @Field(() => ParkingSupportRequestDTO)
  parkingSupportRequest!: ParkingSupportRequestDTO;
}

@ObjectType('DriverPendingVerificationNotification')
export class DriverPendingVerificationNotification extends PickType(
  AdminNotificationBase,
  ['id', 'type', 'appType', 'createdAt', 'readAt'] as const,
) {
  @Field(() => DriverDTO)
  driverPendingVerification!: DriverDTO;
}

@ObjectType('ShopPendingVerificationNotification')
export class ShopPendingVerificationNotification extends PickType(
  AdminNotificationBase,
  ['id', 'type', 'appType', 'createdAt', 'readAt'] as const,
) {
  @Field(() => ShopDTO)
  shopPendingVerification!: ShopDTO;
}

@ObjectType('ParkSpotPendingVerificationNotification')
export class ParkSpotPendingVerificationNotification extends PickType(
  AdminNotificationBase,
  ['id', 'type', 'appType', 'createdAt', 'readAt'] as const,
) {
  @Field(() => ParkSpotDTO)
  parkSpotPendingVerification!: ParkSpotDTO;
}

@ObjectType('ShopReviewPendingApprovalNotification')
export class ShopReviewPendingApprovalNotification extends PickType(
  AdminNotificationBase,
  ['id', 'type', 'appType', 'createdAt', 'readAt'] as const,
) {
  @Field(() => ShopFeedbackDTO)
  shopReviewPendingApproval!: ShopFeedbackDTO;
}

@ObjectType('ParkingReviewPendingApprovalNotification')
export class ParkingReviewPendingApprovalNotification extends PickType(
  AdminNotificationBase,
  ['id', 'type', 'appType', 'createdAt', 'readAt'] as const,
) {
  @Field(() => ParkingFeedbackDTO)
  parkingReviewPendingApproval!: ParkingFeedbackDTO;
}

export const AdminNotificationUnion = createUnionType({
  name: 'AdminNotificationUnion',
  types: () =>
    [
      TaxiSupportRequestNotification,
      ShopSupportRequestNotification,
      ParkingSupportRequestNotification,
      DriverPendingVerificationNotification,
      ShopPendingVerificationNotification,
      ParkSpotPendingVerificationNotification,
      ShopReviewPendingApprovalNotification,
      ParkingReviewPendingApprovalNotification,
    ] as const,
  resolveType(value: AdminNotificationBase) {
    if (value.taxiSupportRequestId) return TaxiSupportRequestNotification;
    if (value.shopSupportRequestId) return ShopSupportRequestNotification;
    if (value.parkingSupportRequestId) return ParkingSupportRequestNotification;
    if (value.driverPendingVerificationId)
      return DriverPendingVerificationNotification;
    if (value.shopPendingVerificationId)
      return ShopPendingVerificationNotification;
    if (value.parkSpotPendingVerificationId)
      return ParkSpotPendingVerificationNotification;
    if (value.shopReviewPendingApprovalId)
      return ShopReviewPendingApprovalNotification;
    if (value.parkingReviewPendingApprovalId)
      return ParkingReviewPendingApprovalNotification;
    return null;
  },
});
