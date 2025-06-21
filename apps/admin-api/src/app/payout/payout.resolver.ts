import { Query, Resolver } from '@nestjs/graphql';
import { PayoutService } from './payout.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Resolver()
@UseGuards(JwtAuthGuard)
export class PayoutResolver {
  constructor(private payoutService: PayoutService) {}

  @Query(() => [String])
  async supportedCurrencies(): Promise<string[]> {
    return this.payoutService.getSupportedCurrencies();
  }

  // @Mutation(() => PayoutSessionDTO)
  // async createPayoutSession(
  //   @Args('input', { type: () => CreatePayoutSessionInput })
  //   input: CreatePayoutSessionInput,
  // ) {
  //   const hasPermission = await this.operatorService.hasPermissionBoolean(
  //     this.context.req.user.id,
  //     OperatorPermission.Payouts_Edit,
  //   );
  //   if (!hasPermission) {
  //     throw new ForbiddenError(
  //       'You do not have permission to perform this action',
  //     );
  //   }
  //   return this.payoutService.createPayoutSession(
  //     this.context.req.user.id,
  //     input,
  //   );
  // }

  // @Mutation(() => String)
  // async exportSessionToCsv(
  //   @Args('input', { type: () => ExportSessionToCsvInput })
  //   input: ExportSessionToCsvInput,
  // ) {
  //   const hasPermission = await this.operatorService.hasPermissionBoolean(
  //     this.context.req.user.id,
  //     OperatorPermission.Payouts_Edit,
  //   );
  //   if (!hasPermission) {
  //     throw new ForbiddenError(
  //       'You do not have permission to perform this action',
  //     );
  //   }
  //   const csv = await this.payoutService.exportToCsv(input);
  //   return csv.url;
  // }

  // @Mutation(() => Boolean)
  // async runAutoPayout(
  //   @Args('input', { type: () => RunAutoPayoutInput })
  //   input: RunAutoPayoutInput,
  // ): Promise<boolean> {
  //   const hasPermission = await this.operatorService.hasPermissionBoolean(
  //     this.context.req.user.id,
  //     OperatorPermission.Payouts_Edit,
  //   );
  //   if (!hasPermission) {
  //     throw new ForbiddenError(
  //       'You do not have permission to perform this action',
  //     );
  //   }
  //   await this.payoutService.runAutoPayout(input);
  //   return true;
  // }

  // @Mutation(() => Boolean)
  // async manualPayout(
  //   @Args('input', { type: () => ManualPayoutInput }) input: ManualPayoutInput,
  // ): Promise<boolean> {
  //   const hasPermission = await this.operatorService.hasPermissionBoolean(
  //     this.context.req.user.id,
  //     OperatorPermission.Payouts_Edit,
  //   );
  //   if (!hasPermission) {
  //     throw new ForbiddenError(
  //       'You do not have permission to perform this action',
  //     );
  //   }
  //   return this.payoutService.manualPayout(input);
  // }

  // @Mutation(() => PayoutSessionDTO)
  // async updatePayoutSession(
  //   @Args('id', { type: () => ID }) id: number,
  //   @Args('input', { type: () => UpdatePayoutSessionInput })
  //   input: UpdatePayoutSessionInput,
  // ): Promise<PayoutSessionDTO> {
  //   const hasPermission = await this.operatorService.hasPermissionBoolean(
  //     this.context.req.user.id,
  //     OperatorPermission.Payouts_Edit,
  //   );
  //   if (!hasPermission) {
  //     throw new ForbiddenError(
  //       'You do not have permission to perform this action',
  //     );
  //   }
  //   return this.payoutService.updatePayoutSession(id, input);
  // }
}
