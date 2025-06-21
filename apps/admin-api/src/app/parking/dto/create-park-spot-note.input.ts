import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import {
  BeforeCreateOne,
  CreateOneInputType,
} from '@ptc-org/nestjs-query-graphql';
import { UserContext } from '../../auth/authenticated-admin';

@InputType()
@BeforeCreateOne(
  (
    input: CreateOneInputType<CreateParkSpotNoteInput>,
    context: UserContext,
  ) => {
    return { input: { ...input.input, staffId: context.req.user.id } };
  },
)
export class CreateParkSpotNoteInput {
  @Field(() => ID)
  parkSpotId: number;
  @Field(() => String, { nullable: false })
    note: string;
}
