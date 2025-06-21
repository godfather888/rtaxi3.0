import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { PayoutMethodType } from '@ridy/database';

@InputType()
export class CreatePayoutMethodInput {
  @Field(() => Boolean, { nullable: true })
  enabled?: boolean;
  @Field(() => String, { nullable: false })
  name!: string;
  @Field(() => String, { nullable: false })
  description!: string;
  @Field(() => String, { nullable: false })
  currency!: string;
  @Field(() => PayoutMethodType, { nullable: false })
  type!: PayoutMethodType;
  @Field(() => String, { nullable: true })
  publicKey?: string;
  @Field(() => String, { nullable: true })
  privateKey?: string;
  @Field(() => String, { nullable: true })
  saltKey?: string;
  @Field(() => ID, { nullable: true })
  merchantId?: string;
  @Field(() => ID, { nullable: true })
  mediaId?: number;
}
