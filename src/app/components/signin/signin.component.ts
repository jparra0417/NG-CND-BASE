import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';
import { BaseService } from 'src/app/services/base.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { Account } from 'src/app/models/account';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'cnd-signin',
  templateUrl: './signin.component.html'
})
export class SigninComponent extends BaseComponent implements OnInit {

  formSignin: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(100)]),
    password: new FormControl('', [Validators.required, Validators.maxLength(100)]),
  })

  constructor(protected baseService: BaseService, private accountService: AccountService) {
    super(baseService);
  }

  ngOnInit() {

  }
  /**  it signs in */
  signin() {
    if (this.isValidForm(this.formSignin)) {
      const account: Account = this.fillObject(this.formSignin);
      this.accountService.signin(account).subscribe((result: any) => {
        if (result) {
          this.accountService.setToken(result.jwt);
          this.baseService.getMessageService().success('signin.success');
        }
      }, (error: HttpErrorResponse) => {
        if (error.status == 401)
          if (error.error)
            this.baseService.getMessageService().warning(error.error);           

      })
    }
  }
}
