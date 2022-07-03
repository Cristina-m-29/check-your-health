import { RecommendationsService } from 'src/app/services/recommandations.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BaseUser } from 'src/app/models/base-user';
import { Medic, Specialist } from 'src/app/models/medic';
import { Recommendation } from 'src/app/models/recommendation';
import { UsersService } from 'src/app/services/users.service';
import { SocketNotification } from 'src/app/models/notification';

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
    private recommendationsService: RecommendationsService,
    private cd: ChangeDetectorRef,
  ) {}

  public ngOnInit() {
    this.getReferences();
    this.getReferencesEvents();
  }

  public selectReference(reference: Recommendation): void {
    this.loading = true;
    this.selectedReference = reference;
    this.cd.detectChanges();
    this.getMedicForSelectedReference(this.selectedReference);
  }

  private getReferences(): void {
    this.recommendationsService.getRecommendations().subscribe((references: Recommendation[]) => {
      this.references = references;
      
      if (references.length > 0) {
        const selectedReference = sessionStorage.getItem('cyhSelectedReference');
        sessionStorage.removeItem('cyhSelectedReference');
        if (selectedReference) {
          this.selectReference(<Recommendation>JSON.parse(selectedReference));
        }
        else {
          this.selectReference(this.references[0]);
        }
      }
      else {
        this.loading = false;
      }
    });
  }

  private getReferencesEvents(): void {
    this.recommendationsService.getRecommendationEvents().subscribe((value) => {
      const notif = <SocketNotification>JSON.parse(value.data);
      if(notif.eventMethod === 'POST') {
        this.getReferences();
      }
    });
  }

  private getMedicForSelectedReference(reference: Recommendation): void {
    this.usersService.getUserInfo(reference.specialist).subscribe((specialist: BaseUser) => {
      this.medicForSelectedReference = <Specialist>specialist;
      this.loading = false;
      this.cd.detectChanges();
    });
  }

}
