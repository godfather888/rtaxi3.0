import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementCarsRoutingModule } from './management-cars-routing.module';
import { ManagementCarsListComponent } from './management-cars-list/management-cars-list.component';
import { SharedModule } from '../../../@components/shared.module';


@NgModule({
  declarations: [ ManagementCarsListComponent ],
  imports: [
    ManagementCarsRoutingModule,
    SharedModule
  ],
  providers: []
})
export class ManagementCarsModule { }
