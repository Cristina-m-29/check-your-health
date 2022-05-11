import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginRequest } from '../models/login/loginRequest';
import { LoginResponse } from '../models/login/loginResponse';
import { menus } from '../models/menu';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userType$ = new Subject<string | null>();
  private userType: string | null = JSON.parse(localStorage.getItem('cyhUserType') || 'null');
  private baseUrl: string = '';

  constructor(private router: Router,
    private baseService: BaseService,
  ) {
    this.baseUrl = environment.baseUrl;
  }

  public setUserType(userType: string| null): void {
    localStorage.setItem('cyhUserType', JSON.stringify(userType));
    this.userType = userType;
    this.userType$.next(userType);
  }

  public getUserType(): string | null {
    return this.userType;
  }

  public navigateToDashboard(): void {
    const tab = menus.find(menu => menu.userType === this.userType)?.menuList[0];
    this.router.navigateByUrl(`dashboard/${this.userType}/${tab}`);
  }

  public login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.baseService.post<LoginRequest, LoginResponse>('', loginRequest);
  }

  // register to do

}
