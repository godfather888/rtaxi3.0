import { Field, ID, ObjectType } from '@nestjs/graphql';
import { FilterableField, IDField } from '@ptc-org/nestjs-query-graphql';
import { SessionInfoDTO } from '../../core/fragments/session-info.dto';

@ObjectType('ParkingLoginSession')
export class ParkingLoginSessionDTO {
  @IDField(() => ID)
  id!: number;

  @Field(() => SessionInfoDTO)
  sessionInfo!: SessionInfoDTO;

  @FilterableField(() => ID)
  customerId!: number;
}
