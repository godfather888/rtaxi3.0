import { Authorize, IDField } from '@ptc-org/nestjs-query-graphql';
import { ID, ObjectType, Field, Float } from '@nestjs/graphql';
import { ServiceOptionIcon } from '@ridy/database';
import { ServiceOptionType } from '@ridy/database';
import { ServiceAuthorizer } from './service.authorizer';

@ObjectType('ServiceOption')
@Authorize(ServiceAuthorizer)
export class ServiceOptionDTO {
  @IDField(() => ID)
  id: number;
  @Field(() => String, { nullable: false })
    name: string;
  @Field(() => ServiceOptionType, { nullable: false })
    type: ServiceOptionType;
  @Field(() => Float, { nullable: true })
    additionalFee?: number;
  @Field(() => ServiceOptionIcon, { nullable: false })
    icon: ServiceOptionIcon;
}
