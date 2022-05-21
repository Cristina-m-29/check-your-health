import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Appointment } from 'src/app/models/appointment';
import { AppointmentsService } from 'src/app/services/appointments.service';

@Component({
  selector: 'cyh-patient-dashboard-appointments',
  templateUrl: './patient-dashboard-appointments.component.html',
  styleUrls: ['./patient-dashboard-appointments.component.sass'],
})
export class PatientDashboardAppointmentsComponent {
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
    this.appointmentsService.getAppointments();
  }

  public openAppointmentDetails(appointment: Appointment): void {
    localStorage.setItem('cyhSelectedAppointment', JSON.stringify(appointment));
    this.router.navigateByUrl('dashboard/patient/appointment?id=' + appointment.id);
  }

  public openCreateNewAppointment(): void {
    this.router.navigateByUrl('dashboard/patient/appointment/create');
  }
}
