import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { PaymentGatewayType } from '@ridy/database';

@InputType()
export class CreatePaymentGatewayInput {
  @Field(() => Boolean, { nullable: false })
  enabled!: boolean;
  @Field(() => String, { nullable: false })
  title!: string;
  @Field(() => PaymentGatewayType, { nullable: false })
  type!: PaymentGatewayType;
  @Field(() => String, { nullable: true })
  publicKey?: string;
  @Field(() => String, { nullable: false })
  privateKey: string;
  @Field(() => ID, { nullable: true })
  merchantId?: string;
  @Field(() => String, { nullable: true })
  saltKey?: string;
  @Field(() => ID, { nullable: true })
  mediaId?: number;
}
