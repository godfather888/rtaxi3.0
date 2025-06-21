import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class CreateTaxiOrderNoteInput {
  @Field(() => ID)
  orderId!: number;
  @Field(() => String, { nullable: false })
    note!: string;
}
