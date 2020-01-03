import { Pipe, PipeTransform } from '@angular/core';
import { LangService } from '../services/lang.service';

@Pipe({
  name: 'lang'
})
export class LangPipe implements PipeTransform {

  /** it contains the current lang */
  private lang: string;

  constructor(private langService: LangService) {
    this.langService.onChangeLang().subscribe(result => {
      if (result) this.lang = result;
    })
  }
  /** it translates text */
  transform(value: any, args?: any): any {
    return this.langService.translate(value);
  }

}
