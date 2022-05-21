import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseUser } from '../models/base-user';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private base: BaseService) { }

  public getUserInfo(userId?: string): Observable<BaseUser> {
    if (!userId) {
      userId = "current_user";
    }
    return this.base.get<BaseUser>("/users/" + userId);
  }
}
