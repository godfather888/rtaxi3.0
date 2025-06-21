import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Point } from '@ridy/database';
import { DriverEntity } from '@ridy/database';
import { DriverRedisService } from '@ridy/database';
import { DeleteResult, Repository } from 'typeorm';
import { OnlineDriver, OnlineDriverWithData } from './dto/driver-location.dto';
import { FeedbackParameterAggregateDto } from './dto/feedback-parameter-aggregate.dto';
import { DriverSessionEntity } from '@ridy/database';
import { SetActiveServicesOnDriverInput } from './input/set-active-services-on-driver.input';
import { DriverServicesServiceEntity } from '@ridy/database';

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(DriverEntity)
    private driverRepository: Repository<DriverEntity>,
    @InjectRepository(DriverServicesServiceEntity)
    private driverServicesServiceRepository: Repository<DriverServicesServiceEntity>,
    @InjectRepository(DriverSessionEntity)
    private driverSessionRepository: Repository<DriverSessionEntity>,
    private driverRedisService: DriverRedisService,
  ) {}

  getDriversLocation(center: Point, count: number): Promise<OnlineDriver[]> {
    return this.driverRedisService.getAllOnline(center, count);
  }

  async getDriversLocationWithData(
    center: Point,
    count: number,
  ): Promise<OnlineDriverWithData[]> {
    const drivers = await this.getDriversLocation(center, count);
    const driverData = await this.driverRepository.findByIds(
      drivers.map((driver) => driver.driverId),
    );
    const result: OnlineDriverWithData[] = driverData.map((_driver) => {
      const redisDriver = drivers.filter(
        (driver) => driver.driverId == _driver.id,
      )[0];
      const length = _driver.mobileNumber.toString().length;
      if (
        process.env.DEMO_MODE != null &&
        _driver.mobileNumber != null &&
        length > 4
      ) {
        _driver.mobileNumber = `${_driver.mobileNumber
          .toString()
          .substring(0, length - 3)}xxxx`;
      }
      return {
        ..._driver,
        ...redisDriver,
      };
    });
    return result;
  }

  async driverFeedbackParametersSummary(
    driverId: number,
  ): Promise<FeedbackParameterAggregateDto[]> {
    return this.driverRepository.query(
      `
        SELECT 
            review_parameter.title,
            ANY_VALUE(review_parameter.isGood) AS isGood,
            COUNT(review_parameter.id) AS count
        FROM
            review_parameter_feedbacks_request_review
        INNER JOIN review_parameter on review_parameter.id = review_parameter_feedbacks_request_review.reviewParameterId
        INNER JOIN request_review on request_review.id = review_parameter_feedbacks_request_review.requestReviewId
        WHERE
            request_review.driverId = ?
        GROUP BY
            review_parameter.title
        ORDER BY isGood DESC, count DESC`,
      [driverId],
    );
  }

  async terminateLoginSession(sessionId: string): Promise<DeleteResult> {
    return this.driverSessionRepository.softDelete(sessionId);
  }
  async setActivatedServicesOnDriver(input: SetActiveServicesOnDriverInput) {
    Logger.log(
      `set activated services on driver ${JSON.stringify(input)}`,
      'DriverService.setActivatedServicesOnDriver',
    );
    const previousServcies = await this.driverRepository.findOne({
      where: { id: input.driverId },
      relations: {
        enabledServices: {
          service: true,
        },
      },
    });
    const newServiceIds = input.serviceIds.filter(
      (serviceId) =>
        previousServcies.enabledServices.findIndex(
          (service) => service.service.id == serviceId,
        ) == -1,
    );
    const removedServiceIds = previousServcies.enabledServices.filter(
      (service) =>
        input.serviceIds.findIndex(
          (serviceId) => serviceId == service.service.id,
        ) == -1,
    );
    const newServices = newServiceIds.map((serviceId) => ({
      driverId: input.driverId,
      serviceId,
    }));
    const removedServices = removedServiceIds.map((service) => ({
      driverId: input.driverId,
      serviceId: service.service.id,
    }));
    Logger.log(
      `newServices: ${JSON.stringify(newServices)}`,
      'DriverService.setActivatedServicesOnDriver',
    );
    Logger.log(
      `removedServices: ${JSON.stringify(removedServices)}`,
      'DriverService.setActivatedServicesOnDriver',
    );

    if (newServices.length > 0) {
      await this.driverServicesServiceRepository
        .createQueryBuilder()
        .insert()
        .into(DriverServicesServiceEntity)
        .values(newServices)
        .execute();
    }
    if (removedServices.length > 0) {
      await this.driverServicesServiceRepository
        .createQueryBuilder()
        .delete()
        .from(DriverServicesServiceEntity)
        .where('driverId = :driverId', { driverId: input.driverId })
        .andWhere('serviceId IN (:...serviceIds)', {
          serviceIds: removedServices.map((service) => service.serviceId),
        })
        .execute();
    }
    return true;
  }
}
