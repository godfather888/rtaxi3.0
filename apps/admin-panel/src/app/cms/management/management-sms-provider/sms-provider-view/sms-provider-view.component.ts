import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApolloQueryResult } from '@apollo/client/core';
import {
  CreateSmsProviderGQL,
  MarkSmsProviderAsDefaultGQL,
  SmsProviderType,
  UpdateSmsProviderGQL,
  ViewSmsProviderQuery,
} from '../../../../../generated/graphql';
import { RouterHelperService } from '../../../../@services/router-helper.service';
import { environment } from '../../../../../environments/environment';
import { NzModalService } from 'ng-zorro-antd/modal';
import { firstValueFrom, Subscription } from 'rxjs';

@Component({
  standalone: false,
  selector: 'app-sms-provider-view',
  templateUrl: './sms-provider-view.component.html',
})
export class SMSProviderViewComponent implements OnInit, OnDestroy {
  constructor(
    public route: ActivatedRoute,
    private fb: UntypedFormBuilder,
    private updateGQL: UpdateSmsProviderGQL,
    private createGQL: CreateSmsProviderGQL,
    private markAsDefaultGQL: MarkSmsProviderAsDefaultGQL,
    private routerHelper: RouterHelperService,
    private modalService: NzModalService,
  ) {
    this.form = this.fb.group({
      id: [null],
      name: [null, Validators.required],
      type: [null, Validators.required],
      accountId: [null],
      authToken: [null],
      verificationTemplate: [null],
      fromNumber: [null],
      smsType: [null],
    });
  }

  form: UntypedFormGroup;
  subscription?: Subscription;
  smsProviders = [
    SmsProviderType.Twilio,
    SmsProviderType.BroadNet,
    SmsProviderType.Plivo,
    SmsProviderType.Vonage,
    SmsProviderType.Pahappa,
    SmsProviderType.VentisSms,
  ];
  jwt = localStorage.getItem('ridy_admin_token');

  ngOnInit(): void {
    this.subscription = this.route.data.subscribe((data) => {
      const provider: ApolloQueryResult<ViewSmsProviderQuery> =
        data.smsProvider;
      this.form.patchValue(provider.data.smsProvider);
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  async onSubmit() {
    console.log('Form submitted', this.form.value);
    const { id, ...input } = this.form.value;
    if (id == null) {
      this.modalService.create({
        nzTitle: 'Default SMS Provider',
        nzContent: 'Do you want to set this as the default SMS provider?',
        nzOnOk: async () => {
          console.log('create', input);
          await firstValueFrom(
            this.createGQL.mutate({ input: { ...input, isDefault: true } }),
          );
          this.routerHelper.goToParent(this.route);
        },
        nzOnCancel: async () => {
          await firstValueFrom(this.createGQL.mutate({ input }));
          this.routerHelper.goToParent(this.route);
        },
      });
    } else {
      await firstValueFrom(this.updateGQL.mutate({ id, input }));
      this.routerHelper.goToParent(this.route);
    }
  }

  getProviderAPIRequirements(
    type?: SmsProviderType,
  ): SMSProviderAPIKeyObj | null {
    if (type == null) return null;
    switch (type) {
      case SmsProviderType.Twilio:
        return {
          accountId: 'Account SID',
          authToken: 'Auth Token',
          fromNumber: 'From Number',
          verificationTemplate: 'Verification Template',
        };

      case SmsProviderType.BroadNet:
        return {
          accountId: 'Username',
          authToken: 'Password',
          fromNumber: 'From Number',
          smsType: 'SMS Type',
          verificationTemplate: 'Verification Template',
        };

      case SmsProviderType.Plivo:
        return {
          accountId: 'Auth ID',
          authToken: 'Auth Token',
          fromNumber: 'Sender ID',
          verificationTemplate: 'Verification Template',
        };

      case SmsProviderType.Vonage:
        return {
          accountId: 'API Key',
          authToken: 'API Secret',
          fromNumber: 'From Number',
          verificationTemplate: 'Verification Template',
        };

      case SmsProviderType.Pahappa:
        return {
          accountId: 'Username',
          authToken: 'Password',
          fromNumber: 'Sender',
          verificationTemplate: 'Verification Template',
        };

      case SmsProviderType.VentisSms:
        return {
          accountId: 'Username',
          smsType: 'Password',
          authToken: 'Client Secret',
          fromNumber: 'Sender',
          verificationTemplate: 'Verification Template',
        };

      default:
        return null;
    }
  }

  async markAsDefault() {
    const id = this.form.get('id')?.value;
    if (id == null) return;
    await firstValueFrom(this.markAsDefaultGQL.mutate({ id }));
    this.routerHelper.goToParent(this.route);
  }
}
class SMSProviderAPIKeyObj {
  accountId?: string;
  authToken?: string;
  fromNumber?: string;
  verificationTemplate?: string;
  smsType?: string;
}
