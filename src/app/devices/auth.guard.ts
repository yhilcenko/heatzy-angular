import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private service: LoginService) {
  }

  // on chatbot list
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.service.isLogged()) {
      return true;
    } else {
      this.service.logOut();
      this.router.navigate(['/login']);
      return false;
    }
  }
}
