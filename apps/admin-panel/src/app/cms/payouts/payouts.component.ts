import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApolloQueryResult } from '@apollo/client/core';
import { PayoutSessionStatus, PayoutsQuery } from '../../../generated/graphql';
import { environment } from '../../../environments/environment';
import { Observable, map } from 'rxjs';
import { TableService } from '../../@services/table-service';
import { Chart } from '@antv/g2';

@Component({
  standalone: false,
  selector: 'app-payouts',
  templateUrl: './payouts.component.html',
})
export class PayoutsComponent {
  query?: Observable<ApolloQueryResult<PayoutsQuery>>;
  serverUrl = environment.root;
  sessionStatus = PayoutSessionStatus;
  private chartPayoutMethods!: Chart;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public tableService: TableService,
  ) {}

  ngOnInit(): void {
    this.query = this.route.data.pipe(map((data) => data.payouts));
  }

  onChartPayoutMethodsInit(chartInstance: Chart) {
    this.chartPayoutMethods = chartInstance;
    this.query?.subscribe((result) => {
      const stats =
        result.data.taxiPayoutStatistics.usersDefaultPayoutMethodStats;
      const mappedStats = stats.map((stat) => {
        return {
          count: stat.totalCount,
          name: stat.payoutMethod?.name ?? 'Without payout method',
        };
      });
      this.chartPayoutMethods
        .data(mappedStats)
        .interval()
        .position('count')
        .color('name')
        .adjust('stack');
      this.chartPayoutMethods.coordinate('rect').transpose();
      this.chartPayoutMethods.render();
    });
  }

  refreshPayoutsChart() {}

  changeCurrency(currency: string): void {
    this.router.navigate([], {
      queryParams: { currency },
      queryParamsHandling: 'merge',
    });
  }
}
