import { Args, CONTEXT, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TaxiPayoutService } from './taxi-payout.service';
import { ForbiddenError } from '@nestjs/apollo';
import { OperatorPermission } from '@ridy/database';
import { ExportSessionToCsvInput } from '../../dto/export-session-to-csv.input';
import { CreatePayoutSessionInput } from '../../dto/create-payout-session.input';
import { OperatorService } from '../../../operator/operator.service';
import type { UserContext } from '../../../auth/authenticated-admin';
import { Inject, UseGuards } from '@nestjs/common';
import { RunAutoPayoutInput } from '../../dto/run-auto-payout.input';
import { TaxiPayoutSessionDTO } from './dto/taxi-payout-session.dto';
import { PayoutStatisticsDTO } from '../../dto/payout-statistics.dto';
import { DriverTransactionDTO } from '../../../driver/dto/driver-transaction.dto';
import { ManualPayoutInput } from '../../dto/manual-payout.input';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';

@Resolver()
@UseGuards(JwtAuthGuard)
export class TaxiPayoutResolver {
  constructor(
    private taxiPayoutService: TaxiPayoutService,
    private operatorService: OperatorService,
    @Inject(CONTEXT) private context: UserContext,
  ) {}

  @Mutation(() => DriverTransactionDTO)
  async taxiManualPayout(
    @Args('input', { type: () => ManualPayoutInput }) input: ManualPayoutInput,
  ): Promise<DriverTransactionDTO> {
    const hasPermission = await this.operatorService.hasPermissionBoolean(
      this.context.req.user.id,
      OperatorPermission.Payouts_Edit,
    );
    if (!hasPermission) {
      throw new ForbiddenError(
        'You do not have permission to perform this action',
      );
    }
    return this.taxiPayoutService.manualPayout(input);
  }

  @Query(() => PayoutStatisticsDTO)
  async taxiPayoutStatistics(
    @Args('currency', { type: () => String, nullable: true }) currency?: string,
  ): Promise<PayoutStatisticsDTO> {
    return this.taxiPayoutService.getPayoutStatistics({ currency });
  }

  @Mutation(() => TaxiPayoutSessionDTO)
  async createTaxiPayoutSession(
    @Args('input', { type: () => CreatePayoutSessionInput })
    input: CreatePayoutSessionInput,
  ) {
    const hasPermission = await this.operatorService.hasPermissionBoolean(
      this.context.req.user.id,
      OperatorPermission.Payouts_Edit,
    );
    if (!hasPermission) {
      throw new ForbiddenError(
        'You do not have permission to perform this action',
      );
    }
    return this.taxiPayoutService.createPayoutSession(
      this.context.req.user.id,
      input,
    );
  }

  @Mutation(() => String)
  async exportTaxiPayoutSessionToCsv(
    @Args('input', { type: () => ExportSessionToCsvInput })
    input: ExportSessionToCsvInput,
  ) {
    const hasPermission = await this.operatorService.hasPermissionBoolean(
      this.context.req.user.id,
      OperatorPermission.Payouts_Edit,
    );
    if (!hasPermission) {
      throw new ForbiddenError(
        'You do not have permission to perform this action',
      );
    }
    const csv = await this.taxiPayoutService.exportToCsv(input);
    return csv.url;
  }

  @Mutation(() => Boolean)
  async runTaxiAutoPayout(
    @Args('input', { type: () => RunAutoPayoutInput })
    input: RunAutoPayoutInput,
  ): Promise<boolean> {
    const hasPermission = await this.operatorService.hasPermissionBoolean(
      this.context.req.user.id,
      OperatorPermission.Payouts_Edit,
    );
    if (!hasPermission) {
      throw new ForbiddenError(
        'You do not have permission to perform this action',
      );
    }
    await this.taxiPayoutService.runAutoPayout(input);
    return true;
  }
}
