import {
  FilterableField,
  IDField,
  Relation,
} from '@ptc-org/nestjs-query-graphql';
import {
  ID,
  ObjectType,
  Field,
  Float,
  GraphQLISODateTime,
} from '@nestjs/graphql';
import { ProviderDeductTransactionType } from '@ridy/database';
import { ProviderRechargeTransactionType } from '@ridy/database';
import { TransactionAction } from '@ridy/database';
import { OperatorDTO } from '../../operator/dto/operator.dto';
import { TransactionStatus } from '@ridy/database';

@ObjectType('FleetTransaction')
@Relation('operator', () => OperatorDTO, { nullable: true })
export class FleetTransactionDTO {
  @IDField(() => ID)
  id!: number;
  @Field(() => GraphQLISODateTime, { nullable: false })
  transactionTimestamp!: Date;
  @FilterableField(() => TransactionStatus)
  status!: TransactionStatus;
  @FilterableField(() => TransactionAction)
  action!: TransactionAction;
  @FilterableField(() => ProviderDeductTransactionType, { nullable: true })
  deductType?: ProviderDeductTransactionType;
  @FilterableField(() => ProviderRechargeTransactionType, { nullable: true })
  rechargeType?: ProviderRechargeTransactionType;
  @Field(() => Float, { nullable: false })
  amount: number;
  @Field(() => String, { nullable: false })
  currency: string;
  @Field(() => String, { nullable: true })
  refrenceNumber?: string;
  @Field(() => String, { nullable: true })
  description?: string;
  @FilterableField(() => ID, { nullable: true })
  operatorId?: number;
  @FilterableField(() => ID, { nullable: true })
  requestId?: number;
  @FilterableField(() => ID, { nullable: false })
  fleetId: number;
}
