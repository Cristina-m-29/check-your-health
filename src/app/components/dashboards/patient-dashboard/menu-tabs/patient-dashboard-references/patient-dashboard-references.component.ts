import { Component, OnInit } from '@angular/core';
import { Medic, Specialist } from 'src/app/models/medic';
import { Patient } from 'src/app/models/patient';
import { Recommendation } from 'src/app/models/recommendation';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'cyh-patient-dashboard-references',
  templateUrl: './patient-dashboard-references.component.html',
  styleUrls: ['./patient-dashboard-references.component.sass']
})
export class PatientDashboardReferencesComponent implements OnInit {
  public references: Recommendation[] = [];
  public selectedReference = new Recommendation();
  public medicForSelectedReference = new Medic();
  public loading = false;

  constructor(private usersService: UsersService) { }

  public ngOnInit() {
    this.getReferences();
  }

  public selectReference(reference: Recommendation): void {
    this.loading = true;
    this.selectedReference = reference;
    this.getMedicForSelectedReference(this.selectedReference);
  }

  private getReferences(): void {
    // to do
    this.references = [
      {
        id: '1235',
        patient: new Patient(),
        medic: new Medic(),
        specialist: new Specialist(),
        date: new Date(),
        details:  '',
        feedback: ''
      }
    ]

    this.selectedReference = this.references[0];
    this.loading = false;
  }

  private getMedicForSelectedReference(reference: Recommendation): void {
    // to do
    this.loading = false;
  }

}
