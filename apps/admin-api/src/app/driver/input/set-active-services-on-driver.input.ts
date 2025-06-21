import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class SetActiveServicesOnDriverInput {
  @Field(() => ID)
  driverId: number;
  @Field(() => [ID])
  serviceIds: number[];
}
