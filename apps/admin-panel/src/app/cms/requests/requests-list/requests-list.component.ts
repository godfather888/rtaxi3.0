import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApolloQueryResult } from '@apollo/client/core';
import { TranslateService } from '@ngx-translate/core';
import { OrdersListQuery, OrderStatus } from '../../../../generated/graphql';
import { TagColorService } from '../../../@services/tag-color/tag-color.service';
import { NzTableFilterList } from 'ng-zorro-antd/table';
import { map, Observable } from 'rxjs';
import { TableService } from '../../../@services/table-service';

@Component({
  standalone: false,
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
})
export class RequestsListComponent implements OnInit {
  statuses: NzTableFilterList;
  query?: Observable<ApolloQueryResult<OrdersListQuery>>;
  dateRanges: Date[] = [];
  orderStatus = OrderStatus;

  constructor(
    public tagColor: TagColorService,
    private route: ActivatedRoute,
    public tableService: TableService,
    private translate: TranslateService,
  ) {
    this.statuses = Object.values(OrderStatus).map((key) => ({
      text: this.translate.instant(`enum.order.status.${key}`),
      value: key,
    }));
  }

  ngOnInit(): void {
    this.query = this.route.data.pipe(map((data) => data.orders));
  }
}
