import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { Patient } from 'src/app/models/patient';
import { Prescription } from 'src/app/models/prescription';
import { PrescriptionsService } from 'src/app/services/prescriptions.service';
import { UsersService } from 'src/app/services/users.service';
import { PharmacyPatientSearchDialogComponent } from '../pharmacy-patient-search-dialog/pharmacy-patient-search-dialog.component';

@Component({
  selector: 'cyh-pharmacy-patient-search',
  templateUrl: './pharmacy-patient-search.component.html',
  styleUrls: ['./pharmacy-patient-search.component.sass']
})
export class PharmacyPatientSearchComponent implements OnInit {
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
    private prescriptionsService: PrescriptionsService,
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
    this.prescriptionsService.getPrescriptions().subscribe((press: Prescription[]) => {
      const prescriptionsForDialog = press
        .filter((pres: Prescription) => pres.patient === this.selectedPatient.id)
        .map((pres: Prescription) => { pres.fullPatient = this.selectedPatient; return pres; });
      this.openSearchResultsDialog(this.selectedPatient, prescriptionsForDialog);
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

  private openSearchResultsDialog(patient: Patient, press: Prescription[]): void {
    const searchDialog = this.dialog.open(PharmacyPatientSearchDialogComponent, {
      width: '45rem',
      data: {
        patient: patient, 
        prescriptions: press
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
