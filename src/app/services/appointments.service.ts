import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { catchError, map, Observable, of, Subject } from 'rxjs';
import { Appointment } from '../models/appointment';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {
  public pastAppointmentsObservable = new Subject<Appointment[]>();
  public futureAppointmentsObservable = new Subject<Appointment[]>();

  constructor(private base: BaseService) {
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

}
