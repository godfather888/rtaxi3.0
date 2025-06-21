import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ApolloQueryResult } from '@apollo/client/core';
import {
  PaymentGatewayFilter,
  PaymentGatewaysGQL,
  PaymentGatewaySortFields,
  PaymentGatewaysQuery,
} from '../../../../../generated/graphql';
import { TableService } from '../../../../@services/table-service';
import { Observable } from 'rxjs';

@Injectable()
export class PaymentGatewayListResolver {
  constructor(
    private paging: TableService,
    private gql: PaymentGatewaysGQL,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<ApolloQueryResult<PaymentGatewaysQuery>> {
    const params = this.paging.deserializeQueryParams<
      PaymentGatewaySortFields,
      PaymentGatewayFilter
    >(route.queryParams);
    return this.gql.fetch(params);
  }
}
