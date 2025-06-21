import { ID, ObjectType, Field } from '@nestjs/graphql';
import { FilterableField, Relation } from '@ptc-org/nestjs-query-graphql';
import { ServiceDTO } from '../../service/dto/service.dto';

@ObjectType()
@Relation('service', () => ServiceDTO)
export class DriverServicesServiceDTO {
  @FilterableField(() => ID, { nullable: false })
  driverId!: number;
  @FilterableField(() => ID, { nullable: false })
  serviceId!: number;
  @Field(() => Boolean, { nullable: false })
  driverEnabled!: boolean;
}
