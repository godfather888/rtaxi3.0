import { ID, ObjectType, Field, IDField } from '@nestjs/graphql';
import { FilterableField, Relation } from '@ptc-org/nestjs-query-graphql';
import { ServiceDTO } from '../../service/dto/service.dto';

@ObjectType()
@Relation('service', () => ServiceDTO)
export class DriverServicesServiceDTO {
  @FilterableField(() => ID)
    @Field(() => ID)
  driverId: number;
  @FilterableField(() => ID)
    @Field(() => ID)
  serviceId: number;
  @Field(() => Boolean, { nullable: false })
    driverEnabled: boolean;
}
