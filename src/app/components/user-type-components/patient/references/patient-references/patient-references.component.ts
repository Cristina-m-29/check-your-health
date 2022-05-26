import { RecommendationsService } from 'src/app/services/recommandations.service';
import { Component, OnInit } from '@angular/core';
import { BaseUser } from 'src/app/models/base-user';
import { Medic, Specialist } from 'src/app/models/medic';
import { Recommendation } from 'src/app/models/recommendation';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'cyh-patient-dashboard-references',
  templateUrl: './patient-references.component.html',
  styleUrls: ['./patient-references.component.sass']
})
export class PatientReferencesComponent implements OnInit {
  public references: Recommendation[] = [];
  public selectedReference = new Recommendation();
  public medicForSelectedReference = new Medic();
  public loading = true;

  constructor(
    private usersService: UsersService, 
    private RecommendationsService: RecommendationsService
  ) {}

  public ngOnInit() {
    this.getReferences();
  }

  public selectReference(reference: Recommendation): void {
    this.loading = true;
    this.selectedReference = reference;
    this.getMedicForSelectedReference(this.selectedReference);
  }

  private getReferences(): void {
    this.RecommendationsService.getRecommendations().subscribe((references: Recommendation[]) => {
      this.references = references;
      
      if (references.length > 0) {
        this.selectReference(this.references[0]);
      }
      else {
        this.loading = false;
      }
    });
  }

  private getMedicForSelectedReference(reference: Recommendation): void {
    this.usersService.getUserInfo(reference.specialist).subscribe((specialist: BaseUser) => {
      this.medicForSelectedReference = <Specialist>specialist;
      this.loading = false;
    });
  }

}
