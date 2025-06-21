import { Inject, UseGuards } from '@nestjs/common';
import { Args, CONTEXT, ID, Mutation, Resolver } from '@nestjs/graphql';
import { TransactionAction } from '@ridy/database';
import { SharedFleetService } from '@ridy/database';
import type { UserContext } from '../auth/authenticated-admin';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FleetTransactionInput } from './inputs/fleet-transaction.input';
import { FleetWalletDTO } from './dto/fleet-wallet.dto';
import { FleetService } from './fleet.service';

@Resolver()
@UseGuards(JwtAuthGuard)
export class FleetResolver {
  constructor(
    private sharedFleetService: SharedFleetService,
    private readonly fleetService: FleetService,
    @Inject(CONTEXT)
    private context: UserContext,
  ) {}

  @Mutation(() => FleetWalletDTO)
  async createFleetTransaction(
    @Args('input', { type: () => FleetTransactionInput })
    input: FleetTransactionInput,
  ) {
    input.amount =
      input.action == TransactionAction.Recharge
        ? Math.abs(input.amount)
        : Math.abs(input.amount) * -1;
    return this.sharedFleetService.rechargeWallet({
      ...input,
      operatorId: this.context.req.user.id,
    });
  }

  @Mutation(() => Boolean)
  async terminateFleetStaffSession(
    @Args('id', { type: () => ID }) id: number,
  ): Promise<boolean> {
    await this.fleetService.terminateFleetStaffSession({ id });
    return true;
  }
}
