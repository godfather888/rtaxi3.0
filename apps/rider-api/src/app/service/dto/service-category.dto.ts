import { IDField } from '@ptc-org/nestjs-query-graphql';
import { ID, ObjectType, Field } from '@nestjs/graphql';
import { ServiceDTO } from './service.dto';

//@UnPagedRelation('services', () => ServiceDTO)
@ObjectType('ServiceCategory')
export class ServiceCategoryDTO {
  @IDField(() => ID)
  id!: number;
  @Field(() => String, { nullable: false })
  name!: string;
  @Field(() => [ServiceDTO], { nullable: false })
  services!: ServiceDTO[];
}
