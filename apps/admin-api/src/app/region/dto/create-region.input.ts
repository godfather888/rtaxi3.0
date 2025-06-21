import { Field, ID, InputType } from '@nestjs/graphql';
import {
  BeforeCreateOne,
  CreateOneInputType,
} from '@ptc-org/nestjs-query-graphql';
import { Point } from '@ridy/database';

@InputType()
@BeforeCreateOne((input: CreateOneInputType<CreateRegionInput>) => {
  for (const location of input.input.location) {
    // if first and last point are not the same, add the first point to the end of the array
    if (
      location[0].lat !== location[location.length - 1].lat ||
      location[0].lng !== location[location.length - 1].lng
    ) {
      location.push(location[0]);
    }
  }
  return input;
})
export class CreateRegionInput {
  @Field(() => String, { nullable: false })
  name!: string;
  @Field(() => String, { nullable: false })
  currency!: string;
  @Field(() => Boolean, { nullable: false })
  enabled!: boolean;
  @Field(() => [[Point]], { nullable: false })
  location: Point[][];
  @Field(() => ID, { nullable: true })
  categoryId?: number;
}
