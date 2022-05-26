import { Injectable } from '@angular/core';
import { concatMap, map, Observable } from 'rxjs';
import { BaseUser } from '../models/base-user';
import { Specialist } from '../models/medic';
import { Patient } from '../models/patient';
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
    return this.base.get<BaseUser>("users/" + userId);
  }

  public getMedicOfUser(): Observable<BaseUser> {
    return this.getUserInfo().pipe(concatMap((user: BaseUser) => {
      const patient = <Patient>user;
      return this.getUserInfo(patient.medic);
    }));
  }
}
