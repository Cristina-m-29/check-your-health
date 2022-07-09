import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, concatMap, Observable, of } from 'rxjs';
import { BaseUser } from '../models/base-user';
import { Medic, Specialist } from '../models/medic';
import { Patient } from '../models/patient';
import { Pharmacy } from '../models/pharmacy';
import { WorkingHours } from '../models/workingHours';
import { BaseService } from './base.service';
import { ToastService } from './toast.service';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public websocketIgnoreNextEvent: Boolean = false;

  constructor(
    private base: BaseService, 
    private websocketService: WebsocketService, 
    private toastService: ToastService
  ) {}

  public getUserInfo(userId?: string): Observable<BaseUser> {
    if (!userId) {
      userId = "current_user";
    }
    return this.base
      .get<BaseUser>("users/id/" + userId)
      .pipe(catchError((err: HttpErrorResponse) => {
        this.toastService.showToast('A apărut o eroare! Nu s-au putut obține informațiile userului!');
        return [];
      }));
  }

  public getMedicOfUser(): Observable<BaseUser> {
    return this.getUserInfo().pipe(concatMap((user: BaseUser) => {
      const patient = <Patient>user;
      return this.getUserInfo(patient.medic);
    }));
  }

  public getAllPatientsOfMedic(): Observable<Patient[]> {
    return this.base
      .get<Patient[]>("medic/patients")
      .pipe(catchError((err: HttpErrorResponse) => {
        this.toastService.showToast('A apărut o eroare! Nu s-a putut obține lista cu pacienți!');
        return [];
      }));
  }

  public getAllPatients(): Observable<Patient[]> {
    return this.base
      .get<Patient[]>("users/patients")
      .pipe(catchError((err: HttpErrorResponse) => {
        this.toastService.showToast('A apărut o eroare! Nu s-a putut obține lista cu pacienți!');
        return [];
      }));
  }

  public getMedicsListForRegister(): Observable<Medic[]> {
    return this.base
      .get<Medic[]>('medics')
      .pipe(catchError((err: HttpErrorResponse) => {
        this.toastService.showToast('A apărut o eroare! Nu s-a putut obține lista cu medici!');
        return [];
      }));
  }

  public getAllMedics(): Observable<Medic[]> {
    return this.base
      .get<Medic[]>("users/medics")
      .pipe(catchError((err: HttpErrorResponse) => {
        this.toastService.showToast('A apărut o eroare! Nu s-a putut obține lista cu medici!');
        return [];
      }));
  }

  public getAllSpecialists(): Observable<Specialist[]> {
    return this.base
      .get<Specialist[]>("users/specialists")
      .pipe(catchError((err: HttpErrorResponse) => {
        this.toastService.showToast('A apărut o eroare! Nu s-a putut obține lista cu specialiști!');
        return [];
      }));
  }

  public getAllPharmacies(): Observable<Pharmacy[]> {
    return this.base
      .get<Pharmacy[]>("users/pharmacies")
      .pipe(catchError((err: HttpErrorResponse) => {
        this.toastService.showToast('A apărut o eroare! Nu s-a putut obține lista cu farmacii!');
        return [];
      }));
  }

  public getPatientsEvents(): Observable<any> {
    return new Observable<any>(subscriber => {
      this.websocketService.connect('register').subscribe((value) => {
        if (!this.websocketIgnoreNextEvent) {
          subscriber.next(value);
        } else {
          this.websocketIgnoreNextEvent = false;
        }
      })
    })
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

  public editEmail(oldEmail: string, newEmail: string): void {
    // to do
  }

  public editPassword(email: string, oldPassword: string, newPassword: string): void {
    // to do
  }

  public editPhoneNumber(oldPhoneNumber: string, newPhoneNumber: string): void {
    // to do
  }

  public editBaseInfo(name: string, address: string, dateOfBirth?: Date | undefined): void {
    // to do
  }

  public editAdditionalInfoPatient(conditions: string[], medicId: string): void {
    // to do
  }

  public editAdditionalInfoMedicOrSpecialist(code: string, workingHours: WorkingHours, domain?: string): void {
    // to do
  }

  public editAdditionalInfoPharmacy(workingHours: WorkingHours): void {
    // to do
  }


}
