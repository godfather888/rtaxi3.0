import { Field, InputType } from '@nestjs/graphql';
import { SMSProviderType } from '@ridy/database';

@InputType()
export class SMSProviderInput {
  @Field(() => String, { nullable: true })
  name?: string;
  @Field(() => SMSProviderType, { nullable: true })
  type?: SMSProviderType;
  @Field(() => Boolean, { nullable: true })
  isDefault?: boolean;
  @Field(() => String, { nullable: true })
  accountId?: string;
  @Field(() => String, { nullable: true })
  authToken?: string;
  @Field(() => String, { nullable: true })
  fromNumber?: string;
  @Field(() => String, { nullable: true })
  verificationTemplate?: string;
  @Field(() => String, { nullable: true })
  smsType?: string;
}
