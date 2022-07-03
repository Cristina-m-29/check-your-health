import { PrescribedMedicine } from './../models/medicine';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { Prescription, PrescriptionStatus } from '../models/prescription';
import { BaseService } from './base.service';
import { AuthService } from './auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { WebsocketService } from './websocket.service';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionsService {
  public websocketIgnoreNextEvent: Boolean = false;

  constructor(
    private baseService: BaseService, 
    private authService: AuthService, 
    private websocketService: WebsocketService,
    private toastService: ToastService,
  ) {}

  public getPrescriptions(): Observable<Prescription[]> {
    return this.baseService.get<Prescription[]>('users/prescriptions')
      .pipe(catchError((error: HttpErrorResponse) => {
        this.toastService.showToast('A apărut o eroare! Nu s-a putut obține lista cu prescriții!')
        return [];
      }));
  }

  public getPrescriptionEvents(): Observable<any> {
    return new Observable<any>(subscriber => {
      const accessToken = this.authService.getAccessToken()
      const helper = new JwtHelperService();
      const id = helper.decodeToken<any>(accessToken).sub;
      this.websocketService.connect('prescriptions', id).subscribe((value) => {
        if (!this.websocketIgnoreNextEvent) {
          subscriber.next(value);
        } else {
          this.websocketIgnoreNextEvent = false;
        }
      })
    })
  }

  public getPrescriptionsForSpecificPatient(patientId: string): Observable<Prescription[]> {
    return this.baseService.get<Prescription[]>('users/'+ patientId +'/prescriptions')
      .pipe(catchError((error: HttpErrorResponse) => {
        this.toastService.showToast('A apărut o eroare! Actualizați pagina!')
        return [];
      }));;
  }

  public addPrescription(appointmentId: string, patientId: string, pharmacyId: string, medicId: string, medicines: PrescribedMedicine[]): Observable<Prescription> {
    return this.baseService.post<any, Prescription>('users/prescriptions', {
      appointment: appointmentId,
      patient: patientId,
      pharmacy: pharmacyId,
      medic: medicId,
      medicines: medicines
    }).pipe(catchError((err: HttpErrorResponse) => {
      this.toastService.showToast('A apărut o eroare! Prescripția nu a putut fi adăugată!');
      return EMPTY;
    })).pipe(map((pres: Prescription) => {
      this.toastService.showToast('Prescripția a fost adăugată cu succes!')
      return pres;
    }));
  }

  public updatePrescriptionStatus(prescriptionId: string, status: PrescriptionStatus): Observable<Prescription> {
    return this.baseService
      .patch<any, Prescription>('users/prescriptions/' + prescriptionId, { status: status })
      .pipe(catchError((err: HttpErrorResponse) => {
        this.toastService.showToast('A apărut o eroare! Statusul prescripției nu a putut fi actualizat!');
        return EMPTY;
      })).pipe(map((pres: Prescription) => {
        this.toastService.showToast('Statusul prescripției a fost actualizat cu succes!')
        return pres;
      }));
  }

}
