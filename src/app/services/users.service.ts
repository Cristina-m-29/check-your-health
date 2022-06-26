import { Injectable } from '@angular/core';
import { concatMap, Observable } from 'rxjs';
import { BaseUser } from '../models/base-user';
import { Medic, Specialist } from '../models/medic';
import { Patient } from '../models/patient';
import { Pharmacy } from '../models/pharmacy';
import { BaseService } from './base.service';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public websocketIgnoreNextEvent: Boolean = false;

  constructor(private base: BaseService, private websocketService: WebsocketService) { }

  public getUserInfo(userId?: string): Observable<BaseUser> {
    if (!userId) {
      userId = "current_user";
    }
    return this.base.get<BaseUser>("users/id/" + userId);
  }

  public getMedicOfUser(): Observable<BaseUser> {
    return this.getUserInfo().pipe(concatMap((user: BaseUser) => {
      const patient = <Patient>user;
      return this.getUserInfo(patient.medic);
    }));
  }

  public getAllPatientsOfMedic(): Observable<Patient[]> {
    return this.base.get("medic/patients");
  }

  public getAllPatients(): Observable<Patient[]> {
    return this.base.get("users/patients");
  }

  public getAllMedics(): Observable<Medic[]> {
    return this.base.get("users/medics");
  }

  public getAllSpecialists(): Observable<Specialist[]> {
    return this.base.get("users/specialists");
  }

  public getAllPharmacies(): Observable<Pharmacy[]> {
    return this.base.get("users/pharmacies");
  }

  public getPharmacyEvents(): Observable<any> {
    return new Observable<any>(subscriber => {
      this.websocketService.connect('pharmacies').subscribe((value) => {
        if (!this.websocketIgnoreNextEvent) {
          subscriber.next(value);
        } else {
          this.websocketIgnoreNextEvent = false;
        }
      })
    })
  }
}
