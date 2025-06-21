import { ID, ObjectType, Field } from '@nestjs/graphql';
import {
  FilterableField,
  IDField,
  OffsetConnection,
} from '@ptc-org/nestjs-query-graphql';
import { SOSDTO } from './sos.dto';

@ObjectType('SOSReason')
@OffsetConnection('sos', () => SOSDTO, {
  enableAggregate: true,
  enableTotalCount: true,
})
export class SOSReasonDTO {
  @IDField(() => ID)
  id: number;
  @FilterableField()
  name: string;
  @FilterableField()
  isActive: boolean;
}
