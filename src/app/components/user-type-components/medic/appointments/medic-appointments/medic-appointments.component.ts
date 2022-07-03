import { AppointmentsService } from 'src/app/services/appointments.service';
import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { Appointment } from 'src/app/models/appointment';
import { Router } from '@angular/router';
import { SocketNotification } from 'src/app/models/notification';

@Component({
  selector: 'cyh-medic-appointments',
  templateUrl: './medic-appointments.component.html',
  styleUrls: ['./medic-appointments.component.sass']
})
export class MedicAppointmentsComponent implements OnInit{
  @Input() forSpecialist = false;
  @Output() gotAppointments = new EventEmitter<string>();

  public futureMarkedAppointments$ = new Subject<Appointment[]>();
  public futureAppointments$ = new Subject<Appointment[]>();
  public oldAppointments$: Observable<Appointment[]> = this.appointmentsService.pastAppointmentsObservable
    .pipe(map((app: Appointment[]) => {
      this.gotAppointments.emit('old');
      return app;
    })
  )

  constructor(private appointmentsService: AppointmentsService, private router: Router) {
    this.appointmentsService.getAppointments('medic');
    this.appointmentsService.getAppointmentEvents().subscribe((value) => {
      const notif = <SocketNotification>JSON.parse(value.data);
      if(notif.eventMethod === 'POST' || notif.eventMethod === 'PUT') {
        this.appointmentsService.getAppointments('medic');
      }
    });
  }

  public ngOnInit(): void {
    this.filterFutureAppointments();
  }

  public isOldAppointment(date: number): boolean {
    return new Date() > new Date(date * 1000);
  }

  public openAppointmentDetails(appointment: Appointment, type: string): void {
    sessionStorage.setItem('cyhSelectedAppointment', JSON.stringify(appointment));
    this.router.navigateByUrl((!this.forSpecialist ? 'medic/appointment?id=' : 'specialist/appointment?id=') + appointment.id + '&type=' + type);
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
