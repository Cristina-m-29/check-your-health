import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RegisterBaseUser } from 'src/app/models/base-user';
import { Medic, RegisterSpecialist } from 'src/app/models/medic';
import { WorkingHours } from 'src/app/models/workingHours';

@Component({
  selector: 'cyh-specialist-register',
  templateUrl: './specialist-register.component.html',
})
export class SpecialistRegisterComponent {
  @Input() public registerBaseUser = new RegisterBaseUser();
  @Input() public medicsList: Medic[] = [];
  @Output() public goBackToBaseRegister = new EventEmitter();

  public medicRegisterForm = new FormGroup({
    code: new FormControl(),
    domain: new FormControl(),
    location: new FormControl()
  });

  public workingHours = new WorkingHours();
  public showWorkingHoursForm = false;
  public showSelectMedic = false;

  constructor(private cd: ChangeDetectorRef) {}

  public goBack(): void {
    this.goBackToBaseRegister.emit();
  }

  public goBackToMedic(): void {
    this.showWorkingHoursForm = false;
    this.cd.detectChanges();
  }

  public hideSelectMedic(): void {
    this.showSelectMedic = false;
    this.cd.detectChanges();
  }

  public continueRegister(): void {
    this.showWorkingHoursForm = true;
    this.cd.detectChanges();
  }

  public continueRegisterToSelectMedic(): void {
    this.showWorkingHoursForm = false;
    this.showSelectMedic = true;
    this.cd.detectChanges();
  }

  public finishRegister(medicId: string): void {
    const specialist = new RegisterSpecialist();

    specialist.name = this.registerBaseUser.name;
    specialist.email = this.registerBaseUser.email;
    specialist.phoneNumber = this.registerBaseUser.phoneNumber;
    specialist.password = this.registerBaseUser.password;
    specialist.personalNumericCode = this.registerBaseUser.personalNumericCode;
    specialist.dateOfBirth = this.registerBaseUser.dateOfBirth;
    specialist.conditions = [];
    specialist.code = this.medicRegisterForm.value['code'];
    specialist.address = this.medicRegisterForm.value['location'];
    specialist.medic = medicId;
    specialist.workingHours = this.workingHours;

    console.log(specialist);
    // to do
  }

  public isFinishRegisterBtnDisabled(): boolean {
    return Object.entries(this.workingHours).every(([day, value]) => value.start === 0 && value.end === 0);
  }

  public changedWorkingHours(workingHours: WorkingHours): void {
    this.workingHours = workingHours;
  }
}
