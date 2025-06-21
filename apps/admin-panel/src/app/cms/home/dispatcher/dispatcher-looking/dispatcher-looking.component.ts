import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CancelOrderGQL,
  OrderUpdatedGQL,
  OrderUpdatedSubscription,
} from '../../../../../generated/graphql';
import { Subscription } from 'apollo-angular';
import { NzMessageService } from 'ng-zorro-antd/message';
import { firstValueFrom, Observable } from 'rxjs';
import { FetchResult } from '@apollo/client/core';

@Component({
  standalone: false,
  selector: 'app-dispatcher-looking',
  templateUrl: './dispatcher-looking.component.html',
})
export class DispatcherLookingComponent implements OnInit {
  query?: Observable<FetchResult<OrderUpdatedSubscription>>;
  orderId!: string;

  constructor(
    private orderUpdateSubscription: OrderUpdatedGQL,
    private cancelOrderMutation: CancelOrderGQL,
    private route: ActivatedRoute,
    private router: Router,
    private msg: NzMessageService,
  ) {}

  ngOnInit(): void {
    this.orderId = this.route.snapshot.queryParams.requestId;
    this.query = this.orderUpdateSubscription.subscribe({ id: this.orderId });
  }

  async cancelRequest() {
    const orderId = this.route.snapshot.queryParams.requestId;
    const result = await firstValueFrom(
      this.cancelOrderMutation.mutate({ orderId }),
    );
    this.msg.success('Order Canceled.');
    this.router.navigate(['../riders-list'], {
      relativeTo: this.route,
    });
  }
}
