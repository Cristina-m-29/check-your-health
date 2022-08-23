import { ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { Observable, of } from 'rxjs';
import { RegisterBaseUser } from 'src/app/models/base-user';
import { Medic } from 'src/app/models/medic';
import { Patient, RegisterPatient } from 'src/app/models/patient';
import { UserType } from 'src/app/models/userType';
import { AuthService } from 'src/app/services/auth.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'cyh-patient-register',
  templateUrl: './patient-register.component.html',
})
export class PatientRegisterComponent {
  @Input() public end = true;
  @Input() public userType: UserType = 'patient';
  @Input() public registerBaseUser = new RegisterBaseUser();
  @Input() public medicsList: Medic[] = [];
  @Output() public goBackToBaseRegister = new EventEmitter();
  @Output() public finishRegister = new EventEmitter<string>();

  @ViewChild(MatAutocompleteTrigger) trigger!: MatAutocompleteTrigger;

  constructor(private cd: ChangeDetectorRef, private authService: AuthService,) {
    this.medicName.valueChanges.subscribe((medic: Medic) => {
      this.medicsListForInput = of(this._filter(medic.name));
    });
  }

  public medicName = new FormGroup({
    name: new FormControl()
  });
  public medicsListForInput = new Observable<Medic[]>();

  private medicId = '';

  public goBack(): void {
    this.goBackToBaseRegister.emit();
  }

  public doFinishRegister(): void {
    if (this.userType !== 'patient') {
      this.finishRegister.emit(this.medicId);
    }
    else {
      const patient = new RegisterPatient();
      patient.name = this.registerBaseUser.name;
      patient.email = this.registerBaseUser.email;
      patient.address = this.registerBaseUser.address;
      patient.phoneNumber = this.registerBaseUser.phoneNumber;
      patient.password = this.registerBaseUser.password;
      patient.personalNumericCode = this.registerBaseUser.personalNumericCode;
      patient.dateOfBirth = this.registerBaseUser.dateOfBirth;
      patient.medic = this.medicId;
      patient.userType = 'patient';
    
      this.authService.registerPatient(patient);
    }
  }

  public onFocus(): void {
    this.trigger._onChange(""); 
    this.trigger.openPanel();
    this.cd.detectChanges();
  }

  public selectMedic(medic: Medic): void {
    this.medicId = medic.id;
    this.medicName.setControl('name', new FormControl(medic.name));
  }

  private _filter(value: string): Medic[] {
    return this.medicsList.filter(option => option.name.toLocaleLowerCase().startsWith(value.toLocaleLowerCase()));
  }

}
