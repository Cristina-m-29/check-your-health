import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RegisterBaseUser } from 'src/app/models/base-user';
import { Medic } from 'src/app/models/medic';
import { RegisterPharmacy } from 'src/app/models/pharmacy';
import { WorkingHours } from 'src/app/models/workingHours';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'cyh-pharmacy-register',
  templateUrl: './pharmacy-register.component.html',
  styleUrls: ['./pharmacy-register.component.sass']
})
export class PharmacyRegisterComponent {
  @Input() public registerBaseUser = new RegisterBaseUser();
  @Input() public medicsList: Medic[] = [];
  @Output() public goBackToBaseRegister = new EventEmitter();

  public showWorkingHoursForm = false;
  public workingHours = new WorkingHours();

  public farmacyRegisterForm = new FormGroup({
    location: new FormControl()
  });

  constructor(private cd: ChangeDetectorRef, private authService: AuthService) {}

  public goBack(): void {
    this.goBackToBaseRegister.emit();
  }

  public continueRegister(): void {
    this.showWorkingHoursForm = true;
    this.cd.detectChanges();
  }

  public goBackPharmacy(): void {
    this.showWorkingHoursForm = false;
    this.cd.detectChanges();
  }

  public finishRegister(): void {
    const pharmacy = new RegisterPharmacy();
    pharmacy.name = this.registerBaseUser.name;
    pharmacy.email = this.registerBaseUser.email;
    pharmacy.phoneNumber = this.registerBaseUser.phoneNumber;
    pharmacy.password = this.registerBaseUser.password;
    pharmacy.personalNumericCode = this.registerBaseUser.personalNumericCode;
    pharmacy.dateOfBirth = this.registerBaseUser.dateOfBirth;
    pharmacy.address = this.farmacyRegisterForm.value['location'];
    pharmacy.workingHours = this.workingHours;
    pharmacy.userType = 'pharmacy'

    this.authService.registerPharmacy(pharmacy);
  }

  public isFinishRegisterBtnDisabled(): boolean {
    return Object.entries(this.workingHours).every(([day, value]) => value.start === 0 && value.end === 0);
  }

  public changedWorkingHours(workingHours: WorkingHours): void {
    this.workingHours = workingHours;
  }
}
