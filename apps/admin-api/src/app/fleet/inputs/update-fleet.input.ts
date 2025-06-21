import { Field, Float, ID, InputType } from '@nestjs/graphql';
import { Point } from '@ridy/database';

@InputType()
export class UpdateFleetInput {
  @Field(() => String, { nullable: true })
  name?: string;
  @Field(() => String, { nullable: true })
  phoneNumber?: string;
  @Field(() => String, { nullable: true })
  mobileNumber?: string;
  @Field(() => String, { nullable: true })
  userName?: string;
  @Field(() => String, { nullable: true })
  password?: string;
  @Field(() => String, { nullable: true })
  accountNumber?: string;
  @Field(() => Float, { nullable: true })
  commissionSharePercent?: number;
  @Field(() => Float, { nullable: true })
  commissionShareFlat?: number;
  @Field(() => Float, { nullable: true })
  feeMultiplier?: number;
  @Field(() => String, { nullable: true })
  address?: string;
  @Field(() => [[Point]], { nullable: true })
  exclusivityAreas?: Point[][];
  @Field(() => ID, { nullable: true })
  profilePictureId?: number;
  @Field(() => Boolean, { nullable: true })
  isBlocked?: boolean;
}
