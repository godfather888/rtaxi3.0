import { Field, ObjectType } from '@nestjs/graphql';
import { Point } from '../../interfaces/point';

@ObjectType()
export class PlaceDTO {
  @Field(() => Point)
  point!: Point;
  @Field(() => String)
  title?: string;
  @Field(() => String)
  address!: string;
}
