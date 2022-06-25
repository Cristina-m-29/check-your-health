import { Prescription } from 'src/app/models/prescription';
import { Recommendation } from 'src/app/models/recommendation';
import { ThisReceiver } from '@angular/compiler';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Observable, of } from 'rxjs';
import { Appointment, AppointmentStatus } from 'src/app/models/appointment';
import { Diagnostic } from 'src/app/models/diagnostic';
import { Patient } from 'src/app/models/patient';
import { HoursInterval, HoursIntervalOption, weekday } from 'src/app/models/workingHours';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { AuthService } from 'src/app/services/auth.service';
import { DiagnosticsService } from 'src/app/services/diagnostics.service';
import { UsersService } from 'src/app/services/users.service';
import { UtilsService } from 'src/app/services/utils.service';
import { environment } from 'src/environments/environment';
import { MedicAddDiagnosticDialogComponent } from '../medic-add-diagnostic-dialog/medic-add-diagnostic-dialog.component';
import { MedicAddPrescriptionComponent } from '../medic-add-prescription/medic-add-prescription.component';
import { MedicAddRecommendationComponent } from '../medic-add-recommendation/medic-add-recommendation.component';
import { MedicRefuseAppointmentDialogComponent } from '../medic-refuse-appointment-dialog/medic-refuse-appointment-dialog.component';
import { RecommendationsService } from 'src/app/services/recommandations.service';
import { PrescriptionsService } from 'src/app/services/prescriptions.service';

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

  public patientSelected = false;
  public patient = new Patient();

  public patientsForSelect: Patient[] = [];
  public patientsForSelectInput = new Observable<Patient[]>();
  public searchPatientInput = new FormControl();

  // input fields
  public date = new Date();
  public startTime = 0;
  public reason = '';
  public reasonField = new FormControl('');

  private medicId = '';
  private appointmentViewLoaded = false;
  private patientViewLoaded = false;
  private openedFromPatientsPage = false;

  public forSpecialist = false;

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

  @ViewChild(MatAutocompleteTrigger) trigger!: MatAutocompleteTrigger;

  constructor(
    private appointmentsService: AppointmentsService,
    private recommendationsService: RecommendationsService,
    private prescriptionsService: PrescriptionsService,
    private authService: AuthService,
    private cd: ChangeDetectorRef,
    private diagnosticsService: DiagnosticsService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UsersService,
    private utilsService: UtilsService,
    public dialog: MatDialog,
  ) {
    this.reasonField.valueChanges.subscribe((value: string) => {
      this.reason = value;
    });

    this.searchPatientInput.valueChanges.subscribe((value: string) => {
      this.patientsForSelectInput = of(this._filter(value));
    });
  }

  public ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        const type = params['type'];
        if (!type && !this.router.url.includes('create')) {
          this.openedFromPatientsPage = true;
        }
        this.appointmentType = params['type'] || 'old';
      }
    );

    if(this.router.url.includes('specialist')) {
      this.forSpecialist = true;
    }

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

  public generateRaportLink(): string {
    return environment['baseUrl'] + '/appointments/' + this.appointment.id + '/download-report';
  }

  public onFocus(): void {
    this.trigger._onChange(""); 
    this.trigger.openPanel();
    this.cd.detectChanges();
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
    console.log(patient);
    this.patientViewLoaded = false;
    this.patient = patient;
    this.patientSelected = true;
  }

  public goBack(): void { 
    sessionStorage.removeItem('cyhSelectedAppointment');
    if (this.forSpecialist) {
      this.router.navigateByUrl('specialist/home');
    }
    else {
      if (!this.openedFromPatientsPage) {
        this.router.navigateByUrl('medic/home');
      }
      else {
        this.router.navigateByUrl('medic/patients');
      }
    }
  }

  public isOldAppointment(date: number): boolean {
    return new Date() > new Date(date * 1000);
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

  public openAddDiagnostic(): void {
    const addDiagnosticDialog = this.dialog.open(MedicAddDiagnosticDialogComponent, {
      width: '160rem',
      data: {
        editable: true
      }
    });
    addDiagnosticDialog.afterClosed().subscribe((diagnostic: Diagnostic) => {
      if (diagnostic) {
        this.diagnosticsService.addDiagnostic(this.appointment.id, diagnostic).subscribe((diagnostic: Diagnostic) => {
          this.appointment.diagnostic = diagnostic;
          this.cd.detectChanges();
        });
      }
    });
  }

  public openViewDiagnostic(): void {
    const viewDiagnosticDialog = this.dialog.open(MedicAddDiagnosticDialogComponent, {
      width: '160rem',
      data: {
        editable: false,
        diagnostic: this.appointment.diagnostic,
      }
    });
    viewDiagnosticDialog.afterClosed().subscribe();
  }

  public openAddRecommendation(): void {
    const addRecommendationDialog = this.dialog.open(MedicAddRecommendationComponent, {
      width: '32rem',
    });
    addRecommendationDialog.afterClosed().subscribe((rec: Recommendation) => {
      if (rec) {
        this.loading = true;
        this.recommendationsService.addRecommendation(this.appointment.patient, rec.specialist, rec.details)
          .subscribe(() => {
            window.location.reload();
          });
      }
    });
  }

  public openAddPrescription(): void {
    const addRecommendationDialog = this.dialog.open(MedicAddPrescriptionComponent, {
      width: '40rem'
    });
    addRecommendationDialog.afterClosed().subscribe((prescription: Prescription) => {
      if (prescription) {
        this.loading = true;
        this.prescriptionsService.addPrescription(this.appointment.patient, prescription.pharmacy, this.appointment.medic, prescription.medicines)
          .subscribe((pres: Prescription) => {
            window.location.reload();
          });
      }
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

  private _filter(value: string): Patient[] {
    return this.patientsForSelect.filter(option => option.name.startsWith(value));
  }

}
