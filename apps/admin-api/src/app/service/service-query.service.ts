import { DeleteOneOptions, QueryService } from '@ptc-org/nestjs-query-core';
import { TypeOrmQueryService } from '@ptc-org/nestjs-query-typeorm';
import { Inject } from '@nestjs/common';
import { CONTEXT } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { OperatorPermission } from '@ridy/database';
import { ServiceEntity } from '@ridy/database';
import { Repository } from 'typeorm';
import type { UserContext } from '../auth/authenticated-admin';
import { OperatorService } from '../operator/operator.service';

import { ServiceDTO } from './dto/service.dto';

@QueryService(ServiceDTO)
export class ServiceQueryService extends TypeOrmQueryService<ServiceDTO> {
  constructor(
    @InjectRepository(ServiceEntity)
    serviceRepo: Repository<ServiceEntity>,
    private operatorService: OperatorService,
    @Inject(CONTEXT)
    private userContext: UserContext,
  ) {
    super(serviceRepo, { useSoftDelete: true });
  }

  override async deleteOne(
    id: string | number,
    opts?: DeleteOneOptions<ServiceDTO>,
  ): Promise<ServiceDTO> {
    await this.operatorService.hasPermission(
      this.userContext.req.user.id,
      OperatorPermission.Services_Edit,
    );
    return super.deleteOne(id, opts);
  }
}
