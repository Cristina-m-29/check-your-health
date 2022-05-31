import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BaseUser } from 'src/app/models/base-user';
import { Patient } from 'src/app/models/patient';
import { Prescription } from 'src/app/models/prescription';
import { Recommendation } from 'src/app/models/recommendation';
import { PrescriptionsService } from 'src/app/services/prescriptions.service';
import { RecommendationsService } from 'src/app/services/recommandations.service';
import { UsersService } from 'src/app/services/users.service';

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

  public patientPrescriptins: Prescription[] = [];
  public patientPrescriptinsToShow: Prescription[] = [];
  public patientRecommendations: Recommendation[] = [];
  public patientRecommendationsToShow: Recommendation[] = [];

  constructor(
    private prescriptionsService: PrescriptionsService,
    private recommendationsService: RecommendationsService,
    private usersService: UsersService,
  ) {}

  public ngOnInit(): void {
    this.getPrescriptions();
  }

  public goBackToPatientSelection(): void {
    this.changePatient.emit(true);
  }

  public isLastInList(list: any[], item: any): boolean {
    return list.indexOf(item) === list.length - 1;
  }

  private getPrescriptions(): void {
    this.prescriptionsService.getPrescriptionsForSpecificPatient(this.patient.id)
      .subscribe((prescritions: Prescription[]) => {
        this.patientPrescriptins = prescritions;
        this.patientPrescriptinsToShow = this.patientPrescriptins.slice(0,2);

        this.patientPrescriptinsToShow.forEach((pres: Prescription) => {
          this.usersService.getUserInfo(pres.medic).subscribe((medic: BaseUser) => {
            pres.medic = medic.name;

            if (this.patientPrescriptinsToShow.indexOf(pres) === this.patientPrescriptinsToShow.length - 1) {
              this.getRecommendations();
            }
          });
        });
      });
  }

  private getRecommendations(): void {
    this.recommendationsService.getRecommendationsForSpecificPatient(this.patient.id)
      .subscribe((recommendations: Recommendation[]) => {
        this.patientRecommendations = recommendations;
        this.patientRecommendationsToShow = this.patientRecommendations.slice(0,2);

        this.patientRecommendationsToShow.forEach((rec: Recommendation) => {
          this.usersService.getUserInfo(rec.medic).subscribe((medic: BaseUser) => {
            rec.medic = medic.name;

            this.usersService.getUserInfo(rec.specialist).subscribe((specialist: BaseUser) => {
              rec.specialist = specialist.name;

              if (this.patientRecommendationsToShow.indexOf(rec) === this.patientRecommendationsToShow.length - 1) {
                this.viewLoaded.emit(true);
              }
            });
          })
        });
      });
  }

}
