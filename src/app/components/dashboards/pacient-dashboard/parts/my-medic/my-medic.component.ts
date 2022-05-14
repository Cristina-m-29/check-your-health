import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/models/appointment';
import { Medic, Specialist } from 'src/app/models/medic';
import { WorkingHours } from 'src/app/models/workingHours';

@Component({
  selector: 'cyh-my-medic',
  templateUrl: './my-medic.component.html',
  styleUrls: ['./my-medic.component.sass']
})
export class MyMedicComponent implements OnInit {
  public appointments$: Appointment[] = [];
  public oldAppointments$: Appointment[] = [];

  constructor() {}

  public ngOnInit(): void {
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

  // public getLocation()

}
