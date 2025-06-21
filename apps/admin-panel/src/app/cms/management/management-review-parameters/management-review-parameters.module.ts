import { NgModule } from '@angular/core';
import { ManagementReviewParametersRoutingModule } from './management-review-parameters-routing.module';
import { ReviewParametersListComponent } from './review-parameters-list/review-parameters-list.component';
import { ReviewParameterViewComponent } from './review-parameter-view/review-parameter-view.component';
import { TagColorService } from '../../../@services/tag-color/tag-color.service';
import { SharedModule } from '../../../@components/shared.module';

@NgModule({
  declarations: [ReviewParametersListComponent, ReviewParameterViewComponent],
  imports: [ManagementReviewParametersRoutingModule, SharedModule],
  providers: [TagColorService],
})
export class ManagementReviewParametersModule {}
