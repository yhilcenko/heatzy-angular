import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { catchError } from 'rxjs/operators';
import { LoginService } from './login/login.service';
import { Router } from '@angular/router';

@Injectable()
export class APIInterceptor implements HttpInterceptor {

  constructor(private service: LoginService,
              private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let apiReq;
    if (req.url && req.url[0] === '/') {
      apiReq = req.clone({ url: `${environment.baseURL}${req.url}` });
    } else {
      apiReq = req.clone({ url: `${req.url}` });
    }
    return next.handle(apiReq).pipe(
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case 401: {
            this.service.logOut();
            this.router.navigate(['/login']);
            break;
          }
        }
        return throwError(error);
      }));
  }
}
