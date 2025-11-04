import { Component } from '@angular/core';
import { RouterHelperService } from '../../../@services/router-helper.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, firstValueFrom, map } from 'rxjs';
import { ApolloQueryResult } from '@apollo/client/core';
import {
  ExportToCsvGQL,
  PayoutSessionTransactionsQuery,
  PayoutMethodType,
  PayoutSessionStatus,
  RunAutoPayoutGQL,
  SaveManualPayoutItemGQL,
  TransactionStatus,
  UpdatePayoutSessionGQL,
  ViewPayoutSessionQuery,
  AppType,
} from '../../../../generated/graphql';
import { TableService } from '../../../@services/table-service';
import { environment } from '../../../../environments/environment';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  standalone: false,
  selector: 'app-view-payout-session',
  templateUrl: './view-payout-session.component.html',
  styleUrls: ['./view-payout-session.component.scss'],
})
export class ViewPayoutSessionComponent {
  id: string;

  constructor(
    private fb: FormBuilder,
    public tableService: TableService,
    private route: ActivatedRoute,
    private routerHelper: RouterHelperService,
    private messageService: NzMessageService,
    private runAutoPayoutGql: RunAutoPayoutGQL,
    private exportToCsvGql: ExportToCsvGQL,
    private saveManualPayoutGql: SaveManualPayoutItemGQL,
    private updatePayoutSessionStatusGql: UpdatePayoutSessionGQL,
  ) {
    this.id = this.route.snapshot.params.id;
    this.formGroupManualPayout = this.fb.group({
      transactionNumber: ['', Validators.required],
      description: [null],
    });
    this.transactions = this.route.data.pipe(map((data) => data.transactions));
    this.query = this.route.data.pipe(map((data) => data.payoutSession));
  }
  serverUrl = environment.root;

  formGroupManualPayout: FormGroup;

  query: Observable<ApolloQueryResult<ViewPayoutSessionQuery>>;

  transactions: Observable<ApolloQueryResult<PayoutSessionTransactionsQuery>>;

  transactionStatus = TransactionStatus;
  payoutMethodType = PayoutMethodType;
  payoutSessionStatus = PayoutSessionStatus;

  manualPayoutDialog?: NzModalRef;

  payoutDialogVisible = false;
  payoutDialogLoading = false;
  payoutDialogData?: PayoutSessionTransactionsQuery['taxiPayoutSession']['driverTransactions']['nodes'][0];

  getImageUrl(address?: string): string | undefined {
    if (!address) return undefined;
    const cleanAddress = address.replace(/^\/+/, '');
    return this.serverUrl + cleanAddress;
  }

  async exportToCSV(payoutMethodId: string) {
    try {
      const result = await firstValueFrom(
        this.exportToCsvGql.mutate({
          input: {
            payoutSessionId: this.id,
            payoutMethodId,
          },
        }),
      );
      window.open(this.serverUrl + result.data?.exportTaxiPayoutSessionToCsv);
    } catch (error: any) {
      this.messageService.error(error.message);
    }
  }

  getAmountToBePaid(
    list: ViewPayoutSessionQuery['taxiPayoutSession']['amountToBePaidByPayoutMethod'],
    payoutMethodId: string,
  ): number {
    return (
      list.find((item) => item.groupBy?.payoutMethodId == payoutMethodId)?.sum
        ?.amount ?? 0
    );
  }

  async payoutStripe(payoutMethodId: string) {
    try {
      await firstValueFrom(
        this.runAutoPayoutGql.mutate({
          input: {
            payoutSessionId: this.id,
            payoutMethodId,
          },
        }),
      );
      this.routerHelper.refresh(this.route);
      this.messageService.success('Payout completed successfully');
    } catch (error: any) {
      this.messageService.error(error.message);
    }
  }

  showPayoutDialog(
    driver: PayoutSessionTransactionsQuery['taxiPayoutSession']['driverTransactions']['nodes'][0],
  ) {
    this.payoutDialogData = driver;
    this.payoutDialogVisible = true;
  }

  async saveManualPayout(transactionId: string) {
    try {
      this.payoutDialogLoading = true;
      await firstValueFrom(
        this.saveManualPayoutGql.mutate({
          input: {
            appType: AppType.Taxi,
            userTransactionId: transactionId,
            transactionNumber:
              this.formGroupManualPayout.value.transactionNumber!,
            description: this.formGroupManualPayout.value.description,
          },
        }),
      );
      this.routerHelper.refresh(this.route);
      this.messageService.success('Payout completed successfully');
      this.payoutDialogLoading = false;
      this.payoutDialogVisible = false;
    } catch (error: any) {
      this.messageService.error(error.message);
    }
  }

  async changeStatus(sessionStatus: PayoutSessionStatus) {
    try {
      await firstValueFrom(
        this.updatePayoutSessionStatusGql.mutate({
          id: this.id,
          update: {
            status: sessionStatus,
          },
        }),
      );
      this.routerHelper.refresh(this.route);
      this.messageService.success('Payout status changed successfully');
    } catch (error: any) {
      this.messageService.error(error.message);
    }
  }
}
