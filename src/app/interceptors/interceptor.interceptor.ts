import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (
      (!req.url.includes('auth') && !req.url.includes('refresh')) || 
      req.url.includes('auth/register')
    ) {
      const accessToken = this.authService.getAccessToken()
      const helper = new JwtHelperService();
      
      const isExpired = helper.isTokenExpired(accessToken);
      const expirationDate = helper.getTokenExpirationDate(accessToken)?.getTime() || 0;
      const currentDate = new Date().getTime();

      if (isExpired || ( expirationDate - currentDate < 300000) ) {
        this.authService.refreshAccessToken();
      }

      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    }
    if (req.url.includes('refresh')) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.getRefreshToken()}`
        }
      });
    }
    return next.handle(req);
  }
}
