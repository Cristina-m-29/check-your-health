import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { menus } from '../models/menu';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userType$ = new Subject<string | null>();
  private userType: string | null = JSON.parse(localStorage.getItem('cyhUserType') || 'null');

  constructor(private router: Router) {}

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
}
