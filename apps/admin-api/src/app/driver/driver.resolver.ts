import { Inject, UseGuards } from '@nestjs/common';
import {
  Args,
  CONTEXT,
  ID,
  Int,
  Mutation,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { Point } from '@ridy/database';
import { OperatorPermission } from '@ridy/database';
import { TransactionAction } from '@ridy/database';
import { TransactionStatus } from '@ridy/database';
import { OperatorEntity } from '@ridy/database';
import { SharedDriverService } from '@ridy/database';
import { ForbiddenError } from '@nestjs/apollo';
import { Repository } from 'typeorm';
import type { UserContext } from '../auth/authenticated-admin';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DriverService } from './driver.service';
import { OnlineDriver, OnlineDriverWithData } from './dto/driver-location.dto';
import { DriverTransactionInput } from './dto/driver-transaction.input';
import { DriverWalletDTO } from './dto/driver-wallet.dto';
import { DriverDTO } from './dto/driver.dto';
import { FeedbackParameterAggregateDto } from './dto/feedback-parameter-aggregate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SetActiveServicesOnDriverInput } from './input/set-active-services-on-driver.input';

@Resolver()
@UseGuards(JwtAuthGuard)
export class DriverResolver {
  constructor(
    private driverService: DriverService,
    private sharedDriverService: SharedDriverService,
    @InjectRepository(OperatorEntity)
    private operatorRepository: Repository<OperatorEntity>,
    @Inject(CONTEXT)
    private context: UserContext,
  ) {}

  @Query(() => [OnlineDriver])
  async getDriversLocation(
    @Args('center', { type: () => Point }) center: Point,
    @Args('count', { type: () => Int }) count: number,
  ): Promise<OnlineDriver[]> {
    return this.driverService.getDriversLocation(center, count);
  }

  @Query(() => [OnlineDriverWithData])
  async getDriversLocationWithData(
    @Args('center', { type: () => Point }) center: Point,
    @Args('count', { type: () => Int }) count: number,
  ): Promise<OnlineDriverWithData[]> {
    return this.driverService.getDriversLocationWithData(center, count);
  }

  @Mutation(() => DriverWalletDTO)
  async createDriverTransaction(
    @Args('input', { type: () => DriverTransactionInput })
    input: DriverTransactionInput,
  ) {
    input.amount =
      input.action == TransactionAction.Recharge
        ? Math.abs(input.amount)
        : Math.abs(input.amount) * -1;
    return this.sharedDriverService.rechargeWallet({
      ...input,
      operatorId: this.context.req.user.id,
      status: TransactionStatus.Done,
    });
  }

  @Mutation(() => DriverDTO)
  async deleteOneDriver(
    @Args('id', { type: () => ID }) id: number,
  ): Promise<DriverDTO> {
    const operator = await this.operatorRepository.findOne({
      where: { id: this.context.req.user.id },
      relations: { role: true },
    });
    if (!operator.role.permissions.includes(OperatorPermission.Drivers_Edit)) {
      throw new ForbiddenError('PERMISSION_NOT_GRANTED');
    }
    return this.sharedDriverService.deleteById(id);
  }

  @Query(() => [FeedbackParameterAggregateDto])
  async driverFeedbackParametersSummary(
    @Args('driverId', { type: () => ID }) driverId: number,
  ): Promise<FeedbackParameterAggregateDto[]> {
    return this.driverService.driverFeedbackParametersSummary(driverId);
  }

  @Mutation(() => Boolean)
  async terminateDriverLoginSession(
    @Args('sessionId', { type: () => ID }) sessionId: string,
  ) {
    if (process.env.DEMO_MODE != null) {
      throw new ForbiddenError('Action not allowed in demo mode.');
    }
    const result = await this.driverService.terminateLoginSession(sessionId);
    return result.affected > 0;
  }

  @Mutation(() => Boolean)
  async setActivatedServicesOnDriver(
    @Args('input', { type: () => SetActiveServicesOnDriverInput })
    input: SetActiveServicesOnDriverInput,
  ) {
    return this.driverService.setActivatedServicesOnDriver(input);
  }
}
