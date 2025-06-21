import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ApolloQueryResult } from '@apollo/client/core';
import {
  ReviewParametersListGQL,
  ReviewParametersListQuery,
} from '../../../../../generated/graphql';
import { TableService } from '../../../../@services/table-service';
import { Observable } from 'rxjs';

@Injectable()
export class ReviewParametersListResolver {
  constructor(
    private paging: TableService,
    private gql: ReviewParametersListGQL,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<ApolloQueryResult<ReviewParametersListQuery>> {
    //const params = this.paging.deserializeQueryParams<FeedbackParameterSortFields, FeedbackParameterFilter>(route.queryParams);
    return this.gql.fetch();
  }
}
