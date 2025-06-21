import { ID, ObjectType, Field, GraphQLISODateTime } from '@nestjs/graphql';
import { ProviderBrand } from '@ridy/database';
import { FilterableField, IDField } from '@ptc-org/nestjs-query-graphql';
import { SavedPaymentMethodType } from '@ridy/database';

@ObjectType('SavedPaymentMethod')
export class SavedPaymentMethodDto {
  @IDField(() => ID)
  id!: number;
  @Field(() => SavedPaymentMethodType, { nullable: false })
  type!: SavedPaymentMethodType;
  @Field(() => String, { nullable: true })
  lastFour?: string;
  @Field(() => Boolean, { nullable: false })
  isEnabled!: boolean;
  @Field(() => Boolean, { nullable: false })
  isDefault!: boolean;
  @Field(() => ProviderBrand, { nullable: true })
  providerBrand?: ProviderBrand;
  @Field(() => String, { nullable: false })
  title!: string;
  @Field(() => GraphQLISODateTime, { nullable: true })
  expiryDate?: Date;
  @Field(() => String, { nullable: true })
  holderName?: string;
  @FilterableField(() => ID, { filterOnly: true })
  riderId!: number;
}
