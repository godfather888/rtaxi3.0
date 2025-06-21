import { ObjectType, registerEnumType, Field, Float } from '@nestjs/graphql';
import { Point } from '@ridy/database';
import { ServiceCategoryDTO } from '../../service/dto/service-category.dto';

export enum CalculateFareError {
  RegionUnsupported = 'REGION_UNSUPPORTED',
  NoServiceInRegion = 'NO_SERVICE_IN_REGION',
}

registerEnumType(CalculateFareError, { name: 'CalculateFareError' });

@ObjectType()
export class CalculateFareDTO {
  @Field(() => String, { nullable: false })
  currency!: string;
  @Field(() => Float, { nullable: false })
  distance!: number;
  @Field(() => Float, { nullable: false })
  duration!: number;
  @Field(() => [Point], { nullable: false })
  directions!: Point[];
  @Field(() => [ServiceCategoryDTO], { nullable: false })
  services!: ServiceCategoryDTO[];
  @Field(() => CalculateFareError, { nullable: true })
  error?: CalculateFareError;
}
