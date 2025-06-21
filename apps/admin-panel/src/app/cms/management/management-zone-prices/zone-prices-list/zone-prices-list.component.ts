import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TagColorService } from '../../../../@services/tag-color/tag-color.service';
import { Observable } from 'rxjs';
import { ApolloQueryResult } from '@apollo/client/core';
import { ZonePricesListQuery } from '../../../../../generated/graphql';
import { map } from 'rxjs/operators';
import { TableService } from '../../../../@services/table-service';

@Component({
  standalone: false,
  selector: 'app-zone-prices-list',
  templateUrl: './zone-prices-list.component.html',
})
export class ZonePricesListComponent implements OnInit {
  query?: Observable<ApolloQueryResult<ZonePricesListQuery>>;

  constructor(
    private route: ActivatedRoute,
    public tableService: TableService,
    public tagColor: TagColorService,
  ) {}

  ngOnInit(): void {
    this.query = this.route.data.pipe(map((data) => data.zonePrices));
  }
}
