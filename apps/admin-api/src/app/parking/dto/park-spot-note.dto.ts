import { ID, ObjectType, Field, GraphQLISODateTime } from '@nestjs/graphql';
import {
  FilterableField,
  IDField,
  Relation,
} from '@ptc-org/nestjs-query-graphql';
import { ParkSpotDTO } from './park-spot.dto';
import { OperatorDTO } from '../../operator/dto/operator.dto';

@ObjectType('ParkSpotNote')
@Relation('parkSpot', () => ParkSpotDTO)
@Relation('staff', () => OperatorDTO)
export class ParkSpotNoteDTO {
  @IDField(() => ID)
  id: number;
  @Field(() => GraphQLISODateTime, { nullable: false })
    createdAt: Date;
  @FilterableField(() => ID)
  parkSpotId: number;
  @Field(() => String, { nullable: false })
    note!: string;
}
