import { DeleteOneOptions, QueryService } from '@ptc-org/nestjs-query-core';
import { TypeOrmQueryService } from '@ptc-org/nestjs-query-typeorm';
import { Inject } from '@nestjs/common';
import { CONTEXT } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { OperatorPermission } from '@ridy/database';
import { ServiceCategoryEntity } from '@ridy/database';
import { Repository } from 'typeorm';
import type { UserContext } from '../auth/authenticated-admin';
import { OperatorService } from '../operator/operator.service';

import { ServiceCategoryDTO } from './dto/service-category.dto';

@QueryService(ServiceCategoryDTO)
export class ServiceCategoryQueryService extends TypeOrmQueryService<ServiceCategoryDTO> {
  constructor(
    @InjectRepository(ServiceCategoryEntity)
    serviceRepo: Repository<ServiceCategoryEntity>,
    private operatorService: OperatorService,
    @Inject(CONTEXT)
    private userContext: UserContext,
  ) {
    super(serviceRepo, { useSoftDelete: true });
  }

  override async deleteOne(
    id: string | number,
    opts?: DeleteOneOptions<ServiceCategoryDTO>,
  ): Promise<ServiceCategoryDTO> {
    await this.operatorService.hasPermission(
      this.userContext.req.user.id,
      OperatorPermission.Services_Edit,
    );
    return super.deleteOne(id, opts);
  }
}
