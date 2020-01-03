import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountService } from './account.service';
import { tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { SpinerService } from './spiner.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private accountService: AccountService, private messageService: MessageService, private spinerService: SpinerService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let request: HttpRequest<any> = req;

    if (this.accountService.hasToken()) {
      request = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + this.accountService.getToken())
      });
    }

    this.spinerService.start();
    this.messageService.clear();
    
    return next.handle(request).pipe(tap(
      event => {

        if (event instanceof HttpResponse) {
          this.spinerService.stop();
          //api call success
          console.log('success in calling API : ', event);
        }
      },
      error => {

        if (error instanceof HttpErrorResponse) {
          this.spinerService.stop();
          if (error.status === 401) {
            // do something when the status is unauthorized
          }
          if (error.status === 403) {
            // do something when the status is forbidden 
          }
          if (error.status === 500) {
            // do something  when the status is failed
          }
          if (error.status === 0) {
            // do something when the status is down
            this.messageService.error("services.errorStatus0");
          }
        }
      }
    ));
  }
}
