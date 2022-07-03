import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Appointment } from 'src/app/models/appointment';
import { SocketNotification } from 'src/app/models/notification';
import { AppointmentsService } from 'src/app/services/appointments.service';

@Component({
  selector: 'cyh-patient-appointments',
  templateUrl: './patient-appointments.component.html',
  styleUrls: ['./patient-appointments.component.sass'],
})
export class PatientAppointmentsComponent {
  @Output() gotAppointments = new EventEmitter<string>();

  public appointments$: Observable<Appointment[]> = this.appointmentsService.futureAppointmentsObservable
    .pipe(map((app: Appointment[]) => {
      this.gotAppointments.emit('future');
      return app;
    })
  );
  public oldAppointments$: Observable<Appointment[]> = this.appointmentsService.pastAppointmentsObservable
    .pipe(map((app: Appointment[]) => {
      this.gotAppointments.emit('old');
      return app;
    })
  );

  constructor(private router: Router, private appointmentsService: AppointmentsService) {
    this.appointmentsService.getAppointments('patient');
    this.appointmentsService.getAppointmentEvents().subscribe((value) => {
      const notif = <SocketNotification>JSON.parse(value.data);
      if(notif.eventMethod === 'POST' || notif.eventMethod === 'PUT') {
        this.appointmentsService.getAppointments('patient');
      }
    });
  }

  public openAppointmentDetails(appointment: Appointment): void {
    sessionStorage.setItem('cyhSelectedAppointment', JSON.stringify(appointment));
    this.router.navigateByUrl('patient/appointment?id=' + appointment.id);
  }

  public openCreateNewAppointment(): void {
    this.router.navigateByUrl('patient/appointment/create');
  }
}
