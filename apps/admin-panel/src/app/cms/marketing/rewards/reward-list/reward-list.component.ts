import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApolloQueryResult } from '@apollo/client/core';
import { RewardListQuery } from '../../../../../generated/graphql';
import { TableService } from '../../../../@services/table-service';
import { TagColorService } from '../../../../@services/tag-color/tag-color.service';
import { map, Observable } from 'rxjs';

@Component({
  standalone: false,
  selector: 'app-reward-list',
  templateUrl: './reward-list.component.html',
})
export class RewardListComponent implements OnInit {
  query?: Observable<ApolloQueryResult<RewardListQuery>>;

  constructor(
    public route: ActivatedRoute,
    public tableService: TableService,
    public tagColor: TagColorService,
  ) {}

  ngOnInit(): void {
    this.query = this.route.data.pipe(map((data) => data.rewards));
  }
}
