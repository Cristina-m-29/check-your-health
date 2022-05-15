import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Appointment } from 'src/app/models/appointment';
import { HoursInterval } from 'src/app/models/workingHours';

@Component({
  selector: 'cyh-patient-dashboard-appointment-details',
  templateUrl: './patient-dashboard-appointment-details.component.html',
  styleUrls: ['./patient-dashboard-appointment-details.component.sass']
})
export class PatientDashboardAppointmentDetailsComponent implements OnInit {
  public addAppointment = false;
  public appointment = new Appointment();
  public appointmentId = '';
  public loading = true;

  public hours_interval_options = [
    { start: 9, end: 10, state: 'available' },
    { start: 10, end: 11, state: 'available' },
    { start: 11, end: 12, state: 'not available' },
    { start: 12, end: 13, state: 'available' },
    { start: 14, end: 15, state: 'available' },
    { start: 15, end: 16, state: 'available' },
    { start: 16, end: 17, state: 'available' },
  ];

  public date = new Date();
  public hours_interval = {
    start: 0,
    end: 0,
  }

  constructor(private router: Router, private cd: ChangeDetectorRef) { }

  public ngOnInit() {
    if (this.router.url.includes('create')) {
      this.addAppointment = true;
      this.loading = false;
    }
    else {
      this.appointmentId = this.router.url.split('?id=')[1];
      this.initAppointmentForm();
    }
  }

  public createAppointment(): void {
    this.router.navigateByUrl('dashboard/patient/home');
  }

  public checkDate(date: any): void {
    if (!this.addAppointment) {
      this.date = this.appointment.date;
    }
  }

  public goBack(): void {
    this.router.navigateByUrl('dashboard/patient/home');
  }

  private initAppointmentForm(): void {
    this.appointment = this.getAppointmentDetails();

    this.date = this.appointment.date;
    this.hours_interval.start = this.appointment.hours_interval.start;
    this.hours_interval.end = this.appointment.hours_interval.end;

    this.loading = false;
  }

  private getAppointmentDetails(): Appointment {
    // call based on appointmentId to get more details
    return <Appointment>{
      date: new Date(),
      hours_interval: {
        start: 9,
        end: 10
      },
      status: 'accepted'
    }
  }

}
