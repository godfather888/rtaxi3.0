import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { PaymentGatewayType } from '@ridy/database';

@InputType()
export class UpdatePaymentGatewayInput {
  @Field(() => Boolean, { nullable: true })
  enabled?: boolean;
  @Field(() => String, { nullable: true })
  title?: string;
  @Field(() => PaymentGatewayType, { nullable: true })
  type?: PaymentGatewayType;
  @Field(() => String, { nullable: true })
  publicKey?: string;
  @Field(() => String, { nullable: true })
  privateKey?: string;
  @Field(() => ID, { nullable: true })
  merchantId?: string;
  @Field(() => String, { nullable: true })
  saltKey?: string;
  @Field(() => ID, { nullable: true })
  mediaId?: number;
}
