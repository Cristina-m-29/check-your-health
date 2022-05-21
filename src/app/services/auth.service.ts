import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, Subject } from 'rxjs';
import { LoginRequest } from '../models/login/loginRequest';
import { LoginResponse } from '../models/login/loginResponse';
import { menus } from '../models/menu';
import { UserType } from '../models/userType';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userType$ = new Subject<UserType | null>();
  private userType: UserType | null = JSON.parse(localStorage.getItem('cyhUserType') || 'null');
  private requestingRefreshToken: boolean = false;

  constructor(private router: Router, private baseService: BaseService) {}

  public setUserType(userType: UserType| null): void {
    localStorage.setItem('cyhUserType', JSON.stringify(userType));
    this.userType = userType;
    this.userType$.next(userType);
  }

  public getUserType(): UserType | null {
    return this.userType;
  }

  public navigateToDashboard(): void {
    const tab = menus.find(menu => menu.userType === this.userType)?.menuList[0];
    this.router.navigateByUrl(`dashboard/${this.userType}/${tab}`);
  }

  public login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.baseService.post<LoginRequest, LoginResponse>('auth/login', loginRequest)
      .pipe(map((response: LoginResponse) => {
        if (!response.err) {
          this.setTokens(response);
        }
        return response;
      })
    );
  }

  public getAccessToken(): string {
    const accessToken = localStorage.getItem('cyhAccessToken');
    return accessToken ? accessToken : '';
  }

  public getRefreshToken(): string {
    const refreshToken = localStorage.getItem('cyhRefreshToken');
    return refreshToken ? refreshToken : '';
  }

  public refreshAccessToken(): void {
    if (this.requestingRefreshToken === false) {
      this.requestingRefreshToken = true;

      this.baseService.post<object, LoginResponse>('auth/refresh', {})
        .pipe(catchError(() => {
          return [];
        }))
        .subscribe((response: LoginResponse) => {
          this.setTokens(response);
        });
    }
  }

  public setTokens(response: LoginResponse): void {
    localStorage.setItem('cyhAccessToken', response.accessToken);
    localStorage.setItem('cyhRefreshToken', response.refreshToken);

    this.requestingRefreshToken = false;
  }

  // register to do

}
