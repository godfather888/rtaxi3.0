import {
  FilterableField,
  IDField,
  Relation,
} from '@ptc-org/nestjs-query-graphql';
import { Float, ID, ObjectType, Field } from '@nestjs/graphql';
import { DriverDTO } from './driver.dto';

@ObjectType('DriverWallet')
@Relation('driver', () => DriverDTO, { nullable: true })
export class DriverWalletDTO {
  @IDField(() => ID)
  id: number;
  @FilterableField(() => Float)
  balance: number;
  @FilterableField(() => String)
  currency: string;
  @FilterableField(() => ID)
  driverId?: number;
}
