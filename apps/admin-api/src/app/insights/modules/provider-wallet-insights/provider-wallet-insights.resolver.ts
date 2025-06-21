import { Resolver, Query, Args } from '@nestjs/graphql';
import { ProviderWalletInsightsService } from './provider-wallet-insights.service';
import { FinancialTimeline } from '../../core/dto/financial-timeline.dto';
import { ChartFilterInput } from '../../core/dto/chart-filter.input';
import { RevenueExpensePair } from './dto/revenue-expense-pair.dto';
import { ProviderExpenseBreakdownRecord } from './dto/provider-expense-breakdown-record.dto';

@Resolver()
export class ProviderWalletInsightsResolver {
  constructor(
    private providerWalletInsightsService: ProviderWalletInsightsService,
  ) {}

  @Query(() => [FinancialTimeline])
  async providerWalletBalanceHistory(
    @Args('currency') currency: string,
    @Args('input', { type: () => ChartFilterInput }) input: ChartFilterInput,
  ): Promise<FinancialTimeline[]> {
    return this.providerWalletInsightsService.getProviderWalletBalanceHistory(
      currency,
      input,
    );
  }

  @Query(() => [RevenueExpensePair])
  providerRevenueExpenseHistory(
    @Args('currency') currency: string,
    @Args('input', { type: () => ChartFilterInput }) input: ChartFilterInput,
  ): Promise<RevenueExpensePair[]> {
    return this.providerWalletInsightsService.getProviderRevenueExpenseHistory(
      currency,
      input,
    );
  }

  @Query(() => [ProviderExpenseBreakdownRecord])
  providerExpenseBreakdownHistory(
    @Args('currency') currency: string,
    @Args('input', { type: () => ChartFilterInput }) input: ChartFilterInput,
  ): Promise<ProviderExpenseBreakdownRecord[]> {
    return this.providerWalletInsightsService.getProviderExpenseBreakdownHistory(
      currency,
      input,
    );
  }
}
