import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BaseUser } from 'src/app/models/base-user';
import { Medic } from 'src/app/models/medic';
import { Patient } from 'src/app/models/patient';
import { Prescription } from 'src/app/models/prescription';
import { PrescriptionsService } from 'src/app/services/prescriptions.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'cyh-pharmacy-prescriptions-history',
  templateUrl: './pharmacy-prescriptions-history.component.html',
  styleUrls: ['./pharmacy-prescriptions-history.component.sass']
})
export class PharmacyPrescriptionsHistoryComponent implements OnInit {
  public loading = true;
  public prescriptions: Prescription[] = [];
  public selectedPrescription = new Prescription();
  public patientForSelectedPrescription = new Patient();
  public medicForSelectedPrescription = new Medic();

  constructor(
    private prescriptionsService: PrescriptionsService, 
    private usersService: UsersService,
    private cd: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    this.getPrescriptions();
  }

  public selectPrescription(prescription: Prescription): void {
    this.loading = true;
    this.selectedPrescription = prescription;
    this.patientForSelectedPrescription = prescription.fullPatient || new Patient();
    this.medicForSelectedPrescription = prescription.fullMedic || new Medic();
    this.loading = false;
    this.cd.detectChanges();
  }

  private getPrescriptions(): void {
    this.prescriptionsService.getPrescriptions().subscribe((prescriptions: Prescription[]) => {
      if (prescriptions.length > 0) {
        this.getPatientsForPrescriptions(prescriptions);
      }
      else {
        this.loading = false;
        this.cd.detectChanges();
      }
    });
  }

  private getPatientsForPrescriptions(press: Prescription[]): void {
    press.forEach((pres: Prescription) => {
      this.usersService.getUserInfo(pres.patient).subscribe((patient: BaseUser) => {
        pres.fullPatient = <Patient>patient;
        if (press.indexOf(pres) === press.length - 1) {
          this.getMedicsForPrescriptions(press);
        }
      });
    });
  }

  private getMedicsForPrescriptions(press: Prescription[]): void {
    press.forEach((pres: Prescription) => {
      this.usersService.getUserInfo(pres.medic).subscribe((medic: BaseUser) => {
        pres.fullMedic = <Medic>medic;
        if (press.indexOf(pres) === press.length - 1) {
          this.prescriptions = press;
          this.selectPrescription(press[0]);
        }
      });
    });
  }

}
