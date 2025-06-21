import { Injectable, Logger } from '@nestjs/common';
import { ChartFilterInput } from '../dto/chart-filter.input';
import { SelectQueryBuilder } from 'typeorm';
import { ChartInterval } from '@ridy/database';

@Injectable()
export class InsightsHelperService {
  getQueryBuilderForChartFilterInput<T>(
    query: SelectQueryBuilder<T>,
    tableName: string,
    dateFieldName: string,
    input: ChartFilterInput,
  ): SelectQueryBuilder<T> {
    return query
      .select(this.selectField(tableName, dateFieldName, input), 'dateString')
      .select(`ANY_VALUE(${tableName}.${dateFieldName})`, 'anyDate')
      .where(`${tableName}.${dateFieldName} >= :startDate`, {
        startDate: input.startDate,
      })
      .andWhere(`${tableName}.${dateFieldName} <= :endDate`, {
        endDate: input.endDate,
      })
      .groupBy(this.selectField(tableName, dateFieldName, input));
  }

  private selectField(
    tableName: string,
    dateFieldName: string,
    input: ChartFilterInput,
  ) {
    Logger.log(`interval: ${input.interval}`, 'InsightsHelperService');
    Logger.log(`tableName: ${tableName}`, 'InsightsHelperService');
    Logger.log(`dateFieldName: ${dateFieldName}`, 'InsightsHelperService');
    switch (input.interval) {
      case ChartInterval.Daily:
        return `DATE(${tableName}.${dateFieldName})`;
      case ChartInterval.Monthly:
        return `DATE_FORMAT(${tableName}.${dateFieldName}, '%Y-%m')`;
      case ChartInterval.Yearly:
        return `DATE_FORMAT(${tableName}.${dateFieldName}, '%Y')`;
      case ChartInterval.Quarterly:
        return `CONCAT(YEAR(${tableName}.${dateFieldName}), '-', QUARTER(${tableName}.${dateFieldName}))`;
      default:
        throw new Error('Invalid interval');
    }
  }
}
