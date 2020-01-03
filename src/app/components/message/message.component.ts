import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';
import { BaseService } from 'src/app/services/base.service';
import { Router } from '@angular/router';

@Component({
  selector: 'cnd-message',
  templateUrl: './message.component.html'
})
export class MessageComponent extends BaseComponent implements OnInit {

  message: any;
  show: boolean = false;

  constructor(protected baseService: BaseService, protected router : Router) {
    super(baseService);
  }

  ngOnInit() {

    this.router.events.subscribe((val) => {
      this.baseService.getMessageService().clear();
    });

    this.baseService.getMessageService().onMessage().subscribe(message => {
      if (message) {
        this.message = message;
        this.show = true;
      } else {
        this.show = false;
      }
    });
  }

  close() {
    this.show = false;
  }

}
