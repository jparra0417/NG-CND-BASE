import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'cnd-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent extends BaseComponent implements OnInit {

  constructor(protected baseService: BaseService) {
    super(baseService);
  }

  ngOnInit() {
  }

}
