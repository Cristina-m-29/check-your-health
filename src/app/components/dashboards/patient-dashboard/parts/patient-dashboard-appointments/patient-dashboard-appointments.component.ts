import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Appointment } from 'src/app/models/appointment';

@Component({
  selector: 'cyh-patient-dashboard-appointments',
  templateUrl: './patient-dashboard-appointments.component.html',
  styleUrls: ['./patient-dashboard-appointments.component.sass']
})
export class PatientDashboardAppointmentsComponent implements OnInit {
  public appointments$: Appointment[] = [];
  public oldAppointments$: Appointment[] = [];


  constructor(private router: Router) { }

  public ngOnInit() {
    this.appointments$ = [
      <Appointment>{
        id: '13845',
        date: new Date(),
        status: 'accepted',
      },
    ];

    this.oldAppointments$ = [
      <Appointment>{
        id: '1078',
        date: new Date(),
        status: 'refused',
      },
    ];
  }

  public getMedicName(appointmentId: string): string {
    return 'Popescu Valeria';
  }

  public openAppointmentDetails(appointment: Appointment): void {
    this.router.navigateByUrl('dashboard/patient/appointment?id=' + appointment.id);
  }

  public openCreateNewAppointment(): void {
    this.router.navigateByUrl('dashboard/patient/appointment/create');
  }
}
