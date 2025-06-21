import { NgModule } from '@angular/core';
import { SharedModule } from '../../../@components/shared.module';

import { AdminTransactionsRoutingModule } from './admin-transactions-routing.module';
import { AdminTransactionsComponent } from './admin-transactions.component';


@NgModule({
  declarations: [AdminTransactionsComponent],
  imports: [
    AdminTransactionsRoutingModule,
    SharedModule
  ]
})
export class AdminTransactionsModule { }
