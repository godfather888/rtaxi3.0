import {
  IDField,
  Relation,
  UnPagedRelation,
} from '@ptc-org/nestjs-query-graphql';
import { Field, ID, Int, ObjectType, Float } from '@nestjs/graphql';
import { MediaDTO } from '../../upload/media.dto';
import { CarColorDTO } from './car-color.dto';
import { CarModelDTO } from './car-model.dto';
import { DriverServicesServiceDTO } from './driver-services-service.dto';

@ObjectType('Driver')
@Relation('car', () => CarModelDTO, {
  nullable: true,
})
@Relation('carColor', () => CarColorDTO, {
  nullable: true,
})
@Relation('media', () => MediaDTO, {
  nullable: true,
})
@UnPagedRelation('enabledServices', () => DriverServicesServiceDTO)
export class DriverDTO {
  @IDField(() => ID, { nullable: false })
  id!: number;
  @Field(() => String, { nullable: false })
  mobileNumber!: string;
  @Field(() => String, { nullable: true })
  firstName?: string;
  @Field(() => String, { nullable: true })
  carPlate?: string;
  @Field(() => String, { nullable: true })
  lastName?: string;
  @Field(() => Int, { nullable: true })
  rating?: number;
  @Field(() => Float, { nullable: false })
  reviewCount!: number;
}
