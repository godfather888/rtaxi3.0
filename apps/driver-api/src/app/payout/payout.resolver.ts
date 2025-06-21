import { Args, CONTEXT, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PayoutService } from './payout.service';
import { PayoutAccountDTO } from './dto/payout-account.dto';
import { Inject, UseGuards } from '@nestjs/common';
import { UserContext } from '../auth/authenticated-user';
import { PayoutMethodDTO } from './dto/payout-method.dto';
import {
  TopUpWalletResponse,
  TopUpWalletStatus,
} from '../wallet/dto/top-up-wallet.input';
import { PayoutAccountInput } from './dto/payout-account.input';
import { GetPayoutLinkUrlInput } from './dto/get-payout-link-url.input';
import { GqlAuthGuard } from '../auth/jwt-gql-auth.guard';
import { UpdatePayoutMethodInput } from './dto/update-payout-method.input';

@Resolver()
@UseGuards(GqlAuthGuard)
export class PayoutResolver {
  constructor(
    private payoutService: PayoutService,
    @Inject(CONTEXT)
    private readonly context: UserContext,
  ) {}

  @Mutation(() => PayoutAccountDTO)
  async markPayoutAccountAsDefault(
    @Args('payoutMethodId', { type: () => ID }) payoutMethodId: number,
  ): Promise<PayoutAccountDTO> {
    return this.payoutService.markPayoutAccountAsDefault({
      payoutMethodId: payoutMethodId,
      driverId: this.context.req.user.id,
    }) as unknown as PayoutAccountDTO;
  }

  @Mutation(() => PayoutAccountDTO)
  async updatePayoutMethod(
    @Args('input', { type: () => UpdatePayoutMethodInput })
    input: UpdatePayoutMethodInput,
  ): Promise<PayoutAccountDTO> {
    return this.payoutService.updatePayoutMethod({
      driverId: this.context.req.user.id,
      ...input,
    }) as unknown as PayoutAccountDTO;
  }

  @Query(() => [PayoutMethodDTO])
  async getSupportedPayoutMethods(): Promise<PayoutMethodDTO[]> {
    return this.payoutService.getSupportedPayoutMethods();
  }

  @Query(() => TopUpWalletResponse)
  async getPayoutLinkUrl(
    @Args('input', { type: () => GetPayoutLinkUrlInput })
    input: GetPayoutLinkUrlInput,
  ): Promise<TopUpWalletResponse> {
    const intentResult = await this.payoutService.getPayoutLinkUrl({
      driverId: this.context.req.user.id,
      payoutMethodId: input.gatewayId,
    });
    return {
      status: IntentResultToTopUpWalletStatus(intentResult.status),
      url: intentResult.url,
    };
  }

  @Mutation(() => PayoutAccountDTO)
  async createPayoutAccount(
    @Args('input', { type: () => PayoutAccountInput })
    input: PayoutAccountInput,
  ): Promise<PayoutAccountDTO> {
    return this.payoutService.createPayoutAccount({
      driverId: this.context.req.user.id,
      ...input,
    }) as unknown as PayoutAccountDTO;
  }
}

const IntentResultToTopUpWalletStatusMap: Map<
  'success' | 'redirect' | 'failed',
  TopUpWalletStatus
> = new Map([
  ['success', TopUpWalletStatus.OK],
  ['redirect', TopUpWalletStatus.Redirect],
  ['failed', TopUpWalletStatus.Failed],
]);

export const IntentResultToTopUpWalletStatus = (
  status: 'success' | 'redirect' | 'failed',
): TopUpWalletStatus => {
  return IntentResultToTopUpWalletStatusMap.get(status)!;
};
