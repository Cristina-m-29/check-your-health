import { AppointmentsService } from 'src/app/services/appointments.service';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { Appointment } from 'src/app/models/appointment';
import { Router } from '@angular/router';

@Component({
  selector: 'cyh-medic-appointments',
  templateUrl: './medic-appointments.component.html',
  styleUrls: ['./medic-appointments.component.sass']
})
export class MedicAppointmentsComponent implements OnInit{
  @Output() gotAppointments = new EventEmitter<string>();

  public futureMarkedAppointments$ = new Subject<Appointment[]>();
  public futureAppointments$ = new Subject<Appointment[]>();
  public oldAppointments$: Observable<Appointment[]> = this.appointmentsService.pastAppointmentsObservable
    .pipe(map((app: Appointment[]) => {
      this.gotAppointments.emit('old');
      return app;
    })
  );

  constructor(private appointmentsService: AppointmentsService, private router: Router ) {
    this.appointmentsService.getAppointments('medic');
  }

  public ngOnInit(): void {
    this.filterFutureAppointments();
  }

  public openAppointmentDetails(appointment: Appointment, type: string): void {
    sessionStorage.setItem('cyhSelectedAppointment', JSON.stringify(appointment));
    this.router.navigateByUrl('medic/appointment?id=' + appointment.id + '&type=' + type);
  }

  public addAppointment(): void {
    this.router.navigateByUrl('medic/appointment/create');
  }

  private filterFutureAppointments(): void {
    this.appointmentsService.futureAppointmentsObservable.subscribe((appointments: Appointment[]) => {
      const futureAccepted: Appointment[] = [];
      const futureRefused: Appointment[] = [];
      const future: Appointment[] = [];

      appointments.forEach((app: Appointment) => {
        switch(app.status) {
          case 'pending': {
            future.push(app);
            break;
          }
          case 'accepted': {
            futureAccepted.push(app);
            break;
          }
          case 'refused': {
            futureRefused.push(app);
            break;
          }
        }
      });

      this.gotAppointments.emit('future');
      this.futureMarkedAppointments$.next(futureAccepted.concat(futureRefused));
      this.futureAppointments$.next(future);
    });
  }

}
