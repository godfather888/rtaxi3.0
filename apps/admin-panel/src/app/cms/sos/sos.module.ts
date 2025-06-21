import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SOSRoutingModule } from './sos-routing.module';
import { SOSListComponent } from './sos-list/sos-list.component';
import { TagColorService } from '../../@services/tag-color/tag-color.service';
import { SharedModule } from '../../@components/shared.module';


@NgModule({
  declarations: [SOSListComponent],
  imports: [
    CommonModule,
    SOSRoutingModule,
    SharedModule
  ],
  providers: [TagColorService]
})
export class SOSModule { }
