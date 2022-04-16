import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userType$ = new Subject<string | null>();
  private userType: string | null = JSON.parse(localStorage.getItem('cyhUserType') || 'null');

  public setUserType(userType: string| null): void {
    localStorage.setItem('cyhUserType', JSON.stringify(userType));
    this.userType = userType;
    this.userType$.next(userType);
  }

  public getUserType(): string | null {
    return this.userType;
  }
}
