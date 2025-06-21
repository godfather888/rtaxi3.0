import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ApolloQueryResult } from '@apollo/client/core';
import {
  TaxiSupportRequestFilter,
  ComplaintsListGQL,
  ComplaintsListQuery,
  TaxiSupportRequestSortFields,
} from '../../../../generated/graphql';
import { TableService } from '../../../@services/table-service';
import { Observable } from 'rxjs';

@Injectable()
export class ComplaintsListResolver {
  constructor(
    private paging: TableService,
    private gql: ComplaintsListGQL,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<ApolloQueryResult<ComplaintsListQuery>> {
    const params = this.paging.deserializeQueryParams<
      TaxiSupportRequestSortFields,
      TaxiSupportRequestFilter
    >(route.queryParams);
    return this.gql.fetch(params);
  }
}
