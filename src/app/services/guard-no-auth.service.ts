import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AccountService } from './account.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuardNoAuthService implements CanActivate {

  private isAuthenticated: boolean;

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    if (this.isAuthenticated) {
      this.router.navigate(['/403']);
    }
    return !this.isAuthenticated;
  }

  constructor(private accountService: AccountService, protected router: Router) {
    this.accountService.isAuthenticated().subscribe((result: boolean) => {
      this.isAuthenticated = result;
    });
  }
}
