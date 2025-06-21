import { Filter } from '@ptc-org/nestjs-query-core';
import {
  CustomAuthorizer,
  AuthorizationContext,
} from '@ptc-org/nestjs-query-graphql';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { OperatorPermission } from '@ridy/database';
import { OperatorEntity } from '@ridy/database';
import { DataSource } from 'typeorm';
import { UserContext } from '../../auth/authenticated-admin';

@Injectable()
export class FleetAuthorizer implements CustomAuthorizer<any> {
  constructor(private datasource: DataSource) {}

  async authorize(
    context: UserContext,
    authorizerContext: AuthorizationContext,
  ): Promise<Filter<any>> {
    const operator = await this.datasource
      .getRepository(OperatorEntity)
      .findOne({ where: { id: context.req.user.id }, relations: ['role'] });
    if (
      authorizerContext.readonly &&
      !operator.role.permissions.includes(OperatorPermission.Fleets_View)
    ) {
      throw new UnauthorizedException();
    }
    if (
      !authorizerContext.readonly &&
      !operator.role.permissions.includes(OperatorPermission.Fleets_Edit)
    ) {
      throw new UnauthorizedException();
    }
    return undefined;
  }
}
