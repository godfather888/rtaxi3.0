import { Field, ID, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';
import { FilterableField, IDField } from '@ptc-org/nestjs-query-graphql';
import { ProviderBrand } from '@ridy/database';
import { SavedPaymentMethodType } from '@ridy/database';

@ObjectType('SavedPaymentMethod')
export class SavedPaymentMethodDTO {
  @IDField(() => ID)
  id!: number;
  @Field(() => String, { nullable: false })
  title!: string;
  @Field(() => String, { nullable: true })
  lastFour?: string;
  @Field(() => Boolean, { nullable: false })
  isDefault!: boolean;
  @Field(() => SavedPaymentMethodType)
  type!: SavedPaymentMethodType;
  @FilterableField(() => Boolean, { filterOnly: true })
  isEnabled!: boolean;
  @Field(() => ProviderBrand, { nullable: true })
  providerBrand?: ProviderBrand;
  @Field(() => GraphQLISODateTime, { nullable: true })
  expiryDate?: Date;
  @Field(() => String, { nullable: true })
  holderName?: string;
  @FilterableField(() => ID, { nullable: true })
  riderId?: number;
  @FilterableField(() => ID, { nullable: true })
  driverId?: number;
}
