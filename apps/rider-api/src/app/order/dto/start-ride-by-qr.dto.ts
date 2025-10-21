import { InputType, Field } from "@nestjs/graphql";
import { Point } from "@ridy/database";

@InputType()
export class StartRideByQrInput {
  @Field()
  token!: string;

  @Field(() => [String])
  addresses!: string[];

  @Field(() => [Point])
  points!: Point[];

  @Field()
  serviceId!: number;

  @Field({ nullable: true })
  waitTime?: number;

  @Field({ nullable: true })
  twoWay?: boolean;

  @Field(() => [String], { nullable: true })
  optionIds?: string[];
}
