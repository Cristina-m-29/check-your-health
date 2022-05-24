import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Appointment } from 'src/app/models/appointment';
import { BaseUser } from 'src/app/models/base-user';
import { Medic } from 'src/app/models/medic';
import { weekday } from 'src/app/models/workingHours';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'cyh-patient-dashboard-appointment-details',
  templateUrl: './patient-dashboard-appointment-details.component.html',
  styleUrls: ['./patient-dashboard-appointment-details.component.sass']
})
export class PatientDashboardAppointmentDetailsComponent implements OnInit {
  public addAppointment = false;
  public appointment = new Appointment();
  public medic = new Medic();
  public referenceId = '';
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

  // input fields
  public date = new Date();
  public hoursInterval = { start: 0, end: 0 };
  public reason = new FormControl('');

  // filer dates on calendar
  // previous and weekend days are not allowed
  public dateFilterForCalendar = (date: any): boolean => {
    if (moment(date) >= moment().hour(0).minute(0).second(0).millisecond(0) && weekday[date.getDay()]) {
      return true;
    }
    return false;
  }

  constructor(
    private router: Router, 
    private appointmentsService: AppointmentsService,
    private usersService: UsersService,
  ) {}

  public ngOnInit() {
    // create appointment init
    if (this.router.url.includes('create')) {
      this.addAppointment = true;

      // for family medic
      if (!this.router.url.includes('medicId')) {
        this.getFamilyMedic();
      }
      // for specialist
      else {
        const medicId = this.router.url.split('medicId=')[1];
        this.referenceId = this.router.url.split('referenceId=')[1].split('medicId')[0];
        this.getMedic(medicId);
      }
    }
    // view appointment init
    else {
      this.addAppointment = false;
      this.appointment = <Appointment>JSON.parse(localStorage.getItem('cyhSelectedAppointment') || '{}');
      this.getMedic(this.appointment.medic);
    }
  }


  // manage date change on calendar
  public manageDateChange(ev: any): void {
    // to do
    // this.setHoursInterval();
  }

  public setHoursInterval(medic: Medic): void {
    // to do

    this.loading = false;
  }

  // check if form is completed
  public isCreateBtnDisabled(): boolean {
    return this.hoursInterval.start === 0 || this.reason.value === '';
  }

  // create appointment
  public createAppointment(): void {
    
    // this.appointmentsService.addAppointment(this.appointment.medic.id, this.date, this.hoursInterval)
    //   .subscribe((app: Appointment) => {
    //     console.log(app);
    //     this.router.navigateByUrl('patient/home');
    //   });
  }

  // go to privious page
  public goBack(): void {
    sessionStorage.removeItem('cyhSelectedAppointment');
    this.router.navigateByUrl('patient/home');
  }

  private getFamilyMedic(): void {
    this.usersService.getMedicOfUser().subscribe((medic: BaseUser) => {
      this.medic = <Medic>medic;
      this.setHoursInterval(this.medic);
    });
  }

  private getMedic(medicId?: string): void {
    this.usersService.getUserInfo(medicId).subscribe((medic: BaseUser) => {
      this.medic = <Medic>medic;
      this.setHoursInterval(this.medic);
    });
  }

}
