import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { ApolloQueryResult } from '@apollo/client/core';
import {
  PayoutSessionTransactionsGQL,
  PayoutSessionTransactionsQuery,
  ViewPayoutSessionGQL,
  ViewPayoutSessionQuery,
} from '../../../../generated/graphql';
import { TableService } from '../../../@services/table-service';

export const payoutSessionTransactionsResolver: ResolveFn<
  ApolloQueryResult<PayoutSessionTransactionsQuery>
> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const gql = inject(PayoutSessionTransactionsGQL);
  const tableService = inject(TableService);
  const { paging } = tableService.deserializeQueryParams(route.queryParams);
  return gql.fetch({ id: route.params.id, paging: paging });
};
