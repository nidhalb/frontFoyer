// user-auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { UserService } from './user.service'; 
import { Observable } from 'rxjs';// Adjust the path

@Injectable({
  providedIn: 'root',
})
export class UserAuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.userService.authguard()) {
      return true;
    } else {
      // If not authenticated, redirect to the login page
      
      return this.router.createUrlTree(['/login']);
    }
  }
}
