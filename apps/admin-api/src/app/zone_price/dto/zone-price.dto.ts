import {
  Authorize,
  IDField,
  UnPagedRelation,
} from '@ptc-org/nestjs-query-graphql';
import { ID, ObjectType, Field, Float } from '@nestjs/graphql';
import { Point, TimeMultiplier } from '@ridy/database';
import { FleetDTO } from '../../fleet/dto/fleet.dto';
import { ServiceAuthorizer } from '../../service/dto/service.authorizer';
import { ServiceDTO } from '../../service/dto/service.dto';

@ObjectType('ZonePrice')
@UnPagedRelation('fleets', () => FleetDTO, {
  update: { enabled: true },
})
@UnPagedRelation('services', () => ServiceDTO, {
  update: { enabled: true },
})
@Authorize(ServiceAuthorizer)
export class ZonePriceDTO {
  @IDField(() => ID)
  id!: number;
  @Field(() => String, { nullable: false })
  name!: string;
  @Field(() => [[Point]], { nullable: false })
  from!: Point[][];
  @Field(() => [[Point]], { nullable: false })
  to!: Point[][];
  @Field(() => Float, { nullable: false })
  cost!: number;
  @Field(() => [TimeMultiplier], { nullable: false })
  timeMultipliers!: TimeMultiplier[];
}
