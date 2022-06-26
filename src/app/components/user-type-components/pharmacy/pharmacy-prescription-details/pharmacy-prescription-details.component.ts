import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseUser } from 'src/app/models/base-user';
import { Medic } from 'src/app/models/medic';
import { Patient } from 'src/app/models/patient';
import { Prescription, PrescriptionStatus } from 'src/app/models/prescription';
import { PrescriptionsService } from 'src/app/services/prescriptions.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'cyh-pharmacy-prescription-details',
  templateUrl: './pharmacy-prescription-details.component.html',
  styleUrls: ['./pharmacy-prescription-details.component.sass']
})
export class PharmacyPrescriptionDetailsComponent implements OnInit {
  public loading = true;
  public prescription = new Prescription();
  public patient = new Patient();
  public medic = new Medic();

  private prescriptionViewLoaded = false;
  private patientViewLoaded = true; //

  constructor(
    private router: Router, 
    private cd: ChangeDetectorRef, 
    private usersService: UsersService,
    private prescriptionsService: PrescriptionsService,
  ) { }

  public ngOnInit(): void {
    this.getPrescriptionFromStorage();
  }

  public goBack(): void { 
    sessionStorage.removeItem('cyhSelectedPrescription');
    this.router.navigateByUrl('pharmacy/home');
  }

  public setPrescriptionStatus(status: PrescriptionStatus): void {
    this.loading = true;
    this.cd.detectChanges();
    this.prescriptionsService.updatePrescriptionStatus(this.prescription.id, status).subscribe((pres: Prescription) => {
      this.prescription.status = pres.status;
      sessionStorage.removeItem('cyhSelectedPrescription');
      sessionStorage.setItem('cyhSelectedPrescription', JSON.stringify(this.prescription));
      this.loading = false;
      this.cd.detectChanges();
    });
  }

  public setPatientViewAsLoaded(): void {
    this.patientViewLoaded = true;
    this.checkIfLoadingIsDone();
  }

  private setPrescriptionViewAsLoaded(): void {
    this.prescriptionViewLoaded = true;
    this.checkIfLoadingIsDone();
  }

  private getPrescriptionFromStorage(): void {
    const prescription = sessionStorage.getItem('cyhSelectedPrescription');
    if (prescription) {
      this.prescription = <Prescription>JSON.parse(prescription || '{}');
      this.patient = this.prescription.fullPatient || new Patient();
      this.medic = this.prescription.fullMedic || new Medic();

      if (this.prescription.fullMedic) {
        this.setPrescriptionViewAsLoaded();
      }
      else {
        this.getFullMedic();
      }
    }
    else {
      this.goBack();
    }
  }

  private checkIfLoadingIsDone(): void {
    this.loading = !this.prescriptionViewLoaded && !this.patientViewLoaded;
    this.cd.detectChanges();
  }

  private getFullMedic(): void {
    this.usersService.getUserInfo(this.prescription.medic).subscribe((medic: BaseUser) => {
      this.prescription.fullMedic = <Medic>medic;
      this.medic = this.prescription.fullMedic;
      this.setPrescriptionViewAsLoaded();
    });
  }

}
