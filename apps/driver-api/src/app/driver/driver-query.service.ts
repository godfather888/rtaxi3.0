import { QueryService, UpdateOneOptions } from '@ptc-org/nestjs-query-core';
import { TypeOrmQueryService } from '@ptc-org/nestjs-query-typeorm';
import { Inject } from '@nestjs/common';
import { CONTEXT } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { DriverEntity } from '@ridy/database';
import { DriverStatus } from '@ridy/database';
import { ServiceEntity } from '@ridy/database';
import { DriverRedisService } from '@ridy/database';
import { Repository } from 'typeorm';
import { UserContext } from '../auth/authenticated-user';
import { UpdateDriverInput } from './dto/update-driver.input';
import { DriverServicesServiceEntity } from '@ridy/database';

@QueryService(DriverEntity)
export class DriverQueryService extends TypeOrmQueryService<DriverEntity> {
  constructor(
    @InjectRepository(DriverEntity)
    private driverReposotriy: Repository<DriverEntity>,
    @InjectRepository(DriverServicesServiceEntity)
    private driverServicesRepository: Repository<DriverServicesServiceEntity>,
    @InjectRepository(ServiceEntity)
    private serviceRepository: Repository<ServiceEntity>,
    private driverRedisService: DriverRedisService,
    @Inject(CONTEXT)
    private context: UserContext,
  ) {
    super(driverReposotriy);
  }

  override async updateOne(
    id: string | number,
    update: UpdateDriverInput,
    opts?: UpdateOneOptions<DriverEntity>,
  ): Promise<DriverEntity> {
    id = this.context.req.user.id;
    const allowedStatuses = [
      DriverStatus.Offline,
      DriverStatus.Online,
      DriverStatus.Parked,
      DriverStatus.WaitingDocuments,
      DriverStatus.SoftReject,
      DriverStatus.HardReject,
      DriverStatus.Blocked,
    ];
    const isNotAllowed =
      allowedStatuses.filter((status) => status == update.status).length < 1;
    if (update.status && isNotAllowed) {
      delete update.status;
    }
    if (
      update.status == DriverStatus.PendingApproval &&
      process.env.DEMO_MODE != null
    ) {
      update.status = DriverStatus.Offline;
      const services = await this.serviceRepository.find();
      const driverServices = services.map((service) => ({
        driverId: id as number,
        serviceId: service.id,
      }));
      await this.driverServicesRepository.save(driverServices);
    }
    if (update.status == DriverStatus.Offline) {
      await this.driverRedisService.expire([id]);
    }
    await super.updateOne(id, update, opts);
    // Перезагружаем driver с relations для корректного возврата media и documents
    const driver = await this.driverReposotriy.findOne({
      where: { id: id as number },
      relations: {
        media: true,
        documents: true,
        car: true,
        carColor: true,
      },
    });
    if (!driver) {
      throw new Error(`Driver with id ${id} not found`);
    }
    return driver;
  }
}
