import { Component, OnInit } from '@angular/core';
import { SpinerService } from 'src/app/services/spiner.service';

@Component({
  selector: 'cnd-spiner',
  templateUrl: './spiner.component.html'
})
export class SpinerComponent implements OnInit {

  spiner : boolean = false;
  constructor(private spinerService : SpinerService) { }

  ngOnInit() {
    this.spinerService.onSpiner().subscribe((result :boolean) => {
      // console.log("spiner", result)
      this.spiner = result;
    });
  }

}
