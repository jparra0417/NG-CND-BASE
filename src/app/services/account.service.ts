import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Account } from '../models/account';
import environment from '/workspace/cnd/env/json-cnd-base.json';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  /** it emits when the authentication is changed  */
  private subjectLogged = new BehaviorSubject<boolean>(this.hasToken());

  public static LOCAL_STORAGE_KEY_JWT = "cnd_jwt";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) { }

  login(account: Account) {
    return this.http.post(environment.backend.base + '/account/signin', account, this.httpOptions);
  }

  /** it shows if it is logged */
  hasToken(): boolean {
    if (this.getToken())
      return true;      
    return false;
  }

  /**
   * It sets the jwt
   * @param token 
   */
  setToken(token: string) {
    if (token)
      localStorage.setItem(AccountService.LOCAL_STORAGE_KEY_JWT, token);
    else
      localStorage.removeItem(AccountService.LOCAL_STORAGE_KEY_JWT);
    this.subjectLogged.next(this.hasToken());
  }
  /** subscribe if is logged */
  isAuthenticated(): Observable<boolean> {
    return this.subjectLogged.asObservable();
  }
  /** return the token */
  getToken(){
    return localStorage.getItem(AccountService.LOCAL_STORAGE_KEY_JWT);
  }
}
