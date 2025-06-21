import { ID, ObjectType, Field } from '@nestjs/graphql';
import {
  Authorize,
  FilterableField,
  IDField,
  OffsetConnection,
} from '@ptc-org/nestjs-query-graphql';
import { SMSProviderType } from '@ridy/database';
import { SMSProviderAuthorizer } from '../sms-provider.authorizer';
import { SMSDTO } from './sms.dto';

@ObjectType('SMSProvider', {
  description: 'SMS Provider',
})
@OffsetConnection('messages', () => SMSDTO, { enableAggregate: true })
@Authorize(SMSProviderAuthorizer)
export class SMSProviderDTO {
  @IDField(() => ID)
  id: number;
  @FilterableField()
  name!: string;
  @FilterableField(() => SMSProviderType)
  type!: SMSProviderType;
  @Field(() => Boolean, { nullable: false })
    isDefault!: boolean;
  @Field(() => ID)
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
