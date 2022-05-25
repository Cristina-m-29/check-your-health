import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { catchError, EMPTY, map, Observable, of, Subject } from 'rxjs';
import { Appointment } from '../models/appointment';
import { BaseUser } from '../models/base-user';
import { Specialist } from '../models/medic';
import { HoursInterval } from '../models/workingHours';
import { BaseService } from './base.service';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {
  public pastAppointmentsObservable = new Subject<Appointment[]>();
  public futureAppointmentsObservable = new Subject<Appointment[]>();

  constructor(private base: BaseService, private usersService: UsersService) {}

  public getAppointments(): void {
    this.base
      .get<Appointment[]>('users/appointments')
      .pipe(catchError((error: HttpErrorResponse) => {
        console.error('Error getting appointments: ' + error);
        return [];
      }), map((appointments: Appointment[]) => {
        const pastValues: Appointment[] = [];
        const futureValues: Appointment[] = [];
        
        appointments.forEach((app: Appointment) => {
          this.usersService.getUserInfo(app.medic).subscribe((user: BaseUser) => {
            app.fullMedic = <Specialist>user;

            const currentDate: moment.Moment = moment().minutes(0).seconds(0).milliseconds(0);
            const appointmentDate: moment.Moment = moment.unix(app.date).hours(app.hoursInterval.start / 100).minutes(app.hoursInterval.start % 100);

            if (appointmentDate <= currentDate) {
              pastValues.push(app);
            }
            else {
              futureValues.push(app);            
            }
          });
        });

        this.pastAppointmentsObservable.next(pastValues);
        this.futureAppointmentsObservable.next(futureValues);
      })).subscribe();
  }

  public addAppointment(
    medicId: string, 
    timestamp: number, 
    hoursInterval: HoursInterval, 
    reason: string, 
    recommendationId?: string
  ): Observable<Appointment> {
    return this.base.post<any, Appointment>('users/appointments', {
      medic: medicId,
      date: timestamp,
      hoursInterval: hoursInterval,
      reason: reason,
      recommendation: recommendationId
    }).pipe(catchError((err: HttpErrorResponse) => {
      return EMPTY;
    }));
  }

  public getMedicFreeIntervals(medicId: string, timestamp: number): Observable<number[]> {
    return this.base.get<number[]>('medic/' + medicId + '/free/' + timestamp);
  }

}
