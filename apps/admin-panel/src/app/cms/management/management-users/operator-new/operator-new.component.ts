import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApolloQueryResult } from '@apollo/client/core';
import {
  CreateOperatorGQL,
  NewOperatorQuery,
} from '../../../../../generated/graphql';
import { COUNTRY_CODE_LIST } from '../../../../country-codes';
import { firstValueFrom, map, Observable } from 'rxjs';

import { RouterHelperService } from '../../../../@services/router-helper.service';

@Component({
  standalone: false,
  selector: 'app-operator-new',
  templateUrl: './operator-new.component.html',
  styles: [],
})
export class OperatorNewComponent implements OnInit {
  query?: Observable<ApolloQueryResult<NewOperatorQuery>>;
  form: UntypedFormGroup;
  countryCodes = COUNTRY_CODE_LIST;

  constructor(
    private fb: UntypedFormBuilder,
    private createGQL: CreateOperatorGQL,
    private routerHelper: RouterHelperService,
    private route: ActivatedRoute,
  ) {
    this.form = this.fb.group({
      firstName: [null],
      lastName: [null],
      roleId: [null, Validators.required],
      phoneNumberPrefix: ['+1', Validators.required],
      phoneNumber: [null, Validators.required],
      userName: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.query = this.route.data.pipe(map((data) => data.operator));
  }

  async submitForm() {
    const { phoneNumber, phoneNumberPrefix, ..._formValue } = this.form.value;
    await firstValueFrom(
      this.createGQL.mutate({
        input: {
          mobileNumber: `${phoneNumberPrefix.substring(1)}${phoneNumber}`,
          ..._formValue,
        },
      }),
    );
    this.routerHelper.goToParent(this.route);
  }
}
