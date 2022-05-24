import { RecommandationsService } from './../../../../../services/recommandations.service';
import { Component, OnInit } from '@angular/core';
import { BaseUser } from 'src/app/models/base-user';
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
  public loading = true;

  constructor(
    private usersService: UsersService, 
    private recommandationsService: RecommandationsService
  ) { }

  public ngOnInit() {
    this.getReferences();
  }

  public selectReference(reference: Recommendation): void {
    this.loading = true;
    this.selectedReference = reference;
    this.getMedicForSelectedReference(this.selectedReference);
  }

  private getReferences(): void {
    this.recommandationsService.getRecommandations().subscribe((references: Recommendation[]) => {
      this.references = references;
      this.selectReference(this.references[0]);
    });
  }

  private getMedicForSelectedReference(reference: Recommendation): void {
    this.usersService.getUserInfo(reference.specialist).subscribe((specialist: BaseUser) => {
      this.medicForSelectedReference = <Specialist>specialist;
      this.loading = false;
    });
  }

}
