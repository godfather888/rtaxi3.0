import { Field, ID, InputType, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';
import { Relation } from '@ptc-org/nestjs-query-graphql';
import { OperatorDTO } from '../../operator/dto/operator.dto';

@ObjectType('Note')
@InputType('NoteInput')
@Relation('staff', () => OperatorDTO)
export class NoteDTO {
  @Field(() => GraphQLISODateTime, { nullable: false })
    createdAt!: Date;

  @Field(() => String, { nullable: false })
    note!: string;

  @Field(() => ID)
  staffId!: number;
}
