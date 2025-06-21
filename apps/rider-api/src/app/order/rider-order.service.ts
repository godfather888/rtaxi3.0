import { InjectPubSub } from '@ptc-org/nestjs-query-graphql';
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DriverDeductTransactionType } from '@ridy/database';
import { DriverStatus } from '@ridy/database';
import { OrderStatus } from '@ridy/database';
import { PaymentStatus } from '@ridy/database';
import { ProviderRechargeTransactionType } from '@ridy/database';
import { RequestActivityType } from '@ridy/database';
import { RiderDeductTransactionType } from '@ridy/database';
import { TransactionAction } from '@ridy/database';
import { TransactionStatus } from '@ridy/database';
import { FeedbackEntity } from '@ridy/database';
import { PaymentEntity } from '@ridy/database';
import { RequestActivityEntity } from '@ridy/database';
import { TaxiOrderEntity } from '@ridy/database';
import { DriverNotificationService } from '@ridy/database';
import { SharedDriverService } from '@ridy/database';
import { SharedProviderService } from '@ridy/database';
import { SharedRiderService } from '@ridy/database';
import { OrderRedisService } from '@ridy/database';
import { ForbiddenError } from '@nestjs/apollo';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { firstValueFrom } from 'rxjs';
import { In, Repository } from 'typeorm';

import { SubmitFeedbackInput } from './dto/submit-feedback.input';
import { SharedCustomerWalletService } from '@ridy/database';
import { CurrentOrder } from './dto/current-order.dto';
import { DriverRedisService } from '@ridy/database';

const activeOrderStatuses = [
  OrderStatus.Requested,
  OrderStatus.Found,
  OrderStatus.NotFound,
  OrderStatus.NoCloseFound,
  OrderStatus.DriverAccepted,
  OrderStatus.Arrived,
  OrderStatus.Started,
  OrderStatus.WaitingForReview,
  OrderStatus.WaitingForPrePay,
  OrderStatus.WaitingForPostPay,
];

@Injectable()
export class RiderOrderService {
  constructor(
    @InjectRepository(TaxiOrderEntity)
    private orderRepository: Repository<TaxiOrderEntity>,
    @InjectRepository(RequestActivityEntity)
    private activityRepository: Repository<RequestActivityEntity>,
    @InjectRepository(FeedbackEntity)
    private feedbackRepository: Repository<FeedbackEntity>,
    @InjectRepository(PaymentEntity)
    private paymentRepo: Repository<PaymentEntity>,
    private riderService: SharedRiderService,
    private driverService: SharedDriverService,
    private orderRedisService: OrderRedisService,
    private driverRedisService: DriverRedisService,
    private providerService: SharedProviderService,
    private driverNotificationService: DriverNotificationService,
    @InjectPubSub()
    private pubSub: RedisPubSub,
    private httpService: HttpService,
    private readonly customerWalletService: SharedCustomerWalletService,
  ) {}

  async getCurrentOrder(
    riderId: number,
    relations: string[] = [],
  ): Promise<TaxiOrderEntity | null> {
    return this.orderRepository.findOne({
      where: {
        riderId,
        status: In(activeOrderStatuses),
      },
      order: { id: 'DESC' },
      relations,
    });
  }

  async getLastOrder(riderId: number, relations: string[] = []) {
    return this.orderRepository.findOne({
      where: { riderId },
      order: { id: 'DESC' },
      relations,
    });
  }

  async cancelRiderLastOrder(input: {
    riderId: number;
    reasonId?: number;
    reason?: string;
  }) {
    const order = await this.getCurrentOrder(input.riderId);
    return this.cancelOrder({
      orderId: order!.id,
      reasonId: input.reasonId,
      reason: input.reason,
    });
  }

  async cancelOrder(input: {
    orderId: number;
    reasonId?: number;
    reason?: string;
  }): Promise<TaxiOrderEntity> {
    await this.orderRepository.update(input.orderId, {
      status: OrderStatus.RiderCanceled,
      finishTimestamp: new Date(),
      costAfterCoupon: 0,
      cancelReasonId: input.reasonId,
      cancelReasonNote: input.reason,
    });
    const order = await this.orderRepository.findOneOrFail({
      where: { id: input.orderId },
      relations: ['service', 'driver', 'rider'],
    });
    const payments = await this.paymentRepo.find({
      where: {
        userType: 'client',
        userId: order.riderId.toString(),
        status: PaymentStatus.Authorized,
        orderNumber: order.id.toString(),
      },
      order: { amount: 'DESC' },
    });
    if (order.driverId != null && order.service.cancellationTotalFee > 0) {
      const riderCredit =
        await this.customerWalletService.getRiderCreditInCurrency(
          order.riderId,
          order.currency,
        );
      if (riderCredit < order.service.cancellationTotalFee) {
        await firstValueFrom(
          this.httpService.get<{ status: 'OK' | 'FAILED' }>(
            `${process.env.GATEWAY_SERVER_URL}/capture?id=${payments[0].transactionNumber}&amount=${order.service.cancellationTotalFee}`,
          ),
        );
      }
      await Promise.all([
        this.customerWalletService.rechargeWallet({
          action: TransactionAction.Deduct,
          deductType: RiderDeductTransactionType.OrderFee,
          amount: -order.service.cancellationTotalFee,
          currency: order.currency,
          riderId: order.riderId,
          status: TransactionStatus.Done,
        }),
        this.driverService.rechargeWallet({
          action: TransactionAction.Deduct,
          deductType: DriverDeductTransactionType.Commission,
          amount: order.service.cancellationDriverShare,
          currency: order.currency,
          driverId: order.driverId,
          status: TransactionStatus.Done,
        }),
        this.providerService.rechargeWallet({
          action: TransactionAction.Recharge,
          rechargeType: ProviderRechargeTransactionType.Commission,
          amount:
            order.service.cancellationTotalFee -
            order.service.cancellationDriverShare,
          currency: order.currency,
        }),
      ]);
    }
    for (const payment of payments) {
      await firstValueFrom(
        this.httpService.get<{ status: 'OK' | 'FAILED' }>(
          `${process.env.GATEWAY_SERVER_URL}/cancel_preauth?id=${payment.transactionNumber}`,
        ),
      );
    }
    if (order.driverId == null) {
      this.pubSub.publish('orderRemoved', { orderRemoved: order });
      this.orderRedisService.expire([order.id]);
    } else {
      this.driverNotificationService.canceled(order.driver!);
      await this.driverService.updateDriverStatus(
        order.driverId,
        DriverStatus.Online,
      );
      Logger.log(`publishing orderUpdated`);
      this.pubSub.publish('orderUpdated', { orderUpdated: order });
    }
    this.activityRepository.insert({
      requestId: order.id,
      type: RequestActivityType.CanceledByRider,
    });
    return order;
  }

  async submitReview(
    riderId: number,
    review: SubmitFeedbackInput,
  ): Promise<TaxiOrderEntity> {
    let order = await this.orderRepository.findOneByOrFail({
      id: review.requestId,
    });
    if (order.riderId != riderId) {
      throw new ForbiddenError('Not Allowed');
    }
    const previousReview = await this.feedbackRepository.findOne({
      where: { requestId: order.id },
    });
    if (previousReview != null) {
      await this.feedbackRepository.delete(previousReview.id);
    }
    // if (order.reviewId != null) {
    //   await this.feedbackRepository.delete(order.reviewId!);
    // }
    review.score = review.score > 5 ? review.score : review.score * 20;
    await this.feedbackRepository.save({
      ...review,
      driverId: order.driverId,
      requestId: order.id,
      parameters: (review.parameterIds ?? []).map((id) => ({ id })),
    });
    this.activityRepository.insert({
      requestId: order.id,
      type: RequestActivityType.Reviewed,
    });
    const reviews = await this.feedbackRepository.find({
      where: { driverId: order.driverId },
    });
    const averageRating = Math.round(
      reviews.reduce((total, next) => total + next.score, 0) / reviews.length,
    );
    await this.driverService.setRating(
      order.driverId!,
      averageRating,
      reviews.length,
    );
    if (review.addToFavorite == true) {
      await this.riderService.addDriverToFavoriteList({
        riderId,
        driverId: order.driverId!,
      });
    }
    await this.orderRepository.update(order.id, {
      status: OrderStatus.Finished,
    });
    order = await this.orderRepository.findOneByOrFail({
      id: review.requestId,
    });
    return order;
  }

  async skipReview(userId: number) {
    const order = await this.getCurrentOrder(userId);
    if (order == null) {
      throw new ForbiddenError('Not Allowed');
    }
    await this.orderRepository.update(order.id, {
      status: OrderStatus.Finished,
    });
    return order;
  }

  async getActiveOrders(id: number): Promise<CurrentOrder[]> {
    const orders = await this.orderRepository.find({
      where: {
        status: In(activeOrderStatuses),
        riderId: id,
      },
    });
    return Promise.all(
      orders.map(async (order) => {
        const currentOrder: CurrentOrder = {
          order: order!,
        };
        if (order.driverId != null) {
          const driverLocation =
            await this.driverRedisService.getDriverCoordinate(order.driverId!);
          if (driverLocation != null) {
            currentOrder.driverLocation = driverLocation;
          }
        }
        return currentOrder;
      }),
    );
  }
}
