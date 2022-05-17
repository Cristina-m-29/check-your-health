import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Appointment } from 'src/app/models/appointment';
import { AppointmentsService } from 'src/app/services/appointments.service';

@Component({
  selector: 'cyh-patient-dashboard-appointments',
  templateUrl: './patient-dashboard-appointments.component.html',
  styleUrls: ['./patient-dashboard-appointments.component.sass'],
})
export class PatientDashboardAppointmentsComponent {
  public appointments$: Observable<Appointment[]> = this.appointmentsService.futureAppointmentsObservable;
  public oldAppointments$: Observable<Appointment[]> = this.appointmentsService.pastAppointmentsObservable;

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
