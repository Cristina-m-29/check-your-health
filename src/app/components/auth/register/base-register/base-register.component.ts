import { ThisReceiver } from '@angular/compiler';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterBaseUser } from 'src/app/models/base-user';
import { Medic } from 'src/app/models/medic';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'cyh-base-register',
  templateUrl: './base-register.component.html',
  styleUrls: ['./base-register.component.sass']
})
export class BaseRegisterComponent implements OnInit {
  public showBaseRegisterView = true;
  public showAdditionalBaseRegisterView = true;
  public userType = this.authService.getUserType();

  public baseRegisterForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [
      Validators.required, 
      Validators.minLength(10), 
      Validators.maxLength(10),
    ]),
    email: new FormControl('', this.userType !== 'patient' ? [Validators.required] : []),
    password: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
  });
  public registerBaseUser = new RegisterBaseUser();

  public additionalBaseRegisterForm = new FormGroup({
    personalNumericCode: new FormControl('', [Validators.required]),
    dateOfBirthOld: new FormControl('', [Validators.required]),
  });

  public medicsList: Medic[] = [];

  constructor(
    private authService: AuthService, 
    private cd: ChangeDetectorRef,
    private router: Router, 
    private usersService: UsersService,
    private utilsService: UtilsService
  ) {
    this.baseRegisterForm.valueChanges.subscribe((registerBaseUser: RegisterBaseUser) => {
      this.registerBaseUser = registerBaseUser;
      this.cd.detectChanges();
    });

    this.additionalBaseRegisterForm.valueChanges.subscribe((registerBaseUser: RegisterBaseUser) => {
      this.registerBaseUser.personalNumericCode = registerBaseUser.personalNumericCode;
      this.registerBaseUser.dateOfBirth = this.utilsService.getTimestampOfDate(registerBaseUser.dateOfBirthOld);
      this.cd.detectChanges();
    });
  }

  public ngOnInit(): void {
    this.getListOfMedics();
  }

  public backToChooseUserType(): void {
    this.baseRegisterForm.reset();
    this.authService.setUserType(null);
    this.router.navigateByUrl('');
  }

  public continueRegisterToAdditional(): void {
    if (this.userType !== 'pharmacy') {
      this.showBaseRegisterView = false;
      this.showAdditionalBaseRegisterView = true;
      this.cd.detectChanges();
    }
    else {
      this.continueRegister();
    }
  }

  public continueRegister(): void {
    this.showBaseRegisterView = false;
    this.showAdditionalBaseRegisterView = false;
    this.cd.detectChanges();
  }

  public goBackToBaseRegister() {
    this.showAdditionalBaseRegisterView = false;
    this.showBaseRegisterView = true;
    this.cd.detectChanges();
  }

  public goBackToAdditionalBaseRegister() {
    this.showBaseRegisterView = false;
    this.showAdditionalBaseRegisterView = true;
    this.cd.detectChanges();
  }

  private getListOfMedics(): void {
    this.usersService.getMedicsListForRegister().subscribe((medics: Medic[]) => {
      this.medicsList = medics;
    });
  }

}
