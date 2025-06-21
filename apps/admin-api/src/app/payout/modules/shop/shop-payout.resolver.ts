import { Args, CONTEXT, Mutation, Resolver } from '@nestjs/graphql';
import { ShopPayoutService } from './shop-payout.service';
import { ForbiddenError } from '@nestjs/apollo';
import { OperatorPermission } from '@ridy/database';
import { ExportSessionToCsvInput } from '../../dto/export-session-to-csv.input';
import { CreatePayoutSessionInput } from '../../dto/create-payout-session.input';
import { OperatorService } from '../../../operator/operator.service';
import type { UserContext } from '../../../auth/authenticated-admin';
import { Inject, UseGuards } from '@nestjs/common';
import { RunAutoPayoutInput } from '../../dto/run-auto-payout.input';
import { ShopPayoutSessionDTO } from './dto/shop-payout-session.dto';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';

@Resolver()
@UseGuards(JwtAuthGuard)
export class ShopPayoutResolver {
  constructor(
    private shopPayoutService: ShopPayoutService,
    private operatorService: OperatorService,
    @Inject(CONTEXT) private context: UserContext,
  ) {}

  @Mutation(() => ShopPayoutSessionDTO)
  async createShopPayoutSession(
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
    return this.shopPayoutService.createPayoutSession(
      this.context.req.user.id,
      input,
    );
  }

  @Mutation(() => String)
  async exportShopPayoutSessionToCsv(
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
    const csv = await this.shopPayoutService.exportToCsv(input);
    return csv.url;
  }

  @Mutation(() => Boolean)
  async runShopAutoPayout(
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
    await this.shopPayoutService.runAutoPayout(input);
    return true;
  }
}
