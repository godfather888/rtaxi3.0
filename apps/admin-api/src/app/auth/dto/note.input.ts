import { InputType, Field, ObjectType } from '@nestjs/graphql';

@InputType('NoteInput')
export class NoteInput {
  @Field(() => String, { nullable: false })
    note!: string;
}
