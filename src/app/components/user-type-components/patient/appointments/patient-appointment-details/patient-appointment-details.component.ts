
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Appointment } from 'src/app/models/appointment';
import { BaseUser } from 'src/app/models/base-user';
import { Specialist } from 'src/app/models/medic';
import { HoursInterval, weekday } from 'src/app/models/workingHours';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { UsersService } from 'src/app/services/users.service';
import { UtilsService } from 'src/app/services/utils.service';

interface HoursIntervalOption {
  start: string;
  end: string;
  value: number;
}

@Component({
  selector: 'cyh-patient-appointment-details',
  templateUrl: './patient-appointment-details.component.html',
  styleUrls: ['./patient-appointment-details.component.sass']
})
export class PatientAppointmentDetailsComponent implements OnInit {
  public addAppointment = false;
  public appointment = new Appointment();
  public medic = new Specialist();
  public referenceId = '';
  public loading = true;

  public hoursIntervalOptions: HoursIntervalOption[] = [];

  // input fields
  public date = new Date();
  public startTime = 0;
  public reason = '';
  public reasonField = new FormControl('');

  // filer dates on calendar
  // previous and weekend days are not allowed
  public dateFilterForCalendar = (d: any): boolean => {
    const date = this.utilsService.formatDateToUtc(d);
    const currentDate = moment().hour(0).minute(0).second(0).millisecond(0);
    if (date >= currentDate && !['sunday', 'saturday'].includes(weekday[date.day()])) {
      return true;
    }
    return false;
  }

  constructor(
    private router: Router, 
    private appointmentsService: AppointmentsService,
    private usersService: UsersService,
    private utilsService: UtilsService,
  ) {
    this.reasonField.valueChanges.subscribe((value: string) => {
      this.reason = value;
    });
  }

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
        this.referenceId = this.router.url.split('referenceId=')[1].split('&medicId')[0];
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
  // update free time intervals
  public manageDateChange(): void {
    this.setFreeHoursInterval(this.date, this.medic);
  }

  // create free time intervals for ui
  public setFreeHoursInterval(date: Date, medic: Specialist): void {
    const timestamp = this.utilsService.getTimestampOfDate(date);
    this.hoursIntervalOptions = [];
    this.appointmentsService.getMedicFreeIntervals(medic.id, timestamp).subscribe((freeIntervals: number[]) => {
      freeIntervals.forEach((startTime: number) => {
        this.hoursIntervalOptions.push({
          start: this.formatTimeForInterval(startTime),
          end: this.formatTimeForInterval(this.getEndTimeOfInterval(startTime)),
          value: startTime
        });
      });
      this.loading = false;
    });
  }

  // check if form is completed
  public isCreateBtnDisabled(): boolean {
    return this.startTime === 0 || this.reason === '';
  }

  // create appointment
  public createAppointment(): void {
    const timestamp: number = this.utilsService.getTimestampOfDate(this.date);
    const hoursInterval: HoursInterval = {
      start: this.startTime,
      end: this.getEndTimeOfInterval(this.startTime)
    };
    this.appointmentsService.addAppointment(this.medic.id, timestamp, hoursInterval, this.reason, this.referenceId)
      .subscribe(() => {
        this.router.navigateByUrl('patient/home');
      });
  }

  // go to privious page
  public goBack(): void {
    sessionStorage.removeItem('cyhSelectedAppointment');
    this.router.navigateByUrl('patient/home');
  }

  // get family medic
  private getFamilyMedic(): void {
    this.usersService.getMedicOfUser().subscribe((medic: BaseUser) => {
      this.medic = <Specialist>medic;
      this.setFreeHoursInterval(this.date, this.medic);
    });
  }

  private getMedic(medicId?: string): void {
    this.usersService.getUserInfo(medicId).subscribe((medic: BaseUser) => {
      this.medic = <Specialist>medic;
      this.setFreeHoursInterval(this.date, this.medic);
    });
  }

  private getEndTimeOfInterval(startTime: number): number {
    let endTime = startTime + 30;
    if (startTime % 100 !== 0) {
      endTime += 40;
    }
    return endTime;
  }

  private formatTimeForInterval(time: number): string {
    const end = time % 100;
    return (time / 100).toFixed().toString() + ':' + (end === 0 ? '00' : end.toString());
  }

}
