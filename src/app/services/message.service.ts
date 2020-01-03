import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  /** this is an observable that allows to get the message  */
  private subjectMessage = new Subject<any>();

  public static MESSAGE_WARNING = 'warning';
  public static MESSAGE_ERROR = 'error';
  public static MESSAGE_SUCCESS = 'success';
  public static MESSAGE_INFO = 'info';

  constructor() { }

  clear(){
    this.subjectMessage.next(null);
  }
  
  success(message: string) {
    this.subjectMessage.next({ message: message, type: MessageService.MESSAGE_SUCCESS });
  }

  warning(message: string) {
    this.subjectMessage.next({ message: message, type: MessageService.MESSAGE_WARNING });
  }

  error(message: string) {
    this.subjectMessage.next({ message: message, type: MessageService.MESSAGE_ERROR });
  }

  info(message: string) {
    this.subjectMessage.next({ message: message, type: MessageService.MESSAGE_INFO });
  }

  onMessage() {
    return this.subjectMessage.asObservable();
  }
}
