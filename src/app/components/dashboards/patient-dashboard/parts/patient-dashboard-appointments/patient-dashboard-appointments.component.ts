import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/models/appointment';

@Component({
  selector: 'cyh-patient-dashboard-appointments',
  templateUrl: './patient-dashboard-appointments.component.html',
  styleUrls: ['./patient-dashboard-appointments.component.sass']
})
export class PatientDashboardAppointmentsComponent implements OnInit {
  public appointments$: Appointment[] = [];
  public oldAppointments$: Appointment[] = [];


  constructor() { }

  public ngOnInit() {
    this.appointments$ = [
      {
        id: '1hfw',
        date: new Date(),
        status: 'accepted',
      },
      {
        id: '1hfw',
        date: new Date(),
        status: 'pending',
      },
      {
        id: '1hfw',
        date: new Date(),
        status: 'pending',
      }
    ]

    this.oldAppointments$ = [
      {
        id: '1hfw',
        date: new Date(),
        status: 'refused',
      },
      {
        id: '1hfw',
        date: new Date(),
        status: 'pending',
      },
      {
        id: '1hfw',
        date: new Date(),
        status: 'refused',
      },
      {
        id: '1hfw',
        date: new Date(),
        status: 'refused',
      },
      {
        id: '1hfw',
        date: new Date(),
        status: 'refused',
      },
      {
        id: '1hfw',
        date: new Date(),
        status: 'refused',
      },
      {
        id: '1hfw',
        date: new Date(),
        status: 'refused',
      },
    ];
  }

  public getMedicName(appointmentId: string): string {
    return 'Popescu Valeria';
  }
}
