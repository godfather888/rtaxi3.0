import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import {
  BeforeCreateOne,
  CreateOneInputType,
} from '@ptc-org/nestjs-query-graphql';
import { UserContext } from '../../auth/authenticated-admin';

@InputType()
@BeforeCreateOne(
  (
    input: CreateOneInputType<CreateShopOrderNoteInput>,
    context: UserContext,
  ) => {
    return { input: { ...input.input, staffId: context.req.user.id } };
  },
)
export class CreateShopOrderNoteInput {
  @Field(() => ID)
  orderId: number;

  @Field()
  note: string;
}
