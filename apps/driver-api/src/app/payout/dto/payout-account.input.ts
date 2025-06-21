import { Field, ID, InputType, GraphQLISODateTime } from '@nestjs/graphql';

@InputType()
export class PayoutAccountInput {
  @Field(() => String, { nullable: false })
  name!: string;
  @Field(() => ID, { nullable: false })
  payoutMethodId!: number;
  @Field(() => String, { nullable: false })
  accountNumber!: string;
  @Field(() => String, { nullable: true })
  routingNumber?: string;
  @Field(() => String, { nullable: false })
  bankName!: string;
  @Field(() => String, { nullable: true })
  accountHolderName?: string;
  @Field(() => String, { nullable: true })
  branchName?: string;
  @Field(() => Boolean, { nullable: false })
  isDefault!: boolean;
  @Field(() => String, { nullable: true })
  accountHolderAddress?: string;
  @Field(() => String, { nullable: true })
  accountHolderCity?: string;
  @Field(() => String, { nullable: true })
  accountHolderState?: string;
  @Field(() => String, { nullable: true })
  accountHolderZip?: string;
  @Field(() => String, { nullable: true })
  accountHolderCountry?: string;
  @Field(() => String, { nullable: true })
  accountHolderPhone?: string;
  @Field(() => GraphQLISODateTime, { nullable: true })
  accountHolderDateOfBirth?: Date;
}
