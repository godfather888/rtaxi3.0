import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ApolloQueryResult } from '@apollo/client/core';
import {
  OrderCancelReasonListGQL,
  OrderCancelReasonListQuery,
} from '../../../../../generated/graphql';
import { TableService } from '../../../../@services/table-service';
import { Observable } from 'rxjs';

@Injectable()
export class OrderCancelReasonListResolver {
  constructor(
    private tableService: TableService,
    private gql: OrderCancelReasonListGQL,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<ApolloQueryResult<OrderCancelReasonListQuery>> {
    const params = this.tableService.deserializeQueryParams(route.queryParams);
    return this.gql.fetch(params);
  }
}
