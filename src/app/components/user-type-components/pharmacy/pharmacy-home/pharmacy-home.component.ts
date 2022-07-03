import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseUser } from 'src/app/models/base-user';
import { Medic } from 'src/app/models/medic';
import { SocketNotification } from 'src/app/models/notification';
import { Patient } from 'src/app/models/patient';
import { Prescription } from 'src/app/models/prescription';
import { PrescriptionsService } from 'src/app/services/prescriptions.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'cyh-pharmacy-home',
  templateUrl: './pharmacy-home.component.html',
  styleUrls: ['./pharmacy-home.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PharmacyHomeComponent implements OnInit {
  public loading = true;

  public pendingPress: Prescription[] = [];
  public readyForPickupPress: Prescription[] = [];
  public oldPress: Prescription[] = [];
  
  constructor(
    private prescriptionsService: PrescriptionsService, 
    private cd: ChangeDetectorRef,
    private usersService: UsersService,
    private router: Router,
  ) {
    this.prescriptionsService.getPrescriptionEvents().subscribe((value) => {
      const notif = <SocketNotification>JSON.parse(value.data);
      if(notif.eventMethod === 'POST' || notif.eventMethod === 'PUT') {
        this.getPrescriptions();
      }
    });
  }

  public ngOnInit(): void {
    this.getPrescriptions();
  }

  public openPrescriptionDetails(pres: Prescription): void {
    sessionStorage.setItem('cyhSelectedPrescription', JSON.stringify(pres));
    this.router.navigateByUrl('pharmacy/prescription?id=' + pres.id)
  }

  private getPrescriptions(): void {
    this.prescriptionsService.getPrescriptions().subscribe((press: Prescription[]) => {
      this.getFullPatientsOfPrescriptions(press);
    });
  }

  private getFullPatientsOfPrescriptions(press: Prescription[]): void {
    press.forEach((pres: Prescription) => {
      this.usersService.getUserInfo(pres.patient).subscribe((patient: BaseUser) => {
        pres.fullPatient = <Patient>patient;

        if (press.indexOf(pres) === press.length - 1) {
          this.getFullMedicsOfPrescriptions(press);
        }
      });
    });
  }

  private getFullMedicsOfPrescriptions(press: Prescription[]): void {
    press.forEach((pres: Prescription) => {
      this.usersService.getUserInfo(pres.medic).subscribe((medic: BaseUser) => {
        pres.fullMedic = <Medic>medic;

        if (press.indexOf(pres) === press.length - 1) {
          this.filterPrescriptions(press);
        }
      });
    });
  }

  private filterPrescriptions(press: Prescription[]): void {
    this.pendingPress = [];
    this.readyForPickupPress = [];
    this.oldPress = [];
    press.forEach((pres: Prescription) => {
      if (pres.status === 'pending') {
        this.pendingPress.push(pres);
      }
      else if (pres.status === 'ready for pickup') {
        this.readyForPickupPress.push(pres);
      }
      else {
        this.oldPress.push(pres);
      }

      if (press.indexOf(pres) === press.length - 1) {
        this.loading = false;
        this.cd.detectChanges();
      }
    });
  }

}
