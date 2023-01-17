import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';
import { Appointment } from 'src/app/models/appointment';
import { BaseUser } from 'src/app/models/base-user';
import { Medic, Specialist } from 'src/app/models/medic';
import { Recommendation } from 'src/app/models/recommendation';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'cyh-patient-reference-details',
  templateUrl: './patient-reference-details.component.html',
  styleUrls: ['./patient-reference-details.component.sass']
})
export class PatientReferenceDetailsComponent implements OnInit {
  @Input() reference = new Recommendation();;
  @Input() selected = false;

  public medic = new Medic();
  public specialist = new Specialist();
  public domain = '';
  public appointment = new Appointment();

  public showEditRecommendedMedic = false;
  public possibleOtherMedics: Specialist[] = [];

  constructor(
    private usersService: UsersService, 
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.appointment = this.reference.appointment;
    this.getCreationMedic(this.reference);
  }

  public goToCreateAppointment(): void {
    this.router.navigateByUrl('patient/appointment/create?referenceId=' + this.reference.id + '&medicId=' + this.specialist.id)
  }

  public viewAppointment(): void {
    sessionStorage.setItem('cyhSelectedAppointment', JSON.stringify(this.appointment));
    this.router.navigateByUrl('patient/appointment?id=' + this.appointment.id);
  }

  public changeSpecialist(event: MatSelectChange): void {
    if (event.value !== 'cancel') {
      this.specialist = event.value;
    }
    this.showEditRecommendedMedic = false;
    this.cd.detectChanges();
  }

  private getCreationMedic(reference: Recommendation): void {
    this.usersService.getUserInfo(reference.medic).subscribe((user: BaseUser) => {
      this.medic = <Medic>user;
      this.cd.detectChanges();
      this.getSpecialist(reference);
    });
  }

  private getSpecialist(reference: Recommendation): void {
    this.usersService.getUserInfo(reference.specialist).subscribe((user: BaseUser) => {
      this.domain = (<Specialist>user).domain;
      this.cd.detectChanges();
    });
  }

  public getAllPosibleMedics(): void {
    this.usersService.getAllSpecialists().subscribe((medics: Specialist[]) => {
      this.possibleOtherMedics = medics.filter(medic => medic.domain === this.domain);
      this.showEditRecommendedMedic = true;
    });
  }
}
