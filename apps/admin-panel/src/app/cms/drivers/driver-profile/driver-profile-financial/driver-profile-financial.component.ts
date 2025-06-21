import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApolloQueryResult } from '@apollo/client/core';
import {
  CreateDriverTransactionGQL,
  DriverDeductTransactionType,
  DriverFinancialsQuery,
  DriverRechargeTransactionType,
  RiderRechargeTransactionType,
} from '../../../../../generated/graphql';
import { RouterHelperService } from '../../../../@services/router-helper.service';
import { TableService } from '../../../../@services/table-service';
import { TagColorService } from '../../../../@services/tag-color/tag-color.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { firstValueFrom, map, Observable } from 'rxjs';

@Component({
  standalone: false,
  selector: 'app-driver-profile-financial',
  templateUrl: './driver-profile-financial.component.html',
})
export class DriverProfileFinancialComponent implements OnInit {
  formTransaction;
  query?: Observable<ApolloQueryResult<DriverFinancialsQuery>>;
  deductTypes = Object.values(DriverDeductTransactionType);
  rechargeTypes = Object.values(DriverRechargeTransactionType);

  constructor(
    private route: ActivatedRoute,
    public tableService: TableService,
    public tagColor: TagColorService,
    private fb: UntypedFormBuilder,
    private createTransactionGQL: CreateDriverTransactionGQL,
    private routerHelper: RouterHelperService,
    private msg: NzMessageService,
  ) {}
  ngOnInit(): void {
    this.query = this.route.data.pipe(map((data) => data.financials));
    this.formTransaction = this.fb.group({
      action: [null, Validators.required],
      rechargeType: [null],
      deductType: [null],
      amount: [0, Validators.required],
      currency: [null, Validators.required],
      description: [null],
      refrenceNumber: [null],
    });
  }

  async onSubmitTransaction() {
    if (
      this.formTransaction.value.action == 'Recharge' &&
      this.formTransaction.value.rechargeType == null
    ) {
      this.msg.error('Please select the transaction type.');
      return;
    }
    if (
      this.formTransaction.value.action == 'Deduct' &&
      this.formTransaction.value.deductType == null
    ) {
      this.msg.error('Please select the transaction type.');
      return;
    }
    this.formTransaction.value.driverId = this.route.parent?.snapshot.params.id;
    try {
      await firstValueFrom(
        this.createTransactionGQL.mutate({ input: this.formTransaction.value }),
      );
      this.msg.success('Transaction Submitted.');
      this.routerHelper.refresh(this.route);
      this.formTransaction.patchValue({});
    } catch (error: any) {
      this.msg.error(error.message);
    }
  }

  getUniquieCurrencies(currencies: { currency: string }[] | undefined) {
    if (currencies == undefined) return [];
    return [...new Set(currencies)];
  }
}
