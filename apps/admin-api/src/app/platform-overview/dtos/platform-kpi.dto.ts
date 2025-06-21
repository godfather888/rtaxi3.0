import { Field, Float, ObjectType } from '@nestjs/graphql';
import { AppType } from '@ridy/database';

@ObjectType()
export class KPIAppBreakdown {
  @Field(() => AppType, {
    description: 'Application key or enum value (e.g., "taxi")',
  })
  app: AppType;

  @Field(() => Float, {
    description: 'Value for this app in the current time period',
  })
  value: number;

  @Field(() => Float, {
    description: 'Percentage share of the KPI that belongs to this app',
  })
  percentage: number;
}

@ObjectType()
export class PlatformKPIItem {
  @Field(() => String, {
    description: 'Display name of the KPI (e.g., "Total Orders")',
  })
  name: string;

  @Field(() => String, {
    nullable: true,
    description: 'Unit of measurement (e.g., "orders", "$")',
  })
  unit?: string;

  @Field(() => Float, {
    description: 'Total value for the current time period',
  })
  total: number;

  @Field(() => Float, {
    description: 'Percentage change compared to the previous time period',
  })
  change: number;

  // @Field(() => String, {
  //   description: 'Direction of change: "up", "down", or "neutral"',
  // })
  // get trendDirection(): string {
  //   if (this.change > 0) return 'up';
  //   if (this.change < 0) return 'down';
  //   return 'neutral';
  // }

  @Field(() => [KPIAppBreakdown], {
    description: 'Breakdown of KPI value by sub-application (e.g., taxi, shop)',
  })
  breakdown: KPIAppBreakdown[];
}

@ObjectType()
export class PlatformKPI {
  @Field(() => PlatformKPIItem)
  totalOrders: PlatformKPIItem;

  @Field(() => PlatformKPIItem)
  totalRevenue: PlatformKPIItem;

  @Field(() => PlatformKPIItem)
  activeCustomers: PlatformKPIItem;
}
