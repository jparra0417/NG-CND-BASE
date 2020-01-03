import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinerService {
  
  /** this is an observable that allows to get the message  */
  private subjectSpiner = new Subject<boolean>();
  constructor() { }

  start(){
    this.subjectSpiner.next(true);
  }

  stop(){
    this.subjectSpiner.next(false);
  }

  onSpiner(): Observable<boolean>{
    return this.subjectSpiner.asObservable();
  }
}
