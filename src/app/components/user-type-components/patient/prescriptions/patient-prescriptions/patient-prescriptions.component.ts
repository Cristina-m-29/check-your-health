import { Component, OnInit } from '@angular/core';
import { BaseUser } from 'src/app/models/base-user';
import { Pharmacy } from 'src/app/models/pharmacy';
import { Prescription } from 'src/app/models/prescription';
import { PrescriptionsService } from 'src/app/services/prescriptions.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'cyh-patient-prescriptions',
  templateUrl: './patient-prescriptions.component.html',
  styleUrls: ['./patient-prescriptions.component.sass']
})
export class PatientPrescriptionsComponent implements OnInit {
  public loading = true;
  public prescriptions: Prescription[] = [];
  public selectedPrescription = new Prescription();
  public pharmacyForSelectedPrescription = new Pharmacy();

  constructor(private prescriptionsService: PrescriptionsService, private usersService: UsersService) { }

  public ngOnInit() {
    this.getPrescriptions();
    this.getPrescriptionEvents();
  }

  public selectPrescription(prescription: Prescription): void {
    this.loading = true;
    this.selectedPrescription = prescription;
    this.getPharmacyForSelectedPrescription(prescription);
  }

  private getPrescriptions(): void {
    this.prescriptionsService.getPrescriptions().subscribe((prescriptions: Prescription[]) => {
      this.prescriptions = prescriptions;
      
      if (prescriptions.length > 0) {
        this.selectPrescription(this.prescriptions[0]);
      }
      else {
        this.loading = false;
      }
    });
  }

  private getPrescriptionEvents(): void {
    this.prescriptionsService.getPrescriptionEvents().subscribe((value) => {
      if(value.data === 'POST' || value.data === 'PUT' || value.data === 'PATCH') {
        this.getPrescriptions();
      }
    });
  }

  private getPharmacyForSelectedPrescription(prescription: Prescription): void {
    this.usersService.getUserInfo(prescription.pharmacy).subscribe((pharmacy: BaseUser) => {
      this.pharmacyForSelectedPrescription = <Pharmacy>pharmacy;
      this.loading = false;
    });
  }

}
