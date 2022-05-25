import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, Observable } from 'rxjs';
import { Recommendation } from '../models/recommendation';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class RecommendationsService {

  constructor(private baseService: BaseService) { }

  public getRecommendations(): Observable<Recommendation[]> {
    return this.baseService.get<Recommendation[]>('users/recommendations');
  }

  public addRecommendation(patientId: string, specialistId: string, details: string): Observable<Recommendation> {
    return this.baseService.post<any, Recommendation>('users/recommendations', {
      patient: patientId,
      specialist: specialistId,
      details: details
    }).pipe(catchError((err: HttpErrorResponse) => {
      return EMPTY;
    }));
  }

}
