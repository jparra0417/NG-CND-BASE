import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '../base.component';
import { BaseService } from 'src/app/services/base.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormUtil } from 'src/app/utils/form-util';
import { HttpErrorResponse } from '@angular/common/http';
import { Account } from 'src/app/models/account';

@Component({
  selector: 'cnd-password',
  templateUrl: './password.component.html'
})
export class PasswordComponent extends BaseComponent implements OnInit {

  /** verify if the component is ready */
  ready: boolean = false;
  /** token */
  token: string;
  /** hash */
  hash: string;
  /** enable */
  enable : boolean;


  formPassword: FormGroup;

  constructor(protected baseService: BaseService, private route: ActivatedRoute, private router: Router) {
    super(baseService);
    this.route.paramMap.subscribe(paramMap => {
      this.token = paramMap.get('token');
      this.hash = paramMap.get('hash');
      if(paramMap.get('enable'))
        this.enable = paramMap.get('enable') == 'true';      
      if (!this.token || !this.hash) {
        this.router.navigate(['/404']);
        return;
      }

      // create form
      let password: FormControl = new FormControl('', [Validators.required, Validators.maxLength(100)]);
      let confirm: FormControl = new FormControl('', [Validators.required, FormUtil.match(password)]);
      this.formPassword = new FormGroup({
        password: password,
        confirm: confirm
      });


      this.ready = true;
    });
  }

  save() {
    if (this.isValidForm(this.formPassword)) {
      let account: Account = this.fillObject(this.formPassword);
      account.token = this.token;
      if(this.enable != undefined)
        account.enable = this.enable;
      this.baseService.getAccountService().savePasswordByToken(account, this.hash).subscribe((result: any) => {
        this.baseService.getMessageService().success('password.success', '/');        
      }, (error: HttpErrorResponse) => {
        if (error.status == 400)
          if (error.error)
            this.baseService.getMessageService().warning(error.error);
      })
    }
  }

  ngOnInit() {
  }

}
