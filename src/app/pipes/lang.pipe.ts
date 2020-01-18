import { Pipe, PipeTransform } from '@angular/core';
import { LangService } from '../services/lang.service';

@Pipe({
  name: 'lang'
})
export class LangPipe implements PipeTransform {

  
  constructor(private langService: LangService) {
  
  }
  
  /** it translates text */
  transform(value: any, args?: any): any {
    return this.langService.translate(value, args);
  }

}
