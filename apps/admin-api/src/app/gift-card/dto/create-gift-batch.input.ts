import { Field, InputType, Int, ObjectType, Float, GraphQLISODateTime } from '@nestjs/graphql';

@InputType()
export class CreateGiftBatchInput {
  @Field(() => String, { nullable: false })
    name: string;
  @Field(() => String, { nullable: false })
    currency: string;
  @Field(() => Float, { nullable: false })
    amount: number;
  @Field(() => GraphQLISODateTime, { nullable: true })
    availableFrom?: Date;
  @Field(() => GraphQLISODateTime, { nullable: true })
    expireAt?: Date;
  @Field(() => Int)
  quantity: number;
}
