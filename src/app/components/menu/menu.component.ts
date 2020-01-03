import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'cnd-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent extends BaseComponent implements OnInit {

  constructor(protected baseService: BaseService) { 
    super(baseService);
  }

  ngOnInit() {
  }

}
