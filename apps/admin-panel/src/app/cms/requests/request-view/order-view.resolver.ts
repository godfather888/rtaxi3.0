import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ApolloQueryResult } from '@apollo/client/core';
import { ViewOrderGQL, ViewOrderQuery } from '../../../../generated/graphql';
import { Observable } from 'rxjs';

@Injectable()
export class OrderViewResolver {
  constructor(private gql: ViewOrderGQL) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<ApolloQueryResult<ViewOrderQuery>> {
    return this.gql.fetch({ id: route.params.id });
  }
}
