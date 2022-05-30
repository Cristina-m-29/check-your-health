import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Patient } from 'src/app/models/patient';
import { PrescriptionsService } from 'src/app/services/prescriptions.service';
import { RecommendationsService } from 'src/app/services/recommandations.service';

@Component({
  selector: 'cyh-patient-details-card',
  templateUrl: './patient-details-card.component.html',
  styleUrls: ['./patient-details-card.component.sass']
})
export class PatientDetailsCardComponent implements OnInit{
  @Input() isDynamicView = false;
  @Input() patient = new Patient();

  @Output() changePatient = new EventEmitter<boolean>();
  @Output() viewLoaded = new EventEmitter<boolean>();

  constructor(
    private prescriptionsService: PrescriptionsService,
    private recommendationsService: RecommendationsService,
  ) {}

  public ngOnInit(): void {
    this.getPrescriptions();
  }

  public goBackToPatientSelection(): void {
    this.changePatient.emit(true);
  }

  private getPrescriptions(): void {
    // to do
    this.getRecommendations();
  }

  private getRecommendations(): void {
    // to do
    this.viewLoaded.emit(true);
  }

}
