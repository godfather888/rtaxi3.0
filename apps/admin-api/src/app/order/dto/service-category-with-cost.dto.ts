import { IDField } from '@ptc-org/nestjs-query-graphql';
import { ID, ObjectType, Field } from '@nestjs/graphql';
import { ServiceWithCostDTO } from './service-with-cost.dto';

@ObjectType('ServiceCategoryWithCost')
export class ServiceCategoryWithCostDTO {
  @IDField(() => ID)
  id!: number;
  @IDField(() => String)
  name!: string;
  @IDField(() => [ServiceWithCostDTO])
  services: ServiceWithCostDTO[];
}
