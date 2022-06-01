import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Appointment, AppointmentStatus } from 'src/app/models/appointment';
import { Patient } from 'src/app/models/patient';
import { HoursInterval, HoursIntervalOption, weekday } from 'src/app/models/workingHours';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { UtilsService } from 'src/app/services/utils.service';
import { MedicRefuseAppointmentDialogComponent } from '../medic-refuse-appointment-dialog/medic-refuse-appointment-dialog.component';

@Component({
  selector: 'cyh-medic-appointment-details',
  templateUrl: './medic-appointment-details.component.html',
  styleUrls: ['./medic-appointment-details.component.sass']
})
export class MedicAppointmentDetailsComponent implements OnInit {
  public loading = true;
  public appointmentType = 'old';
  public addAppointment = false;

  public appointment = new Appointment();
  public hoursIntervalOptions: HoursIntervalOption[] = [];

  public patientsForSelect: Patient[] = [];
  public patientSelected = false;
  public patient = new Patient();

  // input fields
  public date = new Date();
  public startTime = 0;
  public reason = '';
  public reasonField = new FormControl('');

  private medicId = '';
  private appointmentViewLoaded = false;
  private patientViewLoaded = false;

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
    private appointmentsService: AppointmentsService,
    private authService: AuthService,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UsersService,
    private utilsService: UtilsService,
    public dialog: MatDialog,
  ) {
    this.reasonField.valueChanges.subscribe((value: string) => {
      this.reason = value;
    });
  }

  public ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.appointmentType = params['type'] || 'old';
      }
    );

    this.medicId = this.authService.getUserId();

    if (this.router.url.includes('create')) {
      this.addAppointment = true;
      this.getAllPacientsForMedic();
    }
    else {
      this.addAppointment = false;
      const appointment = sessionStorage.getItem('cyhSelectedAppointment');
      if (appointment) {
        this.appointment = <Appointment>JSON.parse(appointment || '{}');
        this.patient = this.appointment.fullPacient;
        this.appointmentViewLoaded = true;
        this.checkIfViewLoadingIsDone();
      }
      else {
        this.goBack();
      }
    }
  }

  public finishPatientViewLoading(): void {
    this.patientViewLoaded = true;
    this.checkIfViewLoadingIsDone();
  }

  public manageDateChange(): void {
    this.setFreeHoursInterval(this.date, this.medicId);
  }

  public setFreeHoursInterval(date: Date, medicId: string): void {
    const timestamp = this.utilsService.getTimestampOfDate(date);
    this.hoursIntervalOptions = [];
    this.appointmentsService.getMedicFreeIntervals(medicId, timestamp).subscribe((freeIntervals: number[]) => {
      freeIntervals.forEach((startTime: number) => {
        this.hoursIntervalOptions.push({
          start: this.utilsService.formatTimeForInterval(startTime),
          end: this.utilsService.formatTimeForInterval(this.utilsService.getEndTimeOfInterval(startTime)),
          value: startTime
        });
      });
      this.appointmentViewLoaded = true;
      this.checkIfViewLoadingIsDone();
    });
  }

  public isCreateBtnDisabled(): boolean {
    return this.startTime === 0 || this.reason === ''  || !this.patientSelected;
  }

  public changePatient(): void {
    this.patientSelected = false;
  }

  public selectPatient(patient: Patient): void {
    this.patientViewLoaded = false;
    this.patient = patient;
    this.patientSelected = true;
  }

  public goBack(): void {
    sessionStorage.removeItem('cyhSelectedAppointment');
    this.router.navigateByUrl('medic/home');
  }

  public setAppointmentStatus(status: AppointmentStatus): void {
    if (status === 'accepted') {
      this.appointmentsService.acceptAppointment(this.appointment.id).subscribe((app: Appointment) => {
        this.appointment.status = app.status;
        this.goBack();
      });
    }
    else {
      const refuseAppointmentDialog = this.dialog.open(MedicRefuseAppointmentDialogComponent, {
        width: '32rem'
      });
      refuseAppointmentDialog.afterClosed().subscribe((responseReason: string) => {
        if (responseReason) {
          this.appointmentsService.refuseAppointment(this.appointment.id, responseReason).subscribe((app: Appointment) => {
            this.appointment.status = app.status;
            this.goBack();
          });
        }
      });
    }
  }

  public createAppointment(): void {
    const timestamp: number = this.utilsService.getTimestampOfDate(this.date);
    const hoursInterval: HoursInterval = {
      start: this.startTime,
      end: this.utilsService.getEndTimeOfInterval(this.startTime)
    };
    this.appointmentsService.addAppointment(this.medicId, timestamp, hoursInterval, this.reason, undefined, this.patient.id)
      .subscribe((app: Appointment) => {
        this.appointmentsService.acceptAppointment(app.id).subscribe(() => {
          this.goBack();
        });
      });
  }

  private getAllPacientsForMedic(): void {
    this.userService.getAllPatientsOfMedic().subscribe((patients: Patient[]) => {
      this.patientsForSelect = patients;
      this.patientViewLoaded = true;
      this.setFreeHoursInterval(this.date, this.medicId);
    });
  }

  private checkIfViewLoadingIsDone(): void {
    if (this.appointmentViewLoaded && this.patientViewLoaded) {
      this.loading = false;
      this.cd.detectChanges();
    }
  }

}
