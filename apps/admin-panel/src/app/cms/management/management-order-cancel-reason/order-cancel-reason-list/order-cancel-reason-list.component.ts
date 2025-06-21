import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TagColorService } from '../../../../@services/tag-color/tag-color.service';
import { Observable } from 'rxjs';
import { ApolloQueryResult } from '@apollo/client/core';
import {
  OrderCancelReasonListQuery,
  ReviewParametersListQuery,
} from '../../../../../generated/graphql';
import { map } from 'rxjs/operators';
import { TableService } from '../../../../@services/table-service';

@Component({
  standalone: false,
  selector: 'app-review-parameters-list',
  templateUrl: './order-cancel-reason-list.component.html',
})
export class OrderCancelReasonListComponent implements OnInit {
  query?: Observable<ApolloQueryResult<OrderCancelReasonListQuery>>;

  constructor(
    private route: ActivatedRoute,
    public tableService: TableService,
    public tagColor: TagColorService,
  ) {}

  ngOnInit(): void {
    this.query = this.route.data.pipe(map((data) => data.orderCancelReasons));
  }
}
