import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, EMPTY, map, Observable, Subject } from 'rxjs';
import { BaseUser } from '../models/base-user';
import { LoginRequest } from '../models/login/loginRequest';
import { LoginResponse } from '../models/login/loginResponse';
import { RegisterMedic, RegisterSpecialist } from '../models/medic';
import { menus } from '../models/menu';
import { RegisterPatient } from '../models/patient';
import { RegisterPharmacy } from '../models/pharmacy';
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
    this.baseService
      .post<RegisterPatient, BaseUser>('auth/register', patient)
      .pipe(catchError((error: HttpErrorResponse) => {
        this.toastService.showToast(
          translate[error.error?.err] || 'A apărut o eroare! Contul nu a putut fi creat!', true
        );
        this.router.navigateByUrl('');
        return EMPTY;
      }))
      .subscribe(() => {
        this.toastService.showToast('Contul a fost creat cu succes!', true);
        this.router.navigateByUrl('login/patient');
    });
  }

  public registerMedic(medic: RegisterMedic): void {
    this.baseService
      .post<RegisterMedic, BaseUser>('auth/register', medic)
      .pipe(catchError((error: HttpErrorResponse) => {
        this.toastService.showToast(
          translate[error.error?.err] || 'A apărut o eroare! Contul nu a putut fi creat!', true
        );
        this.router.navigateByUrl('');
        return EMPTY;
      }))
      .subscribe(() => {
        this.toastService.showToast('Contul a fost creat cu succes!', true);
        this.router.navigateByUrl('login/medic');
    });
  }

  public registerSpecialist(specialist: RegisterSpecialist): void {
    this.baseService
      .post<RegisterSpecialist, BaseUser>('auth/register', specialist)
      .pipe(catchError((error: HttpErrorResponse) => {
        this.toastService.showToast(
          translate[error.error?.err] || 'A apărut o eroare! Contul nu a putut fi creat!', true
        );
        this.router.navigateByUrl('');
        return EMPTY;
      }))
      .subscribe(() => {
        this.toastService.showToast('Contul a fost creat cu succes!', true);
        this.router.navigateByUrl('login/specialist');
    });
  }

  public registerPharmacy(pharmacy: RegisterPharmacy): void {
    this.baseService
      .post<RegisterPharmacy, BaseUser>('auth/register', pharmacy)
      .pipe(catchError((error: HttpErrorResponse) => {
        this.toastService.showToast(
          translate[error.error?.err] || 'A apărut o eroare! Contul nu a putut fi creat!', true
        );
        this.router.navigateByUrl('');
        return EMPTY;
      }))
      .subscribe(() => {
        this.toastService.showToast('Contul a fost creat cu succes!', true);
        this.router.navigateByUrl('login/pharmacy');
    });
  }
}

const translate: {[key: string]: string} = {
  'User with this email already exists!': 'Exista deja un utilizator creat cu acest email!'
}