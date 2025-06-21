import { Field, ID, InputType } from '@nestjs/graphql';
import { SOSActivityAction } from '@ridy/database';

@InputType()
export class CreateSOSAcitivtyInput {
  @Field(() => SOSActivityAction, { nullable: false })
  action: SOSActivityAction;
  @Field(() => String, { nullable: true })
  note?: string;
  @Field(() => ID)
  sosId: number;
}
