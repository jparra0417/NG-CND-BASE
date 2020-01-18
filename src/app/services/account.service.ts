import { Injectable } from '@angular/core';
import { Account } from '../models/account';
import environment from '/workspace/cnd/env/ENV-CND-BASE/json-cnd-base.json';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpUtil } from '../utils/http-util';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  /** it emits when the authentication is changed  */
  private subjectLogged = new BehaviorSubject<boolean>(this.hasToken());

  public static LOCAL_STORAGE_KEY_JWT = "cnd_jwt";
  public static KEY_NAME = "name";
  public static KEY_ID = "sub";


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

  /** get authenticated name  */
  getAuthenticatedName() : string {
    const jwtObject = this.getJwtOject();
    return !jwtObject ? "" : jwtObject[AccountService.KEY_NAME];    
  }

   /** get authenticated id  */
   getAuthenticatedId() : string {
    const jwtObject = this.getJwtOject();
    return !jwtObject ? "" : jwtObject[AccountService.KEY_ID];    
  }

  /** get jwt object */
  private getJwtOject(): any {
    const token = this.getToken();
    if (token) {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    }
    return null;
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
  savePasswordByToken(account: Account, hash: string) {
    return this.http.post(environment.backend.base + '/account/savePasswordByToken?_h=' + hash, account, HttpUtil.httpOptionsJson);
  }

  /** save the password by token */
  resetPassword(account: Account) {
    return this.http.post(environment.backend.base + '/account/resetPassword', account, HttpUtil.httpOptionsJson);
  }
}

