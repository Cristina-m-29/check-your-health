import { PrescribedMedicine } from './../models/medicine';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, Observable } from 'rxjs';
import { Prescription } from '../models/prescription';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionsService {

  constructor(private baseService: BaseService) { }

  public getPrescriptions(): Observable<Prescription[]> {
    return this.baseService.get<Prescription[]>('users/prescriptions');
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
