import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';
import { BaseService } from 'src/app/services/base.service';
import { Router, NavigationEnd } from '@angular/router';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'cnd-message',
  templateUrl: './message.component.html'
})
export class MessageComponent extends BaseComponent implements OnInit {

  message: any;
  show: boolean = false;
  url: string;

  constructor(protected baseService: BaseService, protected router: Router) {
    super(baseService);
  }

  ngOnInit() {

    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (!this.url)
          this.baseService.getMessageService().clear();
        else
          this.url = undefined;
      }
    });

    this.baseService.getMessageService().onMessage().subscribe(message => {
      if (message) {
        this.message = message;
        this.url = message.url;
        this.show = true;
        if(this.url)
          this.router.navigate([this.url]);        
      } else {
        this.show = false;
      }
    });
  }

  close() {
    this.show = false;
  }
}
