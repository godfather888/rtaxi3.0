import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { ServiceOptionIcon } from '@ridy/database';
import { ServiceOptionType } from '@ridy/database';

@InputType()
export class ServiceOptionInput {
  @Field(() => String)
  name: string;
  @Field(() => ServiceOptionType)
  type: ServiceOptionType;
  @Field(() => Number, { nullable: true })
  additionalFee?: number;
  @Field(() => ServiceOptionIcon)
  icon: ServiceOptionIcon;
}
