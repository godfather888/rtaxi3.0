import { ID, ObjectType, Field } from '@nestjs/graphql';
import { PhoneNumberDTO } from '../../core/fragments/phone-number.dto';
import { MediaDTO } from '../../upload/media.dto';
import { IDField, Relation } from '@ptc-org/nestjs-query-graphql';

@ObjectType('Shop')
@Relation('image', () => MediaDTO)
export class ShopDTO {
  @IDField(() => ID)
  id!: number;
  @Field(() => String, { nullable: false })
  name!: string;
  @Field(() => PhoneNumberDTO, { nullable: false })
  mobileNumber!: PhoneNumberDTO;
  @Field(() => String, { nullable: false })
  address!: string;
}
