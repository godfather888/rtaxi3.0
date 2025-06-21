import { NgModule } from '@angular/core';
import { SharedModule } from '../../../@components/shared.module';

import { DriverWalletsListComponent } from './driver-wallets-list.component';
import { DriverWalletsRoutingModule } from './driver-wallets-routing.module';


@NgModule({
  declarations: [DriverWalletsListComponent],
  imports: [
    DriverWalletsRoutingModule,
    SharedModule
  ]
})
export class DriverWalletsModule { }
