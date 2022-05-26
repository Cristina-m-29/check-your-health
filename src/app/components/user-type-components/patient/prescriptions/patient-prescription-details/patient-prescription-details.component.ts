import { Prescription } from 'src/app/models/prescription';
import { Component, Input, OnInit } from '@angular/core';
import { Medic } from 'src/app/models/medic';
import { Pharmacy } from 'src/app/models/pharmacy';
import { UsersService } from 'src/app/services/users.service';
import { BaseUser } from 'src/app/models/base-user';

@Component({
  selector: 'cyh-patient-prescription-details',
  templateUrl: './patient-prescription-details.component.html',
  styleUrls: ['./patient-prescription-details.component.sass']
})
export class PatientPrescriptionDetailsComponent implements OnInit {
  @Input() public prescription = new Prescription();
  @Input() public selected = false;

  public medic = new Medic();
  public pharmacy = new Pharmacy();

  constructor(private usersService: UsersService) { }

  public ngOnInit(): void {
    this.getMedicOfPrescription(this.prescription);
  }

  private getMedicOfPrescription(prescription: Prescription): void {
    this.usersService.getUserInfo(prescription.medic).subscribe((medic: BaseUser) => {
      this.medic = <Medic>medic;
      this.getPharmacyOfPrescription(prescription);
    })
  }

  private getPharmacyOfPrescription(prescription: Prescription): void {
    this.usersService.getUserInfo(prescription.pharmacy).subscribe((pharmacy: BaseUser) => {
      this.pharmacy = <Pharmacy>pharmacy;
    });
  }

}
