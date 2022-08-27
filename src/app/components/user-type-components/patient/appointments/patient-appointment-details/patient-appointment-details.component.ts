
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Appointment } from 'src/app/models/appointment';
import { BaseUser } from 'src/app/models/base-user';
import { Diagnostic } from 'src/app/models/diagnostic';
import { Specialist } from 'src/app/models/medic';
import { Recommendation } from 'src/app/models/recommendation';
import { HoursInterval, HoursIntervalOption, weekday } from 'src/app/models/workingHours';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { RecommendationsService } from 'src/app/services/recommandations.service';
import { UsersService } from 'src/app/services/users.service';
import { UtilsService } from 'src/app/services/utils.service';
import { environment } from 'src/environments/environment';
import { MedicAddDiagnosticDialogComponent } from '../../../medic/appointments/medic-add-diagnostic-dialog/medic-add-diagnostic-dialog.component';

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

  public recommendation = new Recommendation();
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
    private recommendationsService: RecommendationsService,
    private usersService: UsersService,
    private utilsService: UtilsService,
    public dialog: MatDialog,
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
      const appointment = sessionStorage.getItem('cyhSelectedAppointment');
      if(appointment) {
        this.appointment = <Appointment>JSON.parse(appointment || '{}');
        this.findIfAppointmentIsFromRecommendation(this.appointment);
      }
      else {
        this.goBack();
      }
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
          start: this.utilsService.formatTimeForInterval(startTime),
          end: this.utilsService.formatTimeForInterval(this.utilsService.getEndTimeOfInterval(startTime)),
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
      end: this.utilsService.getEndTimeOfInterval(this.startTime)
    };
    this.appointmentsService.addAppointment(this.medic.id, timestamp, hoursInterval, this.reason, this.referenceId)
      .subscribe(() => {
        this.router.navigateByUrl('patient/home');
      });
  }

  public viewRecommendation(): void {
    sessionStorage.setItem('cyhSelectedReference', JSON.stringify(this.recommendation));
    this.router.navigateByUrl('patient/references');
  }

  // go to privious page
  public goBack(): void {
    sessionStorage.removeItem('cyhSelectedAppointment');
    this.router.navigateByUrl('patient/home');
  }

  public generateRaportLink(): string {
    return environment['baseUrl'] + '/appointments/' + this.appointment.id + '/download-report';
  }

  public openViewDiagnostic(diagnostic?: Diagnostic): void {
    const viewDiagnosticDialog = this.dialog.open(MedicAddDiagnosticDialogComponent, {
      width: '160rem',
      data: {
        editable: false,
        diagnostic: diagnostic ? diagnostic : this.appointment.diagnostic,
      }
    });
    viewDiagnosticDialog.afterClosed().subscribe();
  }

  private findIfAppointmentIsFromRecommendation(appointment: Appointment): void {
    this.recommendationsService.getRecommendations().subscribe((recs: Recommendation[]) => {
      const recommendation = recs.find((rec: Recommendation) => rec?.appointment?.id === appointment.id);
      if (recommendation) {
        this.recommendation = recommendation;
      }
      this.getMedic(appointment.medic);
    });
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

}
