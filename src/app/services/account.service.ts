import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Account } from '../models/account';
import environment from '/workspace/cnd/env/json-cnd-base.json';
import { BehaviorSubject, Observable } from 'rxjs';
import { BaseService } from './base.service';
import { HttpUtil } from '../utils/http-util';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  /** it emits when the authentication is changed  */
  private subjectLogged = new BehaviorSubject<boolean>(this.hasToken());

  public static LOCAL_STORAGE_KEY_JWT = "cnd_jwt";


  constructor(private http: HttpClient) { }

  signin(account: Account) {
    return this.http.post(environment.backend.base + '/account/signin', account, HttpUtil.httpOptionsJson);
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
  getToken() {
    return localStorage.getItem(AccountService.LOCAL_STORAGE_KEY_JWT);
  }

  /** save the password by token */
  savePasswordByToken(password: string, hash: string, token: string) {
    return this.http.post(environment.backend.base + '/account/savePasswordByToken?_h=' + hash, { password: password, token: token }, HttpUtil.httpOptionsJson);
  }
}
