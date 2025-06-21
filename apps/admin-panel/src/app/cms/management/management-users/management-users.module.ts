import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementUsersRoutingModule } from './management-users-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { SharedModule } from '../../../@components/shared.module';


@NgModule({
  declarations: [UsersListComponent],
  imports: [
    ManagementUsersRoutingModule,
    SharedModule
  ]
})
export class ManagementUsersModule { }
