import {
  FilterableField,
  IDField,
  Relation,
} from '@ptc-org/nestjs-query-graphql';
import { Float, ID, ObjectType, Field } from '@nestjs/graphql';
import { CustomerDTO } from './customer.dto';

@ObjectType('RiderWallet')
@Relation('rider', () => CustomerDTO, { nullable: true })
export class RiderWalletDTO {
  @IDField(() => ID)
  id: number;
  @FilterableField(() => Float)
  balance: number;
  @FilterableField()
  currency: string;
  @FilterableField(() => ID)
  riderId?: number;
}
