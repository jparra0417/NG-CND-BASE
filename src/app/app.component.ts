import { Component } from '@angular/core';
import { BaseComponent } from './components/base.component';
import { BaseService } from './services/base.service';

@Component({
  selector: 'cnd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent extends BaseComponent {
  constructor(protected baseService: BaseService) {
    super(baseService);
  }
}
