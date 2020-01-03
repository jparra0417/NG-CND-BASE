import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'cnd-p403',
  templateUrl: './p403.component.html'
})
export class P403Component extends BaseComponent implements OnInit {

  constructor(protected baseService: BaseService) {
    super(baseService);
  }

  ngOnInit() {
  }

}
