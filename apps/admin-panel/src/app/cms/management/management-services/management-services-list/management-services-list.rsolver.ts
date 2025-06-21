import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ApolloQueryResult } from '@apollo/client/core';
import {
  ServicesListGQL,
  ServicesListQuery,
} from '../../../../../generated/graphql';
import { TableService } from '../../../../@services/table-service';
import { Observable } from 'rxjs';

@Injectable()
export class ServicesListResolver {
  constructor(
    private paging: TableService,
    private gql: ServicesListGQL,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<ApolloQueryResult<ServicesListQuery>> {
    return this.gql.fetch();
  }
}
