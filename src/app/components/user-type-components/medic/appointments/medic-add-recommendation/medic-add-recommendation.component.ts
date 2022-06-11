import { FormControl } from '@angular/forms';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Recommendation } from 'src/app/models/recommendation';
import { Specialist } from 'src/app/models/medic';
import { MatDialogRef } from '@angular/material/dialog';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { Observable, of } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'cyh-medic-add-recommendation',
  templateUrl: './medic-add-recommendation.component.html',
  styleUrls: ['./medic-add-recommendation.component.sass']
})
export class MedicAddRecommendationComponent implements OnInit {
  public recommendation = new Recommendation();

  public recommendationSpecialistInput = new FormControl();
  public recommendationReasonInput = new FormControl();

  public specialistList: Specialist[] = [];
  public specialistListForInput = new Observable<Specialist[]>();

  @ViewChild(MatAutocompleteTrigger) trigger!: MatAutocompleteTrigger;
  
  constructor(
    public dialogRef: MatDialogRef<MedicAddRecommendationComponent>,
    private cd: ChangeDetectorRef,
    private usersService: UsersService,
  ) {
    this.recommendationReasonInput.valueChanges.subscribe((reason: string) => {
      this.recommendation.details = reason;
    });
    this.recommendationSpecialistInput.valueChanges.subscribe((value: string) => {
      this.specialistListForInput = of(this._filter(value));
    });
  }

  public ngOnInit(): void {
    this.getAllSpecialists();
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public onFocus(): void {
    this.trigger._onChange(""); 
    this.trigger.openPanel();
    this.cd.detectChanges();
  }

  public selectSpecialist(specialist: Specialist): void {
    this.recommendation.specialist = specialist.id;
    this.cd.detectChanges();
  }

  private getAllSpecialists(): void {
    this.usersService.getAllSpecialists().subscribe((specialists: Specialist[]) => {
      this.specialistList = specialists.sort((a,b) => a.domain.localeCompare(b.domain));
    });
  }

  private _filter(value: string): Specialist[] {
    return this.specialistList.filter(option => option.name.startsWith(value));
  }

}
