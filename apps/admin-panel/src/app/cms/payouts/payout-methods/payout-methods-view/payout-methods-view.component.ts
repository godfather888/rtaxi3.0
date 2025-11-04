import { Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApolloQueryResult } from '@apollo/client/core';
import {
  CreatePayoutMethodGQL,
  PayoutMethodType,
  UpdatePayoutMethodGQL,
  ViewPayoutMethodQuery,
} from '../../../../../generated/graphql';
import { RouterHelperService } from '../../../../@services/router-helper.service';
import { CURRENCY_LIST } from '../../../../currencies';
import { environment } from '../../../../../environments/environment';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { NzModalService } from 'ng-zorro-antd/modal';
import { firstValueFrom, Observable, Observer, Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  standalone: false,
  selector: 'app-payout-methods-view',
  templateUrl: './payout-methods-view.component.html',
  styleUrls: ['./payout-methods-view.component.css'],
})
export class PayoutMethodsViewComponent {
  form;
  subscription?: Subscription;
  methodTypes = Object.keys(PayoutMethodType);
  root = environment.root;
  jwt = localStorage.getItem('ridy_admin_token');
  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]) =>
    new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng =
        file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.msg.error('You can only upload JPG file!');
        observer.complete();
        return;
      }
      const isLt2M = (file.size ?? 0) / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.msg.error('Image must smaller than 2MB!');
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt2M);
      observer.complete();
    });
  avatarUrl?: string;
  loadingUpload = false;
  currencies = CURRENCY_LIST;

  constructor(
    private route: ActivatedRoute,
    private fb: UntypedFormBuilder,
    private updateGQL: UpdatePayoutMethodGQL,
    private createGQL: CreatePayoutMethodGQL,
    private routerHelper: RouterHelperService,
    private msg: NzMessageService,
    private modal: NzModalService,
    private apollo: Apollo,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [null],
      name: [null, Validators.required],
      currency: [null, Validators.required],
      description: [null],
      type: [null, Validators.required],
      enabled: [true, Validators.required],
      privateKey: [null],
      publicKey: [null],
      saltKey: [null],
      merchantId: [null],
      mediaId: [null],
    });
    
    this.subscription = this.route.data.subscribe((data) => {
      const gateway: ApolloQueryResult<ViewPayoutMethodQuery> =
        data.payoutMethod;
      if (gateway?.data?.payoutMethod) {
        this.form.patchValue(gateway.data.payoutMethod as any);
        this.avatarUrl = gateway.data.payoutMethod?.media?.address ? 
          this.root + gateway.data.payoutMethod.media.address.replace(/^\/+/, '') : 
          undefined;
      }
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  async onSubmit() {
    const { id, ...input } = this.form.value;
    if (id == null) {
      await firstValueFrom(this.createGQL.mutate({ input }));
    } else {
      await firstValueFrom(this.updateGQL.mutate({ id, update: input }));
    }
    this.routerHelper.goToParent(this.route);
  }

  onDelete() {
    this.modal.confirm({
      nzTitle: 'Удалить способ выплаты?',
      nzContent: 'Это действие необратимо. Продолжить?',
      nzOkText: 'Удалить',
      nzOkDanger: true,
      nzCancelText: 'Отмена',
      nzOnOk: async () => {
        const id = this.form.value.id;
        if (id) {
          const DELETE_MUTATION = gql`
            mutation DeletePayoutMethod($id: ID!) {
              deleteOnePayoutMethod(input: { id: $id }) {
                id
              }
            }
          `;
          await firstValueFrom(this.apollo.mutate({ 
            mutation: DELETE_MUTATION, 
            variables: { id } 
          }));
          this.msg.success('Способ выплаты успешно удален');
          this.routerHelper.goToParent(this.route);
        }
      }
    });
  }

  handleUploadChange(event: { file: NzUploadFile }) {
    switch (event.file.status) {
      case 'uploading':
        this.loadingUpload = true;
        break;
      case 'done':
        this.loadingUpload = false;
        this.form.patchValue({ mediaId: event.file.response.id });
        this.avatarUrl = event.file.response.address ? 
          this.root + event.file.response.address.replace(/^\/+/, '') : 
          undefined;
        break;
      case 'error':
        this.msg.error('Network error');
        this.loadingUpload = false;
        break;
    }
  }

  getPaymentGatewayAPIRequirements(
    type?: PayoutMethodType,
  ): GatewayAPIKeyObj | null {
    if (type == null) return null;
    switch (type) {
      case PayoutMethodType.Stripe:
        return {
          privateKey: 'API key',
        };

      case PayoutMethodType.BankTransfer:
        return null;
    }
  }
}
class GatewayAPIKeyObj {
  privateKey?: string;
  publicKey?: string;
  saltKey?: string;
  merchantId?: string;
}
