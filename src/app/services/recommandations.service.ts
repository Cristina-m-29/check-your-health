import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { Recommendation } from '../models/recommendation';
import { AuthService } from './auth.service';
import { BaseService } from './base.service';
import { ToastService } from './toast.service';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class RecommendationsService {
  public websocketIgnoreNextEvent: Boolean = false;

  constructor(
    private baseService: BaseService, 
    private authService: AuthService, 
    private websocketService: WebsocketService,
    private toastService: ToastService,
  ) {}

  public getRecommendations(): Observable<Recommendation[]> {
    return this.baseService
      .get<Recommendation[]>('users/recommendations')
      .pipe(catchError((err: HttpErrorResponse) => {
        this.toastService.showToast('A apărut o eroare! Nu s-a putut obține lista cu trimiteri!');
        return [];
      }));
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
    return this.baseService
      .get<Recommendation[]>('users/' + patientId + '/recommendations')
      .pipe(catchError((err: HttpErrorResponse) => {
        this.toastService.showToast('A apărut o eroare! Actualizați pagina!');
        return [];
      }));
  }

  public addRecommendation(appointmentId: string, patientId: string, specialistId: string, details: string): Observable<Recommendation> {
    return this.baseService.post<any, Recommendation>('users/recommendations', {
      appointment: appointmentId,
      patient: patientId,
      specialist: specialistId,
      details: details
    }).pipe(catchError((err: HttpErrorResponse) => {
      this.toastService.showToast('A apărut o eroare! Trimiterea nu a putut fi adăugată!');
      return EMPTY;
    })).pipe(map((rec: Recommendation) => {
      this.toastService.showToast('Trimiterea a fost adăugată cu succes!')
      return rec;
    }));;
  }

}
