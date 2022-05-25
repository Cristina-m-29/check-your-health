import { Component, OnInit } from '@angular/core';
import { Pharmacy } from 'src/app/models/pharmacy';
import { Prescription } from 'src/app/models/prescription';
import { PrescriptionsService } from 'src/app/services/prescriptions.service';

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

  constructor(private prescriptionsService: PrescriptionsService) { }

  public ngOnInit() {
    this.getPrescriptions();
  }

  public selectPrescription(prescription: Prescription): void {
    this.loading = true;
    this.selectedPrescription = prescription;
    this.getPharmacyForSelectedPrescription(prescription);
  }

  private getPrescriptions(): void {
    this.prescriptionsService.getPrescriptions().subscribe((prescriptions: Prescription[]) => {
      this.prescriptions = prescriptions;
      this.selectPrescription(this.prescriptions[0]);
    });
  }

  private getPharmacyForSelectedPrescription(prescription: Prescription): void {
    // to do
    this.loading = false;
  }

}
