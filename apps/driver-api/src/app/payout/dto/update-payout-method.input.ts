import { Field, ID, InputType } from '@nestjs/graphql';
import { IDField } from '@ptc-org/nestjs-query-graphql';

@InputType()
export class UpdatePayoutMethodInput {
  @Field(() => ID)
  @IDField(() => ID)
  id!: number;
  @Field(() => Boolean, { nullable: false })
  isDefault!: boolean;
}
