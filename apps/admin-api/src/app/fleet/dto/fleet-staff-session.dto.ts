import { Field, ID, ObjectType } from '@nestjs/graphql';
import { FilterableField, IDField } from '@ptc-org/nestjs-query-graphql';
import { SessionInfoDTO } from '../../core/fragments/session-info.dto';

@ObjectType('FleetStaffSession')
export class FleetStaffSessionDTO {
  @IDField(() => ID)
  id: number;
  @Field(() => SessionInfoDTO)
  sessionInfo: SessionInfoDTO;
  @FilterableField(() => ID)
  fleetStaffId!: number;
}
