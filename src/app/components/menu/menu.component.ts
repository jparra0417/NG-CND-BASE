import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';
import { BaseService } from 'src/app/services/base.service';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'cnd-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent extends BaseComponent implements OnInit {

  constructor(protected baseService: BaseService, private accountService: AccountService) { 
    super(baseService);
  }

  ngOnInit() {
  }

  getTextHome(){
    return this.isAuthenticated ? 'home.title' : 'signin.title';
  }

  signout(){
    this.accountService.setToken(null);
  }

}
