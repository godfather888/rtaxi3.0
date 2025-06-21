import { Test } from '@nestjs/testing';
import * as DotEnv from 'dotenv';
import { CustomersInsightsService } from './customers-insights.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChartInterval } from '@ridy/database';
import { entities } from '@ridy/database';

describe('customersInsightsService', () => {
  let customersInsightsService: CustomersInsightsService;

  beforeEach(async () => {
    DotEnv.config();

    const moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: process.env.MYSQL_HOST,
          port: parseInt(process.env.MYSQL_PORT),
          username: process.env.MYSQL_USER,
          password: process.env.MYSQL_PASS,
          database: process.env.MYSQL_DB,
          entities: entities,
          logging: true,
        }),
        TypeOrmModule.forFeature(entities),
      ],
      providers: [CustomersInsightsService],
    }).compile();

    customersInsightsService = await moduleRef.resolve(
      CustomersInsightsService,
    );
  });

  describe('getCustomersPerApp', () => {
    it('should return the number of customers per app', async () => {
      const result = await customersInsightsService.getCustomersPerApp();

      expect(result).toBeDefined();
    });
  });

  describe('revenuePerApp', () => {
    it('should return the revenue per app', async () => {
      const result = await customersInsightsService.revenuePerApp({
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31'),
        interval: ChartInterval.Yearly,
      });
      expect(result).toBeDefined();
    });
  });
});
