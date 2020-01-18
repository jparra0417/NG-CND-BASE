import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';
import { BaseService } from 'src/app/services/base.service';
import { Account } from 'src/app/models/account';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'cnd-reset',
  templateUrl: './reset.component.html'
})
export class ResetComponent extends BaseComponent implements OnInit {

  formReset: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(100)]),
  });

  constructor(protected baseService: BaseService) {
    super(baseService);
  }

  ngOnInit() {
  }

  /**  it signs in */
  reset() {
    if (this.isValidForm(this.formReset)) {
      const account: Account = this.fillObject(this.formReset);
      this.baseService.getAccountService().resetPassword(account).subscribe((result: any) => {
        this.baseService.getMessageService().success('reset.success');
      }, (error: HttpErrorResponse) => {
        if (error.status == 400)
          if (error.error)
            this.baseService.getMessageService().warning(error.error);
      });
    }
  }
}
