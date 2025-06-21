import { IDField } from '@ptc-org/nestjs-query-graphql';
import { Field, ID, Int, ObjectType, Float } from '@nestjs/graphql';
import { MediaDTO } from '../../upload/media.dto';
import { ServiceOptionDTO } from '../../service/dto/service-option.dto';

@ObjectType('ServiceWithCost')
export class ServiceWithCostDTO {
  @IDField(() => ID)
  id: number;
  @Field(() => String, { nullable: false })
    name: string;
  @Field({ nullable: true })
  description?: string;
  @Field(() => Int, { nullable: true })
  personCapacity?: number;
  @Field(() => Float, { nullable: false })
    cost: number;
  @Field(() => MediaDTO, { nullable: false })
    media: MediaDTO;
  @Field(() => [ServiceOptionDTO], { nullable: false })
    options: ServiceOptionDTO[];
}
