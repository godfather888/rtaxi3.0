import { Component, OnInit } from '@angular/core';
import { Validators, UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  OperatorPermission,
  CreateRoleGQL,
  UpdateRoleGQL,
} from '../../../../../generated/graphql';
import { RouterHelperService } from '../../../../@services/router-helper.service';
import { firstValueFrom, Subscription } from 'rxjs';

@Component({
  standalone: false,
  selector: 'app-role-view',
  templateUrl: './role-view.component.html',
  styles: [],
})
export class RoleViewComponent implements OnInit {
  form;
  subscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private fb: UntypedFormBuilder,
    private updateGQL: UpdateRoleGQL,
    private createGQL: CreateRoleGQL,
    private routerHelper: RouterHelperService,
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.data.subscribe((data) => {
      if (data.role != null) {
        this.form.patchValue(data.role.data.operatorRole);
      }
    });
    this.form = this.fb.group({
      id: [null],
      title: [null, Validators.required],
      permissions: [[], Validators.required],
    });
  }

  getPermissionsCategories() {
    const withDuplicates = Object.values(OperatorPermission).map(
      (permission) => permission.split('_')[0],
    );
    return [...new Set(withDuplicates)];
  }

  getCategoryPermissions(category: string) {
    return Object.values(OperatorPermission)
      .filter((permission) => permission.startsWith(category + '_'))
      .map((permission) => permission.split('_')[1]);
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
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

  onPermissionCheckChanged(
    category: string,
    permission: string,
    checked: boolean,
  ) {
    if (
      !(this.form.value.permissions as string[]).includes(
        `${category}_${permission}`,
      ) &&
      checked
    ) {
      (this.form.value.permissions as string[]).push(
        `${category}_${permission}`,
      );
      this.form.patchValue({ permissions: this.form.value.permissions });
    }
    if (!checked) {
      const permissions = JSON.parse(
        JSON.stringify(this.form.value.permissions),
      ).filter((pr: string) => {
        return pr != `${category}_${permission}`;
      });
      this.form.patchValue({ permissions: permissions });
    }
  }

  isPermissionChecked(category: string, permission: string): boolean {
    return this.form.value.permissions.includes(`${category}_${permission}`);
  }
}
