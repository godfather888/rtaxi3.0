import { Float, ID, ObjectType, Field } from '@nestjs/graphql';
import {
  FilterableField,
  IDField,
  Relation,
} from '@ptc-org/nestjs-query-graphql';
import { CustomerDTO } from '../../customer/dto/customer.dto';

@ObjectType('ParkingWallet')
@Relation('customer', () => CustomerDTO)
export class ParkingWalletDTO {
  @IDField(() => ID)
  id: number;

  @FilterableField(() => Float)
  balance: number;

  @FilterableField(() => String)
  currency: string;

  @FilterableField(() => ID)
  customerId: number;
}
