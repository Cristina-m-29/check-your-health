import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterBaseUser } from 'src/app/models/base-user';
import { Medic, RegisterMedic } from 'src/app/models/medic';
import { WorkingHours } from 'src/app/models/workingHours';

@Component({
  selector: 'cyh-medic-register',
  templateUrl: './medic-register.component.html',
  styleUrls: ['./medic-register.component.sass']
})
export class MedicRegisterComponent {
  @Input() public registerBaseUser = new RegisterBaseUser();
  @Input() public medicsList: Medic[] = [];
  @Output() public goBackToAdditionalBaseRegister = new EventEmitter();

  public medicRegisterForm = new FormGroup({
    code: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required])
  });

  public medicId = '';
  public workingHours = new WorkingHours();
  public showWorkingHoursForm = false;
  public showSelectMedic = false;

  constructor(private cd: ChangeDetectorRef) {}

  public setMedicId(medicId: string): void {
    this.medicId = medicId;
    this.continueRegister();
  }

  public goBack(): void {
    this.goBackToAdditionalBaseRegister.emit();
  }

  public goBackToMedic(): void {
    this.showWorkingHoursForm = false;
    this.showSelectMedic = false;
    this.cd.detectChanges();
  }

  public hideSelectMedic(): void {
    this.showWorkingHoursForm = true;
    this.showSelectMedic = false;
    this.cd.detectChanges();
  }

  public continueRegister(): void {
    this.showWorkingHoursForm = true;
    this.showSelectMedic = false;
    this.cd.detectChanges();
  }

  public continueRegisterToSelectMedic(): void {
    this.showWorkingHoursForm = false;
    this.showSelectMedic = true;
    this.cd.detectChanges();
  }

  public finishRegister(): void {
    const medic = new RegisterMedic();

    medic.userType = 'medic';
    medic.name = this.registerBaseUser.name;
    medic.email = this.registerBaseUser.email;
    medic.phoneNumber = this.registerBaseUser.phoneNumber;
    medic.password = this.registerBaseUser.password;
    medic.personalNumericCode = this.registerBaseUser.personalNumericCode;
    medic.dateOfBirth = this.registerBaseUser.dateOfBirth;
    medic.conditions = [];
    medic.code = this.medicRegisterForm.value['code'];
    medic.address = this.medicRegisterForm.value['location'];
    medic.medic = this.medicId;
    medic.workingHours = this.workingHours;

    console.log(medic);
    // to do
  }

  public isFinishRegisterBtnDisabled(): boolean {
    return Object.entries(this.workingHours).every(([day, value]) => value.start === 0 && value.end === 0);
  }

  public changedWorkingHours(workingHours: WorkingHours): void {
    this.workingHours = workingHours;
  }

}
