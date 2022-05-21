import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Appointment } from 'src/app/models/appointment';
import { AppointmentsService } from 'src/app/services/appointments.service';

@Component({
  selector: 'cyh-patient-dashboard-appointment-details',
  templateUrl: './patient-dashboard-appointment-details.component.html',
  styleUrls: ['./patient-dashboard-appointment-details.component.sass']
})
export class PatientDashboardAppointmentDetailsComponent implements OnInit {
  public addAppointment = false;
  public appointment = new Appointment();
  public loading = true;

  public hoursInterval_options = [
    { start: 9, end: 10, state: 'available' },
    { start: 10, end: 11, state: 'available' },
    { start: 11, end: 12, state: 'not available' },
    { start: 12, end: 13, state: 'available' },
    { start: 14, end: 15, state: 'available' },
    { start: 15, end: 16, state: 'available' },
    { start: 16, end: 17, state: 'available' },
  ];

  public date = new Date();
  public hoursInterval = {
    start: 0,
    end: 0,
  };
  public reason = new FormControl('');

  constructor(private router: Router, private cd: ChangeDetectorRef, private appointmentsService: AppointmentsService) { }

  public ngOnInit() {
    if (this.router.url.includes('create')) {
      this.addAppointment = true;
      this.loading = false;
    }
    else {
      this.appointment = <Appointment>JSON.parse(localStorage.getItem('cyhSelectedAppointment') || '{}');
      this.loading = false;
    }
    this.reason.setValue('test');
  }

  public isCreateBtnDisabled(): boolean {
    return this.hoursInterval.start === 0 || this.reason.value === '';
  }

  public createAppointment(): void {
    // this.appointmentsService.addAppointment(this.appointment.medic.id, this.date, this.hoursInterval)
    //   .subscribe((app: Appointment) => {
    //     console.log(app);
    //     this.router.navigateByUrl('dashboard/patient/home');
    //   });
  }

  public goBack(): void {
    sessionStorage.removeItem('cyhSelectedAppointment');
    this.router.navigateByUrl('dashboard/patient/home');
  }

}
