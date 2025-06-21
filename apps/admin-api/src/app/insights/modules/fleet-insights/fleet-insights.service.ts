import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FleetEntity } from '@ridy/database';
import { Repository } from 'typeorm';
import { ChartFilterInput } from '../../core/dto/chart-filter.input';
import { FinancialTimeline } from '../../core/dto/financial-timeline.dto';

@Injectable()
export class FleetInsightsService {
  constructor(
    @InjectRepository(FleetEntity)
    private fleetRepository: Repository<FleetEntity>,
  ) {}

  getFleetIncome(
    fleetId: number,
    input: ChartFilterInput,
  ): PromiseLike<FinancialTimeline[]> {
    const query = this.fleetRepository
      .createQueryBuilder('fleet')
      .select('fleet.name', 'name')
      .addSelect('SUM(transaction.amount)', 'amount')
      .addSelect('DATE(transaction.transactionTimestamp)', 'date')
      .leftJoin('fleet.transactions', 'transaction')
      .where('transaction.transactionTimestamp >= :startDate', {
        startDate: input.startDate,
      })
      .andWhere('transaction.transactionTimestamp <= :endDate', {
        endDate: input.endDate,
      })
      .addGroupBy('date')

      .groupBy('name')
      .andWhere('fleet.id = :fleetId', { fleetId })
      .orderBy('date', 'ASC');
    return query.getRawMany();
  }
}
