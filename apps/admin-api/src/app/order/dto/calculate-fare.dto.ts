import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ServiceCategoryWithCostDTO } from './service-category-with-cost.dto';

export enum CalculateFareError {
  RegionUnsupported = 'REGION_UNSUPPORTED',
  NoServiceInRegion = 'NO_SERVICE_IN_REGION',
}

registerEnumType(CalculateFareError, { name: 'CalculateFareError' });

@ObjectType('CalculateFare')
export class CalculateFareDTO {
  @Field(() => String)
  currency: string;
  @Field(() => Int)
  distance: number;
  @Field(() => Int)
  duration: number;
  @Field(() => [ServiceCategoryWithCostDTO])
  services: ServiceCategoryWithCostDTO[];
  @Field(() => CalculateFareError, { nullable: true })
  error?: CalculateFareError;
}
