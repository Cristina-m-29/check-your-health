import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BaseUser } from 'src/app/models/base-user';
import { Medic } from 'src/app/models/medic';
import { Patient } from 'src/app/models/patient';
import { Prescription } from 'src/app/models/prescription';
import { UsersService } from 'src/app/services/users.service';

class DialogData {
  patient = new Patient();
  prescriptions: Prescription[] = [];
}

@Component({
  selector: 'cyh-pharmacy-patient-search-dialog',
  templateUrl: './pharmacy-patient-search-dialog.component.html',
  styleUrls: ['./pharmacy-patient-search-dialog.component.sass']
})
export class PharmacyPatientSearchDialogComponent implements OnInit {
  public patient = new Patient();
  public prescriptions: Prescription[] = [];

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<PharmacyPatientSearchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private usersService: UsersService,
  ) {}

  public ngOnInit(): void {
    this.patient = this.data.patient;
    this.getMedics(this.data.prescriptions);
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public isDeliveredOrRefused(pres: Prescription): boolean {
    return pres.status === 'delivered' || pres.status === 'refused';
  }

  public openPrescriptionDetails(pres: Prescription): void {
    sessionStorage.setItem('cyhSelectedPrescription', JSON.stringify(pres));
    this.router.navigateByUrl('pharmacy/prescription?id=' + pres.id);
    this.onNoClick();
  }

  private getMedics(prescriptions: Prescription[]): void {
    prescriptions.forEach((pres: Prescription) => {
      this.usersService.getUserInfo(pres.medic).subscribe((medic: BaseUser) => {
        pres.fullMedic = <Medic>medic;
        if (prescriptions.indexOf(pres) === prescriptions.length - 1) {
          this.prescriptions = prescriptions;
        }
      })
    });
  }

}
