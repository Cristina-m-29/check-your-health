import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BaseUser } from 'src/app/models/base-user';
import { Medic, Specialist } from 'src/app/models/medic';
import { Patient } from 'src/app/models/patient';
import { Pharmacy } from 'src/app/models/pharmacy';
import { UsersService } from 'src/app/services/users.service';
import { AuthService } from 'src/app/services/auth.service';
import { WorkingHours } from 'src/app/models/workingHours';
import { MatDialog } from '@angular/material/dialog';
import { EditEmailDialogComponent } from './edit-email-dialog/edit-email-dialog.component';
import { EditPasswordDialogComponent } from './edit-password-dialog/edit-password-dialog.component';
import { EditPhoneDialogComponent } from './edit-phone-dialog/edit-phone-dialog.component';
import { EditBaseInfoDialogComponent } from './edit-base-info-dialog/edit-base-info-dialog.component';
import { EditAdditionalInfoPatientDialogComponent } from './edit-additional-info-patient-dialog/edit-additional-info-patient-dialog.component';
import { EditAdditionalInfoMedicDialogComponent } from './edit-additional-info-medic-dialog/edit-additional-info-medic-dialog.component';
import { EditAdditionalInfoPharmacyDialogComponent } from './edit-additional-info-pharmacy-dialog/edit-additional-info-pharmacy-dialog.component';

@Component({
  selector: 'cyh-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})
export class UserComponent implements OnInit {
  public loading = true;

  public user: Patient | Medic | Specialist | Pharmacy | null = null;
  public userType = this.authService.getUserType();

  public fullMedic = new Medic();

  constructor(
    private authService: AuthService,
    private cd: ChangeDetectorRef, 
    private usersService: UsersService,
    public dialog: MatDialog,
  ) {}

  public ngOnInit(): void {
    this.getUserInfo();
  }

  get patientConditions(): string[] {
    return (<Patient>this.user)?.conditions;
  }

  get medicCode(): string {
    return (<Medic>this.user)?.code;
  }

  get specialistDomain(): string {
    return (<Specialist>this.user)?.domain;
  }

  get medicWorkingHours(): WorkingHours {
    return (<Medic>this.user)?.workingHours;
  }

  public openEditEmail(): void {
    const editEmail = this.dialog.open(EditEmailDialogComponent, {width: '32rem'});
    editEmail.afterClosed().subscribe();
  }

  public openEditPassword(): void {
    const editPass = this.dialog.open(EditPasswordDialogComponent, {width: '32rem'});
    editPass.afterClosed().subscribe();
  }

  public openEditPhoneNumber(): void {
    const editPhone = this.dialog.open(EditPhoneDialogComponent, {width: '32rem'});
    editPhone.afterClosed().subscribe();
  }

  public openEditBaseInfo(): void {
    const editBaseInfo = this.dialog.open(EditBaseInfoDialogComponent, { 
      width: '32rem', 
      data: {
        name: this.user?.name,
        address: this.user?.address,
        dateOfBirth: this.user?.dateOfBirth
      }
    });
    editBaseInfo.afterClosed().subscribe();
  }

  public openEditAdditionalInfoPatient(): void {
    const editAdditionalInfo = this.dialog.open(EditAdditionalInfoPatientDialogComponent, { 
      width: '32rem', 
      data: {
        conditions: (<Patient>this.user)?.conditions,
        medic: this.fullMedic
      }
    });
    editAdditionalInfo.afterClosed().subscribe();
  }

  public openEditAdditionalInfoMedic(): void {
    const editAddInfoMedic =  this.dialog.open(EditAdditionalInfoMedicDialogComponent, { 
      width: '50rem', 
      data: {
        code: (<Specialist>this.user)?.code,
        domain: (<Specialist>this.user)?.domain,
        workingHours: (<Specialist>this.user)?.workingHours,
      }
    });
    editAddInfoMedic.afterClosed().subscribe();
  }

  public openEditAdditionalInfoPharmacy(): void {
    const editAddPharmacy = this.dialog.open(EditAdditionalInfoPharmacyDialogComponent, {
      width: '50rem',
      data: {
        workingHours: (<Pharmacy>this.user)?.workingHours,
      }
    });
    editAddPharmacy.afterClosed().subscribe();
  }

  private getUserInfo(): void {
    this.usersService.getUserInfo()
      .subscribe((user: BaseUser) => {
        switch (this.userType) {
          case 'patient': {
            this.user = <Patient>user;
            this.getFullMedic();
            break;
          }
          case 'medic': {
            this.user = <Medic>user;
            break;
          }
          case 'specialist': {
            this.user = <Specialist>user;
            break;
          }
          case 'pharmacy': {
            this.user = <Pharmacy>user;
            break;
          }
        }
        this.loading = false;
        this.cd.detectChanges();
      });
  }

  private getFullMedic(): void {
    this.usersService.getUserInfo((<Patient>this.user)?.medic)
      .subscribe((medic: BaseUser) => {
        this.fullMedic = <Medic>medic;
      });
  }
}
