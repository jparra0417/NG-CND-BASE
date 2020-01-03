import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class GuardAuthService implements CanActivate {

  private isAuthenticated : boolean; 

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    if(!this.isAuthenticated){
      this.router.navigate(['/403']);
    }
    return this.isAuthenticated;
  }

  constructor(private accountService: AccountService, private router: Router) { 
    this.accountService.isAuthenticated().subscribe((result : boolean) => {
      this.isAuthenticated = result;
    });
  }
}