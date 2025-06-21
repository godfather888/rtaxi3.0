// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Injectable } from '@nestjs/common';
// import { PlatformKPI } from './dtos/platform-kpi.dto';
// import { KPIPeriod } from './inputs/platform-kpi.input';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository, SelectQueryBuilder } from 'typeorm';
// import { TaxiOrderEntity } from '@ridy/database';
// import { ShopOrderEntity } from '@ridy/database';
// import { ParkOrderEntity } from '@ridy/database';
// import { AppType } from 'license-verify';

// interface MetricData {
//   current: number;
//   last: number;
// }

// interface EntityMetrics {
//   orders: MetricData;
//   revenue: MetricData;
//   activeUsers: MetricData;
// }
// interface KPISection {
//   name: string;
//   unit: string;
//   total: number;
//   change: number;
//   breakdown: Array<{
//     app: AppType;
//     value: number;
//     percentage: number;
//   }>;
// }

// @Injectable()
// export class PlatformOverviewService {
//   constructor(
//     @InjectRepository(TaxiOrderEntity)
//     private taxiOrderRepository: Repository<TaxiOrderEntity>,
//     @InjectRepository(ShopOrderEntity)
//     private shopOrderRepository: Repository<ShopOrderEntity>,
//     @InjectRepository(ParkOrderEntity)
//     private parkOrderRepository: Repository<ParkOrderEntity>,
//   ) {}

//   async platformKPI({
//     period,
//     currency,
//   }: {
//     period: KPIPeriod;
//     currency: string;
//   }): Promise<PlatformKPI> {
//     const [taxiMetrics, shopMetrics, parkMetrics] = await Promise.all([
//       this.getEntityMetrics(this.taxiOrderRepository, period, currency),
//       this.getEntityMetrics(this.shopOrderRepository, period, currency),
//       this.getEntityMetrics(this.parkOrderRepository, period, currency),
//     ]);

//     return {
//       totalOrders: this.buildKpiSection(
//         'Total Orders',
//         'orders',
//         currency,
//         period,
//         [
//           { appType: AppType.Taxi, metrics: taxiMetrics.orders },
//           { appType: AppType.Shop, metrics: shopMetrics.orders },
//           { appType: AppType.Parking, metrics: parkMetrics.orders },
//         ],
//       ),
//       totalRevenue: this.buildKpiSection(
//         'Total Revenue',
//         currency,
//         currency,
//         period,
//         [
//           { appType: AppType.Taxi, metrics: taxiMetrics.revenue },
//           { appType: AppType.Shop, metrics: shopMetrics.revenue },
//           { appType: AppType.Parking, metrics: parkMetrics.revenue },
//         ],
//       ),
//       activeCustomers: this.buildKpiSection(
//         'Active Customers',
//         'users',
//         currency,
//         period,
//         [
//           { appType: AppType.Taxi, metrics: taxiMetrics.activeUsers },
//           { appType: AppType.Shop, metrics: shopMetrics.activeUsers },
//           { appType: AppType.Parking, metrics: parkMetrics.activeUsers },
//         ],
//       ),
//     };
//   }

//   private async getEntityMetrics(
//     repository: Repository<any>,
//     period: KPIPeriod,
//     currency: string,
//     costColumn: string = 'totalCost',
//     userIdColumn: string = 'userId',
//   ): Promise<EntityMetrics> {
//     const currentPeriodDates = {
//       startDate: this.getStartDate(period),
//       endDate: this.getEndDate(period),
//     };
//     const lastPeriodDates = {
//       startDate: this.getLastPeriodStartDate(period),
//       endDate: this.getLastPeriodEndDate(period),
//     };

//     const isAllTime = period === KPIPeriod.AllTime;

//     const buildBaseQuery = (
//       startDate: Date,
//       endDate: Date,
//     ): SelectQueryBuilder<any> => {
//       return repository
//         .createQueryBuilder('entity')
//         .where('entity.createdAt >= :startDate', { startDate })
//         .andWhere('entity.createdAt <= :endDate', { endDate })
//         .andWhere('entity.currency = :currency', { currency });
//     };

//     const [
//       currentOrders,
//       lastOrders,
//       currentRevenueRaw,
//       lastRevenueRaw,
//       currentActiveUsersRaw,
//       lastActiveUsersRaw,
//     ] = await Promise.all([
//       buildBaseQuery(
//         currentPeriodDates.startDate,
//         currentPeriodDates.endDate,
//       ).getCount(),
//       isAllTime
//         ? Promise.resolve(0)
//         : buildBaseQuery(
//             lastPeriodDates.startDate,
//             lastPeriodDates.endDate,
//           ).getCount(),

//       buildBaseQuery(currentPeriodDates.startDate, currentPeriodDates.endDate)
//         .select(`SUM(entity.${costColumn})`, 'total')
//         .getRawOne(),
//       isAllTime
//         ? Promise.resolve({ total: 0 })
//         : buildBaseQuery(lastPeriodDates.startDate, lastPeriodDates.endDate)
//             .select(`SUM(entity.${costColumn})`, 'total')
//             .getRawOne(),

//       buildBaseQuery(currentPeriodDates.startDate, currentPeriodDates.endDate)
//         .select(`COUNT(DISTINCT entity.${userIdColumn})`, 'count')
//         .getRawOne(),
//       isAllTime
//         ? Promise.resolve({ count: 0 })
//         : buildBaseQuery(lastPeriodDates.startDate, lastPeriodDates.endDate)
//             .select(`COUNT(DISTINCT entity.${userIdColumn})`, 'count')
//             .getRawOne(),
//     ]);

//     return {
//       orders: { current: currentOrders, last: lastOrders as number },
//       revenue: {
//         current: currentRevenueRaw?.total ?? 0,
//         last: (lastRevenueRaw as any)?.total ?? 0,
//       },
//       activeUsers: {
//         current: currentActiveUsersRaw?.count ?? 0,
//         last: (lastActiveUsersRaw as any)?.count ?? 0,
//       },
//     };
//   }

//   private buildKpiSection(
//     name: string,
//     unit: string,
//     currency: string, // currency is part of the unit for revenue, but passed for consistency
//     period: KPIPeriod,
//     appData: Array<{ appType: AppType; metrics: MetricData }>,
//   ): KPISection {
//     const totalCurrent = appData.reduce(
//       (sum, data) => sum + data.metrics.current,
//       0,
//     );
//     const totalLast = appData.reduce((sum, data) => sum + data.metrics.last, 0);

//     let change: number;
//     if (period === KPIPeriod.AllTime) {
//       // For AllTime, "last period" is not meaningful for change calculation in the same way.
//       // If totalLast is 0 (as it would be for AllTime's "last period"),
//       // change is 0 if totalCurrent is also 0, otherwise, it could be considered 100% or undefined.
//       // We'll set it to 0 if totalCurrent is 0, or if no meaningful comparison.
//       // The original logic implied last period values are 0 for AllTime.
//       change = totalCurrent > 0 && totalLast === 0 ? 100 : 0; // Or handle as per business rule for AllTime change.
//     } else if (totalLast === 0) {
//       change = totalCurrent === 0 ? 0 : 100; // 100% increase if current is > 0 from 0.
//     } else {
//       change = ((totalCurrent - totalLast) / totalLast) * 100;
//     }

//     // Ensure change is a finite number, default to 0 if NaN or Infinity
//     if (isNaN(change) || !isFinite(change)) {
//       change = 0;
//     }

//     return {
//       name,
//       unit: name === 'Total Revenue' ? currency : unit,
//       total: totalCurrent,
//       change,
//       breakdown: appData.map((data) => ({
//         app: data.appType,
//         value: data.metrics.current,
//         percentage:
//           totalCurrent === 0 ? 0 : (data.metrics.current / totalCurrent) * 100,
//       })),
//     };
//   }

//   private getPeriodDuration(period: KPIPeriod): number {
//     switch (period) {
//       case KPIPeriod.Last7Days:
//         return 7 * 24 * 60 * 60 * 1000;
//       case KPIPeriod.Last30Days:
//         return 30 * 24 * 60 * 60 * 1000;
//       case KPIPeriod.Last90Days:
//         return 90 * 24 * 60 * 60 * 1000;
//       case KPIPeriod.Last365Days:
//         return 365 * 24 * 60 * 60 * 1000;
//       default:
//         return 0;
//     }
//   }

//   getStartDate(period: KPIPeriod): Date {
//     if (period === KPIPeriod.AllTime) return new Date(0);
//     const duration = this.getPeriodDuration(period);
//     if (duration === 0)
//       throw new Error('Invalid KPI period for start date calculation');
//     return new Date(Date.now() - duration);
//   }

//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   getEndDate(period: KPIPeriod): Date {
//     return new Date(); // Current date for all periods except potentially AllTime if defined differently
//   }

//   getLastPeriodStartDate(period: KPIPeriod): Date {
//     if (period === KPIPeriod.AllTime) return new Date(0); // No meaningful "last period" start for AllTime
//     const currentStartDate = this.getStartDate(period);
//     const duration = this.getPeriodDuration(period);
//     if (duration === 0)
//       throw new Error(
//         'Invalid KPI period for last period start date calculation',
//       );
//     return new Date(currentStartDate.getTime() - duration);
//   }

//   getLastPeriodEndDate(period: KPIPeriod): Date {
//     if (period === KPIPeriod.AllTime) return new Date(0); // No meaningful "last period" end for AllTime
//     // The end of the last period is the start of the current period.
//     return this.getStartDate(period);
//   }
// }
