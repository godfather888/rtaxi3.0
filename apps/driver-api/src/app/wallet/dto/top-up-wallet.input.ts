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
  @Field(() => PaymentMode, { defaultValue: PaymentMode.PaymentGateway })
  paymentMode?: PaymentMode;
}

@ObjectType()
export class TopUpWalletResponse {
  @Field(() => TopUpWalletStatus, { nullable: false })
  status!: TopUpWalletStatus;
  @Field(() => String, { nullable: true })
  url?: string;
  @Field(() => String, { nullable: true })
  error?: string;
}
