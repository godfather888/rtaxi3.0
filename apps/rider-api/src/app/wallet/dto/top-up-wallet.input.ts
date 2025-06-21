import {
  Field,
  ID,
  InputType,
  ObjectType,
  registerEnumType,
  Float,
} from '@nestjs/graphql';
import { PaymentMode } from '@ridy/database';

export enum TopUpWalletStatus {
  OK = 'ok',
  Redirect = 'redirect',
  Failed = 'failed',
}
registerEnumType(TopUpWalletStatus, { name: 'TopUpWalletStatus' });

@InputType()
export class TopUpWalletInput {
  @Field(() => ID)
  gatewayId!: number;
  @Field(() => Float, { nullable: false })
  amount!: number;
  @Field(() => String, { nullable: false })
  currency!: string;
  @Field(() => String, { nullable: true })
  token?: string;
  @Field(() => Float, { nullable: true })
  pin?: number;
  @Field(() => Float, { nullable: true })
  otp?: number;
  @Field(() => ID, { nullable: true })
  transactionId?: string;
  @Field(() => String, { nullable: true })
  orderNumber?: string;
  @Field(() => PaymentMode, { defaultValue: PaymentMode.PaymentGateway })
  paymentMode!: PaymentMode;
}

@ObjectType()
export class TopUpWalletResponse {
  @Field(() => TopUpWalletStatus, { nullable: false })
  status!: TopUpWalletStatus;
  @Field(() => String, { nullable: true })
  error?: string;
  @Field(() => String, { nullable: true })
  url?: string;
}

const TopUpWalletStatusToIntentResultMap: Map<
  TopUpWalletStatus,
  'success' | 'redirect' | 'failed'
> = new Map([
  [TopUpWalletStatus.OK, 'success'],
  [TopUpWalletStatus.Redirect, 'redirect'],
  [TopUpWalletStatus.Failed, 'failed'],
]);

export const TopUpWalletStatusToIntentResult = (
  status: TopUpWalletStatus,
): 'success' | 'redirect' | 'failed' => {
  return TopUpWalletStatusToIntentResultMap.get(status)!;
};

const IntentResultToTopUpWalletStatusMap: Map<
  'success' | 'redirect' | 'failed',
  TopUpWalletStatus
> = new Map([
  ['success', TopUpWalletStatus.OK],
  ['redirect', TopUpWalletStatus.Redirect],
  ['failed', TopUpWalletStatus.Failed],
]);

export const IntentResultToTopUpWalletStatus = (
  status: 'success' | 'redirect' | 'failed',
): TopUpWalletStatus => {
  return IntentResultToTopUpWalletStatusMap.get(status)!;
};
