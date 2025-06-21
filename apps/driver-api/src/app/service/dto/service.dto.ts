import {
  IDField,
  Relation,
  UnPagedRelation,
} from '@ptc-org/nestjs-query-graphql';
import { ID, ObjectType, Field, Float } from '@nestjs/graphql';
import { ServicePaymentMethod } from '@ridy/database';
import { MediaDTO } from '../../upload/media.dto';
import { ServiceOptionDTO } from '../../order/dto/service-option.dto';

@ObjectType('Service')
@Relation('media', () => MediaDTO)
@UnPagedRelation('options', () => ServiceOptionDTO, {
  update: { enabled: true },
})
export class ServiceDTO {
  @IDField(() => ID)
  id!: number;
  @Field(() => String, { nullable: false })
  name!: string;
  @Field(() => ServicePaymentMethod, { nullable: false })
  paymentMethod!: ServicePaymentMethod;
  @Field(() => Float, { nullable: false })
  cancellationTotalFee!: number;
}
