import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProviderTransactionEntity } from '@ridy/database';
import { Repository } from 'typeorm';
import { InsightsHelperService } from '../../core/services/insights-helper.service';
import { FinancialTimeline } from '../../core/dto/financial-timeline.dto';
import { ChartFilterInput } from '../../core/dto/chart-filter.input';
import { RevenueExpensePair } from './dto/revenue-expense-pair.dto';
import { ProviderExpenseBreakdownRecord } from './dto/provider-expense-breakdown-record.dto';

@Injectable()
export class ProviderWalletInsightsService {
  constructor(
    @InjectRepository(ProviderTransactionEntity)
    private providerTransactionEntity: Repository<ProviderTransactionEntity>,
    private insightsHelperService: InsightsHelperService,
  ) {}

  async getProviderWalletBalanceHistory(
    currency: string,
    input: ChartFilterInput,
  ): Promise<FinancialTimeline[]> {
    let query = this.providerTransactionEntity
      .createQueryBuilder('transaction')
      .select('currency', 'currency')
      .select('SUM(transaction.amount)', 'amount')
      .where('transaction.currency = :currency', { currency });
    query = this.insightsHelperService.getQueryBuilderForChartFilterInput(
      query,
      'transaction',
      'createdAt',
      input,
    );
    return query.getRawMany();
  }

  async getProviderRevenueExpenseHistory(
    currency: string,
    input: ChartFilterInput,
  ): Promise<RevenueExpensePair[]> {
    return [];
  }

  async getProviderExpenseBreakdownHistory(
    currency: string,
    input: ChartFilterInput,
  ): Promise<ProviderExpenseBreakdownRecord[]> {
    return [];
  }
}
