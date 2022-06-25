import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { Appointment } from 'src/app/models/appointment';
import { Patient } from 'src/app/models/patient';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { UsersService } from 'src/app/services/users.service';
import { SpecialistAppointmentSearchDialogComponent } from '../specialist-appointment-search-dialog/specialist-appointment-search-dialog.component';

@Component({
  selector: 'cyh-specialist-appointment-search',
  templateUrl: './specialist-appointment-search.component.html',
  styleUrls: ['./specialist-appointment-search.component.sass']
})
export class SpecialistAppointmentSearchComponent implements OnInit {
  public shouldSearchBeDisabled = true;
  public searchRecommendationInput = new FormControl();

  public usersListForInput = new Observable<Patient[]>();
  private usersList: Patient[] = [];
  private selectedPatient = new Patient;

  @ViewChild('searchTrigger', { read: MatAutocompleteTrigger }) searchTrigger!: MatAutocompleteTrigger;

  constructor(
    public dialog: MatDialog, 
    private cd: ChangeDetectorRef, 
    private usersService: UsersService,
    private appointmentsService: AppointmentsService,
  ) {
    this.searchRecommendationInput.valueChanges.subscribe((value: string) => {
      if(value !== '') {
        this.shouldSearchBeDisabled = false;
      }
      this.usersListForInput = of(this._filter(value));
    });
  }

  public ngOnInit(): void {
    this.getAllPatients();
  }

  public manageKeypress(keyEvent: KeyboardEvent): void {
    if (keyEvent.code === 'Enter' && this.searchRecommendationInput.value) {
      this.startSearch();
    }
  }

  public startSearch(): void {
    this.appointmentsService.getAppointmentsOfPatientForMedic(this.selectedPatient.id).subscribe((apps: Appointment[]) => {
      this.openSearchResultsDialog(this.selectedPatient, apps);
    });
  }

  public selectPatient(patient: Patient): void {
    this.selectedPatient = patient;
  }

  public onFocus(): void {
    this.searchTrigger._onChange(""); 
    this.searchTrigger.openPanel();
    this.cd.detectChanges();
  }

  private openSearchResultsDialog(patient: Patient, apps: Appointment[]): void {
    const searchDialog = this.dialog.open(SpecialistAppointmentSearchDialogComponent, {
      width: '30rem',
      data: {
        patient: patient, 
        appointments: apps
      }
    });
    searchDialog.afterClosed().subscribe();
  }

  private getAllPatients(): void {
    this.usersService.getAllPatients().subscribe((users: Patient[]) => {
      this.usersList = users.filter((user: any) => user['cls'] === 'BaseUser.Patient');
    });
  }

  private _filter(value: string): Patient[] {
    return this.usersList.filter(option => option.name.startsWith(value));
  }

}
