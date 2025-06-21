import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class CarModelInput {
  @Field()
  name: string;
}
