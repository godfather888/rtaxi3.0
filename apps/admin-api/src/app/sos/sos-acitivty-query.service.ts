import { QueryService } from '@ptc-org/nestjs-query-core';
import { TypeOrmQueryService } from '@ptc-org/nestjs-query-typeorm';
import { Inject } from '@nestjs/common';
import { CONTEXT } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { SOSActivityAction } from '@ridy/database';
import { SOSStatus } from '@ridy/database';
import { SOSActivityEntity } from '@ridy/database';
import { SOSEntity } from '@ridy/database';
import { Repository } from 'typeorm';
import type { UserContext } from '../auth/authenticated-admin';
import { CreateSOSAcitivtyInput } from './dto/create-sos-activity.input';
import { SOSActivityDTO } from './dto/sos-activity.dto';

@QueryService(SOSActivityDTO)
export class SOSActivityQueryService extends TypeOrmQueryService<SOSActivityDTO> {
  constructor(
    @InjectRepository(SOSActivityEntity)
    sosActivityRepo: Repository<SOSActivityEntity>,
    @InjectRepository(SOSEntity)
    private sosRepository: Repository<SOSEntity>,
    @Inject(CONTEXT)
    private userContext: UserContext,
  ) {
    super(sosActivityRepo);
  }

  override async createOne(
    record: CreateSOSAcitivtyInput,
  ): Promise<SOSActivityDTO> {
    const activity = await super.createOne({
      ...record,
      operatorId: this.userContext.req.user.id,
    });
    switch (activity.action) {
      case SOSActivityAction.MarkedAsResolved:
        await this.sosRepository.update(record.sosId, {
          status: SOSStatus.Resolved,
        });
        break;

      case SOSActivityAction.MarkedAsFalseAlarm:
        await this.sosRepository.update(record.sosId, {
          status: SOSStatus.FalseAlarm,
        });
        break;
    }
    return activity;
  }
}
