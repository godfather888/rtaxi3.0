import { Args, CONTEXT, Mutation, Resolver } from '@nestjs/graphql';
import { ForbiddenError } from '@nestjs/apollo';
import { OperatorPermission } from '@ridy/database';
import { ExportSessionToCsvInput } from '../../dto/export-session-to-csv.input';
import { CreatePayoutSessionInput } from '../../dto/create-payout-session.input';
import { OperatorService } from '../../../operator/operator.service';
import type { UserContext } from '../../../auth/authenticated-admin';
import { Inject, UseGuards } from '@nestjs/common';
import { RunAutoPayoutInput } from '../../dto/run-auto-payout.input';
import { ParkingPayoutSessionDTO } from './dto/parking-payout-session.dto';
import { ParkingPayoutService } from '../parking/parking-payout.service';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';

@Resolver()
@UseGuards(JwtAuthGuard)
export class ParkingPayoutResolver {
  constructor(
    private parkingPayoutService: ParkingPayoutService,
    private operatorService: OperatorService,
    @Inject(CONTEXT) private context: UserContext,
  ) {}

  @Mutation(() => ParkingPayoutSessionDTO)
  async createParkingPayoutSession(
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
    return this.parkingPayoutService.createPayoutSession(
      this.context.req.user.id,
      input,
    );
  }

  @Mutation(() => String)
  async exportParkingPayoutSessionToCsv(
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
    const csv = await this.parkingPayoutService.exportToCsv(input);
    return csv.url;
  }

  @Mutation(() => Boolean)
  async runParkingAutoPayout(
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
    await this.parkingPayoutService.runAutoPayout(input);
    return true;
  }
}
