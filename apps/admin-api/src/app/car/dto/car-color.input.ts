import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class CarColorInput {
  @Field()
  name: string;
}
