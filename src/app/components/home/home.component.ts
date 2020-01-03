import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'cnd-home',
  templateUrl: './home.component.html'
})
export class HomeComponent extends BaseComponent implements OnInit {

  constructor(protected baseService: BaseService) {
    super(baseService);
  }

  ngOnInit() {
  }

}
