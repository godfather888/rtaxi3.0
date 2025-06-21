import { IDField, OffsetConnection } from '@ptc-org/nestjs-query-graphql';
import { ZonePriceDTO } from './zone-price.dto';
import { ID, ObjectType, Field } from '@nestjs/graphql';

@ObjectType('ZonePriceCategory')
@OffsetConnection('zonePrices', () => ZonePriceDTO, {})
export class ZonePriceCategoryDTO {
  @IDField(() => ID)
  id: number;
  @Field(() => String, { nullable: false })
    name!: string;
}
