import { InputType, Field, ID, ObjectType } from '@nestjs/graphql';

@InputType()
export class CreateCustomerNoteInput {
  @Field(() => ID)
  customerId!: number;

  @Field()
  note!: string;
}
