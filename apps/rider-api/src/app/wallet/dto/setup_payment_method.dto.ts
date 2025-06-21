import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType('SetupPaymentMethod')
export class SetupPaymentMethodDto {
  @Field(() => String, { nullable: true })
  url?: string;
}
