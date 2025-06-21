import { Inject, UseGuards } from '@nestjs/common';
import { Args, CONTEXT, ID, Mutation, Resolver } from '@nestjs/graphql';
import { OperatorPermission } from '@ridy/database';
import { TransactionAction } from '@ridy/database';
import { TransactionStatus } from '@ridy/database';
import { OperatorEntity } from '@ridy/database';
import { SharedRiderService } from '@ridy/database';
import { ForbiddenError } from '@nestjs/apollo';
import type { UserContext } from '../auth/authenticated-admin';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RiderTransactionInput } from './dto/rider-transaction.input';
import { RiderWalletDTO } from './dto/rider-wallet.dto';
import { CustomerDTO } from './dto/customer.dto';
import { DataSource } from 'typeorm';
import { CustomerService } from './customer.service';
import { SharedCustomerWalletService } from '@ridy/database';

@Resolver()
@UseGuards(JwtAuthGuard)
export class RiderResolver {
  constructor(
    private sharedRiderService: SharedRiderService,
    private sharedWalletService: SharedCustomerWalletService,
    private readonly customerService: CustomerService,
    @Inject(CONTEXT)
    private context: UserContext,
    private datasource: DataSource,
  ) {}

  @Mutation(() => RiderWalletDTO)
  async createRiderTransaction(
    @Args('input', { type: () => RiderTransactionInput })
    input: RiderTransactionInput,
  ) {
    input.amount =
      input.action == TransactionAction.Recharge
        ? Math.abs(input.amount)
        : Math.abs(input.amount) * -1;
    return this.sharedWalletService.rechargeWallet({
      ...input,
      operatorId: this.context.req.user.id,
      status: TransactionStatus.Done,
    });
  }

  @Mutation(() => CustomerDTO)
  async deleteOneRider(
    @Args('id', { type: () => ID }) id: number,
  ): Promise<void> {
    const operator = await this.datasource
      .getRepository(OperatorEntity)
      .findOne({
        where: { id: this.context.req.user.id },
        relations: { role: true },
      });
    if (!operator.role.permissions.includes(OperatorPermission.Riders_Edit)) {
      throw new ForbiddenError('PERMISSION_NOT_GRANTED');
    }
    await this.sharedRiderService.repo.delete({ id });
  }

  @Mutation(() => Boolean)
  async terminateCustomerLoginSession(
    @Args('sessionId', { type: () => ID }) sessionId: string,
  ) {
    if (process.env.DEMO_MODE != null) {
      throw new ForbiddenError('Action not allowed in demo mode.');
    }
    const result = await this.customerService.terminateLoginSession(sessionId);
    return result.affected > 0;
  }
}
