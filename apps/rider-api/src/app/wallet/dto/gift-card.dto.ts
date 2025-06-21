import { ID, ObjectType, Field, Float } from '@nestjs/graphql';
import { IDField } from '@ptc-org/nestjs-query-graphql';

@ObjectType('GiftCard')
export class GiftCardDTO {
  @IDField(() => ID)
  id!: number;
  @Field(() => Float, { nullable: false })
  amount!: number;
  @Field(() => String, { nullable: false })
  currency!: string;
}
