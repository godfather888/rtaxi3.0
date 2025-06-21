import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { SOSStatus } from '@ridy/database';

@InputType()
export class UpdateSosInput {
  @Field(() => SOSStatus)
  status: SOSStatus;
}
