import { Injectable } from '@angular/core';
import { LangService } from './lang.service';
import { AccountService } from './account.service';
import { MessageService } from './message.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  constructor(private langService: LangService, private accountService: AccountService, private messageService: MessageService) { }

  

  /** it returns the lang service */
  public getLangService(): LangService {
    return this.langService;
  }

  /** it returns the account service */
  public getAccountService(): AccountService {
    return this.accountService;
  }
  /** it returns the message service */
  public getMessageService(): MessageService {
    return this.messageService;
  }
}
