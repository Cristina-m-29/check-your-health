import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, EMPTY, Observable } from 'rxjs';
import { Recommendation } from '../models/recommendation';
import { AuthService } from './auth.service';
import { BaseService } from './base.service';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class RecommendationsService {
  public websocketIgnoreNextEvent: Boolean = false;

  constructor(private baseService: BaseService, private authService: AuthService, private websocketService: WebsocketService) { }

  public getRecommendations(): Observable<Recommendation[]> {
    return this.baseService.get<Recommendation[]>('users/recommendations');
  }

  public getRecommendationEvents(): Observable<any> {
    return new Observable<any>(subscriber => {
      const accessToken = this.authService.getAccessToken()
      const helper = new JwtHelperService();
      const id = helper.decodeToken<any>(accessToken).sub;
      this.websocketService.connect('recommendations', id).subscribe((value) => {
        if (!this.websocketIgnoreNextEvent) {
          subscriber.next(value);
        } else {
          this.websocketIgnoreNextEvent = false;
        }
      })
    })
  }

  public getRecommendationsForSpecificPatient(patientId: string): Observable<Recommendation[]> {
    return this.baseService.get<Recommendation[]>('users/' + patientId + '/recommendations');
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
