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

  public getAppointments(forWho: string): void {
    this.base
      .get<Appointment[]>('users/appointments')
      .pipe(catchError((error: HttpErrorResponse) => {
        return [];
      }))
      .subscribe((appointments: Appointment[]) => {
        if (forWho === 'patient') {
          this.getFullMedicOfAppointments(appointments);
        }
        if (forWho === 'medic') {
          this.getFullPatientOfAppointments(appointments);
        }
      });
  }

  public addAppointment(
    medicId: string,
    timestamp: number,
    hoursInterval: HoursInterval,
    reason: string,
    recommendationId?: string,
    patientId?: string
  ): Observable<Appointment> {
    if (!patientId) {
      return this.base.post<any, Appointment>('users/appointments', {
        medic: medicId,
        date: timestamp,
        hoursInterval: hoursInterval,
        reason: reason,
        recommendation: recommendationId
      }).pipe(catchError(() => {
        return EMPTY;
      }));
    }
    else {
      return this.base.post<any, Appointment>('users/' + patientId + '/appointments', {
        medic: medicId,
        date: timestamp,
        hoursInterval: hoursInterval,
        reason: reason,
        recommendation: recommendationId
      }).pipe(catchError(() => {
        return EMPTY;
      }));
    }
  }

  public acceptAppointment(appointmentId: string): Observable<Appointment> {
    return this.base.post<{}, Appointment>('users/appointments/' + appointmentId +'/accept', {});
  }

  public refuseAppointment(appointmentId: string, refuseReason: string): Observable<Appointment> {
    return this.base.post<{}, Appointment>('users/appointments/' + appointmentId +'/refuse', {
      reason: refuseReason
    });
  }

  public getMedicFreeIntervals(medicId: string, timestamp: number): Observable<number[]> {
    return this.base.get<number[]>('medic/' + medicId + '/free/' + timestamp);
  }

  private getFullMedicOfAppointments(appointments: Appointment[]): void {
    appointments.forEach((app: Appointment) => {
      this.usersService.getUserInfo(app.medic).subscribe((user: BaseUser) => {
        app.fullMedic = <Specialist>user;
      });
    });

    this.filterOldAndNewAppointments(appointments);
  }

  private getFullPatientOfAppointments(appointments: Appointment[]): void {
    appointments.forEach((app: Appointment) => {
      this.usersService.getUserInfo(app.patient).subscribe((user: BaseUser) => {
        app.fullPacient = <Specialist>user;
      });
    });

    this.filterOldAndNewAppointments(appointments);
  }

  private filterOldAndNewAppointments(appointments: Appointment[]): void {
    const pastValues: Appointment[] = [];
    const futureValues: Appointment[] = [];

    const currentDate = this.getCurrentMomentDate();

    appointments.forEach((app: Appointment) => {
      const appointmentDate = this.getMomentDateFromTimespamp(app);

      if (appointmentDate <= currentDate) {
        pastValues.push(app);
      }
      else {
        futureValues.push(app);
      }
    });

    this.pastAppointmentsObservable.next(pastValues);
    this.futureAppointmentsObservable.next(futureValues);
  }

  private getCurrentMomentDate(): moment.Moment {
    return moment().minutes(0).seconds(0).milliseconds(0);
  }

  private getMomentDateFromTimespamp(app: Appointment): moment.Moment {
    return moment.unix(app.date).hours(app.hoursInterval.start / 100).minutes(app.hoursInterval.start % 100);
  }

}
