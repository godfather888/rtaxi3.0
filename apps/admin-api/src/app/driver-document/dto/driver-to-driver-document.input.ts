import { Field, ID, InputType, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';

@InputType()
export class DriverToDriverDocumentInput {
  @Field(() => ID)
  driverId: number;

  @Field(() => ID)
  driverDocumentId: number;

  @Field(() => ID)
  mediaId: number;

  @Field(() => ID)
  retentionPolicyId?: number;

  @Field(() => GraphQLISODateTime, { nullable: true })
    expiresAt?: Date;
}
