import { Field, Int, ObjectType } from '@nestjs/graphql';
import { AppType } from '@ridy/database';

@ObjectType('CustomerLoginPerApp')
export class CustomersPerAppDTO {
  @Field(() => AppType)
  app: AppType;
  @Field(() => Int)
  count: number;
}
