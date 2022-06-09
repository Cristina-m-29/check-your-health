import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Patient } from 'src/app/models/patient';
import { UsersService } from 'src/app/services/users.service';
import { map, startWith, Subject, Observable, of } from 'rxjs';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';

@Component({
  selector: 'cyh-medic-patients',
  templateUrl: './medic-patients.component.html',
})
export class MedicPatientsComponent implements OnInit {
  public loading = true;
  public patients: Patient[] = [];
  public patientsOriginalList: Patient[] = [];
  public selectedPatient = new Patient();

  public patientsForSearchInput = new Observable<Patient[]>();
  public searchPatientInput = new FormControl();

  @ViewChild(MatAutocompleteTrigger) trigger!: MatAutocompleteTrigger;

  constructor(private usersService: UsersService, private cd: ChangeDetectorRef) {
    this.searchPatientInput.valueChanges.subscribe((value: string) => {
      this.patientsForSearchInput = of(this._filter(value));
    });
  }

  public ngOnInit(): void {
    this.getAllPatientsForMedic();
  }

  public finishLoading(): void {
    this.loading = false;
    this.cd.detectChanges();
  }

  public selectPacientViaSearch(patient: Patient): void {
    if (this.selectedPatient !== patient) {
      const patients = this.patients.filter((pat: Patient) => pat.name !== patient.name);
      this.patients = [patient].concat(patients);
      this.selectedPatient = patient;
      this.cd.detectChanges();
      this.loading = true;
    }
  }

  public selectPatient(patient: Patient): void {
    if (this.selectedPatient !== patient) {
      this.searchPatientInput.reset();
      this.selectedPatient = patient;
      this.cd.detectChanges();
      this.loading = true;
    }
  }

  public onFocus(): void {
    this.trigger._onChange(""); 
    this.trigger.openPanel();
    this.cd.detectChanges();
  }

  private getAllPatientsForMedic(): void {
    this.usersService.getAllPatientsOfMedic().subscribe((patients: Patient[]) => {
      this.patientsOriginalList = patients;
      this.patients = this.patientsOriginalList;
      this.selectedPatient = this.patientsOriginalList[0];
      this.patientsForSearchInput = of(this.patients);
      this.cd.detectChanges();
    });
  }

  private _filter(value: string): Patient[] {
    return this.patients.filter(option => option.name.startsWith(value));
  }
}
