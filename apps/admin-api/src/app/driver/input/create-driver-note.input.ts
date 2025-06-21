import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class CreateDriverNoteInput {
  @Field(() => ID)
  driverId: number;
  @Field(() => String, { nullable: false })
    note: string;
}
