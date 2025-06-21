import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@InputType()
export class DriverDocumentInput {
  @Field(() => String, { nullable: false })
    title: string;
  @Field(() => Boolean, { nullable: false })
    isEnabled: boolean;
  @Field(() => Boolean, { nullable: false })
    isRequired: boolean;
  @Field(() => Boolean, { nullable: false })
    hasExpiryDate: boolean;
  @Field(() => Int)
  notificationDaysBeforeExpiry: number;
  @Field(() => Int)
  numberOfImages: number;
}
