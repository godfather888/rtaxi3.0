import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { AccountingService } from './accounting.service';
import { ChartTimeframe } from './dto/chart-timeframe.enum.js';
import { ExportArgsDTO, ExportResultDTO } from './dto/export.dto';
import { IncomeResultItem } from './dto/income-result-item.dto';
import { RegistrationResultItemDto } from './dto/registration-result-item.dto';
import { RequestResultItem } from './dto/request-result-item.dto';
import { TotalDailyPairDTO } from './dto/total-daily-pair.dto';

@Resolver()
export class AccountingResolver {
  constructor(private service: AccountingService) {}

  @Query(() => [IncomeResultItem])
  async incomeChart(
    @Args('timeframe', { type: () => ChartTimeframe }) input: ChartTimeframe,
  ): Promise<IncomeResultItem[]> {
    const items = await this.service.incomeChart(input);
    return items;
  }

  @Query(() => [RequestResultItem])
  async requestChart(
    @Args('timeframe', { type: () => ChartTimeframe }) input: ChartTimeframe,
  ): Promise<RequestResultItem[]> {
    const items = await this.service.requestsChart(input);
    return items;
  }

  @Query(() => [RegistrationResultItemDto])
  async driverRegistrations(
    @Args('timeframe', { type: () => ChartTimeframe }) input: ChartTimeframe,
  ): Promise<RegistrationResultItemDto[]> {
    const items = await this.service.driverRegistrations(input);
    return items;
  }

  @Query(() => [RegistrationResultItemDto])
  async riderRegistrations(
    @Args('timeframe', { type: () => ChartTimeframe }) input: ChartTimeframe,
  ): Promise<RegistrationResultItemDto[]> {
    const items = await this.service.riderRegistrations(input);
    return items;
  }

  @Query(() => ExportResultDTO)
  @UseGuards(JwtAuthGuard)
  async export(
    @Args('input', { type: () => ExportArgsDTO }) input: ExportArgsDTO,
  ) {
    return this.service.exportTable(input);
  }

  @Query(() => TotalDailyPairDTO)
  @UseGuards(JwtAuthGuard)
  async totalRevenue(
    @Args('currency', { type: () => String }) currency: string,
  ): Promise<TotalDailyPairDTO> {
    return this.service.totalRevenue({
      currency,
    });
  }

  @Query(() => TotalDailyPairDTO)
  @UseGuards(JwtAuthGuard)
  async totaloutstandingUserBalances(
    @Args('currency', { type: () => String }) currency: string,
  ): Promise<TotalDailyPairDTO> {
    return this.service.totaloutstandingUserBalances({
      currency,
    });
  }

  @Query(() => TotalDailyPairDTO)
  @UseGuards(JwtAuthGuard)
  async totalExpenses(
    @Args('currency', { type: () => String }) currency: string,
  ): Promise<TotalDailyPairDTO> {
    return this.service.totalExpenses({
      currency,
    });
  }
}
