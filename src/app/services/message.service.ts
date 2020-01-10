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

  clear() {
    this.subjectMessage.next(null);
  }

  private sendMessage(message: any, type: string, url ?: string) {
    if (!message || !message.length) return this.clear();
    if (!(message instanceof Array)) {
      message = [message];
    }
    this.subjectMessage.next({ message: message, type: type, url: url });
  }
  success(message: any, url ?: string) {
    this.sendMessage(message,MessageService.MESSAGE_SUCCESS, url );
  }

  warning(message: any, url ?: string) {
    this.sendMessage(message,MessageService.MESSAGE_WARNING, url );
  }

  error(message: any, url ?: string) {
    this.sendMessage(message,MessageService.MESSAGE_ERROR, url );
  }

  info(message: any, url ?: string) {
    this.sendMessage(message,MessageService.MESSAGE_INFO, url );
  }

  onMessage() {
    return this.subjectMessage.asObservable();
  }
}
