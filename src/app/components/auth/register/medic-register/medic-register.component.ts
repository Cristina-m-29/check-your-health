import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  @Output() public goBackToBaseRegister = new EventEmitter();

  public medicRegisterForm = new FormGroup({
    code: new FormControl(),
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
    const medic = new RegisterMedic();

    medic.name = this.registerBaseUser.name;
    medic.email = this.registerBaseUser.email;
    medic.phoneNumber = this.registerBaseUser.phoneNumber;
    medic.password = this.registerBaseUser.password;
    medic.personalNumericCode = this.registerBaseUser.personalNumericCode;
    medic.dateOfBirth = this.registerBaseUser.dateOfBirth;
    medic.conditions = [];
    medic.code = this.medicRegisterForm.value['code'];
    medic.address = this.medicRegisterForm.value['location'];
    medic.medic = medicId;
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
