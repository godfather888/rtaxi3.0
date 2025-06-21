// import { Test, TestingModule } from '@nestjs/testing';
// import { ProviderWalletInsightsService } from './provider-wallet-insights.service';
// import { getRepositoryToken } from '@nestjs/typeorm';
// import { ProviderTransactionEntity } from '@ridy/database';
// import { InsightsHelperService } from '../../core/services/insights-helper.service';
// import { ChartFilterInput } from '../../core/dto/chart-filter.input';
// import { Repository } from 'typeorm';
// import { TransactionAction } from '@ridy/database';
// import { ChartInterval } from '@ridy/database';
// import { beforeEach, describe, expect, it, jest } from '@jest/globals';
// import { ProviderExpenseType } from '@ridy/database';

// describe('ProviderWalletInsightsService', () => {
//   let service: ProviderWalletInsightsService;
//   let providerTransactionRepository: Repository<ProviderTransactionEntity>;
//   let insightsHelperService: InsightsHelperService;

//   // Mock data for testing
//   const mockTransactions = [
//     {
//       id: 1,
//       createdAt: new Date('2023-01-15'),
//       action: TransactionAction.Recharge,
//       amount: 100,
//       currency: 'USD',
//     },
//     {
//       id: 2,
//       createdAt: new Date('2023-01-20'),
//       action: TransactionAction.Deduct,
//       amount: -50,
//       currency: 'USD',
//     },
//     {
//       id: 3,
//       createdAt: new Date('2023-01-25'),
//       action: TransactionAction.Recharge,
//       amount: 75,
//       currency: 'USD',
//     },
//     {
//       id: 4,
//       createdAt: new Date('2023-01-30'),
//       action: TransactionAction.Recharge,
//       amount: 200,
//       currency: 'EUR',
//     },
//   ];

//   // Mock query builder and its methods
//   const mockQueryBuilder = {
//     select: jest.fn().mockReturnThis(),
//     where: jest.fn().mockReturnThis(),
//     andWhere: jest.fn().mockReturnThis(),
//     groupBy: jest.fn().mockReturnThis(),
//     getRawMany: jest
//       .fn()
//       .mockImplementation(() => Promise.resolve([
//         { currency: 'USD', amount: '125', dateString: '2023-01' },
//       ])),
//   };

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         ProviderWalletInsightsService,
//         {
//           provide: getRepositoryToken(ProviderTransactionEntity),
//           useValue: {
//             createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilder),
//             find: jest.fn().mockResolvedValue(mockTransactions),
//           },
//         },
//         {
//           provide: InsightsHelperService,
//           useValue: {
//             getQueryBuilderForChartFilterInput: jest.fn((query) => query),
//           },
//         },
//       ],
//     }).compile();

//     service = module.get<ProviderWalletInsightsService>(
//       ProviderWalletInsightsService,
//     );
//     providerTransactionRepository = module.get<
//       Repository<ProviderTransactionEntity>
//     >(getRepositoryToken(ProviderTransactionEntity));
//     insightsHelperService = module.get<InsightsHelperService>(
//       InsightsHelperService,
//     );
//   });

//   describe('getProviderWalletBalanceHistory', () => {
//     it('should return wallet balance history for a specific currency', async () => {
//       // Test input
//       const currency = 'USD';
//       const filterInput: ChartFilterInput = {
//         startDate: new Date('2023-01-01'),
//         endDate: new Date('2023-01-31'),
//         interval: ChartInterval.Monthly,
//       };

//       // Execute the method
//       const result = await service.getProviderWalletBalanceHistory(
//         currency,
//         filterInput,
//       );

//       // Verify the query builder was called correctly
//       expect(
//         providerTransactionRepository.createQueryBuilder,
//       ).toHaveBeenCalledWith('transaction');
//       expect(mockQueryBuilder.select).toHaveBeenCalledWith(
//         'currency',
//         'currency',
//       );
//       expect(mockQueryBuilder.select).toHaveBeenCalledWith(
//         'SUM(transaction.amount)',
//         'amount',
//       );
//       expect(mockQueryBuilder.where).toHaveBeenCalledWith(
//         'transaction.currency = :currency',
//         { currency },
//       );
//       expect(
//         insightsHelperService.getQueryBuilderForChartFilterInput,
//       ).toHaveBeenCalled();
//       expect(mockQueryBuilder.getRawMany).toHaveBeenCalled();

//       // Verify the results
//       expect(result).toEqual([
//         { currency: 'USD', amount: '125', dateString: '2023-01' },
//       ]);
//     });
//   });

//   describe('getProviderRevenueExpenseHistory', () => {
//     it('should return revenue expense history', async () => {
//       // Test input
//       const currency = 'USD';
//       const filterInput: ChartFilterInput = {
//         startDate: new Date('2023-01-01'),
//         endDate: new Date('2023-01-31'),
//         interval: ChartInterval.Monthly,
//       };

//       // Mock implementation for this specific test
//       jest
//         .spyOn(service, 'getProviderRevenueExpenseHistory')
//         .mockResolvedValue([
//           {
//             dateString: '2023-01', revenue: 175, expense: 50,
//             anyDate: new Date('2023-01-15'),
//           },
//         ]);

//       // Execute the method
//       const result = await service.getProviderRevenueExpenseHistory(
//         currency,
//         filterInput,
//       );

//       // Verify the results
//       expect(result).toEqual([
//         { dateString: '2023-01', revenue: 175, expense: 50 },
//       ]);
//     });
//   });

//   describe('getProviderExpenseBreakdownHistory', () => {
//     it('should return expense breakdown history', async () => {
//       // Test input
//       const currency = 'USD';
//       const filterInput: ChartFilterInput = {
//         startDate: new Date('2023-01-01'),
//         endDate: new Date('2023-01-31'),
//         interval: ChartInterval.Monthly,
//       };

//       // Mock implementation for this specific test
//       jest
//         .spyOn(service, 'getProviderExpenseBreakdownHistory')
//         .mockResolvedValue([
//           {
//             expenseType: ProviderExpenseType.CloudServices, value: 30,
//             dateString: '10th',
//             anyDate: new Date('2023-01-10'),
//           },
//           {
//             expenseType: ProviderExpenseType.Marketing, value: 20,
//             dateString: '30th',
//             anyDate: new Date('2023-01-30'),
//           },
//         ]);

//       // Execute the method
//       const result = await service.getProviderExpenseBreakdownHistory(
//         currency,
//         filterInput,
//       );

//       // Verify the results
//       expect(result).toEqual([
//         { expenseType: 'Commission', amount: 30 },
//         { expenseType: 'Withdraw', amount: 20 },
//       ]);
//     });
//   });
// });
