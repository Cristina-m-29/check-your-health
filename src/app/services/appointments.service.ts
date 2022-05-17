import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { catchError, EMPTY, map, Observable, of, Subject } from 'rxjs';
import { Appointment } from '../models/appointment';
import { HoursInterval } from '../models/workingHours';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {
  public pastAppointmentsObservable = new Subject<Appointment[]>();
  public futureAppointmentsObservable = new Subject<Appointment[]>();

  constructor(private base: BaseService) {}

  public getAppointments(): void {
    this.base
    .get<Appointment[]>("users/appointments")
    .pipe(catchError((error: HttpErrorResponse) => {
      console.error("Error getting appointments: " + error);
      return [];
    }), map((appointments: Appointment[]) => {
      const currentDate: moment.Moment = moment().minutes(0).seconds(0).milliseconds(0);
      const pastValues = appointments.filter((appointment: Appointment) => {
        const appointmentDate: moment.Moment = moment.unix(appointment.date).hours(appointment.hoursInterval.start);
        return appointmentDate <= currentDate;
      })
      const futureValues = appointments.filter((appointment: Appointment) => {
        const appointmentDate: moment.Moment = moment.unix(appointment.date).hours(appointment.hoursInterval.start);
        return appointmentDate > currentDate;
      })

      this.pastAppointmentsObservable.next(pastValues);
      this.futureAppointmentsObservable.next(futureValues);
    })).subscribe();
  }

  public addAppointment(medicId: string, date: Date, hoursInterval: HoursInterval): Observable<Appointment> {
    const parsedDate = moment(date).utcOffset(0, true).unix();
    return this.base.post<any, Appointment>("users/appointments", {
      medic: medicId,
      date: parsedDate,
      hoursInterval: hoursInterval
    }).pipe(catchError((err: HttpErrorResponse) => {
      console.log(err);
      return EMPTY;
    }));
  }

}
