import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import {
  BeforeCreateOne,
  CreateOneInputType,
} from '@ptc-org/nestjs-query-graphql';
import { UserContext } from '../../auth/authenticated-admin';

@InputType()
@BeforeCreateOne(
  (input: CreateOneInputType<CreateShopNoteInput>, context: UserContext) => {
    return { input: { ...input.input, staffId: context.req.user.id } };
  },
)
export class CreateShopNoteInput {
  @Field(() => ID)
  shopId: number;

  @Field()
  note: string;
}
