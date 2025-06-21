import { ID, ObjectType, Field } from '@nestjs/graphql';
import {
  FilterableField,
  IDField,
  Relation,
} from '@ptc-org/nestjs-query-graphql';
import { CustomerDTO } from '../../customer/dto/customer.dto';

@ObjectType('CampaignCode')
@Relation('customer', () => CustomerDTO, { nullable: true })
export class CampaignCodeDTO {
  @IDField(() => ID)
  id: number;
  @Field(() => String, { nullable: false })
  code: string;
  @FilterableField(() => ID, { nullable: true })
  customerId?: number;
  @FilterableField(() => ID, { nullable: true })
  campaignId?: number;
}
