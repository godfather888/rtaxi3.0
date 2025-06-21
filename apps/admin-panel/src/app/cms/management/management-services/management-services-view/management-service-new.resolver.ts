import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ApolloQueryResult } from '@apollo/client/core';
import {
  NewServiceGQL,
  NewServiceQuery,
  ViewRiderQuery,
} from '../../../../../generated/graphql';
import { Observable } from 'rxjs';

@Injectable()
export class ManagementServiceNewResolver {
  constructor(private gql: NewServiceGQL) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<ApolloQueryResult<NewServiceQuery>> {
    return this.gql.fetch();
  }
}
