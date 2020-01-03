import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'cnd-lang',
  templateUrl: './lang.component.html'
})
export class LangComponent extends BaseComponent implements OnInit {

  constructor(protected baseService: BaseService) {
    super(baseService);
  }

  ngOnInit() {
  }

  /**
   * it changes the language
   * @param value 
   */
  onChangeSelect(value){
    this.baseService.getLangService().use(value);
  }

}
