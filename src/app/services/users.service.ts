import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, concatMap, EMPTY, Observable, of, Subject } from 'rxjs';
import { BaseUser } from '../models/base-user';
import { Medic, Specialist } from '../models/medic';
import { Patient } from '../models/patient';
import { Pharmacy } from '../models/pharmacy';
import { WorkingHours } from '../models/workingHours';
import { BaseService } from './base.service';
import { ToastService } from './toast.service';
import { UtilsService } from './utils.service';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public changeOnUserProfile = new Subject();
  public websocketIgnoreNextEvent: Boolean = false;

  constructor(
    private base: BaseService, 
    private websocketService: WebsocketService, 
    private toastService: ToastService,
    private utilsService: UtilsService,
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
    this.base
      .post('users/change_email', { oldEmail: oldEmail, newEmail: newEmail})
      .pipe(catchError((e: HttpErrorResponse) => {
        this.toastService.showToast(
          (e.error.err === 'Wrong email') 
            ? 'Eroare! Emailul vechi este greșit!' 
            : 'A apărut o eroare! Adresa de email nu a fost actualizată!', 
          true
        );
        return EMPTY;
      }))
      .subscribe(() => {
        this.toastService.showToast('Adresa de email a fost actualizată cu succes!', false);
        this.changeOnUserProfile.next('');
      });
  }

  public editPassword(oldPassword: string, newPassword: string): void {
    this.base
      .post('users/change_password', { oldPassword: oldPassword, newPassword: newPassword})
      .pipe(catchError((e: HttpErrorResponse) => {
        this.toastService.showToast(
          (e.error.err === 'Wrong password') 
            ? 'Eroare! Parola veche este greșită!' 
            : 'A apărut o eroare! Parola nu a fost actualizată!', 
          true
        );
        return EMPTY;
      }))
      .subscribe(() => {
        this.toastService.showToast('Parola a fost actualizată cu succes!', false);
        this.changeOnUserProfile.next('');
      });
  }

  public editPhoneNumber(oldPhoneNumber: string, newPhoneNumber: string): void {
    this.base
      .post('users/change_phone_number', { oldPhoneNumber: oldPhoneNumber, newPhoneNumber: newPhoneNumber})
      .pipe(catchError((e: HttpErrorResponse) => {
        this.toastService.showToast(
          (e.error.err === 'Wrong phoneNumber') 
            ? 'Eroare! Numărul de telefon vechi este greșit!' 
            : 'A apărut o eroare! Numărul de telefon nu a fost actualizat!', 
          true
        );
        return EMPTY;
      }))
      .subscribe(() => {
        this.toastService.showToast('Numărul de telefon a fost actualizat cu succes!', false);
        this.changeOnUserProfile.next('');
      });
  }

  public editBaseInfo(name: string, address: string, dateOfBirth?: Date | undefined): void {
    const body: {[key: string]: any} = {
      name: name,
      address: address,
    }
    if(dateOfBirth) {
      const timestamp: number = this.utilsService.getTimestampOfDate(dateOfBirth);
      body['dateOfBirth'] = timestamp;
    }
    this.base.patch('users/modify', body)
      .pipe(catchError((e: HttpErrorResponse) => {
        this.toastService.showToast('A apărut o eroare! Informațiile de bază nu au fost actualizate!', true);
        return EMPTY;
      }))
      .subscribe(() => {
        this.toastService.showToast('Informațiile de bază au fost actualizate cu succes!', false);
        this.changeOnUserProfile.next('');
      });
  }

  public editAdditionalInfoPatient(conditions: string[], medicId?: string): void {
    const body: {[key: string]: any} = {
      conditions: conditions,
    }
    if (medicId) {
      body['medicId'] = medicId;
    }
    this.base.patch('users/modify', body)
      .pipe(catchError((e: HttpErrorResponse) => {
        this.toastService.showToast('A apărut o eroare! Informațiile adiționale nu au fost actualizate!', true);
        return EMPTY;
      }))
      .subscribe(() => {
        this.toastService.showToast('Informațiile adiționale au fost actualizate cu succes!', false);
        this.changeOnUserProfile.next('');
      });
  }

  public editAdditionalInfoMedicOrSpecialist(code: string, workingHours: WorkingHours, domain?: string): void {
    const body: {[key: string]: any} = {
      code: code,
      workingHours: workingHours,
    }
    if (domain) {
      body['domain'] = domain;
    }

    this.base.patch('users/modify', body)
      .pipe(catchError((e: HttpErrorResponse) => {
        this.toastService.showToast('A apărut o eroare! Informațiile adiționale nu au fost actualizate!', true);
        return EMPTY;
      }))
      .subscribe(() => {
        this.toastService.showToast('Informațiile adiționale au fost actualizate cu succes!', false);
        this.changeOnUserProfile.next('');
      });
  }

  public editAdditionalInfoPharmacy(workingHours: WorkingHours): void {
    this.base.patch('users/modify', { workingHours: workingHours })
      .pipe(catchError((e: HttpErrorResponse) => {
        this.toastService.showToast('A apărut o eroare! Informațiile adiționale nu au fost actualizate!', true);
        return EMPTY;
      }))
      .subscribe(() => {
        this.toastService.showToast('Informațiile adiționale au fost actualizate cu succes!', false);
        this.changeOnUserProfile.next('');
      });
  }


}
