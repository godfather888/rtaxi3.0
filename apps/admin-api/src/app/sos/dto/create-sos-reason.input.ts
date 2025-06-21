import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class CreateSosReasonInput {
  @Field()
  name: string;
}
