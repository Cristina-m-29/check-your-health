import { Component, Input } from '@angular/core';
import { Medic, Specialist } from 'src/app/models/medic';
import { Patient } from 'src/app/models/patient';

@Component({
  selector: 'cyh-patient-medic-details-card',
  templateUrl: './patient-medic-details-card.component.html',
  styleUrls: ['./patient-medic-details-card.component.sass']
})
export class PatientMedicDetailsCardComponent {
  @Input() patient = new Patient();
  @Input() medic = new Medic();

  public isSpecialist(): boolean {
    return !!(<Specialist>this.medic).domain;
  }

  public getSpecialistDomain(): string {
    return (<Specialist>this.medic).domain;
  }
}
