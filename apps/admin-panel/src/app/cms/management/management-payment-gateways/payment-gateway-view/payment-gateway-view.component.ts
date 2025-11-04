import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApolloQueryResult } from '@apollo/client/core';
import {
  CreatePaymentGatewayGQL,
  PaymentGatewayType,
  UpdatePaymentGatewayGQL,
  ViewPaymentGatewayQuery,
} from '../../../../../generated/graphql';
import { RouterHelperService } from '../../../../@services/router-helper.service';
import { environment } from '../../../../../environments/environment';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { NzModalService } from 'ng-zorro-antd/modal';
import { firstValueFrom, Observable, Observer, Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  standalone: false,
  selector: 'app-payment-gateway-view',
  templateUrl: './payment-gateway-view.component.html',
})
export class PaymentGatewayViewComponent implements OnInit, OnDestroy {
  form;
  subscription?: Subscription;
  unavailableGateways = [
    PaymentGatewayType.BrainTree,
    PaymentGatewayType.PayGate,
    PaymentGatewayType.SberBank,
  ];
  gatewayTypes = Object.values(PaymentGatewayType).filter(
    (type) => !this.unavailableGateways.includes(type as PaymentGatewayType),
  );
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

  constructor(
    private route: ActivatedRoute,
    private fb: UntypedFormBuilder,
    private updateGQL: UpdatePaymentGatewayGQL,
    private createGQL: CreatePaymentGatewayGQL,
    private routerHelper: RouterHelperService,
    private msg: NzMessageService,
    private modal: NzModalService,
    private apollo: Apollo,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [null],
      title: [null, Validators.required],
      type: [null, Validators.required],
      enabled: [true, Validators.required],
      privateKey: [null, Validators.required],
      publicKey: [null],
      saltKey: [null],
      merchantId: [null],
      mediaId: [null],
    });
    
    this.subscription = this.route.data.subscribe((data) => {
      const gateway: ApolloQueryResult<ViewPaymentGatewayQuery> =
        data.paymentGateway;
      if (gateway?.data?.paymentGateway) {
        this.form.patchValue(gateway.data.paymentGateway as any);
        this.avatarUrl = gateway.data.paymentGateway?.media?.address ? 
          this.root + gateway.data.paymentGateway.media.address.replace(/^\/+/, '') : 
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
      await firstValueFrom(this.updateGQL.mutate({ id, input }));
    }
    this.routerHelper.goToParent(this.route);
  }

  onDelete() {
    this.modal.confirm({
      nzTitle: 'Удалить способ оплаты?',
      nzContent: 'Это действие необратимо. Продолжить?',
      nzOkText: 'Удалить',
      nzOkDanger: true,
      nzCancelText: 'Отмена',
      nzOnOk: async () => {
        const id = this.form.value.id;
        if (id) {
          const DELETE_MUTATION = gql`
            mutation DeletePaymentGateway($id: ID!) {
              deleteOnePaymentGateway(input: { id: $id }) {
                id
              }
            }
          `;
          await firstValueFrom(this.apollo.mutate({ 
            mutation: DELETE_MUTATION, 
            variables: { id } 
          }));
          this.msg.success('Способ оплаты успешно удален');
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
    type?: PaymentGatewayType,
  ): GatewayAPIKeyObj | null {
    if (type == null) return null;
    switch (type) {
      case PaymentGatewayType.AmazonPaymentServices:
        return {
          privateKey: 'Access Code',
          merchantId: 'Merchant Identifier',
        };

      case PaymentGatewayType.BrainTree: // TODO: Complete the integration
        return {
          privateKey: 'Private key',
          publicKey: 'Public key',
          merchantId: 'Merchant ID',
        };
      case PaymentGatewayType.CustomLink:
        return {
          privateKey: 'URL',
        };

      case PaymentGatewayType.Flutterwave:
        return {
          privateKey: 'Secret Key',
        };

      case PaymentGatewayType.Instamojo:
        return {
          privateKey: 'Auth Key',
          publicKey: 'API Key',
        };

      case PaymentGatewayType.Mips:
        console.log(type);
        return {
          privateKey: 'Cipher key',
          saltKey: 'Salt key',
          publicKey: 'Form ID',
          merchantId: 'Merchant ID',
        };

      case PaymentGatewayType.MercadoPago:
        return {
          publicKey: 'Public key',
          privateKey: 'Access Token',
        };

      case PaymentGatewayType.PayTr:
        return {
          merchantId: 'Merchant ID',
          privateKey: 'Merchant key',
          saltKey: 'Merchant salt',
        };

      case PaymentGatewayType.MyFatoorah:
        return {
          privateKey: 'Private key',
          merchantId: 'Payment Method code',
        };

      case PaymentGatewayType.MyTMoney:
        return {
          publicKey: 'Public key',
          privateKey: 'Private key',
          merchantId: 'App Id',
        };

      case PaymentGatewayType.PayGate: // TODO: Complete the integration
        return {
          privateKey: 'Secret Key',
        };
      case PaymentGatewayType.PayPal:
        return {
          privateKey: 'Client Secret',
          merchantId: 'Client ID',
        };

      case PaymentGatewayType.PayU:
        return {
          privateKey: 'Client secret',
          merchantId: 'Merchant Pos Id',
        };
      case PaymentGatewayType.Paystack:
        return {
          privateKey: 'API key',
        };
      case PaymentGatewayType.Paytm:
        return {
          privateKey: 'Merchant Key',
          merchantId: 'Merchant Id',
        };
      case PaymentGatewayType.Razorpay:
        return {
          privateKey: 'Key Secret',
          merchantId: 'Key Id',
        };

      case PaymentGatewayType.SberBank: // TODO: Complete the integration
        return {
          publicKey: 'Username',
          privateKey: 'Password',
        };

      case PaymentGatewayType.Stripe:
        return {
          privateKey: 'API key',
        };

      case PaymentGatewayType.WayForPay:
        return {
          privateKey: 'Merchant secret Key',
          publicKey: 'Merchant domain name',
          merchantId: 'Merchant Id',
        };

      case PaymentGatewayType.BinancePay:
        return {
          publicKey: 'API Key',
          privateKey: 'Secret Key',
        };

      case PaymentGatewayType.OpenPix:
        return {
          privateKey: 'AppID',
        };
    }
  }
}
class GatewayAPIKeyObj {
  privateKey!: string;
  publicKey?: string;
  saltKey?: string;
  merchantId?: string;
}
