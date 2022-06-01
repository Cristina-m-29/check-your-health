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

  public patientAllPrescriptins: Prescription[] = [];
  public patientAllPrescriptinsToShow: Prescription[] = [];
  public patientPrescriptinsToShow: Prescription[] = [];
  
  public patientAllRecommendations: Recommendation[] = [];
  public patientAllRecommendationsToShow: Recommendation[] = [];
  public patientRecommendationsToShow: Recommendation[] = [];

  public showAllPrescriptions = false;
  public showAllRecommendations = false;

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

  public seeAllPrescriptions(): void {
    if (this.patientAllPrescriptinsToShow.length === 0) {
      this.patientAllPrescriptinsToShow = this.patientAllPrescriptins.concat([]);
      this.patientAllPrescriptinsToShow.forEach((pres: Prescription) => {
        this.usersService.getUserInfo(pres.medic).subscribe((medic: BaseUser) => {
          pres.medicName = medic.name;

          if (this.patientAllPrescriptinsToShow.indexOf(pres) === this.patientAllPrescriptinsToShow.length - 1) {
            this.showAllPrescriptions = true;
          }
        });
      });
    }
    else {
      this.showAllPrescriptions = true;
    }
  }

  public seeLessPrescriptions(): void {
    this.showAllPrescriptions = false;
  }

  public seeAllRecommendations(): void {
    if (this.patientAllRecommendationsToShow.length === 0) {
      this.patientAllRecommendationsToShow = this.patientAllRecommendations;
      this.patientAllRecommendationsToShow.forEach((rec: Recommendation) => {
        this.usersService.getUserInfo(rec.medic).subscribe((medic: BaseUser) => {
          rec.medicName = medic.name;

          this.usersService.getUserInfo(rec.specialist).subscribe((specialist: BaseUser) => {
            rec.specialistName = specialist.name;

            if (this.patientAllRecommendationsToShow.indexOf(rec) === this.patientAllRecommendationsToShow.length - 1) {
              this.showAllRecommendations = true;
            }
          });
        })
      });
    }
    else {
      this.showAllRecommendations = true;
    }
  }

  public seeLessRecommendations(): void {
    this.showAllRecommendations = false;
  }

  public isLastInList(list: any[], item: any): boolean {
    return list.indexOf(item) === list.length - 1;
  }

  private getPrescriptions(): void {
    this.prescriptionsService.getPrescriptionsForSpecificPatient(this.patient.id)
      .subscribe((prescritions: Prescription[]) => {
        this.patientAllPrescriptins = prescritions;
        this.patientPrescriptinsToShow = prescritions.concat([]).slice(0,2);

        this.patientPrescriptinsToShow.forEach((pres: Prescription) => {
          this.usersService.getUserInfo(pres.medic).subscribe((medic: BaseUser) => {
            pres.medicName = medic.name;

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
        this.patientAllRecommendations = recommendations;
        this.patientRecommendationsToShow = this.patientAllRecommendations.slice(0,2);

        this.patientRecommendationsToShow.forEach((rec: Recommendation) => {
          this.usersService.getUserInfo(rec.medic).subscribe((medic: BaseUser) => {
            rec.medicName = medic.name;

            this.usersService.getUserInfo(rec.specialist).subscribe((specialist: BaseUser) => {
              rec.specialistName = specialist.name;

              if (this.patientRecommendationsToShow.indexOf(rec) === this.patientRecommendationsToShow.length - 1) {
                this.viewLoaded.emit(true);
              }
            });
          })
        });
      });
  }

}
