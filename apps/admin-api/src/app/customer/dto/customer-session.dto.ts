import { Field, ID, ObjectType } from '@nestjs/graphql';
import { FilterableField, IDField } from '@ptc-org/nestjs-query-graphql';
import { SessionInfoDTO } from '../../core/fragments/session-info.dto';

@ObjectType('CustomerSession')
export class CustomerSessionDTO {
  @IDField(() => ID)
  id!: number;
  @Field(() => SessionInfoDTO)
  sessionInfo!: SessionInfoDTO;
  @FilterableField(() => ID)
  customerId!: number;
}
