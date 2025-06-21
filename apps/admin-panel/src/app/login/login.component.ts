import { Component, HostBinding } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginGQL } from '../../generated/graphql';
import { NzMessageService } from 'ng-zorro-antd/message';
import { firstValueFrom } from 'rxjs';

import { loginTransition } from './login.animation';
import { ThemeService } from '../@services/theme.service';
import { LocationStrategy } from '@angular/common';

@Component({
  standalone: false,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [loginTransition],
})
export class LoginComponent {
  @HostBinding('@loginTransition') state = 'activated';
  validateForm: UntypedFormGroup;
  validating = false;
  passwordVisible = false;
  baseHref: string;

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private message: NzMessageService,
    private loginGql: LoginGQL,
    public themeService: ThemeService,
    private locationStrategy: LocationStrategy,
  ) {
    this.baseHref = this.locationStrategy.getBaseHref();
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, []],
      remember: [true],
    });
  }

  async onLogin() {
    try {
      const username = this.validateForm.get('userName')?.value;
      const password = this.validateForm.get('password')?.value;
      const res = await firstValueFrom(
        this.loginGql.fetch({ username, password }),
      );
      localStorage.setItem('ridy_admin_token', res.data.login.token);
      this.router.navigate([''], {});
    } catch (exception: any) {
      this.message.error(exception.message);
      this.validateForm.controls['password'].setErrors({ incorrect: true });
    }
  }
}
