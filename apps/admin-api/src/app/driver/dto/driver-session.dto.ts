import { Field, ID, ObjectType } from '@nestjs/graphql';
import { FilterableField, IDField } from '@ptc-org/nestjs-query-graphql';
import { SessionInfoDTO } from '../../core/fragments/session-info.dto';

@ObjectType('DriverSession')
export class DriverSessionDTO {
  @IDField(() => ID)
  id: number;
  @Field(() => SessionInfoDTO)
  sessionInfo: SessionInfoDTO;
  @FilterableField(() => ID)
  driverId: number;
}
