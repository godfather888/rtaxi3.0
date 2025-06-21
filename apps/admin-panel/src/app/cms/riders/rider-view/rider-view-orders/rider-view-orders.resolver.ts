import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ApolloQueryResult } from '@apollo/client/core';
import {
  OrderFilter,
  OrderSortFields,
  RiderOrdersGQL,
  RiderOrdersQuery,
} from '../../../../../generated/graphql';
import { TableService } from '../../../../@services/table-service';
import { Observable } from 'rxjs';

@Injectable()
export class RiderViewOrdersResolver {
  constructor(
    private gql: RiderOrdersGQL,
    private tableService: TableService,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<ApolloQueryResult<RiderOrdersQuery>> {
    const paging = this.tableService.deserializeQueryParams<
      OrderSortFields,
      OrderFilter
    >(route.queryParams);
    return this.gql.fetch({ riderId: route.parent?.params.id, ...paging });
  }
}
