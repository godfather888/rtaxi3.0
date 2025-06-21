import { DeepPartial, QueryService } from '@ptc-org/nestjs-query-core';
import { TypeOrmQueryService } from '@ptc-org/nestjs-query-typeorm';
import { ParkOrderEntity } from '@ridy/database';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentMode } from '@ridy/database';
import { ParkOrderDTO } from './dto/park-order.dto';
import { CreateParkOrderInput } from './dto/create-park-order.input';
import { ParkingCustomerNotificationEntity } from '@ridy/database';
import { ParkingCustomerNotificationType } from '@ridy/database';
import { ParkSpotEntity } from '@ridy/database';

@QueryService(ParkOrderDTO)
export class ParkOrderQueryService extends TypeOrmQueryService<ParkOrderDTO> {
  constructor(
    @InjectRepository(ParkOrderEntity)
    override readonly repo: Repository<ParkOrderEntity>,
    @InjectRepository(ParkingCustomerNotificationEntity)
    readonly notificationRepo: Repository<ParkingCustomerNotificationEntity>,
    @InjectRepository(ParkSpotEntity)
    readonly parkSpotRepo: Repository<ParkSpotEntity>,
  ) {
    super(repo);
  }

  override async createOne(
    record: CreateParkOrderInput,
  ): Promise<ParkOrderDTO> {
    const { paymentMethodId, ..._order } = record;
    const order: DeepPartial<ParkOrderEntity> = _order;
    if (order.paymentMode === PaymentMode.SavedPaymentMethod) {
      order.savedPaymentMethodId = paymentMethodId;
    } else if (order.paymentMode === PaymentMode.PaymentGateway) {
      order.paymentGatewayId = paymentMethodId;
    }
    await this.notificationRepo.save({
      type: ParkingCustomerNotificationType.booked,
      parkOrderId: order.id,
      customerId: order.carOwnerId,
    });
    const parkSpot = await this.parkSpotRepo.findOneByOrFail({
      id: _order.parkSpotId,
    });
    order.spotOwnerId = parkSpot.ownerId;
    return super.createOne(order);
  }
}
