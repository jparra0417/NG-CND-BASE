import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';
import { BaseService } from 'src/app/services/base.service';
import { Router } from '@angular/router';

@Component({
  selector: 'cnd-lang',
  templateUrl: './lang.component.html'
})
export class LangComponent extends BaseComponent implements OnInit {
  /** It contains the lang */
  lang: string;

  constructor(protected baseService: BaseService, private router: Router) {
    super(baseService);

    // set lang
    this.baseService.getLangService().onChangeLang().subscribe(result => {
      if (result)
        this.lang = result;
    });
  }
  

  ngOnInit() {
  }

  /**
   * it changes the language
   * @param value 
   */
  onChangeSelect(value){
    this.baseService.getLangService().use(value);
    location.reload();
  }

}
