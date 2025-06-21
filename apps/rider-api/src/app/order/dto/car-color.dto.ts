import { IDField } from '@ptc-org/nestjs-query-graphql';
import { ID, ObjectType, Field } from '@nestjs/graphql';

@ObjectType('CarColor')
export class CarColorDTO {
  @IDField(() => ID)
  id!: number;
  @Field(() => String, { nullable: false })
  name!: string;
}
