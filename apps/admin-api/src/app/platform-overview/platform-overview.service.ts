 
import { Injectable } from '@nestjs/common';
import { PlatformKPI } from './dtos/platform-kpi.dto';
import { KPIPeriod } from './inputs/platform-kpi.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaxiOrderEntity } from '@ridy/database';
import { ShopOrderEntity } from '@ridy/database';
import { ParkOrderEntity } from '@ridy/database';
import { AppType } from '@ridy/database';

@Injectable()
export class PlatformOverviewService {
  constructor(
    @InjectRepository(TaxiOrderEntity)
    private taxiOrderRepository: Repository<TaxiOrderEntity>,
    @InjectRepository(ShopOrderEntity)
    private shopOrderRepository: Repository<ShopOrderEntity>,
    @InjectRepository(ParkOrderEntity)
    private parkOrderRepository: Repository<ParkOrderEntity>,
  ) {}

  private getDateRange(period: KPIPeriod): { start: Date; end: Date } {
    const now = new Date();
    let days: number;
    switch (period) {
      case KPIPeriod.Last7Days:
        days = 7;
        break;
      case KPIPeriod.Last30Days:
        days = 30;
        break;
      case KPIPeriod.Last90Days:
        days = 90;
        break;
      case KPIPeriod.Last365Days:
        days = 365;
        break;
      case KPIPeriod.AllTime:
        return { start: new Date(0), end: now };
      default:
        throw new Error('Invalid KPI period');
    }
    return { start: new Date(now.getTime() - days * 86400000), end: now };
  }

  private getLastDateRange(period: KPIPeriod): { start: Date; end: Date } {
    const now = new Date();
    let days: number;
    switch (period) {
      case KPIPeriod.Last7Days:
        days = 7;
        break;
      case KPIPeriod.Last30Days:
        days = 30;
        break;
      case KPIPeriod.Last90Days:
        days = 90;
        break;
      case KPIPeriod.Last365Days:
        days = 365;
        break;
      case KPIPeriod.AllTime:
        return { start: new Date(0), end: new Date(0) };
      default:
        throw new Error('Invalid KPI period');
    }
    return {
      start: new Date(now.getTime() - days * 2 * 86400000),
      end: new Date(now.getTime() - days * 86400000),
    };
  }

  private async getCount(
    repo: Repository<any>,
    alias: string,
    currency: string,
    range: { start: Date; end: Date },
  ) {
    return repo
      .createQueryBuilder(alias)
      .where(`${alias}.createdAt >= :start`, { start: range.start })
      .andWhere(`${alias}.createdAt <= :end`, { end: range.end })
      .andWhere(`${alias}.currency = :currency`, { currency })
      .getCount();
  }

  private async getSum(
    repo: Repository<any>,
    alias: string,
    field: string,
    currency: string,
    range: { start: Date; end: Date },
  ) {
    const result = await repo
      .createQueryBuilder(alias)
      .select(`SUM(${alias}.${field})`, 'total')
      .where(`${alias}.createdAt >= :start`, { start: range.start })
      .andWhere(`${alias}.createdAt <= :end`, { end: range.end })
      .andWhere(`${alias}.currency = :currency`, { currency })
      .getRawOne();
    return Number(result.total) || 0;
  }

  private async getActiveUsers(
    repo: Repository<any>,
    alias: string,
    currency: string,
    range: { start: Date; end: Date },
  ) {
    const result = await repo
      .createQueryBuilder(alias)
      .select(`COUNT(DISTINCT ${alias}.userId)`, 'count')
      .where(`${alias}.createdAt >= :start`, { start: range.start })
      .andWhere(`${alias}.createdAt <= :end`, { end: range.end })
      .andWhere(`${alias}.currency = :currency`, { currency })
      .getRawOne();
    return Number(result.count) || 0;
  }

  async platformKPI({ period, currency }): Promise<PlatformKPI> {
    const range = this.getDateRange(period);
    const lastRange = this.getLastDateRange(period);

    const data = await Promise.all([
      this.getCount(this.taxiOrderRepository, 'taxiOrder', currency, range),
      this.getCount(this.shopOrderRepository, 'shopOrder', currency, range),
      this.getCount(this.parkOrderRepository, 'parkOrder', currency, range),

      this.getCount(this.taxiOrderRepository, 'taxiOrder', currency, lastRange),
      this.getCount(this.shopOrderRepository, 'shopOrder', currency, lastRange),
      this.getCount(this.parkOrderRepository, 'parkOrder', currency, lastRange),

      this.getSum(
        this.taxiOrderRepository,
        'taxiOrder',
        'totalCost',
        currency,
        range,
      ),
      this.getSum(
        this.shopOrderRepository,
        'shopOrder',
        'totalCost',
        currency,
        range,
      ),
      this.getSum(
        this.parkOrderRepository,
        'parkOrder',
        'totalCost',
        currency,
        range,
      ),

      this.getSum(
        this.taxiOrderRepository,
        'taxiOrder',
        'totalCost',
        currency,
        lastRange,
      ),
      this.getSum(
        this.shopOrderRepository,
        'shopOrder',
        'totalCost',
        currency,
        lastRange,
      ),
      this.getSum(
        this.parkOrderRepository,
        'parkOrder',
        'totalCost',
        currency,
        lastRange,
      ),

      this.getActiveUsers(
        this.taxiOrderRepository,
        'taxiOrder',
        currency,
        range,
      ),
      this.getActiveUsers(
        this.shopOrderRepository,
        'shopOrder',
        currency,
        range,
      ),
      this.getActiveUsers(
        this.parkOrderRepository,
        'parkOrder',
        currency,
        range,
      ),

      this.getActiveUsers(
        this.taxiOrderRepository,
        'taxiOrder',
        currency,
        lastRange,
      ),
      this.getActiveUsers(
        this.shopOrderRepository,
        'shopOrder',
        currency,
        lastRange,
      ),
      this.getActiveUsers(
        this.parkOrderRepository,
        'parkOrder',
        currency,
        lastRange,
      ),
    ]);

    const [
      taxiOrders,
      shopOrders,
      parkOrders,
      lastTaxiOrders,
      lastShopOrders,
      lastParkOrders,
      taxiRevenue,
      shopRevenue,
      parkRevenue,
      lastTaxiRevenue,
      lastShopRevenue,
      lastParkRevenue,
      taxiUsers,
      shopUsers,
      parkUsers,
      lastTaxiUsers,
      lastShopUsers,
      lastParkUsers,
    ] = data;

    const totalOrders = taxiOrders + shopOrders + parkOrders;
    const lastTotalOrders = lastTaxiOrders + lastShopOrders + lastParkOrders;
    const totalRevenue = taxiRevenue + shopRevenue + parkRevenue;
    const lastTotalRevenue =
      lastTaxiRevenue + lastShopRevenue + lastParkRevenue;
    const totalUsers = taxiUsers + shopUsers + parkUsers;
    const lastTotalUsers = lastTaxiUsers + lastShopUsers + lastParkUsers;

    const toItem = (
      name: string,
      unit: string,
      total: number,
      last: number,
      breakdown: { app: AppType; value: number }[],
    ): any => ({
      name,
      unit,
      total,
      change: last ? ((total - last) / last) * 100 : 0,
      breakdown: breakdown.map((b) => ({
        app: b.app,
        value: b.value,
        percentage: total ? (b.value / total) * 100 : 0,
      })),
    });

    return {
      totalOrders: toItem(
        'Total Orders',
        'orders',
        totalOrders,
        lastTotalOrders,
        [
          { app: AppType.Taxi, value: taxiOrders },
          { app: AppType.Shop, value: shopOrders },
          { app: AppType.Parking, value: parkOrders },
        ],
      ),
      totalRevenue: toItem(
        'Total Revenue',
        currency,
        totalRevenue,
        lastTotalRevenue,
        [
          { app: AppType.Taxi, value: taxiRevenue },
          { app: AppType.Shop, value: shopRevenue },
          { app: AppType.Parking, value: parkRevenue },
        ],
      ),
      activeCustomers: toItem(
        'Active Customers',
        'users',
        totalUsers,
        lastTotalUsers,
        [
          { app: AppType.Taxi, value: taxiUsers },
          { app: AppType.Shop, value: shopUsers },
          { app: AppType.Parking, value: parkUsers },
        ],
      ),
    };
  }
}
