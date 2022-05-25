import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { catchError, EMPTY, Observable } from 'rxjs';
import { Medicine } from '../models/medicine';
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

  public addPrescription(patientId: string, pharmacyId: string, date: Date, medicines: Medicine[]): Observable<Prescription> {
    const parsedDate = moment(date).utcOffset(0, true).unix();
    return this.baseService.post<any, Prescription>('users/prescriptions', {
      patient: patientId,
      pharmacy: pharmacyId,
      date: parsedDate,
      medicines: medicines
    }).pipe(catchError((err: HttpErrorResponse) => {
      return EMPTY;
    }));
  }

}
