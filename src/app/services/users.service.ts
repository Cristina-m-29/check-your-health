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

  public getMedicOfUser(userId?: string): Observable<BaseUser> {
    return this.getUserInfo(userId).pipe(concatMap((user: BaseUser) => {
      const patient = <Patient>user;
      return this.getUserInfo(patient.medic);

      // return <Specialist>{};

      // return this.getUserInfo(patient.medic).pipe((user: BaseUser) => {
      //   this.medic = <Specialist>user;
      //   this.gotMedic.emit(true);
      // });
    }));
  }
}
