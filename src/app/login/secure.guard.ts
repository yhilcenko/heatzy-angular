import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable()
export class SecureGuard implements CanActivate {

  constructor(private router: Router, private service: LoginService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.service.isLogged()) {
      return true;
    } else {
      this.router.navigate(['/devices']);
      return false;
    }
  }
}
