import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'cnd-p404',
  templateUrl: './p404.component.html'
})
export class P404Component extends BaseComponent implements OnInit {

  constructor(protected baseService: BaseService) {
    super(baseService);
  }

  ngOnInit() {
  }

}
