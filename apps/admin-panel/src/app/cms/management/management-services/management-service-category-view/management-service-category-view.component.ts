import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  CreateServiceCategoryGQL,
  DeleteServiceCategoryGQL,
  UpdateServiceCategoryGQL,
} from '../../../../../generated/graphql';
import { RouterHelperService } from '../../../../@services/router-helper.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { firstValueFrom, Subscription } from 'rxjs';

@Component({
  standalone: false,
  selector: 'app-management-service-category-view',
  templateUrl: './management-service-category-view.component.html',
})
export class ManagementServiceCategoryViewComponent
  implements OnInit, OnDestroy
{
  form;
  subscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private updateGQL: UpdateServiceCategoryGQL,
    private createGQL: CreateServiceCategoryGQL,
    private deleteGQL: DeleteServiceCategoryGQL,
    private fb: UntypedFormBuilder,
    private routerHelper: RouterHelperService,
    private msg: NzMessageService,
  ) {
    this.form = this.fb.group({
      id: [null],
      name: [null, Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.route.data.subscribe((data) =>
      data.serviceCategory != null
        ? this.form.patchValue(data.serviceCategory.data.serviceCategory)
        : null,
    );
  }

  async onSubmit() {
    const { id, ...input } = this.form.value;
    if (id == null) {
      await firstValueFrom(this.createGQL.mutate({ input }));
    } else {
      await firstValueFrom(this.updateGQL.mutate({ id, input }));
    }
    this.routerHelper.goToParent(this.route);
  }

  async deleteCategory() {
    const id = this.form.value.id;
    try {
      const res = await firstValueFrom(this.deleteGQL.mutate({ id }));
      this.routerHelper.goToParent(this.route);
      this.msg.success('Deleted!');
    } catch (exception: any) {
      this.msg.error(exception.message);
    }
  }
}
