import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BaseUser } from 'src/app/models/base-user';
import { Patient } from 'src/app/models/patient';
import { Recommendation } from 'src/app/models/recommendation';
import { AuthService } from 'src/app/services/auth.service';
import { RecommendationsService } from 'src/app/services/recommandations.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'cyh-specialist-home',
  templateUrl: './specialist-home.component.html',
  styleUrls: ['./specialist-home.component.sass']
})
export class SpecialistHomeComponent implements OnInit {
  public loading = true;

  public allRecommendationsOfSpecialist: Recommendation[] = [];
  public filteredRecommendationsOfSpecialist: Recommendation[] = [];
  public searchRecommendationInput = new FormControl();

  constructor(
    private cd: ChangeDetectorRef,
    private recService: RecommendationsService,
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  public ngOnInit() {
    this.getRecommendationsForSpecialist();
  }

  public manageKeypress(keyEvent: KeyboardEvent): void {
    if (keyEvent.code === 'Enter' && this.searchRecommendationInput.value) {
      this.filterRecommentations();
    }
  }

  public openRecommendation(rec: Recommendation): void {
    // to do
  }

  public filterRecommentations(): void {
    const results = this.allRecommendationsOfSpecialist.filter((rec: Recommendation) =>
      (rec?.fullPatient?.name?.toLowerCase() || '').startsWith(this.searchRecommendationInput?.value.toLowerCase() || '')
    );
    this.filteredRecommendationsOfSpecialist = results;
    this.cd.detectChanges();
  }

  public resetRecimmentations(): void {
    this.filteredRecommendationsOfSpecialist = this.allRecommendationsOfSpecialist;
    this.cd.detectChanges();
  }

  private getRecommendationsForSpecialist(): void {
    this.recService.getRecommendations().subscribe((recs: Recommendation[]) => {
      const specialistId = this.authService.getUserId();
      const recOfSpecialist = recs.filter((rec: Recommendation) => rec.specialist === specialistId);

      recOfSpecialist.forEach((rec: Recommendation) => {
        this.usersService.getUserInfo(rec.patient).subscribe((patient: BaseUser) => {
          rec.fullPatient = <Patient>patient;
          this.allRecommendationsOfSpecialist.push(rec);

          if (recOfSpecialist.indexOf(rec) === recOfSpecialist.length - 1) {
            this.allRecommendationsOfSpecialist = recOfSpecialist;
            this.filteredRecommendationsOfSpecialist = this.allRecommendationsOfSpecialist;
            this.loading = false;
          }
        });
      });
    });
  }


}
