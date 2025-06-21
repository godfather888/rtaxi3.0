import { ID, ObjectType, Field } from '@nestjs/graphql';
import { IDField } from '@ptc-org/nestjs-query-graphql';
import { SMSStatus } from '@ridy/database';
import { SMSType } from '@ridy/database';

@ObjectType('SMS')
export class SMSDTO {
  @IDField(() => ID)
  id: number;
  @Field(() => String, { nullable: false })
    countryIsoCode!: string;
  @Field(() => String, { nullable: false })
    to!: string;
  @Field(() => String, { nullable: false })
    from!: string;
  @Field(() => String, { nullable: false })
    message!: string;
  @Field(() => SMSStatus, { nullable: false })
    status!: SMSStatus;
  @Field(() => SMSType, { nullable: false })
    type!: SMSType;
  @Field(() => ID)
    providerId!: number;
}
