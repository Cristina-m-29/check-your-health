import { PrescribedMedicine } from './../models/medicine';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, Observable } from 'rxjs';
import { Prescription } from '../models/prescription';
import { BaseService } from './base.service';
import { AuthService } from './auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionsService {
  public websocketIgnoreNextEvent: Boolean = false;

  constructor(private baseService: BaseService, private authService: AuthService, private websocketService: WebsocketService) { }

  public getPrescriptions(): Observable<Prescription[]> {
    return this.baseService.get<Prescription[]>('users/prescriptions');
  }

  public getPrescriptionEvents(): Observable<any> {
    return new Observable<any>(subscriber => {
      const accessToken = this.authService.getAccessToken()
      const helper = new JwtHelperService();
      const id = helper.decodeToken<any>(accessToken).sub;
      this.websocketService.connect('prescriptions', id).subscribe((value) => {
        console.log("Service:", value);
        if (!this.websocketIgnoreNextEvent) {
          subscriber.next(value);
        } else {
          this.websocketIgnoreNextEvent = false;
        }
      })
    })
  }

  public getPrescriptionsForSpecificPatient(patientId: string): Observable<Prescription[]> {
    return this.baseService.get<Prescription[]>('users/'+ patientId +'/prescriptions');
  }

  public addPrescription(patientId: string, pharmacyId: string, medicId: string, medicines: PrescribedMedicine[]): Observable<Prescription> {
    return this.baseService.post<any, Prescription>('users/prescriptions', {
      patient: patientId,
      pharmacy: pharmacyId,
      medic: medicId,
      medicines: medicines
    }).pipe(catchError((err: HttpErrorResponse) => {
      return EMPTY;
    }));
  }

}
