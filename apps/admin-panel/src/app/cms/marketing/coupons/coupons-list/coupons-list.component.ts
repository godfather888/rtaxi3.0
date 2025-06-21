import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApolloQueryResult } from '@apollo/client/core';
import { CouponListQuery } from '../../../../../generated/graphql';
import { TableService } from '../../../../@services/table-service';
import { TagColorService } from '../../../../@services/tag-color/tag-color.service';
import { map, Observable } from 'rxjs';

@Component({
  standalone: false,
  selector: 'app-coupons-list',
  templateUrl: './coupons-list.component.html',
})
export class CouponsListComponent implements OnInit {
  query?: Observable<ApolloQueryResult<CouponListQuery>>;

  constructor(
    public route: ActivatedRoute,
    public tableService: TableService,
    public tagColor: TagColorService,
  ) {}

  ngOnInit(): void {
    this.query = this.route.data.pipe(map((data) => data.coupons));
  }
}
