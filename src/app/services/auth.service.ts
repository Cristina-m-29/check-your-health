import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, EMPTY, map, Observable, Subject } from 'rxjs';
import { BaseUser } from '../models/base-user';
import { LoginRequest } from '../models/login/loginRequest';
import { LoginResponse } from '../models/login/loginResponse';
import { menus } from '../models/menu';
import { RegisterPatient } from '../models/patient';
import { UserType } from '../models/userType';
import { BaseService } from './base.service';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userType$ = new Subject<UserType | null>();
  private userType: UserType | null = JSON.parse(localStorage.getItem('cyhUserType') || 'null');
  private requestingRefreshToken: boolean = false;

  constructor(private router: Router, private baseService: BaseService, private toastService: ToastService, ) {}

  public setUserType(userType: UserType| null): void {
    localStorage.setItem('cyhUserType', JSON.stringify(userType));
    this.userType = userType;
    this.userType$.next(userType);
  }

  public getUserType(): UserType | null {
    return this.userType;
  }

  public getUserId(): string {
    const accessToken = this.getAccessToken();
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(accessToken);
    return decodedToken.sub;
  }

  public navigateToDashboard(): void {
    const tab = menus.find(menu => menu.userType === this.userType)?.menuList[0];
    this.router.navigateByUrl(`${this.userType}/${tab}`);
  }

  public isAuthenticated(): boolean {
    const userType = this.getUserType();
    const token = this.getAccessToken();
    return !!userType && token !== '';
  }

  public login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.baseService.post<LoginRequest, LoginResponse>('auth/login', loginRequest)
      .pipe(catchError((error: HttpErrorResponse) => {
        this.toastService.showToast('A apărut o eroare! Asigurați-vă că ați introdus credențialele corecte!');
        return EMPTY;
      }))
      .pipe(map((response: LoginResponse) => {
        if (!response.err) {
          this.toastService.showToast('Autentificare reușită!')
          this.setTokens(response);
        }
        else {
          this.toastService.showToast('A apărut o eroare! Asigurați-vă că ați introdus credențialele corecte!')
        }
        return response;
      })
    );
  }

  public logout(): void {
    localStorage.clear();
    sessionStorage.clear();
    this.setUserType(null);
    this.router.navigateByUrl('');
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
          this.toastService.showToast('A apărut o eroare!')
          this.logout();
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

  public registerPatient(patient: RegisterPatient): void {
    this.baseService.post<RegisterPatient, BaseUser>('auth/register', patient).subscribe(() => {
      const loginRequest: LoginRequest = {
        userType: 'patient',
        identity: patient.phoneNumber,
        password: patient.password
      };
      this.login(loginRequest).subscribe(() => {
        this.navigateToDashboard();
      })
    })
  }
}
