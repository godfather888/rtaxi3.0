import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApolloQueryResult } from '@apollo/client/core';
import { UsersListQuery } from '../../../../../generated/graphql';
import { TableService } from '../../../../@services/table-service';
import { TagColorService } from '../../../../@services/tag-color/tag-color.service';
import { map, Observable } from 'rxjs';

@Component({
  standalone: false,
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
})
export class UsersListComponent implements OnInit {
  query?: Observable<ApolloQueryResult<UsersListQuery>>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public tagColor: TagColorService,
    public tableService: TableService,
  ) {}

  ngOnInit(): void {
    this.query = this.route.data.pipe(map((data) => data.operators));
  }
}
